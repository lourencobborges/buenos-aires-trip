// =====================================================================
// APP — boot + interações.
// Conecta: tabs de dia, checkbox custom, bottom-sheet de detalhe,
// "Mais" menu, filtros, tema, countdown, progress bar, modo "agora".
// =====================================================================

import { LUGARES, ROTEIRO, LOGISTICA, DISTANCIAS, VIAGEM } from "./data.js";
import { storage, theme as themeStore } from "./storage.js";
import {
  renderRestaurantes, renderCafes, renderBares,
  renderRoteiro, renderLogistica, renderDistancias,
  lugarDetalheHTML,
} from "./render.js";
import { initMap, renderLegenda } from "./map.js";

// ---------------------------------------------------------------------
// Helpers DOM
// ---------------------------------------------------------------------
const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

// ---------------------------------------------------------------------
// 1. RENDER inicial
// ---------------------------------------------------------------------
function renderAll() {
  renderRoteiro(ROTEIRO);
  renderRestaurantes();
  renderCafes();
  renderBares();
  renderLogistica(LOGISTICA);
  renderDistancias(DISTANCIAS);
  renderLegenda("map-legenda");
  updateProgress();
}

// ---------------------------------------------------------------------
// 2. NAV — destaca bottom nav conforme rolagem
// ---------------------------------------------------------------------
function initNav() {
  const links = $$("[data-nav]");
  const sectionIds = ["visao", "roteiro", "comer", "cafes", "bares", "mapa", "logistica"];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  // Mapeia cada seção pro link mais próximo (alguns links representam várias seções)
  function linkParaSecao(id) {
    if (["cafes", "bares", "logistica"].includes(id)) return links.find(l => l.id === "more-btn") || null;
    return links.find(l => l.getAttribute("href") === "#" + id) || null;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        const target = linkParaSecao(id);
        if (!target) return;
        links.forEach(l => l.classList.toggle("active", l === target));
      }
    });
  }, { rootMargin: "-50% 0px -45% 0px" });

  sections.forEach(s => obs.observe(s));

  // Fecha o "Mais" ao clicar num link
  $$(".more-link").forEach(a => a.addEventListener("click", closeMoreSheet));
}

// ---------------------------------------------------------------------
// 3. ROTEIRO — tabs + checkbox custom + abrir descrição
// ---------------------------------------------------------------------
function initRoteiroInteractions() {
  // Tabs de dia
  document.addEventListener("click", e => {
    const tab = e.target.closest("[data-day-tab]");
    if (tab) {
      const idx = tab.dataset.dayTab;
      $$("[data-day-tab]").forEach(t => t.dataset.active = String(t.dataset.dayTab === idx));
      $$("[data-dia-idx]").forEach(d => d.dataset.active = String(d.dataset.diaIdx === idx));
      return;
    }

    // Toggle de check
    const checkBtn = e.target.closest("[data-toggle-check]");
    if (checkBtn) {
      e.stopPropagation();
      const item = checkBtn.closest(".dia-item");
      const id = item.dataset.checkId;
      const novo = storage.toggle(id);
      item.classList.toggle("done", novo);
      updateProgress();
      return;
    }

    // Botão "Ver detalhes" dentro do roteiro
    const detailBtn = e.target.closest("[data-open-detail]");
    if (detailBtn) {
      e.stopPropagation();
      openDetail(detailBtn.dataset.openDetail);
      return;
    }

    // Tap em link com data-stop não dobra como toggle
    if (e.target.closest("[data-stop]")) {
      e.stopPropagation();
      return;
    }

    // Tap em qualquer outro lugar do item: abre/fecha descrição
    const item = e.target.closest(".dia-item");
    if (item) {
      const open = item.dataset.open === "true";
      item.dataset.open = String(!open);
    }
  });

  // Limpar marcações
  $("#reset-checks").addEventListener("click", () => {
    if (!confirm("Limpar todas as marcações do roteiro?")) return;
    storage.clear();
    $$(".dia-item").forEach(i => i.classList.remove("done"));
    updateProgress();
  });
}

// ---------------------------------------------------------------------
// 4. PROGRESS BAR — % do roteiro completo
// ---------------------------------------------------------------------
function updateProgress() {
  const itens = $$(".dia-item");
  const total = itens.length;
  if (!total) return;
  const feitos = itens.filter(i => i.classList.contains("done")).length;
  const pct = Math.round((feitos / total) * 100);
  $("#progress-fill").style.width = pct + "%";
  $("#progress-count").textContent = `${feitos} / ${total}`;
}

// ---------------------------------------------------------------------
// 5. FILTROS — selects
// ---------------------------------------------------------------------
function initFilters() {
  const state = { tipo: "all", reserva: "all" };
  const apply = () => {
    $$("#restaurantes-grid .lugar-card").forEach(card => {
      const okT = state.tipo === "all" || card.dataset.tipo === state.tipo;
      const okR = state.reserva === "all" || card.dataset.reserva === state.reserva;
      card.style.display = okT && okR ? "" : "none";
    });
  };
  $("#filter-tipo").addEventListener("change", e => { state.tipo = e.target.value; apply(); });
  $("#filter-reserva").addEventListener("change", e => { state.reserva = e.target.value; apply(); });
}

// ---------------------------------------------------------------------
// 6. CARDS de lugar → bottom-sheet de detalhe
// ---------------------------------------------------------------------
function initCardTaps() {
  document.addEventListener("click", e => {
    const card = e.target.closest(".lugar-card");
    if (!card) return;
    openDetail(card.dataset.lugarId);
  });
}

function openDetail(id) {
  $("#detail-body").innerHTML = lugarDetalheHTML(id);
  $("#detail-sheet").hidden = false;
  $("#detail-backdrop").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  $("#detail-sheet").hidden = true;
  $("#detail-backdrop").hidden = true;
  document.body.style.overflow = "";
}

function initDetailSheet() {
  $("#detail-close").addEventListener("click", closeDetail);
  $("#detail-backdrop").addEventListener("click", closeDetail);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !$("#detail-sheet").hidden) closeDetail();
  });

  // Swipe down pra fechar (gesto simples)
  const sheet = $("#detail-sheet");
  let startY = null;
  sheet.addEventListener("touchstart", e => { startY = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener("touchend", e => {
    if (startY === null) return;
    const dy = e.changedTouches[0].clientY - startY;
    if (dy > 80 && sheet.scrollTop === 0) closeDetail();
    startY = null;
  }, { passive: true });
}

// ---------------------------------------------------------------------
// 7. MENU "MAIS"
// ---------------------------------------------------------------------
function initMoreSheet() {
  const btn = $("#more-btn");
  const sheet = $("#more-sheet");
  const bd = $("#sheet-backdrop");

  function open() {
    sheet.hidden = false;
    bd.hidden = false;
  }
  function close() {
    sheet.hidden = true;
    bd.hidden = true;
  }

  btn.addEventListener("click", () => {
    sheet.hidden ? open() : close();
  });
  bd.addEventListener("click", close);
  window.closeMoreSheet = close;
}

function closeMoreSheet() {
  $("#more-sheet").hidden = true;
  $("#sheet-backdrop").hidden = true;
}

// ---------------------------------------------------------------------
// 8. THEME
// ---------------------------------------------------------------------
function initTheme() {
  const saved = themeStore.get();
  document.body.dataset.theme = saved;
  refreshThemeIcon(saved);

  $("#theme-toggle").addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    themeStore.set(next);
    refreshThemeIcon(next);
  });
}

function refreshThemeIcon(t) {
  const el = $("#theme-icon");
  if (!el) return;
  // sol em dark, lua em light
  el.innerHTML = t === "dark"
    ? `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>`
    : `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
}

// ---------------------------------------------------------------------
// 9. COUNTDOWN — só aparece a partir de uns dias antes
// ---------------------------------------------------------------------
function initCountdown() {
  const alvoIda = new Date(VIAGEM.dataIda).getTime();
  const alvoVolta = new Date(VIAGEM.dataVolta).getTime();
  const cd = $("#countdown");

  function tick() {
    const agora = Date.now();
    const alvo = agora < alvoIda ? alvoIda : alvoVolta;
    const label = agora < alvoIda ? "até embarcar" : "até decolar de volta";
    const diff = Math.max(0, alvo - agora);

    // Só mostra se faltar menos de 30 dias
    if (diff > 30 * 86400000) {
      cd.hidden = true;
      return;
    }
    cd.hidden = false;

    const dias = Math.floor(diff / 86400000);
    const horas = Math.floor((diff / 3600000) % 24);
    const min = Math.floor((diff / 60000) % 60);

    $("#cd-d").textContent = dias;
    $("#cd-h").textContent = horas;
    $("#cd-m").textContent = min;
    $("#cd-label").textContent = label;
  }

  tick();
  setInterval(tick, 30000);
}

// ---------------------------------------------------------------------
// 10. MODO AGORA
// ---------------------------------------------------------------------
function initNowMode() {
  const card = $("#now-card");
  const title = $("#now-title");
  const datasDias = ["2026-05-15", "2026-05-16", "2026-05-17"];

  const linha = [];
  ROTEIRO.forEach((dia, idx) => {
    dia.itens.forEach(item => {
      const baseDay = datasDias[idx];
      const ts = new Date(`${baseDay}T${item.hora}:00-03:00`).getTime();
      linha.push({ ts, titulo: item.titulo, dia: dia.dia });
    });
  });
  linha.sort((a, b) => a.ts - b.ts);

  function tick() {
    if (!linha.length) return;
    const agora = Date.now();
    const inicio = linha[0].ts;
    const fim = linha[linha.length - 1].ts;
    if (agora < inicio || agora > fim + 4 * 3600000) { card.hidden = true; return; }

    let atual = linha[0];
    for (const it of linha) {
      if (it.ts <= agora) atual = it; else break;
    }
    card.hidden = false;
    title.textContent = `${atual.dia} · ${atual.titulo}`;
  }

  tick();
  setInterval(tick, 60000);
}

// ---------------------------------------------------------------------
// BOOT
// ---------------------------------------------------------------------
function boot() {
  renderAll();
  initNav();
  initRoteiroInteractions();
  initFilters();
  initCardTaps();
  initDetailSheet();
  initMoreSheet();
  initTheme();
  initCountdown();
  initNowMode();
  initMap("map", LUGARES, VIAGEM.hotel);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
