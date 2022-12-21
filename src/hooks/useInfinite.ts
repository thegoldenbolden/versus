import { formatQuery } from "@lib/format";
import useSWRInfinite from "swr/infinite";

// prettier-ignore
const fallbackData = { items: [] as any[], pagination: { back: null, next: null }};

type Args<T> = {
 route: string;
 query?: Omit<T, "take" | "pid"> & { pid?: string | null };
 suspend?: boolean;
};

const getKey = <T>(page: number, previous: any, args: Args<T>) => {
 if (args.suspend) return null;
 const query = { ...args.query };

 // If the previous page shows more data can be fetched set the cursor
 if (previous?.pagination?.next) {
  (query as any).cursor = previous.pagination.next;
 }

 return `${args.route}${formatQuery(query)}`;
};

const useInfinite = <T>(args: Args<T>) => {
 // Prevent fetching until a condition is met.
 args.suspend ??= false;

 // prettier-ignore
 const { data, error, size, mutate, setSize, isValidating } = useSWRInfinite((i, p) => getKey<T>(i, p, args));
 const pages = data ? [].concat(...data) : ([] as typeof fallbackData[]);

 const loadingInitial = !data && !error;
 // prettier-ignore
 const loadingMore = loadingInitial || (size > 0 && data && typeof data[size - 1] === "undefined");
 const isEmpty = data?.[0]?.items?.length === 0 ?? true;

 // prettier-ignore
 // If next equals null then no more data can be fetched
 const reachingEnd = isEmpty || (data && !data[data.length - 1]?.pagination.next);
 const isRefreshing = isValidating && data && data.length === size;

 // prettier-ignore
 return { pages, loadingInitial, loadingMore, mutate, isEmpty, reachingEnd, isRefreshing, setSize };
};

export default useInfinite;
