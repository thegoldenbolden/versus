import Skeleton from "../loading/skeleton";

const FallbackVersus = () => {
 return (
  <div className="relative w-full versus">
   <div className="header">
    <Skeleton className="w-10 h-10 rounded-md" />
    <Skeleton className="h-10 rounded-md grow" />
   </div>
   <Skeleton className="min-h-[300px]" />
   <Skeleton className="mt-2 min-h-[192px]" />
  </div>
 );
};

export default FallbackVersus;
