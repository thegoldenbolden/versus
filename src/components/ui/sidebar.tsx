import type { IconBaseProps } from "react-icons/lib";
import Link from "next/link";

import getTags from "@lib/versus/getTags";
import getUser from "@lib/auth/get-user";
import { bebas } from "@lib/fonts";
import ActiveLink from "./active-link";
import Create from "../buttons/create";
import Avatar from "../user/avatar";
import {
 IUserLine,
 IUserFill,
 IHomeLine,
 IHomeFill,
 ILoginLine,
 ISearchFill,
 ISearchLine,
} from "./icons";

async function Navbar() {
 const _user = getUser();
 const _tags = getTags();
 const [user, tags] = await Promise.all([_user, _tags]);

 const iconProps: IconBaseProps = { className: "w-7 h-7" };

 const linkClass = `flex flex-row w-full py-2 font-sans text-xl items-center justify-center
		sm:px-2 sm:gap-4 sm:rounded-full
		sm:hover:bg-zinc-500/25
		sm:dark:hover:bg-lotion-translucent
		xl:min-w-48 xl:items-end xl:grow xl:rounded-md xl:justify-start
		dark:border-smoky-black-translucent`;

 const loginIcons = [<ILoginLine key="login-line" {...iconProps} />];
 const homeIcons = [
  <IHomeLine key="home-line" {...iconProps} />,
  <IHomeFill key="home-fill" {...iconProps} />,
 ];
 const exploreIcons = [
  <ISearchLine key="search-line" {...iconProps} />,
  <ISearchFill key="search-fill" {...iconProps} />,
 ];
 const profileIcons = [
  <IUserLine key="profile-line" {...iconProps} />,
  <IUserFill key="profile-fill" {...iconProps} />,
 ];

 return (
  <nav
   className="
   flex w-full
   sm:flex-col sm:items-center sm:gap-4 sm:shadow-none"
  >
   <ActiveLink className={linkClass} slug="home" icons={homeIcons}>
    <span className="hidden xl:inline-flex">Home</span>
   </ActiveLink>
   <ActiveLink className={linkClass} slug="explore" icons={exploreIcons}>
    <span className="hidden xl:inline-flex">Explore</span>
   </ActiveLink>
   {user?.username ? (
    <ActiveLink
     icons={!user.image ? profileIcons : []}
     className={linkClass}
     slug={user.username}
    >
     {user.image && (
      <Avatar
       image={{ url: user.image, rounded: "rounded-full", height: 30, width: 30 }}
      />
     )}
     <span className="hidden xl:inline-flex">Profile</span>
    </ActiveLink>
   ) : (
    <ActiveLink className={linkClass} slug="login" icons={loginIcons}>
     <span className="hidden xl:inline-flex">Login</span>
    </ActiveLink>
   )}
   <Create tags={tags} user={user} />
  </nav>
 );
}

function Logo() {
 return (
  <Link
   aria-label="Versus Zero"
   href="/"
   className={`${bebas.className} order-first hidden w-full px-2 py-1 text-4xl sm:block`}
  >
   VS
  </Link>
 );
}

export default async function Sidebar() {
 return (
  <aside
   className="
		 fixed flex bottom-0 z-50 w-full bg-white shadow-md shadow-black
   dark:bg-black
   sm:flex-col sm:items-center sm:gap-2 sm:h-min sm:w-max sm:px-2 sm:shadow-none sm:sticky sm:top-0 sm:bg-transparent 
			sm:dark:bg-transparent
   md:items-end md:justify-self-end
			xl:min-w-[200px]"
  >
   <Logo />
   {/* @ts-expect-error Server Component */}
   <Navbar />
  </aside>
 );
}
