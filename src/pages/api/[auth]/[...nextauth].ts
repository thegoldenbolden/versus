// @ts-nocheck
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import p from "@lib/prisma";

export const options: NextAuthOptions = {
 debug: process.env.NODE_ENV === "development",
 secret: process.env.NEXTAUTH_SECRET,
 pages: {
  signIn: "/login",
  signOut: "/logout",
 },
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
 ],
 callbacks: {
  async session({ session, user }) {
   if (!session.user?.id && user?.id) {
    session.user.id = user.id;
   }
   return session;
  },
 },
 adapter: {
  createUser: (data) =>
   p.user.create({ data: { ...data, email: undefined, emailVerified: undefined } }),
  getUser: (id) => p.user.findUnique({ where: { id } }),
  getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
  async getUserByAccount(provider_providerAccountId) {
   var _a;
   const account = await p.account.findUnique({
    where: { provider_providerAccountId },
    select: { user: true },
   });
   return (_a = account === null || account === void 0 ? void 0 : account.user) !==
    null && _a !== void 0
    ? _a
    : null;
  },
  updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),
  deleteUser: (id) => p.user.delete({ where: { id } }),
  linkAccount: (data) =>
   p.account.create({
    data: { ...data, access_token: undefined, refresh_token: undefined },
   }),
  unlinkAccount: (provider_providerAccountId) =>
   p.account.delete({
    where: { provider_providerAccountId },
   }),
  async getSessionAndUser(sessionToken) {
   const userAndSession = await p.session.findUnique({
    where: { sessionToken },
    include: { user: true },
   });
   if (!userAndSession) return null;
   const { user, ...session } = userAndSession;
   return { user, session };
  },
  createSession: (data) => p.session.create({ data }),
  updateSession: (data) =>
   p.session.update({ where: { sessionToken: data.sessionToken }, data }),
  deleteSession: (sessionToken) => p.session.delete({ where: { sessionToken } }),
  async createVerificationToken(data) {
   const verificationToken = await p.verificationToken.create({ data });
   // @ts-expect-errors // MongoDB needs an ID, but we don't
   if (verificationToken.id) delete verificationToken.id;
   return verificationToken;
  },
  async useVerificationToken(identifier_token) {
   try {
    const verificationToken = await p.verificationToken.delete({
     where: { identifier_token },
    });
    // @ts-expect-errors // MongoDB needs an ID, but we don't
    if (verificationToken.id) delete verificationToken.id;
    return verificationToken;
   } catch (error) {
    // If token already used/deleted, just return null
    // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
    if (error.code === "P2025") return null;
    throw error;
   }
  },
 },
};

export default NextAuth(options);
