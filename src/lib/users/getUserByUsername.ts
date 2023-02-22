import { cache } from "react";
import prisma from "@lib/prisma";
import getUser from "@lib/auth/get-user";

export type UserProfile = Awaited<ReturnType<typeof getUserByUsername>>;

const getUserByUsername = cache(async (username: string, sessionUserId?: string) => {
 sessionUserId ??= await getUser()
  .then((user) => user?.id)
  .catch((e) => void 0);

 const user = await prisma.user.findUnique({
  where: { username },
  select: {
   name: true,
   username: true,
   image: true,
   id: true,
   _count: { select: { followers: true, following: true } },
   followers: !sessionUserId ? false : { where: { followerId: sessionUserId } },
  },
 });

 if (!user) return null;

 return {
  name: user.name,
  username: user.username,
  image: user.image,
  id: user.id,
  _count: user._count,
  userFollows:
   !sessionUserId || sessionUserId === user.id ? false : user.followers.length === 1,
 };
});

export default getUserByUsername;
