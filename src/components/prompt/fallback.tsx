import Skeleton from "@components/skeleton";

const FallbackPrompt = () => {
 return (
  <div className="prompt min-w-[480px] gap-2">
   <div className="header">
    <Skeleton className="w-[40px] h-[40px] rounded-md" />
    <Skeleton className="h-[40px] rounded-md grow" />
   </div>
   <Skeleton className="min-h-[300px]" />
   <div className="px-4 py-2 flex gap-2 flex-col">
    <Skeleton className="w-36 h-4" />
    <Skeleton className="w-20 h-4" />
    <Skeleton className="w-full h-4" />
    <div className="flex gap-2">
     <Skeleton className="w-24 h-4" />
     <Skeleton className="w-24 h-4" />
    </div>
    <Skeleton className="w-16 h-4" />
   </div>
  </div>
 );
};

export default FallbackPrompt;
