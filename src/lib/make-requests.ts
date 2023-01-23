import type { AxiosRequestConfig } from "axios";
import axios from "axios";

// Headers became required with axios update.
type Config = Partial<AxiosRequestConfig>;

export async function postRequest<Type>(url: string, data: Type, config?: Config) {
 return await axios.post<Versus.ResponseData<Type>>(url, data, {
  ...config,
  method: "POST",
 });
}

export async function getRequest<Type>(url: string, config?: Config) {
 return await axios.get<Type>(url, { ...config, method: "GET" });
}

export async function deleteRequest<Type>(url: string, config?: Config) {
 return await axios.delete<Versus.ResponseData<Type>>(url, {
  ...config,
  method: "DELETE",
 });
}
