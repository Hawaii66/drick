import Pending from "@/components/Pending"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGameContext } from "@/lib/gameContext"
import { useConvexMutation } from "@convex-dev/react-query"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { useMutation } from "@tanstack/react-query"
import { api } from "convex/_generated/api"
import { Id } from "convex/_generated/dataModel"
import { WhoIsGame, WhoIsGameSchema } from "convex/types"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

type Props = {
    game: WhoIsGame
}

export default function CardEnterPerson({game}:Props){
    const { register, formState, handleSubmit, control } = useForm<{person:string,player:string}>({
        defaultValues:{
            person:"",
            player:"|none|"
        },
        resolver:standardSchemaResolver(z.object({
            person:WhoIsGameSchema.shape.data.shape.persons.keyType,
            player:WhoIsGameSchema.shape.players.element
        }))
    })

    const {mutate:onEnterPersonMutation,isPending} = useMutation({
        mutationFn:useConvexMutation(api.live.whoIs.onEnterPerson)
    })

    const player = useGameContext().player
    if(!player){
        throw new Error("Missing player")
    }

    return <Card>
        <CardHeader>
            <CardTitle>Blind Etikett</CardTitle>
            <CardDescription>Skriv något/någon som en annan person ska gissa</CardDescription>
            <CardDescription>Om du väljer en spelare kommer den att få ditt val</CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
                <Field>
                    <Label>Etikett</Label>
                    <Input {...register("person")} />
                    <FieldDescription>Skriv vad någon anna ska gissa.</FieldDescription>
                    {formState.errors.person&&<FieldError>{formState.errors.person.message}</FieldError>}
                </Field>
                <Field>
                    <Label>Spelare</Label>
                <Controller control={control} name="player" render={({ field: { onChange, value } }) =>
                    <Select value={value} onValueChange={onChange}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                                <SelectItem value="|none|" >Ingen</SelectItem>
                                {game.players.filter(i=>i!==player).map((p) => (
                                    <SelectItem key={p} value={p}>
                                        {p}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>} />
                {formState.errors.player && <FieldError>{formState.errors.player.message}</FieldError>}
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Pending isPending={isPending}>
            <Button onClick={handleSubmit(({person,player:preferedPlayer})=>onEnterPersonMutation({
                    person,
                    gameId:game._id as Id<"games">,
                    player,
                    preferedPlayer
                }))}>
                    Skicka Etikett
            </Button>
</Pending>
        </CardFooter>
    </Card>
}
