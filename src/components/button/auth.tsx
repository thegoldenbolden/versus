"use client";
import { BuiltInProviderType } from "next-auth/providers";
import { signIn, signOut } from "next-auth/react";
import { PropsWithChildren } from "react";
import { ILogout } from "@components/icons";

type Props = PropsWithChildren & { provider: BuiltInProviderType };
export function Login(props: Props) {
 return (
  <button
   className={`${props.provider}`}
   onClick={() => signIn(props.provider, { callbackUrl: "/" })}
  >
   {props.children}
   <span>{props.provider}</span>
  </button>
 );
}

export function Logout() {
 return (
  <button
   className="bg-dark text-light dark:text-dark dark:bg-light shadow-default shadow-dark/25 dark:shadow-light/25"
   onClick={() => signOut({ callbackUrl: "/" })}
  >
   <ILogout />
   <span>Logout</span>
  </button>
 );
}
