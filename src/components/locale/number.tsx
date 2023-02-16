"use client";
import { formatNumber } from "@lib/format";

export default function NumberFormat({ lang, num }: { lang?: string; num: number }) {
 return <>{formatNumber(num, lang)}</>;
}
