import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import { US, SI } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils.ts";

const languages = [
	{ lng: "sl", label: "SLO", flag: <SI className="min-w-8 rounded-xl" /> },
	{ lng: "en", label: "ENG", flag: <US className="min-w-8 rounded-xl" /> },
];

type SelectLanguageProps = {
	className?: string;
};

export default function SelectLanguage({
	className = "",
}: SelectLanguageProps) {
	const { i18n } = useTranslation();

	return (
		<div className={cn([className])}>
			<Select
				onValueChange={(val) => i18n.changeLanguage(val)}
				defaultValue={i18n.language.split("-")[0]}
			>
				<SelectTrigger className="cursor-pointer">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{languages.map((lng) => (
							<SelectItem key={lng.lng} value={lng.lng}>
								<div className="cursor-pointer flex gap-3 items-center">
									{lng.flag}
									<span>{lng.label}</span>
								</div>
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
