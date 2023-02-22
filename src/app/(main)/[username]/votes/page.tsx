import type { ProfileProps } from "types";
import type { UserProfile } from "@lib/users/getUserByUsername";

import getUserByUsername from "@lib/users/getUserByUsername";
import getUser from "@lib/auth/get-user";
import VersusFeed from "../feed";

export const metadata = {
 title: "Votes",
};

export default async function UserVotes({ params }: ProfileProps) {
 const sessionUser = await getUser();
 const profile = (await getUserByUsername(
  params.username,
  sessionUser?.id
 )) as NonNullable<UserProfile>;

 return (
  <VersusFeed
   username={profile.username}
   profileId={profile.id}
   type="votes"
   sessionUserId={sessionUser?.id}
  />
 );
}
