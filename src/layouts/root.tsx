import { PropsWithChildren } from "react";

import Link from "next/link";
import { ICreate, IExplore, IHome } from "@components/icons";
import { User } from "@components/user";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
 return (
  <div className="grid grid-cols-1 md:max-h-screen sm:grid-cols-[max-content_1fr] sm:grid-rows-[min-content_100%]">
   <nav className="sticky bottom-0 z-10 h-5 flex w-full gap-4 px-2 py-2 bg-light/75 dark:bg-dark/75 shadow-default sm:max-h-full sm:bottom-auto sm:flex sm:flex-col sm:order-none sm:col-end-1">
    <Link href="/" className="icon-w-text">
     <IHome className="icon" />
     <span>Home</span>
    </Link>
    <Link href="/explore" className="icon-w-text">
     <IExplore className="icon" />
     <span>Explore</span>
    </Link>
    <Link href="/create" prefetch={false} className="icon-w-text">
     <ICreate className="icon" />
     <span>Create</span>
    </Link>
    <User />
   </nav>
   <main className="w-full max-h-min relative order-first sm:order-last sm:min-h-screen sm:max-h-screen sm:overflow-y-auto sm:col-start-2 sm:row-start-1">
    {children}
   </main>
  </div>
 );
};

export default RootLayout;
