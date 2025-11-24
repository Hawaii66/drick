import { createContext, PropsWithChildren, useContext, useState } from "react";

type GameContextType = {
    player: string | null
    setPlayer: (player: string) => void

}

const GameContext = createContext<GameContextType>({
    player: null,
    setPlayer: () => { }
})

export function useGameContext() {
    return useContext(GameContext)
}

export function GameContextProvider({ children }: PropsWithChildren) {
    const [player, setPlayer] = useState<GameContextType["player"]>(null);

    return <GameContext.Provider value={{ player, setPlayer }}>
        {children}
    </GameContext.Provider>
}
