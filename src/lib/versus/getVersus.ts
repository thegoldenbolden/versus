import type { Prisma } from "@prisma/client";
import type { VersusQuery } from "../../types/index";

import formatResponse from "./formatResponse";
import { validateTags } from "./validate";
import CONFIG from "../versus/config";
import { log } from "../helpers";
import prisma from "../prisma";

export type Versus = Awaited<ReturnType<typeof getVersus>>;

export default async function getVersus(args: VersusQuery) {
 const take = parseInt(args.take ?? "") || CONFIG.MAX_VERSUS_PER_PAGE;
 const cursor = parseInt(args.cursor ?? "") || undefined;

 const where: Prisma.VersusWhereInput = { status: { not: "REJECTED" } };

 // Search titles and options for query.
 const OR: Prisma.VersusWhereInput[] = [];
 if (args.q && args.q.length > 0) {
  OR.push(
   { title: { contains: args.q, mode: "insensitive" } },
   { options: { some: { text: { contains: args.q, mode: "insensitive" } } } }
  );
 }

 // Searches by tag ids which only exists in @lib/versus/config
 if (args.tags) {
  const t: number[] = args.tags.split(",").map((tag) => parseInt(tag));
  validateTags(t);
  OR.push(...t.map((t) => ({ tags: { has: t } })));
 }

 // If any of the above were true add to where input.
 if (OR.length > 0) where.OR = OR;

 // Find all versus the user has voted on
 let reacted: { select: { userId: true }; where: { userId: string } } | undefined;

 if (args.userId) {
  reacted = {
   select: { userId: true },
   where: { userId: args.userId },
  };
 }

 log("Querying database", {
  where,
  orderBy: { createdAt: "desc" },
  take: args.take,
  skip: args.cursor ? parseInt(args.skip ?? "") ?? 1 : undefined,
  cursor: args.cursor ? { id: args.cursor } : undefined,
 });

 const versus = await prisma.versus.findFirst({
  where,
  orderBy: { id: "desc" },
  take,
  skip: cursor ? 1 : undefined,
  cursor: cursor ? { id: cursor } : undefined,
  select: {
   id: true,
   title: true,
   createdAt: true,
   description: true,
   status: true,
   tags: true,
   likes: reacted,
   _count: { select: { comments: true, likes: true } },
   author: {
    select: {
     id: true,
     name: true,
     username: true,
     image: true,
     role: true,
    },
   },
   options: {
    orderBy: { id: "asc" },
    select: {
     text: true,
     id: true,
     votes: reacted,
     _count: { select: { votes: true } },
    },
   },
  },
 });

 if (!versus) return null;
 return formatResponse(versus, args.userId);
}
