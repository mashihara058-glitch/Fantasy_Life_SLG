// ゲーム全体の名前空間と共通ユーティリティ。最初に読み込むこと。
window.GAME = window.GAME || {};

GAME.data = {
  events: [],
  species: {},
  enabledSpecies: [],
  origins: {},
  traits: {},
  traitCount: [1, 2],
  jobs: {},
  livingCost: 40,
  names: {},
};

// イベントファイルから呼ぶ登録関数
GAME.registerEvents = function (events) {
  GAME.data.events.push(...events);
};

GAME.U = (function () {
  // シード付き乱数（mulberry32）。状態はセーブデータ内に持つ。
  let rngState = null;

  function setRng(state) {
    rngState = state;
  }

  function random() {
    if (!rngState) return Math.random();
    rngState.state = (rngState.state + 0x6d2b79f5) >>> 0;
    let t = rngState.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function randInt(min, max) {
    return min + Math.floor(random() * (max - min + 1));
  }

  function pick(arr) {
    return arr[Math.floor(random() * arr.length)];
  }

  function weightedPick(items, getWeight) {
    const weights = items.map((it) => Math.max(0, getWeight(it)));
    const total = weights.reduce((a, b) => a + b, 0);
    if (total <= 0) return items.length ? pick(items) : null;
    let r = random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r < 0) return items[i];
    }
    return items[items.length - 1];
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  // 数値 or [最小, 最大] の範囲指定を数値にする
  function resolve(v) {
    if (Array.isArray(v)) return randInt(v[0], v[1]);
    return v;
  }

  function toArray(v) {
    if (v == null) return [];
    return Array.isArray(v) ? v : [v];
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  return { setRng, random, randInt, pick, weightedPick, shuffle, clamp, resolve, toArray, escapeHtml };
})();
