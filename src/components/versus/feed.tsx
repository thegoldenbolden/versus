import type { PropsWithChildren, FC } from "react";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useFeedMutation } from "@hooks/use-feed-mutation";
import useFeed from "@hooks/use-feed";
import CONFIG from "@lib/versus/config";
import Versus from "../versus";
import FallbackVersus from "../versus/fallback";
import VersusNotFound from "../versus/not-found";
import Spinner from "../loading/spinner";
import CustomError from "../ui/error";
import Header from "../feed/header";

const VersusFeed: VersusFeed = ({ query }) => {
 const [tab, setTab] = useState<number>(0);
 const { inView, ref } = useInView();

 const { hasNextPage, fetchNextPage, ...feed } = useFeed(query);
 const mutation = useFeedMutation(query);

 // Fetch more data when the load more button is in view.
 useEffect(() => {
  inView && hasNextPage && fetchNextPage();
 }, [inView, hasNextPage, fetchNextPage]);

 const loadingOrError =
  feed.status === "loading" ? (
   <LoadingInitial />
  ) : feed.status === "error" ? (
   <CustomError />
  ) : null;

 return (
  <>
   {loadingOrError ? (
    loadingOrError
   ) : (
    <>
     {!feed.data?.pages[0] ? (
      <VersusNotFound />
     ) : (
      <>
       <Header tab={tab} setTab={setTab} />
       {feed.data?.pages.map((page) => {
        return page?.items.map((versus, i) => (
         <Fragment key={versus.id}>
          <Versus data={{ versus, displaySingle: tab == 1 }} mutation={mutation} />
         </Fragment>
        ));
       })}
       <button
        ref={ref}
        onClick={() => hasNextPage && fetchNextPage()}
        className="flex items-center justify-center w-full gap-2 p-2 mb-16 text-lg text-center bg-transparent border-2 border-transparent border-solid text-smoky-black dark:text-lotion border-t-smoky-black-translucent dark:border-t-lotion-translucent font-display sm:mb-0"
        disabled={!hasNextPage || feed.isFetchingNextPage}
       >
        {feed.isFetchingNextPage ? (
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
      </>
     )}
    </>
   )}
  </>
 );
};

export default VersusFeed;

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

type VersusFeed = FC<PropsWithChildren & { route?: string; query?: Query }>;
type Query = any;
