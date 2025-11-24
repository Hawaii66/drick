import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SalenSong } from "@/types/local/salen"
import SpotifyTrack from "@/components/SpotifyTrack"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

type Props = {
    song: SalenSong
}

export default function CardSong({ song }: Props) {
    const [values,setValues] = useState(song.song.map((_,i)=>i.toString()));

    return <Card>
        <CardHeader>
            <CardTitle>{song.name}</CardTitle>
        </CardHeader>
        <CardContent>
            <div>
                <p>Press the cover to play the song:</p>
                <SpotifyTrack trackId={song.trackId} />
            </div>
            <Accordion onValueChange={setValues} value={values} type="multiple" className="gap-2 flex flex-col">
                {song.song.map((section,idx)=><AccordionItem key={idx.toString()} value={idx.toString()}>
                    <AccordionTrigger>
                        {section.condition}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        {section.text.split('\n').map((line,lineIdx)=><p className="text-[1.2em]" key={lineIdx.toString()}>{line}</p>)}
                    </AccordionContent>
                </AccordionItem>)}
            </Accordion>
        </CardContent>
    </Card>
}

