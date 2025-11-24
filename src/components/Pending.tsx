import { RefreshCw } from "lucide-react"
import { Button } from "./ui/button"
import { PropsWithChildren } from "react"

type Props = {
    isPending: boolean
}

export default function Pending({ isPending, children }: PropsWithChildren<Props>) {
    if (isPending) {
        return <Button>
            <RefreshCw className="animate-spin" />
        </Button>
    }

    return children
}
