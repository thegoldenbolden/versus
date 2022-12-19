import Link from "next/link";

import { bebas } from "@lib/fonts";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
 return (
  <div className="center-page">
   <main className="flex flex-col w-full sm:w-[480px] items-center justify-center gap-2 p-4 sm:gap-4">
    <h1 className={`${bebas.className} text-4xl sm:text-6xl text-center`}>VersusZero</h1>
    <div className="auth">{children}</div>
    <Link href="/" className="text-sm hover:underline focus:underline">
     Back to Home
    </Link>
   </main>
  </div>
 );
};

export default AuthLayout;
