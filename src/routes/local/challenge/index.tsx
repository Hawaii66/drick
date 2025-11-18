import LocalChallenge from '@/components/local/challenge/LocalChallenge'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/local/challenge/')({
  component: RouteComponent,
})

function RouteComponent() {
    return<div className="flex justify-center items-center h-full p-4">
        <LocalChallenge />

    </div>
}
