import { getPrompts, getTotalPrompts, postPrompt } from "@lib/versus/prompt";
import withApiHandler from "@lib/with-api-handler";
import { MAX_PROMPTS_PER } from "@lib/constants";
import CustomError from "@lib/error";

// TODO: make sure pagination is being implemented properly
export default withApiHandler(async (req, pid, uid) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   const prompts = await getPrompts({ take: MAX_PROMPTS_PER, ...req.query, uid });
   const total = await getTotalPrompts();
   const back = prompts?.[0]?.number ?? null;
   const next = prompts?.[prompts.length - 1]?.number ?? null;

   return {
    prompts,
    pagination: {
     count: total,
     back: back && back === 1 ? null : back,
     next: next && total === next ? null : next + 1,
    },
   };
  case "POST":
   return await postPrompt({ ...req.body, uid });
 }
});
