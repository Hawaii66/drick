import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

const GameSelectSearchContext = createContext("")

export function useGameSelectKeyword() {
    return useContext(GameSelectSearchContext)
}

export function IsGameSelected(query: string, keywords: string[]) {
    if (query === "") return true;
    query = query.toLowerCase();
    for (const keyword of keywords) {
        if (keyword.toLowerCase().includes(query)) {
            console.log("Matched keyword:", keyword, query, keywords);
            return true;
        }
    }
    return false;
}

export default function GameSelectSearch({ children }: PropsWithChildren) {
    const [query, setQuery] = useState("")
    console.log(query)

    return <GameSelectSearchContext.Provider value={query}>
        <Card className="m-4">
            <CardContent>
                <Input placeholder="Sök..." value={query} onChange={e => setQuery(e.target.value)} />
            </CardContent>
        </Card>
        {children}
    </GameSelectSearchContext.Provider>
}
