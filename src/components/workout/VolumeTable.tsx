import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import AppTooltip from "@/components/shared/Tooltip.tsx";

type VolumeTableProps = {
	muscleGroups: {
		muscle: string;
		intensity: number;
		volume: number;
	}[];
};

export default function VolumeTable({ muscleGroups }: VolumeTableProps) {
	return (
		<Card className="mx-auto">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="font-bold">Muscle Group</TableHead>
							<TableHead className="flex gap-1 items-center">
								<span className="font-bold">Volume</span>
								<AppTooltip content="Volume is calculated by assigning 1 point for each exercise where the muscle is the primary target, and 0.5 points when the muscle is a secondary target." />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{muscleGroups.map((muscleGroup, i) => (
							<TableRow key={`${muscleGroup.muscle}-${i}`}>
								<TableCell className="capitalize">
									{muscleGroup.muscle}
								</TableCell>
								<TableCell>{muscleGroup.volume}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
