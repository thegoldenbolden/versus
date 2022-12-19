import RootLayout from "@layouts/root";

const Page = () => {
 return <div className="w-full h-vh">An error occured</div>;
};

Page.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Page;
