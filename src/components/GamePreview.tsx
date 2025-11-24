import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

type Props = {
    name: string
    description: string
    image: string
    onJoinGame: () => void
    onCreateGame: () => void
}

export default function GamePreview({ name, description, image, onJoinGame, onCreateGame }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <img src={image} alt={name} />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-start">
                <Button onClick={onJoinGame}>Join Game</Button>
                <Button variant="neutral" onClick={onCreateGame}>Create Game</Button>
            </CardFooter>
        </Card>
    )
}
