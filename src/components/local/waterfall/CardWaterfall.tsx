import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WaterfallSongs } from "@/lib/local/waterfall";
import WaterfallSong from "./WaterfallSong";

export default function CardWaterfall() {

    return <Card>
        <CardHeader>
            <CardTitle>Vattenfall</CardTitle>
            <CardDescription>
                De ultimata drick-kedjereaktionen. Drick efter personen före dig när låten träffar ett speciellt ord. Håll kaskaden flödande!
            </CardDescription>
            <CardDescription>Välj låt att använda</CardDescription>
        </CardHeader>
            <CardContent className="w-full flex flex-col items-center">
                {WaterfallSongs.map(song=><WaterfallSong song={song} />)}
            </CardContent>
    </Card>
}
