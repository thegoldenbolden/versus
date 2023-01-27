import Head from "next/head";

import useVersusMutation from "@hooks/use-versus-mutation";
import useFeed from "@hooks/use-feed";
import RootLayout from "@layouts/root";
import Searchbar from "@components/input/searchbar";
import VersusFeed from "@components/versus/feed";
import Feed from "@components/feed";
import Footer from "@components/ui/footer";

const Page = () => {
 const { status, data, ...feed } = useFeed();
 const mutation = useVersusMutation();

 return (
  <>
   <Head>
    <title>Versus Zero</title>
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
   <Feed.Container>
    <Feed.Items>
     <VersusFeed
      status={status}
      data={data}
      hasNextPage={feed.hasNextPage}
      isFetchingNextPage={feed.isFetchingNextPage}
      fetchNextPage={feed.fetchNextPage}
      mutation={mutation}
     />
    </Feed.Items>
   </Feed.Container>
   <Feed.Sidebar>
    <div className="flex flex-col gap-2">
     <Searchbar />
     <Footer />
    </div>
   </Feed.Sidebar>
  </>
 );
};

Page.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Page;
