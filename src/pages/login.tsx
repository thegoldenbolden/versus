import AuthLayout from "../layouts/auth";
import { Login } from "../components/button/auth";
import { IDiscord, IGoogle, ITwitter } from "../components/icons";
import { GetServerSideProps } from "next";
import Head from "next/head";
import getUser from "@lib/get-user";

const Page = () => {
 return (
  <>
   <Head>
    <title>VersusZero | Login</title>
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
    <meta name="description" content="Login to VersusZero" />
   </Head>
   <span>Please login with one of the following:</span>
   {/* <Login provider="google">
    <IGoogle />
   </Login> */}
   <Login provider="twitter">
    <ITwitter />
   </Login>
   <Login provider="discord">
    <IDiscord />
   </Login>
  </>
 );
};

Page.getLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
 const token = await getUser(req, res);
 return !token ? { props: {} } : { redirect: { destination: "/", permanent: false } };
};
