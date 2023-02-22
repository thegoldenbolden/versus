import Spinner from "@components/loading/spinner";

export default function Loading() {
 return (
  <div className="w-screen h-screen z-50 backdrop-blur-xl flex items-center justify-center">
   <Spinner />
  </div>
 );
}
