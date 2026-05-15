// =====================================================================
// MAP — inicializa o Leaflet (OpenStreetMap, gratuito), monta pins
// coloridos por categoria e legenda. Recebe a lista de lugares + meta
// e um id de container do DOM.
// =====================================================================

import { TIPO_META } from "./data.js";

// Constrói um divIcon (HTML inline) com a cor e ícone do tipo do lugar.
// Usar divIcon evita ter que hospedar PNGs de marcador.
function makePinIcon(meta) {
  return L.divIcon({
    className: "",
    html: `<div class="map-pin" style="background:${meta.cor}"><span>${meta.icone}</span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

export function initMap(containerId, lugares, hotel) {
  const mapEl = document.getElementById(containerId);
  if (!mapEl) return;

  // Centro inicial: hotel. Zoom 14 cobre Palermo + Recoleta.
  const map = L.map(containerId, { scrollWheelZoom: false }).setView(hotel.coords, 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
    maxZoom: 19,
  }).addTo(map);

  // Pin do hotel — estrela, sempre destacado
  const hotelIcon = L.divIcon({
    className: "",
    html: `<div class="map-pin" style="background:#222"><span>⭐</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  L.marker(hotel.coords, { icon: hotelIcon })
    .addTo(map)
    .bindPopup(`<strong>${hotel.nome}</strong><br>${hotel.endereco}`);

  // Lugares
  for (const l of lugares) {
    if (!l.coords) continue;
    const meta = TIPO_META[l.tipo] || { icone: "📍", cor: "#888" };
    const popup = `
      <strong>${l.nome}</strong><br>
      <small>${l.endereco}</small><br>
      ${l.notas ? `<em>${l.notas}</em><br>` : ""}
      <a href="https://www.google.com/maps/dir/?api=1&origin=${hotel.coords[0]},${hotel.coords[1]}&destination=${l.coords[0]},${l.coords[1]}" target="_blank" rel="noopener">Como chegar →</a>
    `;
    L.marker(l.coords, { icon: makePinIcon(meta) })
      .addTo(map)
      .bindPopup(popup);
  }

  return map;
}

// Renderiza a legenda usando TIPO_META — uma "pílula" por tipo
export function renderLegenda(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const partes = Object.entries(TIPO_META).map(
    ([_, m]) => `
      <span class="legenda-item">
        <span class="legenda-dot" style="background:${m.cor}"></span>
        ${m.icone} ${m.label}
      </span>
    `
  );
  el.innerHTML = partes.join("");
}
