import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { LocalChallengeConfig } from "@/types/local/challenge";
import { useState } from "react";

type Props = {
    onConfigured: (config: LocalChallengeConfig) => void;
}

export default function CardConfigureLocalChallenge({ onConfigured }: Props) {
    const [numberOfPlayers, setNumberOfPlayers] = useState(4);
    const [challengesPerPlayer, setChallengesPerPlayer] = useState(2);
    const [mode,setMode] = useState<LocalChallengeConfig["mode"]>("normal")

    return <Card className="w-full max-w-md">
        <CardHeader>
            <CardTitle>Challenges</CardTitle>
            <CardDescription>Select number of players and number of challenges per player.</CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
                <Field>
                    <FieldLabel>Number of Players</FieldLabel>
                    <Slider value={[numberOfPlayers]} onValueChange={(e) => setNumberOfPlayers(e[0])} min={2} max={20} step={1} />
                    <p className="text-center">{numberOfPlayers}</p>
                    <FieldDescription>Select how many players will participate in the challenge.</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel>Challenges per Player</FieldLabel>
                    <Slider value={[challengesPerPlayer]} onValueChange={(e) => setChallengesPerPlayer(e[0])} min={1} max={5} step={1} />
                    <p className="text-center">{challengesPerPlayer}</p>
                    <FieldDescription>Select how many challenges each player will face.</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel>Play Mode</FieldLabel>
                    <Select value={mode} onValueChange={(value) => setMode(value as LocalChallengeConfig["mode"])}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {["normal","sport","spicy","party"].map((modeOption) => (
                                <SelectItem key={modeOption} value={modeOption}>
                                    {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldDescription>Select what type of challenges/questions you want.</FieldDescription>
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Button onClick={() =>{
                console.log(mode)

            onConfigured({
                numberOfPlayers,
                challengesPerPlayer,
                mode
            })}}>Start Challenges</Button>
        </CardFooter>
    </Card>

}
