"use client";
import {
 QueryClientProvider as ReactQueryProvider,
 QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   refetchOnWindowFocus: process.env.NODE_ENV === "production",
   refetchOnMount: process.env.NODE_ENV === "production",
   staleTime: 300000,
  },
 },
});

export default function QueryProvider({ children }: { children?: React.ReactNode }) {
 return <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>;
}
