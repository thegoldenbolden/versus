import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";

import { unstable_getServerSession } from "next-auth";
import { options } from "@auth/[...nextauth]";

type Request = GetServerSidePropsContext["req"] | NextApiRequest;
type Response = GetServerSidePropsContext["res"] | NextApiResponse;
export default async function getUser(req: Request, res: Response) {
 return (await unstable_getServerSession(req, res, options)) as Session | null;
}
