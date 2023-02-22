import type { SchemaTypes } from "@lib/zod-schemas/versus";
import type { MutateFeed } from "types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, postRequest } from "@lib/make-requests";
import Optimistic from "@lib/versus/optimistic";
import versusKeys from "@lib/versus/queryKeys";
import Schemas from "@lib/zod-schemas/versus";
import CustomError from "@lib/error";
import { Versus } from "@lib/versus/getVersus";

export type UseVersusMutation = ReturnType<typeof useVersusMutation>;
export type MutationRequest = "like" | "remove" | "vote";
export type MutationVariables = {
 type: MutationRequest;
 versusId: number | string;
 userLikes?: boolean;
 optionId?: string;
 commentId?: string;
};

export default function useVersusMutation(
 sessionUserId?: string | null,
 redirect?: Function
) {
 const queryClient = useQueryClient();

 return useMutation({
  mutationFn: async ({ type, versusId, userLikes, optionId }: MutationVariables) => {
   if (!type || !versusId) {
    throw new Error("A mutate request type and a versus id is required.");
   }

   const versusUrl = `/api/versus/${versusId}`;
   switch (type) {
    default:
     throw new Error("Invalid Mutation Type");
    case "remove":
     if (!sessionUserId) throw new CustomError(401);
     return await deleteRequest<SchemaTypes["DeleteVersusOrComment"]>(versusUrl);
     return;
    case "like":
     if (!sessionUserId) throw new CustomError(401);
     const likeUrl = versusUrl + "/likes";
     if (userLikes) {
      return await deleteRequest(likeUrl);
     }

     const type = "versus";
     const parsedLike = Schemas.VersusLike.safeParse({
      userId: sessionUserId,
      versusId,
      type,
     });
     if (!parsedLike.success) return;
     return await postRequest<SchemaTypes["PostVersusLike"]>(likeUrl, parsedLike.data);
    case "vote":
     if (!sessionUserId) return;
     const parsedVote = Schemas.VersusVote.safeParse({
      optionId,
      userId: sessionUserId,
      versusId,
     });
     if (!parsedVote.success) return;
     const voteUrl = `${versusUrl}/votes/${optionId}`;
     return await postRequest<SchemaTypes["PostVersusVote"]>(voteUrl, parsedVote.data);
   }
  },
  onMutate: async ({ type, optionId, versusId }) => {
   await queryClient.cancelQueries({ queryKey: versusKeys.all });
   versusId = versusId.toString();
   const lists = queryClient.getQueriesData<MutateFeed<Versus>>(versusKeys.lists());
   const versus = queryClient.getQueryData<Versus>(versusKeys.detail(versusId));
   Optimistic[type](queryClient, versusId, optionId);
   return { lists, versus };
  },
  onError: (error, variables, context) => {
   const { type, versusId } = variables;

   switch (type) {
    default:
     throw new Error("Invalid Mutate Request");
    case "remove":
    case "like":
     context?.lists && queryClient.setQueriesData(versusKeys.lists(), context.lists);
     // prettier-ignore
     context?.versus && queryClient.setQueryData(versusKeys.detail(`${versusId}`), context.versus);
     break;
   }
  },
  onSuccess: (data, variables, context) => {
   let { type, versusId } = variables;
   switch (type) {
    case "remove":
     // Only remove query for single versus
     queryClient.removeQueries(versusKeys.detail(`${versusId}`));
     redirect && redirect();
     break;
    case "like":
     queryClient.invalidateQueries(versusKeys.detail(`${versusId}`));
     queryClient.invalidateQueries(versusKeys.list({ type: "likes" }));
     break;
   }
  },
 });
}
