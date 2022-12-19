type Constructor = { status: number; message?: string; name?: string };

export default class CustomError extends Error {
 status: number;

 constructor(status: number, message?: string, name?: string) {
  super(message);
  this.status = status;
  this.name = name ?? "";
 }

 getMessage() {
  switch (this.status) {
   case 400:
    this.message = "Bad Request";
    break;
   case 401:
    this.message = "Unauthorized";
    break;
   case 405:
    this.message = "Method Not Allowed";
    break;
   case 500:
    this.message = "Internal Server Error";
    break;
  }

  if (!this.message) this.message = "An error occurred";
  return this.message;
 }

 log() {
  console.group(this.name);
  console.log(this);
  console.groupEnd();
 }
}
