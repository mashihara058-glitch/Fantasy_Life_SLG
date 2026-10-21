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
  {
  id: "adventurer_006",
  tags: ["young", "work", "adventure"],
  weight: 10,
  repeatable: true,
  logOnce: true,
  conditions: {
    ageMin: 18,
    hasJob: true,
    jobs: ["adventurer"]
  },
  text: "古い遺跡の入口を調べる依頼を受けた。",
  choices: [
    {
      text: "奥まで進む",
      check: { stat: "ability", difficulty: 50 },
      success: {
        result: "財宝を発見した。発見物は提出を求められたが、いくらかの報奨金を受け取った。",
        effects: { money: 10,reputation:2 },
      },
      failure: {
        result: "罠にかかって負傷してしまった。",
        effects: { health:-2 },
      },
    },
    {
      text: "入口付近だけ調べる",
      result: "安全に配慮して必要十分に調査した。",
      effects: { ability:1 },
    },
    {
      text: "仲間を募る",
      result: "報酬を出して仲間を募った。依頼はもちろん、人脈を作ることにも成功した。",
      effects: { ability: 1, reputation: 1, money: -5 },
    }
  ],
},
{
  id: "adventurer_007",
  tags: ["young", "work", "adventure"],
  weight: 10,
  repeatable: true,
  conditions: {
    ageMin: 18,
    hasJob: true,
    jobs: ["adventurer"]
  },
  text: "魔物との戦闘で、愛用の武器や防具が壊れかけている。",
  choices: [
    {
      text: "修理する",
      result: "かなりの出費になったが、安全性は確保された。",
      effects: { ability: 2, money: -15 },
    },
    {
      text: "新調する",
      result: "大変な出費になった。しかし、良品に巡り合えた。",
      effects: { ability:3,money:-30 },
    },
    {
      text: "そのまま使う",
      result: "次の仕事で装備を破損、負傷してしまった。",
      effects: { health: -5, ability: -3, money: -2 },
    }
  ],
},
{
  id: "adventurer_008",
  tags: ["young", "work", "adventure"],
  weight: 10,
  repeatable: true,
  conditions: {
    ageMin: 18,
    hasJob: true,
    jobs: ["adventurer"]
  },
  text: "ダンジョンで宝箱を発見したが、仕掛けがあるようだ。",
  choices: [
    {
      text: "罠を解除する",
      check: { stat: "ability", difficulty: 50 },
      success: {
        result: "財宝を発見した。発見物は提出を求められたが、いくらかの報奨金を受け取った。",
        effects: { money: 10,reputation:2 },
      },
      failure: {
        result: "罠にかかって負傷してしまった。",
        effects: { health:-2 },
      },
    },
    {
      text: "力づくで開ける",
      check: { stat: "ability", difficulty: 50 },
      success: {
        result: "財宝を発見した。発見物は提出を求められたが、いくらかの報奨金を受け取った。",
        effects: { money: 10,reputation:2 },
      },
      failure: {
        result: "罠にかかって負傷してしまった。",
        effects: { health:-5 },
      },
    },
    {
      text: "あきらめる",
    }
  ],
},
{
  id: "adventurer_009",
  tags: ["young", "work", "adventure"],
  weight: 10,
  repeatable: true,
  conditions: {
    ageMin: 18,
    hasJob: true,
    jobs: ["adventurer"]
  },
  text: "洞窟の奥で巨大蜘蛛の巣に行く手を阻まれた。",
  choices: [
    {
      text: "戦う",
      check: { stat: "ability", difficulty: 50 },
      success: {
        result: "魔物を撃破し、素材を持ち帰った。",
        effects: { money: 10,reputation:2 },
      },
      failure: {
        result: "負傷してしまった。",
        effects: { health:-2 },
      },
    },
    {
      text: "巣を焼く",
      check: { stat: "ability", difficulty: 50 },
      success: {
        result: "安全に魔物を撃破した。",
        effects: { ability:2,reputation:2 },
      },
      failure: {
        result: "火災によって負傷してしまった。",
        effects: { health:-5 },
      },
    },
    {
      text: "戦闘を回避する",
    }
  ],
},
{
  id: "adventurer_010",
  tags: ["young", "work", "adventure"],
  weight: 10,
  repeatable: true,
  conditions: {
    ageMin: 18,
    hasJob: true,
    jobs: ["adventurer"]
  },
  text: "古い墓所で、動く骸骨たちに遭遇した。",
  choices: [
    {
      text: "戦う",
      check: { stat: "ability", difficulty: 50 },
      success: {
        result: "魔物を撃破し、素材を持ち帰った。",
        effects: { money: 10,reputation:2 },
      },
      failure: {
        result: "負傷してしまった。",
        effects: { health:-2 },
      },
    },
    {
      text: "聖職者に助力を頼む",
      check: { stat: "reputation", difficulty: 50 },
      success: {
        result: "安全に魔物を撃破した。",
        effects: { ability:2,reputation:2 },
      },
      failure: {
        result: "思ったよりも費用が掛かってしまった。",
        effects: { money:-5 },
      },
    },
    {
      text: "戦闘を回避する",
    }
  ],
},
]);
