import { cn } from "@/lib/utils.ts";
import type { Units as TUnits } from "@/core/types.ts";
import type React from "react";
import { Apple } from "lucide-react";
import {useTranslation} from "react-i18next";

type UnitsProps = {
	units: TUnits | null;
	setUnits: React.Dispatch<React.SetStateAction<TUnits | null>>;
};

export default function Units({ units, setUnits }: UnitsProps) {
	const {t} = useTranslation()

	return (
		<>
			<h2 className="text-3xl font-bold text-center mb-4">
				{t('ONBOARDING.units.title')}
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
					<p className="font-bold text-xl text-center mt-2">{t('ONBOARDING.units.metric')}</p>
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
					<p className="font-bold text-xl text-center mt-2">{t('ONBOARDING.units.imperial')}</p>
				</div>
			</div>
			<p className="text-center max-w-[80%] mx-auto max-w-sm leading-8">
				{t('ONBOARDING.units.text')}
			</p>
		</>
	);
}
