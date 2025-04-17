import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel.tsx";
import Welcome from '@/components/onboarding/Welcome'
import Gender from '@/components/onboarding/Gender'
import Dob from '@/components/onboarding/Dob'
import Height from '@/components/onboarding/Height'
import Weight from '@/components/onboarding/Weight'
import {useState, useEffect, useMemo} from 'react'
import {motion} from 'motion/react'
import {cn} from "@/lib/utils.ts";
import {Gender as TGender} from "@/core/types.ts"
import {isValidDate} from "@/utils/utils.ts";
import LetsGo from "@/components/onboarding/LetsGo.tsx";
import OnboardingScreenWrapper from "@/components/onboarding/OnboardingScreenWrapper.tsx";
import {useNavigate} from "react-router";


export default function Onboarding() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [gender, setGender] = useState<TGender | null>(null)
    const [dob, setDob] = useState<string>('')
    const [height, setHeight] = useState<number | null>(null)
    const navigate = useNavigate()

    const disableContinue = useMemo(() => {
        return {
            0: false,
            1: !gender,
            2: isValidDate(dob),
            3: height
        }
    }, [gender, dob]);


    const onboardingScreens = useMemo(() => {
        return [
            <Welcome/>,
            <Gender setGender={setGender} gender={gender}/>,
            <Dob setDob={setDob}/>,
            <Height/>,
            <Weight/>,
            <LetsGo/>
        ]
    }, [gender])

    useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])


    const handleScrollPrev = () => {
        if (!api?.canScrollPrev()) return
        api.scrollPrev()
    }
    const handleScrollNext = () => {
        if (!api?.canScrollNext()) return
        api.scrollNext()
    }

    return (
        <section className='grid place-items-center min-h-screen overflow-hidden'>
            <Card className='w-full max-w-[80%] h-full max-h-[80%]'>
                <CardContent className='flex justify-center items-center h-full w-full overflow-hidden'>
                    <div className='w-full h-full relative flex-col flex justify-center items-center'>
                        <div>
                            <motion.div
                                initial={{scaleX: 0}}
                                animate={{
                                    scaleX: (current) / (onboardingScreens.length - 1),
                                    transition: {duration: 1}
                                }}
                                className='mx-auto h-[3px] bg-primary origin-left'/>
                        </div>
                        <Carousel setApi={setApi} key={0} opts={{axis: 'y'}}>
                            <CarouselContent >
                                {onboardingScreens.map(screen => (<CarouselItem>
                                    <OnboardingScreenWrapper>
                                    {screen}
                                    </OnboardingScreenWrapper>
                                </CarouselItem>))}
                            </CarouselContent>
                        </Carousel>
                        <div className='text-center mt-10 flex flex-col min-w-md'>
                            <Button disabled={disableContinue[current as 0 | 1 | 2 | 3]}
                                    className={cn(['mt-5 cursor-pointer'])}
                                    onClick={current === onboardingScreens.length - 1 ? () => navigate('/') : handleScrollNext}>{current === onboardingScreens.length - 1 ? 'Lets go!': 'Continue'}</Button>
                            {<button
                                className={cn(['mt-5 cursor-pointer', !api?.canScrollPrev() ? 'invisible' : 'visible'])}
                                onClick={handleScrollPrev}>Back</button>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}