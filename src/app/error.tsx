"use client";
import { useEffect } from "react";

type ErrorProps = {
 error: Error;
 reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
 useEffect(() => {
  console.error(error);
 }, [error]);

 return (
  <div>
   <h2>Oops! Something went wrong!</h2>
   <button onClick={() => reset()}>Try again?</button>
  </div>
 );
}
