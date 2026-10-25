// 幼少期（0〜11歳）
GAME.registerEvents([
  {
    id: "human_childhood_001",
    tags: ["childhood", "family", "education"],
    conditions: { ageMin: 6, ageMax: 11, species: ["human"] ,notFlags: ["slave"] },
    weight: 10,
    repeatable: false,
    text: "家庭教師があなたの才能に気づいた。",
    choices: [
      {
        text: "勉強を続ける",
        effects: { ability: 5, addFlags: ["studious"] },
        log: { title: "学問の才能を認められる", text: "家庭教師のもとで熱心に学んだ。" },
      },
      {
        text: "外で遊ぶ",
        effects: { health: 2 },
      },
    ],
  },
  {
    id: "common_childhood_002",
    tags: ["childhood", "friend"],
    conditions: { ageMin: 4, ageMax: 9, noNpcs: ["friend"],notFlags: ["slave"]  },
    weight: 15,
    weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
    text: "広場の隅で、同じ年頃の子どもがひとりで石を積んで遊んでいた。",
    choices: [
      {
        text: "声をかける",
        result: "{友人}という名前らしい。二人はすぐに仲良くなった。",
        effects: { addNpc: { role: "friend", tags: ["childhood_friend"], intimacy: 50 }, addFlags: ["has_childhood_friend"] },
        log: { title: "幼なじみの{友人}と出会う", text: "広場で出会い、かけがえのない友となった。" },
      },
      {
        text: "遠くから眺めている",
        effects: { ability: 1 },
      },
    ],
  },
  {
    id: "common_childhood_003",
    tags: ["childhood", "family", "health"],
    conditions: { ageMin: 1, ageMax: 6 },
    text: "{名前}はひどい熱を出して寝込んでしまった。",
    choices: [
      {
        conditions: { npcs: ["mother"] },
        text: "{母}が寝ずに看病してくれた",
        check: { stat: "health", difficulty: 30 },
        success: {
          result: "数日で熱は下がった。{母}は目の下に隈を作りながら笑った。",
          effects: { health: -3, npc: { mother: { intimacy: 10 } } },
        },
        failure: {
          result: "熱は長く続き、体が弱くなってしまった。",
          effects: { health: -20, npc: { mother: { intimacy: 10 } } },
          log: { title: "大病を患う", text: "高熱が続き、生死の境をさまよった。" },
        },
      },
      {
        text: "ひとりで熱に耐えた",
        check: { stat: "health", difficulty: 40 },
        success: { result: "なんとか持ち直した。", effects: { health: -5 } },
        failure: {
          result: "熱は長く続き、体が弱くなってしまった。",
          effects: { health: -25 },
          log: { title: "大病を患う", text: "高熱が続き、生死の境をさまよった。" },
        },
      },
    ],
  },
  {
    id: "common_childhood_004",
    tags: ["childhood", "magic"],
    conditions: { ageMin: 7, ageMax: 11 },
    weight: 8,
    text: "夜、ベッドの中で指先を見つめていると、小さな光がぽうっと灯った。",
    choices: [
      {
        text: "誰にも言わずに練習する",
        effects: { ability: 3, addFlags: ["magic_spark"] },
        log: { title: "魔法の素質に目覚める", text: "誰にも知られぬまま、指先に灯る光を育て始めた。" },
      },
      {
        conditions: { npcs: ["mother"] },
        text: "{母}に打ち明ける",
        result: "{母}は驚き、そして誇らしげに{名前}を抱きしめた。",
        effects: { reputation: 3, addFlags: ["magic_spark"], npc: { mother: { trust: 5 } } },
        log: { title: "魔法の素質に目覚める", text: "家族に見守られ、魔法の才を育て始めた。" },
      },
      {
        text: "怖くなって忘れることにした",
      },
    ],
  },
  {
    id: "common_childhood_005",
    tags: ["childhood", "adventure", "fairy"],
    conditions: { ageMin: 5, ageMax: 10,notFlags: ["slave"]  },
    weight: 8,
    text: "森の奥で道に迷ってしまった。木々の間から、日が傾いていくのが見える。",
    choices: [
      {
        text: "来た道を慎重に戻る",
        check: { stat: "ability", difficulty: 35 },
        success: { result: "目印の岩を見つけ、無事に家へ帰り着いた。", effects: { ability: 2 } },
        failure: { result: "暗い森をさまよい、翌朝ようやく見つけ出された。", effects: { health: -10 } },
      },
      {
        text: "青白く光る茸の列を追ってみる",
        result: "妖精たちの輪舞に迷い込み、気づけば家の前に立っていた。手のひらには、小さな花びらが一枚。",
        effects: { health: 5, addFlags: ["fairy_blessing"] },
        log: { title: "妖精の輪に迷い込む", text: "森の奥で妖精たちに出会い、不思議な加護を受けた。" },
      },
    ],
  },
  {
    id: "common_childhood_006",
    tags: ["childhood", "family"],
    conditions: { ageMin: 5, ageMax: 11,notFlags: ["slave"]  },
    repeatable: true,
    cooldown: 3,
    text: "家の手伝いを言いつけられた。",
    choices: [
      { text: "真面目に手伝う", effects: { ability: 2, reputation: 1 } },
      { text: "こっそり抜け出して遊ぶ", effects: { health: 2, reputation: -1 } },
    ],
  },
  {
    id: "common_childhood_007",
    tags: ["childhood", "friend"],
    conditions: { ageMin: 6, ageMax: 11, npcs: ["friend"] },
    text: "つまらないことで、{友人}と大喧嘩をしてしまった。",
    choices: [
      {
        text: "自分から謝りに行く",
        result: "{友人}は照れくさそうに笑い、二人は前よりも仲良くなった。",
        effects: { npc: { friend: { trust: 10, intimacy: 5 } } },
      },
      {
        text: "意地を張って口をきかない",
        result: "しばらくの間、二人の間にはぎこちない空気が流れた。",
        effects: { npc: { friend: { trust: -10, intimacy: -5 } } },
      },
    ],
  },
  {
    id: "common_childhood_008",
    tags: ["childhood","adolescence"],
    weight: 5,
    // エルフは種族。flags ではなく species で倍率をかける
    weightMods: [{ conditions: { species: ["elf"] }, multiply: 1.5 }],
    conditions: { ageMin: 5,ageMax: 16, notFlags: ["slave"] },
    text: "深夜、納屋から火が出た。",
    choices: [
      {
        text: "逃げ出す",
        check: { chance: 50 },
        success: {
          result: "火は村中に延焼したが、どうにか生き延びることができた。",
          effects: { health: -5 },
          log: { title: "深夜の大惨事", text: "村が炎上した。" },
        },
        failure: {
          result: "火事は盗賊の放火のせいだった。焼け出されたところ、捕らえられてしまった。",
          effects: { job: "slave", addFlags: ["slave"] },
          log: { title: "深夜の襲撃者", text: "人さらいにさらわれた。" },
        },
      },
      {
        text: "消火する",
        conditions: { npcs: ["friend"] },
        check: { chance: 50 },
        success: {
          result: "酷いけがを負ったが、火を食い止めることができた。",
          effects: { health: -10 },
          log: { title: "深夜の惨事", text: "納屋で火事が起こった。" },
        },
        failure: {
          result: "住人が火事に気を取られている間、盗賊が何人かをさらっていった。被害者の中には{友人}もいた。",
          effects: {
            health: -15,
            loseNpc: { role: "friend", status: "missing" },
            addFlags: ["enemy_bandits"],
          },
          log: { title: "深夜の襲撃者", text: "{友人}がさらわれた。" },
        },
      },
    ],
  },

  // ---------- 追加（遊び・家族・村）----------
  {
    id: "common_childhood_009",
    tags: ["childhood", "family"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 3, ageMax: 10, npcs: ["father"], notFlags: ["slave"] },
    text: "{父}が仕事から戻ると、膝の上に{名前}を乗せて、遠くの話をしてくれた。",
    choices: [
      {
        text: "目を輝かせて聞く",
        result: "{父}の声は低かったが、話の途中で何度も笑った。",
        effects: { ability: 1, npc: { father: { trust: 5, intimacy: 8 } } },
      },
      {
        text: "いつの間にか眠ってしまう",
        result: "気づくと布団の中だった。枕元に、{父}の上着がかけてあった。",
        effects: { health: 2, npc: { father: { intimacy: 5 } } },
      },
    ],
  },
  {
    id: "common_childhood_010",
    tags: ["childhood", "festival"],
    weight: 9,
    conditions: { ageMin: 5, ageMax: 12, notFlags: ["slave"] },
    text: "村の祭りだ。太鼓が鳴り、屋台の匂いが風に乗る。",
    choices: [
      {
        text: "踊りに交ざる",
        check: { chance: 55 },
        success: {
          result: "足取りが合って、周りから拍手が飛んだ。",
          effects: { reputation: 3, health: 2 },
        },
        failure: {
          result: "つまずいて転び、泥だらけになった。笑われたが、祭りの熱は冷めない。",
          effects: { health: -2, reputation: 1 },
        },
      },
      {
        text: "屋台を見て回る",
        result: "甘い匂いと煙にまみれて、一日が短く感じた。",
        effects: { health: 3 },
      },
      {
        conditions: { npcs: ["friend"] },
        text: "{友人}と手を繋いで練り歩く",
        result: "人混みで何度もはぐれそうになり、そのたびに笑い合った。",
        effects: { health: 2, npc: { friend: { intimacy: 8 } } },
      },
    ],
  },
  {
    id: "common_childhood_011",
    tags: ["childhood", "mischief"],
    weight: 8,
    conditions: { ageMin: 6, ageMax: 12, notFlags: ["slave"] },
    text: "隣家の果樹から、熟した実が手が届きそうなところに下がっている。",
    choices: [
      {
        text: "こっそりもぎ取る",
        check: { chance: 50 },
        success: {
          result: "果汁が袖まで伝わった。ばれずに済んだが、胸の奥がむずむずする。",
          effects: { health: 2, reputation: -1, addFlags: ["petty_theft"] },
        },
        failure: {
          result: "枝がしなって音がした。怒鳴り声が飛んできて、家まで追いかけてこられた。",
          effects: { reputation: -5, health: -2 },
          log: { title: "果樹泥棒を叱られる", text: "欲に負けて、隣家の実をもいだ。" },
        },
      },
      {
        text: "我慢して通りすぎる",
        effects: { reputation: 1 },
      },
      {
        conditions: { npcs: ["sibling"] },
        text: "{兄弟}と示し合わせて取る",
        check: { chance: 60 },
        success: {
          result: "二人分の実を分け合った。共犯の味は、普通より甘かった。",
          effects: { health: 2, npc: { sibling: { intimacy: 5, trust: -2 } }, addFlags: ["petty_theft"] },
        },
        failure: {
          result: "二人とも捕まって、並んで叱られた。{兄弟}が先に泣き出した。",
          effects: { reputation: -4, npc: { sibling: { intimacy: 3 } } },
        },
      },
    ],
  },
  {
    id: "common_childhood_012",
    tags: ["childhood", "health", "weather"],
    weight: 7,
    conditions: { ageMin: 4, ageMax: 11, notFlags: ["slave"] },
    text: "突然の嵐で、屋根が鳴る。雨漏りの音が、部屋の隅で止まない。",
    choices: [
      {
        conditions: { npcs: ["mother"] },
        text: "{母}のそばに寄る",
        result: "{母}は濡れた布を取り替えながら、「大丈夫」と何度も言った。",
        effects: { health: 1, npc: { mother: { intimacy: 6 } } },
      },
      {
        text: "自分で受け皿を並べる",
        check: { stat: "ability", difficulty: 30 },
        success: {
          result: "滴る場所を見当つけて、床はほとんど濡れずに済んだ。",
          effects: { ability: 2, reputation: 1 },
        },
        failure: {
          result: "足音で受け皿を蹴ってしまい、かえってびしょびしょになった。",
          effects: { health: -2 },
        },
      },
      {
        text: "布団に潜って耐える",
        effects: { health: -1 },
      },
    ],
  },
  {
    id: "common_childhood_013",
    tags: ["childhood", "animal"],
    weight: 8,
    conditions: { ageMin: 5, ageMax: 12, notFlags: ["slave", "has_pet_memory"] },
    text: "道端で、痩せた仔犬（あるいは似た小動物）が、足元にすり寄ってきた。",
    choices: [
      {
        text: "家に連れて帰る",
        check: { chance: 55 },
        success: {
          result: "最初は叱られたが、やがて家族の足元で眠るようになった。名前をつけて、世話をした。",
          effects: { health: 3, reputation: 1, addFlags: ["has_pet_memory"] },
          log: { title: "小さな命を拾う", text: "道端の動物を家に迎え、世話をした。" },
        },
        failure: {
          result: "家では飼えないと言われた。別れ際、振り返る背中が小さかった。",
          effects: { health: -2, addFlags: ["has_pet_memory"] },
        },
      },
      {
        text: "残したパンを分けて去る",
        result: "食べ終わるまで見守ってから、足を向けた。",
        effects: { reputation: 2, addFlags: ["has_pet_memory"] },
      },
      {
        text: "触れずに通り過ぎる",
        effects: { addFlags: ["has_pet_memory"] },
      },
    ],
  },
  {
    id: "common_childhood_014",
    tags: ["childhood", "adolescence", "contest"],
    weight: 7,
    conditions: { ageMin: 8, ageMax: 14, notFlags: ["slave"] },
    text: "村の子どもたちの間で、木登り勝負が始まった。一番上の枝に触れれば勝ちだ。",
    choices: [
      {
        text: "一番に登る",
        check: { stat: "health", difficulty: 40 },
        success: {
          result: "風の中で手を挙げた。下から小さな歓声が上がる。",
          effects: { health: 2, reputation: 3, addFlags: ["climber"] },
        },
        failure: {
          result: "途中で足を滑らせ、腕を擦りむいた。勝負はそこで終わりだった。",
          effects: { health: -6 },
        },
      },
      {
        text: "下で応援する",
        effects: { reputation: 1 },
      },
      {
        conditions: { npcs: ["rival"] },
        text: "{ライバル}より先に触る",
        check: { stat: "health", difficulty: 45 },
        success: {
          result: "{ライバル}の手前で枝に触れた。悔しそうな顔が、妙に嬉しかった。",
          effects: { health: 2, reputation: 2, npc: { rival: { trust: -5, intimacy: 5 } } },
        },
        failure: {
          result: "{ライバル}に先を越された。笑われた夜は、なかなか眠れなかった。",
          effects: { health: -3, npc: { rival: { intimacy: 3 } } },
        },
      },
    ],
  },
{
  id: "common_childhood_015",
  tags: ["childhood", "work"],
  weight: 10,
  conditions: {
    ageMin: 6,
    ageMax: 12
  },
  text: "{名前}の住んでいるところに旅の薬師が訪れた。",
  choices: [
    {
      text: "話しかける",
      result: "薬師は薬草や調合について教えてくれた。それからは、道端の雑草ひとつひとつが貴重なものに思えるようになった。",
      effects: { addFlags: ["dream_medic"] },
    },
    {
      text: "遠くから見ている",
      result: "薬師は何件かの家を回り、去っていった。",
    }
  ],
},
{
  id: "common_childhood_016",
  tags: ["childhood", "work"],
  weight: 10,
  conditions: {
    ageMin: 13,
    ageMax: 18,
    hasJob: false,
    flags: ["dream_medic"],
    notFlags: ["slave"]
  },
  text: "将来の夢について考えていると、あの旅の薬師のことが思い出された。",
  choices: [
    {
      text: "製薬ギルドの門をたたく",
      result: "{名前}は薬師になった。",
      effects: { removeFlags: ["dream_medic"],job:"medic" },
    },
    {
      text: "もう少し考える",
    }
  ],
},
]);

