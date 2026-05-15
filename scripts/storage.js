// =====================================================================
// STORAGE — wrapper fino do localStorage.
// Centraliza a chave e protege contra storage indisponível (modo privado,
// quota cheia, etc). Devolve um objeto {get, set, toggle, clear}.
// =====================================================================

const KEY = "ba-trip-state-v1";

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {
    // Se falhar (quota, modo privado), seguimos sem persistir.
  }
}

export const storage = {
  get(id) {
    return Boolean(readAll()[id]);
  },
  set(id, value) {
    const all = readAll();
    if (value) all[id] = true;
    else delete all[id];
    writeAll(all);
  },
  toggle(id) {
    const all = readAll();
    all[id] = !all[id];
    if (!all[id]) delete all[id];
    writeAll(all);
    return Boolean(all[id]);
  },
  clear() {
    writeAll({});
  },
};

// ---------------------------------------------------------------------
// THEME — tema salvo separado, com chave própria
// ---------------------------------------------------------------------

const THEME_KEY = "ba-trip-theme";

export const theme = {
  get() {
    try { return localStorage.getItem(THEME_KEY) || "light"; }
    catch { return "light"; }
  },
  set(t) {
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  },
};
