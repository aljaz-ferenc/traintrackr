import { Card, CardContent } from "@/components/ui/card.tsx";
import { Beef, Droplets, Flame, Wheat } from "lucide-react";

type MacroCardProps = {
	macro: [string: "calories" | "protein" | "fat" | "carbs", number];
};

const macrosComponentsIcons = {
	calories: <Flame size={60} />,
	protein: <Beef size={60} />,
	fat: <Droplets size={60} />,
	carbs: <Wheat size={60} />,
};

export default function MacroCard({ macro }: MacroCardProps) {
	const [title, amount] = macro;
	const unit = macro[0] === "calories" ? "kcal" : "g";

	return (
		<Card>
			<CardContent className="flex flex-col relative">
				<div className="flex gap-2">
					<span className="font-bold text-muted-foreground text-xl z-10 uppercase">
						{title}
					</span>
					<span className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10">
						{macrosComponentsIcons[macro[0]]}
					</span>
				</div>
				<span className="font-bold text-3xl z-10">{`${amount} ${unit}`}</span>
			</CardContent>
		</Card>
	);
}
