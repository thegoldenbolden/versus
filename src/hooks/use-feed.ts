import type { GetManyVersus, VersusQuery } from "../types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";

import { getRequest } from "@lib/make-requests";
import versusKeys from "@lib/versus/queryKeys";
import CONFIG from "@lib/versus/config";

export default function useFeed(initialData?: GetManyVersus) {
 const pathname = usePathname();
 const query = useSearchParams();
 const params: VersusQuery = {};

 const q = query.get("q");
 const tags = query.get("tags");
 const take = query.get("take");

 if (q && pathname === "/explore") params.q = q;
 if (tags && pathname === "/explore") params.tags = tags;
 if (take) params.take = take ?? CONFIG.MAX_VERSUS_PER_PAGE;

 return useInfiniteQuery({
  initialData: initialData ? { pageParams: [params], pages: [initialData] } : undefined,
  queryKey: versusKeys.list(params),
  queryFn: async ({ pageParam }) => {
   if (pageParam) params.cursor = pageParam;
   const response = await getRequest<GetManyVersus>("/api/versus", { params });
   return response.data.ok ? response.data : null;
  },
  getNextPageParam: (lastPage) => lastPage?.pagination.cursor ?? undefined,
 });
}
