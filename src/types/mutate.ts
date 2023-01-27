import type { UseVersusMutation } from "@hooks/use-versus-mutation";
export type Mutate = UseVersusMutation;
export type MutateData<Type> = { data: Type; mutation: Mutate; }