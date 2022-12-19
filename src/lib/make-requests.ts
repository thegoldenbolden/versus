export async function makePostRequest(url: string, body: any, method: "POST" = "POST") {
 return await fetch(url, {
  method,
  body: JSON.stringify(body),
  headers: { "Content-Type": "application/json" },
 }).then((r) => r.json());
}

export async function makeRequest(url: string, method: "GET" | "DELETE") {
 return await fetch(url, { method }).then((r) => r.json());
}
