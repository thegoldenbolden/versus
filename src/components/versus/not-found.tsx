import { bebas } from "@lib/fonts";

export default function notFound() {
 return (
  <div className="absolute flex flex-col justify-center w-full h-full gap-2 p-4 text-center">
   <h1 className={`${bebas.className} text-3xl`}>No Versus Found</h1>
   <span> D: </span>
  </div>
 );
}
