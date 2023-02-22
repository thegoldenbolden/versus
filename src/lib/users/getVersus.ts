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

 const user = await prisma.user.findUnique({
  where: { id: targetId },
  select: {
   versus: {
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
     likes: reacted,
     tags: { select: { id: true, name: true } },
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

 const created = !user?.versus ? [] : user.versus;
 const last = created[created.length - 1];

 return {
  items: created.map((versus) => formatResponse(versus, userId)),
  pagination: {
   cursor:
    created.length < CONFIG.MAX_VERSUS_PER_PAGE ||
    created[0]?.id <= CONFIG.MAX_VERSUS_PER_PAGE
     ? null
     : last?.id,
  },
 };
};

export default getUserVersus;
