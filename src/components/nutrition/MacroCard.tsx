import { Card, CardContent } from "@/components/ui/card.tsx";
import { Beef, Droplets, Flame, Wheat } from "lucide-react";

type MacroCardProps = {
	macro: [string: "calories" | "protein" | "fat" | "carbs", number];
};

const macrosComponentsIcons = {
	calories: <Flame />,
	protein: <Beef />,
	fat: <Droplets />,
	carbs: <Wheat />,
};

export default function MacroCard({ macro }: MacroCardProps) {
	const [title, amount] = macro;
	const unit = macro[0] === "calories" ? "kcal" : "g";

	return (
		<Card>
			<CardContent className="flex flex-col">
				<span className="block mb-3">{macrosComponentsIcons[macro[0]]}</span>
				<span className="font-bold text-muted-foreground text-xl uppercase">
					{title}
				</span>
				<span className="font-bold text-3xl">{`${amount} ${unit}`}</span>
			</CardContent>
		</Card>
	);
}
