import { useEffect, useRef } from "react";
import { useTheme } from "@/provider/ThemeProvider";

type BodyProps = {
	muscleGroups: {
		muscle: string;
		intensity: number;
		volume: number;
	}[];
};

export default function Body({ muscleGroups }: BodyProps) {
	const svgFrontRef = useRef<SVGSVGElement>(null);
	const svgBackRef = useRef<SVGSVGElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const { theme } = useTheme();

	const strokeColor = theme === "light" ? "#aaa" : "#fff";
	const strokeWidth = 2;
	const strokeLinecap = "round";
	const strokeLinejoin = "round";
	const strokeMiterlimit = 10;
	const highlightColors = [
		"#ffebeb",
		"#ffd1d1",
		"#ffb8b8",
		"#ff9e9e",
		"#ff8585",
		"#ff6b6b",
		"#ff5252",
		"#ff3939",
		"#ff2020",
		"#ff0707",
		"#e60000",
		"#cc0000",
		"#b30000",
		"#990000",
		"#8a0000",
		"#7f0000",
		"#660000",
		"#550000",
		"#440000",
		"#330000",
	];

	useEffect(() => {
		const muscleGroupsList = muscleGroups.map((mg) => mg.muscle);
		const allGroups = containerRef.current?.querySelectorAll("g g");

		//reset colors for all paths
		// biome-ignore lint/complexity/noForEach: <explanation>
		allGroups?.forEach((g) => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			g.querySelectorAll("path").forEach((path) => {
				path.setAttribute("fill", "none");
				path.setAttribute("stroke", strokeColor);
			});
		});

		//colorize active muscle groups
		// biome-ignore lint/complexity/noForEach: <explanation>
		allGroups?.forEach((g) => {
			const id = g.getAttribute("id");
			if (id && muscleGroupsList.includes(id)) {
				const muscle = muscleGroups.find((mg) => mg.muscle === id);
				if (muscle) {
					// biome-ignore lint/complexity/noForEach: <explanation>
					g.querySelectorAll("path").forEach((path) => {
						path.setAttribute(
							"fill",
							highlightColors[
								Math.min(muscle.intensity, highlightColors.length - 1)
							],
						);
						path.setAttribute("stroke", "none");
					});
				}
			}
		});
	}, [muscleGroups, strokeColor]);

	return (
		<div className="flex gap-10 max-w-full" ref={containerRef}>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				style={{
					height: 300,
					width: 150,
				}}
				ref={svgFrontRef}
				width="609"
				height="1216"
				viewBox="0 0 609 1216"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="Frame 2" clipPath="url(#clip0_1_111)">
					<rect width="609" height="1216" fill="var(--background)" />
					<g id="adductors">
						<path
							id="adductors_2"
							d="M374.5 550L381 501L374.5 509.5L359.5 534L350 561L329.5 588L318 612.5L324 622V657V709L329.5 750.5L335.5 793L340 841L346.5 861V807V765.5L350 709L359.5 648.5L365 592.5L374.5 550Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="adductors_3"
							d="M234.5 550L228 501L234.5 509.5L249.5 534L259 561L279.5 588L291 612.5L285 622V657V709L279.5 750.5L273.5 793L269 841L262.5 861V807V765.5L259 709L249.5 648.5L244 592.5L234.5 550Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="idk">
						<g id="idk_2">
							<path
								d="M416.5 993L435.5 892L437.5 951L445 998.5L435.5 1051L434.5 1112.5L427.5 1215L416.5 1192.5H389L405.5 1112.5L416.5 993Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M356.5 914V930.5L378.5 961L389 993V1042L365 1074L378.5 1161L398 1091.5L399 1026L398 951V865.5L378.5 871L349.5 865.5V885.5L356.5 914Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="idk_3">
							<path
								d="M192.5 993L173.5 892L171.5 951L164 998.5L173.5 1051L174.5 1112.5L181.5 1215L192.5 1192.5H220L203.5 1112.5L192.5 993Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M252.5 914V930.5L230.5 961L220 993V1042L244 1074L230.5 1161L211 1091.5L210 1026L211 951V865.5L230.5 871L259.5 865.5V885.5L252.5 914Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
					<g id="biceps">
						<g id="biceps_2">
							<path
								d="M525.5 235.5V211.5L534 222.5L541 241L552 276.5V294L550 317.5L548 296.5L543 277.75L536 257L525.5 235.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M542 342.5C558.5 272.5 502.167 203.5 470.5 177C514.5 228.2 523.5 305 522.5 337L542 342.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M455 167.5C500.6 210.7 514 298.5 516 337L493 366.5V350.5L486.5 330L478.5 314.5L466 276.5L460.5 255.5L457.5 222.5L455 199.75L457.5 181C456.333 178.333 456 170 455 167.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="biceps_3">
							<path
								d="M83.5 235.5V211.5L75 222.5L68 241L57 276.5V294L59 317.5L61 296.5L66 277.75L73 257L83.5 235.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M67 342.5C50.5 272.5 106.833 203.5 138.5 177C94.5 228.2 85.5 305 86.5 337L67 342.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M154 167.5C108.4 210.7 95 298.5 93 337L116 366.5V350.5L122.5 330L130.5 314.5L143 276.5L148.5 255.5L151.5 222.5L154 199.75L151.5 181C152.667 178.333 153 170 154 167.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
					<g id="neck">
						<path
							id="neck_2"
							d="M352 41L359 24.5L358 41L355 47L354 55L352.5 71L350.5 83.5V96L333 97.5L337.5 88L340 78L343.5 66L346 51.5L352 41Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="neck_3"
							d="M358.5 18V0L351 10.5L341 22L333.5 32.5L329.5 41.5L327.5 56.5L323.5 74.5L321 86L319 96L312 109L322.5 102.5L328.5 95.5L334.5 82L338 69.5L340 61L342.5 50C343.833 47.1667 347.6 41.2 348 40C348.4 38.8 355.167 24.8333 358.5 18Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="neck_4"
							d="M315.5 91.5L316.5 39H310.5L308.5 57.5L309.5 88.5V97.5V106L315.5 91.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="neck_5"
							d="M257 41L250 24.5L251 41L254 47L255 55L256.5 71L258.5 83.5V96L276 97.5L271.5 88L269 78L265.5 66L263 51.5L257 41Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="neck_6"
							d="M250.5 18V0L258 10.5L268 22L275.5 32.5L279.5 41.5L281.5 56.5L285.5 74.5L288 86L290 96L297 109L286.5 102.5L280.5 95.5L274.5 82L271 69.5L269 61L266.5 50C265.167 47.1667 261.4 41.2 261 40C260.6 38.8 253.833 24.8333 250.5 18Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="neck_7"
							d="M293.5 91.5L292.5 39H298.5L300.5 57.5L299.5 88.5V97.5V106L293.5 91.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="traps">
						<path
							id="traps_2"
							d="M367.5 50L361.5 46L360 51.5L358 61.75L357 72L356 83V96L379.5 94L399.5 90L416 83L428 76L412 70.5L399.5 66.5L392.5 61.5L386 58L374.5 54L367.5 50Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="traps_3"
							d="M241.5 50L247.5 46L249 51.5L251 61.75L252 72L253 83V96L229.5 94L209.5 90L193 83L181 76L197 70.5L209.5 66.5L216.5 61.5L223 58L234.5 54L241.5 50Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="sideDelts">
						<path
							id="sideDelts_2"
							d="M521 226V202C520 195.5 519.54 188.485 520 182C525.5 104.5 470.558 79.5723 443.5 80.5C442.333 81.8334 439 85.1 435 87.5C504.6 93.1 510.333 153.5 504.5 183V191.5L506.5 203.5L521 226Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="sideDelts_3"
							d="M88 226V202C89 195.5 89.4602 188.485 89 182C83.5 104.5 138.442 79.5723 165.5 80.5C166.667 81.8334 170 85.1 174 87.5C104.4 93.1 98.6667 153.5 104.5 183V191.5L102.5 203.5L88 226Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="frontDelts">
						<path
							id="frontDelts_2"
							d="M422 91.5L433 92C498.5 99.5 505.333 153.833 499.5 183.5L501.5 198L493.5 189L483 178.5L470.5 169L459.5 157.5L452.25 139.5L440 128.5L420.5 114.5L399 104.5L390 102L382 98.5L386.5 97L403.5 95L412 92.5L422 91.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="frontDelts_3"
							d="M187 91.5L176 92C110.5 99.5 103.667 153.833 109.5 183.5L107.5 198L115.5 189L126 178.5L138.5 169L149.5 157.5L156.75 139.5L169 128.5L188.5 114.5L210 104.5L219 102L227 98.5L222.5 97L205.5 95L197 92.5L187 91.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="forearms">
						<g id="forearms_2">
							<path
								d="M559.5 296.5L556.5 289.5V304.25L555 318C534 384 568 432.833 594 461L599.5 467L609 476.5L607 449L603 434C601.5 427.333 598.5 412.9 598.5 408.5C590.9 367.3 576.667 333.333 570.5 321.5L560.5 301.5L559.5 296.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M541 369L537 349.5L520 343L515.5 347.5L541 369Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M550.5 408.5L540 376L512 350.5L503.5 360.5L509 372.5L537 424L570.5 461L595.5 501L599.5 499.5L577.5 456.5L565.5 434L550.5 408.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M514.5 421L496.5 370L500.5 364.5L532 424L560 467L585.5 504L582 507L557.5 472.5L514.5 421Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="forearms_3">
							<path
								d="M49.5 296.5L52.5 289.5V304.25L54 318C75 384 41 432.833 15 461L9.5 467L0 476.5L2 449L6 434C7.5 427.333 10.5 412.9 10.5 408.5C18.1 367.3 32.3333 333.333 38.5 321.5L48.5 301.5L49.5 296.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M68 369L72 349.5L89 343L93.5 347.5L68 369Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M58.5 408.5L69 376L97 350.5L105.5 360.5L100 372.5L72 424L38.5 461L13.5 501L9.5 499.5L31.5 456.5L43.5 434L58.5 408.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M94.5 421L112.5 370L108.5 364.5L77 424L49 467L23.5 504L27 507L51.5 472.5L94.5 421Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
					<g id="chest">
						<path
							id="chest_2"
							d="M346.5 101.5L370 100.5L382.5 104.5L397 109.5L421.5 122L447.5 144L450.5 160L448 176L440 191L432 228.5L419 242.5L397.5 248.5L385 252L357.5 246.5L330 234L312.5 216.5V166.5L322.5 125L333 107.5L346.5 101.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="chest_3"
							d="M262.5 101.5L239 100.5L226.5 104.5L212 109.5L187.5 122L161.5 144L158.5 160L161 176L169 191L177 228.5L190 242.5L211.5 248.5L224 252L251.5 246.5L279 234L296.5 216.5V166.5L286.5 125L276 107.5L262.5 101.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="lats">
						<path
							id="lats_2"
							d="M434.5 302.5L438 230.5L445.5 194L453.5 179L450.5 195.5V214.5L455 250.5L453.5 261L445.5 283.5L438 300L437 308L430 323L434.5 302.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="lats_3"
							d="M174.5 302.5L171 230.5L163.5 194L155.5 179L158.5 195.5V214.5L154 250.5L155.5 261L163.5 283.5L171 300L172 308L179 323L174.5 302.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="abs">
						<g id="abs_2">
							<path
								d="M310 244L312 238H324.5L338 242.5L356.5 251L366.5 255L371 263.5L376.5 279V290.5V307L373.5 314L363 308L353 302.5L344 297.5L332 292L316 286.5L310 282L308 273L310 244Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M373.5 353.5V321.5L365.5 316L356.5 311.5L345 305.5L338 301.5L329 297.5L321 295L312 294L310 303.5L308 338.5L314 344.5L332 346.5L348.5 347.5L363 352.5L373.5 353.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M365.5 358.5H373.5L375.5 359.5L373.5 395L371 410.5L363 406.5H345L325 403.5L312 395V386.5V355.5L316 349.5L328 351.5L352 353.5L365.5 358.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M367.5 421L369 415L361 410.5H343L323 407.5L310 399.5L308 589.5H321L327.5 579L329.5 571.5L338 551L352 510L354 492L356.5 473L367.5 442.5V438.5V421Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="abs_3">
							<path
								d="M299 244L297 238H284.5L271 242.5L252.5 251L242.5 255L238 263.5L232.5 279V290.5V307L235.5 314L246 308L256 302.5L265 297.5L277 292L293 286.5L299 282L301 273L299 244Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M235.5 353.5V321.5L243.5 316L252.5 311.5L264 305.5L271 301.5L280 297.5L288 295L297 294L299 303.5L301 338.5L295 344.5L277 346.5L260.5 347.5L246 352.5L235.5 353.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M243.5 358.5H235.5L233.5 359.5L235.5 395L238 410.5L246 406.5H264L284 403.5L297 395V386.5V355.5L293 349.5L281 351.5L257 353.5L243.5 358.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M241.5 421L240 415L248 410.5H266L286 407.5L299 399.5L301 589.5H288L281.5 579L279.5 571.5L271 551L257 510L255 492L252.5 473L241.5 442.5V438.5V421Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
					<g id="obliques">
						<g id="obliques_2">
							<path
								d="M381 263.5L388.5 259.5L406 269L417.5 273.5H431.5L413.5 290H391.5L383.5 284L381 263.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M385.5 299L391.5 294H413.5L425 308L417.5 317.5L413.5 318.5L400 323L391.5 330L385.5 331L383.5 328L385.5 299Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M426.5 331L419.5 321H415.5L403 325L393 333L385.5 337V369.5L388.5 377L409.5 362L422.5 347L426.5 331Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M419.5 373L422.5 351.5L417.5 358.5L405 369.5L388.5 382L383.5 389V407L393 412.5L400 409L415.5 401.5L422.5 392L419.5 373Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M425 410.5L422.5 396.5L415.5 405.5L403 411.5L391.5 416.5L376.5 427L374.5 439.5L369.5 457L364 476L366 494.5L381 487L403 476L415.5 469.5L425 457L422.5 449L426.5 430.5L425 410.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="obliques_3">
							<path
								d="M228 263.5L220.5 259.5L203 269L191.5 273.5H177.5L195.5 290H217.5L225.5 284L228 263.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M223.5 299L217.5 294H195.5L184 308L191.5 317.5L195.5 318.5L209 323L217.5 330L223.5 331L225.5 328L223.5 299Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M182.5 331L189.5 321H193.5L206 325L216 333L223.5 337V369.5L220.5 377L199.5 362L186.5 347L182.5 331Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M189.5 373L186.5 351.5L191.5 358.5L204 369.5L220.5 382L225.5 389V407L216 412.5L209 409L193.5 401.5L186.5 392L189.5 373Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M184 410.5L186.5 396.5L193.5 405.5L206 411.5L217.5 416.5L232.5 427L234.5 439.5L239.5 457L245 476L243 494.5L228 487L206 476L193.5 469.5L184 457L186.5 449L182.5 430.5L184 410.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
					<g id="quads">
						<g id="quads_2">
							<path
								d="M431 593.5L414.5 572.5L424.5 592.5L431 620.5L442 667L449 708V768L432 805L425.5 818.5L431 841L436.5 873L442 830L449 809L460 778.5L464.5 735V681L454.5 647L446 627L431 593.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M403.5 560L393 517.5L385.5 604L377 663.5V712L382 735L393 762L409.5 798L405.5 825.5L420.5 814.5L442 762V712L434.5 663.5L418.5 595.5L403.5 560Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M365.5 718L371 681.5L370 712L377 740.5L387.5 764L403.5 798L400 830L395.5 854L385.5 864L370 860L362.5 854L357.5 835.5V814.5L363.5 764L365.5 718Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="quads_3">
							<path
								d="M178 593.5L194.5 572.5L184.5 592.5L178 620.5L167 667L160 708V768L177 805L183.5 818.5L178 841L172.5 873L167 830L160 809L149 778.5L144.5 735V681L154.5 647L163 627L178 593.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M205.5 560L216 517.5L223.5 604L232 663.5V712L227 735L216 762L199.5 798L203.5 825.5L188.5 814.5L167 762V712L174.5 663.5L190.5 595.5L205.5 560Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M243.5 718L238 681.5L239 712L232 740.5L221.5 764L205.5 798L209 830L213.5 854L223.5 864L239 860L246.5 854L251.5 835.5V814.5L245.5 764L243.5 718Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
					<g id="calves">
						<path
							id="calves_2"
							d="M363.5 949.5L355.5 937L351.5 969.5L349 1011.5V1033L351.5 1042.5L359.5 1062L363.5 1067.5L382.5 1041.5L384.5 1004L380 984L373 963.5L363.5 949.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="calves_3"
							d="M245.5 949.5L253.5 937L257.5 969.5L260 1011.5V1033L257.5 1042.5L249.5 1062L245.5 1067.5L226.5 1041.5L224.5 1004L229 984L236 963.5L245.5 949.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="abductors">
						<path
							id="abductors_2"
							d="M212.5 504L210.5 489L206 482L189.5 473.5L183 464L176 482L174 498.5L173 530L168 550.5L165 572L161.5 592.5L156.5 611.5L154.5 632.5L165 607.5L173.25 590.75L184.5 576L198 558.5L205.75 539.25L210.5 520L212.5 504Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="abductors_3"
							d="M396.5 504L398.5 489L403 482L419.5 473.5L426 464L433 482L435 498.5L436 530L441 550.5L444 572L447.5 592.5L452.5 611.5L454.5 632.5L444 607.5L435.75 590.75L424.5 576L411 558.5L403.25 539.25L398.5 520L396.5 504Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
				</g>
				<defs>
					<clipPath id="clip0_1_111">
						<rect width="609" height="1216" fill="white" />
					</clipPath>
				</defs>
			</svg>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				ref={svgBackRef}
				style={{
					height: 300,
					width: 150,
				}}
				width="609"
				height="1244"
				viewBox="0 0 609 1244"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="Frame 3" clipPath="url(#clip0_2_113)">
					<rect width="609" height="1244" fill="var(--background)" />
					<g id="abductors">
						<path
							id="abductors_2"
							d="M166.5 730.5C161.3 700.5 174 655 177 624.5L183 590L204 630.5C204 632.333 187.5 647.6 187.5 680C180.5 756.5 180.5 823.5 177 842C177 827.2 170 761.5 166.5 730.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="abductors_3"
							d="M448.764 730.5C453.964 700.5 441.264 655 438.264 624.5L432.264 590L411.264 630.5C411.264 632.333 427.764 647.6 427.764 680C434.764 756.5 434.764 823.5 438.264 842C438.264 827.2 445.264 761.5 448.764 730.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="adductors">
						<path
							id="adductors_2"
							d="M362.135 673L365.135 653.5L362.135 650.5L343.135 646C337.969 645.167 326.635 643.5 322.635 643.5C317.435 676.3 327.802 763.5 333.635 803L343.135 839L340.635 815V772L349.135 727L353.135 702L356.635 684.5L362.135 673Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="adductors_3"
							d="M252.219 673L249.219 653.5L252.219 650.5L271.219 646C276.386 645.167 287.719 643.5 291.719 643.5C296.919 676.3 286.553 763.5 280.719 803L271.219 839L273.719 815V772L265.219 727L261.219 702L257.719 684.5L252.219 673Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="hamstrings">
						<g id="hamstrings_2">
							<path
								d="M201.5 648L212 635.5L224 645.5L240 650C205.5 670.5 221.5 758.5 221.5 775C224.5 816 197 881 191 889.5C183.4 898.7 179.5 912.667 178.5 918.5V885L182.5 870L186 840L187 768L190 715C191.667 705.5 193 685 193 679C195 669.8 198.333 652.833 201.5 648Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M247.5 670.5L245.5 653C216 663 226 754 227 775C227.8 791.8 221.667 821.667 218.5 834.5L221.5 854L232.5 870L240.25 882.75L246.5 896L250.5 909.5L259 926C259 911.5 260.4 879.1 262 873.5C264.5 864 268.333 846.5 267.5 840L270 812V780.5L269 767.5L264.5 742L260 719L254 688.5L247.5 670.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="hamstrings_3">
							<path
								d="M413.135 648L402.635 635.5L390.635 645.5L374.635 650C409.135 670.5 393.135 758.5 393.135 775C390.135 816 417.635 881 423.635 889.5C431.235 898.7 435.135 912.667 436.135 918.5V885L432.135 870L428.635 840L427.635 768L424.635 715C422.969 705.5 421.635 685 421.635 679C419.635 669.8 416.302 652.833 413.135 648Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M367.135 670.5L369.135 653C398.635 663 388.635 754 387.635 775C386.835 791.8 392.969 821.667 396.135 834.5L393.135 854L382.135 870L374.385 882.75L368.135 896L364.135 909.5L355.635 926C355.635 911.5 354.235 879.1 352.635 873.5C350.135 864 346.302 846.5 347.135 840L344.635 812V780.5L345.635 767.5L350.135 742L354.635 719L360.635 688.5L367.135 670.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
					<g id="traps">
						<path
							id="traps_2"
							d="M278 1C280.5 24.5 260.6 76.7 177 89.5C173.5 92.5 167.3 95 164.5 95C192.5 123.5 223.589 133.039 227 138C232.5 146 230.333 162.833 230.5 172.5L238.5 200.5L241.5 220.5L245.5 243C248 251 262.6 293.6 267 298C284.2 320.8 284.667 343.333 281.5 351.5L295.5 360.5L297 361.5H319.135L333.135 351.5C329.969 343.333 330.435 320.8 347.635 298C352.035 293.6 366.635 251 369.135 243L373.135 220.5L376.135 200.5L384.135 172.5C384.302 162.833 382.135 146 387.635 138C391.046 133.039 422.135 123.5 450.135 95C447.335 95 441.135 92.5 437.635 89.5C354.035 76.7 334.135 24.5 336.635 1H279"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="rearDelts">
						<path
							id="rearDelts_2"
							d="M97 210C90.2 125.6 121.5 111.5 160.5 96C184.5 122.8 211.5 136.167 222 139.5L213 143C198 145.5 183.9 142 175.5 143C152.3 140.6 134.833 160.667 129.5 169.5L124 175C120 179 108.2 192.4 97 210Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="rearDelts_3"
							d="M517.635 210C524.435 125.6 493.135 111.5 454.135 96C430.135 122.8 403.135 136.167 392.635 139.5L401.635 143C416.635 145.5 430.735 142 439.135 143C462.335 140.6 479.802 160.667 485.135 169.5L490.635 175C494.635 179 506.435 192.4 517.635 210Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="rhomboids">
						<path
							id="rhomboids_2"
							d="M225.5 155.5L223 144L214 147C208.5 148 191.537 148.558 187 148C154.5 144 139.471 163.167 132.305 174.5L138 178.5L146 183.5L158.5 188.5V207L164.5 221V242.5L177.5 246.5L205.5 250L242.5 246.5L237.5 217L234 197L225.5 172.5V155.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="rhomboids_3"
							d="M389.135 155.5L391.635 144L400.635 147C406.135 148 423.099 148.558 427.635 148C460.135 144 475.164 163.167 482.331 174.5L476.635 178.5L468.635 183.5L456.135 188.5V207L450.135 221V242.5L437.135 246.5L409.135 250L372.135 246.5L377.135 217L380.635 197L389.135 172.5V155.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="triceps">
						<g id="triceps_2">
							<path
								d="M63.5 302C66.7 270.4 87.8333 230.167 98 214L118 187.5L127 178L132 182L118 208L103 246.5L98 269L91 283L79.5 300L72.5 322L70.5 355.5L66 342.5L60.5 328.5V315.5C61 313.5 62.3 308 63.5 302Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M161 223L113.5 263.5L110.5 259L103 263.5L135 182L142.5 185.5L155 192V208L161 223Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M103 297L110.5 272L160.5 229V238.5L161 272L127 342.5L116 362.5L98 382L95.5 375.5V362.5L92.5 352.5L91 337L95.5 322L103 297Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="triceps_3">
							<path
								d="M551.135 302C547.935 270.4 526.802 230.167 516.635 214L496.635 187.5L487.635 178L482.635 182L496.635 208L511.635 246.5L516.635 269L523.635 283L535.135 300L542.135 322L544.135 355.5L548.635 342.5L554.135 328.5V315.5C553.635 313.5 552.335 308 551.135 302Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M453.635 223L501.135 263.5L504.135 259L511.635 263.5L479.635 182L472.135 185.5L459.635 192V208L453.635 223Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M511.635 297L504.135 272L454.135 229V238.5L453.635 272L487.635 342.5L498.635 362.5L516.635 382L519.135 375.5V362.5L522.135 352.5L523.635 337L519.135 322L511.635 297Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
					<g id="lats">
						<path
							id="lats_2"
							d="M301 506.5L282.5 505C264.5 492.833 228.1 468.2 226.5 467C230.1 459.4 229.333 452.833 228.5 450.5C202 411 195 380 190 343.5C181.5 327 176.5 310 176.5 307C169.3 294.2 167.5 280 166 274.5L165 246.5L175.75 250.5L186.5 252.5L207.5 255L241 252.5C247 268 259.8 299 263 303C280.6 319.8 278 343 274.5 352.5L295 365.5H321L340.135 352.5C336.635 343 334.035 319.8 351.635 303C354.835 299 367.635 268 373.635 252.5L407.135 255L428.135 252.5L438.885 250.5L449.635 246.5L448.635 274.5C447.135 280 445.335 294.2 438.135 307C438.135 310 433.135 327 424.635 343.5C419.635 380 412.635 411 386.135 450.5C385.302 452.833 384.535 459.4 388.135 467C386.535 468.2 350.135 492.833 332.135 505L313.635 506.5"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="glutes">
						<path
							id="glutes_2"
							d="M215 510L225 476.5C273.8 505.3 291.948 525.5 300 557.5C319.5 635 273.5 650 236 644C205.6 632.4 195.667 598.5 194.5 583L200 547.5L215 510Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="glutes_3"
							d="M398 508.5L389.5 478C340.7 506.8 322.687 525.5 314.635 557.5C295.135 635 341.135 650 378.635 644C409.035 632.4 418.969 598.5 420.135 583L414.635 547.5L398 508.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="calves">
						<path
							id="calves_2"
							d="M179.5 921.5L177 947.5C173.667 972.667 172.3 1030.3 193.5 1059.5C198.5 1072.5 220 1125 214.5 1163.5C214.5 1171.1 217.167 1216 218.5 1237.5L207.5 1223C209.167 1219.83 210 1209.1 200 1191.5C200 1188 187 1168 184.5 1117.5C182 1067 168 1043.5 179.5 921.5ZM205 874L223.5 903.5L224.5 915L229 991L230 1030C230 1039 221.9 1068.7 197.5 1055.5C187 1039.17 173 1006.5 186.5 909.5C188.5 902.5 200.5 888.5 205 874ZM234.5 883.5L231 891L228.5 903.5L234.5 1033C235.5 1044.67 241 1070.3 255 1079.5C255 1075.5 255 1071.83 255 1070.5C263 1063.17 275 1025 259 931C255.8 926.6 251.667 919.5 249.5 916L242 899L234.5 883.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="calves_3"
							d="M435.135 921.5L437.635 947.5C440.969 972.667 442.335 1030.3 421.135 1059.5C416.135 1072.5 394.635 1125 400.135 1163.5C400.135 1171.1 397.469 1216 396.135 1237.5L407.135 1223C405.469 1219.83 404.635 1209.1 414.635 1191.5C414.635 1188 427.635 1168 430.135 1117.5C432.635 1067 446.635 1043.5 435.135 921.5ZM409.635 874L391.135 903.5L390.135 915L385.635 991L384.635 1030C384.635 1039 392.735 1068.7 417.135 1055.5C427.635 1039.17 441.635 1006.5 428.135 909.5C426.135 902.5 414.135 888.5 409.635 874ZM380.135 883.5L383.635 891L386.135 903.5L380.135 1033C379.135 1044.67 373.635 1070.3 359.635 1079.5C359.635 1075.5 359.635 1071.83 359.635 1070.5C351.635 1063.17 339.635 1025 355.635 931C358.835 926.6 362.969 919.5 365.135 916L372.635 899L380.135 883.5Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="tendon">
						<path
							id="tendon_2"
							d="M219.5 1161C224.5 1120 208.5 1093.5 201 1061.5C220 1066.5 225.5 1054 232.5 1044.5C235 1062 245 1076.5 253 1082C248.5 1095.5 246 1138 243 1151.5C236.5 1166 236.5 1230.5 236.5 1239C232.1 1245.8 225.333 1241.83 222.5 1239L219.5 1173V1161Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
						<path
							id="tendon_3"
							d="M395.135 1161C390.135 1120 406.135 1093.5 413.635 1061.5C394.635 1066.5 389.135 1054 382.135 1044.5C379.635 1062 369.635 1076.5 361.635 1082C366.135 1095.5 368.635 1138 371.635 1151.5C378.135 1166 378.135 1230.5 378.135 1239C382.535 1245.8 389.302 1241.83 392.135 1239L395.135 1173V1161Z"
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeMiterlimit={strokeMiterlimit}
						/>
					</g>
					<g id="forearms">
						<g id="forearms_2">
							<path
								d="M78 463.5C59.2 481.5 45.8333 513.333 41.5 527V513L59 466L85 398.5L102 383.5C107.833 377 121.1 361.6 127.5 352C123.5 391 89 448.5 78 463.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M56 329.5V311L36.5 356.5L29.5 373.5C23.1667 404.333 9.90001 468.9 7.50002 480.5C-0.0999756 489.7 -0.666642 503 2.44379e-05 508.5L5.00002 519C12.5 521.667 29.3 526.4 36.5 524C32.5 514.8 38.1667 501.5 41.5 496L59 452.5L78 395L75 391L63 380L66.5 360.5L56 329.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
						<g id="forearms_3">
							<path
								d="M536.635 463.5C555.435 481.5 568.802 513.333 573.135 527V513L555.635 466L529.635 398.5L512.635 383.5C506.802 377 493.535 361.6 487.135 352C491.135 391 525.635 448.5 536.635 463.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
							<path
								d="M558.635 329.5V311L578.135 356.5L585.135 373.5C591.469 404.333 604.735 468.9 607.135 480.5C614.735 489.7 615.302 503 614.635 508.5L609.635 519C602.135 521.667 585.335 526.4 578.135 524C582.135 514.8 576.469 501.5 573.135 496L555.635 452.5L536.635 395L539.635 391L551.635 380L548.135 360.5L558.635 329.5Z"
								stroke={strokeColor}
								strokeWidth={strokeWidth}
								strokeLinecap={strokeLinecap}
								strokeLinejoin={strokeLinejoin}
								strokeMiterlimit={strokeMiterlimit}
							/>
						</g>
					</g>
				</g>
				<defs>
					<clipPath id="clip0_2_113">
						<rect width="609" height="1244" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</div>
	);
}
