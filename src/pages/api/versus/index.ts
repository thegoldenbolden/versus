import { postVersus } from "@lib/versus";
import withApiHandler from "@lib/with-api-handler";
import CONFIG from "@lib/versus/config";
import CustomError from "@lib/error";
import Versus from "@lib/versus/getVersus";

// TODO: make sure pagination is being implemented properly
export default withApiHandler(async (req, versusId, userId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   let take: string | number = (req.query.take ?? CONFIG.MAX_VERSUS_PER_PAGE).toString();
   take = parseInt(take as string) as number;
   take = isNaN(take as number) ? CONFIG.MAX_VERSUS_PER_PAGE : (take as number);

   const items = await Versus.getFeed({
    ...req.query,
    take: (take as number).toString(),
    userId,
   }).catch((e) => []);

   const last = items[items.length - 1];
   return {
    items,
    pagination: {
     cursor: items.length < take || items[0].id <= take ? null : last.id,
    },
   };
  case "POST":
   return await postVersus({ ...req.body, userId });
 }
});
