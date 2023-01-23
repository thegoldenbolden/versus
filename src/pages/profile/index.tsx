import type { ReactNode } from "react";
import type { GetServerSideProps } from "next";

import { useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import Head from "next/head";

import { deleteRequest } from "@lib/make-requests";
import { IDeleteLine } from "@components/ui/icons";
import getUser from "@lib/get-user";
import RootLayout from "@layouts/root";
import Feed from "@components/feed";
import Footer from "@components/ui/footer";

const Profile = (props: ProfileProps) => {
 const [success, setSuccess] = useState(true);
 const [loading, setLoading] = useState(false);
 const router = useRouter();
 const queryClient = useQueryClient();

 const handleDelete = async () => {
  try {
   setLoading(true);
   !success && setSuccess(true);
   await deleteRequest(`/api/users/${props.user.id}`);
   queryClient.invalidateQueries();
   router.push("/");
  } catch (err) {
   setSuccess(false);
  } finally {
   setLoading(false);
  }
 };

 return (
  <>
   <Head>
    <title>Versus Zero | Profile</title>
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
   <Feed.Container>
    <Feed.Items>
     <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center">
      This page is currently a work in progress, however if you would like to delete your
      account. Please click the button below.
      {!success && <span>There was an error deleting your profile.</span>}
      <button
       className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-sm text-lotion w-max bg-primary"
       disabled={loading}
       onClick={() => handleDelete()}
      >
       <IDeleteLine />
       <span>Delete Account</span>
      </button>
     </div>
    </Feed.Items>
   </Feed.Container>
   <Feed.Sidebar>
    <Footer />
   </Feed.Sidebar>
  </>
 );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
 const session = await getUser(req, res);
 if (!session?.user?.id) return { redirect: { destination: "/login", permanent: false } };

 // TODO: Add username when supported.
 return {
  props: {
   user: {
    id: session.user.id ?? null,
    image: session.user.image ?? "",
    name: session.user.name ?? "",
   },
  },
 };
};

Profile.getLayout = (page: ReactNode) => <RootLayout>{page}</RootLayout>;
export default Profile;

type ProfileProps = {
 user: { id: string; image: string | undefined; name: string };
 totals: { likes: number; posts: number; votes: number };
};
