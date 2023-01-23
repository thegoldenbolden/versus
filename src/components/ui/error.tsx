export default function CustomError({ message }: { message?: string | null }) {
 message ??= "Uh oh, something unexpected happened";

 return (
  <div className="relative flex flex-col justify-center w-full gap-2 p-4 text-center grow">
   <h1 className="text-4xl font-display">{message}</h1>
   <span> D: </span>
  </div>
 );
}
