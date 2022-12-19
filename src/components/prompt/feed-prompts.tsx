import { Fragment } from "react";

import usePrompts from "@hooks/usePrompt";
import { MAX_PROMPTS_PER } from "@lib/constants";
import NotFound from "@prompt/not-found";
import FallbackPrompt from "@prompt/fallback";
import Prompt from ".";
import Spinner from "@components/spinner";

export default function PromptFeed(props: { pid?: string }) {
 const infinite = usePrompts({ query: { ...props } });

 if (infinite.loadingInitial) {
  return (
   <>
    {Array.from({ length: MAX_PROMPTS_PER }).map((x, i) => {
     return (
      <Fragment key={i}>
       <FallbackPrompt />
      </Fragment>
     );
    })}
   </>
  );
 }

 if (infinite.isEmpty) {
  return <NotFound />;
 }

 return (
  <>
   {infinite.pages.map((page) => {
    return page.prompts.map((prompt) => {
     return (
      <Fragment key={prompt.number}>
       <Prompt prompt={prompt} mutate={infinite.mutate} />
      </Fragment>
     );
    });
   })}
   {!props.pid && !infinite.isEmpty && !infinite.reachingEnd && (
    <div className="flex justify-center col-span-2">
     <button
      className="flex items-center gap-2 px-4 py-2 toggle-opacity shadow-default"
      disabled={infinite.isRefreshing || infinite.loadingMore}
      onClick={() => infinite.setSize((p) => p + 1)}
     >
      {infinite.isRefreshing ? (
       <>
        <Spinner />
        <span>Loading</span>
       </>
      ) : (
       <>Load More</>
      )}
     </button>
    </div>
   )}
  </>
 );
}
