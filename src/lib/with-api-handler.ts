import type { NextApiRequest, NextApiResponse } from "next";

import CustomError from "@lib/error";
import getUser from "@lib/get-user";
import { log } from "@lib/helpers";

interface WithNextApiHandler {
 // TODO: fix typing for different methods
 (req: NextApiRequest, versusId: string, userId?: string): any;
}

const withApiHandler = (handler: WithNextApiHandler) => {
 return async (req: NextApiRequest, res: NextApiResponse) => {
  try {
   const session = await getUser(req, res);
   const versusId = req.method === "POST" ? req.body.versusId : req.query.versusId;
   const userId = session?.user.id;
   let response: any;

   log("Request", {
    requestedBy: userId,
    referer: req.headers.referer,
    method: req.method,
    url: req.url,
    params: { query: req.query, body: req.body },
   });

   switch (req.method) {
    default:
     throw new CustomError(405);
    case "GET":
     response = await handler(req, versusId, userId);
     return res.status(200).send({ ...response, status: 200, ok: true });
    case "POST":
     if (!userId) throw new CustomError(401);
     response = await handler(req, versusId, userId);
     return res.status(201).send({ ...response, status: 201, ok: true });
    case "PATCH":
     if (!userId) throw new CustomError(401);
     response = await handler(req, versusId, userId);
     return res.status(201).send({ ...response, status: 201, ok: true });
    case "DELETE":
     if (!userId) {
      throw new CustomError(404);
     }

     await handler(req, versusId, userId);
     return res.status(200).send({ status: 200, ok: true });
   }
  } catch (error: any) {
   log(error?.name ?? "Error", error);

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
