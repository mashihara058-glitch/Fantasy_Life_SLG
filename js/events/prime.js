// 壮年期（30〜59歳）
GAME.registerEvents([
  {
    id: "common_prime_001",
    tags: ["prime", "friend"],
    conditions: { ageMin: 25, ageMax: 59, flags: ["helped_friend"], npcs: ["friend"] },
    weight: 20,
    text: "かつて窮地を救った{友人}が、訪ねてきた。今では大きな商会を営んでいるという。",
    choices: [
      {
        text: "再会を喜び合う",
        result: "「あの時の恩を返させてくれ」{友人}は重い革袋を差し出した。",
        effects: { money: 200, reputation: 5, npc: { friend: { intimacy: 10 } } },
        log: { title: "{友人}と再会し、恩を返される", text: "若き日に助けた友が、大きな助けとなって戻ってきた。" },
      },
      {
        text: "礼は受け取らず、酒を酌み交わす",
        effects: { health: 2, reputation: 3, npc: { friend: { trust: 10, intimacy: 15 } } },
        log: { title: "{友人}と再会する", text: "かつての友人との交流が再び始まった。" },
      },
    ],
  },
  {
    id: "common_prime_002",
    tags: ["prime", "friend"],
    conditions: { ageMin: 25, ageMax: 59, flags: ["abandoned_friend"], npcs: ["friend"] },
    weight: 15,
    text: "人混みの中に、見覚えのある顔があった。かつて見捨てた{友人}が、冷たい目でこちらを見ている。",
    choices: [
      {
        text: "あの時のことを謝る",
        result: "{友人}は長い沈黙のあと、「もういい」とだけ言った。",
        effects: { npc: { friend: { trust: 15 } }, removeFlags: ["abandoned_friend"] },
        log: { title: "{友人}に過去を詫びる", text: "長年のわだかまりに、ようやく向き合った。" },
      },
      {
        text: "目を逸らして立ち去る",
        effects: { npcState: { friend: "left" }, reputation: -3 },
      },
    ],
  },
  {
    id: "common_prime_003",
    tags: ["prime", "work"],
    conditions: { ageMin: 28, ageMax: 55, hasJob: true, notJobs: ["slave", "retired", "laborer", "gambler", "mistress", "miner", "prostitute"], notFlags: ["promoted"], stats: { ability: { min: 45 } } },
    weight: 15,
    text: "長年の働きぶりが認められ、責任ある立場を任されることになった。",
    choices: [
      {
        text: "謹んで引き受ける",
        effects: { reputation: 10, incomeBonus: 40, health: -3, ability: -25, addFlags: ["promoted"] },
        log: { title: "{職業}として昇進する", text: "重責を担う立場となった。" },
      },
      {
        text: "今の立場のままでいたい",
        effects: { health: 2 },
      },
    ],
  },
  {
    id: "common_prime_004",
    tags: ["prime", "money"],
    conditions: { ageMin: 25, ageMax: 55, moneyUnlocked: true, notFlags: ["slave"] },
    repeatable: true,
    cooldown: 8,
    text: "旧知の商人から、東方交易への出資を持ちかけられた。「うまくいけば倍以上になる」",
    choices: [
      {
        conditions: { stats: { money: { min: 100 } } },
        text: "100ゴールド出資する",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "交易船は香辛料を満載して戻ってきた。",
          effects: { money: 150 },
          log: { title: "東方交易で財を成す", text: "出資が実を結び、懐が大いに潤った。" },
        },
        failure: { result: "船は嵐で沈んだ。出資金は戻らない。", effects: { money: -100 } },
      },
      {
        text: "借金をしてでも出資する",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "賭けは当たった。借金を返しても十分な儲けが出た。",
          effects: { money: 120 },
        },
        failure: {
          result: "船は帰らなかった。手元には借用書だけが残った。",
          effects: { money: -150, addFlags: ["indebted"] },
          log: { title: "交易の失敗で借金を背負う", text: "無理な出資が裏目に出た。", important: true },
        },
      },
      { text: "断る" },
    ],
  },
  {
    id: "common_prime_005",
    tags: ["prime", "reflection"],
    conditions: { ageMin: 30, ageMax: 59, notFlags: ["slave"] },
    repeatable: true,
    cooldown: 6,
    text: "ふと、自分の人生はこれでよかったのかと考える夜があった。",
    choices: [
      { text: "今の道を極める", effects: { ability: 2 } },
      {
        text: "新しいことを始めてみる",
        check: { stat: "ability", difficulty: 40 },
        success: { result: "思いのほか性に合っていた。", effects: { ability: 3, reputation: 3 } },
        failure: { result: "三日坊主に終わった。", effects: { money: -10 } },
      },
      {
        conditions: { npcs: ["spouse"] },
        text: "{配偶者}とゆっくり過ごす",
        effects: { health: 2, npc: { spouse: { intimacy: 5 } } },
      },
    ],
  },
]);
