import type { MutateData } from "types/mutate";
import { IDeleteLine, IMoreLine } from "../ui/icons";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useIsMutating } from "@tanstack/react-query";

export default function More(props: MutateData<Data>) {
 const isMutating = useIsMutating();
 const { mutation, data } = props;
 const { userCanDelete, versusId, commentId } = data;

 const opacity = mutation.isLoading ? "opacity-50" : "opacity-100";
 const handleDelete = () => mutation.mutate({ versusId, commentId, type: "remove" });

 return (
  <>
   {userCanDelete && versusId && (
    <Menu as="div" className="relative z-10 inline-block text-left">
     <Menu.Button
      aria-label="more actions"
      className="flex items-center justify-center px-1 py-2 rounded-full min-w-max aspect-square hover:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:bg-smoky-black-translucent focus:dark:bg-lotion-translucent focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
     >
      <IMoreLine className="w-5 h-5 text-smoky-black dark:text-lotion" />
     </Menu.Button>
     <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
     >
      <Menu.Items className="absolute right-0 w-32 mt-4 origin-top-right rounded-sm shadow-lg drop-shadow-md bg-lotion-semi-opaque dark:bg-smoky-black-semi-opaque color-theme min-w-max ring-1 ring-black ring-opacity-5 focus:outline-none">
       <Menu.Item>
        {({ active }) => (
         <button
          aria-labelledby="Delete versus"
          aria-disabled={mutation.isLoading || isMutating > 0}
          disabled={mutation.isLoading || isMutating > 0}
          className={`flex py-2 rounded-sm justify-center items-center w-full gap-2 ${opacity} ${
           active ? "text-primary dark:text-lotion" : ""
          }`}
          onClick={handleDelete}
         >
          <IDeleteLine aria-label="delete icon" className="w-4 h-4 stroke-inherit" />
          <span className="text-sm">Delete</span>
         </button>
        )}
       </Menu.Item>
      </Menu.Items>
     </Transition>
    </Menu>
   )}
  </>
 );
}

type Data = {
 userCanDelete: boolean;
 versusId: number;
 commentId?: string;
};
