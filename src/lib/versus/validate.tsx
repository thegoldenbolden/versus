import { TAGS } from "@lib/constants";
import CustomError from "@lib/error";

export function validateId(id: string, type: string) {
 if (!id) throw new CustomError(400, `Invalid ${type} id provider`, "InvalidId");
 return id;
}

export function validatePromptId(_pid: string) {
 const pid = parseInt(_pid) || 0;
 if (isNaN(pid) || pid === 0) {
  throw new CustomError(400, "Invalid prompt id", "PromptIdError");
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
  throw new CustomError(400, "Invalid type", "LikeTypeError");
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

export function validateTags(tags: number[]) {
 tags.forEach((tag) => {
  if (!TAGS.find((t) => t.id.toString() === tag.toString())) {
   throw new CustomError(400, "Invalid tag", "VersusTagError");
  }
 });

 return tags;
}

type Inputs = "title" | "option" | "description";
export function validateMessage(input: Inputs, message: string) {
 switch (input) {
  default:
   throw new CustomError(400, "Invalid validate message input");
  case "title":
  case "option":
   if (!/^[\w\s]{1,128}$/.test(message)) {
    throw new CustomError(
     400,
     "Text must not be longer than 128 characters and consist only of alphanumeric characters"
    );
   }
   return message;
  case "description":
   if (!/^[\w\s.,!?"']{1,1024}$/.test(message)) {
    throw new CustomError(
     400,
     "Text must not be longer than 1024 characterss and consist only of alphanumeric characters, or punctuation"
    );
   }

   return message;
 }
}

export function validateOptions(options: string[]) {
 const o = new Set(options);
 // prettier-ignore
 if (o.size !== 2) throw new CustomError(400, "Two distinct options are required", "DistinctOptionError");
 o.forEach((o) => validateMessage("option", o));
 return options;
}

export function validateDeletePrompt({ pid, uid }: Versus.ArgsBase) {
 return { pid: validatePromptId(pid), uid: validateId(uid, "user") };
}

export function validatePostPrompt(data: Versus.PostPromptArgs) {
 const { uid, title, description, tags, options } = data;
 return {
  uid: validateId(uid, "user"),
  title: validateMessage("title", title),
  description:
   description?.length > 0 ? validateMessage("description", description) : undefined,
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
  message: validateMessage("description", message),
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
