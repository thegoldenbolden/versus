export default function Description({ description }: { description: string | null }) {
 if (!description) return <></>;
 return <p className="inline">{description}</p>;
}
