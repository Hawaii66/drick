import { SalenSong } from "@/types/local/salen";

export function SalenSongIdToSong(id: SalenSong["id"]) {
    return [allIWantForChristmas, villHaDig, whatMakesYouBeautiful, jagKanInteGa, babyJustinBieber, sagMigVartDuStar]
    .find((song) => song.id === id)!;
}

export function SalenSongNameToSong(name: SalenSong["name"]) {
    return [allIWantForChristmas, villHaDig, whatMakesYouBeautiful, jagKanInteGa, babyJustinBieber, sagMigVartDuStar]
    .find((song) => song.name === name)!;
}

export function SalenSongNames() {
    return [allIWantForChristmas, villHaDig, whatMakesYouBeautiful, jagKanInteGa, babyJustinBieber, sagMigVartDuStar]
    .map((song) => song.name);
}

const allIWantForChristmas: SalenSong = {
    id:"all-i-want-for-christmas",
  name: "All I want for Christmas - Mariah Carey",
  trackId: "0bYg9bo50gSsH3LtXe2SQn",
  song: [
    {
      condition: "ALLA SJUNGER 🎤🎤",
      text: `I don't want a lot for Christmas,
there is just one thing I need.
I don't care about the presents
underneath the Christmas tree.`,
    },
    {
      condition: "ALLA SOM HAR LEGAT PÅ JULAFTON🥵",
      text: `I just want you for my own,
more than you will ever know.
Make my wish come true!
All I want for Christmas is you.
Yeah!`,
    },
    {
      condition: "ALLA SOM HAR SPYTT PÅ JOBBET🥴",
      text: `I don't want a lot for Christmas,
there is just one thing I need.
Don't care about those presents underneath the Christmas tree.`,
    },
    {
      condition: "ALLA SOM FÅTT EN SEXLEKSAK I JULKLAPP/PRESENT🎁🔥",
      text: `I don't need to hang my stocking there upon the fireplace.
Santa Claus won't make me happy with a toy on Christmas day,`,
    },
    {
      condition: "ALLA SOM FLYTT FRÅN EN BORTAMATCH🏃➡️🏃➡️",
      text: `I just want you for my own, more than you could ever know.
Make my wish come true,
all I want for Christmas is you!
Ooh, baby.`,
    },
    {
      condition: "ALLA SOM HAR KYSSTS UNDER EN MISTEL🌿😘",
      text: `I won't ask for much this Christmas, I won't even wish for snow.
I'm just gonna keep on waiting
underneath the mistletoe.`,
    },
    {
      condition: "ALLA SOM FÅR KVÄLJNINGAR AV KIR🍾",
      text: `I won't make a list and send it to the North Pole for St. Nick.
I won't even stay up late to hear those magical reindeers click.`,
    },
    {
      condition: "ALLA SOM HAR LEGAT I EN SNÖDRIVA (fri tolkning)🌨️",
      text: `I just want you here tonight, holdin' on to me so tight!
What more can I do?
All I want for Christmas is you!`,
    },
    {
      condition: "ALLA SOM HÅLLIT PÅ MED TVÅ ELLER FLER MED SAMMA NAMN🫢",
      text: `Wow, all the lights are shining so brightly everywhere,
and the sound of children's laughter fills the air,`,
    },
    {
      condition: "ALLA SOM ÄR TAGGADE PÅ NÅGON FÖRSTIS👀👶",
      text: `and everyone is singing!
I hear those sleigh bells ringing...
Santa won't you bring me the one I really need, won't you please bring my baby to me?`,
    },
    {
      condition: "ALLA SOM RAPERIZZAT PÅ KLUBBEN🥶",
      text: `Oh, I don't want a lot for Christmas,
this is all I'm askin' for.
I just wanna see my baby standin' right outside my door.`,
    },
    {
      condition: "ALLA SOM KYSST NÅGON HÄR INNE🫣",
      text: `I just want you for my own, more than you could ever know.
Make my wish come true,
all I want for Christmas...
is you!
You!
Oh, oh, oh-oh oh-oh-oh.
Wow-oh, oh, oh-oh-oh.
Ooh-ooh, oh...`,
    },
  ],
};

const villHaDig: SalenSong = {
    id:"vill-ha-dig",
  name: "Vill ha dig - Freestyle",
  trackId: "1ecJdAizaDklfgCVtEUQsG",
  song: [
    {
      condition: "ALLA SOM HAR HÅNGLAT MED EN LIFTVÄRD🚠",
      text: `Vi har gått i samma klass i snart ett år
Jag har gömt mina känslor så gott det går
Men när du tittar på mig ibland så river du muren
Som jag byggt upp`,
    },
    {
      condition: "ALLA SOM HÅNGLAT MED EN SKIDLÄRARE⛷️",
      text: `Vi går i första ring och jag fattar ingenting
Jag borde lyssna bättre men vad skall jag ta mig till när
Det enda som jag tänker på är din mjuka kropp
Som kan bli min`,
    },
    {
      condition: "ALLA SJUNGER 🎶 🫂",
      text: `Jag vill, åh
Vill ha dig i mörkret hos mig
Tiden den stannar när vi rör vid varann
Åh, jag lättar, jag flyger, jag svävar fram
Låt det aldrig ta slut`,
    },
    {
      condition: "ALLA SOM TAGIT MED SIG NÅT FRÅN AFTERSKIN 🥷 🥷",
      text: `Åh, vill ha dig i mörkret hos mig
Tiden den stannar när vi rör vid varann
Åh, jag lättar, jag flyger, jag svävar fram
Låt det aldrig ta slut`,
    },
    {
      condition: "ALLA SOM HÅNGLAT I RÖKRUTAN PÅ W 🤪🚬",
      text: `Jag låg och grubbla' ensam i min stora säng
Drömmarna blandades med rädslan för framtiden
Om inte jag tar dig nu så tar nån annan dig
Bort från mig`,
    },
    {
      condition: "ALLA SOM BLIVIT NEKADE PÅ W 👮♂️",
      text: `Men allting gick så snabbt, plötsligt var du bara här
Mina fingrar fumla' och din blus den gled isär
Du sa: "Vill du bada skumbad och smeka mej varm?
Jag vet att du vill`,
    },
    {
      condition: "ALLA SOM GÅTT HEM MED EN PELIKAN 🐧🦤🐦🦅",
      text: `Jag vill, åh
Vill ha dig i mörkret hos mig
Tiden den stannar när vi rör vid varann
Åh, jag lättar, jag flyger, jag svävar fram
Låt det aldrig ta slut`,
    },
    {
      condition: "ALLA SOM HÅNGLAT MED SAMMA PERSON TVÅ SÄSONGER I RAD 😳😘",
      text: `Åh, vill ha dig i mörkret hos mig
Tiden den stannar när vi rör vid varann
Åh jag lättar, jag flyger, jag svävar fram
Låt det aldrig ta slut`,
    },
    {
      condition: "ALLA SOM HAR NÅGON I HEMSTADEN SOM VÄNTAR 🏘",
      text: `Vill ha dig i mörkret hos mig
Tiden den stannar när vi rör vid varann
Åh, jag lättar, jag flyger, jag svävar fram
Låt det aldrig ta slut`,
    },
    {
      condition: "ALLA SOM SHOTAT IKVÄLL 🫗",
      text: `Vill ha dig i mörkret hos mig
Tiden den stannar när vi rör vid varann
Åh, jag lättar, jag flyger, jag svävar fram
Låt det aldrig ta slut`,
    },
    {
      condition: "ALLA SOM HAR BC ÖVER 25 😎🥳",
      text: `Åh, vill ha dig i mörkret hos mig
Tiden den stannar när vi rör vid varann`,
    },
  ],
};

const whatMakesYouBeautiful: SalenSong = {
    id:"what-makes-you-beautiful",
  name: "What makes you beautiful - One Direction",
  trackId: "4cluDES4hQEUhmXj6TXkSo",
  song: [
    {
      condition: "ALLA",
      text: `You're insecure, don't know what for
You're turning heads when you walk through the door`,
    },
    {
      condition: "SINGEL",
      text: `Don't need makeup to cover up
Being the way that you are is enough`,
    },
    {
      condition: "BRUNETT",
      text: `Everyone else in the room can see it
Everyone else, but you, ooh`,
    },
    {
      condition: "ALLA",
      text: `Baby, you light up my world like nobody else
The way that you flip your hair gets me overwhelmed`,
    },
    {
      condition: "SNOTT ALKOHOL FRÅN PÄRONEN",
      text: `But when you smile at the ground, it ain't hard to tell`,
    },
    {
      condition: "BLONDINA",
      text: `You don't know, oh-oh
You don't know you're beautiful`,
    },
    {
      condition: "HAR HAFT SEX IDAG",
      text: `If only you saw what I can see
You'll understand why I want you so desperately`,
    },
    {
      condition: "HAR SKÄMTS FÖR NÅGON HÄR INNE",
      text: `Right now I'm lookin' at you, and I can't believe`,
    },
    {
      condition: "HETER -SON I EFTERNAMN",
      text: `You don't know, oh-oh
You don't know you're beautiful, oh, oh-oh
That's what makes you beautiful`,
    },
    {
      condition: "LJUGIT GÖR ATT FÅ HAFF",
      text: `So c-come on, you got it wrong
To prove I'm right, I put it in a song`,
    },
    {
      condition: "ÄR FÖDDA PÅ 00-talet",
      text: `I don't know why you're being shy
And turn away when I look into your eyes`,
    },
    {
      condition: "ALLA",
      text: `Everyone else in the room can see it
Everyone else, but you, ooh`,
    },
    {
      condition: "ÅNGRAT ETT LIGG",
      text: `Baby, you light up my world like nobody else
The way that you flip your hair gets me overwhelmed`,
    },
    {
      condition: "ANVÄNT FALSKLEG🪪",
      text: `But when you smile at the ground, it ain't hard to tell`,
    },
    {
      condition: "HAFT EN KÖNSSJUKDOM",
      text: `You don't know, oh-oh
You don't know you're beautiful`,
    },
    {
      condition: "LEGAT MED 3 ELLER FLER PÅ ETT HALVÅR",
      text: `If only you saw what I can see
You'll understand why I want you so desperately`,
    },
    {
      condition: "DEJTAT EN HOCKEYKILLE… 🏒",
      text: `Right now I'm lookin' at you, and I kö can't believe`,
    },
    {
      condition: "BLIVIT UTSLÄNGDA FRÅN KLUBBEN",
      text: `You don't know, oh-oh
You don't know you're beautiful, oh, oh-oh
That's what makes you beautiful`,
    },
    {
      condition: "YNGRE ÄN 03👶🏼",
      text: `Na-na-na, na-na-na, na, na, na
Na-na-na, na-na-na
Na-na-na, na-na-na, na, na, na
Na-na-na, na-na-na`,
    },
    {
      condition: "LEGAT MED ÖVER 10 PERS",
      text: `Baby, you light up my world like nobody else
The way that you flip your hair gets me overwhelmed`,
    },
    {
      condition: "HAFT SEX DENNA VECKAN",
      text: `But when you smile at the ground, it ain't hard to tell`,
    },
    {
      condition: "ALLA",
      text: `(You don't know, oh-oh)
You don't know you're beautiful`,
    },
    {
      condition: "FEJKAT EN ORGASM",
      text: `Baby, you light up my world like nobody else
The way that you flip your hair gets me overwhelmed`,
    },
    {
      condition: "ÄGER EN SATISFYER/SEXLEKSAK",
      text: `But when you smile at the ground, it ain't hard to tell`,
    },
    {
      condition: "BUKIS MED NÅGON HÄR 🫱🏻🫲🏼",
      text: `You don't know, oh-oh
You don't know you're beautiful`,
    },
    {
      condition: "ALLA",
      text: `If only you saw what I can see
You'll understand why I want you so desperately`,
    },
    {
      condition: "TYCKER NÅN AV DRINKARNA VARIT🤮",
      text: `Right now I'm lookin' at you, and I can't believe
You don't know, oh-oh`,
    },
    {
      condition: "SKA BLI FULL IKVÄLL",
      text: `You don't know you're beautiful, oh, oh-oh
You don't know you're beautiful, oh, oh-oh`,
    },
    {
      condition: "SUTTIT I FYLLECELL 🧏🏼♀️",
      text: `That's what makes you beautiful`,
    },
  ],
};

const jagKanInteGa: SalenSong = {
    id:"jag-kan-inte-ga",
  name: "Jag kan inte gå - Bolaget",
  trackId: "6KOzO2mUwSwe8a9GiJAn7X",
  song: [
    {
      condition: "ALLA:",
      text: `Säg vad har du gett mig
Jag kan inte stå nu
Ramlar runt på borden, föll omkull
Men det förstår du
Alla här har sett mig, jag kan inte gå nu
Börjar tappa orden, är för full och skriker fuck you`,
    },
    {
      condition: "ALLA SOM LEGAT MED EN YNGRE:",
      text: `Jag vill ha en, två, tre men jag tål nog mer
Och jag lovar dig att jag mår bra när jag ser en bar`,
    },
    {
      condition: "ALLA SOM DRICKER VIN IKVÄLL:",
      text: `Men jag kan inte gå, ingen fattar hur jag mår
Jag är fucked up från igår igen, vad har du gett mig?`,
    },
    {
      condition: "LEGAT MED EN KÄNDIS:",
      text: `Nåt jag inte tål, snälla säg mig var du står
Jag minns inget från igår min vän, vad har du gett mig?`,
    },
    {
      condition: "GILLAR ATT SUGA KUK",
      text: `Jag kan inte gå, ingen fattar hur jag mår
Jag är fucked up från igår igen, vad har du gett mig?`,
    },
    {
      condition: "BRUTIT NÄSAN:",
      text: `Nåt jag inte tål, snälla säg mig var du står
Jag minns inget från igår min vän, vad har du gett mig?
Vad gör jag nu`,
    },
    {
      condition: "ALLA:",
      text: `Jag kan inte se om du är den som vill hjälpa mig hem
Eller vill du se mig falla igen
När du vet hur det känns
Jag kan lika gärna vara själv, så du kan lämna mig`,
    },
    {
      condition: "INGA TATUERINGAR:",
      text: `Här är du snäll
För jag vill aldrig mera vara den som bara bang
Bang, bangar igen
Jag vil vara den som tar hela staden hem och tillbaka
Du som bad mig att följa med, jag måste säga dig att snart`,
    },
    {
      condition: "LEGAT MED NÅGON SOM ÄR 5 ÅR ÄLDRE:",
      text: `Kommer falla så hårt
Ingen fattar hur jag mår
Kommer aldrig klara mig utan hjälp, för
Jag kan inte gå, ingen fattar hur jag mår
Jag är fucked up från igår igen, vad har du gett mig?`,
    },
    {
      condition: "ALLA:",
      text: `Nåt jag inte tål, snälla säg mig var du står
Jag minns inget från igår min vän, vad har du gett mig?
Jag kan inte gå, ingen fattar hur jag mår
Jag är fucked up från igår igen, vad har du gett mig?`,
    },
    {
      condition: "TAGIT TILLBAKA SITT EX",
      text: `Nåt jag inte tål, snälla säg mig var du står
Jag minns inget från igår min vän, vad har du gett mig?`,
    },
    {
      condition: "VARIT OTROGEN:",
      text: `Vad gör jag nu
För jag kan inte gå ingen fattar hur jag mår
Kommer aldrig klara mig utan hjälp för jag`,
    },
    {
      condition: "DISCO HÅNGEL PÅ KLUBBEN",
      text: `Jag kan inte gå, ingen fattar hur jag mår
Jag är fucked up från igår igen, vad har du gett mig?`,
    },
    {
      condition: "ALLA",
      text: `Nåt jag inte tål, snälla säg mig var du står
Jag minns inget från igår min vän, vad har du gett mig?
Vad gör jag nu`,
    },
  ],
};

const babyJustinBieber: SalenSong = {
    id:"baby",
  name: "Baby - Justin Bieber",
  trackId:"0VNDOpBbUYtSpCFY7HUA3D",
  song: [
    {
      condition: "ALLA",
      text: `Oh-ooh-whoa-oh-oh-oh-oh
Oh-ooh-whoa-oh-oh-oh-oh
Oh-ooh-whoa-oh, oh-oh-oh-oh`,
    },
    {
      condition: "ALLA FLERSÄSONGARE",
      text: `You know you love me (yo), I know you care (uh-huh)
Just shout whenever (yo), and I'll be there (uh-huh)`,
    },
    {
      condition: "ALLA MED BC ÖVER 5",
      text: `You are my love (yo), you are my heart (uh-huh)
And we will never, ever, ever be apart (yo, uh-huh)`,
    },
    {
      condition: "LEGAT MED EN KOMPIS BROR/SYSTER",
      text: `Are we an item? (Yo) girl, quit playin' (uh-huh)
"We're just friends" (yo), what are you sayin'? (Uh-huh)`,
    },
    {
      condition: "SPYTT PÅ FYLLAN",
      text: `Said, "There's another" (yo), and looked right in my eyes (uh-huh)
My first love broke my heart for the first`,
    },
    {
      condition: "DUMPAT NÅGON PÅ ETT ELAKT SÄTT",
      text: `time, and I was like (yo, uh-huh)
"Baby, baby, baby, oh"`,
    },
    {
      condition: "ALLA",
      text: `Like, "Baby, baby, baby, no"
Like, "Baby, baby, baby, oh"
I thought you'd always be mine, mine`,
    },
    {
      condition: "LEGAT MED NÅGON HÄR I RUMMET",
      text: `"Baby, baby, baby, oh"
Like, "Baby, baby, baby, no"`,
    },
    {
      condition: "BUKIS MED EN KÄNDIS",
      text: `Like, "Baby, baby, baby, oh"
I thought you'd always be mine, mine`,
    },
    {
      condition: "HAR BC ÖVER 10",
      text: `Oh, for you, I would've done whatever (uh-huh)
And I just can't believe we ain't together (yo, uh-huh)`,
    },
    {
      condition: "ALDRIG HAFT FÖRHÅLLANDE",
      text: `And I wanna play it cool (yo), but I'm losin' you (uh-huh)
I'll buy you anything (yo), I'll buy you any ring (uh-huh)`,
    },
    {
      condition: "ALLA SINGLARRRR",
      text: `And I'm in pieces (yo), baby, fix me (uh-huh)
And just shake me 'til you wake me from this bad dream (yo, uh-huh)
I'm goin' down (oh), down, down, down (uh-huh)`,
    },
    {
      condition: "LEGAT I EN BIL",
      text: `And I just can't believe, my first love won't be around, and I'm like`,
    },
    {
      condition: "ALLA SOM HAR DÄCKAT",
      text: `"Baby, baby, baby, oh"
Like, "Baby, baby, baby, no"`,
    },
    {
      condition: "VILL BLI FULL IKVÄLL",
      text: `Like, "Baby, baby, baby, oh"
I thought you'd always be mine, mine`,
    },
    {
      condition: "ALLA SOM DRICKER BUBBEL",
      text: `"Baby, baby, baby, oh"
Like, "Baby, baby, baby, no"`,
    },
    {
      condition: "ALLA SOM FÅTT MINNESLUCKA",
      text: `Like, "Baby, baby, baby, oh"
I thought you'd always be mine, mine (Luda!)`,
    },
    {
      condition: "GILLAR ATT VARA UNDERST",
      text: `When I was 13, I had my first love
There was nobody that compared to my baby
And nobody came between us, nor could ever come above`,
    },
    {
      condition: "ALLA SOM GILLAR ATT VARA ÖVERST",
      text: `She had me goin' crazy
Oh, I was starstruck
She woke me up daily
Don't need no Starbucks (woo)`,
    },
    {
      condition: "HAR ETT SITUATIONSHIP",
      text: `She made my heart pound
And skip a beat when I see her in the street and
At school on the playground
But I really wanna see her on the weekend`,
    },
    {
      condition: "ALLA SOM DRICKER ÖL",
      text: `She knows she got me dazin'
'Cause she was so amazin'
And now, my heart is breakin'
But I just keep on sayin'`,
    },
    {
      condition: "ALLA SOM ÄR ÄLDRE ÄN 02",
      text: `"Baby, baby, baby, oh"
Like, "Baby, baby, baby, no"`,
    },
    {
      condition: "ALLA SOM KOMMIT FULL TILL JOBBET",
      text: `Like, "Baby, baby, baby, oh"
I thought you'd always be mine, mine`,
    },
    {
      condition: "ALLA ARBETSLÖSA",
      text: `"Baby, baby, baby, oh"
Like, "Baby, baby, baby, no"`,
    },
    {
      condition: "ALLA SOM HAFT SEX I EN POOL",
      text: `Like, "Baby, baby, baby, oh"
I thought you'd always be mine, mine`,
    },
    {
      condition: "ALLA SJUNGER",
      text: `I'm gone (yeah, yeah, yeah, yeah, yeah, yeah)
Now, I'm all gone (yeah, yeah, yeah, yeah, yeah, yeah)
Now, I'm all gone (yeah, yeah, yeah, yeah, yeah, yeah)
Now, I'm all gone (gone, gone, gone)
I'm gone`,
    },
  ],
};

const sagMigVartDuStar: SalenSong = {
  id:"sag-mig-vart-du-star",
  name: "Säg mig vart du står - Carola",
  trackId: "32qGFJqweMFsGvsxRKgdjk",
  song: [
    {
      condition: "Se dig omkring",
      text: `Var det det här vi drömde, drömde
Är det någonting`,
    },
    {
      condition: "ALLA SOM HAFT TREKANT",
      text: `Någonting vi glömde, glömde
Har vi en planet fylld av mänsklighet
Hela mitt liv har jag försökt att fråga
Fråga och få ett svar`,
    },
    {
      condition: "BUKIS MED EN KÄNDIS",
      text: `Det är dags att börja tänka om
För tiden rinner ut den kanske snart tar slut
Och jag vet att det vi bygger upp nu
Det blir en dag det våra barn ska ha`,
    },
    {
      condition: "LEGAT I DUSCHEN",
      text: `Finns inget annat svar
Frågorna som jag har
Finns inget annat svar`,
    },
    {
      condition: "HAFT ANALSEX",
      text: `Jag vill så gärna ha
En tro på framtiden
En tro på sanningen
En tro på gemenskapen`,
    },
    {
      condition: "GILLAR TOXIC",
      text: `Någon gång
Någonstans
Någon dag`,
    },
    {
      condition: "GILLAR STRYPSEX",
      text: `Säg mig, åh, säg mig
Åh, säg mig, åh, säg var vi står
Jag måste veta nu`,
    },
    {
      condition: "ÅNGRAT ETT LIGG",
      text: `Säg mig, åh, säg mig
Åh, säg mig, åh, säg var vi står
För jag vill ha en tro på det jag gör
Säg mig, åh, säg mig, åh, säg mig, åh, säg mig, åh, säg mig, åh, säg mig`,
    },
    {
      condition: "FUSKAT PÅ ETT PROV",
      text: `Det är dags att börja tänka om
För tiden rinner ut, den kanske snart tar slut
Och jag vet att det vi bygger upp nu
Det blir en dag det våra barn ska ha`,
    },
    {
      condition: "GILLAR DIRTY TALK",
      text: `Finns inget annat svar
Frågorna som jag har
Finns inget annat svar
Jag vill så gärna ha
En tro på framtiden
En tro på sanningen
En tro på gemenskapen`,
    },
    {
      condition: "ONANERAR FLER ÄN 4 HÅNGER I VECKAN",
      text: `Någon gång
Någonstans
Någon dag`,
    },
    {
      condition: "GRÅTIT UNDER SEX",
      text: `Säg mig, åh, säg mig
Åh, säg mig, åh, säg var vi står
Jag måste veta nu
Säg mig, åh, säg mig`,
    },
    {
      condition: "VARIT ELLER GJORT NÅGON GRAVID",
      text: `Åh, säg mig, åh, säg var vi står
För jag vill ha en tro på det jag gör
Säg mig, åh, säg mig
Åh, säg mig, åh, säg var vi står`,
    },
    {
      condition: "HAFT SEX PÅ OFFENTLIG PLATS",
      text: `Jag måste veta nu
Säg mig, åh, säg mig
Åh, säg mig, åh, säg var vi står`,
    },
    {
      condition: "LEGAT MED NÅGON MED MICROPENIS",
      text: `För jag vill ha en tro på det jag gör
Säg mig, åh, säg mig
Åh, säg mig, åh, säg var vi står`,
    },
    {
      condition: "LEGAT MED 2 PERSONER PÅ EN VECKA",
      text: `Jag måste veta nu
Säg mig, åh, säg mig
Åh, säg mig, åh, säg var vi står`,
    },
    {
      condition: "LEGAT MED NÅGON MED TORETTS",
      text: `För jag vill ha en tro på det jag gör
Säg mig, åh, säg mig`,
    },
    {
      condition: "VILL LIGGA IKVÄLL",
      text: `Åh, säg mig, åh, säg var vi står`,
    },
  ],
};
