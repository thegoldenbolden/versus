import type { GetManyVersus } from "../../../types";

import { getRequest } from "@lib/make-requests";
import getUser from "@lib/auth/get-user";
import VersusFeed from "@components/versus/feed";
import Feed from "@components/feed";

export const metadata = {
 title: "Home",
};

export default async function Home() {
 const session = await getUser();
 const response = await getRequest<GetManyVersus>("http://localhost:3000/api/versus");

 return (
  <Feed.Container>
   <VersusFeed
    sessionUser={session?.user}
    initialData={response?.data?.ok ? response.data : undefined}
   />
  </Feed.Container>
 );
}
