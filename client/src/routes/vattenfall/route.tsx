import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VattenFallCard from "@/components/VattenFallCard";
import { VattenFallSongs } from "@/lib/vattenfall";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vattenfall")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Vattenfall</CardTitle>
          <CardDescription>
            Ett klassiskt drickspel där alla sitter i en cirkel och dricker i
            turordning när ett specifikt ord spelas i en låt - som ett
            vattenfall. En perfekt blandning av skratt, musik och kaos.
          </CardDescription>
          <CardDescription>
            <b>OBS:</b> Klicka på bilden inte på "spela" knappen för att lyssna
            på låtarna.
          </CardDescription>
        </CardHeader>
      </Card>
      {VattenFallSongs.sort(() => Math.random() - 0.5).map((song) => (
        <VattenFallCard key={song.trackId} song={song} />
      ))}
    </div>
  );
}
