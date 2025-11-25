import { IsGameSelected, useGameSelectKeyword } from "./GameSelectSearch"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

type Props = {
    name: string
    description: string
    image: string
    keywords:string[]
}

type LiveProps = Props & {
    onJoinGame: () => void
    onCreateGame: () => void
}

type LocalProps = Props & {
    onStartGame: () => void
}

export function LiveGamePreview({ name, description, image, onJoinGame, onCreateGame, keywords }: LiveProps) {
    const query = useGameSelectKeyword()

    if(IsGameSelected(query, [name,description,...keywords]) === false){
        return null
    }

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
                <Button variant="neutral" onClick={onCreateGame}>Skapa Spel</Button>
                <Button onClick={onJoinGame}>Gå med i Spel</Button>
            </CardFooter>
        </Card>
    )
}

export function LocalGamePreview({image,description,name,onStartGame,keywords}:LocalProps) {
    const query = useGameSelectKeyword()

    if(IsGameSelected(query, [name,description,...keywords]) === false){
        return null
    }

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
                <Button onClick={onStartGame}>Starta Spelet</Button>
            </CardFooter>
        </Card>
    )
}
