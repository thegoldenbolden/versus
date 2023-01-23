import { Roboto, Bebas_Neue } from "@next/font/google";

export const roboto = Roboto({
 variable: "--roboto",
 weight: ["400", "700"],
 style: ["italic", "normal"],
 subsets: ["latin"],
});

export const bebas = Bebas_Neue({
 variable: "--bebas",
 weight: ["400"],
 subsets: ["latin"],
});
