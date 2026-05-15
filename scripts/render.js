// =====================================================================
// RENDER — produz HTML das listas e do bottom-sheet de detalhe.
// Cards são compactos por padrão: nome + tipo + bairro + reserva.
// Tap abre o sheet com endereço, notas, sugestões e ações.
// =====================================================================

import { LUGARES, TIPO_META, RESERVA_META, VIAGEM } from "./data.js";
import { storage } from "./storage.js";

function esc(s) {
  if (s == null) return "";
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function linkComoChegar(coords) {
  const [hLat, hLng] = VIAGEM.hotel.coords;
  const [lat, lng] = coords;
  return `https://www.google.com/maps/dir/?api=1&origin=${hLat},${hLng}&destination=${lat},${lng}`;
}

function linkMapsLugar(coords, nome) {
  const [lat, lng] = coords;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(nome)}`;
}

// ---------------------------------------------------------------------
// CARD compacto — usado em listas. Tap delega no app.js pra abrir sheet.
// ---------------------------------------------------------------------
export function lugarCardHTML(l) {
  const meta = TIPO_META[l.tipo] || { icone: "📍", label: l.tipo };
  const resMeta = RESERVA_META[l.reserva] || { label: l.reserva };

  // Pra lojas: troca o badge de "Walk-in" por "Fecha dom" quando aplicável.
  const isCompras = l.tipo === "compras";
  const badgeHTML = isCompras
    ? (l.fechaDom
        ? `<span class="closed-tag">Fecha dom</span>`
        : `<span class="open-tag">Abre dom</span>`)
    : `<span class="reserva-pill" data-r="${esc(l.reserva)}">${esc(resMeta.label)}</span>`;

  return `
    <article class="lugar-card ${l.destaque ? "destaque" : ""}"
             data-tipo="${esc(l.tipo)}"
             data-reserva="${esc(l.reserva)}"
             data-lugar-id="${esc(l.id)}">
      <div class="lugar-head">
        <div>
          <div class="lugar-nome">
            <span class="lugar-icon">${meta.icone}</span>
            ${esc(l.nome)}
            ${l.destaque ? '<span class="lugar-star">★</span>' : ""}
          </div>
          <div class="lugar-meta">
            <span>${esc(meta.label)}</span>
            <span class="dot"></span>
            <span>${esc(l.bairro)}</span>
          </div>
        </div>
        ${badgeHTML}
      </div>
    </article>
  `;
}

// ---------------------------------------------------------------------
// DETALHE — preenche o bottom-sheet quando o usuário toca num card.
// ---------------------------------------------------------------------
export function lugarDetalheHTML(id) {
  const l = LUGARES.find(x => x.id === id);
  if (!l) return "";
  const meta = TIPO_META[l.tipo] || { icone: "📍", label: l.tipo };
  const resMeta = RESERVA_META[l.reserva] || { label: l.reserva };

  const pedido = l.pedidoSugerido
    ? `
      <div class="detail-section">
        <h4>Sugestões de pedido</h4>
        <ul>${l.pedidoSugerido.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>`
    : "";

  const notas = l.notas
    ? `
      <div class="detail-section">
        <h4>Notas</h4>
        <p>${esc(l.notas)}</p>
      </div>`
    : "";

  const wa = l.telefone
    ? `<a class="mini-btn" href="https://wa.me/${l.telefone.replace(/[^0-9]/g, "")}" target="_blank" rel="noopener">WhatsApp</a>`
    : "";

  return `
    <div class="detail-meta">${meta.icone} ${esc(meta.label)} · ${esc(l.bairro)}
      &nbsp;·&nbsp;<span style="color:var(--ink-2)">${esc(resMeta.label)}</span></div>
    <h3 class="detail-name">${esc(l.nome)} ${l.destaque ? '<span class="lugar-star">★</span>' : ""}</h3>

    <div class="detail-section">
      <h4>Endereço</h4>
      <p>${esc(l.endereco)}</p>
    </div>

    ${notas}
    ${pedido}

    <div class="detail-actions">
      <a class="mini-btn mini-btn--primary" href="${linkComoChegar(l.coords)}" target="_blank" rel="noopener">Como chegar</a>
      <a class="mini-btn" href="${linkMapsLugar(l.coords, l.nome)}" target="_blank" rel="noopener">Ver no mapa</a>
      ${wa}
    </div>

    ${l.indicacao ? `<div class="detail-indicacao">Indicado por: ${esc(l.indicacao)}</div>` : ""}
  `;
}

// ---------------------------------------------------------------------
// LISTAS por categoria
// ---------------------------------------------------------------------
export function renderRestaurantes() {
  const tipos = ["parrilla", "bodegon", "japa", "italiana"];
  const lista = LUGARES.filter(l => tipos.includes(l.tipo));
  document.getElementById("restaurantes-grid").innerHTML = lista.map(lugarCardHTML).join("");
}

export function renderCafes() {
  const lista = LUGARES.filter(l => l.tipo === "cafe");
  document.getElementById("cafes-grid").innerHTML = lista.map(lugarCardHTML).join("");
}

export function renderBares() {
  const lista = LUGARES.filter(l => l.tipo === "bar" || l.tipo === "balada");
  document.getElementById("bares-grid").innerHTML = lista.map(lugarCardHTML).join("");
}

export function renderCompras() {
  // destaque (faz questão) primeiro, depois resto
  const lista = LUGARES.filter(l => l.tipo === "compras")
    .sort((a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)));
  document.getElementById("compras-grid").innerHTML = lista.map(lugarCardHTML).join("");
}

// ---------------------------------------------------------------------
// ROTEIRO — tabs de dia + lista com checkbox custom
// ---------------------------------------------------------------------

// Ícone SVG do "check" preenchido — pequeno, vai dentro do círculo
const CHECK_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export function renderRoteiro(roteiro) {
  // Tabs
  const tabs = roteiro.map((dia, idx) => {
    const partes = dia.dia.split(" "); // ex: "Sexta 15/05"
    return `
      <button class="day-tab" data-day-tab="${idx}" data-active="${idx === 0}">
        <small>${esc(partes[0])}</small>
        ${esc(partes[1] || "")}
      </button>
    `;
  }).join("");
  document.getElementById("day-tabs").innerHTML = tabs;

  // Conteúdo de cada dia
  const dias = roteiro.map((dia, idx) => {
    const itens = dia.itens.map((item, i) => {
      const id = `dia${idx}-item${i}`;
      const checked = storage.get(id);
      const lugar = item.lugarId ? LUGARES.find(l => l.id === item.lugarId) : null;

      const acoes = lugar
        ? `
          <div class="item-actions">
            <a class="mini-btn mini-btn--primary" href="${linkComoChegar(lugar.coords)}" target="_blank" rel="noopener" data-stop>Como chegar</a>
            <button class="mini-btn" data-open-detail="${esc(lugar.id)}">Ver detalhes</button>
          </div>`
        : "";

      // Linhas extras (indicado por + alternativa) só aparecem na expansão
      const indicadoPor = lugar?.indicacao
        ? `<div class="item-extra"><strong>Indicado por:</strong> ${esc(lugar.indicacao)}</div>`
        : "";
      const alternativa = item.alternativa
        ? `<div class="item-extra"><strong>Alternativa:</strong> ${esc(item.alternativa)}</div>`
        : "";

      return `
        <div class="dia-item ${checked ? "done" : ""} ${item.destaque ? "destaque" : ""}"
             data-check-id="${id}"
             data-open="false">
          <div class="checkbox" data-toggle-check>${CHECK_SVG}</div>
          <div class="item-time">${esc(item.hora)}</div>
          <div class="item-body">
            <div class="item-title">${esc(item.titulo)}</div>
            ${item.desc ? `<div class="item-desc">${esc(item.desc)}</div>` : ""}
            ${indicadoPor}
            ${alternativa}
            ${acoes}
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="dia" data-dia-idx="${idx}" data-active="${idx === 0}">
        ${itens}
      </div>
    `;
  }).join("");

  document.getElementById("roteiro-container").innerHTML = dias;
}

