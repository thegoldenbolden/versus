import { useState } from "react";

import { formatDate, formatNumber, formatPlural } from "@lib/format";
import Description from "@prompt/description";
import Like from "@components/button/like";
import Options from "./options";
import Tags from "./tags";
import Header from "./header";
import { MutateData } from "types";

const Prompt = (props: MutateData<Versus.Prompt>) => {
 const [likes, setLikes] = useState(props.data.likes);

 return (
  <div className="prompt">
   <Header
    data={props.data}
    mutate={props.mutate}
    isRefreshing={props.isRefreshing}
    reload={props.reload}
   />
   <Options data={props.data} mutate={props.mutate} />
   <div className="actions">
    <Like
     isRefreshing={props.isRefreshing}
     mutate={props.mutate}
     setLikes={setLikes}
     userLikes={props.data.userLikes}
     pid={`${props.data.number}`}
    />
   </div>
   <div className="details">
    <div className="likes">
     <span>
      {formatNumber(likes)}&nbsp;
      {formatPlural("like", likes)}
     </span>
    </div>
    <div className="description break-words">
     <span>{props.data.author.name}</span>
     <Description description={props.data.description} />
    </div>
    <Tags tags={props.data.tags} />
    <span className="text-xs font-bold opacity-50">
     {formatDate(props.data.createdAt)} ago
    </span>
   </div>
  </div>
 );
};

export default Prompt;
