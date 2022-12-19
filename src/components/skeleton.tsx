export default function Skeleton({ className }: { className?: string }) {
 className = `skeleton ${className}`;
 return <div className={className} />;
}
