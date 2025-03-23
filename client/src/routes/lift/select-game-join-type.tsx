import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/lift/select-game-join-type")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-[url(/bg/lift.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Join Game</CardTitle>
          <CardDescription>
            Select if you want to create a new game or join a game created by
            someone else
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <Link to="/lift/host-game">
            <Button>Create Game</Button>
          </Link>
          <Link to="/lift/join-game">
            <Button>Join Game</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
