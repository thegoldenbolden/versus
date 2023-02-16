import { cache } from "react";
import { getServerSession } from "next-auth";
import { options } from "@auth/[...nextauth]";

export const getUser = cache(async function getUser() {
 return await getServerSession(options);
});

export default getUser;
