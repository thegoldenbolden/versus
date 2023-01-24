import { useSession } from "next-auth/react";
import { useState } from "react";

import type { MutateData } from "types/mutate";
import { IHeartLine } from "../ui/icons";
import Restricted from "../auth/restricted";

const likeClassName =
 "fill-primary text-primary hover:text-smoky-black hover:dark:text-lotion focus:dark:text-lotion focus:text-smoky-black hover:fill-transparent focus:fill-transparent";
const unlikeClassName =
 "hover:fill-primary hover:text-primary focus:fill-primary focus:text-primary";

const Like = ({ data, mutation }: MutateData<LikeProps>) => {
 const { versusId, userLikes } = data;
 const { data: session } = useSession();
 const [preventLike, setPreventLike] = useState(false);

 const closeModal = () => setPreventLike(false);

 const handleLike = () => {
  if (!session?.user.id) {
   setPreventLike(true);
   return;
  }

  mutation.mutate({ userLikes, versusId, type: "like" });
 };

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
   {!session?.user.id && (
    <Restricted
     message="Please login in to leave a like."
     isOpen={preventLike}
     closeModal={closeModal}
    />
   )}
  </>
 );
};

export default Like;

type LikeProps = {
 userLikes: boolean;
 versusId: number;
 commentId?: string;
};
