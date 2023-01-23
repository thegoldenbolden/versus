import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@lib/make-requests";

export default function useVersus(query: { versusId: string } = { versusId: "" }) {
 return useQuery({
  queryKey: ["versus", query],
  queryFn: async () => {
   const url = "/api/versus/" + query.versusId;
   const response = await getRequest<Versus.ResponseData<Versus.Versus>>(url);
   return response.data.ok ? response.data.data : null;
  },
 });
}
