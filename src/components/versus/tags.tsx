import type { Tag } from "types";
import Link from "next/link";

export default function Tags({ tags }: { tags: Tag[] }) {
 if (!tags || tags.length === 0) return null;
 return (
  <div className="flex flex-wrap gap-2 font-bold">
   {tags.map((tag) => {
    return (
     <Link
      href={`/explore?tags=${tag.id}`}
      key={tag.id}
      className="opacity-75 hover:underline focus:underline hover:opacity-100 focus:opacity-100"
     >
      #{tag.name}
     </Link>
    );
   })}
  </div>
 );
}
