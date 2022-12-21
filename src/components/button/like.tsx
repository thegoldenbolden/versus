import { useSession } from "next-auth/react";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { makePostRequest, makeRequest } from "@lib/make-requests";
import { ILike } from "@components/icons";
import { BASE_URL } from "@lib/constants";
import { validatePostLike } from "@lib/versus/validate";
import useRequest from "@hooks/useRequest";
import { MutateData } from "types";
import Link from "next/link";

// prettier-ignore
type LikeProps = { 
	userLikes: boolean; 
	pid: string; 
	cid?: string; 
	size?: string; 
	setLikes?: React.Dispatch<React.SetStateAction<number>>;
} & Pick<MutateData<Versus.Prompt>, "mutate" | "isRefreshing">

// prettier-ignore
const likeClassName = "fill-secondary text-secondary hover:text-dark hover:dark:text-light focus:dark:text-light focus:text-dark hover:fill-transparent focus:fill-transparent";
// prettier-ignore
const unlikeClassName = "hover:fill-secondary hover:text-secondary focus:fill-secondary focus:text-secondary";

const Like = (props: LikeProps) => {
 const { data: session } = useSession();
 const [userLikes, setUserLikes] = useState(props.userLikes);
 const [modal, setModal] = useState(false);

 const request = useRequest(async () => {
  if (!session?.user) {
   setModal(true);
   return;
  }

  if (request.submitting) return;

  const { pid, cid } = props;
  // prettier-ignore
  let url = `${BASE_URL}/api/prompts/${pid}`;
  url += cid ? `/comments/${cid}/likes` : "/likes";

  // If an error happens reset to initial state and continue throwing the error
  // If a user already likes the prompt or comment the delete the like
  if (userLikes) {
   setUserLikes(false);
   props.setLikes && props.setLikes((p) => p - 1);
   await makeRequest(url, "DELETE");
   props.mutate && props.mutate();
   return;
  }

  validatePostLike({
   pid,
   cid,
   uid: session.user.id as string,
   type: cid ? "comment" : "prompt",
  });
  // Create like
  setUserLikes(true);
  props.setLikes && props.setLikes((p) => p + 1);
  await makePostRequest(url, { pid, cid, type: cid ? "comment" : "prompt" });
  props.mutate && props.mutate();
 });

 const closeModal = () => setModal(false);
 const handleLike = async () => {
  if (!props.isRefreshing) {
   request.trigger();
  }
 };

 return (
  <>
   <button
    title="Like"
    aria-disabled={request.submitting}
    disabled={request.submitting}
    onClick={handleLike}
    className="flex items-center justify-center gap-2"
   >
    <ILike
     className={`${props.size ?? "w-8 h-8"} ${
      userLikes ? likeClassName : unlikeClassName
     }`}
    />
   </button>
   <Transition appear show={modal} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
     <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
     >
      <div className="fixed inset-0 bg-opacity-25 bg-dark" />
     </Transition.Child>

     <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-full p-4 text-center">
       <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
       >
        <Dialog.Panel className="w-full drop-shadow-md max-w-sm p-6 overflow-hidden text-left align-middle transition-all transform rounded-sm shadow-xl bg-theme color-theme">
         <Dialog.Title as="h3" className="text-2xl leading-6 colors-theme">
          VersusZero
         </Dialog.Title>
         <div className="mt-2">
          <p className="text-md text-dark/75 dark:text-light/75">
           You must be logged in to leave a like.
          </p>
         </div>

         <div className="mt-4 flex gap-2 items-center">
          <Link
           className="inline-flex justify-center px-4 py-2 text-sm font-medium color-theme bg-secondary/25 dark:bg-primary/25 grow border border-transparent rounded-sm hover:bg-dark hover:dark:bg-light hover:text-light hover:dark:text-dark focus:outline-none focus-visible:ring-2 transition-colors focus-visible:ring-blue-500 focus-visible:ring-offset-2"
           href="/login"
          >
           Login
          </Link>
          <button
           type="button"
           className="inline-flex justify-center px-4 py-2 text-sm font-medium color-theme bg-secondary/25 dark:bg-primary/25 grow border border-transparent rounded-sm hover:bg-dark hover:dark:bg-light hover:text-light hover:dark:text-dark focus:outline-none focus-visible:ring-2 transition-colors focus-visible:ring-blue-500 focus-visible:ring-offset-2"
           onClick={closeModal}
          >
           Got it, thanks!
          </button>
         </div>
        </Dialog.Panel>
       </Transition.Child>
      </div>
     </div>
    </Dialog>
   </Transition>
  </>
 );
};

export default Like;
