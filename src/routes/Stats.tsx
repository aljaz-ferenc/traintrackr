import RouteTitle from "@/components/shared/RouteTitle.tsx";
import WeightChart from "@/components/stats/WeightChart.tsx";
import { Input } from "@/components/ui/Input.tsx";
import Button from "@/components/shared/Button.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useStats from "@/hooks/api/useStats.ts";
import useUpdateStats from "@/hooks/api/useUpdateStats.ts";
import { useState } from "react";
import PageLoading from "@/components/shared/PageLoading.tsx";

export default function Stats() {
	const { mutateAsync: updateStats, isPending: isUpdating } = useUpdateStats();
	const [weight, setWeight] = useState("");
	const [range, setRange] = useState<Range>(Range.Week);
	const { data: stats, isLoading } = useStats(range);

	if (isLoading) {
		return <PageLoading />;
	}

	const handleUpdateStats = async () => {
		await updateStats({ weight: Number(weight) });
		setWeight("");
	};

	return (
		<section>
			<RouteTitle title="Stats" />
			<div className="flex flex-col gap-10">
				<Tabs
					defaultValue={"week"}
					onValueChange={(val) => setRange(val as Range)}
				>
					<TabsList>
						<TabsTrigger value={Range.Week}>Week</TabsTrigger>
						<TabsTrigger value={Range.Month}>Month</TabsTrigger>
						<TabsTrigger value={Range.Year}>Year</TabsTrigger>
					</TabsList>
					<WeightChart weightData={stats.weight.weightsInRange} />
				</Tabs>
				<div className="flex flex-col gap-2 max-w-min">
					<Input
						type="text"
						onChange={(e) => setWeight(e.target.value)}
						value={weight}
						className="w-full"
					/>
					<Button
						type={"button"}
						onClick={handleUpdateStats}
						className="cursor-pointer px-4"
						isLoading={isUpdating}
					>
						Add measurement
					</Button>
				</div>
			</div>
		</section>
	);
}
