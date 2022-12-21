import Link from "next/link";

export default function notFound() {
 return (
  <div className="flex flex-col gap-2 justify-center w-full h-full items-center">
   <span>No Versus Found</span>
   <span>You can always create one!</span>
   <Link href="/create" className="btn-primary">
    Create
   </Link>
  </div>
 );
}
