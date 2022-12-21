import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Searchbar from "@components/input/searchbar";
import { formatNumber } from "@lib/format";
import Loading from "@components/loading";
import RootLayout from "@layouts/root";
import usePrompt from "@hooks/usePrompt";
import Tags from "@components/prompt/tags";
import Spinner from "@components/spinner";

// TODO: add comments

const Explore = ({ query: q }: { query: Versus.GetPromptArgs }) => {
 const [query, setQuery] = useState<Versus.GetPromptArgs>(q);
 const infinite = usePrompt({ query });
 const router = useRouter();

 useEffect(() => {
  const update: any = {};
  const { query: rq } = router;
  if (rq["title"]) update.q = rq.title as string;
  if (rq["tags"]) update.tags = rq.tags as string;
  setQuery((p) => ({ ...p, ...update }));
 }, [router, query]);

 return (
  <>
   <Searchbar />
   <div className="grid gap-4 px-2 py-4 place-content-center grid-cols-explore">
    {infinite.loadingInitial && <Loading />}
    {infinite.isEmpty && <span>No Versus Were Found</span>}
    {!infinite.loadingInitial &&
     infinite.pages.map((page) => {
      if (!page) <></>;
      return page.prompts.map((prompt) => {
       return (
        <div
         className="flex flex-col gap-2 p-2 rounded-sm btn-hover bg-theme color-theme shadow-default"
         key={prompt.number}
        >
         <div className="flex flex-col gap-[0.25rem]">
          <Link
           href={`/p/${prompt.number}`}
           className="text-2xl truncate font-display hover:underline focus:underline"
          >
           {prompt.title}
          </Link>
          <span className="block text-sm font-bold">by {prompt.author.name}</span>
          <div className="flex flex-wrap gap-2 text-xs text-secondary dark:text-primary">
           <span>{formatNumber(prompt.likes)} likes</span>
           {/* <Link
            href={`/p/${prompt.number}/comments`}
            className="hover:underline focus:underline"
           >
            {formatNumber(prompt.comments)} comments
           </Link> */}
          </div>
         </div>
         <p className="truncate">
          {!prompt.description
           ? "No description available"
           : prompt.description.slice(0, 36)}
         </p>
         <Tags tags={prompt.tags} />
        </div>
       );
      });
     })}
    {!infinite.reachingEnd && !infinite.loadingInitial && (
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
   </div>
  </>
 );
};

Explore.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
 return { props: { query: query ?? {} } };
};

export default Explore;
