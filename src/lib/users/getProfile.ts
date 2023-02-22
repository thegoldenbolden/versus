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
     versus: true,
     likedVersus: true,
     votes: true,
    },
   },
  },
 });

 if (!user) return null;

 return {
  name: user?.name,
  username: user?.username,
  image: user?.image,
  versus: user?._count.versus,
  likedVersus: user?._count.likedVersus,
  votes: user?._count.votes,
 };
}
