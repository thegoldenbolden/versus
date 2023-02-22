import { redirect } from "next/navigation";

import LogoutButton from "@components/auth/logout";
import getUser from "@lib/auth/get-user";
import { bebas } from "@lib/fonts";

export const metadata = {
 title: "Logout",
};

export default async function Logout() {
 const user = await getUser();

 if (!user) {
  redirect("/login");
 }

 return (
  <div className="grid h-screen place-items-center">
   <div className="flex flex-col items-center justify-between w-64">
    <h2 className={`${bebas.className} text-4xl`}>Versus Zero</h2>
    <div className="flex flex-col items-center w-full gap-2">
     <span>Come back soon!</span>
     <div className="flex flex-col w-full gap-2">
      <LogoutButton />
     </div>
    </div>
   </div>
  </div>
 );
}
