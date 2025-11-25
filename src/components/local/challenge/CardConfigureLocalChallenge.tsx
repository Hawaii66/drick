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
            <CardTitle>Utmaningar</CardTitle>
            <CardDescription>Välj antal spelare, frågor och typ av frågor.</CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
                <Field>
                    <FieldLabel>Antal spelare</FieldLabel>
                    <Slider value={[numberOfPlayers]} onValueChange={(e) => setNumberOfPlayers(e[0])} min={2} max={20} step={1} />
                    <p className="text-center">{numberOfPlayers}</p>
                    <FieldDescription>Välj hur många spelare som ska vara med i spelet.</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel>Utmaningar per person</FieldLabel>
                    <Slider value={[challengesPerPlayer]} onValueChange={(e) => setChallengesPerPlayer(e[0])} min={1} max={5} step={1} />
                    <p className="text-center">{challengesPerPlayer}</p>
                    <FieldDescription>Välj antalet utmaningar varje person ska göra</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel>Typ av frågor</FieldLabel>
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
                    <FieldDescription>Välj vilken typ av frågor/utmaningar som ska visas</FieldDescription>
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Button onClick={() =>
            onConfigured({
                numberOfPlayers,
                challengesPerPlayer,
                mode
            })}>Starta Utmaningar</Button>
        </CardFooter>
    </Card>

}
