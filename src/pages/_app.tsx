import type { AppProps } from "next/app";
import type { NextPage } from "next";

// prettier-ignore
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { bebas, roboto } from "@lib/fonts";
import ErrorBoundary from "@components/error-boundary";
import "@styles/globals.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
 getLayout?: (page: React.ReactElement) => React.ReactNode;
 getComponent?: (component: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
 Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   refetchOnWindowFocus: process.env.NODE_ENV === "production",
   staleTime: 300000,
  },
 },
});

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
 const getLayout = Component.getLayout || ((page: React.ReactElement) => page);

 return (
  <>
   <style jsx global>{`
    html {
     font-family: ${roboto.style} ${bebas.style};
    }
   `}</style>
   <ErrorBoundary>
    <SessionProvider session={pageProps.session}>
     <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
     </QueryClientProvider>
    </SessionProvider>
   </ErrorBoundary>
  </>
 );
};

export default App;
