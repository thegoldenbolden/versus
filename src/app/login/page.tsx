import { redirect } from "next/navigation";
import getUser from "@lib/auth/get-user";
import Providers from "@components/auth/providers";
import { bebas } from "@lib/fonts";

export const metadata = {
 title: "Login",
};

export default async function Login() {
 const user = await getUser();

 if (user) {
  redirect("/");
 }

 return (
  <div className="grid place-items-center h-screen">
   <div className="flex flex-col items-center justify-between max-w-screen w-136">
    <h2 className={`${bebas.className} text-4xl`}>Versus Zero</h2>
    <Providers />
   </div>
  </div>
 );
}
