# Voxclunibus Shopify tema

Et eget Shopify tema bygget på merkevareguiden i `brand/`. Shopify tar seg av handlekurv, kasse, betaling og Printful. Temaet bestemmer bare hvordan butikken ser ut.

**Ferdig fil til opplasting:** `dist/voxclunibus-theme.zip`

## Installer

1. Opprett butikken i Shopify (gratis prøveperiode holder til du er klar).
2. **Online Store → Themes → Add theme → Upload zip file** og velg `voxclunibus-theme.zip`.
3. Trykk **Publish** på temaet.

## Fem ting du må sette opp etterpå

1. **Fotnoter på produktene.** Gå til **Settings → Custom data → Products → Add definition**.
   * Name: `Fotnote`
   * Namespace and key: `custom.footnote`
   * Type: **Single line text**

   Nå har hvert produkt et felt for fotnote nederst. Skriv inn fotnoten fra `brand/kolleksjon.md`, for eksempel *Det ordnet seg ikke.* Den vises med oransje asterisk på produktsiden og i produktlistene.
2. **Menyer.** **Online Store → Navigation**. Temaet bruker menyene `Main menu` (toppen) og `Footer` (bunnen). Begge finnes allerede i en ny butikk. Legg inn lenkene du vil ha.
3. **Temaeditoren** (**Customize** på temaet):
   * **Logo:** la feltet stå tomt. Da vises butikknavnet som VOXCLUNIBUS med oransje asterisk, skarpt i alle størrelser.
   * **Theme settings → Favicon:** `brand/logo/icon-1024.png`.
   * **Theme settings → Cart → Free shipping from:** må være samme beløp som regelen for gratis frakt i **Settings → Shipping and delivery** (798 kr i oppsettguiden).
   * **Footer:** lim inn lenkene til Instagram og TikTok.
   * **Forsiden:** last opp et bilde av en ekte person i en skjorte i Hero og i «Image with text».
4. **Løftene på forsiden.** Teksten «Vipps og Klarna» står der som standard. Endre den til det du faktisk tilbyr til Vipps og Klarna er aktivert, ellers lover du noe du ikke holder.
5. **Passordsiden.** Mens butikken er passordbeskyttet, viser den «Åpner snart» med et epostfelt. Adressene havner under **Customers** med taggen `prelaunch`. Det er dine første kunder, så del adressen før lansering.

## Hva er testet, og hva er ikke testet

**Testet:**
* Shopify sin egen kvalitetssjekk (Theme Check) gir 0 feil.
* Sidene er vist med testprodukter på mobil og PC: forside, produkt, kolleksjon, handlekurv, 404 og passordside.
* Størrelsesvelgeren bytter pris, bilde og knapp og streker over utsolgte størrelser.
* Ingen sidelengs skrolling på mobil og ingen JavaScript feil.

**Ikke testet:** temaet har ikke kjørt i en ekte Shopify butikk. Dette må du sjekke selv etter opplasting:
1. Legg en vare i handlekurven. Handlekurven skal gli inn fra høyre, og antallet øverst skal oppdatere seg.
2. Endre antall og fjern en vare i handlekurven.
3. Hurtigknappene (Apple Pay, Google Pay, Vipps) og Klarna teksten på produktsiden. De vises bare når betalingsmåtene er aktivert.
4. Gå hele veien til kassen.

Fungerer noe ikke, ta et skjermbilde og send det til meg.

## Endringer senere

Endre tekster, bilder og rekkefølgen på seksjonene selv i temaeditoren. For større endringer i design eller funksjon lager jeg en ny zip fil, eller vi kobler temaet til GitHub, så oppdateringer går rett inn i Shopify.

Lag ny zip etter endringer i koden:

```
python3 shopify-theme/build.py
```
