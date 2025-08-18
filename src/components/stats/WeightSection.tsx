import SelectDate from "@/components/nutrition/SelectDate.tsx";
import Button from "@/components/shared/Button.tsx";
import AppTooltip from "@/components/shared/Tooltip.tsx";
import MeasurementsChart from "@/components/stats/MeasurementsChart.tsx";
import StatsSectionWrapper from "@/components/stats/StatsSectionWrapper.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useEditStats from "@/hooks/api/useEditStats.ts";
import useStats from "@/hooks/api/useStats.ts";
import useUpdateStats from "@/hooks/api/useUpdateStats.ts";
import { isSameDay, isToday } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import Spinner from "@/components/Spinner/Spinner.tsx";

export default function WeightSection() {
	const { mutateAsync: updateStats, isPending: isUpdating } = useUpdateStats();
	const [weight, setWeight] = useState("");
	const [range, setRange] = useState<Range>(Range.Week);

	const { data: stats, isLoading } = useStats(range);
	const { t } = useTranslation();
	const [isEditMode, setIsEditMode] = useState(false);
	const { mutateAsync: editStats, isPending: isEditingStats } = useEditStats();
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleUpdateStats = async () => {
		await updateStats({
			weight: Number(weight),
		}).then(() => {
			setTimeout(() => {
				setIsEditMode(false);
			}, 200);
			setWeight("");
		});
	};

	const handleEditStats = async () => {
		const editPayload: {
			weight: number;
			date?: Date;
		} = {
			weight: Number(weight),
			date: selectedDate,
		};

		await editStats(editPayload).then(() => {
			setIsEditMode(false);
		});
	};

	const hasWeighedToday = useMemo(() => {
		if (!stats) return false;
		return (
			isToday(
				stats.weight.weightsInRange[stats.weight.weightsInRange.length - 1]
					?.date as Date,
			) || false
		);
	}, [stats]);

	useEffect(() => {
		const weightOnSelectedDate =
			stats?.weight.weightsInRange.find((weight) =>
				isSameDay(weight.date, selectedDate),
			)?.value || null;

		setWeight(
			weightOnSelectedDate ? String(weightOnSelectedDate) : t("GENERAL.noData"),
		);

		if (!hasWeighedToday && isToday(selectedDate)) {
			setIsEditMode(true);
		}

		if (
			(isEditMode && !weightOnSelectedDate) ||
			(isToday(selectedDate) && !weightOnSelectedDate)
		) {
			setWeight("0");
		}
	}, [selectedDate, stats, t, isEditMode, hasWeighedToday]);

	return (
		<StatsSectionWrapper title={t("STATS.sections.weight")}>
			{!isLoading && stats ? (
				<div className="flex flex-col gap-10">
					<Tabs
						defaultValue={"week"}
						onValueChange={(val) => setRange(val as Range)}
					>
						<TabsList className="bg-background">
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
					<hr />
					<div className="flex flex-col gap-2 w-fit mx-auto items-center">
						<SelectDate
							className="mt-5 mb-7"
							onDateChange={(date) => {
								setSelectedDate(date);
								setIsEditMode(false);
							}}
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
								disabled={!isEditMode}
							/>
							<AppTooltip content={t("NUTRITION.addWeightTooltip")} />
						</div>
						<Button
							type={"button"}
							onClick={() => {
								!hasWeighedToday && isToday(selectedDate)
									? handleUpdateStats()
									: isEditMode
										? handleEditStats()
										: setIsEditMode(true);
							}}
							className="cursor-pointer w-full"
							isLoading={isUpdating || isEditingStats}
						>
							{!hasWeighedToday && isToday(selectedDate)
								? t("STATS.addMeasurement")
								: isEditMode
									? t("STATS.finishEditing")
									: t("STATS.editMeasurement")}
						</Button>
					</div>
				</div>
			) : (
				<div className="h-20 relative">
					<Spinner center className="h-10 aspect-square" />
				</div>
			)}
		</StatsSectionWrapper>
	);
}
