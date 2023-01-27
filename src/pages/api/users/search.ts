import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";
import getUserByUsername from "@lib/users/getUserByUsername";

export default withApiHandler(async (req, versusId, userId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   const { type, username } = req.query as {
    username?: string;
    type?: "createdVersus" | "likedVersus" | "votedVersus";
   };

   if (!username || !type) throw new CustomError(400);
   const user = await getUserByUsername(username, type, userId);
   return {
    user,
    isUser: !userId ? false : userId === user?.id,
   };
  case "DELETE":
   await prisma.user.delete({ where: { id: userId } });
   return;
 }
});
