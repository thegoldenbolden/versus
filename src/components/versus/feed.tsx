import type { PropsWithChildren, FC } from "react";
import type { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import type { Mutate } from "types/mutate";

import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CONFIG from "@lib/versus/config";
import Versus from "../versus";
import FallbackVersus from "../versus/fallback";
import VersusNotFound from "../versus/not-found";
import Spinner from "../loading/spinner";
import CustomError from "../ui/error";
import Header from "../feed/header";

const VersusFeed: VersusFeed = ({ children, status, data, ...props }) => {
 const [tab, setTab] = useState<number>(0);
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
   <div className="flex flex-col w-full divide-y divide-smoky-black-translucent dark:divide-lotion-translucent">
    <Header tab={tab} setTab={setTab}>
     {children}
    </Header>
    {Component
     ? Component
     : data?.pages.map((page) => {
        return page?.items.map((versus, i) => (
         <Fragment key={versus.id}>
          <Versus data={{ versus, displaySingle }} mutation={props.mutation} />
         </Fragment>
        ));
       })}
   </div>
   {data?.pages[0] && (
    <LoadMore
     hasNextPage={props.hasNextPage}
     isFetchingNextPage={props.isFetchingNextPage}
     fetchNextPage={props.fetchNextPage}
    />
   )}
  </>
 );
};

export default VersusFeed;

function LoadMore({ hasNextPage, fetchNextPage, isFetchingNextPage }: Infinite) {
 const { inView, ref } = useInView();

 useEffect(() => {
  inView && hasNextPage && fetchNextPage();
 }, [inView, hasNextPage, fetchNextPage]);

 return (
  <button
   ref={ref}
   onClick={() => hasNextPage && fetchNextPage()}
   className="flex items-center justify-center w-full gap-2 p-2 mb-16 text-lg text-center bg-transparent border-2 border-transparent border-solid text-smoky-black dark:text-lotion border-t-smoky-black-translucent dark:border-t-lotion-translucent font-display sm:mb-0"
   disabled={!hasNextPage || isFetchingNextPage}
  >
   {isFetchingNextPage ? (
    <>
     <Spinner />
     <>Loading more...</>
    </>
   ) : hasNextPage ? (
    <>Load more</>
   ) : (
    <>You reached the end!</>
   )}
  </button>
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

type VersusFeed = FC<
 PropsWithChildren &
  Infinite & {
   data: InfiniteData<Versus.ResponsePagination<Versus.Versus> | null> | undefined;
   status: string;
   mutation: Mutate;
  }
>;

type Infinite = {
 hasNextPage: boolean | undefined;
 isFetchingNextPage: boolean | undefined;
 fetchNextPage: UseInfiniteQueryResult["fetchNextPage"];
};
