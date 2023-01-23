import type { Prisma } from "@prisma/client";
import { createResponse } from "../versus";
import CONFIG from "../versus/config";
import prisma from "../prisma";
import { log } from "../helpers";

export default {
 // TODO: Create args typings;
 // TODO: Create tag typing / validateTag
 getFeed: async (args: any) => {
  const { tags, q, date, userId } = args;
  args.take = parseInt(args.take as string) || CONFIG.MAX_VERSUS_PER_PAGE;

  // Only use cursor if it is specified, will break 'orderBy' otherwise.
  args.cursor = parseInt(args.cursor as string);
  args.cursor = isNaN(args.cursor) ? undefined : args.cursor;

  // Ignore versus that have been rejected.
  const where: Prisma.VersusFindManyArgs["where"] = {
   status: { not: "REJECTED" },
  };

  const OR = [];
  // Possibly enable fullTextSearch to allow ordering by relevance
  // https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#sort-by-relevance-postgresql
  if (q) {
   OR.push(
    { title: { contains: q, mode: "insensitive" } },
    { options: { some: { text: { contains: q, mode: "insensitive" } } } }
   );
  }

  // TODO: search by tag names or id
  // Check if user included a tag name
  // if (tags) {
  //  const t = tags.split(",").map((tag) => parseInt(tag));
  //  args.tags = validateTags(t) as any;
  //  OR.push(...t.map((t) => ({ tags: { has: t } })));
  // }

  // If any of the above were true add to where obj.
  if (OR.length > 0) {
   where.OR = OR as any;
  }

  // prettier-ignore

  // Find all versuss the user has voted on
  let reacted: Prisma.VersusLikeFindManyArgs | Prisma.VersusOptionVoteFindManyArgs | undefined;

  if (userId) {
   reacted = {
    select: { userId: true },
    where: { userId: userId },
   };
  }

  log("Getting", {
   where,
   orderBy: { createdAt: "desc" },
   take: -args.take,
   skip: args.cursor ? 1 : undefined,
   cursor: args.cursor ? { id: args.cursor } : undefined,
  });

  const versus = await prisma.versus.findMany({
   where,
   orderBy: { id: "desc" },
   take: CONFIG.MAX_VERSUS_PER_PAGE,
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
 },
} as {
 getFeed: Versus.GetManyVersus;
};
