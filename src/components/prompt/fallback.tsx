import { IComments, ILike } from "@components/icons";
import Skeleton from "@components/skeleton";

const FallbackPrompt = () => {
 return (
  <div className="flex flex-col w-full min-h-[480px] justify-between drop-shadow-md md:border-solid md:rounded md:border-2 md:border-dark/5 md:dark:border-light/10">
   <div className="flex gap-2 p-2">
    <Skeleton className="w-[40px] h-[40px] rounded-md" />
    <Skeleton className="h-[40px] rounded-md grow" />
   </div>
   <Skeleton className="min-h-[300px]" />
   <Skeleton className="w-full" />
   <div className="flex flex-col gap-2 p-2 text-sm">
    <div className="flex gap-2">
     <ILike className="w-8 h-8" />
     <IComments className="w-8 h-8" />
    </div>
    <Skeleton className="h-3 w-[15%]" />
    <div className="flex gap-2">
     <Skeleton className="h-3 basis-1/4" />
     <Skeleton className="h-3 grow" />
    </div>
    <Skeleton className="w-48 h-3" />
   </div>
  </div>
 );
};

export default FallbackPrompt;
