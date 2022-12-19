import Link from "next/link";

import Navbar from "@components/navbar";

const Header = () => {
 return (
  <header className="flex md:w-min md:flex-col h-min items-start md:items-end gap-2 md:border-r-solid md:border-r-2 md:border-r-dark/10 md:dark:border-r-light/10  md:px-0 md:h-vh md:overflow-y-auto md:max-h-vh">
   <Link
    href="/"
    className="px-4 py-2 text-4xl w-full md:w-min flex font-display justify-start md:text-6xl"
   >
    <span className="hidden text-center md:flex">VZ</span>
    <span className="md:hidden">Versus.0</span>
   </Link>
   <Navbar />
  </header>
 );
};

export default Header;
