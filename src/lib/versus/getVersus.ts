import type { VersusQuery } from "../../types/index";
import formatResponse from "./formatResponse";
import prisma from "../prisma";

export type Versus = Awaited<ReturnType<typeof getVersus>>;

export default async function getVersus(args: VersusQuery) {
 const cursor = parseInt(args.cursor ?? "") || undefined;

 let reacted: { select: { userId: true }; where: { userId: string } } | undefined;

 if (args.userId) {
  reacted = {
   select: { userId: true },
   where: { userId: args.userId },
  };
 }

 const versus = await prisma.versus.findFirst({
  where: { id: cursor },
  select: {
   id: true,
   title: true,
   createdAt: true,
   description: true,
   status: true,
   likes: reacted,
   tags: { select: { id: true, name: true } },
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
