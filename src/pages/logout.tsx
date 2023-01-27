import type { GetServerSideProps } from "next";
import Head from "next/head";

import getUser from "@lib/get-user";
import AuthLayout from "@layouts/auth";
import { Logout } from "@components/auth/logout";

const Page = () => {
 return (
  <>
   <Head>
    <title>Versus Zero | Logout</title>
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
    <meta name="description" content="Sign out of Versus Zero" />
   </Head>
   <div className="flex flex-col gap-2">
    <span className="px-6 text-sm min-w-[250px] text-center max-w-screen">
     Come back soon!
    </span>
    <div className="flex flex-col items-center gap-2 text-lotion justify-evenly">
     <Logout />
    </div>
   </div>
  </>
 );
};

Page.getLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
 const session = await getUser(req, res);
 return session
  ? { props: {} }
  : { redirect: { destination: "/login", permanent: false } };
};
