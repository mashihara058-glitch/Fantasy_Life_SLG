// 性格によって起こる出来事
// 性格の一覧は js/data/traits.js を参照
GAME.registerEvents([
  // ---------- 好奇心旺盛 ----------
  {
    id: "common_trait_curious_001",
    tags: ["childhood", "personality"],
    conditions: { ageMin: 6, ageMax: 11, traitsAny: ["curious"] },
    weight: 15,
    text: "村にやって来た旅の吟遊詩人が、海の向こうの国の話をしていた。",
    choices: [
      {
        text: "根掘り葉掘り質問する",
        result: "吟遊詩人は目を細め、とっておきの話を聞かせてくれた。",
        effects: { ability: 3, addFlags: ["heard_far_lands"] },
      },
      {
        text: "一座の荷馬車にこっそり潜り込む",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "隣町まで揺られ、見たこともない市場を見て回った。帰ってからこっぴどく叱られた。",
          effects: { ability: 5, health: -3, addFlags: ["heard_far_lands"] },
          log: { title: "旅芸人の一座に紛れ込む", text: "初めて村の外の世界を見た。" },
        },
        failure: {
          result: "すぐに見つかって、家に連れ戻された。",
          effects: { reputation: -2 },
        },
      },
    ],
  },

  // ---------- 臆病 → 勇敢 ----------
  {
    id: "common_trait_timid_001",
    tags: ["adolescence", "personality"],
    conditions: { ageMin: 12, ageMax: 17, traitsAny: ["timid"] },
    weight: 15,
    text: "夜道で、野犬の群れに出くわした。背後では、小さな子どもが泣いている。",
    choices: [
      {
        text: "震える手で石を拾い、立ち向かう",
        check: { stat: "health", difficulty: 40 },
        success: {
          result: "野犬たちは唸り声を上げながら去っていった。膝の震えは、いつの間にか止まっていた。",
          effects: { reputation: 5, removeTraits: ["timid"], addTraits: ["brave"] },
          log: { title: "臆病な自分を乗り越える", text: "子どもを守って野犬に立ち向かい、勇気を知った。" },
        },
        failure: {
          result: "腕を噛まれたが、騒ぎを聞きつけた大人たちが駆けつけてくれた。",
          effects: { health: -10, reputation: 2 },
        },
      },
      {
        text: "子どもの手を引いて逃げる",
        effects: { health: -2 },
      },
    ],
  },

  // ---------- 勤勉 ----------
  {
    id: "common_trait_diligent_001",
    tags: ["young", "prime", "personality", "work"],
    conditions: { ageMin: 18, ageMax: 55, traitsAny: ["diligent"], hasJob: true, notJobs: ["slave", "retired"] },
    repeatable: true,
    cooldown: 10,
    maxTimes: 2,
    text: "誰よりも早く仕事場に来て、誰よりも遅く帰る。そんな日々が続いている。",
    choices: [
      {
        text: "このまま励み続ける",
        effects: { ability: 3, health: -3, incomeBonus: 5 },
      },
      {
        text: "たまには休みをとる",
        effects: { health: 3 },
      },
    ],
  },

  // ---------- 温厚 ----------
  {
    id: "common_trait_gentle_001",
    tags: ["personality"],
    conditions: { ageMin: 10, ageMax: 60, traitsAny: ["gentle"] },
    weight: 8,
    text: "道端で、旅装束の老人がうずくまっていた。",
    choices: [
      {
        text: "肩を貸して宿まで送る",
        result: "老人は礼を言い、古びたお守りを{名前}の手に握らせた。「いつか、お前さんを守ってくれる」",
        effects: { reputation: 3, health: 2, addFlags: ["old_charm"] },
        log: { title: "旅の老人からお守りを授かる", text: "見知らぬ老人を助け、不思議なお守りを受け取った。" },
      },
      {
        text: "急いでいるので通り過ぎる",
      },
    ],
  },

  // ---------- 野心家 ----------
  {
    id: "common_trait_ambitious_001",
    tags: ["young", "prime", "personality", "work"],
    conditions: { ageMin: 20, ageMax: 45, traitsAny: ["ambitious"], notJobs: ["slave"], notFlags: ["royal_official"] },
    weight: 12,
    text: "王都で、身分を問わず官吏を登用する試験が開かれるという。",
    choices: [
      {
        text: "試験に挑む",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "合格者の名簿に、{名前}の名があった。",
          effects: { reputation: 15, incomeBonus: 40, addFlags: ["royal_official"] },
          log: { title: "王都の登用試験に合格する", text: "身分の壁を越え、王国の官吏に取り立てられた。" },
        },
        failure: {
          result: "名簿に{名前}の名はなかった。",
          effects: { reputation: -3, money: -20 },
        },
      },
      {
        text: "身の丈に合った生き方を選ぶ",
        effects: { health: 3, removeTraits: ["ambitious"] },
      },
    ],
  },

  // ---------- 頑丈 ----------
  {
    id: "common_trait_sturdy_001",
    tags: ["adolescence", "young", "personality"],
    conditions: { ageMin: 14, ageMax: 30, traitsAny: ["sturdy"] },
    weight: 10,
    text: "村の力自慢大会が開かれることになった。",
    choices: [
      {
        text: "出場する",
        check: { stat: "health", difficulty: 55 },
        success: {
          result: "大樽を担いだまま、誰よりも遠くまで歩ききった。",
          effects: { reputation: 5, money: 20 },
          log: { title: "力自慢大会で優勝する", text: "村一番の力持ちとして名を馳せた。" },
        },
        failure: { result: "あと一歩のところで樽を落としてしまった。", effects: { health: -3 } },
      },
      {
        text: "見物して楽しむ",
      },
    ],
  },

  // ---------- 人間不信 ----------
  {
    id: "common_trait_betrayal_001",
    tags: ["young", "prime", "personality", "money", "friend"],
    conditions: { ageMin: 20, ageMax: 55, npcs: ["friend"], moneyUnlocked: true, notFlags: ["helped_friend"], stats: { money: { min: 100 } } },
    weight: 3,
    text: "信じていた{友人}が、預けていた金を持って姿を消した。",
    choices: [
      {
        text: "行方を追う",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "港町で{友人}を見つけ出し、金の半分を取り返した。だが、友情は戻らなかった。",
          effects: { moneyRate: -0.15, npcState: { friend: "left" } },
          log: { title: "友に裏切られる", text: "{友人}に金を持ち逃げされた。" },
        },
        failure: {
          result: "{友人}の行方は、杳として知れなかった。",
          effects: { moneyRate: -0.3, npcState: { friend: "left" }, addTraits: ["distrustful"] },
          log: { title: "友に裏切られ、人を信じられなくなる", text: "{友人}に財産を持ち逃げされ、心を閉ざした。" },
        },
      },
      {
        text: "忘れることにする",
        effects: { moneyRate: -0.3, npcState: { friend: "left" }, addTraits: ["distrustful"] },
        log: { title: "友に裏切られ、人を信じられなくなる", text: "{友人}に財産を持ち逃げされ、心を閉ざした。" },
      },
    ],
  },
  {
    id: "common_trait_distrustful_001",
    tags: ["prime", "elder", "personality"],
    conditions: { ageMin: 20, traitsAny: ["distrustful"] },
    repeatable: true,
    cooldown: 8,
    text: "誰かが親切にしてくれても、裏があるのではと疑ってしまう。",
    choices: [
      {
        text: "疑い続ける。そのほうが傷つかない",
        effects: { ability: 2, reputation: -2 },
      },
      {
        text: "もう一度だけ、人を信じてみる",
        check: { stat: "reputation", difficulty: 40 },
        success: {
          result: "差し出された手は、温かかった。",
          effects: { reputation: 3, removeTraits: ["distrustful"], addNpc: { role: "friend", trust: 40, intimacy: 20 } },
          log: { title: "再び人を信じる", text: "{友人}との出会いが、閉ざした心を開いた。" },
        },
        failure: {
          result: "やはり、相手は下心を隠していた。",
          effects: { money: -20 },
        },
      },
    ],
  },
]);
