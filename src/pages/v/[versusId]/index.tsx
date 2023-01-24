import type { NextPageWithLayout } from "pages/_app";
import type { ReactNode } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import RootLayout from "@layouts/root";
import { useVersusMutation } from "@hooks/use-versus-mutation";
import useVersus from "@hooks/use-versus";
import Versus from "@components/versus";
import NotFound from "@components/versus/not-found";
import FallbackVersus from "@components/versus/fallback";
import Searchbar from "@components/input/searchbar";
import Feed from "@components/feed";
import CustomError from "@components/ui/error";

// TODO: convert to static page and give initial data to query;

const Page: NextPageWithLayout = () => {
 const router = useRouter();
 const { data: versus, status } = useVersus(router.query.versusId as string);
 const mutation = useVersusMutation(() => router.push("/"));

 return (
  <>
   <Head>
    <title>{versus?.title ?? "Versus Zero"}</title>
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
   </Head>
   <Feed.Container>
    <Feed.Items>
     {status === "loading" ? (
      <FallbackVersus />
     ) : status === "error" ? (
      <CustomError />
     ) : !versus ? (
      <NotFound />
     ) : (
      <Versus data={{ versus, displaySingle: false }} mutation={mutation} />
     )}
    </Feed.Items>
   </Feed.Container>
   <Feed.Sidebar>
    <Searchbar />
   </Feed.Sidebar>
  </>
 );
};

Page.getLayout = (page: ReactNode) => <RootLayout>{page}</RootLayout>;
export default Page;
