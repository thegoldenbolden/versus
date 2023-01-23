import { deleteVersus, getVersus } from "@lib/versus";
import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";

export default withApiHandler(async (req, versusId, userId) => {
 switch (req.method) {
  default:
   throw new CustomError(405);
  case "GET":
   const versus = await getVersus(versusId, userId as string);
   return { data: versus ?? null };
  case "DELETE":
   return await deleteVersus(versusId, userId as string);
 }
});
