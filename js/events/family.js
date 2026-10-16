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

  // ---------- 孫 ----------
  // 子が成人したあと発生する。主人公の実年齢ではなく「子の年齢」で判定するので、
  // 長寿種族でも、子どもがいれば自然に孫が生まれる。
  {
    id: "common_family_grandchild",
    tags: ["prime", "elder", "family"],
    conditions: {
      npcs: ["child"],
      npcAgeMin: { child: 18 },
      custom: (s) => s.npcs.filter((n) => n.role === "grandchild").length < 6,
    },
    weight: 12,
    repeatable: true,
    cooldown: 4,
    maxTimes: 5,
    text: "{子}のもとから使いが来た。新しい命が授かったという。",
    choices: [
      {
        text: "生まれた孫に会いに行く",
        result: "小さな手が、{名前}の指を握った。名は{孫}。",
        effects: {
          addNpc: { role: "grandchild", age: 0, trust: 60, intimacy: 65 },
          npc: { child: { trust: 5, intimacy: 10 } },
          health: 2,
        },
        log: { title: "孫の{孫}が生まれる", text: "{子}に子どもが生まれ、{名前}は祖父母になった。" },
      },
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 40 } } },
        text: "祝い金を持って会いに行く（40ゴールド）",
        result: "{子}は涙ぐんで礼を言った。赤子の名は{孫}。",
        effects: {
          money: -40,
          addNpc: { role: "grandchild", age: 0, trust: 65, intimacy: 70 },
          npc: { child: { trust: 10, intimacy: 15 } },
          reputation: 2,
        },
        log: { title: "孫の{孫}が生まれる", text: "祝い金を持参し、{子}の子・{孫}と対面した。" },
      },
      {
        text: "手紙で祝福を伝える",
        result: "返事とともに、{孫}という名が記されていた。",
        effects: {
          addNpc: { role: "grandchild", age: 0, trust: 50, intimacy: 40 },
          npc: { child: { intimacy: 5 } },
        },
        log: { title: "孫の{孫}が生まれる", text: "遠方から、{子}に子どもが生まれた知らせを受けた。" },
      },
    ],
  },
  {
    id: "common_family_grandchild_visit",
    tags: ["elder", "family"],
    conditions: { aged: true, npcs: ["grandchild"], npcAgeMin: { grandchild: 3 } },
    weight: 10,
    repeatable: true,
    cooldown: 5,
    text: "孫の{孫}が、はしゃぎながら訪ねてきた。",
    choices: [
      {
        text: "昔話を聞かせる",
        effects: { health: 2, npc: { grandchild: { trust: 5, intimacy: 10 } } },
      },
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 20 } } },
        text: "小遣いを渡す（20ゴールド）",
        effects: { money: -20, npc: { grandchild: { intimacy: 15 } } },
      },
      {
        text: "外で一緒に遊ぶ",
        effects: { health: -2, npc: { grandchild: { intimacy: 12 } } },
      },
    ],
  },
]);
