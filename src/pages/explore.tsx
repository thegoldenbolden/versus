import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

import Searchbar from "@components/input/searchbar";
import { formatNumber } from "@lib/format";
import Loading from "@components/loading";
import RootLayout from "@layouts/root";
import usePrompt from "@hooks/usePrompt";
import Description from "@components/prompt/description";
import Tags from "@components/prompt/tags";

// TODO: possibly refresh page every search
// TODO: move prompt total count to own route

const Explore = ({ query: q }: { query: Versus.GetPromptArgs }) => {
 const [query, setQuery] = useState<Versus.GetPromptArgs>(q);
 const infinite = usePrompt({ query });

 const updateParams = (key: keyof Versus.GetPromptArgs, value: any) => {
  setQuery({ ...query, ...{ [key]: value } });
 };

 return (
  <div className="p-4">
   <Searchbar />
   <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {infinite.loadingInitial && <Loading />}
    {infinite.isEmpty && <span>No Versus Were Found</span>}
    {infinite.pages.map((page) => {
     if (!page) <></>;
     return page.prompts.map((prompt) => {
      return (
       <div
        className="flex flex-col justify-between w-full max-w-[300px] h-full p-4 rounded-md bg-light aspect-video shadow-default"
        key={prompt.number}
       >
        <div className="flex flex-col gap-[0.25rem]">
         <Link
          href={`/${prompt.number}`}
          className="font-display text-2xl truncate max-w-[250px] hover:underline focus:underline"
         >
          {prompt.title}
         </Link>
         <span className="block text-xs font-bold">by {prompt.author.name}</span>
         <div className="flex flex-wrap gap-2 text-xs text-secondary dark:text-primary">
          <span>{formatNumber(prompt.likes)} likes</span>•
          <Link
           href={`/${prompt.number}/comments`}
           className="hover:underline focus:underline"
          >
           {formatNumber(prompt.comments)} comments
          </Link>
         </div>
        </div>
        <Description description={prompt.description} />
        <Tags tags={prompt.tags} />
       </div>
      );
     });
    })}
   </div>
  </div>
 );
};

Explore.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
 return { props: { query: query ?? {} } };
};

export default Explore;
