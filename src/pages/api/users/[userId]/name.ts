import { Prisma } from "@prisma/client";
import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";
import patchUserName from "@lib/users/patchUserName";
import { ZodError } from "zod";

export default withApiHandler(async (req, versusId, sessionUserId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "PATCH":
   const username = req.body.username as string;
   const name = req.body.name as string;
   if (!sessionUserId) throw new CustomError(400);
   if (!username && !name) throw new CustomError(400);

   const response = await patchUserName(sessionUserId, name, username).catch((e) => e);

   if (response instanceof Prisma.PrismaClientKnownRequestError) {
    if (response.code === "P2002") {
     throw new CustomError(400, "Username already exists");
    }
   }

   if (response instanceof ZodError) {
    throw new CustomError(400, response.issues?.[0]?.message);
   }
   if (!response) throw response;

   return { ok: true, status: 200, message: "Successfully updated username" };
 }
});
