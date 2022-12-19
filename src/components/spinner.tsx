export default function Spinner({ height, width }: { height?: string; width?: string }) {
 (height ??= "1em"), (width ??= "1em");
 return <svg className="spinner" style={{ height, width }} viewBox="25 25 50 50"></svg>;
}
