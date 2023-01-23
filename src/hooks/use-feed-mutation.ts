import type { SchemaTypes } from "@lib/zod-schemas/versus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import CustomError from "@lib/error";
import { log } from "@lib/helpers";
import { deleteRequest, postRequest } from "@lib/make-requests";
import Schemas from "@lib/zod-schemas/versus";
import { optimisticDelete, optimisticLike, optimisticVote } from "@lib/versus/optimistic";

export function useFeedMutation(query: Query = {}) {
 const { data: session, status } = useSession();
 const queryClient = useQueryClient();
 const userId = session?.user.id;

 return useMutation({
  mutationFn: async (variables: MutationVariables) => {
   const { mutate, versusId } = variables;

   if (!mutate || !versusId) {
    throw new Error("A mutate request type and a versus id is required.");
   }

   let url = "/api/versus/" + versusId;

   switch (mutate) {
    default:
     throw new Error("Invalid Mutate Request");
    case "Delete":
     if (status === "unauthenticated") return null;
     const deleted = await deleteRequest<SchemaTypes["DeleteVersusOrComment"]>(url);
     return deleted.data.ok ? deleted.data.data : null;
    case "Like":
     if (!userId) throw new CustomError(401);
     const likeUrl = url + "/likes";
     const { userLikes } = variables;
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
    case "Vote":
     if (!userId) return null;
     const { optionId } = variables;
     const parsedVote = Schemas.VersusVote.safeParse({ optionId, userId, versusId });
     if (!parsedVote.success) return null;

     const voteUrl = url + "/votes/" + optionId;
     const vote = await postRequest<SchemaTypes["PostVersusVote"]>(
      voteUrl,
      parsedVote.data
     );
     return vote.data.ok ? vote.data.data : null;
   }
  },
  onMutate: async (variables) => {
   // Should cancel all pending queries that start with 'versus'
   await queryClient.cancelQueries({ queryKey: ["versus"] });
   let { versusId } = variables;
   versusId = versusId.toString();

   // Optimisitc updates
   const { mutate } = variables;
   switch (mutate) {
    default:
     throw new Error("Invalid Mutate Request");
    case "Delete":
     return optimisticDelete(queryClient, versusId);
    case "Like":
     return optimisticLike(queryClient, versusId);
    case "Vote":
     let { optionId } = variables;
     if (!optionId) throw new Error("An option id is required to updated cache.");
     return optimisticVote(queryClient, versusId, optionId);
   }
  },
  onSettled: (data, error, variables, context) => {
   const { mutate } = variables;
   let { versusId } = variables;
   versusId = versusId.toString();

   if (error) {
    if (context?.queries) {
     switch (mutate) {
      default:
       throw new Error("Invalid Mutate Request");
      case "Delete":
      case "Like":
       context.queries.forEach(([query, snapshot]) => {
        queryClient.setQueryData(query, snapshot);
       });
       break;
      case "Vote":
       // Chose not to invalidate query everytime the button is clicked in feed.
       // Authenticated and unauthenticated users should see the optimistic version.
       // So don't revert back to snapshot.
       break;
     }
    }
   }

   switch (mutate) {
    default:
     throw new Error("Invalid Mutate Request");
    case "Delete":
     // Remove specific query from cache if mutation was successful.
     !error && queryClient.removeQueries(["versus", { versusId }]);
     break;
    case "Like":
     // Invalidate specific versus query if exists
     queryClient.invalidateQueries(["versus", { versusId }]);

     type Data = Versus.Versus;
     queryClient.invalidateQueries<Versus.ResponsePagination<Data>>({
      queryKey: ["versus", query],
      refetchPage: (lastPage, index, allPages) => {
       const pageToRefetchIndex = allPages.findIndex((pages) => {
        return pages.items.some((item) => item.id.toString() === versusId);
       });
       return pageToRefetchIndex === index;
      },
     });
     break;
    case "Vote":
     // Chose not to invalidate query everytime the button is clicked in feed.
     // Authenticated and unauthenticated users should see the optimistic version.
     // So don't revert back to snapshot.
     break;
   }
  },
 });
}

export type UseFeedMutation = ReturnType<typeof useFeedMutation>;
type MutationRequest = "Like" | "Delete" | "Vote";

// TODO: Fix typing for /explore
type Query = { [key: string]: any };

type MutationVariables = {
 mutate: MutationRequest;
 versusId: number | string;
 userLikes?: boolean;
 optionId?: string;
 commentId?: string;
};
