import type { NextPageWithLayout } from "pages/_app";
import type { ReactNode } from "react";
import type { GetServerSideProps } from "next";

import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { getRequest } from "@lib/make-requests";
import versusKeys from "@lib/versus/queryKeys";
import useVersusMutation from "@hooks/use-versus-mutation";
import RootLayout from "@layouts/root";
import Versus from "@components/versus";
import NotFound from "@components/versus/not-found";
import FallbackVersus from "@components/versus/fallback";
import Feed from "@components/feed";
import CustomError from "@components/ui/error";
import Footer from "@components/ui/footer";
import Searchbar from "@components/input/searchbar";

const Page: NextPageWithLayout<{ versusId: string }> = ({ versusId }) => {
 const router = useRouter();
 const mutation = useVersusMutation(() => router.push("/"));

 const { data: versus, status } = useQuery({
  queryKey: versusKeys.detail(versusId as string),
  queryFn: async () => {
   const url = `/api/versus/${versusId}`;
   const response = await getRequest<Versus.ResponseData<Versus.Versus>>(url);
   return response.data.ok ? response.data.data : null;
  },
 });

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
    <div className="flex flex-col gap-2">
     <Searchbar />
     <Footer />
    </div>
   </Feed.Sidebar>
  </>
 );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
 return { props: { versusId: params?.versusId ?? null } };
};

Page.getLayout = (page: ReactNode) => <RootLayout>{page}</RootLayout>;
export default Page;
