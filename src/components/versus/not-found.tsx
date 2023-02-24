import { bebas } from "@lib/fonts";

export default function notFound() {
 return (
  <div className="absolute flex flex-col justify-center w-full h-full gap-2 p-4 text-center">
   <span className={`${bebas.className} text-3xl`}>No Versus Found</span>
  </div>
 );
}
