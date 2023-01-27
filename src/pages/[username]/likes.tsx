import type { NextPageWithLayout } from "pages/_app";
import type { GetServerSideProps } from "next";

import getUserByUsername, { User } from "@lib/users/getUserByUsername";
import getUser from "@lib/get-user";

import RootLayout from "@layouts/root";
import Profile from "@components/user/profile";

type PageProps = {
 isUser: boolean;
 sessionUserId: string | null;
 user: User & { isUser: boolean };
 userCanFollow: boolean;
 referer: string | null;
};

const ProfileLikes: NextPageWithLayout<PageProps> = (props) => {
 return <Profile key={props.user.id} {...props} type="likes" />;
};

ProfileLikes.getLayout = (page) => <RootLayout>{page}</RootLayout>;
export default ProfileLikes;

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
 const session = await getUser(req, res);
 const username = params?.username as string;
 const user = await getUserByUsername(username, "likedVersus", session?.user.id);
 if (!user || !user?.id) return { redirect: { destination: "/404", permanent: false } };

 return {
  props: {
   user,
   referer: req.headers.referer ?? null,
   isUser: !session?.user?.id ? false : session.user.id === user.id,
   sessionUserId: session?.user?.id || null,
   userCanFollow: !session?.user?.id || session.user.id === user.id ? false : true,
  },
 };
};
