     GAME.registerEvents([
     
     {
    id: "gambler_001",
    tags: ["gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"] },
    weight: 10,
    repeatable: true,
    text: "ポーカーの勝負に挑んだ。",
    choices: [
      {
        text: "コール",
        check: { chance: 50 },
        success: {
          result: "ツーペア。わずかな差で、場のチップをかき集めた。",
          effects: { money: 50 },
        },
        failure: {
          result: "ワンペア。悪くない手だったが、相手はそれを上回っていた。",
          effects: { money: -50 } },
      },
      {
        text: "レイズ",
        check: { chance: 30 },
        success: {
          result: "フォーカード。卓を囲む全員が、息を呑んだ。",
          effects: { money: 100 },
           log: { title: "ポーカーで大勝ちする", text: "四枚の札が、一夜にして財布を膨らませた。" },
        },
        failure: {
          result: "フルハウス……しかし相手の役はストレートフラッシュだった。",
          effects: { money: -150},
          log: { title: "ポーカーで大負けする", text: "フルハウスを握りしめたまま、有り金を失った。" },
        },
      },
      {
         text: "フォールド",
         result: "勝負を降りた。賭けたチップは戻らないが、傷は浅い。",
         effects: { money: -10},
 },
    ],
  },
        {
    id: "gambler_002",
    tags: ["gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"] },
    weight: 10,
    repeatable: true,
    text: "賭場で腕利きの博打師に勝負を持ちかけられた。",
    choices: [
      {
        text: "小さく賭ける",
        check: { chance: 60 },
        success: {
          result: "手堅く張った賭けが、確かな稼ぎになった。",
          effects: { money: 40 },
        },
        failure: {
          result: "相手の読みが、一枚上手だった。",
          effects: { money: -30 } },
      },
      {
        text: "大きく賭ける",
        check: { chance: 30 },
        success: {
          result: "腕利きの顔から、余裕の笑みが消えた。",
          effects: { money: 100 },
           log: { title: "賭場で腕利きを打ち負かす", text: "名うての博打師を相手に、大金をせしめた。" },
        },
        failure: {
          result: "身ぐるみを剥がされ、夜風の冷たさが身に染みた。",
          effects: { money: -150},
          log: { title: "賭場で身ぐるみ剥がされる", text: "名うての博打師に挑み、すべてを失った。" },
        },
      },
      {
         text: "勝負を降りる",
         result: "誘いを断り、場代だけ置いて賭場を出た。",
         effects: { money: -10},
 },
    ],
  },
        {
    id: "gambler_003",
    tags: ["gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"] },
    weight: 10,
    repeatable: true,
    text: "王都で大きな競馬大会が開かれる。どの馬に賭けるか。",
    choices: [
      {
        text: "人気馬",
        check: { chance: 60 },
        success: {
          result: "人気馬は危なげなく、先頭でゴールを駆け抜けた。",
          effects: { money: 40 },
        },
        failure: {
          result: "人気馬は最後の直線で失速した。手元には、紙くずになった馬券だけが残った。",
          effects: { money: -30 } },
      },
      {
        text: "穴馬",
        check: { chance: 30 },
        success: {
          result: "誰も見向きもしなかった馬が、大外から全頭を差し切った。",
          effects: { money: 100 },
           log: { title: "競馬で大穴を当てる", text: "誰も信じなかった馬に賭け、競馬場の噂の的になった。" },
        },
        failure: {
          result: "穴馬は、最後まで穴馬のままだった。",
          effects: { money: -150},
          log: { title: "競馬で大損する", text: "穴馬に夢を託し、大金を失った。" },
        },
      },
      {
        text: "知り合いの馬主から情報を買う",
        check: { chance: 65 },
        success: {
          result: "情報は本物だった。教えられた馬が、ゆうゆうと一着でゴールした。",
          effects: { money: 50, reputation: -2 },
        },
        failure: {
          result: "情報はガセだった。どうやら馬主自身も騙されていたらしい。",
          effects: { money: -40, reputation: -2 },
          log: { title: "競馬でガセ情報をつかまされる", text: "馬主の耳打ちを信じ、まんまと大損した。" },
        },
      },
    ],
  },
        {
    id: "gambler_004",
    tags: ["gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"], npcs: ["friend"] },
    weight: 10,
    repeatable: true,
    text: "{友人}とカードで勝負した。",
    choices: [
      {
        text: "いかさまをする",
        check: { chance: 90 },
        success: {
          result: "勝った。だが{友人}は、どこか腑に落ちない顔をしていた。",
          effects: { money: 40, npc: { friend: { trust: -5, intimacy: -5 } } },
        },
        failure: {
          result: "袖から札が滑り落ちた。{友人}は黙って席を立った。",
          effects: { money: -30, npcState: { friend: "left" } },
          log: { title: "友とのカードでいかさまがばれる", text: "{友人}の信頼を、たった一枚の札で失った。" },
        },
      },
      {
        text: "正々堂々と勝負する",
        check: { chance: 50 },
        success: {
          result: "勝った。{友人}は悔しがりながらも笑っていた。",
          effects: { money: 50, npc: { friend: { trust: 1, intimacy: 1 } } },
        },
        failure: {
          result: "負けた。{友人}は勝ち誇って、酒をおごらせた。",
          effects: { money: -50, npc: { friend: { trust: 1, intimacy: 1 } } },
        },
      },
    ],
  },
        {
    id: "gambler_005",
    tags: ["gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"] },
    weight: 10,
    repeatable: true,
    text: "大貴族に腕前を見込まれ、特別な勝負に招かれた。",
    choices: [
      {
        text: "いかさまをする",
        check: { chance: 60 },
        success: {
          result: "鮮やかな手さばきで相手を出し抜いた。大貴族は感嘆の声を上げた。",
          effects: { money: 100, reputation: 10, addFlags: ["cheat"] },
        },
        failure: {
          result: "仕込みは完璧だった。それでも、相手の運が上回った。",
          effects: { money: -30 } },
      },
      {
        text: "正々堂々と勝負する",
        check: { chance: 30 },
        success: {
          result: "正面からの勝負を制し、大貴族から惜しみない賛辞を受けた。",
          effects: { money: 100 ,reputation:5},
        },
        failure: {
          result: "居並ぶ貴族たちの前で、身ぐるみを剥がされた。",
          effects: { money: -150},
        },
      },
      {
         text: "勝負を断る",
         result: "誘いを断ったことで、「臆病者」という噂が広まった。",
         effects: {reputation:-10},
 },
    ],
  },
        {
    id: "gambler_006",
    tags: ["gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"] ,flags: ["cheat"], },
    weight: 10,
    repeatable: true,
    text: "過去、大貴族に仕掛けたいかさまが発覚した。",
    choices: [
      {
        text: "賠償金を払う",
          result: "賠償金を支払い、深々と頭を下げた。",
          effects: { money: -100, reputation: -5, removeFlags: ["cheat"] }
      },
      {
        text: "言いくるめる",
        check: { chance: 30 },
        success: {
          result: "なんとか言い逃れることができたが、疑惑は晴れなかった。",
          effects: { reputation: -5 },
        },
        failure: {
          result: "言い訳は通らず、多額の賠償金を取られた。",
          effects: { money: -150, reputation: -15, removeFlags: ["cheat"] },
        },
      },
      {
         text: "交渉する",
              check: { chance: 30 },
        success: {
          result: "和解金を支払い、手打ちになった。",
          effects: { money: -50, reputation: -5, removeFlags: ["cheat"] }
        },
        failure: {
          result: "交渉は決裂し、多額の賠償金を取られた。",
          effects: { money: -150, reputation: -15, removeFlags: ["cheat"] },
          log: { title: "大貴族へのいかさまが公になる", text: "不正を暴かれ、財布も名声も大きく削られた。" },
        },
 },
    ],
  },
  ]);
