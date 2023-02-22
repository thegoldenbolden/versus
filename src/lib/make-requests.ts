import type { VersusQuery } from "types";
export const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const init: RequestInit = {
 credentials: "same-origin",
 headers: { "Content-Type": "application/json" },
};

export async function getRequest<Type>(endpoint: string, params?: VersusQuery) {
 const url = new URL(endpoint, baseUrl);

 if (params) {
  Object.entries(params).forEach(
   ([name, value]) => value && url.searchParams.set(name, value.toString())
  );
 }

 return await makeRequest<Type>(url, { method: "GET" });
}

export async function patchRequest<Type>(url: string, body: any) {
 return await makeRequest<Type>(url, { method: "PATCH", body: JSON.stringify(body) });
}

export async function postRequest<Type>(url: string, body: any = {}) {
 return await makeRequest<Type>(url, { method: "POST", body: JSON.stringify(body) });
}

export async function deleteRequest<Type>(url: string) {
 return await makeRequest<Type>(url, { method: "DELETE" });
}

async function makeRequest<Type>(
 url: URL | string,
 config: RequestInit
): Promise<Type | null> {
 try {
  const response = await fetch(url, { ...init, ...config });
  if (!response.ok) throw new Error("Failed to fetch");
  return await response.json();
 } catch (error) {
  console.error(error);
  return null;
 }
}
