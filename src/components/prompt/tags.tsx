import { TAGS } from "@lib/constants";
import Link from "next/link";

export default function Tags({ tags }: { tags: number[] }) {
 if (!tags || tags.length === 0) return null;
 return (
  <div className="flex flex-wrap gap-2 text-xs font-bold">
   {tags.map((tag) => {
    const t = TAGS.find((t) => t.id === tag);
    if (!t) return null;
    return (
     <Link
      href={`/explore?tags=${t.id}`}
      key={t.id}
      className="opacity-75 hover:underline focus:underline hover:opacity-100 focus:opacity-100"
     >
      #{t.name}
     </Link>
    );
   })}
  </div>
 );
}
