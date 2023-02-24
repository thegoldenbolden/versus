import type { Metadata } from "next";

import getUser from "@lib/auth/get-user";
import VersusFeed from "@components/versus/feed";
import Feed from "@components/feed";

export const metadata: Metadata = { title: "Explore" };

export default async function Explore() {
 const user = await getUser();

 return (
  <Feed.Container>
   <VersusFeed sessionUserId={user?.id} />
  </Feed.Container>
 );
}
