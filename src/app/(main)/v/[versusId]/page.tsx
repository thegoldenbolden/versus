import getUser from "@lib/auth/get-user";
import VersusWithMutation from "./mutation";

// TODO: Generate Dynamic Metadata

export default async function Versus({ params }: { params: { versusId: string } }) {
 const session = await getUser();

 return (
  <>
   <VersusWithMutation versusId={params.versusId} sessionUser={session?.user} />
  </>
 );
}
