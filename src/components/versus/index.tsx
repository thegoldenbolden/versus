import type { MutateData } from "types/mutate";
import { Fragment } from "react";

import { formatDate, formatNumber, formatPlural } from "@lib/format";
import { determineWinner } from "@lib/helpers";

import LikeButton from "../buttons/like";
import Description from "./description";
import Tags from "./tags";
import Vote from "../buttons/vote";
import Header from "./header";

const Versus = ({ data: { versus, displaySingle }, mutation }: MutateData<Data>) => {
 const totalVotes = versus.options.reduce((a, b) => a + b.votes, 0);
 const winner = determineWinner([versus.options[0].votes, versus.options[1].votes]);

 return (
  <article
   id={`${versus.id}`}
   className={`versus ${displaySingle ? "min-h-screen justify-center" : ""}`}
  >
   <Header data={versus} mutation={mutation} />
   <div className="w-full">
    {versus.options.map((option, i) => {
     return (
      <Fragment key={option.id}>
       <Vote
        mutation={mutation}
        data={{
         option,
         totalVotes,
         versusId: versus.id,
         winner: i === winner,
         userCanVote: versus.userCanVote,
        }}
       />
      </Fragment>
     );
    })}
   </div>
   <div className="actions">
    <LikeButton
     data={{ userLikes: versus.userLikes, versusId: versus.id }}
     mutation={mutation}
    />
   </div>
   <div className="details">
    <div className="likes">
     <span>
      {formatNumber(versus.likes)}&nbsp;
      {formatPlural("like", versus.likes)}
     </span>
    </div>
    <div className="description">
     <span className="mr-2 font-bold">{versus.author.name}</span>
     <Description text={versus.description} />
    </div>
    <Tags tags={versus.tags} />
    <span className="date">{formatDate(versus.createdAt)} ago</span>
   </div>
  </article>
 );
};

export default Versus;
type Data = { versus: Versus.Versus; displaySingle: boolean };
