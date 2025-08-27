import ErrorPage, {
	ErrorDescription,
	ErrorTitle,
} from "@/components/shared/ErrorPage.tsx";

import Button from "@/components/shared/Button.tsx";
import { Route } from "@/core/enums/Routes.enum.ts";
import { Trans, useTranslation } from "react-i18next";

function RestDay() {
	const { t } = useTranslation();

	return (
		<ErrorPage>
			<ErrorTitle>{t("TODAYS_WORKOUT.restDay.title")}</ErrorTitle>
			<ErrorDescription>{t("TODAYS_WORKOUT.restDay.text")}</ErrorDescription>
		</ErrorPage>
	);
}

function MesoCompleted() {
	const { t } = useTranslation();
	return (
		<ErrorPage>
			<ErrorTitle>{t("TODAYS_WORKOUT.mesoCompleted.title")}</ErrorTitle>
			<ErrorDescription>
				<Trans
					i18nKey="TODAYS_WORKOUT.mesoCompleted.text"
					components={{
						newMesocycleLink: (
							<Button variant="link" to={`/app/${Route.NewMesocycle}`} />
						),
						myMesocyclesLink: (
							<Button variant="link" to={`/app/${Route.MyMesocycles}`} />
						),
					}}
				/>
			</ErrorDescription>
		</ErrorPage>
	);
}

function StartsMonday() {
	const { t } = useTranslation();
	return (
		<ErrorPage>
			<ErrorTitle>{t("TODAYS_WORKOUT.mesoStartsMonday.title")}</ErrorTitle>
			<ErrorDescription>
				{t("TODAYS_WORKOUT.mesoStartsMonday.text")}
			</ErrorDescription>
		</ErrorPage>
	);
}

function NoActiveMeso() {
	const { t } = useTranslation();
	return (
		<ErrorPage>
			<ErrorTitle>{t("TODAYS_WORKOUT.noActiveMeso.title")}</ErrorTitle>
			<ErrorDescription>
				<Trans
					i18nKey="TODAYS_WORKOUT.noActiveMeso.text"
					components={{
						myMesocyclesLink: (
							<Button variant="link" to={`/app/${Route.MyMesocycles}`} />
						),
						newMesocycleLink: (
							<Button variant="link" to={`/app/${Route.NewMesocycle}`} />
						),
					}}
				/>
			</ErrorDescription>
		</ErrorPage>
	);
}

function WorkoutCompleted() {
	const { t } = useTranslation();
	return (
		<ErrorPage>
			<ErrorTitle>{t("TODAYS_WORKOUT.workoutCompleted.title")}</ErrorTitle>
			<ErrorDescription>
				{t("TODAYS_WORKOUT.workoutCompleted.text")}
			</ErrorDescription>
		</ErrorPage>
	);
}

export const Guards = {
	RestDay,
	NoActiveMeso,
	StartsMonday,
	MesoCompleted,
	WorkoutCompleted,
};
