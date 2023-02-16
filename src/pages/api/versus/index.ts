import getManyVersus from "@lib/versus/getManyVersus";
import withApiHandler from "@lib/with-api-handler";
import Schemas from "@lib/zod-schemas/versus";
import CONFIG from "@lib/versus/config";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";

export default withApiHandler(async (req, versusId, userId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   let take: string | number = (req.query.take ?? CONFIG.MAX_VERSUS_PER_PAGE).toString();
   take = parseInt(take as string) as number;
   take = isNaN(take as number) ? CONFIG.MAX_VERSUS_PER_PAGE : (take as number);

   const items = await getManyVersus({
    ...req.query,
    take: (take as number).toString(),
    userId,
   }).catch((e) => {
    console.error(e);
    return [];
   });

   const last = items[items.length - 1];
   return {
    items,
    pagination: {
     cursor: items.length < take || items[0]?.id <= take ? null : last.id,
    },
   };
  case "POST":
   const validated = Schemas.Versus.parse({ ...req.body, userId });

   await prisma.versus.create({
    select: { id: true },
    data: {
     author: { connect: { id: validated.userId } },
     description: validated.description ?? undefined,
     title: validated.title,
     status: "PENDING",
     tags: { set: validated.tags ?? [] },
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
