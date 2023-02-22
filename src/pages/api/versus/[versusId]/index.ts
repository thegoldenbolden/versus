import withApiHandler from "@lib/with-api-handler";
import Schemas from "@lib/zod-schemas/versus";
import getVersus from "@lib/versus/getVersus";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";

export default withApiHandler(async (req, versusId, userId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   const versus = await getVersus({ limit: "1", skip: "0", cursor: versusId, userId });
   return { data: versus ?? null };
  case "DELETE":
   const validated = Schemas.VersusDelete.parse({ versusId, userId });
   await prisma.versus.delete({
    where: {
     id_authorId: {
      id: validated.versusId,
      authorId: validated.userId,
     },
    },
   });
 }
});
