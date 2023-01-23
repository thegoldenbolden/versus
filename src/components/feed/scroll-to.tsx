import useSticky from "@hooks/use-sticky";
import { IArrowDownLine } from "../ui/icons";

export default function ScrollTo() {
 const visible = useSticky();

 return (
  <div
   className={`sticky flex transition-[bottom_100ms_ease-in-out] items-center gap-2 ml-auto mr-auto justify-evenly ${
    visible ? "bottom-48" : "-bottom-48"
   }`}
  >
   <button
    aria-label="Scroll to top of the page"
    className="flex items-center justify-center p-2 border-2 border-solid rounded-full dark:text-smoky-black contrast-25 border-primary dark:border-white/25 bg-lotion-translucent backdrop-blur-sm dark:bg-violet-700/50"
    onClick={(e) => window && window.scrollTo({ behavior: "smooth", top: 0 })}
   >
    <IArrowDownLine className="rotate-180 w-7 h-7" />
   </button>
  </div>
 );
}
