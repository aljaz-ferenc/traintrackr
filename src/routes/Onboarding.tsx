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
import Age from '@/components/onboarding/Age'
import Height from '@/components/onboarding/Height'
import Weight from '@/components/onboarding/Weight'
import {useState, useEffect} from 'react'
import {motion} from 'motion/react'

const onboardingScreens = [
    <Welcome/>,
    <Gender/>,
    <Age/>,
    <Height/>,
    <Weight/>,
]

export default function Onboarding() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

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
                <CardContent className='flex justify-center items-center h-full w-full'>
                    <div className='w-full h-full'>
                        <motion.div
                            animate={{scaleX: (current) / (onboardingScreens.length - 1), transition: {duration: 1}}}
                            className='mx-auto h-[3px] bg-primary origin-left'/>
                        <Carousel setApi={setApi}>
                            <CarouselContent>
                                {onboardingScreens.map(screen => (<CarouselItem>{screen}</CarouselItem>))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </CardContent>
                <div className='w-full flex justify-between px-6'>
                    <Button onClick={handleScrollPrev}>Back</Button>
                    <Button onClick={handleScrollNext}>Next</Button>
                </div>
            </Card>
        </section>
    )
}