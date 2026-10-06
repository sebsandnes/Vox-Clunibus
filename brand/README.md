# Voxclunibus* merkevareguide

## Ideen

**Voxclunibus** er latin for å snakke fra rumpa. Omtrent.

Navnet er vanskelig å huske helt til noen forklarer det. Da glemmer man det aldri. Derfor skal forklaringen være en del av merkevaren, ikke noe vi gjemmer: flaggskipskjorta sier det rett ut, og «Om oss» siden starter med det.

**Konseptet er tørr, offisiell alvorlighet om ting som ikke fortjener det.** Hver skjorte ser ut som en saklig kunngjøring. Så kommer fotnoten og ødelegger alt.

> **DET ORDNER SEG***
> \* Det ordnet seg ikke.

Fotnoten med den oransje asterisken er signaturen vår. Den gjør at en norsk og en engelsk skjorte ser ut som samme merke, og den er lett å kjenne igjen i en feed. (Ja, asterisken ligner også på det navnet handler om. Det er med vilje.)

## Hvem vi selger til

Nordmenn mellom 20 og 40 som tenker på norsk og ler på engelsk. De har en litt mørk, selvironisk humor og liker ting som er morsomme uten å rope. Hovedmarkedet er **Norge**: priser i NOK, Vipps i kassen og norsk som språk i butikken. De engelske linjene selger også til nordmenn, og de gjør det mulig å utvide til Norden senere.

## Tone

| Gjør | Ikke gjør |
|---|---|
| Tørr og alvorlig formulering, poenget i fotnoten | Utropstegn, emojier, «LOL» |
| Spøk med deg selv, jobben, mandager og Norge | Spøk på bekostning av grupper (det er ikke edgy, bare kjedelig, og det får annonser avvist) |
| Korte setninger | Forklare vitsen |
| Norsk der det treffer best, engelsk der det treffer best | Blande språk i samme setning |
| | Alkohol i design og annonser (alkoholreklame er forbudt i Norge) |
| | Banning i hovedlinjen (Meta avviser annonser med banning; fotnoten tåler mer) |

Samme tone gjelder produkttekster, epost og annonser. Eksempel på en produkttekst: *«100 % bomull. 0 % løfter. Trykkes først når du bestiller, så ingen skjorter blir kastet.»*

## Farger

| Navn | Hex | Bruk |
|---|---|---|
| Ink | `#141414` | Tekst, bakgrunn i mørke flater |
| Bone | `#EDE8DF` | Bakgrunn på nettsiden, trykk på svarte skjorter |
| Signal | `#FF4F1F` | **Bare** asterisken, knapper og salgsmerker. Aldri store flater. |

Skjortefarger: **Black** (bone trykk) og **Natural** (ink trykk).

## Skrift

| Bruk | Skrift | Merknad |
|---|---|---|
| Overskrifter og trykk | **Anton**, store bokstaver | Gratis (SIL OFL), lov å bruke på varer for salg |
| Fotnoter, priser, småtekst | **IBM Plex Mono** | Gratis (SIL OFL) |
| Brødtekst i nettbutikken | IBM Plex Mono eller temaets standard sans | Hold det lesbart |

Lisensene ligger i `fonts/`.

## Logo

| Fil | Bruk |
|---|---|
| `logo/wordmark-ink.png` | Logo på lys bakgrunn (Shopify header) |
| `logo/wordmark-bone.png` | Logo på mørk bakgrunn |
| `logo/icon-1024.png` | Profilbilde på Instagram og TikTok, favicon i Shopify |
| `logo/asterisk.svg` | Asterisken alene, til vektorbruk |

Asterisken er alltid Signal oransje. Ikke strekk, roter eller legg skygge på logoen.

## Mappene

| Mappe | Innhold |
|---|---|
| `print/` | Trykkfiler til Printful, 3600x4800 px, 300 dpi, gjennomsiktig bakgrunn. `*-dark.png` til svarte skjorter, `*-light.png` til Natural. |
| `previews/` | Enkle mockups til intern bruk. Bruk Printfuls egne mockups i butikken. |
| `tools/` | `designs.json` (alle linjer) og `render.js` som lager alle filer på nytt |
| `kolleksjon.md` | Produktene, priser og ferdige produkttekster |
| `shopify-oppsett.md` | Steg for steg oppsett av Shopify, Printful og betaling |

## Ny skjorte

1. Legg til en linje i `tools/designs.json` (`slug`, `lines`, `footnote`).
2. Kjør `node brand/tools/render.js` (krever Playwright med Chromium).
3. Last opp den nye filen fra `print/` til Printful.

Testen før en linje får komme med: **ville du gått med den selv, og forstår man den på tre sekunder fra andre siden av gata?**
