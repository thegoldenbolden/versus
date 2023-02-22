import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { Name, Username } from "@lib/zod-schemas/versus";
import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";

export default withApiHandler(async (req, versusId, sessionUserId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "PATCH":
   const username = req.body.username as string;
   const name = req.body.name as string;
   if (!sessionUserId) throw new CustomError(400);
   if (!username && !name) throw new CustomError(400);

   name && Name.parse(name);
   username && Username.parse(username);

   const data = {} as { name?: string; username?: string };
   if (name) data.name = name;
   if (username) data.username = username;

   const response = await prisma.user
    .update({
     where: { id: sessionUserId },
     data,
    })
    .catch((error) => {
     if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
       throw new CustomError(400, "Username already exists");
      }
     }
    });

   if (!response) throw response;
 }
});
