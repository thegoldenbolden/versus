import { redirect } from "next/navigation";
import Link from "next/link";

import { IBackLine } from "@components/ui/icons";
import getUser from "@lib/auth/get-user";
import ProfileForm from "./profile-form";
import Feed from "@components/feed";

export const metadata = {
 title: "Your settings",
};

export default async function Settings() {
 const user = await getUser();

 if (!user || !user.id) {
  return redirect("/login");
 }

 return (
  <Feed.Container>
   <header className="flex items-center gap-2 p-2 border-b-2 border-b-solid border-b-smoky-black-translucent dark:border-b-lotion-translucent">
    <Link
     href={`/${user.username}`}
     className="p-2 rounded-full hover:bg-smoky-black-translucent focus:bg-smoky-black-translucent dark:hover:bg-lotion-translucent dark:focus:bg-lotion-translucent"
    >
     <IBackLine className="w-6 h-6" aria-label="back icon" />
    </Link>
    <h1 className="text-xl">Settings</h1>
   </header>
   <ProfileForm user={user} />
  </Feed.Container>
 );
}
