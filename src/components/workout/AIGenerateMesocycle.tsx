import { Input } from "@/components/ui/Input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import i18n from "@/core/i18n.ts";
import useGenerateMesocycle from "@/hooks/api/useGenerateMesocycle.ts";
import { useNewMesoStore } from "@/state/NewMesoStore.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

const PROMPT_MAX_CHARS = 500;
const PROMPT_MIN_CHARS = 20;

const formSchema = z.object({
	daysPerWeek: z.coerce
		.number()
		.min(1, { message: "minOneWorkoutPerWeek" })
		.max(7, { message: "maxSevenWorkoutsPerWeek" }),
	userPrompt: z
		.string()
		.min(10, {
			message: i18n.t("FORM_ERRORS.promptMinChar", {
				minChars: PROMPT_MIN_CHARS,
			}),
		})
		.max(
			500,
			i18n.t("FORM_ERRORS.promptMinChar", { minChars: PROMPT_MAX_CHARS }),
		),
});

export default function AIGenerateMesocycle() {
	const { t } = useTranslation();
	const { mutateAsync, isPending } = useGenerateMesocycle();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [setWorkouts] = useNewMesoStore(
		useShallow((state) => [state.setWorkouts]),
	);
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			daysPerWeek: 0,
			userPrompt: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const generatedWorkouts = await mutateAsync(values);
		setWorkouts(generatedWorkouts);
		setIsDialogOpen(false);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger className="cursor-pointer" asChild>
				<Button type="button" className="ai-button-gradient">
					<div className="flex items-center gap-2">
						{t("NEW_MESOCYCLE.generateWithAIDialog.trigger")}
						<Sparkles size={20} />
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{t("NEW_MESOCYCLE.generateWithAIDialog.title")}
					</DialogTitle>
					<DialogDescription>
						{t("NEW_MESOCYCLE.generateWithAIDialog.description")}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5"
					>
						<FormField
							name="daysPerWeek"
							control={form.control}
							render={({ field }) => (
								<FormItem {...field}>
									<Label htmlFor="daysPerWeek" className="min-w-max">
										{t(
											"NEW_MESOCYCLE.generateWithAIDialog.form.workoutsPerWeek",
										)}
									</Label>
									<Input type="number" id="daysPerWeek" className="w-20" />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="userPrompt"
							control={form.control}
							render={({ field }) => (
								<FormItem {...field}>
									<Label htmlFor="userPrompt" className="min-w-max">
										{t("NEW_MESOCYCLE.generateWithAIDialog.form.userPrompt")}
									</Label>
									<div className="flex flex-col items-end gap-1">
										<Textarea
											id="userPrompt"
											maxLength={PROMPT_MAX_CHARS}
											placeholder={t(
												"NEW_MESOCYCLE.generateWithAIDialog.promptPlaceholder",
											)}
										/>
										<span className="text-muted-foreground text-xs">
											{field.value.length} / {PROMPT_MAX_CHARS}
										</span>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="ai-button-gradient cursor-pointer"
							disabled={isPending}
						>
							<div className="flex items-center gap-3">
								{isPending ? "Generating..." : "Generate"}
								<Sparkles size={20} />
							</div>
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
