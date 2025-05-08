import { useTranslation } from "react-i18next";

export default function Welcome() {
	const { t } = useTranslation();

	return (
		<div className="h-full w-full flex flex-col gap-10 justify-between">
			<h2 className="text-3xl font-bold text-center mb-4">
				{t("ONBOARDING.welcome.title")}
			</h2>
			<p className="text-center mx-auto max-w-[80vw] w-md leading-7">
				{t("ONBOARDING.welcome.text")}
			</p>
			<div />
		</div>
	);
}
