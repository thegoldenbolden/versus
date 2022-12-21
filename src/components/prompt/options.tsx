import { useSession } from "next-auth/react";
import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";

import { formatNumber, formatPercent, formatPlural } from "@lib/format";
import { validatePostVote } from "@lib/versus/validate";
import { makePostRequest } from "@lib/make-requests";
import determineWinner from "@lib/determine-winner";
import { IWinner } from "@components/icons";

// prettier-ignore
type OptionsProps = { options: Versus.Prompt["options"]; userCanVote: boolean; pid: number;};

export default function Options({ options, userCanVote, pid }: OptionsProps) {
 const { data: session } = useSession();
 const [canVote, setCanVote] = useState(userCanVote);
 const [votes, setVotes] = useState<number[]>(options.map((o) => o.votes));
 const totalVotes = votes.reduce((a, b) => a + b, 0);
 const opacity = !canVote ? "opacity-100" : "opacity-0";

 const handleVote = async (id: string, idx: number) => {
  if (!canVote) return;

  const previous = { canVote, votes };
  setCanVote(false);
  setVotes([idx === 0 ? votes[0] + 1 : votes[0], idx === 1 ? votes[1] + 1 : votes[1]]);

  if (!session?.user.id) return;
  const vote = validatePostVote({
   pid: `${pid}`,
   uid: session.user.id as string,
   oid: id,
  });
  const res = await makePostRequest(`/api/prompts/${pid}`, vote);

  if (!res?.ok) {
   setCanVote(previous.canVote);
   setVotes(previous.votes);
  }
 };

 return (
  <div className="w-full">
   {options.map((option, i) => {
    return (
     <button
      key={option.id}
      disabled={!canVote}
      onClick={() => handleVote(option.id, i)}
      className="option"
     >
      <span>{option.text}</span>
      <Transition
       show={!canVote}
       as={Fragment}
       enter="transition ease-out duration-100"
       enterFrom="transform opacity-0 scale-95"
       enterTo="transform opacity-100 scale-100"
       leave="transition ease-in duration-75"
       leaveFrom="transform opacity-100 scale-100"
       leaveTo="transform opacity-0 scale-95"
      >
       <div className={`flex gap-2 flex-wrap votes text-base ${opacity}`}>
        <span>
         {formatNumber(votes[i])}&nbsp;
         {formatPlural("vote", votes[i])}
        </span>
        <span>•</span>
        <span>{formatPercent(votes[i], totalVotes)}%</span>
       </div>
      </Transition>
      {!canVote && i === determineWinner([votes[0], votes[1]]) && (
       <IWinner className="winner" />
      )}
     </button>
    );
   })}
  </div>
 );
}