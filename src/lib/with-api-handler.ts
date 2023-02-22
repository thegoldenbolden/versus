import type { NextApiRequest, NextApiResponse } from "next";

import CustomError from "@lib/error";
import { log } from "@lib/helpers";
import { options } from "@auth/[...nextauth]";
import { getServerSession } from "next-auth";

interface WithNextApiHandler {
 (req: NextApiRequest, versusId: string, userId?: string): Promise<any>;
}

const withApiHandler = (handler: WithNextApiHandler) => {
 return async (req: NextApiRequest, res: NextApiResponse) => {
  try {
   const session = await getServerSession(req, res, options);
   const versusId = req.method === "POST" ? req.body.versusId : req.query.versusId;
   const userId = session?.user.id;
   let response: any;

   log("Request", {
    requestedBy: userId,
    referer: req.headers.referer,
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
   });

   switch (req.method) {
    default:
     throw new CustomError(405);
    case "GET":
     response = await handler(req, versusId, userId);
     return res.status(200).send(response);
    case "POST":
     if (!userId) throw new CustomError(401);
     response = await handler(req, versusId, userId);
     return res.status(201).send(response);
    case "PATCH":
     if (!userId) throw new CustomError(401);
     response = await handler(req, versusId, userId);
     return res.status(201).send(response);
    case "DELETE":
     if (!userId) {
      throw new CustomError(404);
     }

     const data = await handler(req, versusId, userId);
     if (!data) {
      res.status(200).end();
      return;
     }

     res.status(data.status ?? 200).send(data);
   }
  } catch (error: any) {
   log(`=======`, error);

   if (error instanceof CustomError) {
    res.status(error.status).send({ message: error.getMessage() });
    return;
   }

   res.status(500).send({ message: "Something went wrong" });
   return;
  }
 };
};

export default withApiHandler;
