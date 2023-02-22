import { cache } from "react";
import prisma from "@lib/prisma";

export const getTotalVersus = cache(async () => (await prisma.versus.count()) ?? 0);
export default getTotalVersus;
