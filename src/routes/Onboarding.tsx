import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import Welcome from "@/components/onboarding/Welcome";
import Gender from "@/components/onboarding/Gender";
import Dob from "@/components/onboarding/Dob";
import Height from "@/components/onboarding/Height";
import Weight from "@/components/onboarding/Weight";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils.ts";
import type { Gender as TGender } from "@/core/types.ts";
import { calcAgeFromDob, isUserOnboarded, isValidDate } from "@/utils/utils.ts";
import LetsGo from "@/components/onboarding/LetsGo.tsx";
import OnboardingScreenWrapper from "@/components/onboarding/OnboardingScreenWrapper.tsx";
import { useNavigate } from "react-router";
import useUpdateUserStats from "@/hooks/api/useUpdateUserStats.ts";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import Spinner from "@/components/Spinner/Spinner.tsx";
import SelectLanguage from "@/components/shared/SelectLanguage.tsx";
import { useTranslation } from "react-i18next";
import { UserButton } from "@clerk/clerk-react";
import Tdee from "@/components/dashboard/Tdee.tsx";
import ActivityLevel from "@/components/dashboard/ActivityLevel.tsx";
import type { ActivityLevels } from "@/core/enums/ActivityLevel.enum.ts";

export default function Onboarding() {
	const [current, setCurrent] = useState(0);
	const [gender, setGender] = useState<TGender | null>(null);
	const [dob, setDob] = useState<string>("");
	const [height, setHeight] = useState<number>(130);
	const [weight, setWeight] = useState("");
	const [activityLevel, setActivityLevel] = useState<ActivityLevels | null>(
		null,
	);
	const [tdee, setTdee] = useState(0);
	const navigate = useNavigate();
	const { mutateAsync: updateUser, isPending: isUpdating } =
		useUpdateUserStats();
	const user = useUserStore(useShallow((state) => state.user));
	const { t } = useTranslation();

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

	const age = useMemo(() => {
		const year = dob.substring(4);
		const day = dob.substring(0, 2);
		const month = dob.substring(2, 4);
		const date = new Date([year, month, day].join("-"));
		return calcAgeFromDob(new Date(date));
	}, [dob]);

	const disableContinue = useMemo(() => {
		return {
			0: false,
			1: !gender,
			2: !isValidDate(dob),
			3: !height,
			4: !weight,
			5: !activityLevel,
			6: !tdee,
		};
	}, [gender, dob, height, weight, tdee, activityLevel]);

	const onboardingScreens = useMemo(() => {
		return [
			<Welcome key="welcome" />,
			<Gender setGender={setGender} gender={gender} key="gender" />,
			<Dob setDob={setDob} key="dob" />,
			<Height key="height" height={height} setHeight={setHeight} />,
			<Weight key="weight" weight={weight} setWeight={setWeight} />,
			<ActivityLevel
				key="activityLevel"
				activityLevel={activityLevel}
				setActivityLevel={setActivityLevel}
			/>,
			<Tdee
				key="tdee"
				tdee={tdee}
				setTdee={setTdee}
				gender={gender}
				weight={Number(weight)}
				activityLevel={activityLevel}
				age={age}
				height={height}
			/>,
			<LetsGo key="letsGo" />,
		];
	}, [gender, height, weight, tdee, activityLevel, age]);

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
			height,
			tdee,
			activityLevel: activityLevel as ActivityLevels,
			weight: {
				value: Number(weight),
				date: new Date(),
			},
		});
		navigate("/");
	};

	return (
		<section className="grid place-items-center min-h-screen overflow-hidden">
			<Card className="w-full h-full relative p-0 border-none">
				<div className="absolute top-3 right-3 z-20 flex gap-3">
					<SelectLanguage />
					<UserButton />
				</div>
				<CardContent className="flex justify-center items-center h-full w-full overflow-hidden p-0 ">
					{!isUpdating ? (
						<Spinner className="h-8" />
					) : (
						<div className="w-full h-full pt-10 relative flex-col flex justify-center items-center md:max-h-[600px]">
							<div className={""}>
								<motion.div
									initial={{
										scaleX: 0,
									}}
									animate={{
										scaleX: current / (onboardingScreens.length - 1),
										transition: {
											duration: 1,
										},
									}}
									className="mx-auto h-[3px] bg-primary origin-left"
								/>
							</div>
							<div className="relative h-full w-full justify-self-center">
								<motion.div
									className="flex max-h-[500px] absolute items-center"
									initial={{
										x: 0,
									}}
									animate={{
										x: `-${current * 100}vw`,
									}}
									transition={{
										ease: "easeInOut",
									}}
								>
									{onboardingScreens.map((screen, i) => (
										<OnboardingScreenWrapper
											key={`screen-${i + 1}`}
											isHidden={i !== current}
										>
											{screen}
										</OnboardingScreenWrapper>
									))}
								</motion.div>
							</div>
							<AnimatePresence>
								{current > 0 && current < onboardingScreens.length - 1 && (
									<motion.p
										initial={{
											opacity: 0,
										}}
										animate={{
											opacity: 1,
										}}
										exit={{
											opacity: 0,
										}}
										className="text-center mx-auto max-w-[80vw] leading-5 text-sm text-muted-foreground"
									>
										{t("ONBOARDING.privacy")}
									</motion.p>
								)}
							</AnimatePresence>
							<div className="text-center flex flex-col self-stretch p-5 max-w-md mx-auto">
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
										? t("ONBOARDING.buttons.letsGo")
										: t("ONBOARDING.buttons.continue")}
								</Button>
								{
									<button
										type="button"
										className={cn([
											"mt-3 cursor-pointer underline underline-offset-2",
											current === 0 ? "invisible" : "visible",
										])}
										onClick={handleScrollPrev}
									>
										{t("ONBOARDING.buttons.back")}
									</button>
								}
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</section>
	);
}
