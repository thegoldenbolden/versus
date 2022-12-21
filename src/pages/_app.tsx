import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";

import ErrorBoundary from "@components/error";
import { bebas, roboto } from "@lib/fonts";
import { makeRequest } from "@lib/make-requests";
import "@styles/globals.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
 getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
 Component: NextPageWithLayout;
};

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
 const getLayout = Component.getLayout || ((page: React.ReactElement) => page);

 return (
  <div className={`${roboto.variable} ${bebas.variable} font-display font-sans`}>
   <ErrorBoundary>
    <SessionProvider session={pageProps.session}>
     <SWRConfig
      value={{
       errorRetryCount: 0,
       refreshWhenHidden: false,
       refreshWhenOffline: false,
       fetcher: makeRequest,
      }}
     >
      {getLayout(<Component {...pageProps} />)}
     </SWRConfig>
    </SessionProvider>
   </ErrorBoundary>
  </div>
 );
};

export default App;
