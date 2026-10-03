const CACHE_NAME = "daily-stoic-pwa-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=4",
  "./app.js?v=4",
  "./ai-config.json",
  "./content/daily/index.json",
  "./content/daily/2026-10-03.json",
  "./manifest.webmanifest?v=2",
  "./icon.svg",
  "./assets/thinkers/zeno.webp",
  "./assets/thinkers/cleanthes.webp",
  "./assets/thinkers/chrysippus.webp",
  "./assets/thinkers/panaetius.webp",
  "./assets/thinkers/musonius.webp",
  "./assets/thinkers/seneca.webp",
  "./assets/thinkers/epictetus.webp",
  "./assets/thinkers/marcus.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});
