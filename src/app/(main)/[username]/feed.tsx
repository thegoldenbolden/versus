"use client";
import { Fragment, useState } from "react";
import Link from "next/link";

import VersusNotFound from "@components/versus/not-found";
import Spinner from "@components/loading/spinner";
import useProfileFeed from "@hooks/use-profile-feed";
import Versus from "@components/versus";
import LoadMore from "@components/buttons/load-more";
import StickyHeader from "@components/feed/sticky-header";
import {
 IGridFill,
 IGridLine,
 IHeartFill,
 IHeartLine,
 IThumbUpFill,
 IThumbUpLine,
} from "@components/ui/icons";
import Feed from "@components/feed";

type FeedProps = {
 profileId: string;
 type: "votes" | "versus" | "likes";
 sessionUserId?: string | null;
 username: string;
};

export default function FeedItems(props: FeedProps) {
 const { mutation, feed } = useProfileFeed(
  props.profileId,
  props.type,
  props.sessionUserId
 );

 const [tab, setTab] = useState(0);
 const displaySingle = tab === 1;

 let Component = null;
 if (feed.status === "loading") {
  Component = (
   <div className="w-full flex items-center justify-center py-4">
    <Spinner />
   </div>
  );
 } else if (feed.status === "error") {
  Component = <span>Something unexpected occurred.</span>;
 } else if (!feed.data?.pages?.[0]) {
  Component = <VersusNotFound />;
 }

 return (
  <>
   <StickyHeader tab={0} setTab={setTab}>
    <div className="flex">
     {["versus", "likes", "votes"].map((path) => {
      const href = `/${props.username}` + (path == "versus" ? "" : `/${path}`);
      const active = path !== props.type ? "" : "font-bold";

      const Icon =
       path !== props.type
        ? path == "versus"
          ? IGridLine
          : path == "likes"
          ? IHeartLine
          : IThumbUpLine
        : path == "versus"
        ? IGridFill
        : path == "likes"
        ? IHeartFill
        : IThumbUpFill;

      return (
       <Link
        aria-label={`${props.username} ${path}`}
        className={`flex items-center gap-2 capitalize justify-center px-4 py-2 grow hover:bg-smoky-black-translucent hover:dark:bg-lotion-translucent ${active}`}
        href={href}
        key={path}
        replace
       >
        <Icon aria-label={`${path} icon`} className="text-2xl" />
        <span className="hidden md:block">{path}</span>
       </Link>
      );
     })}
    </div>
   </StickyHeader>
   <Feed.Items>
    {Component
     ? Component
     : feed.data?.pages.map((page) => {
        return page?.items.map((versus, i) => (
         <Fragment key={versus.id}>
          <Versus
           sessionUserId={props.sessionUserId}
           versus={versus}
           displaySingle={displaySingle}
           mutation={mutation}
          />
         </Fragment>
        ));
       })}
    {feed.data?.pages?.[0] && (
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
