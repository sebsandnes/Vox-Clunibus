# Oppsett: Shopify, Printful og betaling

Følg stegene i rekkefølge. Menynavnene i Shopify er på engelsk her, siden adminpanelet ofte står på engelsk.

## 0. Rydd opp i den gamle butikken først

Den gamle butikken på Vercel har to feil som kan koste deg penger mens du bygger den nye (se forrige gjennomgang):

1. **Sjekk Stripe** for betalte ordre som aldri kom til Printful. Webhooken ser ut til å feile, så kunder kan ha betalt uten å få noe. Finner du slike, send dem manuelt i Printful eller refunder.
2. **Skru av betalingen** i den gamle butikken til Shopify er klar. Kassen godtar prisen som nettleseren sender, så hvem som helst kan sette sin egen pris.

## 1. Bedrift og penger

1. **Registrer ENK** i Brønnøysundregistrene (gratis). Du trenger organisasjonsnummer for Vipps, og det skiller butikken fra privatøkonomien.
2. **Opprett en bedriftskonto** og koble alt dit.
3. **Skaff et kredittkort som bare brukes til butikken.** Det legger du inn i Printful. Printful trekker når ordren går i produksjon, men utbetalingen fra kunden kommer senere. Kredittkortet gir deg 30 til 45 dager før du må betale, så en stor ordre tømmer aldri kontoen din.
4. **Mva:** du må registrere deg når salget passerer 50 000 kr i løpet av 12 måneder. Snakk med en regnskapsfører en gang før lansering. En time koster mindre enn en feil i mva.

## 2. Opprett butikken

1. Shopify **Basic** holder lenge.
2. **Settings → Store details:** butikknavn, adresse og organisasjonsnummer. Ehandelsloven krever at kunden ser hvem du er.
3. **Settings → Languages:** norsk som standard.
4. **Settings → Markets:** start med **bare Norge**, valuta NOK. Ett marked gir billigere annonsetester og enklere mva. Norden kan komme senere.
5. **Settings → Domains → Connect existing domain:** koble `voxclunibus.com`. Gjør dette **sist**, når Shopify er testet, så den gamle siden er oppe til da.

## 3. Tema og utseende

Butikken har sitt eget tema, laget etter merkevareguiden. Det ligger i `shopify-theme/`.

1. **Online Store → Themes → Add theme → Upload zip file:** last opp `shopify-theme/dist/voxclunibus-theme.zip` og trykk **Publish**.
2. Følg de fem stegene i `shopify-theme/README.md`: fotnotefeltet på produktene, menyer, temaeditoren, løftene på forsiden og passordsiden.
3. Forsiden: last opp ett bilde av en ekte person i en skjorte. Mockups selger dårligere.
4. **Om oss:** start med navnet. «Voxclunibus er latin for å snakke fra rumpa. Omtrent. Vi lager klær med fotnoter.»

## 4. Betaling

1. **Settings → Payments → Shopify Payments.** Ifølge flere kilder ble Shopify Payments tilgjengelig i Norge i 2025. Bekreft at det dukker opp i adminpanelet ditt. Skru på kort, **Apple Pay**, **Google Pay** og **Shop Pay**.
2. **Klarna:** aktiveres i Shopify Payments hvis det tilbys der, ellers med Klarna sin egen app.
3. **Vipps:** installer den offisielle appen fra Vipps MobilePay i Shopify App Store og søk om bedriftsavtale hos Vipps MobilePay (krever organisasjonsnummer). For norske kunder er dette den viktigste betalingsmåten du har.

## 5. Stopp svindel og store ordre automatisk

Printful henter bare ordre som er **betalt**. Det bruker vi: alle betalinger reserveres først, og bare trygge ordre trekkes automatisk. Resten venter på deg.

1. **Settings → Payments → Payment capture method:** velg **Manually capture payment for orders**.
2. Installer **Shopify Flow** (gratis) og lag én regel:
   * **Trigger:** *Order risk analyzed*
   * **Betingelse:** risikonivå er *Low* **og** totalsum er under 1 000 kr
   * **Ja:** *Capture payment*
   * **Nei:** send deg selv en epost: «Ordre til manuell sjekk»
3. Får du en slik epost: se på ordren (adresse, navn, epost, om noe virker rart). Ser den grei ut, trykker du **Capture payment** i Shopify, så går den videre til Printful av seg selv. Gjør det innen 2 til 3 dager, ellers kan reservasjonen utløpe.

Resultat: vanlige ordre går helt automatisk. Store ordre og ordre som Shopify mener er risikable venter på et klikk fra deg, og du betaler aldri Printful for en ordre der kunden ikke har betalt deg.

**Test dette før lansering** (steg 9), spesielt med Vipps. Ulike betalingsapper håndterer reservasjon litt forskjellig.

## 6. Printful

1. Installer **Printful** fra Shopify App Store og koble kontoen.
2. **Printful → Billing:** legg inn kredittkortet fra steg 1 som betalingsmåte.
3. **Printful → Settings → Store settings → Orders:** skru **på** automatisk bekreftelse av ordre. Kontrollen skjer allerede i Shopify (steg 5).
4. **Lag produktene:** velg Bella+Canvas 3001, farger Black og Natural, trykk foran.
   * Black: last opp `brand/print/<navn>-dark.png`
   * Natural: last opp `brand/print/<navn>-light.png`
   * Filen dekker hele trykkområdet med luft øverst. La den fylle området og sjekk at teksten havner på brystet i forhåndsvisningen.
5. Send produktene til Shopify. Rett tittel, tekst og pris etter `brand/kolleksjon.md`. Velg Printfuls mockups som produktbilder til du har egne bilder.

## 7. Frakt

**Settings → Shipping and delivery → Norge:**
1. «Standard frakt»: 69 kr.
2. «Gratis frakt»: 0 kr, betingelse ordreverdi fra 798 kr (to skjorter).

## 8. Juss og innhold

1. **Settings → Policies:** fyll ut kjøpsvilkår, angrerett, personvern og frakt. Forbrukertilsynet har standard kjøpsvilkår for netthandel som du kan ta utgangspunkt i. 14 dagers angrerett gjelder alltid, også om Printful ikke tar returer. Returkostnaden blir din, så regn med den.
2. Angreskjema: lenke til Forbrukertilsynets skjema fra vilkårene.
3. Cookies: skru på Shopifys samtykkebanner (**Settings → Customer privacy**).

## 9. Test før lansering

1. Bestill én skjorte med ekte kort. Sjekk at ordren dukker opp i Printful og blir bekreftet automatisk.
2. Bestill med Vipps. Samme sjekk.
3. Bestill for over 1 000 kr. Sjekk at den **ikke** går til Printful, at du får epost, og at den går videre når du trykker *Capture payment*.
4. Refunder testordrene og avbryt dem i Printful før de trykkes (Printful har et kort vindu før produksjon).

## 10. Epost og lansering

1. **Shopify Email** (gratis opp til en viss mengde): lag en popup som gir 10 % rabatt mot epostadresse, og skru på automatisk epost ved **forlatt handlekurv**. Dette er de to billigste salgene du får.
2. Start med gratis innhold: korte videoer på TikTok og Instagram med ekte folk i skjortene. Se hvilke linjer folk reagerer på.
3. Først da: Meta annonser med et lite budsjett på de 4 til 6 linjene som fikk mest respons. Husk at Meta avviser banning i annonser, så bruk ikke fotnoten på *Vox Clunibus* i annonsebildet.

## Hva du fortsatt kan bruke meg til

* Nye linjer og trykkfiler (`brand/tools/designs.json`)
* Endringer i temaet (`shopify-theme/`) når temaeditoren ikke strekker til
* Shopify Flow regler, produkttekster, epost og annonsetekster
* Gå gjennom salgs og annonsetall og si hva som bør kuttes
