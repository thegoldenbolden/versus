import type { Role, VersusLike, VersusOptionVote, VersusStatus } from "@prisma/client";

type Versus = {
 id: number;
 title: string;
 description: string | null;
 createdAt: Date;
 status: VersusStatus;
 likes: Pick<VersusLike, "userId">[];
 tags: number[];
 _count: {
  likes: number;
  comments: number;
 };
 author: {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
  role: Role;
 };
 options: {
  _count: { votes: number };
  id: string;
  votes: Pick<VersusOptionVote, "userId">[];
  text: string;
 }[];
};

export default function formatResponse(versus: Versus, userId?: string | null) {
 const { author } = versus;

 return {
  id: versus.id,
  title: versus.title,
  description: versus.description,
  status: versus.status,
  options: versus.options,
  tags: versus.tags,
  createdAt: versus.createdAt,
  _count: versus._count,

  // Unauthenticated users should always be able to vote.
  // prettier-ignore
  userCanVote: !userId ? true : versus.options.every((o) => o.votes && o.votes.length === 0),
  userLikes: versus.likes ? versus.likes.some((like) => like.userId === userId) : false,
  userCanDelete: !userId || !author.id ? false : author.id === userId,
  author: {
   id: author.id,
   username: author.username,
   name: author.name ?? "Anonymous User",
   image: author.image,
  },
 };
}
