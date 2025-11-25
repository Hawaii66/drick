import { useGameContext } from "@/lib/gameContext"
import { Game } from "convex/types"
import { PropsWithChildren } from "react"

type Props = {
    game: Game
}

export default function EnsureGameOwner({ game, children }: PropsWithChildren<Props>) {
    const { player } = useGameContext()

    if (!player) {
        return null
    }

    if (player !== game.owner) {
        return null
    }

    return children
}
