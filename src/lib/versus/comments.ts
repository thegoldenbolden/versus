import { Prisma } from "@prisma/client";

// prettier-ignore
import { validateDeleteComment, validateGetComment, validatePostComment,} from "./validate";
import { MAX_COMMENTS_PER } from "@lib/constants";
import prisma from "@lib/prisma";
import log from "@lib/log";

export const getComments: Versus.GetComments = async (pid, uid, cid, cursor) => {
 try {
  const request = validateGetComment({ pid, uid, root: cid });

  const comments = await prisma.comment.findMany({
   take: 25,
   cursor: !cursor ? undefined : { id: cursor },
   where: { promptId: request.pid },
   select: {
    id: true,
    message: true,
    createdAt: true,
    likes: uid ? { where: { userId: uid } } : undefined,
    _count: { select: { likes: true } },
    author: { select: { name: true, image: true, id: true } },
    // prettier-ignore
    parent: { select: { message: true, id: true, author: { select: { name: true, image: true } } } },
   },
  });

  if (!comments) return [];
  const response = createCommentResponse(comments, uid);
  return response;
 } catch (error) {
  log("GetRootCommentError", { error });
  throw error;
 }
};

export const getReplies: Versus.GetReplies = async (pid, root, uid, cursor) => {
 try {
  const request = validateGetComment({ pid, root, uid });

  const replies = await prisma.comment.findMany({
   take: MAX_COMMENTS_PER,
   cursor: !cursor ? undefined : { id: cursor },
   where: { promptId: request.pid, parentId: request.root ?? null },
   select: {
    id: true,
    message: true,
    createdAt: true,
    likes: uid ? { where: { userId: uid } } : undefined,
    _count: { select: { replies: true, likes: true } },
    author: { select: { name: true, image: true, id: true } },
    prompt: { select: { id: true, title: true } },
   },
  });

  if (!replies) return [];
  return createCommentResponse(replies, uid);
 } catch (error) {
  log("GetRepliesError", { error });
  throw error;
 }
};

export const deleteComment: Versus.DeleteComment = async (cid, uid) => {
 try {
  const request = validateDeleteComment({ cid, uid });

  await prisma.comment.delete({
   where: { authorId_id: { id: request.cid, authorId: request.uid } },
  });
 } catch (error) {
  log("DeleteCommentError", { error });
  throw error;
 }
};

export const postComment: Versus.CreateComment = async (pid, uid, message, root) => {
 try {
  const request = validatePostComment({ pid, uid, message, root });
  const data: Prisma.CommentCreateInput = {
   message: request.message,
   author: { connect: { id: request.uid } },
   prompt: { connect: { id: request.pid } },
  };

  if (root) {
   data.parent = { connect: { id: request.root } };
  }

  const comment = await prisma.comment.create({
   data,
   select: {
    id: true,
    message: true,
    createdAt: true,
    _count: { select: { likes: true, replies: true } },
    author: { select: { id: true, name: true, image: true } },
    prompt: { select: { title: true, id: true, description: true } },
   },
  });

  if (!comment) return null;
  return createCommentResponse(comment, uid)[0];
 } catch (error) {
  log("PostCommentError", { error });
  throw error;
 }
};

function createCommentResponse(comments: any, uid?: string): Versus.Comment[] {
 if (!comments) return [];
 const data = comments instanceof Array ? comments : [comments];

 return data.map((comment) => {
  const x: Versus.Comment = {
   id: comment.id,
   message: comment.message,
   createdAt: comment.createdAt.toISOString(),
   likes: comment._count.likes,
   parent: comment.parent,
   author: { name: comment.author.name ?? "Anonymous User", image: comment.author.image },
   userCanDelete: !uid || !comment.author.id ? false : comment.author.id === uid,
   // prettier-ignore
   userLikes: comment.likes && comment.likes.some((like: Prisma.CommentLikeSelect) => like.userId === uid && comment.id === like.commentId),
  };

  return x;
 });
}
