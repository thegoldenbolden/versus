import { useState, FormEventHandler } from "react";
import { useRouter } from "next/router";

import { ISearchLine } from "../ui/icons";
import { TextInput } from "../input";

const Searchbar = ({ className = "" }: { className?: string }) => {
 const [value, setValue] = useState("");
 const router = useRouter();

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();

  if (value.length > 0) {
   router.push({
    pathname: "/explore",
    query: { q: value },
   });
  }
 };

 const defaultClass =
  "sticky top-0 z-10 text-base flex items-center w-full gap-4 px-4 transition-colors group focus-within:bg-smoky-black-translucent focus-within:dark:bg-lotion-translucent hover:bg-smoky-black-translucent focus:bg-smoky-black-translucent hover:dark:bg-lotion-translucent focus:dark:bg-lotion-translucent";

 return (
  <form className={`${defaultClass} ${className}`} onSubmit={handleSubmit}>
   <ISearchLine className="w-6 h-6 opacity-75 group-focus-within:opacity-100" />
   <TextInput
    id="searchbar"
    className="py-4 text-base bg-transparent md:py-3 grow"
    type="text"
    placeholder="Search for versus"
    autoComplete="off"
    value={value}
    onChange={(e) => setValue(e.target.value)}
   />
  </form>
 );
};

Searchbar.getComponent = (component: React.ReactNode) => component;
export default Searchbar;
