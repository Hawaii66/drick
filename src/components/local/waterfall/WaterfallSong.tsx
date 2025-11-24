import SpotifyTrack from "@/components/SpotifyTrack";
import type { WaterfallSong } from "@/types/local/waterfall";

type Props = {
    song: WaterfallSong;
};

export default function WaterfallSong({ song }: Props) {
    return <SpotifyTrack trackId={song.trackId} />
}
