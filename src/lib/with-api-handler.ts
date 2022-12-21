import { NextApiRequest, NextApiResponse } from "next";

import CustomError from "@lib/error";
import getUser from "@lib/get-user";
import log from "@lib/log";

interface WithNextApiHandler {
 // TODO: fix typing for different methods
 (req: NextApiRequest, pid: string, uid?: string): any;
}

const withApiHandler = (handler: WithNextApiHandler) => {
 return async (req: NextApiRequest, res: NextApiResponse) => {
  try {
   const session = await getUser(req, res);
   const pid = req.method === "POST" ? req.body.pid : req.query.pid;
   const uid = session?.user.id;
   let response: any;

   switch (req.method) {
    default:
     throw new CustomError(405);
    case "GET":
     log(`Get Attempt`, { url: req.url, query: req.query, user: uid });
     response = await handler(req, pid, uid);
     return res.status(200).send({ ...response, status: 200, ok: true });
    case "POST":
     log(`Post Attempt`, { url: req.url, body: req.body, user: uid });
     if (!uid) throw new CustomError(401);
     response = await handler(req, pid, uid);
     return res.status(201).send({ ...response, status: 201, ok: true });
    case "DELETE":
     log(`Delete Attempt`, { url: req.url, query: req.query, user: uid });
     if (!uid || !pid) throw new CustomError(401);
     await handler(req, pid, uid);
     return res.status(200).send({ status: 200, ok: true });
   }
  } catch (error: any) {
   log(error.name ?? "Error", error);

   if (error instanceof CustomError) {
    res
     .status(error.status)
     .send({ ok: false, status: error.status, message: error.getMessage() });
    return;
   }
   res.status(500).send({ ok: false, status: 500, message: "Something went wrong" });
   return;
  }
 };
};

export default withApiHandler;
