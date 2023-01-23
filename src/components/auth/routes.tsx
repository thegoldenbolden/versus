import Link from "next/link";
import { useSession } from "next-auth/react";
import { ILoginLine, ILogoutLine } from "../ui/icons";

export default function AuthRoute({ showIcon = false, className = "" }: AuthRouteProps) {
 const { status } = useSession();
 if (status === "loading") return null;

 if (status !== "authenticated") {
  return (
   <Link title="Login" href="/login" className={className}>
    {showIcon && <ILoginLine className="icon" />}
    <span>Login</span>
   </Link>
  );
 }

 return (
  <Link title="Logout" href="/logout" className={className}>
   {showIcon && <ILogoutLine className="icon" />}
   <span>Logout</span>
  </Link>
 );
}

type AuthRouteProps = {
 showIcon?: boolean;
 className?: string;
};
