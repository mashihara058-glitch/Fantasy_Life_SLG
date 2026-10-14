// 画面遷移と操作のつなぎ込み
(function () {
  const E = GAME.Engine;
  const UI = GAME.UI;
  const U = GAME.U;
  const $ = (id) => document.getElementById(id);

  const params = new URLSearchParams(location.search);
  const debug = params.has("debug");
  const fixedSeed = params.has("seed") ? Number(params.get("seed")) : null;
  const warnings = E.validateEvents();
  if (warnings.length) console.warn("イベントデータの警告:\n" + warnings.join("\n"));

  let state = null;

  const handlers = {
    debug,
    warnings,
    onChoose(index) {
      E.choose(state, index);
      render();
    },
    onNext() {
      E.nextYear(state);
      render();
    },
    onEnding() {
      UI.renderEnding(state);
      UI.showScreen("screen-ending");
    },
    onAuto(years) {
      const target = state.age + years;
      while (state.alive && state.age < target) {
        if (state.phase === "event") {
          const choices = E.visibleChoices(state);
          E.choose(state, U.pick(choices).index);
        } else if (state.phase === "result") {
          E.nextYear(state);
        }
      }
      render();
    },
  };

  function render() {
    UI.renderGame(state, handlers);
  }

  function refreshTitle() {
    $("btn-continue").hidden = !E.hasSave();
    UI.showScreen("screen-title");
  }

  function newCharacter(useFixedSeed) {
    state = E.createCharacter(useFixedSeed ? fixedSeed : null);
    UI.renderCreate(state);
    UI.showScreen("screen-create");
  }

  $("btn-new").addEventListener("click", () => newCharacter(true));
  $("btn-reroll").addEventListener("click", () => newCharacter(false));
  $("btn-create-back").addEventListener("click", refreshTitle);

  $("btn-start").addEventListener("click", () => {
    const name = $("input-name").value.trim();
    if (name) state.name = name;
    E.beginLife(state);
    UI.showScreen("screen-game");
    render();
  });

  $("btn-continue").addEventListener("click", () => {
    state = E.load();
    if (!state) return refreshTitle();
    if (!state.current) E.nextYear(state);
    UI.showScreen("screen-game");
    render();
  });

  $("btn-to-title").addEventListener("click", () => {
    if (state) E.save(state);
    refreshTitle();
  });

  $("btn-timeline").addEventListener("click", () => {
    UI.renderTimelineModal(state);
    $("timeline-modal").hidden = false;
  });
  $("timeline-important").addEventListener("change", () => UI.renderTimelineModal(state));
  $("btn-timeline-close").addEventListener("click", () => ($("timeline-modal").hidden = true));
  $("timeline-modal").addEventListener("click", (e) => {
    if (e.target.id === "timeline-modal") $("timeline-modal").hidden = true;
  });

  $("btn-new-life").addEventListener("click", () => {
    E.clearSave();
    newCharacter(false);
  });

  $("btn-copy").addEventListener("click", async () => {
    const text = E.timelineAsText(state);
    try {
      await navigator.clipboard.writeText(text);
      $("btn-copy").textContent = "コピーしました";
    } catch (e) {
      window.prompt("以下をコピーしてください", text);
    }
    setTimeout(() => ($("btn-copy").textContent = "年表をコピー"), 2000);
  });

  refreshTitle();
})();
