"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type LinkProps = {
 children?: React.ReactNode;
 icons?: React.ReactNode[];
 className?: string;
 slug: string;
};

export default function ActiveLink(props: LinkProps) {
 const segment = useSelectedLayoutSegment();
 const isActive = segment === props.slug;

 return (
  <Link
   className={props.className + (isActive ? " font-bold" : "")}
   href={`/${props.slug}`}
   aria-labelledby={props.slug}
  >
   <>
    {props.icons?.[0] && (isActive ? props.icons[1] : props.icons[0])}
    {props.children}
   </>
  </Link>
 );
}
