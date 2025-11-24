import GamePreview from '@/components/GamePreview'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
    const router = useRouter()

    return <div>
       <div>
            <GamePreview
                name="Whisper Network"
                description="Ask anything, anonymously. Direct questions to one person, all guys, all girls, or everyone. Prepare for surprising answers!"
                image="/whisper-network.png"
                onJoinGame={() => router.navigate({
                    to: '/live/anonymous/join',
                })}
                onCreateGame={() => router.navigate({
                    to: '/live/anonymous/create',
                })}
            />
        </div>
    </div>
}
