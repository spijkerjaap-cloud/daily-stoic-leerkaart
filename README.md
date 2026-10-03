# The Daily Stoic · Leeratelier

Telefoonvriendelijke PWA met vijf schermen: Vandaag, Denker, Theorie, Oefening en Verslagen.

Onder **Theorie** staat een leesbare introductie tot het stoïcisme. Elk van de acht denkers heeft een eigen illustratie die één kernidee verbeeldt. De figuren zijn symbolisch en geen historische portretten.

## Gebruik

Open de GitHub Pages-site en voeg die via **Zet op beginscherm** toe aan je telefoon. De basisinhoud werkt na de eerste laadbeurt ook offline. De app bewaart oefenantwoorden, reflecties en verslagen in `localStorage` van die browser. Met **Download gegevens** maak je zelf een back-up.

De dagelijkse les komt uit `content/daily/index.json` en een afzonderlijk JSON-bestand per datum. De bestaande automatisering publiceert elke ochtend een nieuwe les. De app toont de nieuwste gepubliceerde les en bewaart eerdere lessen in het archief. Nieuwe lesbestanden voeg je toe met `node scripts/add-lesson.mjs YYYY-MM-DD`; `node scripts/validate-content.mjs` controleert het formaat.

De oefenvragen plannen begrippen opnieuw na 1, 3, 7, 14 en 30 dagen. Een fout antwoord laat het begrip vandaag terugkomen met een andere vraag. De planning blijft op hetzelfde apparaat bewaard en gaat mee in de JSON-back-up.

## AI-feedback bij verslagen

De veiligere serverroute is voorbereid in `worker/`. Na inrichting staat de OpenAI-sleutel als secret in een Cloudflare Worker en gebruik je in de app een afzonderlijke persoonlijke toegangscode. De app verstuurt alleen het gekozen verslag, de oefenstand en maximaal twee eerdere feedbacksamenvattingen na je klik. De Worker vraagt de OpenAI Responses API aan met `store: false` en slaat de inhoud niet op.

De serverroute wordt actief zodra `ai-config.json` een HTTPS Worker-URL eindigend op `/analyze` bevat. Tot de Worker is ingericht, blijft de eerdere directe browserroute beschikbaar via **Verslagen → AI instellen**. Daarbij moet je zelf een OpenAI API-sleutel invullen; die wordt niet opgeslagen. De statische GitHub Pages-site heeft geen synchronisatie tussen apparaten.

### Worker activeren

1. Maak of gebruik een Cloudflare-account en installeer Wrangler. Voer in `worker/` `npx wrangler login` uit.
2. Zet de geheimen met `npx wrangler secret put OPENAI_API_KEY` en `npx wrangler secret put ACCESS_TOKEN`. Kies voor `ACCESS_TOKEN` een willekeurige unieke code van minstens 32 tekens. Zet geen van beide in Git.
3. Publiceer met `npx wrangler deploy`. Neem de getoonde HTTPS-URL over in `ai-config.json`, met `/analyze` erachter, en publiceer de PWA opnieuw.
4. Vul in de app alleen de persoonlijke toegangscode in. De OpenAI-sleutel komt nooit in de browser. Beperk zo nodig de kosten in je OpenAI-account; houd de toegangscode privé.

## Lokaal testen

```bash
python3 -m http.server 8766
```

Open daarna `http://localhost:8766/`. Voor service workers en installatie gebruikt een telefoon de HTTPS GitHub Pages-site.
