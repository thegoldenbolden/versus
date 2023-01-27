import prisma from "@lib/prisma";

export default async function getUserProfile(id: string) {
 const user = await prisma.user.findUnique({
  where: { id },
  select: {
   name: true,
   username: true,
   image: true,
   _count: {
    select: {
     createdVersus: true,
     likedVersus: true,
     votedVersus: true,
    },
   },
  },
 });

 if (!user) return null;

 return {
  name: user?.name,
  username: user?.username,
  image: user?.image,
  createdVersus: user?._count.createdVersus,
  likedVersus: user?._count.likedVersus,
  votedVersus: user?._count.votedVersus,
 };
}
