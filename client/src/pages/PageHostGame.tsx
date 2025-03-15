import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PageHostGame() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [roundsStr, setRoundsStr] = useState("20");
  const rounds = parseInt(roundsStr);

  return (
    <div className="flex justify-center items-center bg-[url(/bg.svg)] w-screen h-screen">
      <Card className="mx-8">
        <CardContent className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-2 w-full">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <Label className="w-full">Game PIN</Label>
            <InputOTP onChange={(e) => setPin(e)} maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Number of rounds</Label>
            <Input
              type="number"
              inputMode="numeric"
              value={roundsStr}
              onChange={(e) => setRoundsStr(e.target.value)}
            />
            <p className="px-2 text-sm">
              Recomended to select at least 5 rounds per person
            </p>
          </div>
          <Button
            disabled={
              name.trim().length < 3 ||
              pin.length !== 6 ||
              isNaN(rounds) ||
              rounds < 3 ||
              rounds > 100
            }
            className="bg-purple-600 px-8 py-2 text-lg"
          >
            Join Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
