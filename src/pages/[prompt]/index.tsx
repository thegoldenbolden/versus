import { ReactNode } from "react";
import { GetServerSideProps } from "next";

import { getPrompts } from "@lib/versus/prompt";
import ErrorBoundary from "@components/error";
import RootLayout from "@layouts/root";
import Prompt from "@components/prompt";
import getUser from "@lib/get-user";
import NotFound from "@components/prompt/not-found";

const Page = ({ prompt }: { prompt: Versus.Prompt }) => {
 return (
  <ErrorBoundary>{!prompt ? <NotFound /> : <Prompt prompt={prompt} />}</ErrorBoundary>
 );
};

Page.getLayout = (page: ReactNode) => <RootLayout>{page}</RootLayout>;

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
 let prompt: any = null;
 if (params?.prompt) {
  const uid = (await getUser(req, res))?.user?.id;
  prompt = await getPrompts({ take: 1, uid, cursor: params.prompt as string });
  prompt = prompt?.[0];
 }

 return { props: { prompt } };
};

export default Page;
