import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WaterfallSongs } from "@/lib/local/waterfall";
import WaterfallSong from "./WaterfallSong";

export default function CardWaterfall() {

    return <Card>
        <CardHeader>
            <CardTitle>Waterfall</CardTitle>
            <CardDescription>
                The ultimate drinking chain reaction. Drink after the person before you when the song hits a special word. Keep the cascade flowing!"
            </CardDescription>
            <CardDescription>Select the song to use</CardDescription>
        </CardHeader>
            <CardContent className="w-full flex flex-col items-center">
                {WaterfallSongs.map(song=><WaterfallSong song={song} />)}
            </CardContent>
    </Card>
}
