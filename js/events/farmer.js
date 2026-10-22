// 農夫の仕事イベント
GAME.registerEvents([
  {
    id: "farmer_01",
    tags: ["young", "prime", "work", "farmer"],
    weight: 10,
    repeatable: true,
    cooldown: 5,
    conditions: { ageMin: 16, jobs: ["farmer"] },
    text: "畑に毎日水を運ぶのは、骨が折れる。なにか、楽になる方法はないものか。",
    choices: [
      {
        text: "体を鍛えて乗り切る",
        check: { stat: "health", difficulty: 50 },
        success: {
          result: "元兵士の老人に鍛えてもらった。以前より、桶が軽く感じる。",
          effects: { health: 5, ability: 2 },
        },
        failure: {
          result: "本業に鍛錬を足すのは無理があった。腰が先に悲鳴を上げた。",
          effects: { health: -5 },
        },
      },
      {
        text: "村の設備を見直す",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "他の農家と協力し、貯水池を掘った。遠い畑にも、水が届きやすくなった。",
          effects: { reputation: 3, addFlags: ["farmer_irrigation"] },
          log: { title: "村に貯水池を作る", text: "共同で水の手当てをし、農の手間を減らした。" },
        },
        failure: {
          result: "長老に「偉そうなことを言うな」と一喝された。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "乾燥に強い作物へ切り替える",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "ひよこ豆の畝が並ぶ。珍しがった商人が、買い付けに現れた。",
          effects: { money: 20, ability: 2, addFlags: ["farmer_chickpea"] },
        },
        failure: {
          result: "この畑の作物は領主が決めている、と止められた。勝手はできない。",
          effects: { reputation: -2 },
        },
      },
    ],
  },
  {
    id: "farmer_02",
    tags: ["young", "prime", "work", "farmer"],
    weight: 8,
    repeatable: true,
    cooldown: 8,
    conditions: { ageMin: 16, jobs: ["farmer"] },
    text: "身なりのいい軍人が畑の畦に立った。作物を兵糧として差し出せ、という。",
    choices: [
      {
        text: "言われた通り差し出す",
        check: { chance: 70 },
        success: {
          result: "凱旋した軍人が、戦勝の知らせとともに謝礼を置いていった。",
          effects: { money: 15, reputation: 2 },
        },
        failure: {
          result: "「代金は後で」と言ったきり、戻ってこなかった。その年の税がきつい。",
          effects: { money: -15 },
        },
      },
      {
        text: "家族分だけ残して少なめに出す",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "生活に困らない分は確保できた。罪の意識は残るが、鍋は空にならなかった。",
          effects: { health: 2, money: 5 },
        },
        failure: {
          result: "戦況が悪化し、敗残の敵兵が村まで来た。隠し場所ごと荒らされる。",
          effects: { money: -30, health: -3 },
        },
      },
      {
        text: "多めに渡して恩を売る",
        check: { chance: 40 },
        success: {
          result: "兵士たちが「あの村の芋はうまかった」と広めてくれた。翌年、買い付けが増えた。",
          effects: { reputation: 5, money: 20 },
          log: { title: "兵糧を厚く出し名を上げる", text: "軍への差し出しが、村の評判につながった。" },
        },
        failure: {
          result: "見栄を張ったあと、自分たちの食卓が先に空になった。",
          effects: { health: -5, money: -10 },
        },
      },
    ],
  },
  {
    id: "farmer_03",
    tags: ["young", "prime", "work", "farmer", "adventure"],
    weight: 9,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    conditions: { ageMin: 16, jobs: ["farmer"] },
    text: "毎夜、鹿が里へ下りて畑を荒らす。足跡は普通の鹿より二回り大きい。魔物かもしれない。",
    choices: [
      {
        text: "自分で駆除を試みる",
        check: { stat: "health", difficulty: 60 },
        success: {
          result: "夜の見張りで巨鹿と切り結んだ。傷は残ったが、角は高く売れた。",
          effects: { money: 35, reputation: 3, health: -8, addFlags: ["farmer_deer"] },
          log: { title: "畑を荒らす巨鹿を仕留める", text: "魔物じみた鹿を退け、角を得た。" },
        },
        failure: {
          result: "角に薙がれ、追い返すのが精一杯だった。命だけは拾った。",
          effects: { health: -12 },
        },
      },
      {
        text: "罠を仕掛ける",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "材料費はかかったが、朝には大きな獲物がかかっていた。肉は冬の備えになる。",
          effects: { money: 10, health: 3, addFlags: ["farmer_deer"] },
        },
        failure: {
          result: "罠は壊され、畝はいっそうひどく踏み荒らされていた。",
          effects: { money: -15 },
        },
      },
      {
        text: "冒険者に依頼する",
        check: { chance: 55 },
        success: {
          result: "出費は痛かったが、仕事は無事に終わった。しばらく、夜の畑は静かだ。",
          effects: { money: -25, addFlags: ["farmer_deer"] },
        },
        failure: {
          result: "冒険者は失敗し、前金も戻らない。畑はなお荒らされ続ける。",
          effects: { money: -40 },
        },
      },
    ],
  },
  {
    id: "farmer_herb_elf",
    tags: ["young", "prime", "work", "farmer"],
    weight: 10,
    weightMods: [{ conditions: { flags: ["fairy_blessing"] }, multiply: 2 }],
    maxTimes: 1,
    conditions: { ageMin: 16, jobs: ["farmer"], notFlags: ["farmer_herbs", "farmer_herb_done"] },
    text: "耳の長い薬師が畑の畦に立っていた。「薬草を、この土地で育ててはくれまいか」",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "丁寧に畝を整え、薬草が根付いた。薬師は静かに礼を言った。",
          effects: { money: 20, reputation: 2, addFlags: ["farmer_herbs"] },
          log: { title: "エルフの薬師から薬草栽培を請け負う", text: "畝の一角が、薬草畑になった。" },
        },
        failure: {
          result: "日当たりを誤り、苗が枯れた。薬師は深くは責めなかったが、再依頼はなかった。",
          effects: { money: -5, addFlags: ["farmer_herb_done"] },
        },
      },
      {
        conditions: { flags: ["fairy_blessing"] },
        text: "妖精の加護を思い出し、種にそっと触れる",
        check: { stat: "ability", difficulty: 35 },
        success: {
          result: "指先が温かく、苗が一夜で葉を開いた。薬師が目を見開く。「……あなたは、森に愛されている」",
          effects: {
            money: 35,
            reputation: 5,
            ability: 2,
            addFlags: ["farmer_herbs", "farmer_fairy_herbs"],
          },
          log: { title: "妖精の加護で薬草を育てる", text: "幼い日の加護が、薬草の畝で花開いた。" },
        },
        failure: {
          result: "加護は感じたが、育て方までは教えてくれなかった。それでも薬師は、種を置いていった。",
          effects: { ability: 1, addFlags: ["farmer_herbs"] },
        },
      },
      {
        text: "畑は穀物だけで十分だと断る",
        effects: { addFlags: ["farmer_herb_done"] },
      },
    ],
  },
  {
    id: "farmer_herb_harvest",
    tags: ["young", "prime", "work", "farmer"],
    weight: 12,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: { jobs: ["farmer"], flags: ["farmer_herbs"], notFlags: ["farmer_herbs_failed"] },
    text: "薬草の収穫期が来た。畦に、エルフの薬師が再び姿を見せる。",
    choices: [
      {
        conditions: { flags: ["farmer_fairy_herbs"] },
        text: "特に出来のよい束を、丁寧に渡す",
        result: "薬師は葉を鼻先に近づけ、長く息を吸った。「加護の匂いがする。礼を言う」。袋がいつもより重い。",
        effects: { money: 40, reputation: 3 },
        log: { title: "加護の薬草を薬師へ納める", text: "妖精の気配が残る薬草が、高く買い取られた。" },
      },
      {
        text: "約束どおり収穫を渡す",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "束ねた薬草と、銀貨が交換される。毎年の、静かな取引だ。",
          effects: { money: 25, reputation: 1 },
        },
        failure: {
          result: "虫に食われた葉が多く、値を叩かれた。",
          effects: { money: 8 },
        },
      },
      {
        text: "一部を抜き取り、市場で高く売る",
        check: { chance: 50 },
        success: {
          result: "薬師の目を盗んで売った分が、懐を潤す。後ろめたさは、銀貨の重さで上書きされる。",
          effects: { money: 45, reputation: -3 },
        },
        failure: {
          result: "抜き取りがばれ、取引は打ち切られた。「二度と、頼まぬ」",
          effects: { money: -10, reputation: -5, addFlags: ["farmer_herbs_failed"], removeFlags: ["farmer_herbs"] },
          log: { title: "薬草の横流しがばれる", text: "エルフの薬師との信頼を失った。" },
        },
      },
    ],
  },
  {
    id: "farmer_04",
    tags: ["young", "prime", "work", "farmer"],
    weight: 10,
    repeatable: true,
    cooldown: 8,
    conditions: { ageMin: 18, jobs: ["farmer"], npcs: ["mentor"] },
    text: "作物が思うように育たず困っていたら、かつての師匠{師匠}が訪ねてきた。新しく作った農具を試してみないか、と言う。",
    choices: [
      {
        text: "試してみる",
        check: { chance: 70 },
        success: {
          result: "道具は手の延長のように馴染んだ。土がふかふかになり、その年の仕事が格段に楽になる。",
          effects: { health: 3, ability: 2, npc: { mentor: { trust: 5, intimacy: 5 } } },
        },
        failure: {
          result: "農具は良いものだった。だが不作の原因は別にあり、期待したほどの効果は出なかった。",
          effects: { npc: { mentor: { intimacy: 2 } } },
        },
      },
      {
        text: "工房の話まで踏み込んで尋ねる",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "使い方を教わりながら、昔の工房の話で夜が更けた。帰り際、{師匠}が言った。「今からでも、戻ってこい」",
          effects: {
            ability: 2,
            addFlags: ["farmer_craftsman"],
            npc: { mentor: { trust: 8, intimacy: 5 } },
          },
          log: { title: "{師匠}から再び工房へ誘われる", text: "農具の話の延長で、職人への道を示された。" },
        },
        failure: {
          result: "道具の話で盛り上がったが、勧誘までは出なかった。それでも、胸のつかえは軽くなった。",
          effects: { ability: 1, npc: { mentor: { trust: 3, intimacy: 3 } } },
        },
      },
      {
        text: "今は畑が手一杯だと断る",
        effects: { npc: { mentor: { intimacy: -2 } } },
      },
    ],
  },
  {
    id: "farmer_craftsman",
    tags: ["young", "prime", "work", "farmer", "career"],
    weight: 14,
    conditions: {
      ageMax: 45,
      jobs: ["farmer"],
      npcs: ["mentor"],
      flags: ["farmer_craftsman"],
    },
    text: "ある日、かつての師匠{師匠}が再び門を叩いた。今度こそ、工房へ戻ってこいという勧誘だ。",
    choices: [
      {
        text: "承諾し、職人の道に戻る",
        result: "再びものづくりがしたい、と告げると、{師匠}は大きく頷いて手を握った。",
        effects: {
          job: "craftsman",
          removeFlags: ["farmer_craftsman"],
          npc: { mentor: { trust: 10, intimacy: 8 } },
        },
        log: { title: "農夫から職人へ戻る", text: "{師匠}の誘いに応じ、工房の仕事に戻った。" },
      },
      {
        text: "畑への誇りを語って断る",
        result: "自慢の作物で作った料理を出し、今の仕事への思いを話した。{師匠}は「こんなにうまいものを作っているなら仕方ない」と笑った。",
        effects: {
          health: 3,
          removeFlags: ["farmer_craftsman"],
          npc: { mentor: { trust: 5, intimacy: 5 } },
        },
        log: { title: "職人への再勧誘を断る", text: "師匠の誘いを断り、百姓の道を選んだ。" },
      },
    ],
  },
]);
