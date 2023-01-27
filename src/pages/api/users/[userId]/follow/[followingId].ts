import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";

export default withApiHandler(async (req, versusId, userId) => {
 const followingId = req.query.followingId as string;
 if (!followingId) throw new CustomError(400);

 switch (req.method) {
  default:
   throw new CustomError(405);
  case "POST":
   if (!userId) throw new CustomError(401);

   await prisma.follows.create({
    data: {
     follower: { connect: { id: userId } },
     following: { connect: { id: followingId } },
    },
   });
   return;
  case "DELETE":
   if (!userId) throw new CustomError(401);
   await prisma.follows.delete({
    where: {
     followerId_followingId: {
      followerId: userId,
      followingId: followingId,
     },
    },
   });
   return;
 }
});
