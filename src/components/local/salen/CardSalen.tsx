import CardSelectSong from "./CardSelectSong";
import { useRouter } from "@tanstack/react-router";
import { SalenSongNameToSong } from "@/lib/local/salen";

export default function CardSalen() {
    const router = useRouter()

    return <CardSelectSong onConfigured={(name)=>router.navigate({
        to:"/local/salen/$id",
        params:{
            id:SalenSongNameToSong(name).id
        }
    })} />
}
