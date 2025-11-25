import { LiveGamePreview, LocalGamePreview } from '@/components/GamePreview'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
    const router = useRouter()

    return <div>
       <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8">
            <LiveGamePreview
                name="Pandoras Ask🤫"
                description="Fråga vad du vill, anonymt. Rikta frågor till en person, alla killar, alla tjejer, eller alla. Förbered dig på överraskande svar!"
                image="/whisper-network.png"
                onJoinGame={() => router.navigate({
                    to: '/live/anonymous/join',
                })}
                onCreateGame={() => router.navigate({
                    to: '/live/anonymous/create',
                })}
            />
            <LocalGamePreview
                name="Snurra Hjulet🎡"
                description="Oändliga utmaningar. Snurra hjulet för att få nästa oväntade vågspel. Gör dig redo för omedelbar, ofiltrerad underhållning med vänner!"
                image="/dare-spin.png"
                onStartGame={() => router.navigate({
                    to: '/local/challenge',
                })}
            />
             <LocalGamePreview
                name="Vattenfall💧"
                description="Den ultimata drickkedjereaktionen. Drick efter den före dig när låten når ett specifikt ord. Håll kaskaden flödande!"
                image="/waterfall.png"
                onStartGame={() => router.navigate({
                    to: '/local/waterfall',
                })}
            />       
              <LocalGamePreview
                name="Allsång i Sälen🍺"
                description="Sjung med i klassiska hits – med en twist! Bara de som *verkligen* har gjort det får sjunga med. Om inte, drick!"
                image="/allsang-i-salen.png"
                onStartGame={() => router.navigate({
                    to: '/local/salen',
                })}
            />       
               <LocalGamePreview
                name="Peklek👈"
                description="Dags att peka finger! Ett påstående läses upp, och alla pekar på den det bäst beskriver. Ingen som pratar, bara roliga, tysta anklagelser!"
                image="/peklek.png"
                onStartGame={() => router.navigate({
                    to: '/local/peklek',
                })}
            />
           </div>
    </div>
}
