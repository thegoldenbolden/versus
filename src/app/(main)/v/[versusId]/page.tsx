import type { Metadata } from "next";

import getVersus from "@lib/versus/getVersus";
import getUser from "@lib/auth/get-user";
import Feed from "@components/feed";
import VersusWithMutation from "./mutation";

type Params = { params: { versusId: string } };

export const revalidate = 60;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
 try {
  const user = await getUser();
  const versus = await getVersus({ userId: user?.id, cursor: params.versusId });
  if (!versus) return { title: "Versus" };

  return {
   title: `${versus.title}`,
   description: versus.description,
   authors: {
    name: versus.author.username,
    url: `${process.env.NEXTAUTH_URL}/${versus.author.username}`,
   },
  };
 } catch (error) {
  return { title: "Versus" };
 }
}

export default async function Versus({ params }: Params) {
 const user = await getUser();
 const versus = await getVersus({ userId: user?.id, cursor: params.versusId });

 return (
  <Feed.Container>
   <Feed.Items>
    <VersusWithMutation
     initial={versus}
     versusId={params.versusId}
     sessionUserId={user?.id}
    />
   </Feed.Items>
  </Feed.Container>
 );
}
