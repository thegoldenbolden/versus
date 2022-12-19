import { SWRResponse } from "swr";
import { SWRInfiniteResponse } from "swr/infinite";

type Pagination = {	count: number,	cursor: { back: number | null, next: number | null }};
export type PR = { pagination: Pagination, prompts: Versus.Prompt[] };
export type PromptResponse = SWRResponse<{ data: PR }, any>;

export type CR = { pagination: Pagination, comments: Versus.Comment[] };
export type CommentResponse = SWRInfiniteResponse<CR, any>;