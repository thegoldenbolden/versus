import { Html, Head, Main, NextScript } from "next/document";
import { bebas, roboto } from "@lib/fonts";

export default function Document() {
 return (
  <Html
   className={`${bebas.variable} ${roboto.variable} font-sans font-display`}
   lang="en"
  >
   <Head />
   <body>
    <Main />
    <NextScript />
   </body>
  </Html>
 );
}
