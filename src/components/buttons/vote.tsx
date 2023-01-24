import type { MutateData } from "types/mutate";
import { formatNumber, formatPercent, formatPlural } from "@lib/format";

const Vote = ({ data, mutation }: MutateData<VoteProps>) => {
 const { versusId, option, winner, userCanVote, totalVotes } = data;
 const showVotes = !userCanVote ? "opacity-100" : "opacity-0";

 return (
  <button
   aria-label={option.text}
   aria-disabled={!userCanVote}
   className="option"
   disabled={!userCanVote}
   onClick={() => {
    mutation.mutate({
     type: "vote",
     optionId: option.id,
     versusId,
    });
   }}
  >
   <span>{option.text}</span>
   {!userCanVote && (
    <div className={`${showVotes} votes`}>
     {winner && <span>🏆</span>}
     <div>
      <span>
       {formatNumber(option.votes)}&nbsp;
       {formatPlural("vote", option.votes)}
      </span>
      <span> • </span>
      <span>{formatPercent(option.votes, totalVotes)}%</span>
     </div>
    </div>
   )}
  </button>
 );
};

export default Vote;

type VoteProps = {
 versusId: number;
 option: Versus.Versus["options"][0];
 userCanVote: boolean;
 winner: boolean;
 totalVotes: number;
};
