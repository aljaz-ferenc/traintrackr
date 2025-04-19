import { Mars, Venus } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils.ts";
import type { Gender as TGender } from "@/core/types.ts";

type GenderProps = {
	setGender: React.Dispatch<React.SetStateAction<TGender | null>>;
	gender: TGender | null;
};

export default function Gender({ setGender, gender }: GenderProps) {
	return (
		<>
			<h2 className="text-3xl font-bold text-center mb-4">
				What's your gender?
			</h2>
			<div className="flex gap-[30%] mx-auto justify-center my-5">
				<div>
					<button
						type="button"
						onClick={() => setGender("male")}
						className={cn([
							"border hover:bg-muted p-5 rounded-xl cursor-pointer",
							gender === "male" && "bg-muted",
						])}
					>
						<Mars size={100} />
					</button>
					<p className="font-bold text-xl text-center mt-2">Male</p>
				</div>
				<div>
					<button
						type="button"
						onClick={() => setGender("female")}
						className={cn([
							"border hover:bg-muted p-5 rounded-xl cursor-pointer",
							gender === "female" && "bg-muted",
						])}
					>
						<Venus size={100} />
					</button>
					<p className="font-bold text-xl text-center mt-2">Female</p>
				</div>
			</div>
			<p className="text-center max-w-[80%] mx-auto max-w-sm leading-8">
				This helps us fine-tune your experience. No worries — your info stays
				private and safe with us.
			</p>
		</>
	);
}
