import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import WeightChart from "@/components/stats/WeightChart.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { z } from "zod";
import AppTooltip from "@/components/shared/Tooltip.tsx";
import Button from "@/components/shared/Button.tsx";
import { useEffect, useState } from "react";
import { isToday } from "date-fns";
import useUpdateStats from "@/hooks/api/useUpdateStats.ts";
import useStats from "@/hooks/api/useStats.ts";
import { useTranslation } from "react-i18next";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import useEditStats from "@/hooks/api/useEditStats.ts";
import StatsSectionWrapper from "@/components/stats/StatsSectionWrapper.tsx";

export default function WeightSection() {
	const { mutateAsync: updateStats, isPending: isUpdating } = useUpdateStats();
	const [weight, setWeight] = useState("");
	const [range, setRange] = useState<Range>(Range.Week);
	const { data: stats } = useStats(range);
	const { t } = useTranslation();
	const user = useUserStore(useShallow((state) => state.user));
	const [isEditMode, setIsEditMode] = useState(false);
	const { mutateAsync: editStats, isPending: isEditingStats } = useEditStats();

	const handleUpdateStats = async () => {
		await updateStats({ weight: Number(weight) });
		setWeight("");
	};

	const handleEditStats = async () => {
		if (!isEditMode) {
			setIsEditMode(true);
			return;
		}

		if (hasWeighedToday && isEditMode) {
			await editStats({ weight }).then(() => {
				setIsEditMode(false);
			});
		}
	};

	const hasWeighedToday = user
		? isToday(user.stats.weight[user.stats.weight.length - 1].date)
		: false;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (hasWeighedToday && !weight && user) {
			setWeight(String(user.stats.weight[user.stats.weight.length - 1].value));
		}
	}, [hasWeighedToday, user]);

	return (
		<StatsSectionWrapper title={t("STATS.sections.weight")}>
			<div className="flex flex-col gap-10">
				<Tabs
					defaultValue={"week"}
					onValueChange={(val) => setRange(val as Range)}
				>
					<TabsList>
						<TabsTrigger
							value={Range.Week}
							className="capitalize cursor-pointer"
						>
							{t("GENERAL.week")}
						</TabsTrigger>
						<TabsTrigger
							value={Range.Month}
							className="capitalize cursor-pointer"
						>
							{t("GENERAL.month")}
						</TabsTrigger>
						<TabsTrigger
							value={Range.Year}
							className="capitalize cursor-pointer"
						>
							{t("GENERAL.year")}
						</TabsTrigger>
					</TabsList>
					{stats && <WeightChart weightData={stats.weight.weightsInRange} />}
				</Tabs>
				<div className="flex flex-col gap-2 max-w-min">
					<div className="flex gap-2 w-max">
						<Input
							type="text"
							onChange={(e) => {
								const value = e.target.value;

								if (
									z
										.string()
										.regex(
											/^\d*\.?\d?$/,
											"Only use numbers with up to one decimal place.",
										)
										.or(z.literal(""))
										.safeParse(value)
								) {
									setWeight(value);
								}
							}}
							value={weight}
							className="w-full"
							disabled={hasWeighedToday && !isEditMode}
						/>
						<AppTooltip content={t("NUTRITION.addWeightTooltip")} />
					</div>
					<Button
						type={"button"}
						onClick={hasWeighedToday ? handleEditStats : handleUpdateStats}
						className="cursor-pointer px-4"
						isLoading={isUpdating || isEditingStats}
					>
						{!hasWeighedToday
							? t("STATS.addMeasurement")
							: isEditMode
								? t("STATS.finishEditing")
								: t("STATS.editMeasurement")}
					</Button>
				</div>
			</div>
		</StatsSectionWrapper>
	);
}
