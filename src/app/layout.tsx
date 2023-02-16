import { roboto } from "@lib/fonts";
import "@styles/globals.scss";

export const metadata = {
 title: {
  default: "Versus Zero",
  template: "VS | %s",
 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html lang="en" className={roboto.className}>
   <body>{children}</body>
  </html>
 );
}
