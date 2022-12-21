import { PropsWithChildren } from "react";

import Link from "next/link";
import { ICreate, IExplore, IHome } from "@components/icons";
import { User } from "@components/user";
import { useRouter } from "next/router";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
 const router = useRouter();
 const isActive = (path: string) => router.pathname === path;

 return (
  <div className="grid grid-cols-1 sm:max-h-screen sm:grid-cols-[max-content_1fr] sm:grid-rows-[min-content_100%]">
   <nav className="fixed bottom-0 z-10 shadow-default flex w-full gap-4 px-2 py-2 bg-light/95 dark:bg-dark/95 sm:static sm:overflow-y-auto sm:max-h-screen sm:flex sm:flex-col sm:order-none sm:col-end-1">
    <Link
     prefetch={false}
     href="/"
     className={`icon-w-text ${isActive("/") ? "active" : ""}`}
    >
     <IHome className="icon" />
     <span>Home</span>
    </Link>
    <Link
     href="/explore"
     className={`icon-w-text ${isActive("/explore") ? "active" : ""}`}
    >
     <IExplore className="icon" />
     <span>Explore</span>
    </Link>
    <Link href="/create" className={`icon-w-text ${isActive("/create") ? "active" : ""}`}>
     <ICreate className="icon" />
     <span>Create</span>
    </Link>
    <User />
   </nav>
   <main className="mb-[3.75rem] w-full relative order-first sm:order-last sm:min-h-screen sm:max-h-screen sm:overflow-y-auto sm:col-start-2 sm:row-start-1">
    {children}
   </main>
  </div>
 );
};

export default RootLayout;
