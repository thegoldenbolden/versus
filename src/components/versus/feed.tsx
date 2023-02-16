"use client";
import type { Session } from "next-auth";
import type { GetManyVersus, VersusQuery } from "../../types";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";

import CONFIG from "@lib/versus/config";
import useFeed from "@hooks/use-feed";
import useVersusMutation from "@hooks/use-versus-mutation";

import CustomError from "../ui/error";
import Versus from "../versus";
import FallbackVersus from "../versus/fallback";
import VersusNotFound from "../versus/not-found";

import Feed from "../feed";
import LoadMore from "../buttons/load-more";

type VersusFeedProps = {
 sessionUser?: Session["user"];
 initialData?: GetManyVersus;
 searchParams?: VersusQuery;
};

export default function VersusFeed({ sessionUser, initialData }: VersusFeedProps) {
 const { status, data, ...feed } = useFeed(initialData);
 const mutation = useVersusMutation(sessionUser);
 const pathname = usePathname();

 const [tab, setTab] = useState(0);
 const displaySingle = tab === 1;

 let Component = null;
 if (status === "loading") {
  Component = <LoadingInitial />;
 } else if (status === "error") {
  Component = <CustomError />;
 } else if (!data?.pages[0]) {
  Component = <VersusNotFound />;
 }

 return (
  <>
   <Feed.Header title={pathname?.substring(1) ?? "feed"} tab={tab} setTab={setTab} />
   <Feed.Items>
    {Component
     ? Component
     : data?.pages.map((page) => {
        return page?.items.map((versus, i) => (
         <Fragment key={versus.id}>
          <Versus
           sessionUser={sessionUser}
           versus={versus}
           displaySingle={displaySingle}
           mutation={mutation}
          />
         </Fragment>
        ));
       })}
    {data?.pages[0] && (
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
