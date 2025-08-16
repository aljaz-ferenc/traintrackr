import Button from "@/components/shared/Button.tsx";
import { cn } from "@/lib/utils.ts";
import { addDays, intlFormat, isToday, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type SelectDateProps = {
	onDateChange?: (date: Date) => void;
	className?: string;
};

export default function SelectDate({
	onDateChange,
	className = "",
}: SelectDateProps) {
	const [date, setDate] = useState(new Date());
	const { t, i18n } = useTranslation();

	const handleDateChange = (newDate: Date) => {
		setDate(newDate);
		onDateChange?.(newDate);
	};

	return (
		<div
			className={cn([
				"flex justify-between items-baseline relative my-16",
				className,
			])}
		>
			<div className="flex flex-col absolute top-1/2 left-1/2 -translate-1/2 items-center">
				<div className="flex items-center">
					<Button
						variant="ghost"
						onClick={() => handleDateChange(subDays(date, 1))}
					>
						<ChevronLeft />
					</Button>
					<span className="capitalize w-max">
						{isToday(date)
							? t("GENERAL.today")
							: intlFormat(date, {
									locale: i18n.language,
								})}
					</span>
					<Button
						variant="ghost"
						className={cn([isToday(date) && "invisible"])}
						onClick={() => handleDateChange(addDays(date, 1))}
					>
						<ChevronRight />
					</Button>
				</div>
				<Button
					variant="ghost"
					onClick={() => handleDateChange(new Date())}
					className={cn(["text-xs h-0", isToday(date) && "invisible"])}
				>
					{t("NUTRITION.gotoToday")}
				</Button>
			</div>
		</div>
	);
}
