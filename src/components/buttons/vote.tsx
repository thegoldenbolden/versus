"use client";
import type { MutateData, TOption } from "../../types";
import { bebas } from "@lib/fonts";

type VoteProps = {
 children: React.ReactNode;
 option: TOption;
 versusId: number;
 totalVotes: number;
 userCanVote: boolean;
};

const Vote = (props: MutateData<VoteProps>) => {
 return (
  <button
   aria-label={props.option.text}
   aria-disabled={!props.userCanVote}
   className={`${bebas.variable} option`}
   disabled={!props.userCanVote}
   onClick={() => {
    props.mutation.mutate({
     type: "vote",
     optionId: props.option.id,
     versusId: props.versusId,
    });
   }}
  >
   {props.children}
  </button>
 );
};

export default Vote;
