// "use client";
import { redirect } from "next/navigation";
import getUser from "@lib/auth/get-user";

// import type { GetServerSideProps } from "next";
// import type { Session } from "next-auth";
// import type { NextPageWithLayout } from "pages/_app";
// import type { ChangeEventHandler } from "react";

// import { useState } from "react";
// import { signOut } from "next-auth/react";
// import { useQueryClient } from "@tanstack/react-query";
// import { ZodError } from "zod";
// import { AxiosError } from "axios";
// import Link from "next/link";

// import { deleteRequest, patchRequest } from "@lib/make-requests";
// import { Name, Username } from "@lib/zod-schemas/versus";
// import getUser from "@lib/auth/get-user";
// import RootLayout from "@layouts/root";
// import { IBackLine, IWarningLine } from "@components/ui/icons";
// import Feed from "@components/feed";
// import Footer from "@components/ui/footer";
// import Spinner from "@components/loading/spinner";
// // TODO: Change to useReducer

// type User = Omit<Session["user"], "email">;
// const Settings: NextPageWithLayout<{ user: User }> = ({ user, ...props }) => {
//  const [username, setUsername] = useState(user.username ?? "");
//  const [name, setName] = useState(user.name ?? "");
//  const [status, setStatus] = useState("");
//  const [error, setError] = useState<string | null>(null);
//  const [deleteError, setDeleteError] = useState<string | null>(null);
//  const queryClient = useQueryClient();

//  const handleSubmit: ChangeEventHandler<HTMLFormElement> = async (e) => {
//   e.preventDefault();

//   try {
//    setStatus("loading");
//    const data = {} as { name?: string; username?: string };
//    if (username == user.username && name == user.name) return;

//    if (name && (name !== user.name || !user.name)) {
//     Name.parse(name);
//     data.name = name;
//    }

//    if (username && (username !== user.username || !user.username)) {
//     Username.parse(username);
//     data.username = username;
//    }

//    const response = await patchRequest(`/api/users/${user.id}/name`, data);

//    if (response.data.ok) {
//     setStatus("success");
//     setError(null);
//     queryClient.invalidateQueries();
//    } else {
//     setStatus("error");
//     throw new Error((response.data as { message?: string }).message);
//    }
//   } catch (e: any) {
//    if (e instanceof ZodError) {
//     setError(e.errors?.[0]?.message);
//    } else if (e instanceof AxiosError) {
//     setError(e.response?.data?.message);
//    } else {
//     setError(e.message);
//    }
//    setStatus("error");
//   }
//  };

//  return (
//   <>
//    <Feed.Container>
//     <header className="flex items-center gap-2 p-2 border-b-2 border-b-solid border-b-smoky-black-translucent dark:border-b-lotion-translucent">
//      <Link
//       href={`/${user.username}`}
//       className="p-2 rounded-full hover:bg-smoky-black-translucent focus:bg-smoky-black-translucent dark:hover:bg-lotion-translucent dark:focus:bg-lotion-translucent"
//      >
//       <IBackLine aria-label="back icon" />
//      </Link>
//      <h1>Settings</h1>
//     </header>
//     <Feed.Items>
//      <div className="flex flex-col w-full gap-4 py-2 divide-y divide-smoky-black-translucent dark:divide-lotion-translucent">
//       <form
//        className="flex flex-col w-full gap-2 px-2"
//        id="profile-settings"
//        onSubmit={handleSubmit}
//       >
//        <div className="flex flex-col w-full px-2 py-1 border-2 border-solid rounded-md border-smoky-black-translucent dark:border-lotion-translucent">
//         <label className="text-sm" htmlFor="name">
//          Name
//         </label>
//         <input
//          id="name"
//          autoFocus
//          type="text"
//          className="text-sm"
//          name="name"
//          value={name}
//          minLength={4}
//          placeholder={name ?? "Your name"}
//          autoComplete="off"
//          onChange={(e) => setName(e.target.value)}
//         />
//        </div>
//        <div className="flex flex-col w-full px-2 py-1 border-2 border-solid rounded-md border-smoky-black-translucent dark:border-lotion-translucent">
//         <label className="text-sm" htmlFor="username">
//          Username
//         </label>
//         <input
//          id="username"
//          autoFocus
//          type="text"
//          className="text-sm"
//          name="username"
//          value={username}
//          maxLength={32}
//          minLength={4}
//          placeholder={username ? username : "john.doe"}
//          autoComplete="off"
//          onChange={(e) => setUsername(e.target.value)}
//         />
//        </div>
//        <div className="flex flex-col gap-2 border-2 border-transparent border-solid">
//         {error && status !== "loading" && (
//          <span className="flex items-start gap-2 text-sm text-primary dark:text-yellow-400">
//           <IWarningLine />
//           {error}
//          </span>
//         )}
//         <button
//          className="flex items-center self-end justify-center w-32 p-2 px-4 rounded-sm bg-smoky-black dark:bg-lotion dark:text-smoky-black dark:hover:bg-lotion/75 focus:dark:bg-lotion/75 hover:bg-smoky-black/75 focus:bg-smoky-black/75 text-lotion"
//          aria-disabled={status === "loading"}
//          disabled={status === "loading"}
//          type="submit"
//         >
//          {status === "loading" ? (
//           <span className="flex items-center gap-4">
//            <Spinner border="border-b-lotion dark:border-b-smoky-black border-l-lotion dark:border-l-smoky-black" />
//           </span>
//          ) : (
//           "Save"
//          )}
//         </button>
//        </div>
//       </form>
//       <div className="flex flex-col flex-wrap items-center justify-center w-full gap-2 p-2">
//        <button
//         onClick={async () => {
//          try {
//           signOut({ callbackUrl: "/" });
//           await deleteRequest(`/api/users/${user.id}`);
//           setDeleteError(null);
//           queryClient.invalidateQueries();
//          } catch (error) {
//           setDeleteError("There was an error deleting your account.");
//          }
//         }}
//         aria-label="delete account"
//         className="text-sm font-bold text-red-700 dark:text-primary hover:text-red-700 focus:text-red-700 dark:hover:text-rose-300 dark:focus:text-rose-300"
//        >
//         Delete your account
//        </button>
//        <span className="flex flex-wrap items-center gap-2 text-sm text-smoky-black dark:text-lotion">
//         <IWarningLine aria-label="warning icon" />
//         This action is irreversible.
//        </span>
//        {deleteError && (
//         <span className="text-red-700 dark:text-primary">{deleteError}</span>
//        )}
//       </div>
//      </div>
//     </Feed.Items>
//    </Feed.Container>
//    <Feed.Sidebar>
//     <Footer />
//    </Feed.Sidebar>
//   </>
//  );
// };

// Settings.getLayout = (page) => <RootLayout>{page}</RootLayout>;
// export default Settings;

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//  const session = await getUser(req, res);
//  if (!session?.user?.id) {
//   return { redirect: { destination: "/login", permanent: false } };
//  }

//  return {
//   props: {
//    user: {
//     id: session.user.id ?? null,
//     name: session.user.name ?? null,
//     image: session.user.image ?? "",
//     username: session.user.username ?? null,
//    },
//   },
//  };
// };

export const metadata = {
 title: "Your settings",
};

export default async function Settings() {
 const session = await getUser();

 if (!session?.user) {
  redirect("/login");
 }

 return <div>{session.user.username}</div>;
}
