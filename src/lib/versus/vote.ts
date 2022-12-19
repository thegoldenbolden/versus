import { validatePostVote } from "@lib/versus//validate";
import prisma from "@lib/prisma";
import log from "@lib/log";

export async function postVote({ pid, uid, oid }: Versus.PostVoteArgs) {
 const post = validatePostVote({ pid, uid, oid });

 try {
  await prisma.promptOptionVote.create({
   data: {
    user: { connect: { id: post.uid } },
    option: { connect: { promptId_id: { promptId: post.pid, id: post.oid } } },
   },
  });
  return true;
 } catch (error) {
  log("PostVoteError", { error });
  throw error;
 }
}
