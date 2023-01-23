import type { SchemaTypes } from "@lib/zod-schemas/versus";
import { log } from "@lib/helpers";
import prisma from "@lib/prisma";
import CustomError from "@lib/error";
import Schemas from "@lib/zod-schemas/versus";

/**
 *  If no comment id is provided then attempts to create versus like.
 */
export const postLike = async (args: SchemaTypes["PostVersusLike"]) => {
 try {
  const { versusId, userId, commentId, type } = args;
  const validated = Schemas.VersusLike.parse({ type, userId, versusId, commentId });

  if (validated.type === "versus") {
   // Connect like to user record and versus record.
   await prisma.versusLike.create({
    data: {
     versus: { connect: { id: validated.versusId } },
     user: { connect: { id: validated.userId } },
    },
   });
   return;
  }

  // Connect like to user record and comment record.
  await prisma.commentLike.create({
   data: {
    comment: { connect: { id: validated.commentId } },
    user: { connect: { id: validated.userId } },
   },
  });
 } catch (error: any) {
  log(error.name, { error });
  throw error;
 }
};

/**
 * If no comment id is provided then attempts to delete a versus like.
 */
export const deleteLike = async (args: SchemaTypes["PostVersusLike"]) => {
 try {
  const { versusId, userId, commentId, type } = args;
  const validated = Schemas.VersusDelete.parse({ versusId, userId, commentId, type });

  if (type === "versus") {
   await prisma.versusLike.delete({
    where: {
     versusId_userId: {
      versusId: validated.versusId,
      userId: validated.userId,
     },
    },
   });
   return;
  }

  if (!commentId)
   throw new CustomError(404, "A comment id is required to delete a comment.");

  await prisma.commentLike.delete({
   where: {
    commentId_userId: {
     commentId: validated.commentId!,
     userId: validated.userId,
    },
   },
  });
 } catch (error: any) {
  log(error.name, { error });
  throw error;
 }
};
