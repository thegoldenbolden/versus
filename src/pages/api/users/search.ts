import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";
import prisma from "@lib/prisma";

export default withApiHandler(async (req, versusId, sessionUserId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   const { username } = req.query as { username?: string };

   if (!username) throw new CustomError(400);

   const user = await prisma.user.findUniqueOrThrow({
    where: { username },
    select: {
     name: true,
     username: true,
     image: true,
     id: true,
     followers: true,
     following: true,
     _count: { select: { followers: true, following: true } },
    },
   });

   return {
    data: {
     name: user.name,
     username: user.username,
     image: user.image,
     userFollows:
      !sessionUserId || sessionUserId === user.id ? false : user.followers.length === 1,
    },
   };
  case "DELETE":
   await prisma.user.delete({ where: { id: sessionUserId } });
   return;
 }
});
