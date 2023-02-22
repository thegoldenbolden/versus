"use client";

import { getRelativeTimeString } from "@lib/format";

type RelativeDateProps = {
 date: Date | string | number;
 className?: string;
};

export default function RelativeDate({ date, className }: RelativeDateProps) {
 return <span className={className ?? "date"}>{getRelativeTimeString(date)}</span>;
}
