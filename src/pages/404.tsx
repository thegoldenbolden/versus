import RootLayout from "@layouts/root";

const Custom404 = () => {
 return (
  <main className="grid w-full place-content-center h-vh">
   <div className="font-display 3xl md:6xl">Page Not Found</div>
  </main>
 );
};

Custom404.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Custom404;
