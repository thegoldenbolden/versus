// import type { User } from "@lib/users/getUserByUsername";
// import type { FC } from "react";

// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import Head from "next/head";
// import Link from "next/link";

// import { deleteRequest, getRequest, postRequest } from "@lib/make-requests";
// import versusKeys from "@lib/versus/queryKeys";
// import useVersusMutation from "@hooks/use-versus-mutation";
// import useModal from "@hooks/use-modal";

// // prettier-ignore
// import { IBackLine, IGridFill, IGridLine, IHeartFill, IHeartLine, ISettingsLine, IThumbUpFill, IThumbUpLine} from "@components/ui/icons";
// import Restricted from "@components/auth/restricted";
// import Feed from "@components/feed";
// import Footer from "@components/ui/footer";
// import Avatar from "@components/user/avatar";
// import VersusFeed from "@components/versus/feed";

// type ProfileProps = {
//  isUser: boolean;
//  sessionUserId: string | null;
//  user: User & { isUser: boolean };
//  userCanFollow: boolean;
//  type: "votes" | "likes" | "versus";
//  referer: string | null;
// };

// const Profile: FC<ProfileProps> = (props) => {
//  const { user, sessionUserId, type } = props;

//  const versusMutation = useVersusMutation();
//  const infinite = useInfiniteQuery({
//   queryKey: versusKeys.list({ id: user.id, type }),
//   queryFn: async ({ pageParam = undefined }) => {
//    const url = `/api/users/${user.id}/${type}`;
//    const response = await getRequest<Versus.ResponsePagination<Versus.Versus>>(url, {
//     params: { cursor: pageParam },
//    });
//    return response.data.ok ? response.data : null;
//   },
//   getNextPageParam: (lastPage) => lastPage?.pagination?.cursor ?? undefined,
//  });

//  // Using state since I didn't load user data client side and it isn't in cache.
//  // Optimistically updates follower count.
//  const [followers, setFollowers] = useState(user.total.followers);
//  const [loading, setLoading] = useState(false);
//  const [userFollows, setUserFollows] = useState(user.userFollows);
//  const { isOpen, closeModal } = useModal();

//  const handleFollow = async () => {
//   if (loading) return;
//   const previous = { userFollows, followers };
//   try {
//    setLoading(true);
//    if (userFollows) {
//     setUserFollows(false);
//     setFollowers((p) => `${parseInt(p) - 1}`);
//     await deleteRequest(`/api/users/${sessionUserId}/follow/${user.id}`);
//    } else {
//     setUserFollows(true);
//     setFollowers((p) => `${parseInt(p) + 1}`);
//     await postRequest(`/api/users/${sessionUserId}/follow/${user.id}`, {});
//    }
//   } catch (err: any) {
//    setUserFollows(previous.userFollows);
//    setFollowers(previous.followers);
//   } finally {
//    setLoading(false);
//   }
//  };

//  return (
//   <>
//    <Head>
//     <title>{`${user.name}${user.username ? ` (@${user.username})` : ""}`}</title>
//     <meta charSet="UTF-8" />
//     <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
//     <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//     <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//     <link rel="manifest" href="/site.webmanifest" />
//     <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f8d07a" />
//     <meta name="msapplication-TileColor" content="#f8d07a" />
//     <meta name="theme-color" content="#ffffff" />
//     <meta name="description" content={`${user.name} ${type}`} />
//    </Head>
//    <Feed.Container>
//     <div className="flex items-center gap-4 p-2 text-2xl border-b-2 border-b-solid border-b-smoky-black-translucent dark:border-b-lotion-translucent">
//      <Link
//       href={props.referer ?? "/"}
//       className="p-2 rounded-full hover:bg-smoky-black-translucent focus:bg-smoky-black-translucent dark:hover:bg-lotion-translucent dark:focus:bg-lotion-translucent"
//      >
//       <IBackLine aria-label="back icon" className="text-2xl group" />
//      </Link>
//      <div className="flex flex-col items-start">
//       <span className="text-base font-bold">{user.name}</span>
//       <span className="text-sm capitalize opacity-80">
//        {user.total[type]} {type}
//       </span>
//      </div>
//     </div>
//     <header className="flex items-center gap-6 px-2 py-4 border-b-[3px] border-b-solid border-b-smoky-black-translucent dark:border-b-lotion-translucent">
//      <Avatar
//       image={{ url: user.image, height: 96, width: 96, rounded: "rounded-full" }}
//      />
//      <div className="flex flex-col gap-2 grow">
//       <div className="flex flex-wrap items-center justify-between gap-2 text-xl grow">
//        <h1 className="flex flex-col w-full">
//         <div className="flex flex-wrap justify-between">
//          <span>{user.name}</span>
//          {!props.userCanFollow ? (
//           <Restricted
//            isOpen={isOpen}
//            closeModal={closeModal}
//            message={`You must be signed in to follow ${user.name}`}
//           />
//          ) : (
//           <button
//            aria-label={`${userFollows ? "Unfollow" : "Follow"} ${user.name}`}
//            aria-disabled={loading}
//            disabled={loading}
//            onClick={handleFollow}
//            className={`text-sm border-2 border-solid border-transparent px-4 rounded-full font-bold hover:brightness-110 focus:brightness-110 ${
//             userFollows
//              ? "bg-transparent after:content-['Following'] hover:after:content-['Unfollow'] border-smoky-black dark:border-lotion hover:border-red-500 hover:text-red-500"
//              : "text-lotion after:content-['Follow'] bg-smoky-black dark:text-smoky-black dark:bg-lotion hover:brightness-90 focus:brightness-90"
//            }`}
//           />
//          )}
//          {props.isUser && (
//           <Link
//            title="Settings"
//            className="flex items-center gap-2 px-2 rounded-sm rounded-full bg-smoky-black text-lotion hover:bg-smoky-black/80 focus:bg-smoky-black/80 dark:bg-lotion dark:text-smoky-black dark:hover:bg-lotion/80 focus:hover:bg-lotion/80"
//            href="/settings"
//           >
//            <ISettingsLine />
//            <span className="hidden text-sm md:block">Edit Profile</span>
//           </Link>
//          )}
//         </div>
//         <span className="text-sm opacity-85">@{user.username}</span>
//        </h1>
//       </div>
//       <div className="flex flex-wrap gap-2 text-sm font-bold">
//        <span>
//         {followers}&nbsp;
//         <span className="font-normal text-smoky-black/80 dark:text-lotion/80">
//          followers
//         </span>
//        </span>
//        <span>
//         {user.total.following}&nbsp;
//         <span className="font-normal text-smoky-black/80 dark:text-lotion/80">
//          following
//         </span>
//        </span>
//       </div>
//      </div>
//     </header>
//     <Feed.Items>
//      <VersusFeed
//       status={infinite.status}
//       data={infinite.data}
//       hasNextPage={infinite.hasNextPage}
//       isFetchingNextPage={infinite.isFetchingNextPage}
//       fetchNextPage={infinite.fetchNextPage}
//       mutation={versusMutation}
//      >
//       <div className="flex">
//        {["versus", "likes", "votes"].map((path) => {
//         const href = `/${user.username}` + (path == "versus" ? "" : `/${path}`);
//         const active = path !== type ? "" : "font-bold";

//         const Icon =
//          path !== type
//           ? path == "versus"
//             ? IGridLine
//             : path == "likes"
//             ? IHeartLine
//             : IThumbUpLine
//           : path == "versus"
//           ? IGridFill
//           : path == "likes"
//           ? IHeartFill
//           : IThumbUpFill;

//         return (
//          <Link
//           aria-label={`${user.username} ${path}`}
//           className={`flex items-center gap-2 capitalize justify-center px-4 py-2 grow hover:bg-smoky-black-translucent hover:dark:bg-lotion-translucent ${active}`}
//           href={href}
//           key={path}
//           replace
//          >
//           <Icon aria-label={`${path} icon`} className="text-2xl" />
//           <span className="hidden md:block">{path}</span>
//          </Link>
//         );
//        })}
//       </div>
//      </VersusFeed>
//     </Feed.Items>
//    </Feed.Container>
//    <Feed.Sidebar>
//     <Footer />
//    </Feed.Sidebar>
//   </>
//  );
// };

// export default Profile;

export default function Profile() {
 return null;
}
