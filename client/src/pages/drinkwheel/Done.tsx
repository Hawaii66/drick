import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

type Props = {
  replay: () => void;
};

export default function Done({ replay }: Props) {
  return (
    <div className="flex justify-center items-center bg-[url(/bg/drinkwheel.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Drink Wheel</CardTitle>
          <CardDescription>Thanks for playing!</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center m-0 p-0"></CardContent>
        <CardFooter className="flex flex-row justify-center items-center gap-4">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Button onClick={replay}>Replay</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
