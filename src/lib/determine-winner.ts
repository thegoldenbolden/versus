export default function determineWinner([one, two]: [number, number]) {
 if (typeof one !== "number" && typeof two !== "number") {
  throw new Error("Couldn't determine winner");
 }
 return one > two ? 0 : two > one ? 1 : -1;
}
