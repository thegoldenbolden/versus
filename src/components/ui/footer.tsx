import getUser from "@lib/auth/get-user";
import Link from "next/link";

export default async function Footer() {
 const user = await getUser();
 const href = user ? "logout" : "login";

 return (
  <footer className="flex flex-wrap justify-center max-w-[350px] w-full gap-2 p-2 text-sm border-2 border-solid rounded-sm border-smoky-black-translucent dark:border-lotion-translucent text-smoky-black dark:text-lotion">
   <Link
    aria-label={href}
    href={`/${href}`}
    className="capitalize opacity-75 hover:opacity-100 hover:underline focus:opacity-100 focus:underline"
   >
    {href}
   </Link>
   <Link
    href="/privacy"
    aria-label="privacy policy"
    className="opacity-75 hover:opacity-100 hover:underline focus:opacity-100 focus:underline"
   >
    Privacy Policy
   </Link>
   <Link
    href="/terms"
    aria-label="terms of service"
    className="opacity-75 hover:opacity-100 hover:underline focus:opacity-100 focus:underline"
   >
    Terms of Service
   </Link>
   <Link
    href="/cookies"
    aria-label="cookie policy"
    className="opacity-75 hover:opacity-100 hover:underline focus:opacity-100 focus:underline"
   >
    Cookie Policy
   </Link>
   <a
    aria-label="contact"
    href="mailto:jlbolden.pro@gmail.com"
    className="opacity-75 hover:opacity-100 hover:underline focus:opacity-100 focus:underline"
   >
    Contact
   </a>
  </footer>
 );
}
