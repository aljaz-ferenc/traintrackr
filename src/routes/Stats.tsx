import { Input } from "@/components/ui/Input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs.tsx";
import useStats from "@/hooks/api/useStats.ts";
import useUpdateStats from "@/hooks/api/useUpdateStats.ts";
import { useState } from "react";

export enum Range {
	Week = "week",
	Month = "month",
	Year = "year",
}

export default function Stats() {
	const { mutateAsync: updateStats } = useUpdateStats();
	const [weight, setWeight] = useState("");
	const [range, setRange] = useState<Range>(Range.Week);
	const { data: stats } = useStats(range);

	console.log(stats);

	return (
		<section>
			<div>Stats</div>
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
					<TabsContent value={Range.Week}>weekly chart</TabsContent>
					<TabsContent value={Range.Month}>monthly chart</TabsContent>
					<TabsContent value={Range.Year}>yearly chart</TabsContent>
				</Tabs>
				<div className="flex flex-col gap-1">
					<Input type="text" onChange={(e) => setWeight(e.target.value)} />
					<Button type={"button"} onClick={() => updateStats({ weight })}>
						Add
					</Button>
				</div>
			</div>
		</section>
	);
}
