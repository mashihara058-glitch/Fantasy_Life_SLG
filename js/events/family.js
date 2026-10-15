// 家族（兄弟姉妹）
// 兄弟姉妹の差し込みは {兄弟}（名前）と {兄弟の続柄}（兄・姉・弟・妹）
GAME.registerEvents([
  {
    id: "common_family_newsibling",
    tags: ["childhood", "adolescence", "family"],
    conditions: {
      ageMin: 1,
      ageMax: 14,
      npcs: ["father", "mother"],
      npcAgeMax: { mother: 42 },
      custom: (s) => s.npcs.filter((n) => n.role === "sibling").length < 6,
    },
    weight: 5,
    repeatable: true,
    cooldown: 2,
    maxTimes: 3,
    text: "{母}のお腹が、日に日に大きくなっていく。そしてある朝、家に小さな産声が響いた。",
    choices: [
      {
        text: "生まれた赤子をのぞき込む",
        result: "{兄弟の続柄}の{兄弟}だ。小さな手が、{名前}の指をぎゅっと握った。",
        effects: { addNpc: { role: "sibling", age: 0, trust: 50, intimacy: [55, 75] } },
        log: { title: "{兄弟の続柄}の{兄弟}が生まれる", text: "家族がひとり増えた。" },
      },
      {
        text: "両親を取られた気がして、すねる",
        result: "{兄弟の続柄}の{兄弟}が生まれた。みんな赤子にかかりきりだ。",
        effects: { addNpc: { role: "sibling", age: 0, trust: 40, intimacy: [20, 40] } },
        log: { title: "{兄弟の続柄}の{兄弟}が生まれる", text: "家族がひとり増えたが、素直に喜べなかった。" },
      },
    ],
  },
  {
    id: "common_family_sibling_001",
    tags: ["childhood", "family"],
    conditions: { ageMin: 3, ageMax: 11, npcs: ["sibling"] },
    repeatable: true,
    cooldown: 4,
    maxTimes: 2,
    text: "{兄弟の続柄}の{兄弟}と、最後の焼き菓子をめぐって睨み合いになった。",
    choices: [
      {
        text: "譲ってあげる",
        effects: { reputation: 1, npc: { sibling: { intimacy: 10 } } },
      },
      {
        text: "力ずくで奪い取る",
        effects: { health: 1, npc: { sibling: { trust: -10, intimacy: -5 } } },
      },
    ],
  },
  {
    id: "common_family_sibling_002",
    tags: ["adolescence", "young", "family"],
    conditions: { ageMin: 15, ageMax: 30, npcs: ["sibling"], notFlags: ["inheritance_settled", "slave"] },
    weight: 8,
    text: "家を継ぐのは誰か、という話が持ち上がった。{兄弟の続柄}の{兄弟}も、じっとこちらの出方をうかがっている。",
    choices: [
      {
        text: "{兄弟}に譲る",
        effects: { addFlags: ["inheritance_settled"], npc: { sibling: { trust: 15, intimacy: 5 } } },
      },
      {
        text: "自分こそが跡継ぎだと主張する",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "親族の多くが{名前}を推した。{兄弟}は唇を噛んで黙り込んだ。",
          effects: { reputation: 5, money: 80, addFlags: ["inheritance_settled", "heir"], npc: { sibling: { trust: -20 } } },
          log: { title: "家督争いに勝つ", text: "{兄弟の続柄}の{兄弟}を退け、家の跡継ぎとなった。" },
        },
        failure: {
          result: "親族たちは{兄弟}を選んだ。",
          effects: { addFlags: ["inheritance_settled"], npc: { sibling: { trust: -15 } } },
          log: { title: "家督争いに敗れる", text: "跡継ぎの座は{兄弟の続柄}の{兄弟}のものとなった。" },
        },
      },
    ],
  },
  {
    id: "common_family_sibling_003",
    tags: ["prime", "family"],
    conditions: { ageMin: 25, ageMax: 59, npcs: ["sibling"] },
    weight: 5,
    repeatable: true,
    cooldown: 8,
    text: "{兄弟の続柄}の{兄弟}が、久しぶりに訪ねてきた。",
    choices: [
      {
        text: "昔話に花を咲かせる",
        effects: { health: 2, npc: { sibling: { intimacy: 10 } } },
      },
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 50 } } },
        text: "暮らし向きが苦しいらしい。金を援助する（50ゴールド）",
        effects: { money: -50, npc: { sibling: { trust: 15, intimacy: 5 } } },
      },
      {
        text: "忙しいと言って追い返す",
        effects: { npc: { sibling: { trust: -10, intimacy: -10 } } },
      },
    ],
  },
]);
