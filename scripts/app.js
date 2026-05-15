// =====================================================================
// APP — orquestra: chama renders, conecta interações, inicia mapa,
// countdown, tema e "modo agora".
// =====================================================================

import { LUGARES, ROTEIRO, COMPRAS, LOGISTICA, DISTANCIAS, VIAGEM } from "./data.js";
import { storage, theme as themeStore } from "./storage.js";
import {
  renderRestaurantes,
  renderCafes,
  renderBares,
  renderRoteiro,
  renderCompras,
  renderLogistica,
  renderDistancias,
} from "./render.js";
import { initMap, renderLegenda } from "./map.js";

// ---------------------------------------------------------------------
// 1. RENDERIZA TUDO uma vez no boot
// ---------------------------------------------------------------------
function renderAll() {
  renderRoteiro(ROTEIRO);
  renderRestaurantes();
  renderCafes();
  renderBares();
  renderCompras(COMPRAS);
  renderLogistica(LOGISTICA);
  renderDistancias(DISTANCIAS);
  renderLegenda("map-legenda");
}

// ---------------------------------------------------------------------
// 2. NAV — destaca o link da seção visível conforme rolagem
// ---------------------------------------------------------------------
function initNav() {
  const links = document.querySelectorAll("[data-nav]");
  const sections = [...links].map(a => document.querySelector(a.getAttribute("href")));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = "#" + e.target.id;
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(s => s && obs.observe(s));
}

// ---------------------------------------------------------------------
// 3. ROTEIRO — toggle dia + checkboxes persistidos
// ---------------------------------------------------------------------
function initRoteiroInteractions() {
  // toggle accordion
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-toggle-dia]");
    if (!btn) return;
    const dia = btn.closest(".dia");
    dia.dataset.open = dia.dataset.open === "true" ? "false" : "true";
  });

  // checkbox -> salva no localStorage + risca o item
  document.addEventListener("change", e => {
    const cb = e.target.closest("[data-check]");
    if (!cb) return;
    const id = cb.dataset.check;
    storage.set(id, cb.checked);
    const item = cb.closest(".dia-item");
    item.classList.toggle("done", cb.checked);
  });

  // botão "Limpar marcações"
  document.getElementById("reset-checks").addEventListener("click", () => {
    if (!confirm("Limpar todas as marcações do roteiro?")) return;
    storage.clear();
    document.querySelectorAll("[data-check]").forEach(cb => (cb.checked = false));
    document.querySelectorAll(".dia-item.done").forEach(i => i.classList.remove("done"));
  });
}

// ---------------------------------------------------------------------
// 4. FILTROS dos cards de restaurantes (tipo + reserva)
// ---------------------------------------------------------------------
function initFilters() {
  const groups = document.querySelectorAll("[data-filter-group]");
  const state = { tipo: "all", reserva: "all" };

  groups.forEach(group => {
    group.addEventListener("click", e => {
      const chip = e.target.closest(".chip");
      if (!chip) return;

      // troca o "active" no grupo
      group.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const isReservaGroup = group.dataset.filterGroup === "restaurantes-reserva";
      if (isReservaGroup) state.reserva = chip.dataset.filter;
      else state.tipo = chip.dataset.filter;

      aplicaFiltros(state);
    });
  });
}

function aplicaFiltros({ tipo, reserva }) {
  document.querySelectorAll("#restaurantes-grid .lugar-card").forEach(card => {
    const okTipo = tipo === "all" || card.dataset.tipo === tipo;
    const okRes = reserva === "all" || card.dataset.reserva === reserva;
    card.style.display = okTipo && okRes ? "" : "none";
  });
}

// ---------------------------------------------------------------------
// 5. THEME TOGGLE
// ---------------------------------------------------------------------
function initTheme() {
  const saved = themeStore.get();
  document.body.dataset.theme = saved;
  document.getElementById("theme-toggle").textContent = saved === "dark" ? "☀️" : "🌙";

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    themeStore.set(next);
    document.getElementById("theme-toggle").textContent = next === "dark" ? "☀️" : "🌙";
  });
}

// ---------------------------------------------------------------------
// 6. COUNTDOWN até o voo de volta
// ---------------------------------------------------------------------
function initCountdown() {
  const alvoIda = new Date(VIAGEM.dataIda).getTime();
  const alvoVolta = new Date(VIAGEM.dataVolta).getTime();

  function tick() {
    const agora = Date.now();
    // Antes da viagem: conta pra ida. Durante: conta pra volta.
    const alvo = agora < alvoIda ? alvoIda : alvoVolta;
    const label = agora < alvoIda ? "até embarcar" : "até decolar de volta";

    const diff = Math.max(0, alvo - agora);
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("cd-d").textContent = dias;
    document.getElementById("cd-h").textContent = horas;
    document.getElementById("cd-m").textContent = min;
    document.getElementById("cd-label").textContent = label;
  }

  tick();
  setInterval(tick, 30 * 1000); // atualiza a cada 30s
}

// ---------------------------------------------------------------------
// 7. "MODO AGORA" — destaca o item do roteiro mais próximo do horário
// atual quando a data cai dentro da viagem. Achata todos os itens em
// uma timeline e procura o último item cujo horário já passou.
// ---------------------------------------------------------------------
function initNowMode() {
  const card = document.getElementById("now-card");
  const title = document.getElementById("now-title");

  // Datas dos dias do roteiro — em ordem
  const datasDias = ["2026-05-15", "2026-05-16", "2026-05-17"];

  // Achata em [{ts, titulo}], onde ts é o instante esperado
  const linha = [];
  ROTEIRO.forEach((dia, idx) => {
    dia.itens.forEach(item => {
      const [h, m] = item.hora.split(":");
      // Se hora começa com 00 e o dia anterior, é madrugada do próximo
      let baseDay = datasDias[idx];
      if (parseInt(h) < 5 && idx > 0) baseDay = datasDias[idx];
      const ts = new Date(`${baseDay}T${item.hora}:00-03:00`).getTime();
      linha.push({ ts, titulo: item.titulo, dia: dia.dia });
    });
  });
  linha.sort((a, b) => a.ts - b.ts);

  function tick() {
    const agora = Date.now();
    const inicio = linha[0]?.ts ?? 0;
    const fim = linha[linha.length - 1]?.ts ?? 0;

    if (agora < inicio || agora > fim + 4 * 60 * 60 * 1000) {
      card.hidden = true;
      return;
    }

    // Último item com ts <= agora
    let atual = linha[0];
    for (const it of linha) {
      if (it.ts <= agora) atual = it;
      else break;
    }

    card.hidden = false;
    title.textContent = `${atual.dia} · ${atual.titulo}`;
  }

  tick();
  setInterval(tick, 60 * 1000);
}

// ---------------------------------------------------------------------
// 8. BOOT
// ---------------------------------------------------------------------
function boot() {
  renderAll();
  initNav();
  initRoteiroInteractions();
  initFilters();
  initTheme();
  initCountdown();
  initNowMode();

  // Mapa entra por último (depende do Leaflet ter carregado)
  initMap("map", LUGARES, VIAGEM.hotel);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
