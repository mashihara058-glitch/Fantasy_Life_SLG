GAME.registerEvents([
  {
    id: "adventurer_001",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 17, jobs: ["adventurer"], jobYearsMin: 10 },
    weight: 10,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    text: "ギルドの掲示板に、竜の巣の調査依頼が貼り出されている。報酬は破格だ。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "竜の目を盗んで巣を調べ上げ、無事に帰還した。ギルド中の噂の的だ。",
          effects: { money: 150, reputation: 10, ability: 5, addFlags: ["dragon_survey"] },
          log: { title: "竜の巣の調査に成功する", text: "危険な依頼を成し遂げ、名を上げた。" },
        },
        failure: {
          result: "竜の吐息に焼かれ、命からがら逃げ帰った。",
          effects: { health: [-35, -15] },
          log: { title: "竜の吐息に焼かれる", text: "竜の巣の調査に失敗し、深手を負った。" },
        },
      },
      {
        text: "地道な依頼をこなす",
        effects: { money: 30, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_002",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 15, jobs: ["adventurer"] },
    weight: 10,
    repeatable: true,
    cooldown: 3,
    text: "ギルドの掲示板に、スライムの討伐依頼が貼り出されている。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 20 },
        success: {
          result: "スライムを討伐し、無事帰還した。",
          effects: { money: 20, reputation: 1, ability: 1 },
        },
        failure: {
          result: "思いがけず苦戦し、逃げ帰った。",
          effects: { health: -3 },
        },
      },
      {
        text: "もっと簡単な依頼を選ぶ",
        effects: { money: 5, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_003",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 15, jobs: ["adventurer"] },
    weight: 10,
    repeatable: true,
    cooldown: 3,
    text: "ギルドの掲示板に、ホーンラビットの討伐依頼が貼り出されている。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 30 },
        success: {
          result: "ホーンラビットを討伐し、無事帰還した。",
          effects: { money: 30, reputation: 1, ability: 1 },
        },
        failure: {
          result: "思いがけず苦戦し、逃げ帰った。",
          effects: { health: -8 },
        },
      },
      {
        text: "もっと簡単な依頼を選ぶ",
        effects: { money: 5, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_004",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 15, jobs: ["adventurer"], jobYearsMin: 3 },
    weight: 10,
    weightMods: [{ conditions: { flags: ["enemy_goblins"] }, multiply: 3 }],
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    text: "ギルドの掲示板に、ゴブリンの掃討依頼が貼り出されている。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "ゴブリンの巣を攻め滅ぼし、近隣住民の安全を確保した。",
          effects: { money: 50, reputation: 3, ability: 3 },
          log: { title: "ゴブリン討伐に成功", text: "ゴブリンの巣を掃討した。" },
        },
        failure: {
          result: "ゴブリンの数に圧倒され、撤退を余儀なくされた。",
          effects: { health: [-15, -5] },
        },
      },
      {
        text: "もっと簡単な依頼を選ぶ",
        effects: { money: 5, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_005",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 15, jobs: ["adventurer"], jobYearsMin: 5 },
    weight: 10,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    text: "ギルドの掲示板に、ワイバーンの討伐依頼が貼り出されている。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "ワイバーンを倒し、希少な素材を持ち帰った。",
          effects: { money: 100, reputation: 8, ability: 3 },
          log: { title: "ワイバーン討伐に成功", text: "ワイバーンを撃ち落とした。" },
        },
        failure: {
          result: "空を飛ぶワイバーンに苦戦し、討伐はかなわなかった。",
          effects: { health: [-30, -15] },
        },
      },
      {
        text: "もっと簡単な依頼を選ぶ",
        effects: { money: 5, ability: 1 },
      },
    ],
  },
]);
