import type { Prisma } from "@prisma/client";
import prisma from "@lib/prisma";

import { createResponse, Reacted } from "@lib/versus/createResponse";
import CONFIG from "@lib/versus/config";

// TODO: add return type;
type GetUserVotes = (x: string, y?: string, z?: string | number) => Promise<any>;

const getUserVotes: GetUserVotes = async (targetId, userId, cursor) => {
 // Only use cursor if it is specified, will break 'orderBy' otherwise.
 cursor = parseInt(cursor as string);
 cursor = isNaN(cursor) ? undefined : cursor;

 // Find all versus the user has voted on
 let reacted: Reacted;

 if (userId) {
  reacted = {
   select: { userId: true },
   where: { userId: userId },
  };
 }

 const votes = await prisma.user.findUnique({
  where: { id: targetId },
  select: {
   votedVersus: {
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
         tags: true,
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
           votes: reacted as Prisma.VersusOptionVoteFindManyArgs | undefined,
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

 if (!votes?.votedVersus?.[0]) return [];
 return votes.votedVersus.map((versus) =>
  createResponse(versus.option.versus, reacted, userId)
 );
};

export default getUserVotes;
