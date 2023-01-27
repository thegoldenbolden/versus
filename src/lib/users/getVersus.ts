import type { Prisma } from "@prisma/client";
import type { Reacted } from "../versus/createResponse";

import { createResponse } from "../versus/createResponse";
import CONFIG from "../versus/config";
import prisma from "../prisma";

type GetUserVersus = (x: string, y?: string, cursor?: string | number) => Promise<any>;

const getUserVersus: GetUserVersus = async (targetId, userId, cursor) => {
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

 const likes = await prisma.user.findUnique({
  where: { id: targetId },
  select: {
   createdVersus: {
    orderBy: { id: "desc" },
    take: CONFIG.MAX_VERSUS_PER_PAGE,
    skip: cursor ? 1 : undefined,
    cursor: cursor ? { id: cursor } : undefined,
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
 });

 if (!likes?.createdVersus?.[0]) return [];
 return likes.createdVersus.map((versus) => createResponse(versus, reacted, userId));
};

export default getUserVersus;
