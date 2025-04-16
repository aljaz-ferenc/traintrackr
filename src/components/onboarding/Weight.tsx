import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";

export default function Weight() {
    return (
        <>
            <h2 className='text-3xl font-bold text-center mb-4'>What's your weight?</h2>
            <Carousel className='max-w-md mx-auto' key={1}>
                <CarouselContent>
                    <CarouselItem className='text-center '>1</CarouselItem>
                    <CarouselItem className='text-center '>2</CarouselItem>
                    <CarouselItem className='text-center '>3</CarouselItem>
                    <CarouselItem className='text-center '>4</CarouselItem>
                    <CarouselItem className='text-center '>5</CarouselItem>
                </CarouselContent>
            </Carousel>
            <p className='text-center max-w-[80%] mx-auto max-w-sm leading-8'>This helps us fine-tune your experience.
                No worries — your info stays private and safe with us.</p>
        </>
    )
}