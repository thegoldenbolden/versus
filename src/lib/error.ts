import { log as group } from "./helpers";

export default class CustomError extends Error {
 status: number;

 constructor(status: number, message?: string, name?: string) {
  super(message);
  this.status = status;
  this.name = name ?? "";
 }

 getMessage() {
  if (this.message) return this.message;

  switch (this.status) {
   default:
    this.message = "Something unexpected happened";
    break;
   case 400:
    this.message = "Bad Request";
    break;
   case 401:
    this.message = "Not Allowed";
    break;
   case 405:
    this.message = "Method Not Allowed";
    break;
   case 500:
    this.message = "Internal Server Error";
    break;
  }

  return this.message;
 }

 log() {
  group(this.name, this);
 }
}
