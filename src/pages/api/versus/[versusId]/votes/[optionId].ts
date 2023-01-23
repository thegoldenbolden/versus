import { postVote } from "@lib/versus/vote";
import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";

export default withApiHandler(async (req, versusId, userId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "POST":
   const { optionId } = req.body;
   return await postVote({
    versusId: parseInt(versusId),
    userId: userId as string,
    optionId,
   });
 }
});
