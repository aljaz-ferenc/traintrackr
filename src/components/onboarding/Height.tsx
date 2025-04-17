import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";

export default function Height(){
    return (
        <>
            <h2 className='text-3xl font-bold text-center mb-4'>How tall are you?</h2>
            <Carousel className='max-w-md mx-auto' key={1}>
                <CarouselContent >
                    <CarouselItem className='text-center '>1</CarouselItem>
                    <CarouselItem className='text-center '>2</CarouselItem>
                    <CarouselItem className='text-center '>3</CarouselItem>
                    <CarouselItem className='text-center '>4</CarouselItem>
                    <CarouselItem className='text-center '>5</CarouselItem>
                </CarouselContent>
            </Carousel>
            <p className='text-center max-w-[80%] mx-auto max-w-sm leading-8'>A little detail that helps us customize things just for you. (No judgment, all heights are awesome.)</p>
        </>
    )
}