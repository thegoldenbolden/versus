import { cache } from "react";
import prisma from "@lib/prisma";
import Schemas from "@lib/zod-schemas/versus";

export const getTotalVersus = cache(async () => (await prisma.versus.count()) ?? 0);
