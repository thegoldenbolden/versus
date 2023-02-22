import withApiHandler from "@lib/with-api-handler";
import Schemas from "@lib/zod-schemas/versus";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";

export default withApiHandler(async (req, versusId, userId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "POST":
   const { optionId } = req.body;

   const validated = Schemas.VersusVote.parse({
    versusId: parseInt(versusId),
    userId,
    optionId,
   });

   await prisma.vote.create({
    data: {
     user: { connect: { id: validated.userId } },
     option: {
      connect: {
       versusId_id: {
        versusId: validated.versusId,
        id: validated.optionId,
       },
      },
     },
    },
   });
 }
});
