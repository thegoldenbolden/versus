import type { UseFeedMutation } from "@hooks/use-feed-mutation";
import type { UseVersusMutation } from "@hooks/use-versus-mutation";

export type MutateData<Type> = { 
	data: Type;
	mutation: UseFeedMutation | UseVersusMutation;
}