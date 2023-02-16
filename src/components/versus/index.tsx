import type { MutateData } from "../../types";
import type { Session } from "next-auth";
import type { Versus } from "@lib/versus/getVersus";

import { Fragment } from "react";
import { formatNumber, formatPercent, formatPlural } from "@lib/format";
import { determineWinner } from "@lib/helpers";
import NumberFormat from "../locale/number";
import RelativeDate from "../locale/date";
import LikeButton from "../buttons/like";
import Description from "./description";
import Vote from "../buttons/vote";
import Header from "./header";
import Tags from "./tags";

type Data = {
 versus: NonNullable<Versus>;
 displaySingle: boolean;
 sessionUser?: Session["user"];
};

const Versus = (props: MutateData<Data>) => {
 const { versus, mutation, sessionUser } = props;
 const totalVotes = versus.options.reduce((a, b) => a + b._count.votes, 0);
 const winner = determineWinner(versus.options.map((o) => o._count.votes));

 console.log(versus);

 return (
  <article
   id={`${versus.id}`}
   className={`versus ${props.displaySingle ? "min-h-screen justify-center" : ""}`}
  >
   <Header
    id={versus.id}
    userCanDelete={versus.userCanDelete}
    title={versus.title}
    author={versus.author}
    mutation={mutation}
   />
   <div className="w-full">
    {versus.options.map((option, i) => {
     return (
      <Fragment key={option.id}>
       <Vote
        option={option}
        mutation={mutation}
        totalVotes={totalVotes}
        versusId={versus.id}
        userCanVote={versus.userCanVote}
       >
        <span>{option.text}</span>
        {!versus.userCanVote && (
         <div className={`${versus.userCanVote ? "opacity-0" : "opacity-100"} votes`}>
          {winner === i && <span>🏆</span>}
          <div>
           <span>
            <NumberFormat num={option._count.votes} />
            &nbsp;
            {formatPlural("vote", option._count.votes)}
           </span>
           &nbsp;•&nbsp;
           <span>{formatPercent(option._count.votes, totalVotes)}%</span>
          </div>
         </div>
        )}
       </Vote>
      </Fragment>
     );
    })}
   </div>
   <div className="actions">
    <LikeButton
     sessionUser={sessionUser}
     userLikes={versus.userLikes}
     versusId={versus.id}
     mutation={mutation}
    />
   </div>
   <div className="details">
    <div className="likes">
     <span>
      <NumberFormat num={versus._count.likes} />
      &nbsp;
      {formatPlural("like", versus._count.likes)}
     </span>
    </div>
    <div className="description">
     <span className="mr-2 font-bold">{versus.author.name}</span>
     <Description text={versus.description} />
    </div>
    <Tags tags={versus.tags} />
    <RelativeDate date={versus.createdAt} />
   </div>
  </article>
 );
};

export default Versus;
