import { getPrompts, postPrompt } from "@lib/versus/prompt";
import withApiHandler from "@lib/with-api-handler";
import { MAX_PROMPTS_PER } from "@lib/constants";
import CustomError from "@lib/error";

// TODO: make sure pagination is being implemented properly
export default withApiHandler(async (req, pid, uid) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   const take = (req.query.take ?? MAX_PROMPTS_PER).toString();
   const prompts = await getPrompts({ ...req.query, take, uid }).catch((e) => []);
   const next = prompts[prompts.length - 1]?.number;
   // Items per page
   const per = parseInt(take);

   return {
    prompts,
    pagination: {
     next: prompts.length < per ? null : next + 1,
    },
   };
  case "POST":
   return await postPrompt({ ...req.body, uid });
 }
});
