import type { SchemaTypes } from "@lib/zod-schemas/versus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import CustomError from "@lib/error";
import { deleteRequest, postRequest } from "@lib/make-requests";
import Schemas from "@lib/zod-schemas/versus";
import Optimistic from "@lib/versus/optimistic";
import { log } from "@lib/helpers";
import { versusKeys } from "@lib/versus/queries";

export function useFeedMutation(query: Query = {}) {
 const { data: session } = useSession();
 const queryClient = useQueryClient();
 const userId = session?.user.id;

 return useMutation({
  mutationFn: async ({ type, versusId, userLikes, optionId }: MutationVariables) => {
   // prettier-ignore
   if (!type || !versusId) throw new Error("A mutate request type and a versus id is required.");
   const versusUrl = `/api/versus/${versusId}`;

   switch (type) {
    default:
     throw new Error("Invalid Mutation Type");
    case "remove":
     // if (!userId) throw new CustomError(401);
     if (!userId) return null;
     const deleted = await deleteRequest<SchemaTypes["DeleteVersusOrComment"]>(versusUrl);
     return deleted.data.ok ? deleted.data.data : null;
    case "like":
     if (!userId) throw new CustomError(401);
     const likeUrl = versusUrl + "/likes";
     if (userLikes) {
      type DeleteRequest = Versus.ResponseData<SchemaTypes["DeleteVersusOrComment"]>;
      const removed = await deleteRequest<Versus.ResponseData<DeleteRequest>>(likeUrl);
      return removed.data.ok ? removed.data.data : null;
     }

     const type = "versus";
     const parsedLike = Schemas.VersusLike.safeParse({ userId, versusId, type });
     if (!parsedLike.success) return null;

     const like = await postRequest<SchemaTypes["PostVersusLike"]>(
      likeUrl,
      parsedLike.data
     );
     return like.data.ok ? like.data.data : null;
    case "vote":
     if (!userId) return null;
     const parsedVote = Schemas.VersusVote.safeParse({ optionId, userId, versusId });
     if (!parsedVote.success) return null;
     const voteUrl = `${versusUrl}/votes/${optionId}`;
     const vote = await postRequest<SchemaTypes["PostVersusVote"]>(
      voteUrl,
      parsedVote.data
     );
     return vote.data.ok ? vote.data.data : null;
   }
  },
  onMutate: async ({ type, optionId, versusId, userLikes }) => {
   await queryClient.cancelQueries({ queryKey: versusKeys.all });
   versusId = versusId.toString();

   const lists = queryClient.getQueriesData(versusKeys.lists());
   const versus = queryClient.getQueryData(versusKeys.detail(versusId));
   Optimistic[type](queryClient, versusId, optionId);
   return { lists, versus };
  },
  onError: (error, variables, context) => {
   let { type, versusId } = variables;
   versusId = versusId.toString();

   switch (type) {
    default:
     throw new Error("Invalid Mutate Request");
    case "remove":
    case "like":
     context?.lists && queryClient.setQueriesData(versusKeys.lists(), context.lists);
     // prettier-ignore
     context?.versus && queryClient.setQueryData(versusKeys.detail(versusId), context.versus);
     break;
   }
  },
  onSuccess: (data, variables, context) => {
   let { type, versusId } = variables;
   versusId = versusId.toString();
   switch (type) {
    case "remove":
     // Only remove query for single versus
     queryClient.removeQueries(["versus", { versusId }]);
     break;
    case "like":
     // Invalidate specific versus query
     queryClient.invalidateQueries(versusKeys.detail(versusId));
     break;
   }
  },
 });
}

export type UseFeedMutation = ReturnType<typeof useFeedMutation>;

type MutationRequest = "like" | "remove" | "vote";
type MutationVariables = {
 type: MutationRequest;
 versusId: number | string;
 userLikes?: boolean;
 optionId?: string;
 commentId?: string;
};

// TODO: Fix typing for /explore
type Query = { [key: string]: any };
