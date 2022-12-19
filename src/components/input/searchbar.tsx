"use client";
import { useState, FormEventHandler } from "react";
import Router from "next/router";

import { ISearch } from "@components/icons";
import { TextInput } from "@components/input/index";

export default function Searchbar({ className }: { className?: string }) {
 const [value, setValue] = useState("");

 const defaultClass =
  "sticky top-0 z-10 bg-light/75 dark:bg-dark/75 flex items-center w-full gap-4 px-4 md:top-4 color-theme shadow-default font-display focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-900";

 const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();

  if (value.length > 0) {
   await Router.push(`/explore?title=${value.replaceAll(" ", "+")}`);
   return;
  }
 };

 return (
  <form onSubmit={handleSubmit} className={`${defaultClass} ${className}`}>
   <ISearch className="icon" />
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
