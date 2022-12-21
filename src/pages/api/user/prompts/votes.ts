import withApiHandler from "@lib/with-api-handler";
import { MAX_PROMPTS_PER } from "@lib/constants";
import CustomError from "@lib/error";
import getUserVotes from "@lib/versus/user/getUserVotes";

// TODO: make sure pagination is being implemented properly
export default withApiHandler(async (req, pid, uid) => {
 if (!uid) {
  throw new CustomError(401);
 }

 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   const take = (req.query.take ?? MAX_PROMPTS_PER).toString();
   const items = await getUserVotes({ take, uid }).catch((e) => []);
   const next = items[items.length - 1]?.number;
   // Items per page
   const per = parseInt(take);

   return {
    items,
    pagination: {
     next: items.length < per ? null : next + 1,
    },
   };
 }
});
