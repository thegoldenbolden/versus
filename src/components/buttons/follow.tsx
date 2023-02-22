"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteRequest, postRequest } from "@lib/make-requests";
import { UserProfile } from "@lib/users/getUserByUsername";
import Restricted from "@components/auth/restricted";
import useModal from "@hooks/use-modal";

type FollowProps = {
 user: NonNullable<UserProfile>;
 userCanFollow: boolean;
 sessionUserId?: string;
};

export default function Follow({ user, sessionUserId, userCanFollow }: FollowProps) {
 const [followers, setFollowers] = useState(user._count.followers);
 const [userFollows, setUserFollows] = useState(user.userFollows);
 const [loading, setLoading] = useState(false);
 const { isOpen, closeModal } = useModal();
 const router = useRouter();

 const handleFollow = async () => {
  if (loading) return;
  const previous = { userFollows, followers };
  try {
   setLoading(true);
   if (userFollows) {
    setUserFollows(false);
    setFollowers((p) => p - 1);
    await deleteRequest(`/api/users/${sessionUserId}/follow/${user.id}`);
   } else {
    setUserFollows(true);
    setFollowers((p) => p + 1);
    await postRequest(`/api/users/${sessionUserId}/follow/${user.id}`);
   }

   router.refresh();
  } catch (err: any) {
   setUserFollows(previous.userFollows);
   setFollowers(previous.followers);
  } finally {
   setLoading(false);
  }
 };

 return (
  <>
   {!userCanFollow ? (
    <Restricted
     isOpen={isOpen}
     closeModal={closeModal}
     message={`You must be signed in to follow ${user.name}`}
    />
   ) : (
    <button
     aria-label={`${userFollows ? "Unfollow" : "Follow"} ${user.name}`}
     aria-disabled={loading}
     disabled={loading}
     onClick={handleFollow}
     className={`text-sm border-2 border-solid border-transparent px-4 rounded-full font-bold hover:brightness-110 focus:brightness-110 ${
      userFollows
       ? "bg-transparent after:content-['Following'] hover:after:content-['Unfollow'] border-smoky-black dark:border-lotion hover:border-red-500 hover:text-red-500"
       : "text-lotion after:content-['Follow'] bg-smoky-black dark:text-smoky-black dark:bg-lotion hover:brightness-90 focus:brightness-90"
     }`}
    />
   )}
  </>
 );
}
