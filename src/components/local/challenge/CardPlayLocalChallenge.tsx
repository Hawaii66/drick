import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WheelLocalChallenge from "./WheelLocalChallenge";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GameCompleted from "@/components/GameCompleted";
import CenterScreen from "@/components/CenterScreen";

type Props = {
    challenges: string[]
}

export default function CardPlayLocalChallenge({ challenges }: Props) {
    const [challengesInPlay, setChallengesInPlay] = useState(challenges);
    const [winningChallenge,setWinningChallenge] = useState<string | null>(null);

    const onNextChallenge = () => {
        setChallengesInPlay((prev) => prev.filter((c) => c !== winningChallenge))
        setWinningChallenge(null);
    }

    if(challengesInPlay.length===0){
        return <CenterScreen> <GameCompleted /></CenterScreen>
    }

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle>Spin the wheel</CardTitle>
                <CardDescription>Spin the wheel to get the next challenge!</CardDescription>
            </CardHeader>
            <CardContent>
                <WheelLocalChallenge challenges={challengesInPlay} onChalengeSelected={(challenge) => {
                    setWinningChallenge(challenge);
                }} />
            </CardContent>
        </Card>
        <Dialog open={winningChallenge !== null} onOpenChange={onNextChallenge}>
                <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Challenge Selected!</DialogTitle>
                        </DialogHeader>
                    <p>{winningChallenge}</p>
                    <DialogFooter>
                        <DialogClose>
                            <Button>Next Challenge</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
        </Dialog>
    </>
    );
}
