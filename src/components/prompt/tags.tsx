import Link from "next/link";

export default function Tags({ tags }: { tags: Versus.Tag[] }) {
 if (!tags || tags.length === 0) return null;
 return (
  <div className="flex flex-wrap gap-2 text-xs font-bold">
   {tags.map((tag) => {
    return (
     <Link
      href={`/explore?tag=${tag.id}`}
      key={tag.name}
      className="opacity-75 hover:underline focus:underline hover:opacity-100 focus:opacity-100"
     >
      #{tag.name}
     </Link>
    );
   })}
  </div>
 );
}
