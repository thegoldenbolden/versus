import { ForwardedRef, forwardRef } from "react";

const TextInput = forwardRef((props: JSX.IntrinsicElements["input"], ref) => {
 const defaultClass =
  "color-theme placeholder-dark caret-dark dark:caret-light placeholder:opacity-75 dark:placeholder-light hover:placeholder-opacity-100 hover:opacity-100 focus:outline-none focus-within:opacity-100 focus-within:placeholder-opacity-100";
 return (
  <>
   <label htmlFor={props.id} className="sr-only">
    {props.name}
   </label>
   <input
    type="text"
    id={props.id}
    {...props}
    ref={ref as ForwardedRef<HTMLInputElement>}
    className={defaultClass + ` ${props.className}`}
   />
  </>
 );
});

TextInput.displayName = "TextInput";
export { TextInput };
