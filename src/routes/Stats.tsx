import RouteTitle from "@/components/shared/RouteTitle.tsx";
import BodyPartsSection from "@/components/stats/BodyPartsSection.tsx";
import WeightSection from "@/components/stats/WeightSection.tsx";
import { useTranslation } from "react-i18next";

export default function Stats() {
	const { t } = useTranslation();

	return (
		<section>
			<RouteTitle title={t("ROUTES.stats")} />
			<div className="flex flex-col gap-5">
				<WeightSection />
				<BodyPartsSection />
			</div>
		</section>
	);
}
