import getUser from "@lib/auth/get-user";
import { roboto } from "@lib/fonts";
import "@styles/globals.scss";

export const metadata = {
 title: {
  default: "Versus Zero",
  template: "VS | %s",
 },
};

function preload() {
 return getUser();
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
 preload();

 return (
  <html lang="en" className={roboto.className}>
   <body>{children}</body>
  </html>
 );
}
