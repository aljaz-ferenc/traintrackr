import type { ComponentProps, PropsWithChildren } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils.ts";
import Spinner from "@/components/Spinner/Spinner.tsx";

const buttonStyles = cva(
	[
		"w-max relative flex items-center justify-center transition-all p-2 px-4 rounded-lg font-semibold cursor-pointer",
	],
	{
		variants: {
			variant: {
				primary: ["bg-foreground text-secondary hover:bg-foreground/85"],
				secondary: ["bg-secondary text-primary hover:bg-secondary/85"],
				destructive: ["bg-destructive text-white hover:brightness-105"],
				ghost: ["bg-none"],
			},
		},
	},
);

type ButtonProps = {
	className?: string;
	type?: "button" | "submit";
	variant?: VariantProps<typeof buttonStyles>["variant"];
	onClick?: () => void;
	isLoading?: boolean;
} & PropsWithChildren &
	ComponentProps<"button">;

export default function ButtonComponent({
	children,
	type = "button",
	variant = "primary",
	className = "",
	onClick,
	isLoading,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			{...props}
			className={cn([buttonStyles({ variant }), className])}
			onClick={onClick}
			disabled={isLoading}
		>
			<span className={cn([isLoading && "opacity-0"])}>{children}</span>
			<Spinner
				variant={
					variant === "primary" || variant === "destructive"
						? "secondary"
						: "primary"
				}
				className={cn([
					!isLoading && "invisible",
					"absolute top-1/2 left-1/2 -translate-1/2 border-black/40 border-t-black",
				])}
			/>
		</button>
	);
}
