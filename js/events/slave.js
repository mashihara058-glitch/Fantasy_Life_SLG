// 奴隷の仕事イベント
// 就職先は主に miner / prostitute への「商品」としての売却。
// 方針: 18歳未満を性労働へ売却するルートは作らない（prostitute.js と同じ）。
// flags.slave は自由を失っている印。職業が変わっても、解放イベントまで残す想定。
GAME.registerEvents([
  {
    id: "slave_001",
    tags: ["adolescence", "young", "prime", "elder", "work", "slave"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    conditions: { jobs: ["slave"], flags: ["slave"] },
    text: "奴隷商に言いつけられた。「自分たちの世話は、自分でしろ」。",
    choices: [
      {
        text: "粉を挽く",
        check: { chance: 50 },
        success: {
          result: "横木を押し、重い臼を回す。腕が震え、それでも夜には体が少しだけ硬くなった気がする。",
          effects: { health: 1, ability: 1 },
        },
        failure: {
          result: "一日中、棒だけが回る。虚無と疲労以外、何も残らなかった。",
          effects: { health: -3 },
        },
      },
      {
        text: "掃除をする",
        check: { chance: 50 },
        success: {
          result: "物陰に銅貨が落ちていた。誰の名も刻まれていない。そっと掌に収める。",
          effects: { money: 3 },
        },
        failure: {
          result: "汚物の桶を運ぶ係になった。臭いが、いつまでも喉の奥に残る。",
          effects: { health: -2 },
        },
      },
      {
        text: "調理を手伝う",
        check: { chance: 50 },
        success: {
          result: "味見という名目で、わずかに口にできた。今夜だけは、腹が静かだ。",
          effects: { health: 2 },
        },
        failure: {
          result: "足を滑らせ、椀を床に返す。罰として、今夜の食事はなかった。",
          effects: { health: -2 },
        },
      },
    ],
  },
  {
    id: "slave_002",
    tags: ["adolescence", "young", "prime", "elder", "work", "slave"],
    weight: 9,
    repeatable: true,
    cooldown: 3,
    conditions: { jobs: ["slave"], flags: ["slave"] },
    text: "商品価値を上げるためだ、と命じられた。身体も衣も、清潔にしろ、と。",
    choices: [
      {
        text: "洗濯をする",
        check: { chance: 55 },
        success: {
          result: "水汲みは重い。それでも乾いた布に袖を通すと、気分だけが少し軽い。",
          effects: { health: 2 },
        },
        failure: {
          result: "真冬の水仕事で、指にあかぎれが走る。清潔さの代償は、痛みだ。",
          effects: { health: -3 },
        },
      },
      {
        text: "衣服を繕う",
        check: { stat: "ability", difficulty: 42 },
        success: {
          result: "端切れで穴を塞ぐ。上手い、と他の奴隷からも針を回された。",
          effects: { ability: 2 },
        },
        failure: {
          result: "裾を直すつもりが、丈まで短くなった。肌が冷え、夜が長い。",
          effects: { health: -2, ability: 1 },
        },
      },
      {
        text: "体を洗う",
        check: { chance: 55 },
        success: {
          result: "珍しく温い湯が出た。絞った布で体を拭くと、檻の中でも人の形に戻った気がする。",
          effects: { health: 2 },
        },
        failure: {
          result: "冷水を浴びせられる。芯まで冷え、歯が鳴る。",
          effects: { health: -2 },
        },
      },
    ],
  },
  {
    id: "slave_003",
    tags: ["adolescence", "young", "prime", "elder", "work", "slave"],
    weight: 8,
    repeatable: true,
    cooldown: 4,
    logOnce: true,
    conditions: { jobs: ["slave"], flags: ["slave"] },
    text: "客が来た。鉱山向きの奴隷を探しているらしい。「頑丈で、よく働くやつがいい」。奴隷商が檻を見渡す。",
    choices: [
      {
        text: "目立つ場所へ進み出る",
        check: { stat: "health", difficulty: 48 },
        success: {
          result: "腕と背を触られ、「健康そうだ。お前でいい」と銀が渡る。鎖の行き先が、坑道の匂いに変わる。",
          effects: {
            job: "miner",
            health: -2,
            // slave フラグは維持（所有関係は続く）
          },
          log: {
            title: "鉱山奴隷として売られる",
            text: "奴隷商の檻から、鉱山へ買い取られた。",
            important: true,
          },
        },
        failure: {
          result: "客は顎をしゃくる。「こんなひ弱いのはすぐに潰れる」。奴隷商に、再び檻へ戻された。",
          effects: { health: -1, reputation: -1 },
        },
      },
      {
        text: "物陰に身を縮める",
        result: "今日の銀は、別の背中に落ちた。坑道の話だけが、檻の外を通り過ぎる。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "slave_004",
    tags: ["young", "prime", "work", "slave"],
    weight: 8,
    repeatable: true,
    cooldown: 4,
    logOnce: true,
    conditions: {
      // 性労働への売却は成人のみ（未成年ルートは作らない）
      ageMin: 18,
      jobs: ["slave"],
      flags: ["slave"],
    },
    text: "夜の店の匂いをまとった客が来た。「顔がいいか、肉付きのいいのがいいね」。奴隷商が檻を舐めるように見る。",
    choices: [
      {
        conditions: { ageMax: 35 },
        text: "売れるように、前へ出る",
        check: { stat: "health", difficulty: 48 },
        success: {
          result: "客は顎を掴み、「仕込みがいがありそうだ」と短く笑った。銀が鳴り、檻の鍵が夜の扉に変わる。",
          effects: {
            job: "prostitute",
            addFlags: ["prostitute"],
            health: -2,
          },
          log: {
            title: "娼館へ売られる",
            text: "奴隷商の檻から、夜の店へ買い取られた。",
            important: true,
          },
        },
        failure: {
          result: "客は首を振る。「痩せすぎだ。うちでは持て余す」。再び、鉄格子の影に戻された。",
          effects: { health: -1 },
        },
      },
      {
        conditions: { ageMin: 36 },
        text: "売れるように、前へ出る",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "客は目を細める。「とうが立っても、まだ売れる顔だ」。銀が渡り、今夜から店の名簿に名が載る。",
          effects: {
            job: "prostitute",
            addFlags: ["prostitute"],
            health: -2,
          },
          log: {
            title: "娼館へ売られる",
            text: "奴隷商の檻から、夜の店へ買い取られた。",
            important: true,
          },
        },
        failure: {
          result: "「悪くはないが、うちの客層と違う」。奴隷商の舌打ちだけが、近くで落ちる。",
          effects: { reputation: -1 },
        },
      },
      {
        text: "物陰に身を縮める",
        result: "今日選ばれたのは、別の誰かだ。夜の匂いだけが、檻の隙間を通り過ぎていく。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "slave_005",
    tags: ["adolescence", "young", "prime", "elder", "work", "slave"],
    weight: 7,
    repeatable: true,
    cooldown: 5,
    conditions: { jobs: ["slave"], flags: ["slave"] },
    text: "同じ檻の者が、逃げ話を囁いている。今夜の見張りは薄い、と。",
    choices: [
      {
        text: "計画に乗る",
        check: { chance: 35 },
        success: {
          result: "泥と闇にまぎれ、塀を越えた。足は自由だ。ただし後ろには、いつか来る追捕の影がある。",
          effects: {
            job: null,
            removeFlags: ["slave"],
            addFlags: ["fugitive"],
            health: -4,
            reputation: -5,
          },
          log: {
            title: "奴隷の檻から逃げ出す",
            text: "監視の隙をつき、逃亡奴隷となった。",
            important: true,
          },
        },
        failure: {
          result: "犬の声が先に上がる。連れ戻され、罰の鞭が背に落ちる。",
          effects: { health: [-18, -8], reputation: -3 },
          log: {
            title: "脱走に失敗する",
            text: "逃げようとして捕まり、厳しい罰を受けた。",
          },
        },
      },
      {
        text: "知らん顔をする",
        result: "囁きは夜の向こうへ消える。自分の鎖だけが、いつも通り冷たい。",
        effects: { health: -1 },
      },
    ],
  },
]);
