import { Fragment, ReactNode, useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";

import Prompt from "@components/prompt";
import getUser from "@lib/get-user";
import { MAX_PROMPTS_PER } from "@lib/constants";
import RootLayout from "@layouts/root";
import Image from "@components/image";
import useInfinite from "@hooks/useInfinite";
import Spinner from "@components/spinner";
import Link from "next/link";
import FallbackPrompt from "@components/prompt/fallback";
import getUserTotals from "@lib/versus/user/totals";
import Head from "next/head";

type AccountProps = {
 user: { image: string | undefined; name: string };
 totals: {
  likes: number;
  posts: number;
  votes: number;
 };
};

function LoadingInitial() {
 return (
  <div className="flex items-center justify-center min-h-[100px]">
   <Spinner height="24px" width="24px" />
  </div>
 );
}

function isEmpty({ label }: { label: "created" | "liked" | "voted on" }) {
 return (
  <div className="flex flex-col items-center self-center justify-center w-full h-full gap-4 mt-5 mb-auto">
   You haven&apos;t {label} a versus
  </div>
 );
}

const Account = ({ user, totals }: AccountProps) => {
 const [active, setActive] = useState(0);
 const infinite = useInfinite<Versus.GetPromptArgs>({
  route:
   active == 0
    ? "/api/user/prompts"
    : active == 1
    ? "/api/user/prompts/likes"
    : "/api/user/prompts/votes",
 });

 const Component =
  infinite.loadingInitial || infinite.isRefreshing
   ? LoadingInitial
   : infinite.isEmpty
   ? isEmpty
   : null;

 return (
  <>
   <Head>
    <title>VersusZero | Account</title>
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
   <div className="min-h-screen max-w-[720px] items-center justify-center ml-auto mr-auto flex flex-col w-full">
    <header className="flex flex-col w-full gap-2">
     <div className="flex w-full account-header pt-4 flex-col gap-2">
      <div className="z-[2000]">
       <Image
        height={96}
        width={96}
        className="block rounded-full ml-2"
        alt="avatar"
        src={user.image ?? ""}
       />
      </div>
      <span className="px-2 font-bold opacity-75">@{user.name}</span>
     </div>
     <div className="flex gap-2 px-2">
      <span className="text-sm font-bold">
       {totals.posts} <span className="opacity-75">Versus</span>
      </span>
      <span className="text-sm font-bold">
       {totals.likes} <span className="opacity-75">Likes</span>
      </span>
      <span className="text-sm font-bold">
       {totals.votes} <span className="opacity-75">Votes</span>
      </span>
     </div>
     <div className="flex w-full mt-4 border-b-solid border-b-[1px] border-dark/25 dark:border-light/25">
      <button
       onClick={() => setActive(0)}
       className={`px-2 color-theme font-bold opacity-50 py-2 ${
        active == 0 ? "opacity-100 border-t-solid border-t border-white block" : ""
       }`}
      >
       Versus
      </button>
      <button
       onClick={() => setActive(1)}
       className={`px-2 color-theme font-bold opacity-50 py-2 ${
        active == 1 ? "opacity-100 border-t-solid border-t border-white block" : ""
       }`}
      >
       Likes
      </button>
      <button
       onClick={() => setActive(2)}
       className={`px-2 color-theme font-bold opacity-50 py-2 ${
        active == 2 ? "opacity-100 border-t-solid border-t border-white block" : ""
       }`}
      >
       Votes
      </button>
     </div>
    </header>
    <div className="flex flex-col grow w-[min(100%,480px)] gap-4 py-2">
     {Component ? (
      <Component label={active === 0 ? "created" : active === 1 ? "liked" : "voted on"} />
     ) : (
      <>
       {infinite.pages.map((page) => {
        return page.items.map((prompt) => {
         return (
          <Fragment key={prompt.number}>
           <Prompt
            data={prompt}
            // mutate={infinite.mutate}
            isRefreshing={infinite.isRefreshing}
           />
          </Fragment>
         );
        });
       })}
       {!infinite.reachingEnd && (
        <button
         className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-sm btn-hover bg-theme color-theme shadow-default"
         disabled={infinite.isRefreshing || infinite.loadingMore}
         onClick={() => infinite.setSize((p) => p + 1)}
        >
         {infinite.isRefreshing || infinite.loadingMore ? (
          <>
           <Spinner />
           <span>Loading</span>
          </>
         ) : (
          <>Load More</>
         )}
        </button>
       )}
      </>
     )}
    </div>
   </div>
  </>
 );
};

Account.getLayout = (page: ReactNode) => <RootLayout>{page}</RootLayout>;

export default Account;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
 const session = await getUser(req, res);
 if (!session?.user?.id) {
  return { redirect: { destination: "/", permanent: false } };
 }

 const totals = await getUserTotals(session.user.id as string);
 return {
  props: { totals, user: { image: session.user.image, name: session.user.name } },
 };
};
