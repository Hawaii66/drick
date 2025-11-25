import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

type Props = {
    challenges: string[]
}

const PAGE_SIZE = 5

export default function CardPeklek({ challenges }: Props) {
    const [page, setPage] = useState(0)

    return <Card>
        <CardHeader>
            <CardTitle>Who Is?</CardTitle>
            <CardDescription>Who is most likely to ...</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
            {challenges.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((challenge, index) => (
                <p key={index}>
                    {challenge}
                </p>
            ))}
        </CardContent>
        <CardFooter className="justify-between">
            <Button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                Previous
            </Button>
            <Button disabled={(page + 1) * PAGE_SIZE >= challenges.length} onClick={() => setPage((p) => p + 1)}>
                Next
            </Button>
        </CardFooter>
    </Card>

}
