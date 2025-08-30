import Button from "@/components/shared/Button.tsx";
import ErrorPage, {
	ErrorDescription,
	ErrorTitle,
} from "@/components/shared/ErrorPage.tsx";
import PageLoading from "@/components/shared/PageLoading.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import MesocyclesAccordion from "@/components/workout/MesocyclesAccordion.tsx";
import { Route } from "@/core/enums/Routes.enum.ts";
import useMyMesocycles from "@/hooks/api/useMyMesocycles.ts";
import { Trans, useTranslation } from "react-i18next";
export default function MyMesocycles() {
	const { data: myMesos, isFetched } = useMyMesocycles();
	const { t } = useTranslation();

	if (!isFetched) {
		return <PageLoading />;
	}

    if(!myMesos){
        return console.log('Error fetching mesocycles')
    }

	if (!myMesos.length) {
		return (
			<ErrorPage>
				<ErrorTitle>{t("MY_MESOCYCLES.error.title")}</ErrorTitle>
				<ErrorDescription>
					<Trans
						i18nKey="MY_MESOCYCLES.error.text"
						components={{
							newMesoLink: (
								<Button variant="link" to={`/${Route.NewMesocycle}`} />
							),
						}}
					/>
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
