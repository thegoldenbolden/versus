import Feed from "@components/feed";
import getUser from "@lib/auth/get-user";
import VersusWithMutation from "./mutation";

// TODO: Generate Dynamic Metadata

export default async function Versus({ params }: { params: { versusId: string } }) {
 const user = await getUser();

 return (
  <Feed.Container>
   <Feed.Items>
    <VersusWithMutation versusId={params.versusId} sessionUserId={user?.id} />
   </Feed.Items>
  </Feed.Container>
 );
}
