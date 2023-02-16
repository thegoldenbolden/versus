import formatResponse from "../versus/formatResponse";
import CONFIG from "../versus/config";
import prisma from "../prisma";

// type GetUserVersus = (x: string, y?: string, cursor?: string | number) => Promise<ReturnType<getUserVersus>>;

const getUserVersus = async (
 targetId: string,
 userId?: string,
 cursor?: string | number
) => {
 // Only use cursor if it is specified, will break 'orderBy' otherwise.
 cursor = parseInt(cursor as string);
 cursor = isNaN(cursor) ? undefined : cursor;

 // Find all versus the user has voted on
 let reacted: { select: { userId: true }; where: { userId: string } } | undefined;

 if (userId) {
  reacted = {
   select: { userId: true },
   where: { userId: userId },
  };
 }

 const likes = await prisma.user.findUnique({
  where: { id: targetId },
  select: {
   createdVersus: {
    orderBy: { id: "desc" },
    take: CONFIG.MAX_VERSUS_PER_PAGE,
    skip: cursor ? 1 : undefined,
    cursor: cursor ? { id: cursor } : undefined,
    select: {
     id: true,
     title: true,
     createdAt: true,
     description: true,
     status: true,
     tags: true,
     likes: reacted,
     author: {
      select: { id: true, name: true, username: true, image: true, role: true },
     },
     _count: { select: { comments: true, likes: true } },
     options: {
      orderBy: { id: "asc" },
      select: {
       text: true,
       id: true,
       votes: reacted,
       _count: { select: { votes: true } },
      },
     },
    },
   },
  },
 });

 if (!likes?.createdVersus?.[0]) return [];
 return likes.createdVersus.map((versus) => formatResponse(versus, userId));
};

export default getUserVersus;
