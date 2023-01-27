import Link from "next/link";
import AuthRoute from "../auth/routes";

export default function Footer() {
 return (
  <footer className="flex flex-wrap justify-center w-full gap-2 p-2 text-sm border-2 border-solid rounded-sm border-smoky-black-translucent dark:border-lotion-translucent text-smoky-black dark:text-lotion">
   <AuthRoute className="opacity-75 hover:opacity-100 hover:underline focus:opacity-100 focus:underline" />
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
