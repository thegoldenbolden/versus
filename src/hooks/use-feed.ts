import CONFIG from "@lib/versus/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRequest } from "@lib/make-requests";
import versusKeys from "@lib/versus/queryKeys";
import { useRouter } from "next/router";

type GetFeed = Versus.ResponsePagination<Versus.Versus>;
export default function useFeed() {
 const { query, pathname } = useRouter();
 const params: Versus.Query = {};

 if (query.q && pathname === "/explore") params.q = query.q as string;
 if (query.tags && pathname === "/explore") params.tags = query.tags as string;
 if (query.take) params.take = (query.take ?? CONFIG.MAX_VERSUS_PER_PAGE) as string;

 return useInfiniteQuery({
  queryKey: versusKeys.list(params),
  queryFn: async ({ pageParam = undefined }) => {
   if (pageParam) params.cursor = pageParam;
   const response = await getRequest<GetFeed>("/api/versus", { params });
   return response.data.ok ? response.data : null;
  },
  getNextPageParam: (lastPage) => lastPage?.pagination.cursor ?? undefined,
 });
}
