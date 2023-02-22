import { getRequest } from "@lib/make-requests";
import versusKeys from "@lib/versus/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetManyVersus } from "types";
import useVersusMutation from "./use-versus-mutation";

type FeedType = "votes" | "likes" | "versus";

export default function useProfileFeed(
 profileId: string,
 type: FeedType,
 sessionUserId?: string | null
) {
 return {
  mutation: useVersusMutation(sessionUserId),
  feed: useInfiniteQuery({
   queryKey: versusKeys.list({ id: profileId, type }),
   queryFn: async ({ pageParam = undefined }) => {
    const url = `/api/users/${profileId}/${type}`;
    return await getRequest<GetManyVersus>(url, { cursor: pageParam });
   },
   getNextPageParam: (lastPage) => lastPage?.pagination?.cursor ?? undefined,
  }),
 };
}
