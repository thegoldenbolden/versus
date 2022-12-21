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

const Page = ({ data }: { data: Versus.Prompt }) => {
 return (
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
