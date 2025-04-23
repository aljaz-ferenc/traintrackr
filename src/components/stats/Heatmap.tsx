import ApexCharts from "react-apexcharts";
import { getApexHeatmapData } from "@/utils/utils.ts";
import type { ApexOptions } from "apexcharts";
import { useTranslation } from "react-i18next";

export default function Heatmap({
	statuses,
}: {
	statuses: {
		date: Date;
		status: "rest" | "missed" | "completed" | "upcoming";
	}[];
}) {
	const { t } = useTranslation();
	const chartData = getApexHeatmapData(statuses);
	console.log(Object.values(t("GENERAL.days", { returnObjects: true })));
	const options = {
		chart: {
			type: "heatmap",
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			heatmap: {
				shadeIntensity: 0.5,
				colorScale: {
					ranges: [
						{
							from: 0,
							to: 0,
							name: t("DASHBOARD.meso.statuses.rest"),
							color: "#e0e0e0",
						},
						{
							from: 1,
							to: 1,
							name: t("DASHBOARD.meso.statuses.missed"),
							color: "#ef5350",
						},
						{
							from: 2,
							to: 2,
							name: t("DASHBOARD.meso.statuses.completed"),
							color: "#66bb6a",
						},
						{
							from: 3,
							to: 3,
							name: t("DASHBOARD.meso.statuses.upcoming"),
							color: "#42a5f5",
						},
					],
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			type: "category",
			categories: Object.values(t("GENERAL.days", { returnObjects: true })).map(
				({ short }: { short: string }) => short.toUpperCase(),
			),
		},
		yaxis: {
			labels: {
				show: false,
			},
		},
	} satisfies ApexOptions;

	return (
		<ApexCharts
			options={options}
			series={chartData}
			type="heatmap"
			height={350}
			// width={100}
		/>
	);
}
