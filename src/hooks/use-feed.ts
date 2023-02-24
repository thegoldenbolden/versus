import type { GetManyVersus, VersusQuery } from "../types";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";

import { getRequest } from "@lib/make-requests";
import versusKeys from "@lib/versus/queryKeys";
import CONFIG from "@lib/versus/config";

export default function useFeed() {
 const pathname = usePathname();
 const query = useSearchParams() as ReadonlyURLSearchParams;
 const params: VersusQuery = {};

 const q = query.get("q");
 const tags = query.get("tags");
 const limit = query.get("limit");

 if (q && pathname === "/explore") params.q = q;
 if (tags && pathname === "/explore") params.tags = tags;
 if (limit) params.limit = limit ?? CONFIG.MAX_VERSUS_PER_PAGE;

 return useInfiniteQuery({
  queryKey: versusKeys.list(params),
  queryFn: async ({ pageParam = undefined }) => {
   if (pageParam) params.cursor = pageParam;
   return await getRequest<GetManyVersus>("/api/versus", params);
  },
  getNextPageParam: (lastPage) => lastPage?.pagination.cursor ?? undefined,
 });
}
