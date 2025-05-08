import type React from "react";
import { Input } from "@/components/ui/Input.tsx";
import { z } from "zod";
import { useTranslation } from "react-i18next";

type WeightProps = {
	weight: string;
	setWeight: React.Dispatch<React.SetStateAction<string>>;
};

export default function Weight({ weight, setWeight }: WeightProps) {
	const { t } = useTranslation();

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
		<div className="h-full flex items-center flex-col max-w-screen justify-between gap-10">
			<h2 className="text-3xl font-bold text-center mb-4">
				{t("ONBOARDING.weight.title")}
			</h2>
			<div className="flex items-center gap-2">
				<Input
					className="h-10 max-w-[100px]"
					onChange={(e) => onWeightInput(e.target.value)}
					value={weight}
				/>
				<span>kg</span>
			</div>
		</div>
	);
}
