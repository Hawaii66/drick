import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PeklekTypes } from "@/types/local/peklek";
import { useState } from "react";

type Props = {
    onConfigured: (name: typeof PeklekTypes[number]) => void;
}

export default function CardSelectPeklek({ onConfigured }: Props) {
    const [mode,setMode] = useState<typeof PeklekTypes[number]>("normal")

    return <Card className="w-full max-w-md">
        <CardHeader>
            <CardTitle>Pekleken</CardTitle>
            <CardDescription>Peka på den som är mest trolig att.</CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
               <Field>
                    <FieldLabel>Välj läge</FieldLabel>
                    <Select value={mode} onValueChange={(value) => setMode(value as typeof PeklekTypes[number])}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {["normal","spicy"].map((mode) => (
                                <SelectItem key={mode} value={mode}>
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldDescription>Välj vilken typ av frågor som ska ställas</FieldDescription>
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Button onClick={() => onConfigured(mode)}>
                Start Utmaningar
            </Button>
        </CardFooter>
    </Card>

}
