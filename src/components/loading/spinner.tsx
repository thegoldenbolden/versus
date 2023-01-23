// prettier-ignore
export default function Spinner({ border, rounded, size, additional }: SpinnerProps) {
	size ??= "w-6 h-6";
	border ??= "border-b-smoky-black dark:border-b-lotion border-l-smoky-black dark:border-b-lotion";
	rounded ??= "rounded-full"
 return (
		<svg
		className={`${border} ${size} ${rounded} border-solid border-t-transparent border-r-transparent border-2 rounded-full motion-safe:animate-spin ${additional}`}
		viewBox="25 25 50 50"
  ></svg>
		);
	}

type SpinnerProps = {
 additional?: string;
 rounded?: `rounded-${"full" | "sm" | "md" | "lg"}`;
 border?: `border-b-${string} dark:border-b-${string} border-l-${string} dark:border-${string}`;
 size?: `w-${number} h-${number}`;
};
