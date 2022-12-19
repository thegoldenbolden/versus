import { formatQuery } from "@lib/format";
import useSWRInfinite from "swr/infinite";
import { MAX_PROMPTS_PER } from "@lib/constants";

// prettier-ignore
const fallbackData = { prompts: [] as Versus.Prompt[], pagination: { count: 0, back: null, next: null }};

type Args = {
 query?: Omit<Versus.GetPromptArgs, "take" | "pid"> & { pid?: string | null };
 suspend?: boolean;
};

const getKey = (page: number, previous: any, args: Args) => {
 if (args.suspend) return null;
 const query = { ...args.query };
 if (previous?.pagination?.next) query.cursor = previous.pagination.next;
 return `/api/prompts?${formatQuery(query)}`;
};

const usePrompts = (args: Args) => {
 args.suspend ??= false;
 // prettier-ignore
 const { data, error, size, mutate, setSize, isValidating } = useSWRInfinite((i, p) => getKey(i, p, args));
 const pages = data ? [].concat(...data) : ([] as typeof fallbackData[]);

 const loadingInitial = !data && !error;
 // prettier-ignore
 const loadingMore = loadingInitial || (size > 0 && data && typeof data[size - 1] === "undefined");
 const isEmpty = data?.[0]?.prompts?.length === 0;

 // prettier-ignore
 const reachingEnd = isEmpty || (data && data[data.length - 1]?.prompts?.length < MAX_PROMPTS_PER);
 const isRefreshing = isValidating && data && data.length === size;

 // prettier-ignore
 return { pages, loadingInitial, loadingMore, mutate, isEmpty, reachingEnd, isRefreshing, setSize };
};

export default usePrompts;
