import { IDelete } from "@components/icons";
import useRequest from "@hooks/useRequest";
import { makeRequest } from "@lib/make-requests";
import { MutateData } from "types";
import Router from "next/router";
import { forwardRef } from "react";

type DeleteProps = {
 route: string;
 showText?: boolean;
 btnClass?: string;
 svgClass?: string;
 reload?: boolean;
} & Pick<MutateData<Versus.Prompt>, "mutate" | "isRefreshing">;

const DeleteButton = forwardRef((props: DeleteProps, ref) => {
 const showText = props.showText ?? false;
 const request = useRequest(async (url: string) => {
  await makeRequest(url, "DELETE");
  props.mutate && props.mutate(undefined, { revalidate: true });
  props.reload && Router.push("/");
 });

 const opacity = request.submitting ? "opacity-50" : "opacity-100";

 return (
  <button
   aria-disabled={request.submitting}
   disabled={request.submitting}
   className={`flex items-center gap-2 ${opacity} ${props.btnClass ?? ""}`}
   onClick={() => {
    if (!props.isRefreshing) {
     request.trigger(props.route);
    }
   }}
  >
   <IDelete className={props.svgClass ?? "w-5 h-5"} />
   {showText && <span>Delete</span>}
  </button>
 );
});

DeleteButton.displayName = "DeleteButton";
export default DeleteButton;
