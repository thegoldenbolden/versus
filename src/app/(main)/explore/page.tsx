import type { GetManyVersus, VersusQuery } from "../../../types";

import { getRequest } from "@lib/make-requests";
import getUser from "@lib/auth/get-user";
import VersusFeed from "@components/versus/feed";
import Feed from "@components/feed";

export const metadata = {
 title: "Explore",
};

export default async function Explore({ searchParams }: { searchParams?: VersusQuery }) {
 const session = await getUser();
 const response = await getRequest<GetManyVersus>("http://localhost:3000/api/versus", {
  params: searchParams,
 });

 return (
  <Feed.Container>
   <VersusFeed
    sessionUser={session?.user}
    initialData={response?.data?.ok ? response.data : undefined}
   />
  </Feed.Container>
 );
}
