import type { PropsWithChildren } from "react";
import ErrorBoundary from "../error-boundary";

const Feed: FeedType = {
 Container: (props) => {
  return (
   <section className="relative min-h-screen ml-auto mr-auto w-screen max-w-[600px] dark:border-lotion-translucent sm:border-solid sm:border-l-[1px] sm:border-r-[1px] sm:gap-4">
    <ErrorBoundary>{props.children}</ErrorBoundary>
   </section>
  );
 },
 Items: (props) => {
  return (
   <div id="feed" className="flex flex-col items-center w-full min-h-screen">
    <ErrorBoundary>{props.children}</ErrorBoundary>
   </div>
  );
 },
 Sidebar: (props) => {
  return (
   <div className="sticky top-0 hidden max-w-[350px] h-min lg:block lg:p-2">
    <ErrorBoundary>{props.children}</ErrorBoundary>
   </div>
  );
 },
};

export default Feed;
type Components = "Container" | "Items" | "Sidebar";
type FeedType = { [P in Components]: (props: PropsWithChildren) => JSX.Element };
