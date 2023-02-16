import { IBackLine } from "@components/ui/icons";
import getUserByUsername from "@lib/users/getUserByUsername";
import { PropsWithChildren } from "react";

type Params = { params: { username: string } };
type ProfileLayoutProps = Params & PropsWithChildren;

// export async function generateMetadata({ params }: Params) {
//  const user = await fetch("http://localhost:3000/api/users/search/${params.username}");
//  if (!user)
//   return {
//    title: "Not Found",
//   };
// }

export default function ProfileLayout({ children, params }: ProfileLayoutProps) {
 return (
  <div>
   <header>
    <div>
     <IBackLine />
     {params.username}
    </div>
   </header>
   {children}
  </div>
 );
}
