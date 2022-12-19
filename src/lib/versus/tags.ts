import { validatePromptId } from "@lib/versus/validate";
import prisma from "@lib/prisma";

export default function getTags(_pid: string) {
 const pid = validatePromptId(_pid);

 const tags = prisma.promptTag.findMany({
  where: { promptId: pid },
  select: { tag: { select: { id: true, name: true } } },
 });

 return tags;
}
