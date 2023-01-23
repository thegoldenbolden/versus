import CONFIG from "@lib/versus/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRequest } from "@lib/make-requests";

export default function useFeed(route: string = "/api/versus", query: Query = {}) {
 return useInfiniteQuery({
  queryKey: ["versus", query],
  queryFn: async ({ pageParam = undefined }) => {
   query.cursor ??= pageParam;
   query.take ??= CONFIG.MAX_VERSUS_PER_PAGE;
   const invalidTake = query.take > CONFIG.MAX_VERSUS_PER_PAGE;
   query.take = invalidTake ? CONFIG.MAX_VERSUS_PER_PAGE : query.take;
   const response = await getRequest<GetFeed>(route, { params: query });
   return response.data;
  },
  getNextPageParam: (lastPage) => lastPage.pagination.cursor ?? undefined,
 });
}

type Query = { [key: string]: any };
type GetFeed = Versus.ResponsePagination<Versus.Versus>;
