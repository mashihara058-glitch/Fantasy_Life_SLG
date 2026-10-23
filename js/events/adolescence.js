// 少年少女期（12〜17歳）
GAME.registerEvents([
  {
    id: "common_adolescence_001",
    tags: ["adolescence", "magic", "education"],
    conditions: { ageMin: 12, ageMax: 15, flags: ["magic_spark"] },
    weight: 30,
    text: "王都の魔術学院から、才能ある子どもを探す使者が村にやって来た。",
    choices: [
      {
        text: "入学試験を受ける",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "試験官は目を見張り、その場で合格を告げた。",
          effects: { ability: 10, addFlags: ["magic_student"] },
          log: { title: "魔術学院に入学する", text: "才能を認められ、王都で魔法を学び始めた。" },
        },
        failure: {
          result: "緊張で光はうまく灯らなかった。使者は気の毒そうに首を振った。",
          effects: { ability: 2 },
        },
      },
      {
        text: "家族のそばに残る",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "common_adolescence_002",
    tags: ["adolescence", "work", "mentor"],
    conditions: { ageMin: 12, ageMax: 15, noNpcs: ["mentor"], moneyUnlocked: false, notFlags: ["magic_student"] },
    text: "腕の良い職人が、住み込みの弟子を探していると聞いた。",
    choices: [
      {
        text: "弟子入りを志願する",
        result: "師匠の{師匠}は無口だが、手仕事は見事だった。",
        effects: { addNpc: { role: "mentor", age: [40, 60], trust: 40 }, job: "apprentice", ability: 3 },
        log: { title: "{師匠}に弟子入りする", text: "職人の{師匠}のもとで、住み込みの修行を始めた。" },
      },
      {
        text: "今は家にいたい",
      },
    ],
  },
  {
    id: "common_adolescence_003",
    tags: ["adolescence", "rival"],
    conditions: { ageMin: 12, ageMax: 17, noNpcs: ["rival"] },
    text: "同じ年頃の若者が、何かにつけてあなたに張り合ってくる。",
    choices: [
      {
        text: "受けて立つ",
        result: "{ライバル}との競い合いの日々が始まった。",
        effects: { addNpc: { role: "rival", trust: 30, intimacy: 20 }, ability: 3 },
        log: { title: "{ライバル}と競い合う", text: "生涯の好敵手となる{ライバル}と出会った。" },
      },
      {
        text: "相手にしない",
        effects: { addNpc: { role: "rival", trust: 20, intimacy: 5 }, reputation: 1 },
      },
    ],
  },
  {
    id: "common_adolescence_004",
    tags: ["adolescence", "love"],
    conditions: { ageMin: 14, ageMax: 17, noNpcs: ["lover", "spouse"] },
    weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
    text: "収穫祭の夜。篝火の向こうで、ある人と目が合った。",
    choices: [
      {
        text: "踊りに誘う",
        check: { stat: "reputation", difficulty: 35 },
        success: {
          result: "{恋人}は少し頬を染めて、手を取ってくれた。",
          effects: { addNpc: { role: "lover", intimacy: 50, trust: 40 } },
          log: { title: "{恋人}と恋に落ちる", text: "収穫祭の夜、初めての恋が始まった。" },
        },
        failure: {
          result: "断られてしまった。篝火がやけにまぶしかった。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "見ているだけにする",
      },
    ],
  },
  {
    id: "common_adolescence_005",
    tags: ["adolescence", "friend"],
    conditions: { ageMin: 13, ageMax: 17, npcs: ["friend"] },
    weight: 12,
    text: "{友人}が青ざめた顔で打ち明けてきた。たちの悪い連中に借りを作ってしまったらしい。",
    choices: [
      {
        text: "一緒に頭を下げに行く",
        result: "二人で何日も働いて、ようやく借りを返した。{友人}は「この恩は忘れない」と言った。",
        effects: { health: -5, reputation: 2, npc: { friend: { trust: 25, intimacy: 10 } }, addFlags: ["helped_friend"] },
        log: { title: "窮地の{友人}を助ける", text: "友のために汗を流し、固い絆を結んだ。" },
      },
      {
        text: "関わらないことにする",
        result: "{友人}は何も言わずに去っていった。",
        effects: { npc: { friend: { trust: -30, intimacy: -20 } }, addFlags: ["abandoned_friend"] },
        log: { title: "{友人}を見捨てる", text: "助けを求める友に背を向けた。", important: false },
      },
    ],
  },
  {
    id: "common_adolescence_006",
    tags: ["adolescence", "training"],
    conditions: { ageMin: 12, ageMax: 17 },
    repeatable: true,
    cooldown: 2,
    text: "将来、自分は何になるのだろう。{名前}はぼんやりと考えていた。",
    choices: [
      { text: "剣の稽古に励む", effects: { health: 3, addFlags: ["swordplay"] } },
      { text: "本を読みふける", effects: { ability: 3 } },
      { text: "町の人と話して回る", effects: { reputation: 3 } },
      { text: "料理を手伝う", effects: { health: 3, addFlags: ["cooking"] } },
    ],
  },
  {
  id: "common_adolescence_007",
  tags: ["adolescence"],
  weight: 10,
  weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
  conditions: {
    noNpcs: ["lover", "rival"]
  },
  text: "最近気になる相手がいる。",
  choices: [
    {
      text: "話しかける",
      check: { chance: 50 },
      success: {
        result: "{恋人}と過ごす時間は夢のようだった。{恋人}といい雰囲気になった。",
        effects: { addNpc: { role: "lover", intimacy: 50, trust: 40 } },
        log: { title: "{恋人}と恋に落ちる", text: "少し言葉を交わしただけで、魂が震えた。" },
      },
      failure: {
        result: "自分が先に話しかけようとした、と割り込んできた者がいた。その人の名は{ライバル}。{名前}と{ライバル}はその後も張り合う関係となった。",
        effects: { addNpc: { role: "rival", intimacy: 30, trust: 20 } },
        log: { title: "\"{ライバル}と競い合う\"", text: "生涯の好敵手となる{ライバル}と出会った。" },
      },
    },
    {
      text: "手紙を出す",
      check: { stat: "reputation", difficulty: 50 },
      success: {
        result: "数日経って{恋人}から返事が来た。それから手紙のやり取りは続き、すべての手紙は{名前}の宝物になった。",
        effects: { addNpc: { role: "lover", intimacy: 50, trust: 40 } },
        log: { title: "{恋人}と恋仲になる", text: "始まりは平凡で静かだった。" },
      },
      failure: {
        result: "残念ながら、返事は来なかった。",
      },
    }
  ],
},
{
  id: "common_adolescence_008",
  tags: ["adolescence"],
  weight: 8,
  weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
  text: "見慣れない子がいることに気付いた。家族の事情で、最近引っ越してきたらしい。",
  choices: [
    {
      text: "遊びに誘う",
      result: "その子の名は{友人}。不思議と気が合った。",
      effects: { addNpc: { role: "friend", intimacy: 50 } },
    },
    {
      text: "特に何もしない",
    }
  ],
},
{
  id: "common_adolescence_009",
  tags: ["adolescence"],
  weight: 6,
  conditions: {
    ageMin: 10,
    ageMax: 13,
    origin: ["farmer", "craftsman", "merchant"],
    notFlags: ["slave"]
  },
  text: "今年はひどい不作だったらしい。不景気のため、我が家の家計も厳しい。",
  choices: [
    {
      text: "口減らしに志願する",
      result: "家族のために自分を金に換えた。",
      effects: { job: "slave", addFlags: ["slave"] },
      log: { title: "奉公に出た", text: "家族のために苦労を買った。" },
    },
    {
      text: "家業を手伝う",
      check: { stat: "ability", difficulty: 50 },
      success: {
        result: "家族のため、子供ながらに頑張った。",
        effects: { reputation: 1 },
      },
      failure: {
        result: "役に立つことをアピールしたが、食事は増えなかった。",
        effects: { health:-2 },
      },
    }
  ],
},
]);
