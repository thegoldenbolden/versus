import CustomError from "@lib/error";
import { deletePrompt, getPrompt } from "@lib/versus/prompt";
import withApiHandler from "@lib/with-api-handler";

export default withApiHandler(async (req, pid, uid) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   return { prompt: (await getPrompt(pid, uid as string)) ?? null };
  case "DELETE":
   return await deletePrompt(pid, uid as string);
 }
});
