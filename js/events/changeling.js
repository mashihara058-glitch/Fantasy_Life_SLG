// チェンジリング（取り換え子）専用イベント
// 生まれつき "changeling" フラグを持つ。種族は問わない。
// 友人・恋愛系のイベントは weightMods で発生しにくくしている（childhood.js などを参照）。
GAME.registerEvents([
  {
    id: "sys_birth_changeling",
    tags: ["childhood", "birth", "changeling"],
    forced: true,
    priority: 10,
    conditions: { ageMax: 0, flags: ["changeling"] },
    text: "{出身}に生まれたその赤子は、透けるように白い肌と、どこか遠くを見つめる瞳をしていた。\n名は{名前}。我が子を抱いた{母}は、言いようのない違和感を覚えた。",
    log: { title: "取り換え子として生まれる", text: "人ならざるものの気配をまとって生まれた。" },
    choices: [
      {
        text: "じっと{母}を見つめ返した",
        effects: { ability: 3, npc: { mother: { intimacy: -20 }, father: { intimacy: -15 } } },
      },
      {
        text: "聞いたこともない旋律を口ずさんだ",
        effects: { addFlags: ["fairy_song"], npc: { mother: { trust: -15 }, father: { trust: -20 } } },
      },
    ],
  },
  {
    id: "common_changeling_001",
    tags: ["childhood", "changeling", "friend"],
    conditions: { ageMin: 4, ageMax: 11, flags: ["changeling"] },
    weight: 20,
    text: "村の子どもたちが、{名前}を見ると口をつぐんで離れていく。「あいつは妖精の子だ」という囁きが聞こえた。",
    choices: [
      {
        text: "気にしないふりをする",
        effects: { ability: 2, reputation: -2 },
      },
      {
        text: "森へ行き、妖精たちと遊ぶ",
        result: "木漏れ日の中で、小さな羽音たちが{名前}を迎えた。ここでは誰も目を逸らさない。",
        effects: { health: 3, reputation: -3, addFlags: ["fairy_friend"] },
        log: { title: "森の妖精たちと親しくなる", text: "人の輪に入れず、森の妖精たちを友とした。" },
      },
      {
        conditions: { npcs: ["mother"] },
        text: "{母}の服の裾にしがみつく",
        result: "{母}は一瞬ためらったあと、そっと{名前}の頭を撫でた。",
        effects: { npc: { mother: { intimacy: 10, trust: 5 } } },
      },
    ],
  },
  {
    id: "common_changeling_002",
    tags: ["adolescence", "changeling"],
    conditions: { ageMin: 12, ageMax: 17, flags: ["changeling"], notFlags: ["chose_human_world"] },
    weight: 25,
    text: "満月の夜、窓辺に小さな影が立った。「迎えに来たよ、私たちの子。帰っておいで」",
    choices: [
      {
        text: "手を取り、妖精の国へ行く",
        result: "月光の道を渡った先で、{名前}は二度と振り返らなかった。",
        effects: { death: "妖精郷へ去る" },
        log: { title: "妖精の国へ去る", text: "人の世を離れ、二度と戻らなかった。" },
      },
      {
        text: "人の世界に残る",
        result: "影は寂しげに微笑み、霧の中に消えた。",
        effects: { reputation: 3, addFlags: ["chose_human_world"], npc: { mother: { intimacy: 10 } } },
        log: { title: "妖精の迎えを断る", text: "人として生きることを選んだ。" },
      },
    ],
  },
  {
    id: "common_changeling_003",
    tags: ["young", "prime", "changeling"],
    conditions: { ageMin: 18, ageMax: 59, flags: ["changeling"], notFlags: ["slave"] },
    repeatable: true,
    cooldown: 8,
    maxTimes: 3,
    text: "人々は{名前}の不思議な才を頼りにしながらも、決して心を許そうとはしない。",
    choices: [
      {
        text: "距離を保ったまま生きる",
        effects: { ability: 3 },
      },
      {
        text: "誠実さで信頼を勝ち取ろうとする",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "少しずつ、挨拶を返してくれる人が増えていった。",
          effects: { reputation: 10, addFlags: ["changeling_accepted"] },
          log: { title: "人々に受け入れられ始める", text: "取り換え子への偏見を、誠実さで少しずつ溶かした。" },
        },
        failure: {
          result: "差し出した手は、気味悪そうに払いのけられた。",
          effects: { reputation: -5, addTraits: ["distrustful"] },
        },
      },
    ],
  },
]);
