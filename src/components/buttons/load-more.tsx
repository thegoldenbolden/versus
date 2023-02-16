"use client";

import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Spinner from "@components/loading/spinner";

type Infinite = {
 hasNextPage: boolean | undefined;
 isFetchingNextPage: boolean | undefined;
 fetchNextPage: UseInfiniteQueryResult["fetchNextPage"];
};

export default function LoadMore({
 hasNextPage,
 fetchNextPage,
 isFetchingNextPage,
}: Infinite) {
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
