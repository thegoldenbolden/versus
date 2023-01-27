// prettier-ignore
import type { Prisma } from "@prisma/client";
import type { Reacted } from "./createResponse";
import prisma from "@lib/prisma";
import Schemas from "@lib/zod-schemas/versus";
import { createResponse } from "./createResponse";

export const getTotalVersus = async () => (await prisma.versus.count()) ?? 0;

export const postVersus = async (data: Versus.PostVersusArgs) => {
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
};

export const deleteVersus = async (versusId: string, userId: string) => {
 const validated = Schemas.VersusDelete.parse({ versusId, userId });

 await prisma.versus.delete({
  where: { id_authorId: { id: validated.versusId, authorId: validated.userId } },
 });
};

export async function getVersus(_versusId: string, userId: string) {
 const versusId = Schemas.VersusId.parse(_versusId);
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
