import { LiveGamePreview, LocalGamePreview } from '@/components/GamePreview'
import GameSelectSearch from '@/components/GameSelectSearch'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
    const router = useRouter()

    return <div className="py-4">
        <h1 className="text-3xl font-bold text-center py-4 tracking-wider bg-gradient-to-tr from-[#f06a47] to-[#eaae13] bg-clip-text text-transparent">
            drickspel.com
        </h1>

        <h2 className="text-center font-bold text-2xl">Välj Spel</h2>
        <GameSelectSearch>
            <div className="flex flex-col items-center p-4 gap-8">
                <LiveGamePreview
                    name="🤫 Pandoras Ask"
                    description="Fråga vad du vill, anonymt. Rikta frågor till en person, alla killar, alla tjejer, eller alla. Förbered dig på överraskande svar!"
                    image="/whisper-network.png"
                    onJoinGame={() => router.navigate({
                        to: '/live/anonymous/join',
                    })}
                    onCreateGame={() => router.navigate({
                        to: '/live/anonymous/create',
                    })}
                    keywords={['sanning eller konsekvens', 'frågesport', 'sanning', 'frågor', 'sanning eller drink']}
                />
                <LiveGamePreview
                    name="⚡ Reaktions Tid"
                    description="Reflexer på prov! Vänta på den gröna rutan, klicka snabbast. Enkel utmaning för dig och vännerna – vem är snabbast på avtryckaren?"
                    image="/reaction-time.png"
                    onJoinGame={() => router.navigate({
                        to: '/live/reaction-time/join',
                    })}
                    onCreateGame={() => router.navigate({
                        to: '/live/reaction-time/create',
                    })}
                    keywords={['reaktion', 'tid', 'snabbast']}
                />
                <LiveGamePreview
    name="🕵️ Impostor"
    description="Alla utom en får samma fråga. Impostorn får en annorlunda fråga. Svara på din fråga och gissa sedan vem som är impostorn!"
    image="/impostor.png"
    onJoinGame={() => router.navigate({
        to: '/live/impostor/join',
    })}
    onCreateGame={() => router.navigate({
        to: '/live/impostor/create',
    })}
    keywords={['impostor', 'bluffa', 'gissa', 'socialt spel', 'misstänksamhet']}
/>
                 <LiveGamePreview
                    name="⚡ Reaktions Tid"
                    description="Reflexer på prov! Vänta på den gröna rutan, klicka snabbast. Enkel utmaning för dig och vännerna – vem är snabbast på avtryckaren?"
                    image="/reaction-time.png"
                    onJoinGame={() => router.navigate({
                        to: '/live/impostor/join',
                    })}
                    onCreateGame={() => router.navigate({
                        to: '/live/impostor/create',
                    })}
                    keywords={['reaktion', 'tid', 'snabbast']}
                />
                <LiveGamePreview
                    name="🏷️ Gissa Etikett" 
                    description="Vem eller vad är du? Varje spelare får en hemlig etikett med en person, sak eller koncept som ni väljer. Ställ ja- och nej-frågor till de andra för att lista ut din egen etikett. Först att gissa vinner"
                    image="/whois.png"
                    onJoinGame={() => router.navigate({
                        to: '/live/whois/join', 
                    })}
                    onCreateGame={() => router.navigate({
                        to: '/live/whois/create',
                    })}
                    keywords={['gissningslek', 'identitet', 'vem är jag', 'vad är jag', 'socialt spel', 'rollspel']}
                />
                <LocalGamePreview
                    name="🎡 Snurra Hjulet"
                    description="Oändliga utmaningar. Snurra hjulet för att få nästa oväntade vågspel. Gör dig redo för omedelbar, ofiltrerad underhållning med vänner!"
                    image="/dare-spin.png"
                    onStartGame={() => router.navigate({
                        to: '/local/challenge',
                    })}
                    keywords={['sanning eller konsekvens', 'utmaning', 'våga eller drick']}
                />
                <LocalGamePreview
                    name="🌊 Vattenfall"
                    description="Den ultimata drickkedjereaktionen. Drick efter den före dig när låten når ett specifikt ord. Håll kaskaden flödande!"
                    image="/waterfall.png"
                    onStartGame={() => router.navigate({
                        to: '/local/waterfall',
                    })}
                    keywords={['drickspel', 'musikspel', 'karaoke']}
                />
                <LocalGamePreview
                    name="🍺 Allsång i Sälen"
                    description="Sjung med i klassiska hits – med en twist! Bara de som *verkligen* har gjort det får sjunga med. Om inte, drick!"
                    image="/allsang-i-salen.png"
                    onStartGame={() => router.navigate({
                        to: '/local/salen',
                    })}
                    keywords={['karaoke', 'musikspel', 'drickspel']}
                />
                <LocalGamePreview
                    name="👈 Peklek"
                    description="Dags att peka finger! Ett påstående läses upp, och alla pekar på den det bäst beskriver. Ingen som pratar, bara roliga, tysta anklagelser!"
                    image="/peklek.png"
                    onStartGame={() => router.navigate({
                        to: '/local/peklek',
                    })}
                    keywords={['sanning eller konsekvens', 'rolig lek', 'festlek', "snusdosan"]}
                />
            </div>
        </GameSelectSearch>
    </div>
}
