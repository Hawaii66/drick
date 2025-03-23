import { VattenFallSong } from "@/lib/vattenfall";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  song: VattenFallSong;
};

const formatLevel = (level: VattenFallSong["level"]) => {
  switch (level) {
    case "easy":
      return "🟢 🧃: Easy";
    case "medium":
      return "🟡 🍺: Medium";
    case "hard":
      return "🔴 💀: Hard";
    default:
      throw new Error("Invalid level");
  }
};

export default function VattenFallCard({ song }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{song.name}</CardTitle>
        <CardDescription>
          Byt person när låten sjunger "{song.trigger}"
        </CardDescription>
        <CardDescription>Level: {formatLevel(song.level)}</CardDescription>
      </CardHeader>
      <CardContent
        onClick={(a) => {
          console.log("what");
          a.stopPropagation();
          a.preventDefault();
        }}
      >
        <iframe
          style={{ borderRadius: "8px" }}
          src={`https://open.spotify.com/embed/track/${song.trackId}?utm_source=generator`}
          width="100%"
          height="100%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
}
