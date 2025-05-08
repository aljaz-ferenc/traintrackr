import { useTranslation } from "react-i18next";

export default function LetsGo() {
	const { t } = useTranslation();

	return (
		<div className="h-full flex flex-col max-w-screen justify-between gap-10">
			<h2 className="text-3xl font-bold text-center mb-4">
				{t("ONBOARDING.letsGo.title")}
			</h2>
			<p className="text-center max-w-[80%] w-md mx-auto leading-7">
				{t("ONBOARDING.letsGo.text")}
			</p>
			<div />
		</div>
	);
}
