import prisma from "@lib/prisma";
export default async function getUserTotals(uid: string) {
 try {
  const posts = await prisma.user.findUnique({
   where: { id: uid },
   select: {
    _count: {
     select: {
      likedPrompts: true,
      createdPrompts: true,
      votedPrompts: true,
     },
    },
   },
  });

  return {
   posts: posts?._count.createdPrompts ?? 0,
   likes: posts?._count.likedPrompts ?? 0,
   votes: posts?._count.votedPrompts ?? 0,
  };
 } catch (err) {
  return {
   posts: 0,
   likes: 0,
   votes: 0,
  };
 }
}
