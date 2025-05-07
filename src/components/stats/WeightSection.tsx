import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import { Input } from "@/components/ui/Input.tsx";
import { z } from "zod";
import AppTooltip from "@/components/shared/Tooltip.tsx";
import Button from "@/components/shared/Button.tsx";
import { useEffect, useState } from "react";
import { isSameDay, isToday } from "date-fns";
import useUpdateStats from "@/hooks/api/useUpdateStats.ts";
import useStats from "@/hooks/api/useStats.ts";
import { useTranslation } from "react-i18next";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import useEditStats from "@/hooks/api/useEditStats.ts";
import StatsSectionWrapper from "@/components/stats/StatsSectionWrapper.tsx";
import MeasurementsChart from "@/components/stats/MeasurementsChart.tsx";
import SelectDate from "@/components/nutrition/SelectDate.tsx";

export default function WeightSection() {
	const { mutateAsync: updateStats, isPending: isUpdating } = useUpdateStats();
	const [weight, setWeight] = useState("");
	const [range, setRange] = useState<Range>(Range.Week);
	const { data: stats } = useStats(range);
	const { t } = useTranslation();
	const user = useUserStore(useShallow((state) => state.user));
	const [isEditMode, setIsEditMode] = useState(false);
	const { mutateAsync: editStats, isPending: isEditingStats } = useEditStats();
	const [selectedDate, setSelectedDate] = useState(new Date());

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
			const editPayload: { weight: number; date?: Date } = {
				weight: Number(weight),
			};

			if (!isToday(selectedDate)) {
				editPayload.date = selectedDate;
			}

			await editStats(editPayload).then(() => {
				setIsEditMode(false);
			});
		}
	};

	const hasWeighedToday = user
		? isToday(user.stats.weight[user.stats.weight.length - 1].date)
		: false;

	useEffect(() => {
		const weightOnSelectedDate =
			stats?.weight.weightsInRange.find((weight) =>
				isSameDay(weight.date, selectedDate),
			)?.value || null;

		if (hasWeighedToday && user) {
			setWeight(String(weightOnSelectedDate || t("GENERAL.noData")));
		}
	}, [hasWeighedToday, user, selectedDate, stats, t]);

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
					{stats && (
						<MeasurementsChart
							label={t("STATS.sections.weight")}
							measurements={stats.weight.weightsInRange}
						/>
					)}
				</Tabs>
				<hr className="mt-10" />
				<div className="flex flex-col gap-2 w-fit mx-auto items-center">
					<SelectDate
						className="my-10"
						onDateChange={(date) => setSelectedDate(date)}
					/>
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
						className="cursor-pointer px-4 w-full"
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
