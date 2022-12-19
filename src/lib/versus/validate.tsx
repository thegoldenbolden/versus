import { TAGS } from "@lib/constants";
import CustomError from "@lib/error";

export function validateId(id: string, type: string) {
 if (!id) throw new CustomError(400, `Invalid ${type} id provider`, "InvalidId");
 return id;
}

export function validatePromptId(_pid: string) {
 const pid = parseInt(_pid) || 0;
 if (isNaN(pid) || pid === 0) {
  throw new CustomError(404, "Invalid prompt id provider", "PromptIdError");
 }
 return pid;
}

export function validatePostVote({ pid, uid, oid }: Versus.PostVoteArgs) {
 return {
  pid: validatePromptId(pid),
  uid: validateId(uid, "user"),
  oid: validateId(oid, "option"),
 };
}

export function validatePostLike(data: Versus.PostLikeArgs) {
 const { pid, uid, cid, type } = data;

 if (!type || (type !== "comment" && type !== "prompt")) {
  throw new CustomError(400, "Invalid type provider", "LikeTypeError");
 }

 const validated: any = {};
 if (type === "comment") {
  validated.cid = validateId(cid as string, "comment");
 }

 if (type === "prompt") {
  validated.pid = validatePromptId(pid);
 }

 validated.uid = validateId(uid, "user");
 return validated;
}

export function validateTags(tags: Versus.Tag[]) {
 tags.forEach((tag) => {
  if (!TAGS.find((t) => t.id === tag.id)) {
   throw new CustomError(400, "Invalid tag provider", "VersusTagError");
  }
 });

 return tags;
}

export function validateMessage(message: string, min: number, max: number) {
 if (message.length < min || message.length > max) {
  throw new CustomError(
   400,
   `Must be between ${min}-${max} characters`,
   "MessageLengthError"
  );
 }

 return message;
}

export function validateOptions(options: string[]) {
 const o = new Set(options);
 // prettier-ignore
 if (o.size !== 2) throw new CustomError(400, "Two distinct options are required", "DistinctOptionError");
 o.forEach((o) => validateMessage(o, 3, 100));
 return options;
}

export function validateDeletePrompt({ pid, uid }: Versus.ArgsBase) {
 return { pid: validatePromptId(pid), uid: validateId(uid, "user") };
}

export function validatePostPrompt(data: Versus.PostPromptArgs) {
 const { uid, title, description, tags, options } = data;
 return {
  uid: validateId(uid, "user"),
  title: validateMessage(title, 3, 128),
  description: description.length > 0 ? validateMessage(description, 3, 1024) : undefined,
  tags: validateTags(tags),
  options: validateOptions(options),
 };
}

export function validatePostComment(data: Versus.PostCommentArgs) {
 const { pid, uid, message, root } = data;

 return {
  root,
  pid: validatePromptId(pid),
  uid: validateId(uid, "user"),
  message: validateMessage(message, 2, 1024),
 };
}

export function validateDeleteComment({ cid, uid }: { cid: string; uid: string }) {
 return { cid: validateId(cid, "comment"), uid: validateId(uid, "user") };
}

export function validateGetComment({ pid, uid, root }: Versus.GetCommentArgs) {
 return {
  pid: validatePromptId(pid),
  uid: !uid ? undefined : validateId(uid, "user"),
  root: !root ? undefined : validateId(root, "comment"),
 };
}
