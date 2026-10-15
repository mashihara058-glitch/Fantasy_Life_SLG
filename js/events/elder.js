// 老年期（老いが始まってから。寿命の80%以降）
GAME.registerEvents([
  {
    id: "common_elder_001",
    tags: ["elder", "work"],
    conditions: { aged: true, hasJob: true, notJobs: ["slave", "retired"] },
    weight: 25,
    repeatable: true,
    cooldown: 3,
    text: "体の衰えを感じる。そろそろ仕事を退く頃かもしれない。",
    choices: [
      {
        text: "引退する",
        effects: { job: "retired", health: 5 },
        log: { title: "仕事を退き、隠居する", text: "長年の務めに区切りをつけた。" },
      },
      {
        text: "生涯現役を貫く",
        effects: { reputation: 3, health: -3 },
      },
    ],
  },
  {
    id: "common_elder_002",
    tags: ["elder", "family", "successor"],
    conditions: { aged: true, notFlags: ["slave", "has_successor"] },
    weight: 15,
    text: "自分の知識や技を、誰かに残しておきたいと思うようになった。",
    choices: [
      {
        conditions: { npcs: ["child"] },
        text: "{子}に家と技を託す",
        effects: { addFlags: ["has_successor"], npc: { child: { trust: 15 } } },
        log: { title: "{子}に後を託す", text: "我が子に、自らが築いたものを譲り渡した。" },
      },
      {
        text: "見込みのある若者を弟子にとる",
        result: "{弟子}という若者が、目を輝かせて門を叩いた。",
        effects: { addNpc: { role: "pupil", age: [14, 20], trust: 50 }, addFlags: ["has_successor"], reputation: 5 },
        log: { title: "{弟子}を弟子にとる", text: "若者に、生涯で培ったものを伝え始めた。" },
      },
      {
        text: "自分の代で終わりでいい",
      },
    ],
  },
  {
    id: "common_elder_003",
    tags: ["elder", "family", "death"],
    conditions: { aged: true, npcs: ["spouse"] },
    weight: 6,
    text: "{配偶者}が床に伏せ、日に日に弱っていく。",
    choices: [
      {
        text: "最期まで手を握り続ける",
        effects: { npcState: { spouse: "dead" }, health: -5 },
        log: { title: "伴侶の{配偶者}を看取る", text: "長年連れ添った{配偶者}が、静かに旅立った。" },
      },
    ],
  },
  {
    id: "common_elder_004",
    tags: ["elder", "friend"],
    conditions: { aged: true, npcs: ["friend"] },
    weight: 10,
    text: "{友人}から手紙が届いた。「久しぶりに、あの広場で会わないか」",
    choices: [
      {
        text: "会いに行く",
        result: "互いに皺だらけになった顔を見て、二人は声を上げて笑った。",
        effects: { health: 3, npc: { friend: { intimacy: 10 } } },
        log: { title: "旧友{友人}と語り合う", text: "幼き日の思い出を語り合い、穏やかな時を過ごした。" },
      },
      {
        text: "返事だけ書く",
        effects: { npc: { friend: { intimacy: 2 } } },
      },
    ],
  },
  {
    id: "common_elder_005",
    tags: ["elder", "health"],
    conditions: { aged: true },
    repeatable: true,
    cooldown: 4,
    text: "最近、咳が止まらない。",
    choices: [
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 30 } } },
        text: "薬師にかかる",
        effects: { money: -30, health: 5 },
      },
      {
        text: "放っておく",
        effects: { health: [-15, -5] },
      },
    ],
  },
]);
