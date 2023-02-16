"use client";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import useSticky from "@hooks/use-sticky";
import Tabs from "../ui/tabs";

type StickyHeader = {
 tab: number;
 setTab: Dispatch<SetStateAction<number>>;
} & PropsWithChildren;

export default function StickyHeader(props: StickyHeader) {
 const visible = useSticky();
 const top = visible ? "top-0" : "-top-full";
 return (
  <div className={`sticky w-full ${top} transition-[top_ease-in-out_200ms] z-40`}>
   <div className="sticky top-0 z-40 flex flex-col w-full bg-white border-b-2 border-solid border-b-smoky-black-translucent dark:border-b-lotion-translucent dark:bg-black">
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
