import { cache } from "react";
import { getServerSession } from "next-auth";
import { options } from "@auth/[...nextauth]";

export const getUser = cache(async function getUser() {
 const session = await getServerSession(options);
 return session?.user;
});

export default getUser;
