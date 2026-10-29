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
  // ---------- きな臭い兆し：異国商人・畑拡大・不作 ----------
  {
    id: "farmer_05",
    tags: ["young", "prime", "work", "farmer"],
    weight: 10,
    weightMods: [{ conditions: { flags: ["farmer_foreign_grain"] }, multiply: 0.4 }],
    repeatable: true,
    cooldown: 6,
    maxTimes: 3,
    logOnce: true,
    conditions: {
      ageMin: 16,
      jobs: ["farmer"],
      moneyUnlocked: true,
      notFlags: ["slave", "farmer_revolt_done"],
    },
    text: "見慣れない商人が畦に立ち、余剰の小麦があれば買い取りたいと言う。相場より明らかに高い。",
    choices: [
      {
        text: "余剰分だけ売る",
        result: "なじみの商人より高く買い取ってくれた。懐は温かい。だが帰途、荷車の覆いの下に、見慣れない紋章がちらついた気がした。",
        effects: { money: 20, addFlags: ["farmer_foreign_grain"] },
        log: { title: "見知らぬ商人に小麦を売る", text: "高値に釣られ、余剰の小麦を渡した。" },
      },
      {
        text: "吹っ掛けて売る",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "粘った甲斐があり、提示額を大きく上回った。商人は苦笑して銀を積んだが、支払いのとき財布の異国模様が一瞬、目に入った。",
          effects: { money: 35, ability: 2, addFlags: ["farmer_foreign_grain"] },
          log: { title: "見知らぬ商人に高値で売る", text: "値を吊り上げて小麦を渡し、異国の意匠を見た。" },
        },
        failure: {
          result: "少しだけ吊り上げて渡した。銀貨を数える商人の財布に、明らかに異国の意匠がある。",
          effects: { money: 12, addFlags: ["farmer_foreign_grain"] },
        },
      },
      {
        text: "村の食を守ると断る",
        result: "商人は肩をすくめ、隣の村へ歩いていった。あとから聞くと、あちらでは売り手がいたらしい。",
        effects: { reputation: 2, ability: 1 },
      },
    ],
  },
  {
    id: "farmer_06",
    tags: ["young", "prime", "work", "farmer"],
    weight: 9,
    repeatable: true,
    cooldown: 7,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobs: ["farmer"],
      moneyUnlocked: true,
      notFlags: ["slave", "farmer_revolt_done"],
    },
    text: "このところ小麦の値が上がっている。好機とみて、畑を広げるべきだろうか。",
    choices: [
      {
        text: "未開の林を切り拓く",
        check: { stat: "health", difficulty: 50 },
        success: {
          result: "木を倒し、土を起こすのは骨が折れた。だが畝が増え、その年の収穫も増えた。隣家の目が、少し鋭い。",
          effects: { money: 12, health: -2, ability: 1, addFlags: ["farmer_expanded"] },
          log: { title: "値上がりを見て畑を広げる", text: "林を切り拓き、収穫を増やした。" },
        },
        failure: {
          result: "本業に開拓を足すのは無理があった。荷物置き場ほどの空き地ができただけだ。",
          effects: { health: -3 },
        },
      },
      {
        text: "休耕地を借り受ける",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "通いやすい休耕地の主と話がついた。世話は増えたが、収入も増えた。",
          effects: { money: 10, ability: 2, addFlags: ["farmer_expanded"] },
          log: { title: "休耕地を借りて作付けを増やす", text: "好機を逃さず、畑を広げた。" },
        },
        failure: {
          result: "引き受けた土地は広すぎた。手が回らず枯らし、借り賃だけが残った。",
          effects: { money: -12 },
        },
      },
      {
        text: "今の畝だけで十分だと我慢する",
        result: "目の前の仕事に集中した。値上がりの噂は、風のように通り過ぎていく。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "farmer_07",
    tags: ["young", "prime", "work", "farmer"],
    weight: 9,
    repeatable: true,
    cooldown: 5,
    conditions: {
      ageMin: 16,
      jobs: ["farmer"],
      notFlags: ["slave", "farmer_revolt_done"],
    },
    text: "近頃、畑の作物の元気がない。葉の色が薄く、土もどこか乾いている。",
    choices: [
      {
        text: "肥料を足す",
        check: { chance: 45 },
        success: {
          result: "しばらくすると葉が青みを取り戻した。手間は報われた。",
          effects: { money: 8, ability: 2, reputation: 2 },
        },
        failure: {
          result: "効き目は薄く、その年の収穫は少なかった。だが土の癖は、少し分かった気がする。",
          effects: { money: -6, ability: 1 },
        },
      },
      {
        text: "水のやり方を見直す",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "朝晩の量を変え、日陰の畝から直した。作物は持ち直した。",
          effects: { money: 6, ability: 2 },
        },
        failure: {
          result: "水を増やしすぎて根が傷んだ。不作の年になった。",
          effects: { money: -8, ability: 1 },
        },
      },
      {
        text: "様子を見る",
        check: { chance: 40 },
        success: {
          result: "数日で持ち直した。気のせいだったのかもしれない。",
          effects: { money: 3 },
        },
        failure: {
          result: "結局その年は不作だった。納屋の袋が、例年より軽い。",
          effects: { money: -8, addFlags: ["farmer_poor_harvest"] },
        },
      },
    ],
  },

  // ---------- 一揆ルート：増税 → 扇動 → 決起 ----------
  {
    id: "farmer_levy",
    tags: ["young", "prime", "work", "farmer"],
    weight: 14,
    maxTimes: 1,
    conditions: {
      ageMin: 18,
      jobs: ["farmer"],
      moneyUnlocked: true,
      notFlags: ["slave", "farmer_resentment", "farmer_revolt_done"],
      custom: (s) =>
        s.flags.includes("farmer_foreign_grain") ||
        s.flags.includes("farmer_expanded") ||
        s.flags.includes("farmer_poor_harvest"),
    },
    text: "領主の役人が村へ来た。今年の貢納は、例年の倍だという。納屋を覗かれ、余剰など残っていないのに「隠しがある」と言い張られる。",
    choices: [
      {
        text: "言われた通り差し出す",
        result: "袋を空けた。冬の備えまで持っていかれた。腹の底に、鉛のようなものが残る。",
        effects: { money: -25, health: -2, addFlags: ["farmer_resentment"] },
        log: { title: "倍額の貢納を強いられる", text: "余剰も冬糧も、役所に持っていかれた。" },
      },
      {
        text: "分け前だけ隠し、残りを納める",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "床下の分は守れた。役人は舌打ちして去った。生き延びたが、胸のつかえは消えない。",
          effects: { money: -10, addFlags: ["farmer_resentment"] },
        },
        failure: {
          result: "隠しがばれ、罰金まで上乗せされた。村中の前で辱めを受ける。",
          effects: { money: -35, reputation: -5, health: -3, addFlags: ["farmer_resentment"] },
          log: { title: "貢納の隠しがばれる", text: "役人に見つかり、罰と辱めを受けた。" },
        },
      },
      {
        text: "村の者と一緒に減免を願う",
        check: { stat: "reputation", difficulty: 55 },
        success: {
          result: "長老が口を添え、いくらか減額された。それでも重い。帰り道、誰かが小さく呟いた。「こんなの、いつまで続く」",
          effects: { money: -12, reputation: 2, addFlags: ["farmer_resentment"] },
        },
        failure: {
          result: "願いは一蹴され、「音頭取り」だと名を控えられた。翌週、見張りが増えた。",
          effects: { money: -28, reputation: -4, addFlags: ["farmer_resentment"] },
          log: { title: "貢納の減免願いが退けられる", text: "願い出は徒労に終わり、監視だけが残った。" },
        },
      },
    ],
  },
  {
    id: "farmer_agitator",
    tags: ["young", "prime", "work", "farmer"],
    weight: 13,
    maxTimes: 1,
    conditions: {
      ageMin: 18,
      jobs: ["farmer"],
      flags: ["farmer_resentment"],
      notFlags: ["slave", "farmer_agitated", "farmer_revolt_refused", "farmer_revolt_done"],
    },
    text: "夜、納屋の影に見知らぬ男がいた。声は低く、言葉はうまく通る。「領主は国境の戦に金を食い、お前たちの穀を異国へ流している。立ち上がれ」",
    choices: [
      {
        text: "酒を出し、話に耳を傾ける",
        result: "男の話は筋が通っていた——少なくとも、腹の虫には。別れ際、「合図は三日後の夜だ」とだけ言った。",
        effects: { ability: 1, addFlags: ["farmer_agitated"] },
        log: { title: "扇動する男の話を聞く", text: "貢納への怒りを、見知らぬ男に焚きつけられた。" },
      },
      {
        text: "酒は出すが、起義の話は受け流す",
        result: "男は笑って引き下がった。胸の怒りは残るが、鎌を武器にする覚悟までは、まだない。",
        effects: { reputation: 1, addFlags: ["farmer_revolt_refused"] },
      },
      {
        text: "役人に知らせる",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "男は捕まった。賞金の銀が掌に残る。村では「裏切者」の囁きが、しばらく消えない。",
          effects: {
            money: 20,
            reputation: -8,
            removeFlags: ["farmer_resentment"],
            addFlags: ["farmer_revolt_refused", "farmer_informed"],
          },
          log: { title: "扇動者を役人に売り渡す", text: "一揆の囁きを封じ、代わりに村の信頼を失った。" },
        },
        failure: {
          result: "役人が来る前に男は消えた。自分の名だけが「口の軽い百姓」として残った。",
          effects: { reputation: -4, addFlags: ["farmer_revolt_refused"] },
        },
      },
    ],
  },
  {
    id: "farmer_uprising",
    tags: ["young", "prime", "work", "farmer", "death"],
    weight: 16,
    maxTimes: 1,
    conditions: {
      ageMin: 18,
      jobs: ["farmer"],
      flags: ["farmer_agitated"],
      notFlags: ["slave", "farmer_revolt_done"],
    },
    text: "三日後の夜。松明が畦を走り、鐘が鳴る。男の合図どおり、村が動いた。鎌と棍棒が、いまや武器だ。",
    choices: [
      {
        text: "先頭に立って屋敷へ向かう",
        check: { stat: "health", difficulty: 58 },
        success: {
          result: "門は一度、開いた。歓声が上がる——直後、正規の騎兵が丘を越えてきた。逃げ場はない。縄を打たれ、広場へ引きずり出される。",
          effects: {
            death: "処刑",
            addFlags: ["farmer_revolt_done", "farmer_revolt_leader"],
          },
          log: {
            title: "一揆の先頭に立ち、処刑される",
            text: "一时は門を破ったが、鎮圧のあと絞首台へ送られた。",
          },
        },
        failure: {
          result: "門前で斬り伏せられ、意識が遠のく。目が覚めたのは檻の中だった。叛乱の首魁としてではなく、労働力として値がついた。",
          effects: {
            job: "slave",
            addFlags: ["slave", "farmer_revolt_done", "farmer_revolt_enslaved"],
            housing: "none",
            setStats: { money: 0 },
            reputation: -25,
            health: -15,
          },
          log: {
            title: "一揆に加わり、奴隷として売られる",
            text: "鎮圧のあと、鉄輪をはめられた。",
          },
        },
      },
      {
        text: "群衆の後ろから加勢する",
        check: { chance: 40 },
        success: {
          result: "煙と怒号のなか、運よく森へ紛れ込んだ。だが顔は覚えられている。百姓の仕事には、もう戻れない。",
          effects: {
            job: null,
            reputation: -12,
            health: -5,
            addFlags: ["fugitive", "farmer_revolt_done", "farmer_revolt_fled"],
            removeFlags: ["farmer_agitated"],
          },
          log: {
            title: "一揆から逃げ延び、追われる身となる",
            text: "鎮圧の夜、森へ紛れ、手配の身となった。",
          },
        },
        failure: {
          result: "包囲網にかかり、仲間と一緒に縛られた。生き残った者から順に、奴隷商人の前へ立たされる。",
          effects: {
            job: "slave",
            addFlags: ["slave", "farmer_revolt_done", "farmer_revolt_enslaved"],
            housing: "none",
            setStats: { money: 0 },
            reputation: -20,
            health: -10,
          },
          log: {
            title: "一揆に加わり、奴隷として売られる",
            text: "群衆に紛れた末、捕まり鉄輪をはめられた。",
          },
        },
      },
      {
        text: "直前で足を止め、家に閉じこもる",
        result: "松明の列が遠ざかる。翌朝、村は灰と縄の匂いだった。自分は捕縛を免れたが、「動かなかった」ことの重みは、長く残る。",
        effects: {
          reputation: -3,
          health: -2,
          addFlags: ["farmer_revolt_done", "farmer_revolt_refused"],
          removeFlags: ["farmer_agitated"],
        },
        log: {
          title: "一揆の夜、家に閉じこもる",
          text: "決起には加わらず、鎮圧の朝を迎えた。",
        },
      },
      {
        text: "長老を起こし、鎮めるよう頼む",
        check: { stat: "reputation", difficulty: 60 },
        success: {
          result: "長老の声が松明を止めた——すべてではないが、半数は鎌を下ろした。騎兵が来たとき、血は最小で済んだ。男の行方は、誰も知らない。",
          effects: {
            reputation: 8,
            ability: 2,
            addFlags: ["farmer_revolt_done", "farmer_revolt_averted"],
            removeFlags: ["farmer_agitated", "farmer_resentment"],
          },
          log: {
            title: "一揆の手前で村を抑える",
            text: "長老と協力し、決起を食い止めた。",
          },
        },
        failure: {
          result: "声は届かなかった。自分も「内通者」の嫌疑をかけられ、翌朝には縄を打たれていた。叛乱の片割れとして、値がつく。",
          effects: {
            job: "slave",
            addFlags: ["slave", "farmer_revolt_done", "farmer_revolt_enslaved"],
            housing: "none",
            setStats: { money: 0 },
            reputation: -18,
            health: -8,
          },
          log: {
            title: "一揆を止められず、奴隷として売られる",
            text: "説得は失敗し、嫌疑ごと売り飛ばされた。",
          },
        },
      },
    ],
  },
]);
