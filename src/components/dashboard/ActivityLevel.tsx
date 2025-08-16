import Button from "@/components/shared/Button.tsx";
import { ActivityLevels } from "@/core/enums/ActivityLevel.enum.ts";
import { cn } from "@/lib/utils.ts";
import type React from "react";
import { useTranslation } from "react-i18next";
import { BiRun } from "react-icons/bi";
import { BsPersonWalking } from "react-icons/bs";
import { FaCouch } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";

type ActivityLevelProps = {
	activityLevel: ActivityLevels | null;
	setActivityLevel: React.Dispatch<React.SetStateAction<ActivityLevels | null>>;
};

const iconSize = 30;

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
		<div className="h-full w-full flex flex-col justify-between gap-10">
			<h2 className="text-3xl font-bold text-center mt-5 md:mt-0">
				{t("ONBOARDING.activityLevel.title")}
			</h2>
			<div className="grid grid-cols-3 md:grid-cols-5  max-w-[80%] mx-auto gap-3 h-full">
				{Object.values(ActivityLevels).map((level) => (
					<Button
						onClick={() => setActivityLevel(level)}
						className={cn([
							"aspect-square bg-background border w-full h-full",
							activityLevel === level && "bg-secondary hover:bg-secondary",
						])}
						variant="secondary"
						type="button"
						key={level}
					>
						<div className="flex flex-col items-center gap-2">
							<div className="justify-self-stretch">
								{activityLevelsIcons[level]}
							</div>
							<div className="block uppercase font-bold text-sm">
								{t(`ONBOARDING.activityLevel.${level}`)}
							</div>
						</div>
					</Button>
				))}
			</div>
		</div>
	);
}
