import CustomError from "@lib/error";
import { postVote } from "@lib/versus/vote";
import withApiHandler from "@lib/with-api-handler";

export default withApiHandler(async (req, pid, uid) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "POST":
   const { oid } = req.body;
   uid = uid as string;
   return await postVote({ pid, uid, oid });
 }
});
