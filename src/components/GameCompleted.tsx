import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function GameCompleted() {
    return <div className="flex flex-col justify-center items-center gap-4">
        <p>You have completed the game.</p>
        <Link to="/">
            <Button>
                Home
            </Button>
        </Link>
    </div>
}
