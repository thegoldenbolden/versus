import type { Prisma } from "@prisma/client";
import prisma from "@lib/prisma";

// prettier-ignore
type GetUserByUsername = (target: Prisma.UserWhereUniqueInput["username"], total: Total, sessionUserId?: string) => Promise<User | null>;
type Total = "likedVersus" | "createdVersus" | "votedVersus";

export type User = {
 name: string | null;
 username: string | null;
 image: string | null;
 id: string;
 userFollows: boolean;
 total: {
  versus?: string;
  votes?: string;
  likes?: string;
  following: string;
  followers: string;
 };
};

const getUserByUsername: GetUserByUsername = async (username, column, sessionUserId) => {
 const user = await prisma.user.findUnique({
  where: { username },
  select: {
   name: true,
   username: true,
   image: true,
   id: true,
   followers: true,
   following: true,
   _count: { select: { followers: true, following: true, [column]: true } },
  },
 });

 if (!user) return null;

 const total: User["total"] = {
  followers: `${user._count.followers}`,
  following: `${user._count.following}`,
 };

 switch (column) {
  case "createdVersus":
   total.versus = `${user._count.createdVersus}`;
   break;
  case "likedVersus":
   total.likes = `${user._count.likedVersus}`;
  case "votedVersus":
   total.votes = `${user._count.votedVersus}`;
   break;
 }

 return {
  total,
  name: user.name,
  username: user.username,
  image: user.image,
  id: user.id,
  // prettier-ignore
  userFollows: !sessionUserId || sessionUserId === user.id ? false : user.followers.length === 1,
 };
};

export default getUserByUsername;
