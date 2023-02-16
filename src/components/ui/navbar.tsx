"use client";

type NavbarProps = {
 username?: string;
 image?: string | null;
};

const Navbar = ({ username }: NavbarProps) => {
 return <nav className="flex gap-2 sm:flex-col"></nav>;
};

export default Navbar;

//     <Create
//      overrideClass
//      className="flex items-center justify-center order-3 w-full px-2 py-3 bg-transparent border-2 border-transparent border-solid rounded-none :hover:bg-smoky-black-translucent dark:hover:bg-lotion-translucent sm:py-2 font-display sm:rounded-full sm:order-last xl:rounded-md xl:bg-smoky-black xl:text-lotion xl:dark:bg-lotion xl:dark:text-smoky-black xl:hover:bg-smoky-black/75 xl:focus:bg-smoky-black/75 xl:dark:hover:bg-lotion/90 xl:dark:focus:bg-lotion/90"
//     />
