import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalenSongNames } from "@/lib/local/salen";
import { SalenSong } from "@/types/local/salen";
import { useState } from "react";

type Props = {
    onConfigured: (name: SalenSong["name"]) => void;
}

export default function CardSelectSong({ onConfigured }: Props) {
    const [song,setSong] = useState<SalenSong["name"]>("All I want for Christmas")

    return <Card className="w-full max-w-md">
        <CardHeader>
            <CardTitle>Song</CardTitle>
            <CardDescription>Welcome To Sälen</CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
               <Field>
                    <FieldLabel>Select Song</FieldLabel>
                    <Select value={song} onValueChange={(value) => setSong(value as SalenSong["name"])}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {SalenSongNames().map((song) => (
                                <SelectItem key={song} value={song}>
                                    {song}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldDescription>Select the song with challenges</FieldDescription>
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Button onClick={() => onConfigured(song)}>
                Start Challenges
            </Button>
        </CardFooter>
    </Card>

}
