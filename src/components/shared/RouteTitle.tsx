type RouteTitleProps = {
    title: string
}

export default function RouteTitle({title}: RouteTitleProps){
    return (
        <h2 className='text-3xl font-bold mb-5 underline'>{title}</h2>
    )
}