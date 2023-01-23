import type { GetServerSideProps } from "next";
import Head from "next/head";

import getUser from "@lib/get-user";
import AuthLayout from "../layouts/auth";
import Providers from "@components/auth/providers";

const Page = ({ error }: { error: string | null }) => {
 return (
  <>
   <Head>
    <title>VZ | Login</title>
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
    <meta name="description" content="Login to Versus Zero" />
   </Head>
   {error && <span className="text-red-500">{error}</span>}
   <Providers />
  </>
 );
};

Page.getLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
 const { req, res } = context;
 const session = await getUser(req, res);
 let error = null;

 if (context.query.error === "OAuthAccountNotLinked") {
  error = "Please login with the same provider as the first time you logged in.";
 }

 return !session
  ? { props: { error } }
  : { redirect: { destination: "/", permanent: false } };
};
