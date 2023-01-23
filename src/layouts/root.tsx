import type { PropsWithChildren, FC } from "react";
import Navbar from "@components/ui/navbar";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
 return (
  <div className="flex justify-center w-full">
   <Navbar />
   <main className="flex grow md:grow-0"> {children}</main>
  </div>
 );
};

export default RootLayout;
