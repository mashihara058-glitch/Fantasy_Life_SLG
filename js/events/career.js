// 上位職への昇格
// conditions.jobYearsMin で「今の職に何年就いているか」を条件にしている
// effects.keepIncomeBonus: true で、これまでの昇給分を昇格後も引き継ぐ
GAME.registerEvents([
  // ---------- 職人 → 名工 ----------
  {
    id: "common_career_master_craftsman",
    tags: ["young", "prime", "work", "career"],
    conditions: { jobs: ["craftsman"], jobYearsMin: 10, stats: { ability: { min: 55 } } },
    weight: 15,
    repeatable: true,
    cooldown: 5,
    text: "職人として腕を磨き続けて十余年。ギルドから、名工の称号を懸けた審査を受けないかと声がかかった。",
    choices: [
      {
        text: "生涯の傑作を作り上げて審査に臨む",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "審査員たちは、しばし言葉を失った。",
          effects: { job: "master_craftsman", keepIncomeBonus: true, reputation: 10 },
          log: { title: "名工の称号を得る", text: "ギルドの審査を通り、名工として認められた。" },
        },
        failure: {
          result: "「悪くはない。だが、名工の仕事ではない」",
          effects: { reputation: -3, ability: 2 },
        },
      },
      {
        conditions: { npcs: ["mentor"] },
        text: "{師匠}に推薦状を頼む",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "{師匠}は黙って筆を取った。その推薦状が、審査員たちを頷かせた。",
          effects: { job: "master_craftsman", keepIncomeBonus: true, reputation: 8, npc: { mentor: { trust: 10 } } },
          log: { title: "名工の称号を得る", text: "{師匠}の推薦を受け、名工として認められた。" },
        },
        failure: {
          result: "「お前にはまだ早い」と、{師匠}は首を横に振った。",
          effects: { npc: { mentor: { trust: -5 } } },
        },
      },
      {
        text: "まだ自分は未熟だと辞退する",
      },
    ],
  },

  // ---------- 兵士 → 騎士 ----------
  {
    id: "common_career_knight",
    tags: ["young", "prime", "work", "career"],
    conditions: { jobs: ["soldier"], jobYearsMin: 8, stats: { health: { min: 45 }, reputation: { min: 40 } } },
    weight: 15,
    repeatable: true,
    cooldown: 4,
    text: "長年の軍務と忠誠が認められ、騎士叙任の話が持ち上がった。",
    choices: [
      {
        conditions: { flags: ["war_hero"] },
        text: "戦場での武勲を携えて、叙任の儀に臨む",
        result: "王の剣が、{名前}の肩に触れた。",
        effects: { job: "knight", keepIncomeBonus: true, reputation: 15 },
        log: { title: "騎士に叙任される", text: "戦場での武勲を認められ、騎士の列に加わった。" },
      },
      {
        text: "叙任の儀に臨む",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "王の剣が、{名前}の肩に触れた。",
          effects: { job: "knight", keepIncomeBonus: true, reputation: 10 },
          log: { title: "騎士に叙任される", text: "長年の忠勤を認められ、騎士の列に加わった。" },
        },
        failure: {
          result: "推薦は見送られた。家柄のある者が優先されたらしい。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "一兵卒のままでいい",
        effects: { health: 2 },
      },
    ],
  },

  // ---------- 魔術師 → 上級魔術師 ----------
  {
    id: "common_career_wizard",
    tags: ["young", "prime", "work", "career", "magic"],
    conditions: { jobs: ["mage"], jobYearsMin: 10, stats: { ability: { min: 60 } } },
    weight: 15,
    repeatable: true,
    cooldown: 5,
    text: "魔術師ギルドの長老会から、上級魔術師の認定試験を受けるよう勧められた。",
    choices: [
      {
        text: "長年の研究を論文にまとめて提出する",
        check: { stat: "ability", difficulty: 65 },
        success: {
          result: "長老たちは論文を回し読みし、やがて静かに頷いた。",
          effects: { job: "wizard", keepIncomeBonus: true, reputation: 10 },
          log: { title: "上級魔術師に認定される", text: "長年の研究が実を結び、上級魔術師の位を得た。" },
        },
        failure: {
          result: "論文は差し戻された。だが、得るものはあった。",
          effects: { ability: 2 },
        },
      },
      {
        text: "禁書庫の知識に手を出す",
        check: { chance: 50 },
        success: {
          result: "禁じられた術式が、{名前}の手の中で完璧に組み上がった。",
          effects: { job: "wizard", keepIncomeBonus: true, ability: 10, addFlags: ["forbidden_knowledge"] },
          log: { title: "禁断の知識で上級魔術師に上り詰める", text: "禁書庫の術式を修め、長老たちを黙らせた。" },
        },
        failure: {
          result: "制御を失った魔力が暴走し、研究室ごと吹き飛んだ。",
          effects: { health: -25, reputation: -10, addFlags: ["forbidden_knowledge"] },
          log: { title: "禁術の暴走で深手を負う", text: "禁書庫の術式に手を出し、魔力を暴走させた。" },
        },
      },
      {
        text: "今はまだ研究を続ける",
      },
    ],
  },
]);
