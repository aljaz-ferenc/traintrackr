import type React from "react";
import { Input } from "@/components/ui/Input.tsx";
import { z } from "zod";

type WeightProps = {
	weight: string;
	setWeight: React.Dispatch<React.SetStateAction<string>>;
};

export default function Weight({ weight, setWeight }: WeightProps) {
	const onWeightInput = (input: string) => {
		const { success } = z
			.string()
			.regex(/^(\d)*(\.)?([0-9])?$/)
			.safeParse(input);

		if (success) {
			setWeight(input);
		}
	};

	return (
		<>
			<h2 className="text-3xl font-bold text-center mb-4">
				What's your weight?
			</h2>
			<div className="flex items-center gap-2">
				<Input
					className="h-10 w-xs"
					onChange={(e) => onWeightInput(e.target.value)}
					value={weight}
				/>
				<span>kg</span>
			</div>
			<p className="text-center max-w-[80%] mx-auto max-w-sm leading-8">
				This helps us fine-tune your experience. No worries — your info stays
				private and safe with us.
			</p>
		</>
	);
}
