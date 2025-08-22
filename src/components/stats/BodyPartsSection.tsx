import Spinner from "@/components/Spinner/Spinner.tsx";
import BodyPartModal from "@/components/stats/BodyPartModal.tsx";
import StatsSectionWrapper from "@/components/stats/StatsSectionWrapper.tsx";
import useStats from "@/hooks/api/useStats.ts";
import { useTranslation } from "react-i18next";

export default function BodyPartsSection() {
	const { t } = useTranslation();
	const { data: stats } = useStats();

	return (
		<StatsSectionWrapper
			className="@container"
			title={t("STATS.sections.bodyParts.title")}
		>
			{stats?.bodyParts ? (
				<div className="grid-cols-2 @md:grid-cols-3 grid @lg:grid-cols-4 gap-2">
					{Object.entries(stats.bodyParts).map((part) => (
						<BodyPartModal
							key={part[0]}
							name={part[0]}
							measurements={part[1]}
						/>
					))}
				</div>
			) : (
				<div className="h-20 relative">
					<Spinner className="w-10 aspect-square" center />
				</div>
			)}
		</StatsSectionWrapper>
	);
}
