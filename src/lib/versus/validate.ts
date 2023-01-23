import CONFIG from "@lib/versus/config";
import CustomError from "@lib/error";

export function validateTags(tags: number[]) {
 tags.forEach((tag) => {
  if (!CONFIG.TAGS.find((t) => t.id.toString() === tag.toString())) {
   throw new CustomError(400, "Invalid tag", "VersusTagError");
  }
 });

 return tags;
}
