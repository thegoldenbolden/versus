import type { MutateData, TAuthor } from "../../types";

import Link from "next/link";
import Avatar from "../user/avatar";
import More from "./more";

type Data = {
 author: Omit<TAuthor, "role" | "id">;
 title: string;
 id: number;
 userCanDelete: boolean;
};

export default function Header(props: MutateData<Data>) {
 const { author, title, id: versusId } = props;
 const AuthorLink = author.username ? (
  <Link
   className="font-bold truncate outline-none hover:underline focus:underline"
   href={`/${author.username}`}
  >
   {author.name}
  </Link>
 ) : (
  <span className="font-bold truncate">{author.name}</span>
 );

 const TitleLink = versusId && (
  <Link
   href={`/v/${versusId}`}
   className="truncate outline-none hover:underline focus:underline"
  >
   {title}
  </Link>
 );

 return (
  <div className="header">
   <Avatar image={{ url: author.image, height: 40, width: 40 }} />
   <div className="flex flex-col justify-start text-sm truncate grow">
    {AuthorLink}
    {TitleLink}
   </div>
   {versusId && props.userCanDelete && props.mutation && (
    <More
     versusId={versusId}
     userCanDelete={props.userCanDelete}
     mutation={props.mutation}
    />
   )}
  </div>
 );
}
