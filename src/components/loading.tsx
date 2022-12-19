import Spinner from "@components/spinner";

const Loading: React.FC<{ msg?: string; row?: boolean }> = ({ msg, row }) => {
 return (
  <div className="flex items-center justify-center w-full h- grow">
   <div
    className={`flex ${row ? "flex-row" : "flex-col"} items-center justify-center gap-2`}
   >
    <Spinner />
    <span>Loading{msg ? ` ${msg}` : ""}...</span>
   </div>
  </div>
 );
};

export default Loading;
