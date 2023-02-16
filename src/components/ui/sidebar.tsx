// prettier-ignore
import { IUserLine, IUserFill, IHomeLine, IHomeFill, ILoginLine, ILogoutLine, ISearchFill, ISearchLine} from "./icons";
import type { IconBaseProps } from "react-icons/lib";
import Avatar from "../user/avatar";

import getUser from "@lib/auth/get-user";
import ActiveLink from "./active-link";
import { bebas } from "@lib/fonts";

export default async function Sidebar() {
 const session = await getUser();
 const iconProps: IconBaseProps = { className: "w-7 h-7" };

 const linkClass = `flex flex-row w-full py-2 font-sans text-xl items-center justify-center
		sm:px-2 sm:gap-4 sm:rounded-full
		sm:hover:bg-smoky-black-translucent
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
   fixed flex bottom-0 z-50 w-full bg-white shadow-md shadow-black
   dark:bg-black
   sm:flex-col sm:items-center sm:items-center sm:gap-2 sm:h-min sm:w-max sm:px-2 sm:shadow-none sm:sticky sm:top-0 sm:bg-transparent 
			sm:dark:bg-transparent
   md:items-end md:justify-self-end
			xl:min-w-[200px]"
  >
   <span
    className={`${bebas.className} order-first hidden w-full px-2 py-1 text-4xl sm:block`}
   >
    vs
   </span>
   <ActiveLink className={linkClass} slug="home" icons={homeIcons}>
    <span className="hidden xl:inline-flex">Home</span>
   </ActiveLink>
   <ActiveLink className={linkClass} slug="explore" icons={exploreIcons}>
    <span className="hidden xl:inline-flex">Explore</span>
   </ActiveLink>
   {session?.user?.username ? (
    <ActiveLink
     icons={!session.user.image ? profileIcons : []}
     className={linkClass}
     slug={session.user.username}
    >
     {session.user.image && (
      <Avatar
       image={{ url: session.user.image, rounded: "rounded-full", height: 30, width: 30 }}
      />
     )}
     <span className="hidden xl:inline-flex">Profile</span>
    </ActiveLink>
   ) : (
    <ActiveLink className={linkClass} slug="login" icons={loginIcons}>
     <span className="hidden xl:inline-flex">Login</span>
    </ActiveLink>
   )}
  </nav>
 );
}
