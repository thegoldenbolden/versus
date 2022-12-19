"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { ILogin, ILogout } from "@components/icons";
import Avatar from "@components/avatar";

export function User() {
 const { data: session, status } = useSession();

 if (!session?.user.image || status !== "authenticated") {
  return (
   <Link href="/login" className="icon-w-text">
    <ILogin className="icon" />
    <span>Login</span>
   </Link>
  );
 }

 return (
  <>
   <Link href="/logout" className="icon-w-text">
    <ILogout className="icon" />
    <span>Logout</span>
   </Link>
   <Link href="/account" className="icon-w-text">
    <Avatar image={session?.user.image} />
    <span>Account</span>
   </Link>
  </>
 );
}
