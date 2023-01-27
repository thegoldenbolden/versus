import type { User } from "@prisma/client";
import { Username, Name } from "@lib/zod-schemas/versus";
import prisma from "@lib/prisma";

type PatchUserName = (id: string, name?: string, username?: string) => Promise<User>;

const patchUserName: PatchUserName = async (userId, name, username) => {
 name && Name.parse(name);
 username && Username.parse(username);

 const data = {} as { name?: string; username?: string };
 if (name) data.name = name;
 if (username) data.username = username;

 return await prisma.user.update({
  where: { id: userId },
  data,
 });
};

export default patchUserName;
