import type {PropsWithChildren} from "react";

export default function OnboardingScreenWrapper({children}: PropsWithChildren){
    return <div className='h-full w-screen flex flex-col items-center justify-between relative'>{children}</div>
}
