import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

type Props = {
  onPrev: () => void;
};

export default function Quit({ onPrev }: Props) {
  return (
    <div className="flex justify-center items-center bg-[url(/bg/lift.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Game Finished</CardTitle>
          <CardDescription>Thanks for playing lift</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-row justify-evenly items-center">
          <Button onClick={onPrev}>Previous</Button>
          <Link to="/">
            <Button>Home (Quit game)</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
