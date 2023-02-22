"use client";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ISearchLine } from "../ui/icons";

const Searchbar = () => {
 const [value, setValue] = useState("");
 const router = useRouter();

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();

  if (value.length > 0) {
   router.replace(`/explore?q=${value}`);
  }
 };

 return (
  <form className="px-4 py-2" onSubmit={handleSubmit}>
   <div className="rounded-full z-10 border-solid border-2 border-smoky-black-translucent dark:border-lotion-translucent text-base group flex items-center gap-4 px-4 py-2">
    <ISearchLine className="w-5 h-5 opacity-75 group-hover:opacity-100 group-focus-within:opacity-100" />
    <label htmlFor="searchbar" className="sr-only capitalize">
     search versus
    </label>
    <input
     value={value}
     onChange={(e) => setValue(e.target.value)}
     id="searchbar"
     name="search versus"
     type="text"
     placeholder="Search Versus"
     autoComplete="off"
     className="opacity-75 group-hover:opacity-100 group-focus-within:opacity-100 bg-transparent grow text-inherit caret-smoky-black dark:caret-lotion dark:placeholder-inherit focus:outline-none"
    />
   </div>
  </form>
 );
};

Searchbar.getComponent = (component: React.ReactNode) => component;
export default Searchbar;
