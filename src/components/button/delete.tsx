import { IDelete } from "@components/icons";
import useRequest from "@hooks/useRequest";
import { makeRequest } from "@lib/make-requests";
import { KeyedMutator } from "swr";

type DeleteProps = {
 route: string;
 showText?: boolean;
 btnClass?: string;
 svgClass?: string;
 mutate?: KeyedMutator<any[]>;
};

const DeleteButton = (props: DeleteProps) => {
 // prettier-ignore
 const showText = props.showText ?? false;
 const request = useRequest(async (url: string) => {
  await makeRequest(url, "DELETE");
  props.mutate && props.mutate();
 });

 const opacity = request.submitting ? "opacity-50" : "opacity-100";

 return (
  <button
   aria-disabled={request.submitting}
   disabled={request.submitting}
   className={`flex items-center gap-2 ${opacity} ${props.btnClass ?? ""}`}
   onClick={() => request.trigger(props.route)}
  >
   <IDelete className={props.svgClass ?? "w-5 h-5"} />
   {showText && <span>Delete</span>}
  </button>
 );
};

export default DeleteButton;
