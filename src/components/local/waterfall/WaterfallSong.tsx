import type { WaterfallSong } from "@/types/local/waterfall";

type Props = {
    song: WaterfallSong;
};

export default function WaterfallSong({ song }: Props) {
    return (
               <iframe
                    style={{ borderRadius: "8px" }}
                    src={`https://open.spotify.com/embed/track/${song.trackId}?utm_source=generator`}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
    );
}
