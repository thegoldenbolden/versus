import type { PropsWithChildren } from "react";
import type { ProfileProps } from "types";
import Link from "next/link";

import getUser from "@lib/auth/get-user";
import getUserByUsername from "@lib/users/getUserByUsername";
import { bebas } from "@lib/fonts";
import { ISettingsLine } from "@components/ui/icons";
import Follow from "@components/buttons/follow";
import Avatar from "@components/user/avatar";
import Feed from "@components/feed";

type Props = ProfileProps & PropsWithChildren;

// TODO: Generate Metadata

export const metadata = {
 title: {
  default: "Profile",
  template: "Profile | %s",
 },
};

export default async function ProfileLayout({ children, params }: Props) {
 const sessionUser = await getUser();
 const profile = await getUserByUsername(params.username, sessionUser?.id);

 if (!profile) {
  return (
   <Feed.Container>
    <div
     className={
      bebas.className + " text-3xl min-h-screen flex items-center justify-center"
     }
    >
     This account does not exist.
    </div>
   </Feed.Container>
  );
 }

 return (
  <Feed.Container>
   <section className="flex items-center gap-6 px-2 py-4">
    <Avatar
     image={{ url: profile.image, height: 96, width: 96, rounded: "rounded-full" }}
    />
    <div className="flex flex-col gap-2 grow">
     <div className="flex flex-wrap items-center justify-between gap-2 text-xl grow">
      <h1 className="flex flex-col w-full">
       <div className="flex flex-wrap justify-between">
        <span>{profile.name}</span>
        <Follow
         user={profile}
         userCanFollow={(sessionUser && profile.id !== sessionUser.id) ?? false}
         sessionUserId={sessionUser?.id}
        />
        {profile.id === sessionUser?.id && (
         <Link
          title="Settings"
          className="flex items-center gap-2 px-2 rounded-sm rounded-full bg-smoky-black text-lotion hover:bg-smoky-black/80 focus:bg-smoky-black/80 dark:bg-lotion dark:text-smoky-black dark:hover:bg-lotion/80 focus:hover:bg-lotion/80"
          href="/settings"
         >
          <ISettingsLine />
          <span className="hidden text-sm md:block">Edit Profile</span>
         </Link>
        )}
       </div>
       <span className="text-sm opacity-85">@{profile.username}</span>
      </h1>
     </div>
     <div className="flex flex-wrap gap-2 text-sm font-bold">
      <span>
       {`${profile._count.followers}`}&nbsp;
       <span className="font-normal text-smoky-black/80 dark:text-lotion/80">
        followers
       </span>
      </span>
      <span>
       {`${profile._count.following}`}&nbsp;
       <span className="font-normal text-smoky-black/80 dark:text-lotion/80">
        following
       </span>
      </span>
     </div>
    </div>
   </section>
   {children}
  </Feed.Container>
 );
}
