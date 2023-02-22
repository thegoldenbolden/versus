import type { SchemaTypes } from "@lib/zod-schemas/versus";
import withApiHandler from "@lib/with-api-handler";
import Schemas from "@lib/zod-schemas/versus";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";

export default withApiHandler(async (req, versusId, userId) => {
 const data: SchemaTypes["PostVersusLike"] = {
  type: req.query.commentId ? "comment" : "versus",
  commentId: (req.query.commentId as string) ?? undefined,
  versusId: parseInt(versusId),
  userId: userId as string,
 };

 switch (req.method) {
  default:
   throw new CustomError(405);
  case "DELETE":
   const validDelete = Schemas.VersusDelete.parse(data);

   if (data.type === "versus") {
    await prisma.versusLike.delete({
     where: {
      versusId_userId: {
       versusId: validDelete.versusId,
       userId: validDelete.userId,
      },
     },
    });
    return;
   }

   if (!data.commentId) {
    throw new CustomError(404, "Missing comment id");
   }

   await prisma.commentLike.delete({
    where: {
     commentId_userId: {
      commentId: validDelete.commentId!,
      userId: validDelete.userId,
     },
    },
   });
   return;
  case "POST":
   const validPost = Schemas.VersusLike.parse(data);

   if (validPost.type === "versus") {
    await prisma.versusLike.create({
     data: {
      versus: { connect: { id: validPost.versusId } },
      user: { connect: { id: validPost.userId } },
     },
    });
    return;
   }

   await prisma.commentLike.create({
    data: {
     comment: { connect: { id: validPost.commentId } },
     user: { connect: { id: validPost.userId } },
    },
   });
 }
});
