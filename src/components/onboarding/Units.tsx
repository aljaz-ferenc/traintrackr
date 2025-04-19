import { cn } from "@/lib/utils.ts";
import type { Units as TUnits } from "@/core/types.ts";
import type React from "react";
import { Apple } from "lucide-react";

type UnitsProps = {
	units: TUnits | null;
	setUnits: React.Dispatch<React.SetStateAction<TUnits | null>>;
};

export default function Units({ units, setUnits }: UnitsProps) {
	return (
		<>
			<h2 className="text-3xl font-bold text-center mb-4">
				Choose your preferred units
			</h2>
			<div className="flex gap-[30%] mx-auto justify-center my-5">
				<div>
					<button
						type="button"
						onClick={() => setUnits("metric")}
						className={cn([
							"border hover:bg-muted p-5 rounded-xl cursor-pointer",
							units === "metric" && "bg-muted",
						])}
					>
						<Apple size={100} />
					</button>
					<p className="font-bold text-xl text-center mt-2">Metric</p>
				</div>
				<div>
					<button
						type="button"
						onClick={() => setUnits("imperial")}
						className={cn([
							"border hover:bg-muted p-5 rounded-xl cursor-pointer",
							units === "imperial" && "bg-muted",
						])}
					>
						<Apple size={100} />
					</button>
					<p className="font-bold text-xl text-center mt-2">Imperial</p>
				</div>
			</div>
			<p className="text-center max-w-[80%] mx-auto max-w-sm leading-8">
				This will help us personalize your experience and make data input
				easier.
			</p>
		</>
	);
}
