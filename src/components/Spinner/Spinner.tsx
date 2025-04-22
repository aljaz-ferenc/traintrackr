import React from "react";
import { cn } from "../../utils/utils.ts";
import { cva, type VariantProps } from "class-variance-authority";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	center?: boolean;
	fullscreenCenter?: boolean;
	variant?: VariantProps<typeof spinnerStyles>["variant"];
	size?: number
}

const spinnerStyles = cva([""], {
	variants: {
		variant: {
			secondary: ["border-secondary/40 border-t-secondary "],
			primary: ["border-primary/40 border-t-primary "],
		},
	},
});

function Spinner({
	center = false,
	fullscreenCenter = false,
	className,
	variant = "primary",
	size = 8,
	...props
}: Props) {
	return (
		<div
			className={cn([
				"flex items-center justify-center aspect-square",
				(center || fullscreenCenter) &&
					"-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-50 transform",
				fullscreenCenter && "fixed",
				className,
			])}
			{...props}
		>
			<div
				className={cn([
					`min-h-${size} min-w-${size} aspect-square animate-spin rounded-full border-4 duration-1000`,
					spinnerStyles({ variant }),
				])}
			/>
		</div>
	);
}
export default React.memo(Spinner);
