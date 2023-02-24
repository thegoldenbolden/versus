"use client";
import type { Versus as TVersus } from "@lib/versus/getVersus";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getRequest } from "@lib/make-requests";
import versusKeys from "@lib/versus/queryKeys";
import useVersusMutation from "@hooks/use-versus-mutation";
import VersusNotFound from "@components/versus/not-found";
import Versus from "@components/versus";

type MutationProps = {
 versusId: string;
 initial: TVersus;
 sessionUserId?: string | null;
};

export default function Mutation({ sessionUserId, initial, versusId }: MutationProps) {
 const router = useRouter();

 // If versus author deletes versus redirect to home page.
 const mutation = useVersusMutation(sessionUserId, () => {
  router.push("/home");
 });

 const { data: versus, status } = useQuery({
  initialData: initial,
  queryKey: versusKeys.detail(versusId),
  queryFn: async () => {
   const res = await getRequest<{ data: TVersus }>(`/api/versus/${versusId}`);
   return res?.data ? res.data : null;
  },
 });

 if (status === "error") return <span>Something unexpected happened.</span>;
 if (!versus) return <VersusNotFound />;

 return (
  <Versus
   sessionUserId={sessionUserId}
   versus={versus}
   displaySingle={false}
   mutation={mutation}
  />
 );
}
