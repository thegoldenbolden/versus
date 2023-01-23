import type { Adapter } from "next-auth/adapters";
import nanoid from "@lib/nanoid";
import p from "@lib/prisma";

export default function MyAdapter(): Adapter {
 return {
  createUser: async (data) => {
   return await p.user.create({ data: { ...data, id: nanoid() } }).catch((e) => e);
  },
  getUser: async (id) => await p.user.findUnique({ where: { id } }).catch((e) => e),
  getUserByEmail: async (email) =>
   await p.user.findUnique({ where: { email } }).catch((e) => e),
  getUserByAccount: async (provider_providerAccountId) =>
   await p.account
    .findUnique({ where: { provider_providerAccountId }, select: { user: true } })
    .catch((e) => e),
  updateUser: async ({ id, ...data }) =>
   await p.user.update({ where: { id }, data }).catch((e) => e),
  deleteUser: async (id) => await p.user.delete({ where: { id } }).catch((e) => e),
  linkAccount: async (data) =>
   await p.account
    .create({
     data: { ...data, access_token: undefined, refresh_token: undefined },
    })
    .catch((e) => e),
  unlinkAccount: async (provider_providerAccountId) =>
   await p.account
    .delete({
     where: { provider_providerAccountId },
    })
    .catch((e) => e),
  getSessionAndUser: async (sessionToken) => {
   const userAndSession = await p.session
    .findUnique({
     where: { sessionToken },
     include: { user: true },
    })
    .catch((e) => e);
   if (!userAndSession) return null;
   const { user, ...session } = userAndSession;
   return { user, session };
  },
  createSession: async (data) => await p.session.create({ data }).catch((e) => e),
  updateSession: async (data) =>
   await p.session
    .update({ where: { sessionToken: data.sessionToken }, data })
    .catch((e) => e),
  deleteSession: async (sessionToken) =>
   await p.session.delete({ where: { sessionToken } }).catch((e) => e),
 };
}
