import { LocalChallengeConfig } from "@/types/local/challenge";
import { useState } from "react";
import CardConfigureLocalChallenge from "./CardConfigureLocalChallenge";
import CardPlayLocalChallenge from "./CardPlayLocalChallenge";
import ModeToChallenges from "@/lib/local/challenge";
import { shuffle } from "@/lib/utils";

export default function LocalChallenge() {
    const [config, setConfig] = useState<LocalChallengeConfig | null>(null);

    if(!config) {
        return <CardConfigureLocalChallenge onConfigured={setConfig}/>
    }

    return <CardPlayLocalChallenge challenges={shuffle(ModeToChallenges(config.mode)).slice(0,config.numberOfPlayers*config.challengesPerPlayer)} />
}
