import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// prettier-ignore
import { IUserLine, IHomeLine, IHomeFill,  IUserFill, ILoginLine, ILogoutLine } from "./icons";
import Create from "../buttons/create";
import Avatar from "../user/avatar";

export default function Header() {
 const router = useRouter();
 const isActive = (path: string) => router.pathname === path;

 const activeHome = isActive("/");
 const activeProfile = isActive("/account");
 const Home = activeHome ? IHomeFill : IHomeLine;

 return (
  <header className="fixed bottom-0 z-50 w-full bg-white shadow-md sm:px-2 dark:bg-black shadow-black sm:shadow-none sm:sticky sm:top-0 sm:bg-transparent sm:dark:bg-transparent sm:h-min sm:flex sm:flex-col sm:items-center md:items-start sm:w-auto">
   <nav className="flex flex-row w-full font-sans text-lg justify-evenly dark:border-smoky-black-translucent sm:flex-col sm:gap-4 xl:min-w-48 xl:items-end xl:grow">
    <span className="order-first hidden w-full px-2 py-1 text-4xl sm:block font-display">
     vz
    </span>
    <Link
     title="Home"
     href="/"
     className={`${
      activeHome ? "font-bold" : ""
     } text-inherit py-3 w-full flex items-center justify-center border-none rounded-none px-2 sm:py-2 bg-transparent transition-colors hover:bg-smoky-black-translucent hover:backdrop-blur-sm focus:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:dark:bg-lotion-translucent sm:px-2 sm:rounded-full xl:py-2 xl:justify-start xl:rounded-md xl:gap-6`}
    >
     <Home className="w-7 h-7" />
     <span className="hidden xl:inline-flex">Home</span>
    </Link>
    <UserRoutes activeProfile={activeProfile} />
    <Create
     overrideClass
     className="flex items-center justify-center order-3 w-full px-2 py-3 bg-transparent border-2 border-solid border-none rounded-none sm:py-2 font-display border-primary dark:border-secondary hover:bg-smoky-black-translucent hover:backdrop-blur-sm focus:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:dark:bg-lotion-translucent sm:rounded-full sm:order-last xl:rounded-md xl:bg-primary xl:dark:bg-secondary xl:hover:bg-transparent xl:focus:bg-transparent xl:active:bg-transparent xl:border-solid xl:border-2 xl:hover:border-primary xl:focus:border-primary xl:active:border-primary xl:hover:dark:border-secondary xl:focus:dark:border-secondary xl:hover:text-primary xl:focus:text-primary xl:dark:hover:text-secondary xl:dark:focus:text-secondary xl:text-lotion"
    />
   </nav>
  </header>
 );
}

function UserRoutes({ activeProfile }: { activeProfile: boolean }) {
 const { data: session, status } = useSession();

 const Auth =
  status === "loading" ? null : status === "authenticated" ? (
   <Link
    title="Logout"
    href="/logout"
    className="flex items-center justify-center order-last w-full px-2 py-3 transition-colors bg-transparent border-none rounded-none sm:py-2 text-inherit hover:bg-smoky-black-translucent hover:backdrop-blur-sm focus:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:dark:bg-lotion-translucent sm:p-2 sm:rounded-full xl:py-2 xl:justify-start xl:rounded-md xl:gap-6"
   >
    <ILogoutLine className="w-7 h-7" />
    <span className="hidden xl:inline-flex"> Logout</span>
   </Link>
  ) : (
   <Link
    title="Login"
    href="/login"
    className="flex items-center justify-center order-last w-full px-2 py-3 transition-colors bg-transparent border-none rounded-none sm:py-2 text-inherit hover:bg-smoky-black-translucent hover:backdrop-blur-sm focus:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:dark:bg-lotion-translucent sm:p-2 sm:rounded-full xl:py-2 xl:justify-start xl:rounded-md xl:gap-6"
   >
    <ILoginLine className="w-7 h-7" />
    <span className="hidden xl:inline-flex">Login</span>
   </Link>
  );

 return (
  <>
   {Auth}
   {/* TODO: Change /account to /[username] when supported */}
   {session?.user && (
    <Link
     title="Profile"
     href="/profile"
     className={`${
      activeProfile ? "font-bold" : ""
     } order-last text-inherit flex w-full items-center justify-center border-none rounded-none px-2 py-3 sm:py-2 bg-transparent transition-colors hover:bg-smoky-black-translucent hover:backdrop-blur-sm focus:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:dark:bg-lotion-translucent sm:px-2 sm:rounded-full xl:py-2 xl:justify-start xl:rounded-md xl:gap-6`}
    >
     <Avatar
      image={{ url: session?.user.image, rounded: "rounded-full" }}
      icon={activeProfile ? IUserFill : IUserLine}
     />
     <span className="hidden xl:inline-flex">Profile</span>
    </Link>
   )}
  </>
 );
}
