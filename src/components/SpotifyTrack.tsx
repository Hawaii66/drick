type Props = {
    trackId: string
}

export default function SpotifyTrack({ trackId }: Props) {
    return <iframe
        style={{ borderRadius: "8px" }}
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
    />

}
