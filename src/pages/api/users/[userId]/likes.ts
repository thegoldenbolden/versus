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
   const items = await getUserLikes(targetId, sessionUserId, cursor).catch((e) => []);
   const last = items[items.length - 1];

   return {
    items,
    pagination: {
     cursor:
      items.length < CONFIG.MAX_VERSUS_PER_PAGE ||
      items[0].id <= CONFIG.MAX_VERSUS_PER_PAGE
       ? null
       : last.id,
    },
   };
 }
});
