"use client";
import type { Versus as TVersus } from "@lib/versus/getVersus";
import type { Response } from "../../../../types";
import type { Session } from "next-auth";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getRequest } from "@lib/make-requests";
import versusKeys from "@lib/versus/queryKeys";
import useVersusMutation from "@hooks/use-versus-mutation";
import VersusNotFound from "@components/versus/not-found";
import CustomError from "@components/ui/error";
import Spinner from "@components/loading/spinner";
import Versus from "@components/versus";

type MutationProps = {
 versusId: string;
 sessionUser?: Session["user"];
};

export default function Mutation({ sessionUser, versusId }: MutationProps) {
 const router = useRouter();

 // If versus author deletes versus redirect to home page.
 const mutation = useVersusMutation(sessionUser, () => {
  router.push("/home");
 });

 const { data: versus, status } = useQuery({
  queryKey: versusKeys.detail(versusId as string),
  queryFn: async () => {
   const url = `/api/versus/${versusId}`;
   const response = await getRequest<Response<{ data: TVersus }>>(url);
   return response.data.ok ? response.data.data : null;
  },
 });

 if (status === "loading") return <Spinner />;
 if (status === "error") return <CustomError />;
 if (!versus) return <VersusNotFound />;
 return <Versus versus={versus} displaySingle={false} mutation={mutation} />;
}
