import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { options } from "@auth/[...nextauth]";

type Request = GetServerSidePropsContext["req"] | NextApiRequest;
type Response = GetServerSidePropsContext["res"] | NextApiResponse;
export default async function getUser(req: Request, res: Response) {
 return (await unstable_getServerSession(req, res, options)) as Session | null;
}

// App Directory
// export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
//  return (await unstable_getServerSession(options)) as Session | null;
// }
