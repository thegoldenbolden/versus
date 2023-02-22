import { cache } from "react";
import prisma from "@lib/prisma";

const getTags = cache(async () => {
 return await prisma.tag.findMany({ select: { id: true, name: true } }).catch((error) => {
  console.error(error);
  return [];
 });
});

export default getTags;
