import { Prisma, PromptLike, PromptOptionVote, PromptStatus, Role } from "@prisma/client";

// prettier-ignore
import { validateDeletePrompt, validatePostPrompt, validatePromptId, validateTags } from "@lib/versus/validate";
import prisma from "@lib/prisma";
import log from "@lib/log";
import { MAX_PROMPTS_PER } from "@lib/constants";

// prettier-ignore
type Reacted = Prisma.PromptLikeFindManyArgs | Prisma.PromptOptionVoteFindManyArgs | undefined;

type P = {
 id: number;
 title: string;
 description: string | null;
 createdAt: Date;
 status: PromptStatus;
 likes: PromptLike[];
 tags: number[];
 _count: { likes: number; comments: number };
 author: { id: string; name: string | null; image: string | null; role: Role };
 options: {
  _count: { votes: number };
  id: string;
  votes: PromptOptionVote[];
  text: string;
 }[];
};

export const getTotalPrompts = async () => {
 try {
  return (await prisma.prompt.count()) ?? 0;
 } catch (error) {
  log("GetTotalPromptsError", { error });
  throw error;
 }
};

export const postPrompt = async (data: Versus.PostPromptArgs) => {
 try {
  const request = validatePostPrompt(data);
  const prompt = await prisma.prompt.create({
   select: { id: true },
   data: {
    author: { connect: { id: request.uid } },
    description: request.description ?? undefined,
    title: request.title,
    status: "PENDING",
    tags: { set: request.tags },
    options: {
     createMany: {
      skipDuplicates: true,
      data: request.options.map((o) => ({ text: o })),
     },
    },
   },
  });
  return prompt?.id;
 } catch (error) {
  log("PostPromptError", { error });
  throw error;
 }
};

export const deletePrompt = async (pid: string, uid: string) => {
 const request = validateDeletePrompt({ pid, uid });
 const prompt = await prisma.prompt.delete({
  where: { id_authorId: { id: request.pid, authorId: request.uid } },
 });

 if (!prompt) return null;
 return prompt.title;
};

// TODO: expand search
// TODO: fix tag typing / validateTag
export const getPrompts: Versus.GetManyPrompts = async (args) => {
 const { tags, q, date, uid } = args;
 args.take = parseInt(args.take as string) || MAX_PROMPTS_PER;
 args.cursor = parseInt(args.cursor as string) || 1;

 // Ignore versus that have been rejected.
 const where: Prisma.PromptFindManyArgs["where"] = {
  status: { not: "REJECTED" },
 };

 const OR = [];
 if (q) {
  OR.push(
   { title: { contains: q, mode: "insensitive" } },
   { options: { some: { text: { contains: q, mode: "insensitive" } } } }
  );
 }

 if (tags) {
  const t = tags.split(",").map((tag) => parseInt(tag));
  args.tags = validateTags(t) as any;
  OR.push(...t.map((t) => ({ tags: { has: t } })));
 }

 if (OR.length > 0) {
  where.OR = OR as any;
 }

 // prettier-ignore
 // Find all prompts the user has voted on
 let reacted: Prisma.PromptLikeFindManyArgs | Prisma.PromptOptionVoteFindManyArgs | undefined;

 if (uid) {
  reacted = {
   select: { userId: true },
   where: { userId: uid },
  };
 }

 const prompts = await prisma.prompt.findMany({
  where,
  take: args.take,
  cursor: { id: args.cursor },
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
 });

 if (!prompts) return [];
 return prompts.map((prompt) => createResponse(prompt, reacted, args.uid));
};

export async function getPrompt(_pid: string, uid: string) {
 const pid = validatePromptId(_pid);
 // prettier-ignore
 let reacted: Reacted;

 if (uid) {
  reacted = {
   select: { userId: true },
   where: { userId: uid, promptId: pid },
  };
 }

 const prompt = await prisma.prompt.findUnique({
  where: { id: pid },
  select: {
   id: true,
   title: true,
   status: true,
   createdAt: true,
   description: true,
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
 });

 if (!prompt) return null;
 return createResponse(prompt, reacted, uid);
}

export function createResponse(prompt: P, reacted: Reacted, uid: string | undefined) {
 const { author, createdAt, _count, options } = prompt;
 return {
  number: prompt.id,
  title: prompt.title,
  status: prompt.status,
  description: prompt.description ?? null,
  tags: prompt.tags,
  createdAt: createdAt.toISOString(),
  likes: _count.likes,
  comments: _count.comments,
  author: { name: author.name ?? "Anonymous User", image: author.image },
  userCanDelete: !uid || !author.id ? false : author.id === uid,
  userLikes: prompt.likes ? prompt.likes.some((like) => like.userId === uid) : false,
  // prettier-ignore
  options: options.map((o: any, i: number) => ({	id: o.id, text: o.text, votes: o._count.votes })),
  //prettier-ignore
  userCanVote: !reacted ? true : prompt.options.every((o) => o.votes && o.votes.length === 0),
 };
}
