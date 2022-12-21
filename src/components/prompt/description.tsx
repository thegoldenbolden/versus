import { useState } from "react";

export default function Description({ description }: { description: string | null }) {
 const [view, setView] = useState(false);
 if (!description) return <></>;
 return (
  <>
   <p className="inline">{view ? description : description.slice(0, 128)}</p>
   {description.length > 128 && (
    <button
     className="inline font-bold text-secondary hover:opacity-100 focus:opacity-100 dark:text-primary opacity-50"
     onClick={() => setView((p) => !p)}
    >
     &nbsp;
     {view ? "less" : "more"}..
    </button>
   )}
  </>
 );
}
