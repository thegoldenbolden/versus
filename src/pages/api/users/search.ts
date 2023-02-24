import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";
import getUserByUsername from "@lib/users/getUserByUsername";

export default withApiHandler(async (req, versusId, sessionUserId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   const { username } = req.query as { username?: string };
   if (!username) throw new CustomError(400);
   const user = await getUserByUsername(username, sessionUserId);
   return { user };
  case "DELETE":
   await prisma.user.delete({ where: { id: sessionUserId } });
   return;
 }
});
