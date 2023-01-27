import type { NextPageWithLayout } from "./_app";
import Head from "next/head";

import useVersusMutation from "@hooks/use-versus-mutation";
import useFeed from "@hooks/use-feed";
import RootLayout from "@layouts/root";
import Feed from "@components/feed";
import Searchbar from "@components/input/searchbar";
import Footer from "@components/ui/footer";
import VersusFeed from "@components/versus/feed";

const Explore: NextPageWithLayout = () => {
 const { status, data, ...feed } = useFeed();
 const mutation = useVersusMutation();

 return (
  <>
   <Head>
    <title>Explore / VZ</title>
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
    <meta name="description" content="Find any versus available" />
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
     >
      <Searchbar className="static" />
     </VersusFeed>
    </Feed.Items>
   </Feed.Container>
   <Feed.Sidebar>
    <Footer />
   </Feed.Sidebar>
  </>
 );
};

Explore.getLayout = (page) => <RootLayout>{page}</RootLayout>;
export default Explore;
