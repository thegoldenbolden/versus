import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@lib/prisma";

export const options: NextAuthOptions = {
 adapter: PrismaAdapter(prisma),
 debug: true,
 secret: process.env.NEXTAUTH_SECRET,
 pages: {
  signIn: "/login",
  signOut: "/logout",
 },
 session: {
  strategy: "database",
  maxAge: 30 * 24 * 60 * 60,
  updateAge: 60 * 60 * 24 * 7,
 },
 providers: [
  DiscordProvider({
   clientId: process.env.DISCORD_CLIENT_ID as string,
   clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
  }),
 ],
 callbacks: {
  async session({ session, user }) {
   if (!session.user?.id && user?.id) {
    session.user.id = user.id;
   }
   return session;
  },
 },
};

export default NextAuth(options);
