import getManyVersus from "@lib/versus/getManyVersus";
import withApiHandler from "@lib/with-api-handler";
import Schemas from "@lib/zod-schemas/versus";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

export default withApiHandler(async (req, versusId, userId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   return await getManyVersus({ ...req.query, userId });
  case "POST":
   const validated = Schemas.Versus.parse({ ...req.body, userId });
   let tags: Prisma.TagUncheckedCreateNestedManyWithoutVersusInput | undefined;

   if (validated.tags && validated.tags.length > 0) {
    tags = {
     connect: validated.tags?.map((tag) => ({ id: tag })),
    };
   }

   await prisma.versus.create({
    select: { id: true },
    data: {
     tags,
     author: { connect: { id: validated.userId } },
     description: validated.description ?? undefined,
     title: validated.title,
     status: "PENDING",
     options: {
      createMany: {
       skipDuplicates: true,
       data: Array.from(validated.options).map((o) => ({ text: o })),
      },
     },
    },
   });
 }
});
