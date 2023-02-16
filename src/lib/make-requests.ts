import type { AxiosRequestConfig } from "axios";
import type { Response } from "../types";
import axios from "axios";

export async function patchRequest<Type>(
 url: string,
 data: Type,
 config?: AxiosRequestConfig
) {
 return await axios.patch<Response<Type>>(url, data, {
  ...config,
  method: "PATCH",
 });
}

export async function postRequest<Type>(
 url: string,
 data: Type,
 config?: AxiosRequestConfig
) {
 return await axios.post<Response<Type>>(url, data, {
  ...config,
  method: "POST",
 });
}

export async function getRequest<Type>(url: string, config?: AxiosRequestConfig) {
 return await axios.get<Type>(url, { ...config, method: "GET" });
}

export async function deleteRequest<Type>(url: string, config?: AxiosRequestConfig) {
 return await axios.delete<Response<Type>>(url, {
  ...config,
  method: "DELETE",
 });
}
