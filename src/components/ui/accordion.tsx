import type { PropsWithChildren } from "react";
import { Disclosure } from "@headlessui/react";
import { IArrowDownLine } from "./icons";

const Accordion: Accordion = {
 Container: (props) => {
  return <Disclosure>{props.children}</Disclosure>;
 },
 Button: (props) => {
  const requiredClass =
   "w-4 h-4 duration-300 ease-in-out text-inherit ui-not-open:rotate-180 ui-open:rotate-0";

  return (
   <Disclosure.Button className="flex items-center gap-2 text-start">
    {props.children}
    <IArrowDownLine className={`${requiredClass} ${props.className}`} />
   </Disclosure.Button>
  );
 },
 Panel: (props) => {
  return <Disclosure.Panel>{props.children}</Disclosure.Panel>;
 },
};

export default Accordion;

type Accordion = {
 [P in "Panel" | "Container" | "Button"]: (
  props: PropsWithChildren & { className?: string }
 ) => JSX.Element;
};
