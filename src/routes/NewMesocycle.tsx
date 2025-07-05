// import AppTooltip from "@/components/shared/Tooltip.tsx";
import { Input } from "@/components/ui/Input.tsx";
import Button from "@/components/shared/Button.tsx";
// import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import Workout from "@/components/workout/Workout.tsx";
import useCreateMesocycle from "@/hooks/api/useCreateMesocycle.ts";
import { useNewMesoStore } from "@/state/NewMesoStore.ts";
import { useShallow } from "zustand/react/shallow";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useUserStore from "@/state/UserStore.ts";
import { useParams } from "react-router";
import useGetMesocycleById from "@/hooks/api/useGetMesocyleById.ts";
import { useEffect, useMemo } from "react";
import useUpdateMesocycle from "@/hooks/api/useUpdateMesocycle.ts";
import { useQueryClient } from "@tanstack/react-query";
import Body from "@/components/workout/Body.tsx";
import { getMuscleIntensities } from "@/utils/utils.ts";
import PageLoading from "@/components/shared/PageLoading.tsx";
import { useTranslation } from "react-i18next";

const mesoDurationOptions = [4, 6, 8, 10, 12];
// const mesoSplitTypeOptions = ["synchronous", "asynchronous"];

export default function NewMesocycle() {
	const [user] = useUserStore(useShallow((state) => [state.user]));
	const { mesoId } = useParams<{
		mesoId: string;
	}>();
	const { data: mesoToEdit, isLoading } = useGetMesocycleById(mesoId || "");
	const { mutateAsync: updateMesocycle, isPending: isUpdating } =
		useUpdateMesocycle();
	const { mutateAsync: createMesocycle, isPending: isCreating } =
		useCreateMesocycle();
	const queryClient = useQueryClient();
	const { t } = useTranslation();
	const [
		mesoTitle,
		mesoDuration,
		// includeDeload,
		// splitType,
		workouts,
		updateMesoTitle,
		updateMesoDuration,
		// toggleIncludeDeload,
		// setMesoSplitType,
		addWorkout,
		constructMesocycle,
		setMesoToEdit,
		resetMesoStore,
		calorieGoal,
		setCalorieGoal,
	] = useNewMesoStore(
		useShallow((state) => [
			state.mesoTitle,
			state.mesoDuration,
			// state.includeDeload,
			// state.splitType,
			state.workouts,
			state.updateMesoTitle,
			state.updateMesoDuration,
			// state.toggleIncludeDeload,
			// state.setMesoSplitType,
			state.addWorkout,
			state.constructMesocycle,
			state.setMesoToEdit,
			state.resetMesoStore,
			state.calorieGoal,
			state.setCalorieGoal,
		]),
	);

	if (!user) return;

	const handleCreateMeso = async () => {
		const newMeso = constructMesocycle(user._id as string);
		await createMesocycle(newMeso);
		resetMesoStore();
		await queryClient.invalidateQueries({
			queryKey: [
				"mesocycle",
				{
					mesoId,
				},
			],
		});
	};

	const handleUpdateMeso = async () => {
		const updatedMeso = constructMesocycle(user._id as string);
		await updateMesocycle(updatedMeso);
		resetMesoStore();
		await queryClient.invalidateQueries({
			queryKey: [
				"mesocycle",
				{
					mesoId,
				},
			],
		});
	};

	const allowEdit = useMemo(() => {
		if (isLoading) return;
		return !!mesoToEdit;
	}, [mesoToEdit, isLoading]);

	useEffect(() => {
		if (isLoading || !mesoToEdit) return;
		setMesoToEdit(mesoToEdit);
	}, [isLoading, mesoToEdit, setMesoToEdit]);

	const muscleGroups = useMemo(() => {
		return getMuscleIntensities(workouts);
	}, [workouts]);

	const createBtnDisabled = useMemo(() => {
		return (
			!mesoTitle ||
			!workouts.length ||
			workouts.some((w) => !w.exercises.length || typeof w.day !== "number") ||
			!calorieGoal
		);
	}, [mesoTitle, workouts, calorieGoal]);

	if (isLoading) {
		return <PageLoading />;
	}

	return (
		<section className="flex flex-col gap-5">
			<RouteTitle
				title={allowEdit ? t("ROUTES.editMesocycle") : t("ROUTES.newMesocycle")}
			/>
			<div className="flex flex-col gap-10">
				<div>
					<Label className="mb-2">{t("NEW_MESOCYCLE.name")}</Label>
					<Input
						value={mesoTitle}
						className="w-full"
						onChange={(e) => updateMesoTitle(e.target.value)}
					/>
				</div>
				<div>
					<Label className="mb-2">{t("NEW_MESOCYCLE.duration")}</Label>
					<ToggleGroup
						value={String(mesoDuration)}
						type="single"
						className="flex gap-2 mb-4"
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
					{/*<div className="flex items-center gap-1">*/}
					{/*	<Checkbox*/}
					{/*		checked={includeDeload}*/}
					{/*		id="mesoDuration"*/}
					{/*		className="cursor-pointer"*/}
					{/*		onCheckedChange={(val) => toggleIncludeDeload(val as boolean)}*/}
					{/*	/>*/}
					{/*	<Label htmlFor="mesoDuration">Include deload week</Label>*/}
					{/*	<AppTooltip content="Weight will be lowered by 50% on the last week of the mesoccle." />*/}
					{/*</div>*/}
				</div>
				{/*<div>*/}
				{/*	<Label className="mb-2">Split Type</Label>*/}
				{/*	<ToggleGroup*/}
				{/*		value={splitType}*/}
				{/*		type={"single"}*/}
				{/*		className="flex gap-2"*/}
				{/*		onValueChange={setMesoSplitType}*/}
				{/*	>*/}
				{/*		{mesoSplitTypeOptions.map((option) => (*/}
				{/*			<ToggleGroupItem*/}
				{/*				value={option}*/}
				{/*				key={option}*/}
				{/*				className="capitalize cursor-pointer"*/}
				{/*			>*/}
				{/*				{option}*/}
				{/*			</ToggleGroupItem>*/}
				{/*		))}*/}
				{/*		<AppTooltip*/}
				{/*			content={*/}
				{/*				<div className="flex flex-col gap-1">*/}
				{/*					<span>*/}
				{/*						<strong>Synchronous: </strong>*/}
				{/*						Workouts follow a fixed weekly schedule (7-day split).*/}
				{/*					</span>*/}
				{/*					<span>*/}
				{/*						<strong>Asynchronous: </strong>*/}
				{/*						Workouts repeat in order without fixed days.*/}
				{/*					</span>*/}
				{/*				</div>*/}
				{/*			}*/}
				{/*		/>*/}
				{/*	</ToggleGroup>*/}
				{/*</div>*/}
				<div className="flex flex-col gap-2">
					<Label>{t("NEW_MESOCYCLE.calorieGoal")}</Label>
					<Input
						value={calorieGoal.toString()}
						onChange={(e) => setCalorieGoal(e.target.value)}
					/>
					<div className="flex gap-2 flex-wrap">
						<div className="flex gap-2">
							<Button
								onClick={() => setCalorieGoal(String(user.stats.tdee - 1000))}
								variant="secondary"
							>
								-1000
							</Button>
							<Button
								onClick={() => setCalorieGoal(String(user.stats.tdee - 750))}
								variant="secondary"
							>
								-750
							</Button>
							<Button
								onClick={() => setCalorieGoal(String(user.stats.tdee - 500))}
								variant="secondary"
							>
								-500
							</Button>
							<Button
								onClick={() => setCalorieGoal(String(user.stats.tdee - 250))}
								variant="secondary"
							>
								-250
							</Button>
						</div>
						<Button
							onClick={() => setCalorieGoal(String(user.stats.tdee))}
							variant="secondary"
						>
							{t("NEW_MESOCYCLE.maintenance")}
						</Button>
						<div className="flex gap-2">
							<Button
								onClick={() => setCalorieGoal(String(user.stats.tdee + 250))}
								variant="secondary"
							>
								+250
							</Button>
							<Button
								onClick={() => setCalorieGoal(String(user.stats.tdee + 500))}
								variant="secondary"
							>
								+500
							</Button>
							<Button
								onClick={() => setCalorieGoal(String(user.stats.tdee + 750))}
								variant="secondary"
							>
								+750
							</Button>
							<Button
								onClick={() => setCalorieGoal(String(user.stats.tdee + 1000))}
								variant="secondary"
							>
								+1000
							</Button>
						</div>
					</div>
				</div>
				<Separator />
			</div>
			<div className="flex gap-10 max-w-screen">
				<Body muscleGroups={muscleGroups} />
				{/*<VolumeTable muscleGroups={muscleGroups}/>*/}
			</div>
			<div className="flex flex-col overflow-auto relative">
				<Button
					variant="secondary"
					className="cursor-pointer sticky top-0 left-0 w-fit px-4"
					onClick={() =>
						addWorkout({
							id: crypto.randomUUID(),
							exercises: [],
							day: 0,
						})
					}
				>
					{t("NEW_MESOCYCLE.addWorkout")}
				</Button>
				<div className="flex gap-5 mt-2">
					{workouts.map((workout) => (
						<Workout key={workout.id} workout={workout} editable focusable />
					))}
				</div>
			</div>
			<Button
				variant="primary"
				onClick={allowEdit ? handleUpdateMeso : handleCreateMeso}
				isLoading={isCreating || isUpdating}
				disabled={createBtnDisabled}
			>
				{allowEdit
					? t("GENERAL.finishEditing")
					: t("NEW_MESOCYCLE.createMeso")}
			</Button>
		</section>
	);
}
