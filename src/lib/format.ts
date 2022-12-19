import { format } from "d3-format";
import ms from "ms";

export const formatDate = (date: string) => {
 const createdAt = new Date(date).getTime();
 const now = Date.now();
 return ms(now - createdAt, { long: true });
};

// Currently only for option votes
export const formatPercent = (x: number, total: number) => {
 if (total === 0) return 0;
 return Math.floor((x / total) * 100);
};

export const formatNumber = (num: number) => {
 return format(".1s")(num);
};

export const formatPlural = (text: string, num: number) => {
 return `${text}${num === 1 ? "" : "s"}`;
};

export const formatQuery = (params: any = {}) => {
 const query = [];
 Object.entries(params).forEach(([key, value]) => {
  if (!value) return;

  // TODO: check elements are string, boolean, or number
  if (Array.isArray(value)) {
   query.push(`${key}=${value.join(",")}`);
   return;
  }

  if (!["string", "boolean", "number"].includes(typeof value)) return;
  query.push(`${key}=${value}`);
 });

 return Object.entries(params)
  .map(([key, value]) => `${key}=${value}`)
  .join("&");
};
