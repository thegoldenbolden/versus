import Link from "next/link";

const Footer = () => {
 return (
  <footer className="mb-14 md:mb-0 text-light dark:text-dark bg-secondary dark:bg-primary">
   <span className="font-display text-lg">Versus.0</span>
   <div>
    <Link href="/privary" className="text-sm">
     Privacy Policy
    </Link>
   </div>
  </footer>
 );
};

export default Footer;
