import type { Versus as TVersus } from "@lib/versus/getVersus";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import useVersusMutation from "./use-versus-mutation";
import { getRequest } from "@lib/make-requests";
import versusKeys from "@lib/versus/queryKeys";

export default function useVersus(versusId: string, sessionUserId?: string | null) {
 const router = useRouter();

 // If versus author deletes versus redirect to home page.
 const mutation = useVersusMutation(sessionUserId, () => {
  router.push("/home");
 });

 const { data: versus, status } = useQuery({
  queryKey: versusKeys.detail(versusId),
  queryFn: async () => {
   const res = await getRequest<{ data: TVersus }>(`/api/versus/${versusId}`);
   return res?.data ? res.data : null;
  },
 });

 return { mutation, versus, status };
}
