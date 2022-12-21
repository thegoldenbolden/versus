import { MAX_PROMPTS_PER } from "@lib/constants";
import { Prisma } from "@prisma/client";
import { createResponse } from "../prompt";
import prisma from "@lib/prisma";
import CustomError from "@lib/error";

export const getUserPosts: Versus.GetManyPrompts = async (args) => {
 // Should never make it this far.
 if (!args.uid) throw new CustomError(401);

 args.take = parseInt(args.take as string) || MAX_PROMPTS_PER;
 args.cursor = parseInt(args.cursor as string);

 // prettier-ignore
 // Find all prompts the user has voted on
 let reacted: Prisma.PromptLikeFindManyArgs | Prisma.PromptOptionVoteFindManyArgs | undefined;

 reacted = {
  select: { userId: true },
  where: { userId: args.uid },
 };

 const prompts = await prisma.user.findUnique({
  where: { id: args.uid },
  select: {
   createdPrompts: {
    take: args.take,
    cursor: args.cursor
     ? {
        id_authorId: {
         id: args.cursor,
         authorId: args.uid,
        },
       }
     : undefined,
    select: {
     id: true,
     title: true,
     createdAt: true,
     description: true,
     status: true,
     tags: true,
     likes: reacted as Prisma.PromptLikeFindManyArgs | undefined,
     author: { select: { id: true, name: true, image: true, role: true } },
     _count: { select: { comments: true, likes: true } },
     options: {
      orderBy: { id: "asc" },
      select: {
       text: true,
       id: true,
       votes: reacted as Prisma.PromptOptionVoteFindManyArgs | undefined,
       _count: { select: { votes: true } },
      },
     },
    },
   },
  },
 });

 if (!prompts) return [];
 return prompts.createdPrompts.map((prompt) => createResponse(prompt, reacted, args.uid));
};

export default getUserPosts;
