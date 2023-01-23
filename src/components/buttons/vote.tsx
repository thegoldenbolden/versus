import type { MutateData } from "types/mutate";
import { formatNumber, formatPercent, formatPlural } from "@lib/format";

const Vote = ({ data, mutation }: MutateData<VoteProps>) => {
 const { versusId, option, winner, userCanVote, totalVotes } = data;
 const opacity = !userCanVote ? "opacity-100" : "opacity-0";

 const handleVote = () => {
  mutation.mutate({
   mutate: "Vote",
   optionId: option.id,
   versusId,
  });
 };

 return (
  <button
   aria-label={option.text}
   aria-disabled={!userCanVote}
   disabled={!userCanVote}
   onClick={handleVote}
   className="option"
  >
   <span>{option.text}</span>
   {!userCanVote && (
    <div className={`${opacity} votes`}>
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
