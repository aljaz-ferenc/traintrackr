import ApexCharts from "react-apexcharts";
import { getApexHeatmapData } from "@/utils/utils.ts";
import type { ApexOptions } from "apexcharts";

export default function Heatmap({
	statuses,
}: {
	statuses: {
		date: Date;
		status: "rest" | "missed" | "completed" | "upcoming";
	}[];
}) {
	const chartData = getApexHeatmapData(statuses);

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
							name: "Rest",
							color: "#e0e0e0",
						},
						{
							from: 1,
							to: 1,
							name: "Missed",
							color: "#ef5350",
						},
						{
							from: 2,
							to: 2,
							name: "Completed",
							color: "#66bb6a",
						},
						{
							from: 3,
							to: 3,
							name: "Upcoming",
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
