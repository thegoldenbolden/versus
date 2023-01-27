import type {
 VersusStatus,
 VersusLike,
 VersusOptionVote,
 Role,
 Prisma,
} from "@prisma/client";

export type Reacted =
 | Prisma.VersusLikeFindManyArgs
 | Prisma.VersusOptionVoteFindManyArgs
 | undefined;

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
  options: options.map((o: any, i: number) => ({
   id: o.id,
   text: o.text,
   votes: o._count.votes,
  })),
  // Unauthenticated users should always be able to vote.
  // prettier-ignore
  userCanVote: !reacted ? true : versus.options.every((o) => o.votes && o.votes.length === 0),
  userLikes: versus.likes ? versus.likes.some((like) => like.userId === userId) : false,
  userCanDelete: !userId || !author.id ? false : author.id === userId,
 };
}

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
