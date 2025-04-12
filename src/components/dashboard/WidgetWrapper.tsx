import {PropsWithChildren} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

type WidgetWrapperProps = {
    title: string
    className?: string
    description?: string
}

export default function WidgetWrapper({children, title, className = '', description =''}: PropsWithChildren<WidgetWrapperProps>) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}