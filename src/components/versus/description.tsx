import { useState } from "react";

export default function Description({ text }: { text: string | null }) {
 const [view, setView] = useState(false);
 if (!text) return <></>;
 return (
  <>
   <p className="inline">{view ? text : text.slice(0, 128)}</p>
   {text.length > 128 && (
    <>
     &nbsp;
     <button
      className="inline font-bold text-red-600 dark:text-secondary"
      onClick={() => setView((p) => !p)}
     >
      {view ? "less" : "more"}..
     </button>
    </>
   )}
  </>
 );
}
