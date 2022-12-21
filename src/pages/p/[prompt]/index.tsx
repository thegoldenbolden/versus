import { ReactNode } from "react";
import { GetServerSideProps } from "next";
import { mutate } from "swr";

import { getPrompt } from "@lib/versus/prompt";
import ErrorBoundary from "@components/error";
import RootLayout from "@layouts/root";
import Prompt from "@components/prompt";
import getUser from "@lib/get-user";
import NotFound from "@components/prompt/not-found";
import { makeRequest } from "@lib/make-requests";
import Head from "next/head";

const Page = ({ data }: { data: Versus.Prompt }) => {
 return (
  <>
   <Head>
    <title>VersusZero | Account</title>
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
    <meta name="description" content="Your account" />
   </Head>
   <ErrorBoundary>
    <div className="w-full min-h-screen flex justify-center items-center flex-wrap">
     {!data ? (
      <NotFound />
     ) : (
      <Prompt
       data={data}
       reload
       mutate={() =>
        mutate(
         (key) => typeof key === "string" && key.startsWith("/api/prompts?"),
         async () => {
          return await makeRequest("/api/prompts?", "GET");
         },
         { revalidate: true }
        )
       }
      />
     )}
    </div>
   </ErrorBoundary>
  </>
 );
};

Page.getLayout = (page: ReactNode) => <RootLayout>{page}</RootLayout>;

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
 let prompt: any = null;

 if (params?.prompt) {
  const uid = (await getUser(req, res))?.user?.id;
  prompt = await getPrompt(params.prompt as string, uid as string);
 }

 return { props: { data: prompt ?? null } };
};

export default Page;
