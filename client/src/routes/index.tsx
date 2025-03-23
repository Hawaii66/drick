import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="shadow-md shadow-purple-800">
        <CardHeader>
          <CardTitle>Prompt Party</CardTitle>
          <CardDescription>
            A fast-paced social game full of fun prompts, silly challenges, and
            unexpected truths. Just grab some friends and let the chaos begin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img className="rounded-2xl" src="/images/promptparty.png" />
        </CardContent>
        <CardFooter className="flex flex-row justify-center items-center">
          <Link to="/promptparty/select-game-join-type" className="w-1/2">
            <Button className="bg-green-300 shadow-green-800 shadow-md w-full font-semibold text-neutral-700 text-lg tracking-wider active:scale-90 transition-all">
              Play
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="shadow-blue-800 shadow-md">
        <CardHeader>
          <CardTitle>Vattenfall</CardTitle>
          <CardDescription>
            Ett klassiskt drickspel där alla sitter i en cirkel och dricker i
            turordning när ett specifikt ord spelas i en låt - som ett
            vattenfall. En perfekt blandning av skratt, musik och kaos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="rounded-2xl"
            src="/images/vattenfall.png"
            alt="Vattenfall drickspel"
          />
        </CardContent>
        <CardFooter className="flex flex-row justify-center items-center">
          <Link to="/vattenfall" className="w-1/2">
            <Button className="bg-blue-300 shadow-blue-800 shadow-md w-full font-semibold text-neutral-700 text-lg tracking-wider active:scale-90 transition-all">
              Spela
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
