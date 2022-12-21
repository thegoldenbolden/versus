// @ts-nocheck
import prisma from "@lib/prisma";

export default {
 createUser: (data) => {
  return prisma.user.create({ data: { name: data.name, image: data.image } });
 },
 getUser: (id) => {
  return prisma.user.findUnique({ where: { id } });
 },
 getUserByEmail: (email) => {
  return prisma.user.findUnique({ where: { email } });
 },
 getUserByAccount: (provider_providerAccountId) => {
  let _a;
  const account = prisma.account.findUnique({
   where: { provider_providerAccountId },
   select: { user: true },
  });

  return (_a = account === null || account === void 0 ? void 0 : account.user) !== null &&
   _a !== void 0
   ? _a
   : null;
 },
 updateUser: ({ id, ...data }) => {
  return prisma.user.update({
   where: { id },
   data: { name: data.name, image: data.image },
  });
 },
 deleteUser: (id) => {
  return prisma.user.delete({ where: { id } });
 },
 linkAccount: (data) => {
  data = { ...data, access_token: undefined, refresh_token: undefined };
  return prisma.account.create({ data });
 },
 unlinkAccount: (provider_providerAccountId) => {
  return prisma.account.delete({ where: { provider_providerAccountId } });
 },
 getSessionAndUser: (sessionToken) => {
  const userAndSession = prisma.session.findUnique({
   where: { sessionToken },
   include: { user: true },
  });

  if (!userAndSession) return null;
  const { user, ...session } = userAndSession;
  return { user, session };
 },
 createSession: (data) => {
  return prisma.session.create({ data });
 },
 updateSession: (data) => {
  return prisma.session.update({
   where: { sessionToken: data.sessionToken },
   data,
  });
 },
 deleteSession: (sessionToken) => {
  return prisma.session.delete({ where: { sessionToken } });
 },
} as Adapter;
