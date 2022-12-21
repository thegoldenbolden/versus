import RootLayout from "@layouts/root";
import Head from "next/head";

const Custom404 = () => {
 return (
  <>
   <Head>
    <title>Page Not Found</title>
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
    <meta name="description" content="Page not found" />
   </Head>
   <main className="grid w-full place-content-center h-vh">
    <div className="font-display 3xl md:6xl">Page Not Found</div>
   </main>
  </>
 );
};

Custom404.getLayout = (page: React.ReactNode) => <RootLayout>{page}</RootLayout>;
export default Custom404;
