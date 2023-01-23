import type { FC, PropsWithChildren } from "react";
import Link from "next/link";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
 return (
  <div className="grid min-h-screen min-w-screen place-content-center text-black-smoky dark:text-lotion bg-gradient-to-br from-white via-zinc-100 to-white dark:from-black dark:via-zinc-800 dark:to-black">
   <main className="flex flex-col items-center justify-center min-h-screen gap-2 p-4 min-w-screen drop-shadow-md sm:gap-4">
    <h1 className={`font-display text-4xl sm:text-6xl text-center drop-shadow-md`}>
     Versus Zero
    </h1>
    {children}
    <Link href="/" className="text-sm hover:underline focus:underline">
     Back to Home
    </Link>
   </main>
  </div>
 );
};

export default AuthLayout;
