// 画面の描画
GAME.UI = (function () {
  const E = GAME.Engine;
  const U = GAME.U;
  const data = GAME.data;
  const esc = U.escapeHtml;

  const $ = (id) => document.getElementById(id);

  function multiline(text) {
    return esc(text).replace(/\n/g, "<br />");
  }

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    window.scrollTo(0, 0);
  }

  function traitNames(state) {
    return state.traits.map((t) => (data.traits[t] ? data.traits[t].name : t)).join("・") || "—";
  }

  function genderLabel(g) {
    return g === "male" ? "男性" : "女性";
  }

  // ---------- 主人公作成 ----------

  function renderCreate(state) {
    $("create-body").innerHTML = `
      <label class="field">
        <span>名前</span>
        <input id="input-name" type="text" maxlength="12" value="${esc(state.name)}" />
      </label>
      <dl class="profile-list">
        <dt>家名</dt><dd>${esc(state.familyName)}</dd>
        <dt>性別</dt><dd>${genderLabel(state.gender)}</dd>
        <dt>種族</dt><dd>${esc(E.speciesLabel(state))}</dd>
        <dt>出自</dt><dd>${esc(data.origins[state.origin].name)}</dd>
        <dt>性格</dt><dd>${esc(traitNames(state))}</dd>
        <dt>父</dt><dd>${esc(E.activeNpcs(state, "father")[0].name)}</dd>
        <dt>母</dt><dd>${esc(E.activeNpcs(state, "mother")[0].name)}</dd>
        <dt>兄弟</dt><dd>${
          E.activeNpcs(state, "sibling")
            .map((n) => `${esc(E.npcLabel(state, n))}の${esc(n.name)}（${E.npcAge(state, n)}歳）`)
            .join("、") || "なし（第一子）"
        }</dd>
      </dl>
      ${statBars(state)}
    `;
  }

  // ---------- 人生進行 ----------

  function statBars(state) {
    const bar = (key) => {
      const v = state.stats[key];
      return `
        <div class="stat">
          <span class="stat-label">${E.STAT_LABELS[key]}</span>
          <div class="bar"><div class="bar-fill ${key}" style="width:${v}%"></div></div>
          <span class="stat-value">${v}</span>
        </div>`;
    };
    const money = state.moneyUnlocked
      ? `<span class="${state.stats.money < 0 ? "negative" : ""}">${state.stats.money} G</span>`
      : `<span class="muted">家族が管理</span>`;
    return `
      <div class="stats">
        ${bar("health")}${bar("ability")}${bar("reputation")}
        <div class="stat money"><span class="stat-label">所持金</span>${money}</div>
      </div>`;
  }

  function npcList(state) {
    const active = E.activeNpcs(state);
    const gone = state.npcs.filter((n) => n.status !== "active");
    const item = (n) => `
      <li>
        <span class="npc-role">${esc(E.npcLabel(state, n))}</span>
        <span class="npc-name">${esc(n.name)}</span>
        <span class="npc-age">${E.npcAge(state, n)}歳</span>
        <span class="npc-rel">信頼${n.trust}・親密${n.intimacy}</span>
      </li>`;
    const goneItem = (n) => `
      <li class="gone">
        <span class="npc-role">${esc(E.npcLabel(state, n))}</span>
        <span class="npc-name">${esc(n.name)}</span>
        <span class="npc-rel">${esc(E.statusLabel(n.status))}</span>
      </li>`;
    return `
      <h3>人間関係</h3>
      <ul class="npc-list">${active.map(item).join("") || '<li class="muted">なし</li>'}</ul>
      ${gone.length ? `<details><summary>亡くなった人・離れた人・行方不明（${gone.length}）</summary><ul class="npc-list">${gone.map(goneItem).join("")}</ul></details>` : ""}
    `;
  }

  function renderStatus(state) {
    $("header-name").textContent = `${E.fullName(state)}　${state.age}歳`;
    $("status-panel").innerHTML = `
      <div class="age-big">${state.age}<small>歳</small></div>
      <dl class="profile-list">
        <dt>種族</dt><dd>${esc(E.speciesLabel(state))}・${genderLabel(state.gender)}</dd>
        <dt>出自</dt><dd>${esc(data.origins[state.origin].name)}</dd>
        <dt>性格</dt><dd>${esc(traitNames(state))}</dd>
        <dt>職業</dt><dd>${state.job || state.moneyUnlocked ? esc(E.jobName(state)) : "—"}</dd>
      </dl>
      ${statBars(state)}
      ${npcList(state)}
    `;
  }

  function renderEvent(state, handlers) {
    const ev = E.currentEvent(state);
    const panel = $("event-panel");
    if (!ev) {
      panel.innerHTML = `<p>イベントがありません。</p>`;
      return;
    }
    const cur = state.current;
    const yearLines = cur.yearLines && cur.yearLines.length
      ? `<ul class="year-lines">${cur.yearLines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`
      : "";
    const image = ev.image ? `<img class="event-image" src="${esc(ev.image)}" alt="" />` : "";
    const text = `<p class="event-text">${multiline(E.renderText(state, ev.text))}</p>`;

    let body = "";
    if (state.phase === "event") {
      const choices = E.visibleChoices(state);
      body = `<div class="choices">${choices
        .map(
          (c) => `<button class="btn choice" data-index="${c.index}">
            ${esc(c.text)}${c.hint ? `<small class="hint">${esc(c.hint)}</small>` : ""}
          </button>`
        )
        .join("")}</div>`;
    } else {
      const r = state.lastResult || { changes: [] };
      const badge = r.check
        ? `<span class="badge ${r.check.ok ? "ok" : "ng"}">${r.check.ok ? "成功" : "失敗"}</span>`
        : "";
      body = `
        <div class="result">
          <p class="chosen">▶ ${esc(r.choiceText || "")} ${badge}</p>
          ${r.resultText ? `<p class="result-text">${multiline(r.resultText)}</p>` : ""}
          ${r.changes.length ? `<ul class="changes">${r.changes.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
        </div>
        <div class="choices">
          ${state.phase === "dead"
            ? `<button id="btn-ending" class="btn primary">人生を振り返る</button>`
            : `<button id="btn-next" class="btn primary">次の年へ</button>`}
        </div>`;
    }

    panel.innerHTML = `
      <div class="event-age">${state.age}歳の出来事</div>
      ${yearLines}${image}${text}${body}
    `;

    panel.querySelectorAll(".choice").forEach((b) =>
      b.addEventListener("click", () => handlers.onChoose(Number(b.dataset.index)))
    );
    const next = $("btn-next");
    if (next) next.addEventListener("click", handlers.onNext);
    const end = $("btn-ending");
    if (end) end.addEventListener("click", handlers.onEnding);
  }

  function renderGame(state, handlers) {
    renderStatus(state);
    renderEvent(state, handlers);
    if (handlers.debug) renderDebug(state, handlers);
  }

  // ---------- 年表 ----------

  function timelineHtml(state, importantOnly) {
    const entries = state.timeline.filter((e) => !importantOnly || e.important);
    if (!entries.length) return `<p class="muted">まだ記録はありません。</p>`;
    return `<ol class="timeline">${entries
      .map(
        (e) => `
        <li class="${e.important ? "important" : "minor"}">
          <div class="tl-age">${e.age}歳</div>
          <div class="tl-body">
            <div class="tl-title">${esc(e.title)}</div>
            ${e.text ? `<div class="tl-text">${esc(e.text)}</div>` : ""}
          </div>
        </li>`
      )
      .join("")}</ol>`;
  }

  function renderTimelineModal(state) {
    const importantOnly = $("timeline-important").checked;
    $("timeline-body").innerHTML = timelineHtml(state, importantOnly);
  }

  // ---------- エンディング ----------

  function renderEnding(state) {
    const lastJob = state.jobHistory.length ? E.jobName(state) : "なし";
    const money = state.moneyUnlocked ? `${state.stats.money} G` : "—";
    $("ending-body").innerHTML = `
      <div class="ending-head">
        <h1 class="life-title">${esc(E.lifeTitle(state))}</h1>
        <p class="life-sub">${esc(E.fullName(state))}<br />
          ${esc(E.speciesLabel(state))}・${esc(E.mainJobName(state))}・享年${state.age}歳</p>
        <p class="cause">最期：${esc(state.causeOfDeath || "不明")}</p>
      </div>
      <div class="ending-grid">
        <div>
          <h3>最終ステータス</h3>
          <dl class="profile-list">
            <dt>健康</dt><dd>${state.stats.health}</dd>
            <dt>能力</dt><dd>${state.stats.ability}</dd>
            <dt>評判</dt><dd>${state.stats.reputation}</dd>
            <dt>財産</dt><dd>${money}</dd>
            <dt>最後の職業</dt><dd>${esc(lastJob)}</dd>
            <dt>出自</dt><dd>${esc(data.origins[state.origin].name)}</dd>
            <dt>性格</dt><dd>${esc(traitNames(state))}</dd>
          </dl>
        </div>
        <div>${npcList(state)}</div>
      </div>
      <h3>人生年表 <label class="toggle"><input type="checkbox" id="ending-important" checked /> 重要な出来事のみ</label></h3>
      <div id="ending-timeline"></div>
    `;
    const toggle = $("ending-important");
    const draw = () => ($("ending-timeline").innerHTML = timelineHtml(state, toggle.checked));
    toggle.addEventListener("change", draw);
    draw();
  }

  // ---------- デバッグ（?debug=1）----------

  function renderDebug(state, handlers) {
    const panel = $("debug-panel");
    panel.hidden = false;
    const warnings = handlers.warnings || [];
    panel.innerHTML = `
      <h3>デバッグ</h3>
      <p>寿命：${state.lifespan}歳 ／ シード：${state.rng.seed} ／ イベント登録数：${data.events.length}</p>
      <p>フラグ：${state.flags.length ? esc(state.flags.join(", ")) : "なし"}</p>
      <div class="menu row">
        <button class="btn small" data-auto="10">10年自動で進める</button>
        <button class="btn small" data-auto="999">最後まで自動</button>
      </div>
      <details ${warnings.length ? "open" : ""}>
        <summary>イベントデータの警告（${warnings.length}件）</summary>
        <ul class="warnings">${warnings.map((w) => `<li>${esc(w)}</li>`).join("") || "<li>なし</li>"}</ul>
      </details>
    `;
    panel.querySelectorAll("[data-auto]").forEach((b) =>
      b.addEventListener("click", () => handlers.onAuto(Number(b.dataset.auto)))
    );
  }

  return { showScreen, renderCreate, renderGame, renderTimelineModal, renderEnding };
})();
