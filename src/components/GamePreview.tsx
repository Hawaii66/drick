import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

type Props = {
    name: string
    description: string
    image: string
}

type LiveProps = Props & {
    onJoinGame: () => void
    onCreateGame: () => void
}

type LocalProps = Props & {
    onStartGame: () => void
}

export function LiveGamePreview({ name, description, image, onJoinGame, onCreateGame }: LiveProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <img className="w-full aspect-square rounded-base border-2 border-border shadow-shadow" src={image} alt={name} />
            </CardContent>
            <CardFooter className="justify-between">
                <Button variant="neutral" onClick={onCreateGame}>Create Game</Button>
                <Button onClick={onJoinGame}>Join Game</Button>
            </CardFooter>
        </Card>
    )
}

export function LocalGamePreview({image,description,name,onStartGame}:LocalProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <img className="w-full aspect-square rounded-base border-2 border-border shadow-shadow" src={image} alt={name} />
            </CardContent>
            <CardFooter className="justify-end">
                <Button onClick={onStartGame}>Start Game</Button>
            </CardFooter>
        </Card>
    )
}
