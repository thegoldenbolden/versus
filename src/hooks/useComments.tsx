import useSWRInfinite from "swr/infinite";

import { formatQuery } from "@lib/format";
import { MAX_COMMENTS_PER } from "@lib/constants";

// prettier-ignore
const fallbackData = { comments: [] as Versus.Comment[], pagination: { count: 0, back: null, next: null }};

type Args = { query?: Omit<Versus.GetCommentArgs, "take">; suspend?: boolean };
const getKey = (page: number, previous: any, args: Args) => {
 if (args.suspend) return null;
 const query = { ...args.query };
 if (previous?.pagination?.next) query.cursor = previous.pagination.next;
 return `/api/comments?${formatQuery(query)}`;
};

const useComments = (args: Args) => {
 args.suspend ??= false;
 // prettier-ignore
 const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite((i, p) => getKey(i, p, args));
 const pages = data ? [].concat(...data) : ([] as typeof fallbackData[]);

 const loadingInitial = !data && !error;
 // prettier-ignore
 const loadingMore = loadingInitial || (size > 0 && data && typeof data[size - 1] === "undefined");
 const isEmpty = data?.[0]?.comments?.length === 0;

 // prettier-ignore
 const reachingEnd = isEmpty || (data && data[data.length - 1]?.comments?.length < MAX_COMMENTS_PER);
 const isRefreshing = isValidating && data && data.length === size;

 // prettier-ignore
 return { pages, loadingInitial, mutate, loadingMore, isEmpty, reachingEnd, isRefreshing, setSize };
};

export default useComments;
