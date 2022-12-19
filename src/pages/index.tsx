import RootLayout from "@layouts/root";
import Searchbar from "@components/input/searchbar";
import ErrorBoundary from "@components/error";
import PromptFeed from "@components/prompt/feed-prompts";

const Page = () => {
 return (
  <div className="flex flex-col items-center w-full gap-4 ml-auto mr-auto sm:w-max md:py-2">
   <Searchbar />
   <ErrorBoundary>
    <div className="grid grid-cols-[minmax(100%,480px)] xl:grid-cols-[480px_480px] md:gap-4">
     <PromptFeed />
    </div>
   </ErrorBoundary>
  </div>
 );
};

Page.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Page;
