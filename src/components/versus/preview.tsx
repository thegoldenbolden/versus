import { IHeartLine } from "../ui/icons";
import Avatar from "../user/avatar";
import Description from "./description";
import Tags from "./tags";

export default function Preview({ author, title, options, tags, description }: Data) {
 const optionIds = ["Blue", "Red"];
 options[0] = options[0].length > 0 ? options[0] : "Blue";
 options[1] = options[1].length > 0 ? options[1] : "Red";

 return (
  <div className="versus">
   <div className="header">
    <Avatar image={{ url: author.image, height: 40, width: 40 }} />
    <div className="flex flex-col text-sm truncate grow">
     <span className="font-bold truncate">{author.name}</span>
     <span className="truncate">{title}</span>
    </div>
   </div>
   <div className="w-full">
    {options.map((option, i) => (
     <div className="items-center justify-center option" key={optionIds[i]}>
      <span className="text">{option}</span>
      <div className="votes">
       {i === 0 && <span>🏆</span>}
       <div>
        <span>128 votes</span>
        <span> • </span>
        <span>50%</span>
       </div>
      </div>
     </div>
    ))}
   </div>
   <div className="actions">
    <IHeartLine className="icon" />
   </div>
   <div className="details">
    <div className="likes">
     <span> 93 likes</span>
    </div>
    <div className="break-words description">
     <span>{author.username ?? author.name}</span>
     <Description text={description ?? null} />
    </div>
    <Tags tags={tags ?? []} />
    <span className="text-xs font-bold opacity-50">13 seconds ago</span>
   </div>
  </div>
 );
}

type Data = {
 author: Versus.Versus["author"];
 title: Versus.Versus["title"];
 options: [string, string];
 tags?: number[];
 description?: string;
};
