import { useSession } from "next-auth/react";
import { useState, Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";

import { makePostRequest, makeRequest } from "@lib/make-requests";
import { IClose, ILike } from "@components/icons";
import { BASE_URL } from "@lib/constants";
import { bebas } from "@lib/fonts";
import log from "@lib/log";
import { validatePostLike } from "@lib/versus/validate";
import useRequest from "@hooks/useRequest";
import { KeyedMutator } from "swr";

// prettier-ignore
type LikeProps = { 
	userLikes: boolean; 
	pid: string; 
	cid?: string; 
	size?: string; 
	setLikes?: React.Dispatch<React.SetStateAction<number>>;
	mutate?: KeyedMutator<any[]>
};

// prettier-ignore
const likeClassName = "fill-secondary text-secondary hover:text-dark hover:dark:text-light focus:dark:text-light focus:text-dark hover:fill-transparent focus:fill-transparent";
// prettier-ignore
const unlikeClassName = "hover:fill-secondary hover:text-secondary focus:fill-secondary focus:text-secondary";

const Like = (props: LikeProps) => {
 const { data: session } = useSession();
 const [like, setLike] = useState(props.userLikes);
 const [modal, setModal] = useState(false);
 const request = useRequest(async () => {
  if (!session?.user) {
   setModal(true);
   return;
  }

  if (request.submitting) return;

  const previous = like;
  const { pid, cid } = props;
  // prettier-ignore
  const url = `${BASE_URL}/api/likes?pid=${pid}` + (cid ? `&type=comment&cid=${cid}` : `&type=prompt`);

  // If an error happens reset to initial state and continue throwing the error
  // If a user already likes the prompt or comment the delete the like
  if (like) {
   setLike(false);
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
  setLike(true);
  props.setLikes && props.setLikes((p) => p + 1);
  await makePostRequest(url, { pid, cid, type: cid ? "comment" : "prompt" });
  props.mutate && props.mutate();
 });

 const closeModal = () => setModal(false);
 const handleLike = async () => request.trigger();

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
     className={`${props.size ?? "w-8 h-8"} ${like ? likeClassName : unlikeClassName}`}
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
        <Dialog.Panel className="w-full max-w-sm p-6 overflow-hidden text-left align-middle transition-all transform rounded-md shadow-xl bg-light">
         <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
          VersusZero
         </Dialog.Title>
         <div className="mt-2">
          <p className="text-sm text-gray-500">You must be logged in to leave a like.</p>
         </div>

         <div className="mt-4">
          <button
           type="button"
           className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
