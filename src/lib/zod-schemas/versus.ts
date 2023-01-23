import { z } from "zod";
import CONFIG from "../versus/config";

const VersusId = z.coerce.number().positive().gte(1).int().finite();
const UserId = z.string().trim();
const CommentId = z.string().trim().optional();

export const Title = z
 .string()
 .trim()
 .min(1, minMessage("Title", "one"))
 .max(CONFIG.MAX_VERSUS_TITLE_LENGTH, maxMessage("Title", CONFIG.MAX_VERSUS_TITLE_LENGTH))
 .regex(CONFIG.REGEX_TITLE, regexErrorMessage("title"));

export const Options = z
 .string()
 .trim()
 .array()
 .superRefine((value, ctx) => {
  if (value.length > 2) {
   ctx.addIssue({
    code: z.ZodIssueCode.too_big,
    maximum: 2,
    type: "array",
    inclusive: true,
    message: "Too many options",
    fatal: true,
    path: ["option-one", "option-two"],
   });

   return z.NEVER;
  }

  if (value.length < 2) {
   ctx.addIssue({
    code: z.ZodIssueCode.too_small,
    minimum: 2,
    type: "array",
    inclusive: true,
    message: "There must be two options",
    path: ["option-one", "option-two"],
    fatal: true,
   });

   return z.NEVER;
  }

  if (value.length !== new Set(value).size) {
   ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "No duplicates allowed",
    path: ["option-one", "option-two"],
    fatal: true,
   });
   return z.NEVER;
  }

  value.forEach((value, index) => {
   if (!CONFIG.REGEX_OPTIONS.test(value)) {
    ctx.addIssue({
     code: z.ZodIssueCode.custom,
     fatal: true,
     ...regexErrorMessage("option"),
     path: [`option-${index === 0 ? "one" : "two"}`],
    });
   }
  });
 });

export const Description = z
 .string()
 .trim()
 .max(
  CONFIG.MAX_VERSUS_DESCRIPTION_LENGTH,
  maxMessage("Description", CONFIG.MAX_VERSUS_DESCRIPTION_LENGTH)
 )
 .regex(CONFIG.REGEX_DESCRIPTION, regexErrorMessage("description"))
 .optional()
 .nullable();

const Schemas = {
 VersusId,
 Versus: z.object({
  userId: UserId,
  nsfw: z.boolean({ invalid_type_error: "NSFW tag must be a boolean" }).optional(),
  tags: z.number({ invalid_type_error: "Tag ids must be a number" }).array().optional(),
  title: Title,
  options: Options,
  description: Description,
 }),
 VersusLike: z.object({
  type: z.union([z.literal("versus"), z.literal("comment")]),
  userId: UserId,
  versusId: VersusId,
  commentId: CommentId,
 }),
 VersusVote: z.object({
  userId: UserId,
  versusId: VersusId,
  optionId: z.string().trim(),
 }),
 VersusDelete: z.object({
  userId: UserId,
  versusId: VersusId,
  commentId: CommentId,
 }),
 VersusComment: z.object({
  message: z
   .string()
   .trim()
   .min(1, minMessage("Comment", "one"))
   .max(CONFIG.MAX_COMMENT_LENGTH, maxMessage("Comment", CONFIG.MAX_COMMENT_LENGTH))
   .regex(CONFIG.REGEX_COMMENT, regexErrorMessage("comment")),
 }),
};

export type SchemaTypes = {
 PostVersus: z.infer<typeof Schemas.Versus>;
 PostVersusLike: z.infer<typeof Schemas.VersusLike>;
 PostVersusVote: z.infer<typeof Schemas.VersusVote>;
 PostVersusComment: z.infer<typeof Schemas.VersusComment>;
 DeleteVersusOrComment: z.infer<typeof Schemas.VersusDelete>;
};

export default Schemas;

function minMessage(key: string, length: string | number) {
 return {
  message: `${key} must be at least ${length} character(s) consisting of numbers, letters, or the following characters: .!?@#&:'\"()-`,
 };
}

function maxMessage(key: string, length: string | number) {
 return {
  message: `${key} must be ${length} or fewer character(s) consisting of numbers, letters, or the following characters: .!?@#&:'\"()-`,
 };
}

function regexErrorMessage(key: string) {
 return {
  message: `A valid ${key} must consist of numbers, letters, or the following characters: .!?@#&:'\"()-`,
 };
}
