import type { MutateData } from "types/mutate";
import Link from "next/link";
import Avatar from "../user/avatar";
import More from "./more";

export default function Header({ data: versus, mutation }: MutateData<Data>) {
 const Author = versus.author.username ? (
  <Link
   className="font-bold truncate outline-none hover:underline focus:underline"
   href={`/${versus.author.username}`}
  >
   {versus.author.name}
  </Link>
 ) : (
  <span className="font-bold truncate">{versus.author.name}</span>
 );

 const Title = versus.id && (
  <Link
   href={`/v/${versus.id}`}
   className="truncate outline-none hover:underline focus:underline"
  >
   {versus.title}
  </Link>
 );

 return (
  <div className="header">
   <Avatar image={{ url: versus.author.image, height: 40, width: 40 }} />
   <div className="flex flex-col justify-start text-sm truncate grow">
    {Author}
    {Title}
   </div>
   {versus.id && versus.userCanDelete && mutation && (
    <More
     data={{ versusId: versus.id, userCanDelete: versus.userCanDelete }}
     mutation={mutation}
    />
   )}
  </div>
 );
}

type Data = Required<Pick<Versus.Versus, "author" | "title" | "userCanDelete" | "id">>;
