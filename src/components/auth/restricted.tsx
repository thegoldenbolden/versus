"use client";
import { Dialog, Transition } from "@headlessui/react";
import { bebas } from "@lib/fonts";
import { Fragment } from "react";
import Providers from "./providers";

type RestrictedProps = { isOpen: boolean; message?: string; closeModal: () => void };
export default function Restricted({ isOpen, closeModal, message }: RestrictedProps) {
 return (
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
     <div className="fixed inset-0 bg-zinc-900/50 dark:bg-zinc-900/75" />
    </Transition.Child>
    <div className={`fixed inset-0 overflow-y-auto font-sans`}>
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
       <Dialog.Panel className="flex flex-col w-full max-w-sm gap-4 p-6 text-center rounded-sm bg-lotion dark:bg-smoky-black text-smoky-black dark:text-lotion drop-shadow-md text-lotion md:rounded-sm backdrop-blur-md">
        <Dialog.Title
         as="h3"
         className={`${bebas.className} w-full text-3xl jusitfy-between colors-theme`}
        >
         Versus Zero
        </Dialog.Title>
        <p className="text-lg">{message ?? "Please login to do this."}</p>
        <Providers />
        <button
         onClick={closeModal}
         className="text-sm font-bold underline opacity-90 hover:opacity-100 focus:opacity-100"
        >
         Maybe Later
        </button>
       </Dialog.Panel>
      </Transition.Child>
     </div>
    </div>
   </Dialog>
  </Transition>
 );
}
