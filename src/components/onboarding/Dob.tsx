import type React from "react";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type AgeProps = {
	setDob: React.Dispatch<React.SetStateAction<string>>;
};

export default function Dob({ setDob }: AgeProps) {
	return (
		<>
			<h2 className="text-3xl font-bold text-center mb-4">
				When's your birthday?
			</h2>

			<InputOTP
				maxLength={8}
				pattern={REGEXP_ONLY_DIGITS}
				onChange={(val) => setDob(val)}
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
					<InputOTPSlot index={6} />
					<InputOTPSlot index={7} />
				</InputOTPGroup>
			</InputOTP>
			<p className="text-center max-w-[80%] mx-auto max-w-sm leading-8">
				We’ll need it to calculate a few things and personalize your experience.
			</p>
		</>
	);
}
