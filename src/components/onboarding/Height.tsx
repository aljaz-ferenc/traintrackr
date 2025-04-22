import "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
import { Triangle } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils.ts";
import {useTranslation} from "react-i18next";

const heights: number[] = [];

for (let i = 130; i < 230; i++) {
	heights.push(i);
}
const imperialHeights: number[] = [];

for (let i = 4; i <= 7; i++) {
	imperialHeights.push(i);
	for (let j = 1; j <= 11; j++) {
		imperialHeights.push(j);
	}
}

type HeightProps = {
	height: number;
	setHeight: React.Dispatch<React.SetStateAction<number>>;
};

export default function Height({ setHeight }: HeightProps) {
	const {t} = useTranslation()

	return (
		<>
			<h2 className="text-3xl font-bold text-center mb-4">
				{t('ONBOARDING.height.title')}
			</h2>
			<Triangle className="-scale-y-100 absolute left-1/2 -translate-x-1/2 translate-y-30 fill-white" />
			<Swiper
				direction={"horizontal"}
				className="w-full !cursor-pointer border"
				slidesPerView={24}
				freeMode={true}
				onSlideChange={(swiper) => setHeight(heights[swiper.activeIndex])}
				centeredSlides={true}
				slideToClickedSlide={true}
			>
				{heights.map((height) => (
					<SwiperSlide
						className="select-none !py-10 text-sm text-center flex flex-col"
						key={height}
					>
						<span>{height}</span>
						<div
							className={cn([
								"w-1 bg-primary mx-auto h-full",
								height % 5 !== 0 && "h-1/2",
							])}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<p className="text-center max-w-[80%] mx-auto max-w-sm leading-8">
				{t('ONBOARDING.height.text')}
			</p>
		</>
	);
}
