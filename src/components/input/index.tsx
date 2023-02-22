import type { ForwardedRef } from "react";
import { forwardRef } from "react";

const TextInput = forwardRef(
 (props: JSX.IntrinsicElements["input"], ref: ForwardedRef<HTMLInputElement>) => {
  const defaultClass =
   "text-inherit caret-smoky-black dark:caret-lotion placeholder-inherit focus:outline-none";
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
