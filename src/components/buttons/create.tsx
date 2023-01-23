import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

import { ICreateLine, ICreateFill } from "../ui/icons";
import Restricted from "../auth/restricted";
import Spinner from "../loading/spinner";

const CreateVersus = dynamic(() => import("../versus/create"), {
 loading: () => (
  <div className="absolute flex items-center justify-center w-full h-full -z-50">
   <Spinner />
  </div>
 ),
});

export default function Create({ className, overrideClass }: CreateProps) {
 const { data: session } = useSession();
 const [isOpen, setIsOpen] = useState(false);

 const closeModal = () => {
  setIsOpen(false);
 };
 const openModal = () => {
  setIsOpen(true);
 };

 const Icon = isOpen ? ICreateFill : ICreateLine;

 // Currently class name controls whether to display Create <span />

 return (
  <>
   <button
    title="Create Versus"
    className={
     overrideClass
      ? className
      : `flex items-center justify-center p-2 rounded-sm font-display text-lotion bg-primary dark:bg-secondary dark:text-smoky-black hover:opacity-90 active:opacity-90 focus:opacity-90`
    }
    type="button"
    onClick={openModal}
   >
    <Icon className="w-7 h-7 xl:hidden" />
    <span className={className ? "hidden xl:inline-block" : ""}>Create</span>
   </button>
   {!session?.user?.id ? (
    <Restricted
     message="Please login to create a versus."
     isOpen={isOpen}
     closeModal={closeModal}
    />
   ) : (
    <Transition appear show={isOpen} as={Fragment}>
     <Dialog as="div" className="relative z-50" onClose={closeModal}>
      <Transition.Child
       as={Fragment}
       enter="ease-out duration-300"
       enterFrom="opacity-0"
       enterTo="opacity-100"
       leave="ease-in duration-200"
       leaveFrom="opacity-100"
       leaveTo="opacity-0"
      >
       <div className="fixed inset-0 bg-smoky-black-transparent" />
      </Transition.Child>
      <div className="fixed inset-0 overflow-y-auto">
       <div className="flex items-center justify-center min-h-full">
        <Transition.Child
         as={Fragment}
         enter="ease-out duration-300"
         enterFrom="opacity-0 scale-95"
         enterTo="opacity-100 scale-100"
         leave="ease-in duration-200"
         leaveFrom="opacity-100 scale-100"
         leaveTo="opacity-0 scale-95"
        >
         <Dialog.Panel className="flex flex-col w-full max-w-lg min-h-screen pt-4 border-l-2 border-r-2 border-solid border-lotion dark:border-lotion-translucent drop-shadow-md text-smoky-black dark:text-lotion backdrop-blur-md bg-lotion dark:bg-smoky-black">
          <Dialog.Title as="h3" className="mb-4 text-4xl text-center font-display">
           Create a Versus
          </Dialog.Title>
          <CreateVersus
           user={{
            id: session.user.id,
            name: session.user.name,
            username: session.user.username,
            image: session.user.image,
           }}
           closeModal={closeModal}
          />
         </Dialog.Panel>
        </Transition.Child>
       </div>
      </div>
     </Dialog>
    </Transition>
   )}
  </>
 );
}

type CreateProps = { className?: string; overrideClass?: boolean };
