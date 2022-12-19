import { Prisma, PromptLike, PromptOptionVote } from "@prisma/client";

// prettier-ignore
import { validateDeletePrompt, validatePostPrompt, validatePromptId, validateTags } from "@lib/versus/validate";
import prisma from "@lib/prisma";
import log from "@lib/log";

// prettier-ignore
type Reacted = Prisma.PromptLikeFindManyArgs | Prisma.PromptOptionVoteFindManyArgs | undefined;

type P = {
 id: number;
 title: string;
 description: string | null;
 createdAt: Date;
 likes: PromptLike[];
 tags: { tag: { id: number; name: string } }[];
 _count: { likes: number; comments: number };
 author: { id: string; name: string | null; image: string | null };
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
    tags: {
     create: request.tags.map((tag) => ({
      tag: { connect: { id: tag.id as number } },
     })),
    },
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
export const getPrompts: Versus.GetManyPrompts = async (args) => {
 const { tags, title, date, uid, status } = args;
 args.take = parseInt(args.take as string) || 15;
 args.cursor = parseInt(args.cursor as string) || undefined;

 const where: Prisma.PromptFindManyArgs["where"] = {};
 where.status = status || "APPROVED";

 if (title) where.title = { contains: title.replaceAll("+", " "), mode: "insensitive" };
 if (date) where.createdAt = { lt: new Date(date) };
 if (tags) args.tags = validateTags(tags);

 where.id = args.cursor ? { lt: args.take + args.cursor, gte: args.cursor } : undefined;

 // prettier-ignore
 let reacted: Prisma.PromptLikeFindManyArgs | Prisma.PromptOptionVoteFindManyArgs | undefined;

 if (uid && args.cursor) {
  reacted = {
   select: { userId: true },
   where: {
    userId: uid,
    promptId: { lt: args.take + args.cursor, gte: args.cursor },
   },
  };
 }

 const prompts = await prisma.prompt.findMany({
  where,
  cursor: args.cursor ? { id: args.cursor } : undefined,
  take: args.take,
  select: {
   id: true,
   title: true,
   createdAt: true,
   description: true,
   likes: reacted as Prisma.PromptLikeFindManyArgs | undefined,
   tags: { select: { tag: { select: { id: true, name: true } } } },
   author: { select: { id: true, name: true, image: true } },
   _count: { select: { comments: true, likes: true } },
   options: {
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
 prompts[0].options[0].votes;
 return prompts.map((prompt) => createResponse(prompt, reacted));
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
   createdAt: true,
   description: true,
   likes: reacted as Prisma.PromptLikeFindManyArgs | undefined,
   tags: { select: { tag: { select: { id: true, name: true } } } },
   author: { select: { id: true, name: true, image: true } },
   _count: { select: { comments: true, likes: true } },
   options: {
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
 return createResponse(prompt, reacted);
}

function createResponse(prompt: P, reacted: Reacted, uid?: string) {
 const { author, createdAt, _count, options } = prompt;
 return {
  number: prompt.id,
  title: prompt.title,
  description: prompt.description ?? null,
  tags: prompt.tags.map(({ tag: { id, name } }) => ({ id, name })) as Versus.Tag[],
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
