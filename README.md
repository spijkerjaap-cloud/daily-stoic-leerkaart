# The Daily Stoic · Leeratelier

Telefoonvriendelijke PWA met vijf schermen: Vandaag, Denker, Theorie, Oefening en Verslagen.

Onder **Theorie** staat een leesbare introductie tot het stoïcisme. Elk van de acht denkers heeft een eigen illustratie die één kernidee verbeeldt. De figuren zijn symbolisch en geen historische portretten.

## Gebruik

Open de GitHub Pages-site en voeg die via **Zet op beginscherm** toe aan je telefoon. De basisinhoud werkt na de eerste laadbeurt ook offline. De app bewaart oefenantwoorden, reflecties en verslagen in `localStorage` van die browser. Met **Download gegevens** maak je zelf een back-up.

De denkers en theorie zijn redactionele startinhoud met bronlinks. De kaart van Vandaag is momenteel de eerste Epictetus-les; de geplande dagelijkse Codex-automatisering levert nog geen automatische datafeed aan deze PWA.

## AI-feedback bij verslagen

Open **Verslagen → AI instellen**, vul een OpenAI API-sleutel in en klik op **Bekijk met AI** bij een verslag. De app verstuurt dat verslag en een korte samenvatting van de oefenstand rechtstreeks naar de OpenAI Responses API met `store: false`. De sleutel blijft alleen in het invoerveld tijdens de huidige sessie; de app slaat hem niet op. API-gebruik kan kosten veroorzaken.

Voor een gedeelde of breed verspreide app hoort deze browserroute te worden vervangen door een eigen server met authenticatie en een server-side API-sleutel. De huidige statische GitHub Pages-site heeft geen eigen backend of synchronisatie tussen apparaten.

## Lokaal testen

```bash
python3 -m http.server 8766
```

Open daarna `http://localhost:8766/`. Voor service workers en installatie gebruikt een telefoon de HTTPS GitHub Pages-site.
