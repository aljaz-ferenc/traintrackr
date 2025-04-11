import useUpdateStats from "@/hooks/api/useUpdateStats.ts";
import { useState } from "react";

export default function Stats() {
	const { mutateAsync: updateStats } = useUpdateStats();
	const [weight, setWeight] = useState("");

	return (
		<section>
			<div>Stats</div>
			<input type="text" onChange={(e) => setWeight(e.target.value)} />
			<button type={"button"} onClick={() => updateStats({ weight })}>
				Send!
			</button>
		</section>
	);
}
