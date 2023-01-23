import type { ForwardedRef } from "react";
import { forwardRef } from "react";

const TextInput = forwardRef(
 (props: JSX.IntrinsicElements["input"], ref: ForwardedRef<HTMLInputElement>) => {
  const defaultClass =
   "placeholder-smoky-black caret-smoky-black dark:caret-lotion placeholder:opacity-75 dark:placeholder-lotion hover:placeholder-opacity-100 hover:opacity-100 focus:outline-none focus-within:opacity-100 focus-within:placeholder-opacity-100";
  return (
   <>
    <label htmlFor={props.id} className="sr-only">
     {props.name}
    </label>
    <input
     type="text"
     id={props.id}
     {...props}
     ref={ref}
     className={defaultClass + ` ${props.className}`}
    />
   </>
  );
 }
);

TextInput.displayName = "TextInput";
export { TextInput };
