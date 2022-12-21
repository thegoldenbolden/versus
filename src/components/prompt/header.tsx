import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import DeleteButton from "../button/delete";
import Link from "next/link";
import { MutateData } from "types";
import Avatar from "@components/avatar";
import { IVerticalEllipsis } from "@components/icons";

export default function Header(props: MutateData<Versus.Prompt>) {
 return (
  <div className="header">
   <Avatar image={props.data.author.image} />
   <div className="flex flex-col truncate text-sm iline-flex grow">
    <span className="font-bold">{props.data.author.name}</span>
    <Link
     href={`/p/${props.data.number}`}
     className="opacity-75 hover:opacity-100 focus:opacity-100 hover:underline focus:underline"
    >
     {props.data.title}
    </Link>
   </div>
   {/* Currently users can only delete prompt. Plan to add the ability to report prompt and more */}
   {/* Refresh route /[prompt] when deleted */}
   {props.data.userCanDelete && (
    <div>
     <Menu as="div" className="relative z-10 inline-block text-left w-max min-w-64">
      <Menu.Button className="flex items-center justify-center px-1 py-2 rounded-full aspect-square hover:bg-dark/5 hover:dark:bg-light/10 focus:bg-dark/5 focus:dark:bg-light/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
       <IVerticalEllipsis className="w-5 h-5 text-dark dark:text-light" />
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
       <Menu.Items className="absolute right-0 w-24 mt-4 origin-top-right rounded-sm shadow-lg bg-theme color-theme min-w-max ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
         <Menu.Item>
          {({ active }) => (
           <DeleteButton
            mutate={props.mutate}
            route={`/api/prompts/${props.data.number}`}
            isRefreshing={props.isRefreshing}
            reload={props.reload}
            showText
            btnClass={`${
             active ? "bg-red-500 text-light btn-primary-effects" : ""
            } group flex w-full items-center rounded-sm px-2 py-1 text-sm`}
            svgClass="w-5 h-5 mr-2"
           />
          )}
         </Menu.Item>
        </div>
       </Menu.Items>
      </Transition>
     </Menu>
    </div>
   )}
  </div>
 );
}
