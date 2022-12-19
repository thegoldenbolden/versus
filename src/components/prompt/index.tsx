import { useState } from "react";
import Link from "next/link";

import { formatDate, formatNumber, formatPlural } from "@lib/format";
import Description from "@prompt/description";
import Dropdown from "@components/dropdown";
import Like from "@components/button/like";
import Options from "@prompt/options";
import Image from "@components/image";
import Tags from "@prompt/tags";
import { KeyedMutator } from "swr";

const Prompt = ({
 prompt,
 mutate,
}: {
 prompt: Versus.Prompt;
 mutate?: KeyedMutator<any[]>;
}) => {
 const [likes, setLikes] = useState(prompt.likes);

 return (
  <div className="prompt">
   <div className="header">
    <Image
     height={40}
     width={40}
     className="rounded-md"
     src={prompt.author.image ?? ""}
     alt="avatar"
    />
    <div className="flex flex-col text-sm iline-flex grow">
     <span className="font-bold truncate">{prompt.author.name}</span>
     <Link
      href={`/${prompt.number}`}
      className="truncate opacity-75 hover:opacity-100 focus:opacity-100 hover:underline focus:underline"
     >
      {prompt.title}
     </Link>
    </div>
    {prompt.userCanDelete && <Dropdown route={`/api/prompts/${prompt.number}`} />}
   </div>
   <Options
    options={prompt.options}
    userCanVote={prompt.userCanVote}
    pid={prompt.number}
   />
   <div className="actions">
    <Like
     mutate={mutate}
     setLikes={setLikes}
     userLikes={prompt.userLikes}
     pid={`${prompt.number}`}
    />
   </div>
   <div className="details">
    <div className="likes">
     <span>
      {formatNumber(likes)}&nbsp;
      {formatPlural("like", likes)}
     </span>
    </div>
    <div className="description">
     <span>{prompt.author.name}</span>
     <Description description={prompt.description} />
    </div>
    <Tags tags={prompt.tags} />
    <span className="text-xs font-bold opacity-50">
     {formatDate(prompt.createdAt)} ago
    </span>
   </div>
  </div>
 );
};

export default Prompt;
