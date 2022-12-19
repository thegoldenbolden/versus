import AuthLayout from "../layouts/auth";
import { Login } from "../components/button/auth";
import { IDiscord } from "../components/icons";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";

const Page = () => {
 return (
  <>
   <span>Please login with one of the following:</span>
   <Login provider="discord">
    <IDiscord />
   </Login>
  </>
 );
};

Page.getLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
 const token = await getToken({ req });
 return !token ? { props: {} } : { redirect: { destination: "/", permanent: false } };
};
