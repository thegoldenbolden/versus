"use client";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";

import CONFIG from "@lib/versus/config";
import useFeed from "@hooks/use-feed";
import useVersusMutation from "@hooks/use-versus-mutation";

import Versus from "../versus";
import FallbackVersus from "../versus/fallback";
import VersusNotFound from "../versus/not-found";

import Feed from "../feed";
import LoadMore from "../buttons/load-more";
import Searchbar from "@components/input/searchbar";

type VersusFeedProps = { sessionUserId?: string | null };

export default function VersusFeed({ sessionUserId }: VersusFeedProps) {
 const mutation = useVersusMutation(sessionUserId);
 const { status, data, ...feed } = useFeed();
 const pathname = usePathname();

 const [tab, setTab] = useState(0);
 const displaySingle = tab === 1;

 let Component = null;
 if (status === "loading") {
  Component = <LoadingInitial />;
 } else if (status === "error") {
  throw new Error("Something happened fetching the feed");
 } else if (!data?.pages?.[0]) {
  Component = <VersusNotFound />;
 }

 return (
  <>
   <Feed.Header title={pathname === "/home" ? "home" : null} tab={tab} setTab={setTab}>
    {pathname == "/explore" && <Searchbar />}
   </Feed.Header>
   <Feed.Items>
    {Component
     ? Component
     : data?.pages.map((page) => {
        return page?.items.map((versus, i) => (
         <Fragment key={versus.id}>
          <Versus
           sessionUserId={sessionUserId}
           versus={versus}
           displaySingle={displaySingle}
           mutation={mutation}
          />
         </Fragment>
        ));
       })}
    {data?.pages?.[0] && (
     <LoadMore
      hasNextPage={feed.hasNextPage}
      isFetchingNextPage={feed.isFetchingNextPage}
      fetchNextPage={feed.fetchNextPage}
     />
    )}
   </Feed.Items>
  </>
 );
}

function LoadingInitial() {
 return (
  <>
   {Array.from({ length: CONFIG.MAX_VERSUS_PER_PAGE }).map((x, i) => {
    return (
     <Fragment key={i}>
      <FallbackVersus />
     </Fragment>
    );
   })}
  </>
 );
}
