import { LiveGamePreview, LocalGamePreview } from '@/components/GamePreview'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
    const router = useRouter()

    return <div>
       <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8">
            <LiveGamePreview
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
            <LocalGamePreview
                name="Dare Spin"
                description="Endless challenges. Spin the wheel to receive your next unexpected dare. Get ready for instant, unfiltered fun with friends!"
                image="/dare-spin.png"
                onStartGame={() => router.navigate({
                    to: '/local/challenge',
                })}
            />
             <LocalGamePreview
                name="Waterfall"
                description="The ultimate drinking chain reaction. Drink after the person before you when the song hits a special word. Keep the cascade flowing!"
                image="/waterfall.png"
                onStartGame={() => router.navigate({
                    to: '/local/waterfall',
                })}
            />       
              <LocalGamePreview
                name="Allsång i Sälen🍺"
                description="Sing along to classic hits with a twist! Only those who've actually done it can join the chorus. If not drink!"
                image="/allsang-i-salen.png"
                onStartGame={() => router.navigate({
                    to: '/local/salen',
                })}
            />       
        </div>
    </div>
}
