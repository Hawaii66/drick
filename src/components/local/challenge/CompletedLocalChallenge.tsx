import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function CompletedLocalChallenge() {
    return <div className="flex flex-col justify-center items-center gap-4">
        <p>Wheel is empty! Challenges completed.</p>
        <Link to="/">
            <Button>
                Home

            </Button>
        </Link>
    </div>

}
