import { validatePostLike } from "@lib/versus/validate";
import prisma from "@lib/prisma";
import log from "@lib/log";

/**
 *  If no comment id is provided then attempts to create prompt like.
 */
export const postLike = async ({ pid, uid, cid, type }: Versus.PostLikeArgs) => {
 try {
  const request = validatePostLike({ pid, uid, cid, type });

  if (type === "prompt") {
   await prisma.promptLike.create({
    data: {
     prompt: { connect: { id: request.pid } },
     user: { connect: { id: request.uid } },
    },
   });
   return;
  }

  // prettier-ignore: Connect like to user record and comment record.
  await prisma.commentLike.create({
   data: {
    comment: { connect: { id: request.cid } },
    user: { connect: { id: request.uid } },
   },
  });
 } catch (error) {
  log("PostLikeError", { error });
  throw error;
 }
};

/**
 * If no comment id is provided then attempts to delete a prompt like.
 */
export const deleteLike = async ({ pid, uid, cid, type }: Versus.PostLikeArgs) => {
 try {
  const request = validatePostLike({ pid, uid, cid, type });
  if (type === "prompt") {
   // prettier-ignore: Delete a prompt like
   await prisma.promptLike.delete({
    where: { promptId_userId: { promptId: request.pid, userId: request.uid } },
   });
   return;
  }

  // prettier-ignore: Delete a comment like
  await prisma.commentLike.delete({
   where: { commentId_userId: { commentId: request.cid, userId: request.uid } },
  });
 } catch (error) {
  log("DeleteLikeError", { error });
  throw error;
 }
};
