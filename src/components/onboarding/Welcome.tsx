import {useTranslation} from "react-i18next";

export default function Welcome() {
	const {t} = useTranslation()

	return (
		<>
			<h2 className="text-3xl font-bold text-center mb-4">
				{t('ONBOARDING.welcome.title')}
			</h2>
			<p className="text-center max-w-[80%] mx-auto max-w-sm leading-8">
				{t('ONBOARDING.welcome.text')}
			</p>
			<div />
		</>
	);
}
