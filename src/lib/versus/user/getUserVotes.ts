import { MAX_PROMPTS_PER } from "@lib/constants";
import { Prisma } from "@prisma/client";
import { createResponse } from "../prompt";
import prisma from "@lib/prisma";
import CustomError from "@lib/error";

export const getUserVotes: Versus.GetManyPrompts = async (args) => {
 if (!args.uid) throw new CustomError(401);

 args.take = parseInt(args.take as string) || MAX_PROMPTS_PER;
 args.cursor = parseInt(args.cursor as string) || 1;

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
   votedPrompts: {
    take: args.take,
    cursor: {
     userId_promptId: {
      promptId: args.cursor,
      userId: args.uid,
     },
    },
    select: {
     option: {
      select: {
       prompt: {
        select: {
         id: true,
         title: true,
         createdAt: true,
         description: true,
         status: true,
         tags: true,
         likes: reacted as Prisma.PromptLikeFindManyArgs | undefined,
         author: { select: { id: true, name: true, image: true, role: true } },
         _count: { select: { likes: true } },
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
     },
    },
   },
  },
 });

 if (!prompts) return [];
 return prompts.votedPrompts.map((prompt) => {
  return createResponse(prompt.option.prompt as any, reacted, args.uid);
 });
};

export default getUserVotes;
