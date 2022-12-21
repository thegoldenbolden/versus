"use client";
import { useState, FormEventHandler } from "react";
import { useRouter } from "next/router";

import { ISearch } from "@components/icons";
import { TextInput } from "@components/input/index";

type SearchbarProps = { className?: string };

export default function Searchbar(props: SearchbarProps) {
 const [value, setValue] = useState("");
 const router = useRouter();

 const defaultClass =
  "btn-hover shadow-default transition-colors sticky top-0 z-10 bg-light/75 dark:bg-dark/75 flex items-center w-full gap-4 px-4 color-theme shadow-defefault";

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();

  if (value.length > 0) {
   router.push({
    pathname: "/explore",
    query: { q: value },
   });
  }
 };

 return (
  <form onSubmit={handleSubmit} className={`${defaultClass} ${props.className}`}>
   <ISearch className="w-6 h-6" />
   <TextInput
    id="searchbar"
    className="py-4 bg-transparent text-md grow"
    type="text"
    placeholder="Search for versus"
    value={value}
    onChange={(e) => setValue(e.target.value)}
   />
  </form>
 );
}
