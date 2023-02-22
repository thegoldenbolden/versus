import type { UserProfile } from "@lib/users/getUserByUsername";
import type { ProfileProps } from "types";

import getUserByUsername from "@lib/users/getUserByUsername";
import getUser from "@lib/auth/get-user";
import VersusFeed from "./feed";

export const metadata = {
 title: "Versus",
};

export default async function UserVersus({ params }: ProfileProps) {
 const sessionUser = await getUser();
 const profile = (await getUserByUsername(
  params.username,
  sessionUser?.id
 )) as NonNullable<UserProfile>;

 return (
  <VersusFeed
   username={profile.username}
   profileId={profile.id}
   type="versus"
   sessionUserId={sessionUser?.id}
  />
 );
}
