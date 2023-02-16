import { redirect } from "next/navigation";
import getUser from "@lib/auth/get-user";
import Providers from "@components/auth/providers";

export const metadata = {
 title: "Login",
};

export default async function Login() {
 const session = await getUser();

 if (session?.user) {
  redirect("/");
 }

 return (
  <div className="grid place-items-center h-screen">
   <div className="flex flex-col items-between max-w-screen w-96">
    <header>VersusZero</header>
    <Providers />
   </div>
  </div>
 );
}
