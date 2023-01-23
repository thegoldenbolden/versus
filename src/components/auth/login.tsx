import type { PropsWithChildren } from "react";
import type { BuiltInProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";

export function Login(props: Props) {
 const handleSignIn = () => {
  const callbackUrl = (window && window.location.href) || "/";
  signIn(props.provider, { callbackUrl });
 };

 const background =
  props.provider == "google"
   ? "bg-google"
   : props.provider == "twitter"
   ? "bg-twitter"
   : props.provider == "discord"
   ? "bg-discord"
   : "bg-smoky-black";

 return (
  <button
   aria-label={`Login with ${props.provider}`}
   title={`Login with ${props.provider}`}
   className={`${background} hover:brightness-110 focus:brightness-110 w-full drop-shadow-md p-2 rounded-sm flex justify-center gap-4 items-center`}
   onClick={handleSignIn}
  >
   {props.children}
   <span className="uppercase capitalize">{props.provider}</span>
  </button>
 );
}

type Props = PropsWithChildren & { provider: BuiltInProviderType };
