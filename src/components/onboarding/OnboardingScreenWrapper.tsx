import {PropsWithChildren} from "react";

export default function OnboardingScreenWrapper({children}: PropsWithChildren){
    return <div className='h-full w-full flex flex-col items-center justify-between'>{children}</div>
}