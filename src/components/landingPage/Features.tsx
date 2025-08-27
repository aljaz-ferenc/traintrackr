import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Dumbbell, Scale } from "lucide-react";
import type { ReactNode } from "react";
import { AiFillFire } from "react-icons/ai";

export default function Features() {
	return (
		<section
			className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent"
			id="#features"
		>
			<div className="@container mx-auto max-w-5xl px-6">
				<div className="text-center">
					<h2 className="text-balance text-4xl font-semibold lg:text-5xl">
						Built to cover your needs
					</h2>
					<p className="mt-4 text-muted-foreground">
						TrainTrackr provides powerful features that will change the way you
						train.
					</p>
				</div>
				<Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
					<div className="group shadow-zinc-950/5">
						<CardHeader className="pb-3">
							<CardDecorator>
								<Dumbbell className="size-6" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-medium">Mesocycles</h3>
						</CardHeader>

						<CardContent>
							<p className="text-sm">
								Structure your workouts in mesocycles and you will never go to
								the gym not knowing what to do.
							</p>
						</CardContent>
					</div>

					<div className="group shadow-zinc-950/5">
						<CardHeader className="pb-3">
							<CardDecorator>
								<Scale className="size-6" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-medium">Body Measurements</h3>
						</CardHeader>

						<CardContent>
							<p className="mt-3 text-sm">
								Stay on track with your body weight and muscle size. Quickly see
								what's working and what isn't and adjust your training and diet.
							</p>
						</CardContent>
					</div>

					<div className="group shadow-zinc-950/5">
						<CardHeader className="pb-3">
							<CardDecorator>
								<AiFillFire className="size-6" aria-hidden />
							</CardDecorator>

							<h3 className="mt-6 font-medium">Diet</h3>
						</CardHeader>

						<CardContent>
							<p className="mt-3 text-sm">
								Abs are revealed in the kitchen. Simplify the way you track your
								calorie consumption and macronutrients.
							</p>
						</CardContent>
					</div>
				</Card>
			</div>
		</section>
	);
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
	<div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
		<div
			aria-hidden
			className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
		/>
		<div
			aria-hidden
			className="bg-radial to-background absolute inset-0 from-transparent to-75%"
		/>
		<div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
			{children}
		</div>
	</div>
);
