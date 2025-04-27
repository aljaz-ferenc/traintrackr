import StatsSectionWrapper from "@/components/stats/StatsSectionWrapper.tsx";
import { useTranslation } from "react-i18next";
import { bodyParts } from "@/constants/bodyParts.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import useStats from "@/hooks/api/useStats.ts";

export default function BodyPartsSection() {
	const { t } = useTranslation();
	const { data: stats } = useStats();

	return (
		<StatsSectionWrapper title={t("STATS.sections.bodyParts")}>
			{stats?.bodyParts ? (
				<div className="flex flex-wrap gap-2">
					{bodyParts.map((part) => (
						<Card className="capitalize border rounded" key={part}>
							<CardContent>{part}</CardContent>
						</Card>
					))}
				</div>
			) : (
				<p>No data</p>
			)}
		</StatsSectionWrapper>
	);
}
