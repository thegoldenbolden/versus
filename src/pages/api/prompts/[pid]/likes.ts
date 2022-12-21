import CustomError from "@lib/error";
import { deleteLike, postLike } from "@lib/versus/like";
import withApiHandler from "@lib/with-api-handler";

export default withApiHandler(async (req, pid, uid) => {
 uid = uid as string;
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "DELETE":
   return await deleteLike({ pid, uid, type: "prompt" });
  case "POST":
   return await postLike({ pid, uid, type: "prompt" });
 }
});
