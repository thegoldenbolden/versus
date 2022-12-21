import { KeyedMutator } from "swr";

export type MutateData<T> = { 
	data: T; 
	isRefreshing?: boolean; 
	mutate?: KeyedMutator<any[]>;
	reload?: boolean;
};