import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";
import getUserLikes from "@lib/users/getLikes";
import CONFIG from "@lib/versus/config";

export default withApiHandler(async (req, versusId, sessionUserId) => {
 const targetId = req.query.userId as string;
 const cursor = req.query.cursor as string;

 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   if (!targetId) throw new CustomError(400);
   return await getUserLikes(targetId, sessionUserId, cursor);
 }
});
