import MesocyclesAccordion from "@/components/workout/MesocyclesAccordion.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useMyMesocycles from "@/hooks/api/useMyMesocycles.ts";
import PageLoading from "@/components/shared/PageLoading.tsx";
import ErrorPage, {
	ErrorDescription,
	ErrorTitle,
} from "@/components/shared/ErrorPage.tsx";
import Button from "@/components/shared/Button.tsx";
import { Route } from "@/core/enums/Routes.enum.ts";
import { useTranslation } from "react-i18next";
export default function MyMesocycles() {
	const { data: myMesos, isLoading } = useMyMesocycles();
	const { t } = useTranslation();

	if (isLoading || !myMesos) {
		return <PageLoading />;
	}

	if (!myMesos.length) {
		return (
			<ErrorPage>
				<ErrorTitle>No mesocycles</ErrorTitle>
				<ErrorDescription>
					You have not yet created any mesocycles. Create one on the{" "}
					<Button variant="link" to={`/${Route.NewMesocycle}`}>
						New Mesocycle
					</Button>{" "}
					page.
				</ErrorDescription>
			</ErrorPage>
		);
	}

	return (
		<section>
			<RouteTitle title={t("ROUTES.myMesocycles")} />
			<MesocyclesAccordion mesocycles={myMesos} />
		</section>
	);
}
