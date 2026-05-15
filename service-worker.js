// =====================================================================
// SERVICE WORKER — cache-first pra funcionar offline na viagem.
// Estratégia simples:
//  1) No "install" pré-cacheia a shell (HTML + CSS + JS + manifest).
//  2) Em fetch: serve do cache se tiver; senão busca na rede e guarda.
//  3) Quando muda a versão (CACHE), limpa caches antigos no activate.
// =====================================================================

const CACHE = "ba-trip-v1";

const SHELL = [
  "./",
  "./index.html",
  "./styles/main.css",
  "./styles/responsive.css",
  "./scripts/app.js",
  "./scripts/data.js",
  "./scripts/render.js",
  "./scripts/storage.js",
  "./scripts/map.js",
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
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // Só intercepta GET — POST/etc passa direto.
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request)
        .then(resp => {
          // Guarda no cache só recursos do mesmo origin (evita encher
          // o cache com tiles do mapa).
          if (resp.ok && new URL(e.request.url).origin === location.origin) {
            const copy = resp.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return resp;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
