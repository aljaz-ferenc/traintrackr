import RouteTitle from "@/components/shared/RouteTitle.tsx";
import WeightChart from "@/components/stats/WeightChart.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useStats from "@/hooks/api/useStats.ts";
import useUpdateStats from "@/hooks/api/useUpdateStats.ts";
import { useState } from "react";

export default function Stats() {
	const { mutateAsync: updateStats } = useUpdateStats();
	const [weight, setWeight] = useState("");
	const [range, setRange] = useState<Range>(Range.Week);
	const { data: stats } = useStats(range);

	return (
		<section className="w-[1200px]">
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
					<WeightChart weightData={stats?.weight} />
				</Tabs>
				<div className="flex flex-col gap-1 max-w-[150px]">
					<Input type="text" onChange={(e) => setWeight(e.target.value)} />
					<Button
						type={"button"}
						onClick={async () => await updateStats({ weight })}
					>
						Add measurement
					</Button>
				</div>
			</div>
		</section>
	);
}
