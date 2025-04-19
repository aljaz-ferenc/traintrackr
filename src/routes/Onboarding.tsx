import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import Welcome from "@/components/onboarding/Welcome";
import Gender from "@/components/onboarding/Gender";
import Dob from "@/components/onboarding/Dob";
import Height from "@/components/onboarding/Height";
import Weight from "@/components/onboarding/Weight";
import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils.ts";
import type { Gender as TGender } from "@/core/types.ts";
import { isUserOnboarded, isValidDate } from "@/utils/utils.ts";
import LetsGo from "@/components/onboarding/LetsGo.tsx";
import OnboardingScreenWrapper from "@/components/onboarding/OnboardingScreenWrapper.tsx";
import { useNavigate } from "react-router";
import useUpdateUser from "@/hooks/api/useUpdateUser.ts";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import Spinner from "@/components/Spinner/Spinner.tsx";
import Units from "@/components/onboarding/Units.tsx";
import type { Units as TUnits } from "@/core/types.ts";

export default function Onboarding() {
	const [current, setCurrent] = useState(0);
	const [gender, setGender] = useState<TGender | null>(null);
	const [dob, setDob] = useState<string>("");
	const [units, setUnits] = useState<TUnits | null>(null);
	const [height, setHeight] = useState<number>(130);
	const [weight, setWeight] = useState("");
	const navigate = useNavigate();
	const { mutateAsync: updateUser } = useUpdateUser();
	const user = useUserStore(useShallow((state) => state.user));

	if (!user) {
		return <Spinner />;
	}

	useEffect(() => {
		if (!user) return;

		const isOnboarded = isUserOnboarded(user);
		if (isOnboarded) {
			navigate("/");
		}
	}, [user, navigate]);

	const disableContinue = useMemo(() => {
		return {
			0: false,
			1: !gender,
			2: !isValidDate(dob),
			3: !units,
			4: !height,
		};
	}, [gender, dob, height, units]);

	const onboardingScreens = useMemo(() => {
		return [
			<Welcome key="welcome" />,
			<Gender setGender={setGender} gender={gender} key="gender" />,
			<Dob setDob={setDob} key="dob" />,
			<Units key="units" setUnits={setUnits} units={units} />,
			<Height
				key="height"
				height={height}
				setHeight={setHeight}
				units={units}
			/>,
			<Weight
				key="weight"
				weight={weight}
				setWeight={setWeight}
				units={units}
			/>,
			<LetsGo key="letsGo" />,
		];
	}, [gender, height, weight, units]);

	const handleScrollPrev = () => {
		setCurrent((prev) => Math.max(prev - 1, 0));
	};
	const handleScrollNext = () => {
		setCurrent((prev) => Math.min(prev + 1, onboardingScreens.length - 1));
	};

	const handleUpdateUser = async () => {
		const year = dob.substring(4);
		const day = dob.substring(0, 2);
		const month = dob.substring(2, 4);
		const date = new Date([year, month, day].join("-"));

		await updateUser({
			gender: gender as TGender,
			dob: date,
			units: units || "metric",
			height,
			weight: {
				value: Number(weight),
				date: new Date(),
			},
		});
		navigate("/");
	};

	return (
		<section className="grid place-items-center min-h-screen overflow-hidden">
			<Card className="w-full max-w-[80%] h-full max-h-[80%]">
				<CardContent className="flex justify-center items-center h-full w-full overflow-hidden">
					<div className="w-full h-full relative flex-col flex justify-center items-center">
						<div>
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{
									scaleX: current / (onboardingScreens.length - 1),
									transition: { duration: 1 },
								}}
								className="mx-auto h-[3px] bg-primary origin-left"
							/>
						</div>
						<div className="relative h-full w-screen">
							<motion.div
								className={`flex w-[${onboardingScreens.length}%] absolute`}
								initial={{ x: 0 }}
								animate={{ x: `-${current * 100}vw` }}
								transition={{ ease: "easeInOut" }}
							>
								{onboardingScreens.map((screen) => (
									<div key={screen.key}>
										<OnboardingScreenWrapper>{screen}</OnboardingScreenWrapper>
									</div>
								))}
							</motion.div>
						</div>
						<div className="text-center mt-10 flex flex-col min-w-md">
							<Button
								disabled={disableContinue[current as 0 | 1 | 2 | 3]}
								className={cn(["mt-5 cursor-pointer"])}
								onClick={
									current === onboardingScreens.length - 1
										? handleUpdateUser
										: handleScrollNext
								}
							>
								{current === onboardingScreens.length - 1
									? "Lets go!"
									: "Continue"}
							</Button>
							{
								<button
									type="button"
									className={cn([
										"mt-5 cursor-pointer",
										current === 0 ? "invisible" : "visible",
									])}
									onClick={handleScrollPrev}
								>
									Back
								</button>
							}
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
