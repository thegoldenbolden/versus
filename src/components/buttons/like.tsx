"use client";
import type { MutateData } from "types";
import { IHeartLine } from "../ui/icons";
import Restricted from "../auth/restricted";
import useModal from "@hooks/use-modal";

type LikeProps = {
 sessionUserId?: string | null;
 userLikes: boolean;
 versusId: number;
 commentId?: string;
};

const Like = ({
 versusId,
 userLikes,
 sessionUserId,
 mutation,
}: MutateData<LikeProps>) => {
 const { isOpen, closeModal, openModal } = useModal();

 const handleLike = () => {
  if (!sessionUserId) {
   openModal();
   return;
  }

  mutation.mutate({ userLikes, versusId, type: "like" });
 };

 const likeClassName =
  "fill-primary text-primary hover:text-smoky-black hover:dark:text-lotion focus:dark:text-lotion focus:text-smoky-black hover:fill-transparent focus:fill-transparent";
 const unlikeClassName =
  "hover:fill-primary hover:text-primary focus:fill-primary focus:text-primary";

 return (
  <>
   <button
    title="Like"
    aria-disabled={mutation.isLoading}
    disabled={mutation.isLoading}
    onClick={handleLike}
    className="flex items-center justify-center gap-2"
   >
    <IHeartLine className={`w-8 h-8 ${userLikes ? likeClassName : unlikeClassName}`} />
   </button>
   {!sessionUserId && (
    <Restricted
     message="Please login in to leave a like."
     isOpen={isOpen}
     closeModal={closeModal}
    />
   )}
  </>
 );
};

export default Like;
