// 実績の解除・永続化（人生セーブとは別。新しい人生でも消えない）
GAME.Achievements = (function () {
  const META_KEY = "lifeSLG.achievements";
  const META_VERSION = 1;
  const MEDIC_TABOO_FLAGS = [
    "medic_aphrodisiac",
    "medic_truth_harsh",
    "medic_truth_mercy",
    "medic_sacrifice",
    "medic_palliative",
  ];

  function defs() {
    return GAME.data.achievements || [];
  }

  function loadMeta() {
    try {
      const raw = localStorage.getItem(META_KEY);
      if (!raw) return { version: META_VERSION, unlocked: {} };
      const obj = JSON.parse(raw);
      if (!obj || typeof obj !== "object") return { version: META_VERSION, unlocked: {} };
      if (!obj.unlocked || typeof obj.unlocked !== "object") obj.unlocked = {};
      obj.version = META_VERSION;
      return obj;
    } catch (e) {
      return { version: META_VERSION, unlocked: {} };
    }
  }

  function saveMeta(meta) {
    try {
      localStorage.setItem(META_KEY, JSON.stringify(meta));
    } catch (e) {
      console.warn("実績の保存に失敗しました", e);
    }
  }

  function isUnlocked(id) {
    return !!loadMeta().unlocked[id];
  }

  function unlock(id) {
    const meta = loadMeta();
    if (meta.unlocked[id]) return null;
    const def = defs().find((a) => a.id === id);
    if (!def) return null;
    meta.unlocked[id] = { at: Date.now() };
    saveMeta(meta);
    return def;
  }

  function hasFlag(state, f) {
    return state.flags && state.flags.includes(f);
  }

  function hadJob(state, jobId) {
    if (state.job === jobId) return true;
    return (state.jobHistory || []).some((h) => h.job === jobId);
  }

  function test(state, id) {
    switch (id) {
      case "medic_taboo":
        return MEDIC_TABOO_FLAGS.some((f) => hasFlag(state, f));
      case "sold_as_slave":
        return hasFlag(state, "slave") || state.job === "slave";
      case "die_in_battle":
        return !state.alive && state.causeOfDeath === "戦死";
      case "die_of_old_age":
        return !state.alive && state.causeOfDeath === "老衰";
      case "betrayed_by_friend":
        return hasFlag(state, "betrayed_by_friend");
      case "become_gambler":
        return hadJob(state, "gambler");
      case "farmer_revolt_culled":
        return (
          hasFlag(state, "farmer_revolt_leader") ||
          hasFlag(state, "farmer_revolt_enslaved") ||
          (!state.alive &&
            state.causeOfDeath === "処刑" &&
            hasFlag(state, "farmer_revolt_done"))
        );
      default:
        return false;
    }
  }

  // 効果適用後に呼ぶ。新規に解除した実績の配列を返す
  function evaluate(state) {
    const newly = [];
    defs().forEach((a) => {
      if (isUnlocked(a.id)) return;
      if (!test(state, a.id)) return;
      const def = unlock(a.id);
      if (def) newly.push(def);
    });
    return newly;
  }

  function listForUi() {
    const meta = loadMeta();
    return defs().map((a) => ({
      ...a,
      unlocked: !!meta.unlocked[a.id],
      unlockedAt: meta.unlocked[a.id] ? meta.unlocked[a.id].at : null,
    }));
  }

  function progress() {
    const list = listForUi();
    return {
      unlocked: list.filter((a) => a.unlocked).length,
      total: list.length,
    };
  }

  return {
    evaluate,
    listForUi,
    progress,
    isUnlocked,
  };
})();
