import getUser from "@lib/get-user";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import { Logout } from "../components/button/auth";
import AuthLayout from "../layouts/auth";

const Page = () => {
 return (
  <>
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
