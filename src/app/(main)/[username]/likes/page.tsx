import type { ProfileProps } from "types";
import type { UserProfile } from "@lib/users/getUserByUsername";
import type { Metadata } from "next";

import getUserByUsername from "@lib/users/getUserByUsername";
import getUser from "@lib/auth/get-user";
import VersusFeed from "../feed";

export const metadata: Metadata = { title: "Likes" };

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
   type="likes"
   sessionUserId={sessionUser?.id}
  />
 );
}
