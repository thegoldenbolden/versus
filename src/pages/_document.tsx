import { bebas, roboto } from "@lib/fonts";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
 return (
  <Html lang="en">
   <Head />
   <body className={`${bebas.variable} font-display`}>
    <Main />
    <NextScript />
    <div id="modal-root"></div>
   </body>
  </Html>
 );
}
