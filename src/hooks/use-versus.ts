import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@lib/make-requests";
import { versusKeys } from "@lib/versus/queries";

export default function useVersus(versusId?: string) {
 return useQuery({
  queryKey: versusKeys.detail(`${versusId}`),
  queryFn: async () => {
   const url = `/api/versus/${versusId}`;
   const response = await getRequest<Versus.ResponseData<Versus.Versus>>(url);
   return response.data.ok ? response.data.data : null;
  },
 });
}
