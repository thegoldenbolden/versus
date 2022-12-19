export default function log(label: string, data: any) {
 console.group(label);
 console.log(data);
 console.groupEnd();
}
