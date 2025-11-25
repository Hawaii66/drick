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
            <CardTitle>Allsång i Sälen🍺</CardTitle>
            <CardDescription>Välkommen till Sälen, här går det undan.</CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
               <Field>
                    <FieldLabel>Välj låt</FieldLabel>
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
                    <FieldDescription>Välj allsångs låt</FieldDescription>
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Button onClick={() => onConfigured(song)}>
                Börja Sjunga!
            </Button>
        </CardFooter>
    </Card>

}
