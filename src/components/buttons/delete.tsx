import { forwardRef } from "react";
import { useIsMutating } from "@tanstack/react-query";

import type { PropsWithChildren } from "react";
import type { MutateData } from "types/mutate";
import { IDeleteLine } from "../ui/icons";

const DeleteButton = forwardRef((props: DeleteProps, ref) => {
 const isMutating = useIsMutating();
 const { mutation, data } = props;
 const { versusId, commentId, btnClass, svgClass } = data;

 const opacity = mutation.isLoading ? "opacity-50" : "opacity-100";
 const handleDelete = () => mutation.mutate({ versusId, commentId, mutate: "Delete" });

 return (
  <button
   title="Delete versus"
   aria-disabled={mutation.isLoading || isMutating > 0}
   disabled={mutation.isLoading || isMutating > 0}
   className={`flex items-center gap-2 ${opacity} ${btnClass ?? ""}`}
   onClick={handleDelete}
  >
   <IDeleteLine className={svgClass ?? "w-5 h-5"} />
   {props.children}
  </button>
 );
});

DeleteButton.displayName = "DeleteButton";
export default DeleteButton;

type DeleteProps = PropsWithChildren &
 MutateData<{
  versusId: number;
  commentId?: string;
  btnClass?: string;
  svgClass?: string;
 }>;
