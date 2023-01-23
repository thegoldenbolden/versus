import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import useSticky from "@hooks/use-sticky";
import Tabs from "../ui/tabs";

export default function Header(props: HeaderProps) {
 const visible = useSticky();
 const position = props.tab === 1 ? "absolute" : "sticky";
 const top = visible ? "top-0" : "-top-full";
 return (
  <div
   id="feed-header"
   className={`sticky w-full ${top} transition-[top_ease-in-out_200ms] z-[50]`}
  >
   <div
    className={`${position} top-0 z-50 flex flex-col w-full border-b-2 border-solid border-b-smoky-black-translucent dark:border-b-lotion-translucent bg-white dark:bg-black`}
   >
    <div>{props.children}</div>
    <Tabs
     tab={props.tab}
     setTab={props.setTab}
     tabs={[{ text: "Long Strip" }, { text: "Full Page" }]}
    />
   </div>
  </div>
 );
}

type HeaderProps = {
 tab: number;
 setTab: Dispatch<SetStateAction<number>>;
} & PropsWithChildren;
