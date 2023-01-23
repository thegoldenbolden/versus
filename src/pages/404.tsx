import Head from "next/head";
import Link from "next/link";

const Custom404 = () => {
 return (
  <>
   <Head>
    <title>Versus Zero | Page Not Found</title>
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
   <main className="grid w-screen h-screen place-items-center place-content-center">
    <h1 className="text-3xl font-display">Page Not Found</h1>
    <Link className="text-base underline hover:font-bold focus:font-bold" href="/">
     Back to Home
    </Link>
   </main>
  </>
 );
};

export default Custom404;
