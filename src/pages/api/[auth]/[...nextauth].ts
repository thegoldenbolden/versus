import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import MyAdapter from "@lib/adapter";

export const options: NextAuthOptions = {
 debug: true || process.env.NODE_ENV === "development",
 secret: process.env.NEXTAUTH_SECRET,
 pages: { signIn: "/login", signOut: "/logout", error: "/error" },
 session: {
  strategy: "database",
  maxAge: 7 * 24 * 60 * 60,
  updateAge: 60 * 60 * 24,
 },
 providers: [
  DiscordProvider({
   clientId: process.env.DISCORD_CLIENT_ID as string,
   clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
   authorization: "https://discord.com/api/oauth2/authorize?scope=identify",
  }),
  TwitterProvider({
   clientId: process.env.TWITTER_ID as string,
   clientSecret: process.env.TWITTER_SECRET as string,
   version: "2.0",
  }),
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID as string,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
 ],
 callbacks: {
  async session({ session, user }) {
   if (!session.user?.id && user?.id) {
    session.user.id = user.id;
   }

   if (user.username && !session?.user.username) {
    session.user.username = user.username;
   }

   if (user.username && session.user.username !== user.username) {
    session.user.username = user.username;
   }

   return session;
  },
 },
 adapter: MyAdapter(),
};

export default NextAuth(options);
