import { signOut } from "next-auth/react";
import { ILogoutLine } from "../ui/icons";

export function Logout() {
 return (
  <button
   className="flex items-center justify-center w-full gap-2 p-2 transition-colors border-2 border-solid bg-smoky-black dark:bg-lotion border-smoky-black dark:border-lotion text-lotion dark:text-smoky-black hover:bg-transparent focus:bg-transparent hover:text-smoky-black focus:text-smoky-black hover:dark:text-lotion focus:dark:text-lotion"
   onClick={() => signOut({ callbackUrl: "/" })}
  >
   <ILogoutLine className="w-6 h-6 text-inherit" />
   <span>Logout</span>
  </button>
 );
}
