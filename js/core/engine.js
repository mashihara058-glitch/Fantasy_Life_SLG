// ゲームの状態管理とルール処理（画面には依存しない）
GAME.Engine = (function () {
  const U = GAME.U;
  const data = GAME.data;

  const SAVE_KEY = "lifeSLG.save";
  const SAVE_VERSION = 1;
  const STAT_KEYS = ["health", "ability", "reputation"];
  const STAT_LABELS = { health: "健康", ability: "能力", reputation: "評判", money: "所持金" };
  const DEFAULT_COOLDOWN = 3;
  const FALLBACK_WEIGHT = 5;

  const ROLE_LABELS = {
    father: "父",
    mother: "母",
    friend: "友人",
    lover: "恋人",
    spouse: "配偶者",
    mentor: "師匠",
    rival: "ライバル",
    child: "子",
    pupil: "弟子",
    sibling: "兄弟",
  };
  const PLACEHOLDER_ROLES = {};
  Object.entries(ROLE_LABELS).forEach(([role, label]) => {
    PLACEHOLDER_ROLES[label] = role;
    PLACEHOLDER_ROLES[role] = role;
  });
  const SPECIAL_PLACEHOLDERS = ["名前", "姓", "フルネーム", "出身", "職業", "年齢", "種族", "兄弟の続柄"];
  const STATUS_LABELS = { dead: "故人", left: "疎遠", missing: "行方不明" };

  const CONDITION_KEYS = [
    "ageMin", "ageMax", "species", "origin", "gender", "traitsAny", "notTraits", "flags", "notFlags",
    "stats", "hasJob", "jobs", "notJobs", "npcs", "noNpcs", "missingNpcs", "npcAgeMin", "npcAgeMax",
    "moneyUnlocked", "lifespanReached", "custom",
  ];
  const EFFECT_KEYS = [
    "health", "ability", "reputation", "money", "moneyRate", "setStats", "addFlags", "removeFlags",
    "addNpc", "npc", "npcRole", "npcState", "loseNpc", "addTraits", "removeTraits", "job",
    "incomeBonus", "unlockMoney", "death",
  ];

  // ---------- 参照ヘルパー ----------

  function getEvent(id) {
    return data.events.find((e) => e.id === id);
  }

  function hasFlag(state, f) {
    return state.flags.includes(f);
  }

  function activeNpcs(state, role) {
    return state.npcs.filter((n) => n.status === "active" && (!role || n.role === role));
  }

  function npcAge(state, npc) {
    return state.age + npc.ageOffset;
  }

  function jobName(state) {
    if (!state.job) return "無職";
    return data.jobs[state.job] ? data.jobs[state.job].name : state.job;
  }

  function fullName(state) {
    return `${state.name}・${state.familyName}`;
  }

  function traitName(id) {
    return data.traits[id] ? data.traits[id].name : id;
  }

  function speciesLabel(state) {
    const name = data.species[state.species].name;
    return state.changeling && data.changeling ? `${name}（${data.changeling.name}）` : name;
  }

  function roleLabel(role) {
    return ROLE_LABELS[role] || role;
  }

  // 兄弟姉妹は年齢と性別で「兄・姉・弟・妹」と呼ぶ
  function npcLabel(state, npc) {
    if (npc.role !== "sibling") return roleLabel(npc.role);
    const older = npc.ageOffset >= 0;
    if (npc.gender === "male") return older ? "兄" : "弟";
    return older ? "姉" : "妹";
  }

  function statusLabel(status) {
    return STATUS_LABELS[status] || status;
  }

  // 同じ人生の中ではなるべく名前が重ならないようにする
  function randomName(gender, state) {
    const list = data.names[gender] || data.names.male;
    if (!state) return U.pick(list);
    const used = new Set([state.name, ...state.npcs.map((n) => n.name)]);
    for (let i = 0; i < 20; i++) {
      const name = U.pick(list);
      if (!used.has(name)) return name;
    }
    return U.pick(list);
  }

  // ---------- キャラクター作成 ----------

  function addNpc(state, spec) {
    const gender =
      spec.gender ||
      (spec.role === "father" ? "male" : spec.role === "mother" ? "female" : null) ||
      ((spec.role === "lover" || spec.role === "spouse") ? (state.gender === "male" ? "female" : "male") : null) ||
      U.pick(["male", "female"]);
    const age = spec.age != null ? U.resolve(spec.age) : Math.max(0, state.age + U.randInt(-3, 3));
    const npc = {
      id: state.nextNpcId++,
      name: spec.name || randomName(gender, state),
      gender,
      role: spec.role,
      ageOffset: age - state.age,
      trust: spec.trust != null ? U.resolve(spec.trust) : 50,
      intimacy: spec.intimacy != null ? U.resolve(spec.intimacy) : 30,
      tags: spec.tags ? spec.tags.slice() : [],
      status: "active",
      metAge: state.age,
    };
    state.npcs.push(npc);
    return npc;
  }

  // options.species / options.changeling でテスト用に固定できる
  function createCharacter(seed, options) {
    const opts = options || {};
    const s = seed != null ? seed >>> 0 : Math.floor(Math.random() * 4294967296);
    const rng = { seed: s, state: s };
    U.setRng(rng);

    const species =
      opts.species && data.species[opts.species]
        ? opts.species
        : U.weightedPick(data.enabledSpecies, (id) => data.species[id].weight || 1);
    const originId = U.weightedPick(Object.keys(data.origins), (id) => data.origins[id].weight || 1);
    const origin = data.origins[originId];
    const gender = U.pick(["male", "female"]);
    const traitNum = U.randInt(data.traitCount[0], data.traitCount[1]);
    const innateTraits = Object.keys(data.traits).filter((t) => data.traits[t].innate !== false);
    const traits = U.shuffle(innateTraits).slice(0, traitNum);
    const cl = data.changeling;
    const changeling = opts.changeling != null ? !!opts.changeling : !!cl && U.random() < cl.chance;

    const stats = { money: 0 };
    STAT_KEYS.forEach((k) => {
      stats[k] = U.resolve(origin.stats[k] != null ? origin.stats[k] : 30);
    });
    const addMods = (mod) => Object.keys(mod || {}).forEach((k) => (stats[k] += mod[k]));
    addMods(data.species[species].stats);
    traits.forEach((t) => addMods(data.traits[t].stats));
    if (changeling) addMods(cl.stats);
    STAT_KEYS.forEach((k) => (stats[k] = U.clamp(stats[k], 0, 100)));

    const lifespanRange = data.species[species].lifespan;
    const state = {
      version: SAVE_VERSION,
      rng,
      name: randomName(gender),
      familyName: U.pick(data.names.family),
      gender,
      species,
      changeling,
      origin: originId,
      traits,
      age: 0,
      lifespan: U.randInt(lifespanRange[0], lifespanRange[1]),
      alive: true,
      causeOfDeath: null,
      stats,
      moneyUnlocked: false,
      job: null,
      incomeBonus: 0,
      jobHistory: [],
      flags: changeling ? cl.flags.slice() : [],
      eventHistory: {},
      npcs: [],
      nextNpcId: 1,
      timeline: [],
      phase: "event",
      current: null,
      lastResult: null,
    };

    const fam = data.family || {};
    const olderCount = fam.olderSiblings ? U.weightedPick(fam.olderSiblings, (x) => x[1])[0] : 0;
    const siblingAges = [];
    for (let i = 0; i < olderCount; i++) siblingAges.push(U.randInt(1, 12));
    siblingAges.sort((a, b) => b - a);
    const oldest = siblingAges.length ? siblingAges[0] : 0;
    const motherAge = Math.min(45, U.randInt(18, 30) + oldest);
    const fatherAge = Math.max(18, motherAge + U.randInt(-2, 8));

    addNpc(state, { role: "father", age: fatherAge, trust: 60, intimacy: 60 });
    addNpc(state, { role: "mother", age: motherAge, trust: 60, intimacy: 70 });
    siblingAges.forEach((age) => addNpc(state, { role: "sibling", age, trust: 50, intimacy: [40, 70] }));
    state.npcs.forEach((n) => (n.metAge = 0));
    return state;
  }

  // ---------- 条件判定 ----------

  function missingNpcs(state, role) {
    return state.npcs.filter((n) => n.status === "missing" && n.role === role);
  }

  // 条件の年齢指定（npcAgeMin / npcAgeMax）を満たす、その役割の人物
  function npcCandidates(state, c, role) {
    const min = c.npcAgeMin && c.npcAgeMin[role];
    const max = c.npcAgeMax && c.npcAgeMax[role];
    return activeNpcs(state, role).filter((n) => {
      const age = npcAge(state, n);
      return (min == null || age >= min) && (max == null || age <= max);
    });
  }

  function checkConditions(state, c) {
    if (!c) return true;
    if (c.ageMin != null && state.age < c.ageMin) return false;
    if (c.ageMax != null && state.age > c.ageMax) return false;
    if (c.species && !c.species.includes(state.species)) return false;
    if (c.origin && !c.origin.includes(state.origin)) return false;
    if (c.gender && !c.gender.includes(state.gender)) return false;
    if (c.traitsAny && !c.traitsAny.some((t) => state.traits.includes(t))) return false;
    if (c.notTraits && c.notTraits.some((t) => state.traits.includes(t))) return false;
    if (c.flags && !c.flags.every((f) => hasFlag(state, f))) return false;
    if (c.notFlags && c.notFlags.some((f) => hasFlag(state, f))) return false;
    if (c.stats) {
      for (const key of Object.keys(c.stats)) {
        const v = state.stats[key];
        const r = c.stats[key];
        if (r.min != null && v < r.min) return false;
        if (r.max != null && v > r.max) return false;
      }
    }
    if (c.hasJob != null && !!state.job !== c.hasJob) return false;
    if (c.jobs && !c.jobs.includes(state.job || "none")) return false;
    if (c.notJobs && c.notJobs.includes(state.job || "none")) return false;
    if (c.npcs && !c.npcs.every((role) => npcCandidates(state, c, role).length > 0)) return false;
    if (c.noNpcs && c.noNpcs.some((role) => activeNpcs(state, role).length > 0)) return false;
    if (c.missingNpcs && !c.missingNpcs.every((role) => missingNpcs(state, role).length > 0)) return false;
    for (const role of Object.keys({ ...c.npcAgeMin, ...c.npcAgeMax })) {
      if (npcCandidates(state, c, role).length === 0) return false;
    }
    if (c.moneyUnlocked != null && state.moneyUnlocked !== c.moneyUnlocked) return false;
    if (c.lifespanReached != null && state.age >= state.lifespan !== c.lifespanReached) return false;
    if (c.custom && !c.custom(state)) return false;
    return true;
  }

  function isEligible(state, ev) {
    const hist = state.eventHistory[ev.id];
    if (hist && hist.length) {
      const repeatable = ev.repeatable != null ? ev.repeatable : !!ev.fallback;
      if (!repeatable) return false;
      if (ev.maxTimes && hist.length >= ev.maxTimes) return false;
      const cooldown = ev.cooldown != null ? ev.cooldown : ev.fallback ? 0 : DEFAULT_COOLDOWN;
      if (state.age - hist[hist.length - 1] < cooldown) return false;
    }
    return checkConditions(state, ev.conditions);
  }

  // ---------- イベント抽選 ----------

  const BUILTIN_QUIET = {
    id: "_builtin_quiet",
    fallback: true,
    text: "特に変わったこともなく、一年が過ぎた。",
    choices: [{ text: "次の年へ" }],
  };

  function eventWeight(state, ev, defaultWeight) {
    let w = ev.weight != null ? ev.weight : defaultWeight;
    (ev.weightMods || []).forEach((m) => {
      if (checkConditions(state, m.conditions)) w *= m.multiply;
    });
    return w;
  }

  function pickEvent(state) {
    const events = data.events;

    const forced = events.filter((e) => e.forced && isEligible(state, e));
    if (forced.length) {
      const maxP = Math.max(...forced.map((e) => e.priority || 0));
      const top = forced.filter((e) => (e.priority || 0) === maxP);
      return U.weightedPick(top, (e) => eventWeight(state, e, 1));
    }

    const pool = events.filter((e) => !e.forced && isEligible(state, e));
    if (pool.length) {
      return U.weightedPick(pool, (e) => eventWeight(state, e, e.fallback ? FALLBACK_WEIGHT : 10));
    }

    const anyFallback = events.filter((e) => e.fallback && checkConditions(state, e.conditions));
    if (anyFallback.length) return U.pick(anyFallback);
    return BUILTIN_QUIET;
  }

  function startEvent(state, yearLines) {
    const ev = pickEvent(state);
    const bound = {};
    const c = ev.conditions || {};
    const roles = new Set([...(c.npcs || []), ...Object.keys({ ...c.npcAgeMin, ...c.npcAgeMax })]);
    roles.forEach((role) => {
      const candidates = npcCandidates(state, c, role);
      if (candidates.length) bound[role] = U.pick(candidates).id;
    });
    const missingRoles = new Set(c.missingNpcs || []);
    (ev.choices || []).forEach((ch) => {
      ((ch.conditions && ch.conditions.missingNpcs) || []).forEach((role) => missingRoles.add(role));
    });
    missingRoles.forEach((role) => {
      if (bound[role] != null) return;
      const candidates = missingNpcs(state, role);
      if (candidates.length) bound[role] = U.pick(candidates).id;
    });
    state.current = { eventId: ev.id, bound, age: state.age, yearLines: yearLines || [] };
    state.phase = "event";
    state.lastResult = null;
    return ev;
  }

  function currentEvent(state) {
    if (!state.current) return null;
    return state.current.eventId === BUILTIN_QUIET.id ? BUILTIN_QUIET : getEvent(state.current.eventId);
  }

  // ---------- 差し込み文字 ----------

  function boundNpc(state, role) {
    const cur = state.current;
    if (cur && cur.bound[role] != null) {
      return state.npcs.find((n) => n.id === cur.bound[role]) || null;
    }
    const npc = activeNpcs(state, role)[0] || null;
    if (npc && cur) cur.bound[role] = npc.id;
    return npc;
  }

  function renderText(state, text) {
    if (!text) return "";
    return String(text).replace(/\{([^{}]+)\}/g, (m, key) => {
      switch (key) {
        case "名前": return state.name;
        case "姓": return state.familyName;
        case "フルネーム": return fullName(state);
        case "出身": return data.origins[state.origin].name;
        case "職業": return jobName(state);
        case "年齢": return String(state.age);
        case "種族": return data.species[state.species].name;
        case "兄弟の続柄": {
          const sib = boundNpc(state, "sibling");
          return sib ? npcLabel(state, sib) : "兄弟";
        }
      }
      const role = PLACEHOLDER_ROLES[key];
      if (role) {
        const npc = boundNpc(state, role);
        return npc ? npc.name : "誰か";
      }
      return m;
    });
  }

  // ---------- 選択肢 ----------

  function successChance(state, check) {
    const v = state.stats[check.stat] || 0;
    return U.clamp(0.5 + (v - check.difficulty) * 0.02, 0.05, 0.95);
  }

  function visibleChoices(state) {
    const ev = currentEvent(state);
    if (!ev) return [];
    return ev.choices
      .map((choice, index) => ({ choice, index }))
      .filter(({ choice }) => checkConditions(state, choice.conditions))
      .map(({ choice, index }) => {
        let hint = "";
        if (choice.check) {
          const p = Math.round(successChance(state, choice.check) * 100);
          hint = `${STAT_LABELS[choice.check.stat] || choice.check.stat}判定・成功率${p}%`;
        }
        return { index, text: renderText(state, choice.text), hint };
      });
  }

  // ---------- 効果の適用 ----------

  function setJob(state, jobId, changes) {
    const next = jobId || null;
    if (state.job === next) return;
    const last = state.jobHistory[state.jobHistory.length - 1];
    if (last && last.toAge == null) last.toAge = state.age;
    state.job = next;
    state.incomeBonus = 0;
    if (next) {
      state.jobHistory.push({ job: next, fromAge: state.age, toAge: null });
      changes.push(`職業：${jobName(state)}`);
      if (next !== "slave" && !state.moneyUnlocked) unlockMoney(state, changes);
    } else {
      changes.push("職を失った");
    }
  }

  function unlockMoney(state, changes) {
    if (state.moneyUnlocked) return;
    state.moneyUnlocked = true;
    const start = data.origins[state.origin].startingMoney || 0;
    state.stats.money += start;
    changes.push(`自分で家計を持つようになった（所持金 ${state.stats.money}）`);
  }

  function signed(n) {
    return n > 0 ? `+${n}` : String(n);
  }

  function applyEffects(state, eff) {
    const changes = [];
    if (!eff) return changes;
    const cur = state.current;

    U.toArray(eff.addNpc).forEach((spec) => {
      const npc = addNpc(state, spec);
      if (cur) cur.bound[npc.role] = npc.id;
      changes.push(`新たな${npcLabel(state, npc)}：${npc.name}`);
    });

    if (eff.npcRole) {
      Object.entries(eff.npcRole).forEach(([from, to]) => {
        const npc = boundNpc(state, from);
        if (!npc) return;
        npc.role = to;
        if (cur) cur.bound[to] = npc.id;
        changes.push(`${npc.name}が${roleLabel(to)}になった`);
      });
    }

    STAT_KEYS.forEach((k) => {
      if (eff[k] == null) return;
      const d = U.resolve(eff[k]);
      const before = state.stats[k];
      state.stats[k] = U.clamp(before + d, 0, 100);
      const actual = state.stats[k] - before;
      if (actual !== 0) changes.push(`${STAT_LABELS[k]} ${signed(actual)}`);
    });
    if (eff.money != null && state.moneyUnlocked) {
      const d = U.resolve(eff.money);
      state.stats.money += d;
      if (d !== 0) changes.push(`所持金 ${signed(d)}`);
    }
    if (eff.moneyRate != null && state.moneyUnlocked && state.stats.money > 0) {
      const d = Math.round(state.stats.money * eff.moneyRate);
      state.stats.money += d;
      if (d !== 0) changes.push(`所持金 ${signed(d)}`);
    }
    if (eff.setStats) {
      Object.entries(eff.setStats).forEach(([k, v]) => {
        if (k === "money" && !state.moneyUnlocked) return;
        state.stats[k] = k === "money" ? v : U.clamp(v, 0, 100);
        changes.push(`${STAT_LABELS[k] || k}が${v}になった`);
      });
    }

    if (eff.npc) {
      Object.entries(eff.npc).forEach(([role, ch]) => {
        const npc = boundNpc(state, role);
        if (!npc) return;
        if (ch.trust != null) {
          const d = U.resolve(ch.trust);
          npc.trust = U.clamp(npc.trust + d, 0, 100);
          changes.push(`${npc.name}の信頼 ${signed(d)}`);
        }
        if (ch.intimacy != null) {
          const d = U.resolve(ch.intimacy);
          npc.intimacy = U.clamp(npc.intimacy + d, 0, 100);
          changes.push(`${npc.name}との親密度 ${signed(d)}`);
        }
      });
    }

    if (eff.npcState) {
      Object.entries(eff.npcState).forEach(([role, st]) => {
        const npc = boundNpc(state, role);
        if (!npc) return;
        const before = npc.status;
        npc.status = st;
        if (st === "dead") changes.push(`${npc.name}が亡くなった`);
        else if (st === "left") changes.push(`${npc.name}と別れた`);
        else if (st === "missing") changes.push(`${npc.name}が行方不明になった`);
        else if (st === "active" && before !== "active") changes.push(`${npc.name}が戻ってきた`);
      });
    }

    // 悲劇的な喪失。絆の強さで「復讐」か「厭世」が付く（js/data/traits.js の lossTraits）
    const lossTraits = [];
    U.toArray(eff.loseNpc).forEach((spec) => {
      const npc = boundNpc(state, spec.role);
      if (!npc || npc.status !== "active") return;
      npc.status = spec.status || "dead";
      changes.push(npc.status === "missing" ? `${npc.name}が行方不明になった` : `${npc.name}を失った`);
      const rule = data.lossTraits;
      if (rule && spec.trait !== false) {
        const bond = (npc.trust + npc.intimacy) / 2;
        lossTraits.push(bond >= rule.bondThreshold ? rule.high : rule.low);
      }
    });

    U.toArray(eff.addFlags).forEach((f) => {
      if (!hasFlag(state, f)) state.flags.push(f);
    });
    U.toArray(eff.removeFlags).forEach((f) => {
      state.flags = state.flags.filter((x) => x !== f);
    });

    U.toArray(eff.removeTraits).forEach((t) => {
      if (!state.traits.includes(t)) return;
      state.traits = state.traits.filter((x) => x !== t);
      changes.push(`性格から「${traitName(t)}」が消えた`);
    });
    [...U.toArray(eff.addTraits), ...lossTraits].forEach((t) => {
      if (state.traits.includes(t)) return;
      state.traits.push(t);
      changes.push(`性格に「${traitName(t)}」が加わった`);
    });

    if ("job" in eff) setJob(state, eff.job, changes);
    if (eff.incomeBonus != null) {
      state.incomeBonus += eff.incomeBonus;
      changes.push(`年収 ${signed(eff.incomeBonus)}`);
    }
    if (eff.unlockMoney) unlockMoney(state, changes);

    if (eff.death) {
      state.alive = false;
      state.causeOfDeath = eff.death;
    }
    return changes;
  }

  // ---------- 1年の進行 ----------

  function firstSentence(text) {
    const t = text.split("\n")[0];
    const i = t.indexOf("。");
    return i >= 0 ? t.slice(0, i + 1) : t;
  }

  function choose(state, choiceIndex) {
    const ev = currentEvent(state);
    const choice = ev.choices[choiceIndex];
    let outcome = choice;
    let check = null;
    if (choice.check) {
      const p = successChance(state, choice.check);
      const ok = U.random() < p;
      outcome = (ok ? choice.success : choice.failure) || {};
      check = { ok, p };
    }

    const choiceText = renderText(state, choice.text);
    const changes = applyEffects(state, outcome.effects);

    if (!state.eventHistory[ev.id]) state.eventHistory[ev.id] = [];
    state.eventHistory[ev.id].push(state.age);

    const log = outcome.log || choice.log || ev.log;
    const entry = {
      age: state.age,
      eventId: ev.id,
      choice: choiceText,
      title: "",
      text: "",
      important: false,
    };
    if (log) {
      entry.title = renderText(state, log.title || firstSentence(ev.text));
      entry.text = renderText(state, log.text || "");
      entry.important = log.important != null ? log.important : true;
    } else {
      entry.title = renderText(state, firstSentence(ev.text));
      entry.text = `→ ${choiceText}`;
    }
    if (entry.important && ev.logOnce && state.timeline.some((e) => e.eventId === ev.id && e.important)) {
      entry.important = false;
    }
    if (!state.alive && !log) {
      entry.title = `${state.causeOfDeath}により生涯を終える`;
      entry.important = true;
    }
    state.timeline.push(entry);

    state.lastResult = {
      choiceText,
      resultText: renderText(state, outcome.result || ""),
      changes,
      check,
    };
    state.phase = state.alive ? "result" : "dead";
    if (!state.alive) closeLife(state);
    save(state);
    return state.lastResult;
  }

  function closeLife(state) {
    const last = state.jobHistory[state.jobHistory.length - 1];
    if (last && last.toAge == null) last.toAge = state.age;
  }

  function yearlyUpdate(state) {
    const lines = [];

    if (state.age >= 3 && state.age <= 17) {
      state.stats.ability = U.clamp(state.stats.ability + 1, 0, 100);
    }

    let decline = 0;
    if (state.age >= 40) decline += U.randInt(0, 1);
    if (state.age >= 55) decline += U.randInt(0, 2);
    if (state.age >= 70) decline += U.randInt(1, 2);
    if (decline > 0) {
      state.stats.health = U.clamp(state.stats.health - decline, 0, 100);
      lines.push(`老い：健康 -${decline}`);
    }

    if (state.moneyUnlocked) {
      const job = state.job ? data.jobs[state.job] : null;
      const income = job ? U.resolve(job.income) + state.incomeBonus : 0;
      const cost = job && job.livingCost != null ? job.livingCost : data.livingCost;
      state.stats.money += income - cost;
      lines.push(`収入 +${income} ／ 生活費 -${cost}`);
    }
    return lines;
  }

  function beginLife(state) {
    U.setRng(state.rng);
    startEvent(state, []);
    save(state);
  }

  function nextYear(state) {
    state.age += 1;
    const lines = yearlyUpdate(state);
    startEvent(state, lines);
    save(state);
  }

  // ---------- 結果表示用 ----------

  function lifeTitle(state) {
    const years = {};
    state.jobHistory.forEach((h) => {
      if (h.job === "retired") return;
      const to = h.toAge != null ? h.toAge : state.age;
      years[h.job] = (years[h.job] || 0) + (to - h.fromAge) + 1;
    });
    const main = Object.keys(years).sort((a, b) => years[b] - years[a])[0];
    if (main && data.jobs[main]) return `ある${data.jobs[main].name}の人生録`;
    return `ある${data.origins[state.origin].name}生まれの人生録`;
  }

  function mainJobName(state) {
    const t = lifeTitle(state);
    return t.replace(/^ある/, "").replace(/の人生録$/, "");
  }

  function timelineAsText(state) {
    const lines = [];
    lines.push(lifeTitle(state));
    lines.push(`${fullName(state)}／${speciesLabel(state)}・${mainJobName(state)}・享年${state.age}歳`);
    lines.push("");
    state.timeline
      .filter((e) => e.important)
      .forEach((e) => {
        lines.push(`${e.age}歳　${e.title}`);
        if (e.text) lines.push(`　　${e.text}`);
      });
    return lines.join("\n");
  }

  // ---------- セーブ・ロード ----------

  function save(state) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("保存に失敗しました", e);
    }
  }

  function migrate(obj) {
    if (!obj || typeof obj !== "object" || !obj.version) return null;
    if (obj.version > SAVE_VERSION) return null;
    // 将来、データ形式を変えたらここで古い形式を変換する
    return obj;
  }

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const state = migrate(JSON.parse(raw));
      if (!state) return null;
      if (state.current && !currentEvent(state)) {
        state.current = null;
      }
      U.setRng(state.rng);
      return state;
    } catch (e) {
      console.warn("読み込みに失敗しました", e);
      return null;
    }
  }

  function hasSave() {
    const s = load();
    return !!(s && s.alive);
  }

  function clearSave() {
    localStorage.removeItem(SAVE_KEY);
  }

  // ---------- イベントデータの検証 ----------

  function validateEvents() {
    const warnings = [];
    const ids = new Set();
    const warn = (id, msg) => warnings.push(`[${id || "id未設定"}] ${msg}`);

    const checkText = (id, text) => {
      if (!text) return;
      String(text).replace(/\{([^{}]+)\}/g, (m, key) => {
        if (!SPECIAL_PLACEHOLDERS.includes(key) && !PLACEHOLDER_ROLES[key]) {
          warn(id, `不明な差し込み文字 {${key}}`);
        }
        return m;
      });
    };
    const checkCond = (id, c) => {
      if (!c) return;
      Object.keys(c).forEach((k) => {
        if (!CONDITION_KEYS.includes(k)) warn(id, `不明な条件 "${k}"`);
      });
      [...(c.jobs || []), ...(c.notJobs || [])].forEach((j) => {
        if (j !== "none" && !data.jobs[j]) warn(id, `未定義の職業 "${j}"`);
      });
      (c.species || []).forEach((sp) => {
        if (!data.species[sp]) warn(id, `未定義の種族 "${sp}"`);
      });
      [...(c.traitsAny || []), ...(c.notTraits || [])].forEach((t) => {
        if (!data.traits[t]) warn(id, `未定義の性格 "${t}"`);
      });
    };
    const checkOutcome = (id, o) => {
      if (!o) return;
      checkText(id, o.result);
      if (o.log) {
        checkText(id, o.log.title);
        checkText(id, o.log.text);
      }
      if (!o.effects) return;
      Object.keys(o.effects).forEach((k) => {
        if (!EFFECT_KEYS.includes(k)) warn(id, `不明な効果 "${k}"`);
      });
      const j = o.effects.job;
      if (j && !data.jobs[j]) warn(id, `未定義の職業 "${j}"`);
      [...U.toArray(o.effects.addTraits), ...U.toArray(o.effects.removeTraits)].forEach((t) => {
        if (!data.traits[t]) warn(id, `未定義の性格 "${t}"`);
      });
    };

    data.events.forEach((ev) => {
      if (!ev.id) warn(null, "id がありません");
      else if (ids.has(ev.id)) warn(ev.id, "id が重複しています");
      ids.add(ev.id);
      if (!ev.text) warn(ev.id, "text がありません");
      checkText(ev.id, ev.text);
      checkCond(ev.id, ev.conditions);
      (ev.weightMods || []).forEach((m, i) => {
        checkCond(ev.id, m.conditions);
        if (typeof m.multiply !== "number") warn(ev.id, `weightMods[${i}] に multiply（数値）がありません`);
      });
      if (!Array.isArray(ev.choices) || ev.choices.length === 0) {
        warn(ev.id, "choices がありません");
        return;
      }
      if (ev.choices.every((c) => c.conditions)) {
        warn(ev.id, "すべての選択肢に条件があり、選べる選択肢がなくなる可能性があります");
      }
      ev.choices.forEach((c, i) => {
        if (!c.text) warn(ev.id, `choices[${i}] に text がありません`);
        checkText(ev.id, c.text);
        checkCond(ev.id, c.conditions);
        if (c.check) {
          if (!c.success || !c.failure) warn(ev.id, `choices[${i}] は check があるのに success / failure が揃っていません`);
          checkOutcome(ev.id, c.success);
          checkOutcome(ev.id, c.failure);
        } else {
          checkOutcome(ev.id, c);
        }
      });
    });
    return warnings;
  }

  return {
    ROLE_LABELS,
    STAT_LABELS,
    createCharacter,
    beginLife,
    nextYear,
    currentEvent,
    visibleChoices,
    choose,
    renderText,
    activeNpcs,
    npcAge,
    jobName,
    fullName,
    speciesLabel,
    roleLabel,
    npcLabel,
    statusLabel,
    lifeTitle,
    mainJobName,
    timelineAsText,
    save,
    load,
    hasSave,
    clearSave,
    validateEvents,
  };
})();
