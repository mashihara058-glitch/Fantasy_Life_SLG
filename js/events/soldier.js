// 兵士の日常・訓練（低〜中難度。ability 回復・兵舎生活の厚み）
// 昇進（騎士）は career.js
GAME.registerEvents([
  {
    id: "soldier_001",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 9,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["soldier"],
      npcs: ["rival"],
      notFlags: ["slave"],
    },
    text: "兵舎の訓練場で{ライバル}と再会した。{ライバル}も、兵士になっていたようだ。",
    choices: [
      {
        text: "手合わせを願い出る",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "いい勝負だった。打ち合うたびに、腕の感覚が確かになる。",
          effects: { ability: 3, npc: { rival: { trust: 5 } } },
        },
        failure: {
          result: "{ライバル}にコテンパンにやられた。それでも、学びはある。",
          effects: { ability: 1, health: -2, npc: { rival: { trust: 3 } } },
        },
      },
      {
        text: "特に何もしない",
        result: "{ライバル}のことは横目に、自分の訓練にいそしんだ。",
        effects: { ability: 2 },
      },
    ],
  },
  {
    id: "soldier_002",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 9,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["soldier","knight"],
      notFlags: ["slave"],
    },
    text: "夜警の仕事中、不審な人影を見つけた。",
    choices: [
      {
        text: "声をかける",
        check: { stat: "ability", difficulty: 38 },
        success: {
          result: "千鳥足の酔っ払いだった。肩を貸し、家まで送り届けた。",
          effects: { ability: 1, reputation: 1 },
        },
        failure: {
          result: "見間違いだったのか、近寄ると誰もいなかった。冷えだけが残る。",
          effects: { ability: 1 },
        },
      },
      {
        text: "気づかなかったことにする",
        result: "声はかけず、体力を温存した。巡回の足音だけが続く。",
        effects: { health: 1, reputation: -1 },
      },
    ],
  },
  {
    id: "soldier_003",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 9,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["soldier","knight"],
      notFlags: ["slave"],
    },
    text: "今日は行軍訓練だ。重い荷物を背負って野外を駆ける。体力の少ない新入りの足が遅い。",
    choices: [
      {
        text: "声をかけ、一緒に走る",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "励ましながら並走した。遅れは、怒られない程度で済んだ。",
          effects: { ability: 1, reputation: 2, health: -1 },
        },
        failure: {
          result: "新入りの速度に合わせ、二人とも大きく遅れた。罰として、帰りは荷物を重くされた。",
          effects: { health: -3, reputation: 1 },
        },
      },
      {
        text: "自分の訓練に集中する",
        result: "他人のことは気にせず走った。後で、新人が罰を受けているのを見た。",
        effects: { ability: 2 },
      },
    ],
  },
  {
    id: "soldier_004",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["soldier","knight"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "兵舎の倉庫の点検中、剣の数が合わない気がした。",
    choices: [
      {
        text: "自分で数え直す",
        check: { stat: "ability", difficulty: 38 },
        success: {
          result: "丁寧に数え直すと、木箱の隙間に一本、倒れていた。",
          effects: { ability: 1, reputation: 1 },
        },
        failure: {
          result: "何度数えても合わない。上官に「見つかるまで残業だ」と叱責された。",
          effects: { health: -2 },
        },
      },
      {
        text: "同僚に手分けを頼む",
        check: { chance: 65 },
        success: {
          result: "手分けして再点検した。数が合い、倉庫の鍵が静かに閉まる。",
          effects: { ability: 1, reputation: 1 },
        },
        failure: {
          result: "「手伝う代わりに一杯おごれ」——仕事は終わったが、財布には痛手だった。",
          effects: { money: -5, reputation: 1 },
        },
      },
    ],
  },
  {
    id: "soldier_005",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["soldier","knight"],
      notFlags: ["slave"],
    },
    text: "警備中、さぼっている同僚を見つけた。",
    choices: [
      {
        text: "注意する",
        check: { stat: "reputation", difficulty: 40 },
        success: {
          result: "同僚はすぐに持ち場へ戻った。短い礼が、一つ残る。",
          effects: { ability: 1, reputation: 1 },
        },
        failure: {
          result: "「{名前}はお堅くてつまらない」——そういう噂が、兵舎の片隅で小さく飛ぶ。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "見て見ぬふりをする",
        check: { chance: 70 },
        success: {
          result: "後でさぼりがバレ、同僚だけが叱られていた。自分には、関係ない。",
          effects: { ability: 1 },
        },
        failure: {
          result: "当番全員の連帯責任になった。罰は馬小屋掃除だ。",
          effects: { health: -2, reputation: -1 },
        },
      },
    ],
  },
  {
    id: "soldier_006",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 9,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["soldier"],
      notFlags: ["slave"],
    },
    text: "今日は祭りだ。町に常駐する兵士は、警備の任にあたる。",
    choices: [
      {
        text: "迷子を保護する",
        check: { stat: "reputation", difficulty: 38 },
        success: {
          result: "母親とはぐれた子を見つけた。幼い声の「ありがとう」に、肩が少し軽い。",
          effects: { ability: 1, reputation: 2 },
        },
        failure: {
          result: "人ごみで探すのに時間がかかりすぎた。さぼりを疑われ、あとで詰められた。",
          effects: { health: -1, reputation: -1 },
        },
      },
      {
        text: "喧嘩を止める",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "酔っ払い同士を引き離した。けが人が出なくてよかった。",
          effects: { ability: 1, reputation: 2, health: -1 },
        },
        failure: {
          result: "酔っ払いの拳が鼻を打った。祭りの灯りが、一瞬にじむ。",
          effects: { health: -3 },
        },
      },
      {
        text: "特に変わったことはしない",
        result: "祭りの空気は、眺めているだけでも満ちる。定時のあと、屋台の熱い匂いについた。",
        effects: { health: 2 },
      },
    ],
  },
  {
    id: "soldier_007",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["soldier","knight"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "商店で迷惑行為をしている客を取り押さえた。しかし相手は、貴族の子弟だと分かった。",
    choices: [
      {
        text: "規定どおり粛々と対応する",
        check: { stat: "reputation", difficulty: 42 },
        success: {
          result: "罰金は規定どおり科された。貴族家からは「身内が迷惑をかけた」と短い手紙が来ただけだった。",
          effects: { ability: 1, reputation: 2 },
        },
        failure: {
          result: "罰金は科せた。後日、上官に「なぜ忖度しなかったのか」と詰められる。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "賄賂を要求する",
        check: { chance: 65 },
        success: {
          result: "小遣いと引き換えに子弟を解放した。銀は重い。胸の奥も、少し重い。",
          effects: { money: 20, reputation: -5 },
        },
        failure: {
          result: "収賄が上官にバレた。懲戒と減給を食らう。",
          effects: { money: -10, reputation: -4, health: -1 },
        },
      },
      {
        text: "上官に判断をゆだねる",
        result: "自分の裁量では抱えず、上官へ回した。あとの紙仕事は、上の者のものだ。",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "soldier_008",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["soldier","knight"],
      notFlags: ["slave"],
    },
    text: "最近、治安が悪く出動が多い。なんだか、疲れた。",
    choices: [
      {
        text: "酒で気を紛らわす",
        check: { stat: "health", difficulty: 35 },
        success: {
          result: "嫌な気分は酒で洗い流すに限る。翌朝の点呼には、間に合った。",
          effects: { health: 2 },
        },
        failure: {
          result: "深酒のあとに寝坊した。点呼遅れで、こっぴどく叱られる。",
          effects: { reputation: -2, health: -1 },
        },
      },
      {
        text: "同僚に愚痴をこぼす",
        check: { stat: "reputation", difficulty: 35 },
        success: {
          result: "「自分もそう思っていた」——共感が集まり、胸のつかえが少し下りる。",
          effects: { reputation: 1, health: 1 },
        },
        failure: {
          result: "上官に「私語は慎め」と短く切られた。",
          effects: { reputation: -1 },
        },
      },
      {
        text: "考えないことにする",
        result: "考えるのをやめ、次の当番へ体を運んだ。",
        effects: { ability: 1 },
      },
    ],
  },
  {
    // 兵士段階の「小競り合い前」——本戦の核心は騎士・前線へ譲る
    id: "soldier_009",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 7,
    repeatable: true,
    cooldown: 6,
    maxTimes: 3,
    conditions: {
      jobs: ["soldier"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "国境に不穏の兆しだという。哨戒のため、遠征に出ることになった。",
    choices: [
      {
        text: "不吉な気がして、お守りを求める",
        check: { chance: 55 },
        success: {
          result: "市場で手に取った小さなお守り。気休めだが、指の腹が少し温かい。",
          effects: { money: -4, health: 2, ability: 1 },
        },
        failure: {
          result: "考えすぎて眠れない夜が続いた。遠征中、体が重い。",
          effects: { health: -2 },
        },
      },
      {
        text: "一兵卒として黙々と任務につく",
        result: "自分にできることは限られている。荷物を確かめ、列に並んだ。",
        effects: { ability: 1, health: -2 },
      },
    ],
  },
  {
    // 農夫一揆と同世界の兵士側の手触り（真偽不明の出動）
    id: "soldier_010",
    tags: ["young", "prime", "elder", "work", "soldier"],
    weight: 7,
    repeatable: true,
    cooldown: 7,
    maxTimes: 2,
    logOnce: true,
    conditions: {
      ageMin: 16,
      jobs: ["soldier"],
      notFlags: ["slave"],
    },
    text: "農村で反乱が起きた、という知らせだ。真偽はわからないが、現地へ向かうことになった。",
    choices: [
      {
        text: "まず農民の話を聞く",
        check: { chance: 70 },
        success: {
          result: "不満はある。だが、まだ話し合いで止められる段階だった。代官へも伝え、刀を抜かずに済んだ。",
          effects: { ability: 2, reputation: 2, addFlags: ["soldier_revolt_talk"] },
          log: {
            title: "反乱報の村で話し合いを優先する",
            text: "出動先で農民の話を聞き、穏便な道を選んだ。",
          },
        },
        failure: {
          result: "報せは本当だった。矛と鎌が並ぶ畑で、捕縛に手を貸すことになる。灰と土の匂いが、手袋に残る。",
          effects: { health: -5, ability: 1, reputation: -1, addFlags: ["soldier_revolt_clash"] },
          log: {
            title: "反乱の村で農民と衝突する",
            text: "出動先で争いとなり、捕縛に加わった。",
          },
        },
      },
      {
        text: "最初から武力で押さえる",
        result: "首謀の疑いがある者を何人か捕らえた。取り調べは別の者がやる。自分は、列を組んで帰途につく。",
        effects: { ability: 1, health: -2, reputation: -2, addFlags: ["soldier_revolt_clash"] },
      },
    ],
  },
]);
