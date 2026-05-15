# Buenos Aires Trip · Lourenço & Bia (15-17 mai 2026)

Site interativo mobile-first com o roteiro da viagem.

**Online:** https://lourencobborges.github.io/buenos-aires-trip/

## Stack

HTML + CSS + JS vanilla (ES modules). Sem build, sem framework — abre em qualquer browser, carrega rápido no celular, funciona offline via Service Worker (PWA).

- **Leaflet + OpenStreetMap** — mapa interativo gratuito
- **localStorage** — checkboxes do roteiro e tema persistem
- **PWA** — pode "instalar" no celular e usar offline

## Estrutura

```
buenos-aires-trip/
├── index.html              ← shell HTML, nav fixa, seções
├── styles/
│   ├── main.css            ← paleta, componentes, cards
│   └── responsive.css      ← breakpoints + dark mode
├── scripts/
│   ├── data.js             ← TUDO da viagem (lugares, roteiro, logística)
│   ├── render.js           ← funções que constroem HTML
│   ├── storage.js          ← wrapper localStorage
│   ├── map.js              ← Leaflet (pins, legenda)
│   └── app.js              ← orquestra (countdown, nav, filtros, tema)
├── assets/icons/           ← ícones PWA (192, 512)
├── manifest.json           ← PWA manifest
└── service-worker.js       ← cache offline
```

## Atualizar conteúdo

Pra trocar horário, indicação ou lugar: edite só `scripts/data.js`. O resto é renderizado a partir dele.

## Rodar local

Por causa dos ES modules, precisa servir via HTTP (não funciona abrindo `file://`):

```bash
# Python (já instalado no Windows)
python -m http.server 8000

# ou Node, se preferir
npx serve .
```

Abre http://localhost:8000

## Deploy

Push pra `main` no GitHub. O workflow em `.github/workflows/deploy.yml` publica em GitHub Pages.

Primeira vez: Settings → Pages → Source = "GitHub Actions".
