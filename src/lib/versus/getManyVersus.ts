import type { Prisma } from "@prisma/client";
import CONFIG from "../versus/config";
import prisma from "../prisma";
import { log } from "../helpers";
import { validateTags } from "./validate";
import { createResponse, Reacted } from "./createResponse";

const getFeed: Versus.GetManyVersus = async (args) => {
 const { tags, q, userId } = args;
 args.take = parseInt(args.take as string) || CONFIG.MAX_VERSUS_PER_PAGE;

 // Only use cursor if it is specified, will break 'orderBy' otherwise.
 args.cursor = parseInt(args.cursor as string);
 args.cursor = isNaN(args.cursor) ? undefined : args.cursor;

 // Ignore versus that have been rejected.
 const where: Prisma.VersusFindManyArgs["where"] = { status: { not: "REJECTED" } };

 // Search titles and options for query.
 const OR: Prisma.VersusWhereInput[] = [];
 if (q && q.length > 0) {
  OR.push(
   { title: { contains: q, mode: "insensitive" } },
   { options: { some: { text: { contains: q, mode: "insensitive" } } } }
  );
 }

 // Searches by tag ids which only exists in @lib/versus/config
 if (tags) {
  const t: number[] = (tags as string).split(",").map((tag) => parseInt(tag));
  args.tags = validateTags(t) as any;
  OR.push(...t.map((t) => ({ tags: { has: t } })));
 }

 // If any of the above were true add to where input.
 if (OR.length > 0) where.OR = OR;

 // Find all versus the user has voted on
 let reacted: Reacted;

 if (userId) {
  reacted = {
   select: { userId: true },
   where: { userId: userId },
  };
 }

 log("Querying database", {
  where,
  orderBy: { createdAt: "desc" },
  take: args.take,
  skip: args.cursor ? 1 : undefined,
  cursor: args.cursor ? { id: args.cursor } : undefined,
 });

 const versus = await prisma.versus.findMany({
  where,
  orderBy: { id: "desc" },
  take: args.take, //CONFIG.MAX_VERSUS_PER_PAGE,
  skip: args.cursor ? 1 : undefined,
  cursor: args.cursor ? { id: args.cursor } : undefined,
  select: {
   id: true,
   title: true,
   createdAt: true,
   description: true,
   status: true,
   tags: true,
   likes: reacted as Prisma.VersusLikeFindManyArgs | undefined,
   author: { select: { id: true, name: true, username: true, image: true, role: true } },
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
 });

 if (!versus) return [];
 return versus.map((versus) => createResponse(versus, reacted, args.userId));
};

export default getFeed;
