// prettier-ignore
import type { Prisma, VersusLike, VersusOptionVote, VersusStatus, Role } from "@prisma/client";

import { validateTags } from "@lib/versus/validate";
import { log } from "@lib/helpers";
import prisma from "@lib/prisma";
import CONFIG from "@lib/versus/config";
import Schemas from "@lib/zod-schemas/versus";

export const getTotalVersus = async () => {
 try {
  return (await prisma.versus.count()) ?? 0;
 } catch (error) {
  log("GetTotalVersusError", { error });
  throw error;
 }
};

export const postVersus = async (data: Versus.PostVersusArgs) => {
 try {
  const validated = Schemas.Versus.parse({ ...data });

  const versus = await prisma.versus.create({
   select: { id: true },
   data: {
    author: { connect: { id: validated.userId } },
    description: validated.description ?? undefined,
    title: validated.title,
    status: "PENDING",
    tags: { set: validated.tags ?? [] },
    options: {
     createMany: {
      skipDuplicates: true,
      data: Array.from(validated.options).map((o) => ({ text: o })),
     },
    },
   },
  });
  return versus?.id;
 } catch (error) {
  log("PostVersusError", { error });
  throw error;
 }
};

export const deleteVersus = async (versusId: string, userId: string) => {
 const validated = Schemas.VersusDelete.parse({ versusId, userId });

 await prisma.versus.delete({
  where: { id_authorId: { id: validated.versusId, authorId: validated.userId } },
 });
};

// TODO: expand search
// TODO: fix tag typing / validateTag
export const getManyVersus: Versus.GetManyVersus = async (args) => {
 const { tags, q, date, userId } = args;
 args.take = parseInt(args.take as string) || CONFIG.MAX_VERSUS_PER_PAGE;

 // Only use cursor if it is specified, will break 'orderBy' otherwise.
 args.cursor = parseInt(args.cursor as string);

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

 // Check if user included a tag name
 if (tags) {
  const t = tags.split(",").map((tag) => parseInt(tag));
  args.tags = validateTags(t) as any;
  OR.push(...t.map((t) => ({ tags: { has: t } })));
 }

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
 const versus = await prisma.versus.findMany({
  where,
  orderBy: { createdAt: "desc" },
  take: args.take,
  cursor: args.cursor ? { id: args.cursor } : undefined,
  select: {
   id: true,
   title: true,
   createdAt: true,
   description: true,
   status: true,
   tags: true,
   likes: reacted as Prisma.VersusLikeFindManyArgs | undefined,
   author: { select: { id: true, username: true, name: true, image: true, role: true } },
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

export async function getVersus(_versusId: string, userId: string) {
 const versusId = Schemas.VersusId.parse(_versusId);
 // prettier-ignore
 let reacted: Reacted;

 if (userId) {
  reacted = {
   select: { userId: true },
   where: { userId, versusId },
  };
 }

 const versus = await prisma.versus.findUnique({
  where: { id: versusId },
  select: {
   id: true,
   title: true,
   status: true,
   createdAt: true,
   description: true,
   tags: true,
   likes: reacted as Prisma.VersusLikeFindManyArgs | undefined,
   author: { select: { id: true, username: true, name: true, image: true, role: true } },
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

 if (!versus) return null;
 return createResponse(versus, reacted, userId);
}

export function createResponse(versus: V, reacted: Reacted, userId: string | undefined) {
 const { author, createdAt, _count, options } = versus;
 return {
  id: versus.id,
  title: versus.title,
  status: versus.status,
  description: versus.description ?? null,
  tags: versus.tags,
  createdAt: createdAt.toISOString(),
  likes: _count.likes,
  comments: _count.comments,
  author: {
   username: author.username || null,
   name: author.name ?? "Anonymous User",
   image: author.image,
  },
  userCanDelete: !userId || !author.id ? false : author.id === userId,
  userLikes: versus.likes ? versus.likes.some((like) => like.userId === userId) : false,
  // prettier-ignore
  options: options.map((o: any, i: number) => ({	id: o.id, text: o.text, votes: o._count.votes })),
  //prettier-ignore
  userCanVote: !reacted ? true : versus.options.every((o) => o.votes && o.votes.length === 0),
 };
}

// prettier-ignore
type Reacted = Prisma.VersusLikeFindManyArgs | Prisma.VersusOptionVoteFindManyArgs | undefined;

type V = {
 id: number;
 title: string;
 description: string | null;
 createdAt: Date;
 status: VersusStatus;
 likes: VersusLike[];
 tags: number[];
 _count: {
  likes: number;
  comments: number;
 };
 author: {
  id: string;
  username: string | null;
  name: string | null;
  image: string | null;
  role: Role;
 };
 options: {
  _count: { votes: number };
  id: string;
  votes: VersusOptionVote[];
  text: string;
 }[];
};
