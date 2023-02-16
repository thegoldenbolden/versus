export const formatPercent = (x: number, total: number) => {
 if (total === 0) return 0;
 return Math.floor((x / total) * 100);
};

export const formatNumber = (num: number, lang: string = "en") => {
 const ntf = new Intl.NumberFormat(lang || navigator?.language || "en");
 return ntf.format(num);
};

export const abbreviateNumber = (num: number, digits: number = 1) => {
 if (num <= 0) return 0;

 const units: ("K" | "M" | "B" | "T")[] = ["K", "M", "B", "T"];
 let abbreviated = num;

 let unitIndex = -1;
 while (abbreviated >= 1000) {
  abbreviated /= 1000;
  unitIndex++;
 }

 return abbreviated.toFixed(digits) + units[unitIndex];
};

export const formatPlural = (text: string, num: number) => {
 return `${text}${num === 1 ? "" : "s"}`;
};

export function getRelativeTimeString(date: Date | string | number, lang: string = "en") {
 if (!date) throw new Error("Missing date");

 const ms: number | undefined =
  typeof date === "number"
   ? date
   : typeof date === "string"
   ? new Date(date).getTime()
   : date instanceof Date
   ? date.getTime()
   : undefined;

 if (ms === undefined) throw new Error("Unable to get milliseconds");

 const deltaSeconds = Math.round((ms - Date.now()) / 1000);
 const cutoffs = [60, 3600, 86400, 86400 * 30, 86400 * 365, Infinity];
 // prettier-ignore
 const units: Intl.RelativeTimeFormatUnitSingular[] = ["second", "minute", "hour", "day", "month", "year"];
 const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));
 const divisor = unitIndex > 0 ? cutoffs[unitIndex - 1] : 1;
 const rtf = new Intl.RelativeTimeFormat(lang || navigator?.language || "en", {
  numeric: "auto",
 });
 return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}
