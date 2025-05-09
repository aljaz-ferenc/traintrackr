import type React from "react";
import { Input } from "@/components/ui/Input.tsx";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import AppTooltip from "@/components/shared/Tooltip.tsx";
import Button from "@/components/shared/Button.tsx";
import type { Gender } from "@/core/types.ts";
import type { ActivityLevels } from "@/core/enums/ActivityLevel.enum.ts";
import { calcTdee } from "@/utils/utils.ts";

type TdeeProps = {
	tdee: number;
	setTdee: React.Dispatch<React.SetStateAction<number>>;
	gender: Gender | null;
	age?: number;
	weight?: number;
	height?: number;
	activityLevel?: ActivityLevels | null;
};

export default function Tdee({
	tdee,
	setTdee,
	gender,
	age,
	weight,
	height,
	activityLevel,
}: TdeeProps) {
	const { t } = useTranslation();

	const onTdeeInput = (input: string) => {
		const { success } = z
			.string()
			.regex(/^(\d)*(\.)?([0-9])?$/)
			.safeParse(input);

		if (success) {
			setTdee(Number(input));
		}
	};

	if (!gender || !age || !weight || !height || !activityLevel) {
		return;
	}

	return (
		<div className="h-full flex flex-col max-w-screen items-center justify-between gap-10">
			<h2 className="text-3xl font-bold text-center mb-4 self-center">
				{t("ONBOARDING.tdee.title")}
			</h2>
			<div className="flex gap-2 items-center">
				<Input value={tdee} onChange={(e) => onTdeeInput(e.target.value)} />
				<AppTooltip content={t("ONBOARDING.tdee.tooltip")} />
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="secondary"
					onClick={() =>
						setTdee(
							calcTdee({
								gender,
								age,
								weight,
								height,
								activityLevel,
							}),
						)
					}
				>
					{t("ONBOARDING.tdee.calcBtn")}
				</Button>
				<AppTooltip content={t("ONBOARDING.tdee.calcTdeeBtnTooltip")} />
			</div>
		</div>
	);
}
