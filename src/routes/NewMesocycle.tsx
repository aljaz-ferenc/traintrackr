import AppTooltip from "@/components/shared/Tooltip.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import Workout from "@/components/workout/Workout.tsx";
import useCreateMesocycle from "@/hooks/api/useCreateMesocycle.ts";
import { useNewMesoStore } from "@/state/NewMesoStore.ts";
import { useShallow } from "zustand/react/shallow";
import RouteTitle from "@/components/shared/RouteTitle.tsx";

const mesoDurationOptions = [4, 6, 8, 10, 12];
const mesoSplitTypeOptions = ["synchronized", "asynchronized"];

export default function NewMesocycle() {
	const [
		mesoTitle,
		mesoDuration,
		includeDeload,
		splitType,
		workouts,
		updateMesoTitle,
		updateMesoDuration,
		toggleIncludeDeload,
		setMesoSplitType,
		addWorkout,
		constructMesocycle,
	] = useNewMesoStore(
		useShallow((state) => [
			state.mesoTitle,
			state.mesoDuration,
			state.includeDeload,
			state.splitType,
			state.workouts,
			state.updateMesoTitle,
			state.updateMesoDuration,
			state.toggleIncludeDeload,
			state.setMesoSplitType,
			state.addWorkout,
			state.constructMesocycle,
		]),
	);

	const { mutateAsync } = useCreateMesocycle();

	const handleCreateMeso = async () => {
		const newMeso = constructMesocycle("testUser");
		await mutateAsync(newMeso);
	};

	return (
		<section className="w-[600px] flex flex-col gap-5">
			<RouteTitle title='New Mesocycle'/>
			<div className="flex flex-col gap-5">
				<div>
					<Label>Mesocycle Name</Label>
					<Input
						value={mesoTitle}
						className="w-full"
						onChange={(e) => updateMesoTitle(e.target.value)}
					/>
				</div>
				<div>
					<Label>Mesocycle duration in weeks</Label>
					<ToggleGroup
						value={String(mesoDuration)}
						type="single"
						className="flex gap-2"
						onValueChange={(duration) => updateMesoDuration(Number(duration))}
					>
						{mesoDurationOptions.map((option) => (
							<ToggleGroupItem
								className="cursor-pointer p-5"
								key={option}
								value={String(option)}
							>
								{option}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>
				<div className="flex items-center gap-1">
					<Checkbox
						checked={includeDeload}
						id="mesoDuration"
						className="cursor-pointer"
						onCheckedChange={(val) => toggleIncludeDeload(val as boolean)}
					/>
					<Label htmlFor="mesoDuration">Include deload week</Label>
					<AppTooltip content="Weight will be lowered by 50% on the last week of the mesoccle." />
				</div>
				<div>
					<Label>Split Type</Label>
					<ToggleGroup
						value={splitType}
						type={"single"}
						className="flex gap-2"
						onValueChange={setMesoSplitType}
					>
						{mesoSplitTypeOptions.map((option) => (
							<ToggleGroupItem
								value={option}
								key={option}
								className="capitalize cursor-pointer"
							>
								{option}
							</ToggleGroupItem>
						))}
						<AppTooltip
							content={
								<div className="flex flex-col gap-1">
									<span>
										<strong>Synchronized: </strong>
										Workouts follow a fixed weekly schedule (7-day split).
									</span>
									<span>
										<strong>Asynchronized: </strong>
										Workouts repeat in order without fixed days.
									</span>
								</div>
							}
						/>
					</ToggleGroup>
				</div>
				<Separator />
			</div>
			<div className="flex flex-col gap-5 overflow-auto relative">
				<Button
					variant="secondary"
					className="cursor-pointer max-w-20 sticky top-0 left-0"
					onClick={() =>
						addWorkout({ id: crypto.randomUUID(), exercises: [], day: 0 })
					}
				>
					Add day
				</Button>
				<div className="flex gap-5">
					{workouts.map((workout) => (
						<Workout key={workout.id} workout={workout} editable />
					))}
				</div>
			</div>
			<Button variant="default" onClick={handleCreateMeso}>
				Create Mesocycle
			</Button>
		</section>
	);
}
