import type { Prisma } from "@prisma/client";
import type { GetManyVersus } from "@lib/versus/getManyVersus";

import formatResponse from "@lib/versus/formatResponse";
import CONFIG from "@lib/versus/config";
import prisma from "@lib/prisma";

// prettier-ignore
type GetUserLikes = (x: string, y?: string, z?: string | number) => ReturnType<GetManyVersus>;

const getUserLikes: GetUserLikes = async (targetId, userId, cursor) => {
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

 const likes = await prisma.user.findUnique({
  where: { id: targetId },
  select: {
   likedVersus: {
    orderBy: { versusId: "desc" },
    take: CONFIG.MAX_VERSUS_PER_PAGE,
    skip: cursor ? 1 : undefined,
    cursor: cursor
     ? { versusId_userId: { versusId: cursor, userId: targetId } }
     : undefined,
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
 });

 if (!likes?.likedVersus?.[0]) return [];
 return likes.likedVersus.map((versus) => formatResponse(versus.versus, userId));
};

export default getUserLikes;
