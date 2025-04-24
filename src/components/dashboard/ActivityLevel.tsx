import { ActivityLevels } from "@/core/enums/ActivityLevel.enum.ts";
import type React from "react";
import Button from "@/components/shared/Button.tsx";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils.ts";
import { FaCouch } from "react-icons/fa";
import { GrYoga } from "react-icons/gr";
import { BsPersonWalking } from "react-icons/bs";
import { GiWeightLiftingUp } from "react-icons/gi";
import { BiRun } from "react-icons/bi";

type ActivityLevelProps = {
	activityLevel: ActivityLevels | null;
	setActivityLevel: React.Dispatch<React.SetStateAction<ActivityLevels | null>>;
};

const iconSize = 100;

const activityLevelsIcons = {
	[ActivityLevels.SEDENTARY]: <FaCouch size={iconSize} />,
	[ActivityLevels.LIGHT]: <BsPersonWalking size={iconSize} />,
	[ActivityLevels.MODERATE]: <GrYoga size={iconSize} />,
	[ActivityLevels.VERY_ACTIVE]: <GiWeightLiftingUp size={iconSize} />,
	[ActivityLevels.EXTRA_ACTIVE]: <BiRun size={iconSize} />,
};

export default function ActivityLevel({
	activityLevel,
	setActivityLevel,
}: ActivityLevelProps) {
	const { t } = useTranslation();

	return (
		<>
			<h2 className="text-3xl font-bold text-center mb-4">
				{t("ONBOARDING.activityLevel.title")}
			</h2>
			<div className="flex justify-between gap-3">
				{Object.values(ActivityLevels).map((level) => (
					<Button
						onClick={() => setActivityLevel(level)}
						className={cn([
							"h-80 aspect-[0.6] bg-background border",
							activityLevel === level && "bg-secondary hover:bg-secondary",
						])}
						variant="secondary"
						type="button"
						key={level}
					>
						<div className="flex flex-col items-center">
							<div>{activityLevelsIcons[level]}</div>
							<div className="block mt-8 uppercase font-bold">
								{t(`ONBOARDING.activityLevel.${level}`)}
							</div>
						</div>
					</Button>
				))}
			</div>
			<p className="text-center mx-auto max-w-sm leading-8">
				{t("ONBOARDING.weight.text")}
			</p>
		</>
	);
}
