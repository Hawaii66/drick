import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";

type Props = {
  challenges: string[];
  onDone: () => void;
};

const colors: { bg: string; text: string }[] = [
  { bg: "#FFD1C1", text: "#8B1E1E" },
  { bg: "#C1FFD7", text: "#00695C" },
  { bg: "#C1E1FF", text: "#1A237E" },
  { bg: "#E6CCFF", text: "#4A148C" },
  { bg: "#FFF7AE", text: "#424242" },
  { bg: "#FFCCE5", text: "#880E4F" },
  { bg: "#D9FFCA", text: "#2E7D32" },
  { bg: "#B3F0FF", text: "#00334D" },
  { bg: "#FFB5A7", text: "#6A1B1A" },
  { bg: "#EBD8FF", text: "#5E3370" },
  { bg: "#D0F0FD", text: "#235D88" },
  { bg: "#FFF9B1", text: "#666600" },
  { bg: "#FFDAB3", text: "#B34700" },
  { bg: "#D6FFF5", text: "#00796B" },
  { bg: "#FFBCD9", text: "#AD1457" },
  { bg: "#C5FAD5", text: "#1B5E20" },
  { bg: "#FFE0B5", text: "#5D4037" },
  { bg: "#FFE6CC", text: "#FF6F00" },
  { bg: "#FDDDE6", text: "#7B1F3A" },
  { bg: "#EED3F3", text: "#4A0072" },
];

export default function DrinkWheel({
  challenges: startChallenges,
  onDone,
}: Props) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [challenges, setChallenges] = useState(startChallenges);
  const [showResult, setShowResult] = useState(false);

  const handleSpinClick = (count: number) => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * count);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-[url(/bg/drinkwheel.svg)] px-8 w-screen h-screen">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Drink Wheel</CardTitle>
            <CardDescription>
              Spin the wheel for player{" "}
              {startChallenges.length - challenges.length + 1}{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center m-0 p-0">
            <Wheel
              data={challenges.map((i) => ({
                option: i.length > 12 ? i.slice(0, 12) + "..." : i,
              }))}
              backgroundColors={challenges.map(
                (_, i) => colors[i % colors.length].bg,
              )}
              textColors={challenges.map(
                (_, i) => colors[i % colors.length].text,
              )}
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              onStopSpinning={() => {
                setShowResult(true);
                setMustSpin(false);
              }}
            />
          </CardContent>
          {challenges.length === startChallenges.length && (
            <CardFooter className="flex justify-center items-center">
              <Button onClick={() => handleSpinClick(challenges.length)}>
                Spin
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>{" "}
      <Dialog open={showResult}>
        <DialogContent hideClose>
          <DialogHeader>
            <DialogTitle>
              Challenge for player{" "}
              {startChallenges.length - challenges.length + 1}
            </DialogTitle>
          </DialogHeader>
          <p>{challenges[prizeNumber]}</p>
          <DialogFooter>
            <Button
              onClick={() => {
                if (challenges.length === 1) {
                  onDone();
                  return;
                }

                const winner = challenges[prizeNumber];
                const newChallenges = challenges.filter((i) => i !== winner);
                setChallenges(newChallenges);
                setShowResult(false);
                setTimeout(() => {
                  handleSpinClick(newChallenges.length);
                }, 500);
              }}
            >
              {challenges.length === 1 ? "Done" : "Spin Again"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
