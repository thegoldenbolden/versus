import type { PropsWithChildren } from "react";
import { roboto } from "@lib/fonts";
import StickyHeader from "./sticky-header";

const Feed: FeedType = {
 Container: (props) => {
  return (
   <section className="relative min-h-screen ml-auto mr-auto w-screen max-w-[34rem] dark:border-lotion-translucent sm:border-solid sm:border-l sm:border-r sm:gap-4">
    {props.children}
   </section>
  );
 },
 Header: (props) => {
  return (
   <>
    {props.title && (
     <div className={`${roboto.className} p-2 font-bold text-xl capitalize`}>
      {props.title}
     </div>
    )}
    {typeof props.tab == "number" && props.setTab && (
     <StickyHeader tab={props.tab} setTab={props.setTab}>
      {props.children}
     </StickyHeader>
    )}
   </>
  );
 },
 Items: (props) => {
  return (
   <div className="flex flex-col items-center w-full min-h-screen divide-y divide-y-solid divide-smoky-black-translucent dark:divide-lotion-translucent">
    {props.children}
   </div>
  );
 },
 Sidebar: (props) => {
  return (
   <aside className="sticky top-0 hidden max-w-[350px] h-min lg:block lg:p-2">
    {props.children}
   </aside>
  );
 },
};

export default Feed;

type HeaderProps = {
 tab?: number;
 setTab?: React.Dispatch<React.SetStateAction<number>>;
 title?: string;
};

type FeedType = {
 Container: (props: PropsWithChildren) => JSX.Element;
 Items: (props: PropsWithChildren) => JSX.Element;
 Sidebar: (props: PropsWithChildren) => JSX.Element;
 Header: (props: PropsWithChildren & HeaderProps) => JSX.Element;
};
