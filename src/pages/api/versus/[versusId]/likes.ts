import type { SchemaTypes } from "@lib/zod-schemas/versus";
import { deleteLike, postLike } from "@lib/versus/like";
import withApiHandler from "@lib/with-api-handler";
import CustomError from "@lib/error";

export default withApiHandler(async (req, versusId, userId) => {
 const data: SchemaTypes["PostVersusLike"] = {
  type: "versus",
  versusId: parseInt(versusId),
  userId: userId as string,
 };

 switch (req.method) {
  default:
   throw new CustomError(405);
  case "DELETE":
   return await deleteLike(data);
  case "POST":
   return await postLike(data);
 }
});
