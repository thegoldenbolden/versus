import CONFIG from "@lib/versus/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRequest } from "@lib/make-requests";
import { versusKeys } from "@lib/versus/queries";

export default function useFeed(query: Query = {}) {
 return useInfiniteQuery({
  queryKey: versusKeys.list(query),
  queryFn: async ({ pageParam = undefined }) => {
   query.take ??= CONFIG.MAX_VERSUS_PER_PAGE;
   if (pageParam) query.cursor = pageParam;
   const response = await getRequest<GetFeed>("/api/versus", { params: query });
   return response.data.ok ? response.data : null;
  },
  getNextPageParam: (lastPage) => lastPage?.pagination.cursor ?? undefined,
 });
}

type GetFeed = Versus.ResponsePagination<Versus.Versus>;

// TODO: finish search
type Query = { [key: string]: any };
