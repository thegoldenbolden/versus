import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";

export default withApiHandler(async (req, pid, uid) => {
 if (!uid) {
  throw new CustomError(401);
 }

 switch (req.method) {
  default:
   throw new CustomError(405);
  case "DELETE":
   await prisma.user.delete({ where: { id: uid } });
 }
});
