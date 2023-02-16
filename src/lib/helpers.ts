export function debounce(func: Function, wait: number, immediate: boolean = false) {
 let timeout: NodeJS.Timeout | null;
 return function fn(this: typeof fn) {
  const context = this,
   args = arguments;

  function later() {
   timeout = null;
   if (!immediate) func.apply(context, args);
  }

  const callNow = immediate && !timeout;
  timeout && clearTimeout(timeout);
  timeout = setTimeout(later, wait);
  if (callNow) func.apply(context, args);
 };
}

export function determineWinner([one, two]: number[]) {
 if (typeof one !== "number" && typeof two !== "number") {
  throw new Error("Couldn't determine winner");
 }
 return one > two ? 0 : two > one ? 1 : -1;
}

export function log(label: string, data: any) {
 console.group(label);
 console.log(data);
 console.groupEnd();
}
