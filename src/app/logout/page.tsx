import { redirect } from "next/navigation";

import LogoutButton from "@components/auth/logout";
import getUser from "@lib/auth/get-user";

export const metadata = {
 title: "Logout",
};

export default async function Logout() {
 const session = await getUser();

 if (session?.user) {
  redirect("/login");
 }

 return (
  <div className="grid h-screen place-items-center">
   <div className="flex flex-col items-between max-w-screen w-96">
    <header>VersusZero</header>
    <div className="flex flex-col w-full gap-2">
     <span>Come back soon!</span>
     <div className="flex flex-col w-full gap-2">
      <LogoutButton />
     </div>
    </div>
   </div>
  </div>
 );
}
