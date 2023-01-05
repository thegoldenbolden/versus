import { GetServerSideProps } from "next";
import { signOut } from "next-auth/react";

import Spinner from "@components/spinner";
import useRequest from "@hooks/useRequest";
import RootLayout from "@layouts/root";
import getUser from "@lib/get-user";
import { makeRequest } from "@lib/make-requests";
import { IFlag } from "@components/icons";

const Settings = () => {
 const request = useRequest(async () => await makeRequest(`/api/user/delete`, "DELETE"));

 const handleDelete = async () => {
  // Temporary workaround to delete users via next-auth.
  request.trigger();
  signOut({ callbackUrl: "/" });
 };

 return (
  <div className="flex flex-col items-center justify-center h-screen gap-2">
   <p className="text-center">
    This page is currently under development. However, if you would like to delete your
    account click the &apos;Delete Account&apos; button below.
   </p>
   <button
    onClick={handleDelete}
    disabled={request.submitting}
    className="px-4 py-2 text-white transition-colors bg-red-500 border-2 border-transparent border-solid rounded-md hover:border-red-500 focus:border-red-500 hover:bg-transparent focus:bg-transparent hover:text-red-500 focus:text-red-500"
    type="submit"
   >
    {request.submitting ? <Spinner /> : <>Delete Account</>}
   </button>
   <span className="flex gap-2 text-sm font-bold text-red-500">
    <IFlag className="w-5 h-5" />
    This action is irreversible.
   </span>
   {request.error && (
     <span className="text-sm">
      There was an error deleting your account. If the problem persists, please contact us{" "}
      <a
       className="font-bold text-secondary dark:text-primary"
       target="_blank"
       rel="noreferrer noopener"
       href="mailto:noodlexcvii@gmail.com"
      >
       @noodlexcvii@gmail.com
      </a>
     </span>
    )}
  </div>
 );
};

Settings.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Settings;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
 const session = await getUser(req, res);
 if (!session?.user?.id) {
  return { redirect: { destination: "/", permanent: false } };
 }

 return {
  props: {},
 };
};
