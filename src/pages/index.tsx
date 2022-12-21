import RootLayout from "@layouts/root";
import Searchbar from "@components/input/searchbar";
import ErrorBoundary from "@components/error";
import Spinner from "@components/spinner";
import usePrompts from "@hooks/usePrompt";
import FallbackPrompt from "@components/prompt/fallback";
import { Fragment } from "react";
import Prompt from "@components/prompt";
import Link from "next/link";

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
 const infinite = usePrompts({});

 const Component =
  infinite.loadingInitial || infinite.isRefreshing
   ? LoadingInitial
   : infinite.isEmpty
   ? isEmpty
   : null;

 return (
  <div className="flex flex-col items-center w-full min-h-screen gap-4 pb-2">
   <ErrorBoundary>
    <Searchbar />
    <div className="flex flex-col w-[min(100%,480px)] gap-4">
     {Component ? (
      <Component />
     ) : (
      <>
       {infinite.pages.map((page) => {
        return page.prompts.map((prompt) => {
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
 );
};

Page.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Page;
