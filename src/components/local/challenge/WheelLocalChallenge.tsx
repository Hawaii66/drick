import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

type Props = {
    challenges: string[]
    onChalengeSelected: (challenge: string) => void
}

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

export default function WheelLocalChallenge({ challenges, onChalengeSelected }: Props) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [winningChallengeIndex, setWinningChallengeIndex] = useState(0);

    const onSpin = () => {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        setWinningChallengeIndex(randomIndex);
        setIsSpinning(true)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4">
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
                mustStartSpinning={isSpinning}
                prizeNumber={winningChallengeIndex}
                onStopSpinning={() => {
                    setIsSpinning(false);
                    onChalengeSelected(challenges[winningChallengeIndex]);
                }}
                spinDuration={0.6}
            />
            <Button onClick={onSpin}>Spin</Button>
        </div>
    )
}
