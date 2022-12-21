import { Fragment } from "react";
import Link from "next/link";

import RootLayout from "@layouts/root";
import Searchbar from "@components/input/searchbar";
import ErrorBoundary from "@components/error";
import Spinner from "@components/spinner";
import FallbackPrompt from "@components/prompt/fallback";
import Prompt from "@components/prompt";
import useInfinite from "@hooks/useInfinite";
import Head from "next/head";

function LoadingInitial() {
 return (
  <>
   {Array.from({ length: 5 }).map((x, i) => {
    return (
     <Fragment key={i}>
      <FallbackPrompt />
     </Fragment>
    );
   })}
  </>
 );
}

function isEmpty() {
 return (
  <div className="flex flex-col items-center self-center justify-center w-screen h-full gap-4 mt-5 mb-auto">
   <span className="text-2xl">Currently, there are no versus D:</span>
   <Link href="/create" className="text-3xl font-display">
    Create A Versus
   </Link>
  </div>
 );
}

const Page = () => {
 const infinite = useInfinite({ route: "/api/prompts?" });

 const Component =
  infinite.loadingInitial || infinite.isRefreshing
   ? LoadingInitial
   : infinite.isEmpty
   ? isEmpty
   : null;

 return (
  <>
   <Head>
    <title>VersusZero</title>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f8d07a" />
    <meta name="msapplication-TileColor" content="#f8d07a" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="description" content="Who will come out on top?" />
   </Head>
   <div className="flex flex-col items-center w-full min-h-screen gap-4 pb-2">
    <ErrorBoundary>
     <Searchbar />
     <div className="flex flex-col w-[min(100%,480px)] gap-4">
      {Component ? (
       <Component />
      ) : (
       <>
        {infinite.pages.map((page) => {
         return page.items.map((prompt) => {
          return (
           <Fragment key={prompt.number}>
            <Prompt
             data={prompt}
             // mutate={infinite.mutate}
             isRefreshing={infinite.isRefreshing}
            />
           </Fragment>
          );
         });
        })}
        {!infinite.reachingEnd && (
         <button
          className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-sm btn-hover bg-theme color-theme shadow-default"
          disabled={infinite.isRefreshing || infinite.loadingMore}
          onClick={() => infinite.setSize((p) => p + 1)}
         >
          {infinite.isRefreshing || infinite.loadingMore ? (
           <>
            <Spinner />
            <span>Loading</span>
           </>
          ) : (
           <>Load More</>
          )}
         </button>
        )}
       </>
      )}
     </div>
    </ErrorBoundary>
   </div>
  </>
 );
};

Page.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Page;
