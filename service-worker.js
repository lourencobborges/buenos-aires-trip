// =====================================================================
// SERVICE WORKER — cache-first com versionamento.
// Bumpar CACHE quando publicar mudança força clientes a baixar de novo.
// =====================================================================

const CACHE = "ba-trip-v5";

const SHELL = [
  "./",
  "./index.html",
  "./styles/main.css",
  "./styles/responsive.css",
  "./scripts/app.js",
  "./scripts/data.js",
  "./scripts/render.js",
  "./scripts/storage.js",
  "./manifest.json",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;

  // Pra HTML, prefere rede (network-first) — pega versão nova rápido.
  const isHTML = e.request.mode === "navigate" ||
    (e.request.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    e.respondWith(
      fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return resp;
      }).catch(() => caches.match(e.request).then(h => h || caches.match("./index.html")))
    );
    return;
  }

  // Pra outros assets: cache-first
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(resp => {
        if (resp.ok && new URL(e.request.url).origin === location.origin) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
