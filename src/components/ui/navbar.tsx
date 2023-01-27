import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// prettier-ignore
import { IUserLine, IHomeLine, IHomeFill,  IUserFill, ILoginLine, ILogoutLine, ISearchFill, ISearchLine } from "./icons";
import Create from "../buttons/create";
import Avatar from "../user/avatar";

export default function Header() {
 const router = useRouter();
 const isActive = (path: string) => router.pathname === path;

 const activeHome = isActive("/");
 const activeProfile = isActive("/[username]");
 const activeExplore = isActive("/explore");
 const Home = activeHome ? IHomeFill : IHomeLine;
 const Explore = activeExplore ? ISearchFill : ISearchLine;

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
     <Home aria-label="home icon" className="w-7 h-7" />
     <span className="hidden xl:inline-flex">Home</span>
    </Link>
    <Link
     title="Explore"
     href="/explore"
     className={`${
      activeExplore ? "font-bold" : ""
     } text-inherit py-3 w-full flex items-center justify-center border-none rounded-none px-2 sm:py-2 bg-transparent transition-colors hover:bg-smoky-black-translucent hover:backdrop-blur-sm focus:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:dark:bg-lotion-translucent sm:px-2 sm:rounded-full xl:py-2 xl:justify-start xl:rounded-md xl:gap-6`}
    >
     <Explore aria-label="search icon" className="w-7 h-7" />
     <span className="hidden xl:inline-flex">Explore</span>
    </Link>
    <UserRoutes activeProfile={activeProfile} />
    <Create
     overrideClass
     className="flex items-center justify-center order-3 w-full px-2 py-3 bg-transparent border-2 border-transparent border-solid rounded-none :hover:bg-smoky-black-translucent dark:hover:bg-lotion-translucent sm:py-2 font-display sm:rounded-full sm:order-last xl:rounded-md xl:bg-smoky-black xl:text-lotion xl:dark:bg-lotion xl:dark:text-smoky-black xl:hover:bg-smoky-black/75 xl:focus:bg-smoky-black/75 xl:dark:hover:bg-lotion/90 xl:dark:focus:bg-lotion/90"
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
    <ILogoutLine aria-label="logout icon" className="w-7 h-7" />
    <span className="hidden xl:inline-flex"> Logout</span>
   </Link>
  ) : (
   <Link
    title="Login"
    href="/login"
    className="flex items-center justify-center order-last w-full px-2 py-3 transition-colors bg-transparent border-none rounded-none sm:py-2 text-inherit hover:bg-smoky-black-translucent hover:backdrop-blur-sm focus:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:dark:bg-lotion-translucent sm:p-2 sm:rounded-full xl:py-2 xl:justify-start xl:rounded-md xl:gap-6"
   >
    <ILoginLine aria-labelledby="login icon" className="w-7 h-7" />
    <span className="hidden xl:inline-flex">Login</span>
   </Link>
  );

 return (
  <>
   {Auth}
   {session?.user.username && (
    <Link
     title="Profile"
     href={`/${session.user.username}`}
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
