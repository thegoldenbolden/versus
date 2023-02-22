import Link from "next/link";

export default function NotFound() {
 return (
  <div className="w-screen h-screen grid place-content-center">
   <h2>Page Not Found</h2>
   <Link href="/home" className="underline text-sm">
    Back to Home
   </Link>
  </div>
 );
}
