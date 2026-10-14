// 幼少期（0〜11歳）
GAME.registerEvents([
  {
    id: "human_childhood_001",
    tags: ["childhood", "family", "education"],
    conditions: { ageMin: 6, ageMax: 11, species: ["human"] },
    weight: 10,
    repeatable: false,
    text: "家庭教師があなたの才能に気づいた。",
    choices: [
      {
        text: "勉強を続ける",
        effects: { ability: 5, addFlags: ["studious"] },
        log: { title: "学問の才能を認められる", text: "家庭教師のもとで熱心に学んだ。" },
      },
      {
        text: "外で遊ぶ",
        effects: { health: 2 },
      },
    ],
  },
  {
    id: "common_childhood_002",
    tags: ["childhood", "friend"],
    conditions: { ageMin: 4, ageMax: 9, noNpcs: ["friend"] },
    weight: 15,
    weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
    text: "広場の隅で、同じ年頃の子どもがひとりで石を積んで遊んでいた。",
    choices: [
      {
        text: "声をかける",
        result: "{友人}という名前らしい。二人はすぐに仲良くなった。",
        effects: { addNpc: { role: "friend", tags: ["childhood_friend"], intimacy: 50 }, addFlags: ["has_childhood_friend"] },
        log: { title: "幼なじみの{友人}と出会う", text: "広場で出会い、かけがえのない友となった。" },
      },
      {
        text: "遠くから眺めている",
        effects: { ability: 1 },
      },
    ],
  },
  {
    id: "common_childhood_003",
    tags: ["childhood", "family", "health"],
    conditions: { ageMin: 1, ageMax: 6 },
    text: "{名前}はひどい熱を出して寝込んでしまった。",
    choices: [
      {
        conditions: { npcs: ["mother"] },
        text: "{母}が寝ずに看病してくれた",
        check: { stat: "health", difficulty: 30 },
        success: {
          result: "数日で熱は下がった。{母}は目の下に隈を作りながら笑った。",
          effects: { health: -3, npc: { mother: { intimacy: 10 } } },
        },
        failure: {
          result: "熱は長く続き、体が弱くなってしまった。",
          effects: { health: -20, npc: { mother: { intimacy: 10 } } },
          log: { title: "大病を患う", text: "高熱が続き、生死の境をさまよった。" },
        },
      },
      {
        text: "ひとりで熱に耐えた",
        check: { stat: "health", difficulty: 40 },
        success: { result: "なんとか持ち直した。", effects: { health: -5 } },
        failure: {
          result: "熱は長く続き、体が弱くなってしまった。",
          effects: { health: -25 },
          log: { title: "大病を患う", text: "高熱が続き、生死の境をさまよった。" },
        },
      },
    ],
  },
  {
    id: "common_childhood_004",
    tags: ["childhood", "magic"],
    conditions: { ageMin: 7, ageMax: 11 },
    weight: 8,
    text: "夜、ベッドの中で指先を見つめていると、小さな光がぽうっと灯った。",
    choices: [
      {
        text: "誰にも言わずに練習する",
        effects: { ability: 3, addFlags: ["magic_spark"] },
        log: { title: "魔法の素質に目覚める", text: "誰にも知られぬまま、指先に灯る光を育て始めた。" },
      },
      {
        conditions: { npcs: ["mother"] },
        text: "{母}に打ち明ける",
        result: "{母}は驚き、そして誇らしげに{名前}を抱きしめた。",
        effects: { reputation: 3, addFlags: ["magic_spark"], npc: { mother: { trust: 5 } } },
        log: { title: "魔法の素質に目覚める", text: "家族に見守られ、魔法の才を育て始めた。" },
      },
      {
        text: "怖くなって忘れることにした",
      },
    ],
  },
  {
    id: "common_childhood_005",
    tags: ["childhood", "adventure", "fairy"],
    conditions: { ageMin: 5, ageMax: 10 },
    weight: 8,
    text: "森の奥で道に迷ってしまった。木々の間から、日が傾いていくのが見える。",
    choices: [
      {
        text: "来た道を慎重に戻る",
        check: { stat: "ability", difficulty: 35 },
        success: { result: "目印の岩を見つけ、無事に家へ帰り着いた。", effects: { ability: 2 } },
        failure: { result: "暗い森をさまよい、翌朝ようやく見つけ出された。", effects: { health: -10 } },
      },
      {
        text: "青白く光る茸の列を追ってみる",
        result: "妖精たちの輪舞に迷い込み、気づけば家の前に立っていた。手のひらには、小さな花びらが一枚。",
        effects: { health: 5, addFlags: ["fairy_blessing"] },
        log: { title: "妖精の輪に迷い込む", text: "森の奥で妖精たちに出会い、不思議な加護を受けた。" },
      },
    ],
  },
  {
    id: "common_childhood_006",
    tags: ["childhood", "family"],
    conditions: { ageMin: 5, ageMax: 11 },
    repeatable: true,
    cooldown: 3,
    text: "家の手伝いを言いつけられた。",
    choices: [
      { text: "真面目に手伝う", effects: { ability: 2, reputation: 1 } },
      { text: "こっそり抜け出して遊ぶ", effects: { health: 2, reputation: -1 } },
    ],
  },
  {
    id: "common_childhood_007",
    tags: ["childhood", "friend"],
    conditions: { ageMin: 6, ageMax: 11, npcs: ["friend"] },
    text: "つまらないことで、{友人}と大喧嘩をしてしまった。",
    choices: [
      {
        text: "自分から謝りに行く",
        result: "{友人}は照れくさそうに笑い、二人は前よりも仲良くなった。",
        effects: { npc: { friend: { trust: 10, intimacy: 5 } } },
      },
      {
        text: "意地を張って口をきかない",
        result: "しばらくの間、二人の間にはぎこちない空気が流れた。",
        effects: { npc: { friend: { trust: -10, intimacy: -5 } } },
      },
    ],
  },
]);
