// 人物を失う出来事と、その後の復讐・厭世
// effects.loseNpc で失うと、絆の強さに応じて性格「復讐」か「厭世」が付く（js/data/traits.js）
// status: "missing"（行方不明）の人物は、後のイベントで npcState: { role: "active" } により戻せる
GAME.registerEvents([
  // ---------- 盗賊の襲撃 ----------
  {
    id: "common_loss_bandits_mother",
    tags: ["childhood", "loss", "bandits"],
    conditions: { ageMin: 3, ageMax: 11, npcs: ["mother"], notFlags: ["enemy_bandits", "enemy_goblins"] },
    weight: 0.3,
    text: "夜更け、松明を掲げた盗賊団が村を襲った。{母}は{名前}を床下に押し込み、「声を出してはだめ」と囁いて外へ出ていった。",
    choices: [
      {
        text: "床下で息を殺す",
        result: "悲鳴と蹄の音が遠ざかったあと、{母}の姿はどこにもなかった。",
        effects: { loseNpc: { role: "mother", status: "missing" }, addFlags: ["enemy_bandits"] },
        log: { title: "盗賊に母{母}をさらわれる", text: "村を襲った盗賊団に、母を連れ去られた。" },
      },
      {
        text: "{母}を追って飛び出す",
        check: { stat: "health", difficulty: 55 },
        success: {
          result: "盗賊の腕に噛みつき、その隙に{母}と森へ逃げ延びた。",
          effects: { health: -10, npc: { mother: { intimacy: 10 } } },
          log: { title: "盗賊の襲撃から母を守る", text: "幼いながらに盗賊へ立ち向かい、母と逃げ延びた。" },
        },
        failure: {
          result: "突き飛ばされて気を失った。目覚めたとき、{母}はいなかった。",
          effects: { health: -15, loseNpc: { role: "mother", status: "missing" }, addFlags: ["enemy_bandits"] },
          log: { title: "盗賊に母{母}をさらわれる", text: "村を襲った盗賊団に、母を連れ去られた。" },
        },
      },
    ],
  },
  {
    id: "common_loss_bandits_friend",
    tags: ["childhood", "loss", "bandits", "friend"],
    conditions: { ageMin: 5, ageMax: 11, npcs: ["friend"] },
    weight: 2,
    text: "盗賊団が村はずれを荒らし、一緒に遊んでいた{友人}が連れ去られた。",
    choices: [
      {
        text: "大人たちに知らせに走る",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "知らせを受けた自警団が追いつき、{友人}は無事に取り戻された。",
          effects: { reputation: 3, npc: { friend: { trust: 20, intimacy: 10 } } },
          log: { title: "さらわれた{友人}を救う", text: "機転を利かせ、盗賊から友を取り戻した。" },
        },
        failure: {
          result: "自警団が駆けつけたときには、盗賊の姿は消えていた。",
          effects: { loseNpc: { role: "friend", status: "missing" }, addFlags: ["enemy_bandits"] },
          log: { title: "盗賊に{友人}をさらわれる", text: "目の前で友を連れ去られた。" },
        },
      },
      {
        text: "震えて茂みに隠れる",
        effects: { loseNpc: { role: "friend", status: "missing" }, addFlags: ["enemy_bandits"] },
        log: { title: "盗賊に{友人}をさらわれる", text: "目の前で友を連れ去られ、何もできなかった。" },
      },
    ],
  },
  {
    id: "common_loss_bandits_spouse",
    tags: ["young", "prime", "loss", "bandits"],
    conditions: { ageMin: 20, ageMax: 55, npcs: ["spouse"] },
    weight: 1,
    text: "遠出から戻ると、家は荒らされ、{配偶者}の姿がなかった。床には盗賊団の紋章が刻まれた短剣が落ちている。",
    choices: [
      {
        text: "すぐに後を追う",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "夜通し馬を走らせ、盗賊の野営地から{配偶者}を救い出した。",
          effects: { health: -10, npc: { spouse: { intimacy: 15 } } },
          log: { title: "さらわれた{配偶者}を救い出す", text: "盗賊の野営地に乗り込み、伴侶を取り戻した。" },
        },
        failure: {
          result: "痕跡は街道で途切れていた。",
          effects: { loseNpc: { role: "spouse", status: "missing" }, addFlags: ["enemy_bandits"] },
          log: { title: "盗賊に{配偶者}をさらわれる", text: "留守の間に、伴侶を連れ去られた。" },
        },
      },
      {
        text: "衛兵に届け出る",
        result: "衛兵は肩をすくめるばかりだった。",
        effects: { loseNpc: { role: "spouse", status: "missing" }, addFlags: ["enemy_bandits"] },
        log: { title: "盗賊に{配偶者}をさらわれる", text: "留守の間に、伴侶を連れ去られた。" },
      },
    ],
  },

  // ---------- ゴブリンの襲撃 ----------
  {
    id: "common_loss_goblins_father",
    tags: ["childhood", "adolescence", "loss", "goblins"],
    conditions: { ageMin: 4, ageMax: 15, npcs: ["father"], notFlags: ["enemy_goblins", "enemy_bandits"] },
    weight: 0.3,
    text: "角笛が鳴り響いた。ゴブリンの群れが村に押し寄せてくる。{父}は鍬を握りしめ、家族の前に立ちはだかった。「行け！ 振り返るな！」",
    choices: [
      {
        text: "言いつけどおり、振り返らずに逃げる",
        result: "背後で{父}の雄叫びが聞こえ、やがて途絶えた。",
        effects: { loseNpc: { role: "father", status: "dead" }, addFlags: ["enemy_goblins"] },
        log: { title: "父{父}、家族を守って戦死する", text: "ゴブリンの襲撃から家族を逃がし、父は帰らなかった。" },
      },
      {
        conditions: { ageMin: 10 },
        text: "{父}の隣で戦う",
        check: { stat: "health", difficulty: 55 },
        success: {
          result: "背中を合わせて戦い抜き、夜明けとともにゴブリンは退いていった。",
          effects: { health: -15, reputation: 8, addTraits: ["brave"], npc: { father: { trust: 15 } } },
          log: { title: "父と共にゴブリンを退ける", text: "父の隣で武器を取り、村を守り抜いた。" },
        },
        failure: {
          result: "棍棒に打ち倒された。目覚めたのは、{父}の葬儀の朝だった。",
          effects: { health: -20, loseNpc: { role: "father", status: "dead" }, addFlags: ["enemy_goblins"] },
          log: { title: "父{父}、家族を守って戦死する", text: "ゴブリンの襲撃で、共に戦った父は帰らなかった。" },
        },
      },
    ],
  },

  // ---------- 復讐・救出 ----------
  {
    id: "common_loss_revenge_bandits",
    tags: ["loss", "bandits", "revenge"],
    conditions: {
      ageMin: 16,
      ageMax: 50,
      flags: ["enemy_bandits"],
      notFlags: ["slave"],
      custom: (s) => s.traits.includes("vengeful") || s.npcs.some((n) => n.status === "missing"),
    },
    weight: 4,
    weightMods: [{ conditions: { traitsAny: ["vengeful"] }, multiply: 3 }],
    repeatable: true,
    cooldown: 5,
    maxTimes: 3,
    text: "{名前}はついに、かつての盗賊団の根城を突き止めた。山間にある古い砦だ。",
    choices: [
      {
        conditions: { missingNpcs: ["mother"] },
        text: "砦に乗り込み、{母}を救い出す",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "地下牢の奥で、やつれた{母}が顔を上げた。「……{名前}なの？」",
          effects: { npcState: { mother: "active" }, npc: { mother: { intimacy: 20 } }, reputation: 10, removeTraits: ["vengeful"] },
          log: { title: "さらわれた母{母}を救い出す", text: "長い歳月を経て、盗賊団の砦から母を取り戻した。" },
        },
        failure: { result: "見張りに見つかり、命からがら逃げ帰った。", effects: { health: [-35, -15] } },
      },
      {
        conditions: { missingNpcs: ["friend"] },
        text: "砦に乗り込み、{友人}を救い出す",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "鎖につながれた{友人}は、{名前}の顔を見て泣き崩れた。",
          effects: { npcState: { friend: "active" }, npc: { friend: { trust: 20, intimacy: 20 } }, reputation: 10, removeTraits: ["vengeful"] },
          log: { title: "さらわれた{友人}を救い出す", text: "幼き日に奪われた友を、ついに取り戻した。" },
        },
        failure: { result: "見張りに見つかり、命からがら逃げ帰った。", effects: { health: [-35, -15] } },
      },
      {
        conditions: { missingNpcs: ["spouse"] },
        text: "砦に乗り込み、{配偶者}を救い出す",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "{配偶者}は、{名前}の腕の中で声を上げて泣いた。",
          effects: { npcState: { spouse: "active" }, npc: { spouse: { intimacy: 20 } }, reputation: 10, removeTraits: ["vengeful"] },
          log: { title: "さらわれた{配偶者}を救い出す", text: "盗賊団の砦から、伴侶を取り戻した。" },
        },
        failure: { result: "見張りに見つかり、命からがら逃げ帰った。", effects: { health: [-35, -15] } },
      },
      {
        conditions: { traitsAny: ["vengeful"] },
        text: "盗賊団を討ち、恨みを晴らす",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "頭目の剣が地に落ちた。長年胸を焦がしてきた炎が、ふっと消えた気がした。",
          effects: { reputation: 15, removeFlags: ["enemy_bandits"], removeTraits: ["vengeful"] },
          log: { title: "盗賊団に復讐を果たす", text: "長年の恨みを、ついに晴らした。" },
        },
        failure: {
          result: "多勢に無勢だった。",
          effects: { death: "復讐の果てに" },
          log: { title: "復讐の果てに散る", text: "盗賊団の砦に乗り込み、還らなかった。" },
        },
      },
      {
        text: "今は手を出さない",
      },
    ],
  },
  {
    id: "common_loss_revenge_goblins",
    tags: ["loss", "goblins", "revenge"],
    conditions: { ageMin: 16, flags: ["enemy_goblins"], notFlags: ["slave"] },
    weight: 4,
    weightMods: [{ conditions: { traitsAny: ["vengeful"] }, multiply: 3 }],
    repeatable: true,
    cooldown: 6,
    maxTimes: 2,
    text: "近くの洞窟にゴブリンの巣があるという。かつて村を襲い、家族を奪った群れの生き残りかもしれない。",
    choices: [
      {
        conditions: { traitsAny: ["vengeful"] },
        text: "討伐隊の先頭に立つ",
        check: { stat: "health", difficulty: 50 },
        success: {
          result: "巣の奥で、あの夜と同じ角笛を見つけた。{名前}はそれを踏み砕いた。",
          effects: { reputation: 12, removeFlags: ["enemy_goblins"], removeTraits: ["vengeful"] },
          log: { title: "ゴブリンの巣を討ち、仇を取る", text: "家族を奪った群れを討ち果たした。" },
        },
        failure: { result: "深手を負い、仲間に担がれて戻った。", effects: { health: [-35, -15] } },
      },
      {
        text: "討伐隊の一員として加わる",
        check: { stat: "health", difficulty: 40 },
        success: { result: "巣は焼き払われた。", effects: { reputation: 6, removeFlags: ["enemy_goblins"] } },
        failure: { result: "乱戦の中で傷を負った。", effects: { health: -15 } },
      },
      {
        text: "関わらない",
      },
    ],
  },

  // ---------- 厭世 ----------
  {
    id: "common_loss_worldweary",
    tags: ["loss", "personality"],
    conditions: { ageMin: 14, traitsAny: ["worldweary"], notFlags: ["slave"] },
    repeatable: true,
    cooldown: 8,
    maxTimes: 3,
    text: "人は奪い、奪われ、そして忘れていく。この世のすべてが、ひどく虚しく思えた。",
    choices: [
      {
        conditions: { ageMin: 18, notFlags: ["hermit"] },
        text: "人里を離れ、山奥の庵で暮らす",
        effects: { reputation: -5, health: 5, addFlags: ["hermit"] },
        log: { title: "俗世を離れ、隠棲する", text: "人の世に背を向け、山奥でひとり暮らし始めた。" },
      },
      {
        text: "それでも、誰かのために生きてみる",
        check: { stat: "reputation", difficulty: 40 },
        success: {
          result: "小さな親切が返ってきたとき、凍えていた心がわずかに溶けた。",
          effects: { reputation: 5, removeTraits: ["worldweary"] },
          log: { title: "虚無から立ち直る", text: "人との関わりの中で、再び生きる意味を見出した。" },
        },
        failure: { result: "やはり、何も変わらなかった。", effects: { health: -2 } },
      },
      {
        text: "ただ日々をやり過ごす",
        effects: { ability: 1 },
      },
    ],
  },
]);
