import { Game } from "convex/types";
import { createContext, PropsWithChildren, useContext } from "react";

type GameSwitchGame = Game & { data: { state: string } }

const GameSwitcherContext = createContext<GameSwitchGame | null>(null)

export default function GameSceneSwitcher({ children, game }: PropsWithChildren<{ game: GameSwitchGame }>) {
    return <GameSwitcherContext.Provider value={game}>{children}</GameSwitcherContext.Provider>
}

export function GameStateSwitch({ children, state }: PropsWithChildren<{ state: Game["state"] }>) {
    const game = useContext(GameSwitcherContext)

    if (game?.state !== state) {
        return null
    }

    return children
}

export function GameDataStateSwitch({ children, state }: PropsWithChildren<{ state: string | string[] }>) {
    const game = useContext(GameSwitcherContext)

    if (!game) {
        return null
    }

    if (typeof state === 'object' && Array.isArray(state)) {
        if (!state.includes(game?.data.state)) {
            return null
        }
        return children
    }

    if (game?.data.state !== state) {
        return null
    }

    return children
}
