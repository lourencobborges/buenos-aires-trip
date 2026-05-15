// =====================================================================
// RENDER — funções puras que recebem dados e devolvem HTML.
// Toda manipulação visual passa por aqui pra deixar app.js limpo.
// =====================================================================

import { LUGARES, TIPO_META, RESERVA_META, VIAGEM } from "./data.js";
import { storage } from "./storage.js";

// Helper: HTML-escape pra evitar XSS em campos do data.js.
function esc(s) {
  if (s == null) return "";
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Link "Como chegar" — Google Maps direções do hotel até o destino
function linkComoChegar(coords) {
  const [hLat, hLng] = VIAGEM.hotel.coords;
  const [lat, lng] = coords;
  return `https://www.google.com/maps/dir/?api=1&origin=${hLat},${hLng}&destination=${lat},${lng}`;
}

// ---------------------------------------------------------------------
// CARD DE LUGAR — usado em restaurantes, cafés, bares
// ---------------------------------------------------------------------
export function lugarCardHTML(l) {
  const meta = TIPO_META[l.tipo] || { icone: "📍", label: l.tipo, cor: "#888" };
  const resMeta = RESERVA_META[l.reserva] || { label: l.reserva, cor: "#888" };

  const pedido = l.pedidoSugerido
    ? `<ul class="pedido-list">${l.pedidoSugerido.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`
    : "";

  const wa = l.telefone
    ? `<a class="mini-btn" href="https://wa.me/${l.telefone.replace(/[^0-9]/g, "")}" target="_blank" rel="noopener">WhatsApp</a>`
    : "";

  return `
    <article class="lugar-card" data-tipo="${esc(l.tipo)}" data-reserva="${esc(l.reserva)}">
      <div class="lugar-head">
        <div>
          <div class="lugar-nome">
            ${meta.icone} ${esc(l.nome)}
            ${l.destaque ? '<span class="lugar-star">★</span>' : ""}
          </div>
          <div class="lugar-tipo">${esc(meta.label)} · ${esc(l.bairro)}</div>
        </div>
        <span class="badge-reserva" style="background:${resMeta.cor}; color:white;">
          ${esc(resMeta.label)}
        </span>
      </div>

      <div class="lugar-endereco">📍 ${esc(l.endereco)}</div>

      ${l.notas ? `<div class="lugar-notas">${esc(l.notas)}</div>` : ""}
      ${pedido}

      <div class="lugar-actions">
        <a class="mini-btn" href="${linkComoChegar(l.coords)}" target="_blank" rel="noopener">Como chegar</a>
        ${wa}
      </div>

      ${l.indicacao ? `<div class="lugar-indicacao">Indicado por: ${esc(l.indicacao)}</div>` : ""}
    </article>
  `;
}

// ---------------------------------------------------------------------
// LISTAS POR SEÇÃO — filtram LUGARES por tipo
// ---------------------------------------------------------------------

export function renderRestaurantes() {
  const tipos = ["parrilla", "bodegon", "japa", "italiana", "judaica", "burger"];
  const lista = LUGARES.filter(l => tipos.includes(l.tipo));
  document.getElementById("restaurantes-grid").innerHTML =
    lista.map(lugarCardHTML).join("");
}

export function renderCafes() {
  const lista = LUGARES.filter(l => l.tipo === "cafe");
  document.getElementById("cafes-grid").innerHTML =
    lista.map(lugarCardHTML).join("");
}

export function renderBares() {
  const lista = LUGARES.filter(l => l.tipo === "bar" || l.tipo === "balada");
  document.getElementById("bares-grid").innerHTML =
    lista.map(lugarCardHTML).join("");
}

// ---------------------------------------------------------------------
// ROTEIRO — dia accordion com checkboxes persistidos
// ---------------------------------------------------------------------

export function renderRoteiro(roteiro) {
  const container = document.getElementById("roteiro-container");
  container.innerHTML = roteiro.map((dia, idx) => {
    const itensHTML = dia.itens.map((item, i) => {
      const id = `dia${idx}-item${i}`;
      const checked = storage.get(id) ? "checked" : "";
      const doneClass = storage.get(id) ? "done" : "";

      // Se o item tem lugarId, gera botão "Como chegar"
      const lugar = item.lugarId ? LUGARES.find(l => l.id === item.lugarId) : null;
      const acoes = lugar
        ? `<div class="dia-item-actions">
             <a class="mini-btn" href="${linkComoChegar(lugar.coords)}" target="_blank" rel="noopener">Como chegar</a>
             <a class="mini-btn" href="#${lugar.tipo === "cafe" ? "cafes" : lugar.tipo === "bar" || lugar.tipo === "balada" ? "bares" : "restaurantes"}">Ver card →</a>
           </div>`
        : "";

      return `
        <label class="dia-item ${doneClass} ${item.destaque ? "destaque" : ""}" data-item-id="${id}">
          <input type="checkbox" data-check="${id}" ${checked} />
          <span class="dia-item-hora">${esc(item.hora)}</span>
          <div class="dia-item-body">
            <div class="dia-item-title">${esc(item.titulo)}</div>
            ${item.desc ? `<div class="dia-item-desc">${esc(item.desc)}</div>` : ""}
            ${acoes}
          </div>
        </label>
      `;
    }).join("");

    // Primeiro dia abre por default
    const open = idx === 0 ? "true" : "false";

    return `
      <div class="dia" data-dia-idx="${idx}" data-open="${open}">
        <button class="dia-head" data-toggle-dia="${idx}">
          <div>
            <div class="dia-titulo">${esc(dia.dia)}</div>
            <div class="dia-sub">${esc(dia.titulo)}</div>
          </div>
          <span class="chevron">▾</span>
        </button>
        <div class="dia-body">
          ${itensHTML}
        </div>
      </div>
    `;
  }).join("");
}

// ---------------------------------------------------------------------
// COMPRAS — agrupado
// ---------------------------------------------------------------------

export function renderCompras(compras) {
  const grupos = [
    { titulo: "Moda feminina", chave: "modaFeminina" },
    { titulo: "Couro argentino", chave: "couro" },
    { titulo: "Áreas de compras", chave: "areas" },
    { titulo: "Feiras e mercados", chave: "feiras" },
    { titulo: "Vinhos", chave: "vinhos" },
  ];

  document.getElementById("compras-container").innerHTML = grupos.map(g => `
    <div class="compras-grupo">
      <h3>${esc(g.titulo)}</h3>
      ${compras[g.chave].map(item => `
        <div class="compras-item">
          <strong>${esc(item.nome)}</strong>
          <span>${esc(item.desc)}</span>
        </div>
      `).join("")}
    </div>
  `).join("");
}

// ---------------------------------------------------------------------
// LOGÍSTICA + DISTÂNCIAS
// ---------------------------------------------------------------------

export function renderLogistica(logistica) {
  document.getElementById("logistica-container").innerHTML = logistica.map(g => `
    <div class="logistica-grupo">
      <h3>${esc(g.grupo)}</h3>
      <ul>${g.itens.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>
  `).join("");
}

export function renderDistancias(distancias) {
  const tbody = document.querySelector("#distancias-table tbody");
  tbody.innerHTML = distancias.map(([lugar, pe, carro]) => `
    <tr>
      <td>${esc(lugar)}</td>
      <td>${esc(pe)}</td>
      <td>${esc(carro)}</td>
    </tr>
  `).join("");
}
