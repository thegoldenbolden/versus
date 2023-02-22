import type { Prisma } from "@prisma/client";
import type { GetManyVersus } from "@lib/versus/getManyVersus";

import formatResponse from "@lib/versus/formatResponse";
import CONFIG from "@lib/versus/config";
import prisma from "@lib/prisma";

// prettier-ignore
type GetUserVotes = (x: string, y?: string, z?: string | number) => ReturnType<GetManyVersus>;

const getUserVotes: GetUserVotes = async (targetId, userId, cursor) => {
 // Only use cursor if it is specified, will break 'orderBy' otherwise.
 cursor = parseInt(cursor as string);
 cursor = isNaN(cursor) ? undefined : cursor;

 // Find all versus the user has voted on
 let reacted: { select: { userId: true }; where: { userId: string } } | undefined;

 if (userId) {
  reacted = {
   select: { userId: true },
   where: { userId: userId },
  };
 }

 const user = await prisma.user.findUnique({
  where: { id: targetId },
  select: {
   votes: {
    orderBy: { versusId: "desc" },
    take: CONFIG.MAX_VERSUS_PER_PAGE,
    skip: cursor ? 1 : undefined,
    cursor: cursor
     ? {
        userId_versusId: {
         userId: targetId,
         versusId: cursor,
        },
       }
     : undefined,
    select: {
     option: {
      select: {
       versus: {
        select: {
         id: true,
         title: true,
         createdAt: true,
         description: true,
         status: true,
         tags: { select: { id: true, name: true } },
         likes: reacted as Prisma.VersusLikeFindManyArgs | undefined,
         author: {
          select: { id: true, name: true, username: true, image: true, role: true },
         },
         _count: { select: { comments: true, likes: true } },
         options: {
          orderBy: { id: "asc" },
          select: {
           text: true,
           id: true,
           votes: reacted as Prisma.VoteFindManyArgs | undefined,
           _count: { select: { votes: true } },
          },
         },
        },
       },
      },
     },
    },
   },
  },
 });

 // if (!votes?.votedVersus?.[0]) return [];
 // return votes.votedVersus.map((versus) => formatResponse(versus.option.versus, userId));

 const votes = !user?.votes ? [] : user?.votes;
 const last = votes[votes.length - 1];

 return {
  items: votes.map((versus) => formatResponse(versus.option.versus, userId)),
  pagination: {
   cursor:
    votes.length < CONFIG.MAX_VERSUS_PER_PAGE ||
    votes[0]?.option.versus.id <= CONFIG.MAX_VERSUS_PER_PAGE
     ? null
     : last?.option.versus.id,
  },
 };
};

export default getUserVotes;
