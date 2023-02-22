"use client";
import VersusNotFound from "@components/versus/not-found";
import Versus from "@components/versus";
import useVersus from "@hooks/use-versus";
import FallbackVersus from "@components/versus/fallback";

type MutationProps = { versusId: string; sessionUserId?: string | null };

export default function Mutation({ sessionUserId, versusId }: MutationProps) {
 const { status, versus, mutation } = useVersus(versusId, sessionUserId);
 if (status === "loading") return <FallbackVersus />;
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
