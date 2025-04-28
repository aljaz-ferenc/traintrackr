import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import type { Measurement } from "@/core/types.ts";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Button from "@/components/shared/Button.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { useState } from "react";
import { z } from "zod";
import useEditStats from "@/hooks/api/useEditStats.ts";
import { useTranslation } from "react-i18next";
import MeasurementsChart from "@/components/stats/MeasurementsChart.tsx";

type BodyPartModalProps = {
	name: string;
	measurements: Measurement[];
};

export default function BodyPartModal({
	name,
	measurements,
}: BodyPartModalProps) {
	const [value, setValue] = useState("");
	const displayedValue = measurements[measurements.length - 1]?.value || 0;
	const [isOpen, setIsOpen] = useState(false);
	const { mutateAsync: editStats } = useEditStats();
	const { t } = useTranslation();

	const handleAddMeasurement = async () => {
		await editStats({
			bodyPart: {
				name,
				value,
			},
		}).then(() => {
			setValue("");
			setIsOpen(false);
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				<Card
					className="text-left cursor-pointer capitalize border rounded"
					key={t(`STATS.sections.bodyParts.${name}`)}
				>
					<CardContent>
						<CardHeader className="p-0 font-bold text-xl">
							<CardTitle>{t(`STATS.sections.bodyParts.${name}`)}</CardTitle>
						</CardHeader>
						{displayedValue ? (
							<>
								<span className="text-lg font-bold">{displayedValue}</span>
								<span className="lowercase text-muted-foreground font-bold ml-1">
									cm
								</span>
							</>
						) : (
							<span className="text-muted font-bold text-center w-full block">
								{t("GENERAL.noData")}
							</span>
						)}
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<VisuallyHidden>
						<DialogDescription>
							{t("STATS.sections.bodyParts.measurementsFor")}
							{t(`STATS.sections.bodyParts.${name}`)}
						</DialogDescription>
					</VisuallyHidden>
					<DialogTitle className="capitalize mb-5">
						{t(`STATS.sections.bodyParts.${name}`)}
					</DialogTitle>
				</DialogHeader>
				<MeasurementsChart
					measurements={measurements}
					label={t(`STATS.sections.bodyParts.${name}`)}
				/>
				<div className="flex gap-1 items-baseline max-w-50 mt-10">
					<Input
						value={value}
						onChange={(e) => {
							if (
								z
									.string()
									.regex(/^(\d)*(\.)?([0-9])?$/)
									.safeParse(e.target.value).success
							) {
								setValue(e.target.value);
							}
						}}
					/>
					<span className="ml-1">cm</span>
				</div>
				<Button onClick={handleAddMeasurement}>
					{t("STATS.addMeasurement")}
				</Button>
			</DialogContent>
		</Dialog>
	);
}
