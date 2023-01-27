import type { SchemaTypes } from "@lib/zod-schemas/versus";
import { log } from "@lib/helpers";
import prisma from "@lib/prisma";
import Schemas from "@lib/zod-schemas/versus";

export async function postVote(args: SchemaTypes["PostVersusVote"]) {
 const { versusId, userId, optionId } = args;
 const validated = Schemas.VersusVote.parse({ versusId, userId, optionId });

 await prisma.versusOptionVote.create({
  data: {
   user: { connect: { id: validated.userId } },
   option: {
    connect: { versusId_id: { versusId: validated.versusId, id: validated.optionId } },
   },
  },
 });
}
