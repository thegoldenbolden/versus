import getUser from "@lib/get-user";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import { Logout } from "../components/button/auth";
import AuthLayout from "../layouts/auth";

const Page = () => {
 return (
  <>
   <Head>
    <title>VersusZero | Logout</title>
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
    <meta name="description" content="Logout of VersusZero" />
   </Head>
   <span>See you soon!</span>
   <Logout />
  </>
 );
};

Page.getLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
 const session = await getUser(req, res);
 // prettier-ignore
 return session ? { props: {} } : { redirect: { destination: "/login", permanent: false } };
};
