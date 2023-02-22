"use client";
import type { Session } from "next-auth";
import type { Tag } from "types";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import dynamic from "next/dynamic";

import useModal from "@hooks/use-modal";

import { ICreateLine, ICreateFill } from "../ui/icons";
import Restricted from "../auth/restricted";
import Spinner from "../loading/spinner";
import { bebas } from "@lib/fonts";

const VersusFormModal = dynamic(() => import("../forms/versus"), {
 loading: () => (
  <div className="absolute flex items-center justify-center w-full h-full -z-50">
   <Spinner />
  </div>
 ),
});

type CreateProps = { tags: Tag[]; user?: Session["user"] };

export default function Create({ tags, user }: CreateProps) {
 const { isOpen, closeModal, openModal } = useModal();
 const Icon = isOpen ? ICreateFill : ICreateLine;

 return (
  <>
   <button
    aria-label="create versus"
    className={`${bebas.className} flex flex-row py-2 w-full text-xl items-center justify-center bg-transparent
				sm:px-2 sm:gap-4 sm:rounded-full sm:order-last
				sm:bg-primary sm:text-lotion
				sm:dark:bg-secondary
				sm:hover:brightness-75
				xl:items-end xl:grow xl:rounded-md xl:justify-start`}
    type="button"
    onClick={openModal}
   >
    <Icon className="w-7 h-7 xl:hidden" />
    <span className="hidden xl:inline-flex xl:grow xl:justify-center">Create</span>
   </button>
   {!user ? (
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
          <Dialog.Title
           as="h3"
           className={`${bebas.className} mb-4 text-4xl text-center`}
          >
           Create a Versus
          </Dialog.Title>
          <VersusFormModal
           tags={tags}
           user={{
            id: user.id,
            name: user.name,
            username: user.username,
            image: user.image,
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
