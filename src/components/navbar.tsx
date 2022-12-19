import Link from "next/link";
import { ICreate, IExplore, IHome } from "@components/icons";
import { User } from "@components/user";

const Navbar = () => {
 return (
  <nav className="fixed bottom-0 z-10 flex items-center w-full gap-2 px-4 py-2 drop-shadow-md md:bg-transparent md:drop-shadow-none md:px-2 bg-light dark:bg-dark md:flex-col md:justify-start md:gap-8 md:static md:w-min md:shadow-none">
   <Link href="/" className="icon-w-text">
    <IHome className="icon" />
    <span>Home</span>
   </Link>
   <Link href="/explore" className="icon-w-text">
    <IExplore className="icon" />
    <span>Explore</span>
   </Link>
   <Link href="/create" prefetch={false} className="icon-w-text">
    <ICreate className="icon" />
    <span>Create</span>
   </Link>
   <User />
  </nav>
 );
};

export default Navbar;
