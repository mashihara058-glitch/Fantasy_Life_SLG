// 少年少女期（12〜17歳）
GAME.registerEvents([
  {
    id: "common_adolescence_001",
    tags: ["adolescence", "magic", "education"],
    conditions: { ageMin: 12, ageMax: 15, flags: ["magic_spark"] ,notFlags: ["slave"] },
    weight: 30,
    text: "王都の魔術学院から、才能ある子どもを探す使者が村にやって来た。",
    choices: [
      {
        text: "入学試験を受ける",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "試験官は目を見張り、その場で合格を告げた。",
          effects: { ability: 10, addFlags: ["magic_student"] },
          log: { title: "魔術学院に入学する", text: "才能を認められ、王都で魔法を学び始めた。" },
        },
        failure: {
          result: "緊張で光はうまく灯らなかった。使者は気の毒そうに首を振った。",
          effects: { ability: 2 },
        },
      },
      {
        text: "家族のそばに残る",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "common_adolescence_002",
    tags: ["adolescence", "work", "mentor"],
    conditions: { ageMin: 12, ageMax: 15, noNpcs: ["mentor"], moneyUnlocked: false, notFlags: ["magic_student"],notFlags: ["slave"]  },
    text: "腕の良い職人が、住み込みの弟子を探していると聞いた。",
    choices: [
      {
        text: "弟子入りを志願する",
        result: "師匠の{師匠}は無口だが、手仕事は見事だった。",
        effects: { addNpc: { role: "mentor", age: [40, 60], trust: 40 }, job: "apprentice", ability: 3 },
        log: { title: "{師匠}に弟子入りする", text: "職人の{師匠}のもとで、住み込みの修行を始めた。" },
      },
      {
        text: "今は家にいたい",
      },
    ],
  },
  {
    id: "common_adolescence_003",
    tags: ["adolescence", "rival"],
    conditions: { ageMin: 12, ageMax: 17, noNpcs: ["rival"] },
    text: "同じ年頃の若者が、何かにつけてあなたに張り合ってくる。",
    choices: [
      {
        text: "受けて立つ",
        result: "{ライバル}との競い合いの日々が始まった。",
        effects: { addNpc: { role: "rival", trust: 30, intimacy: 20 }, ability: 3 },
        log: { title: "{ライバル}と競い合う", text: "生涯の好敵手となる{ライバル}と出会った。" },
      },
      {
        text: "相手にしない",
        effects: { addNpc: { role: "rival", trust: 20, intimacy: 5 }, reputation: 1 },
      },
    ],
  },
  {
    id: "common_adolescence_004",
    tags: ["adolescence", "love"],
    conditions: { ageMin: 14, ageMax: 17, noNpcs: ["lover", "spouse"],notFlags: ["slave"]  },
    weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
    text: "収穫祭の夜。篝火の向こうで、ある人と目が合った。",
    choices: [
      {
        text: "踊りに誘う",
        check: { stat: "reputation", difficulty: 35 },
        success: {
          result: "{恋人}は少し頬を染めて、手を取ってくれた。",
          effects: { addNpc: { role: "lover", intimacy: 50, trust: 40 } },
          log: { title: "{恋人}と恋に落ちる", text: "収穫祭の夜、初めての恋が始まった。" },
        },
        failure: {
          result: "断られてしまった。篝火がやけにまぶしかった。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "見ているだけにする",
      },
    ],
  },
  {
    id: "common_adolescence_005",
    tags: ["adolescence", "friend"],
    conditions: { ageMin: 13, ageMax: 17, npcs: ["friend"] },
    weight: 12,
    text: "{友人}が青ざめた顔で打ち明けてきた。たちの悪い連中に借りを作ってしまったらしい。",
    choices: [
      {
        text: "一緒に頭を下げに行く",
        result: "二人で何日も働いて、ようやく借りを返した。{友人}は「この恩は忘れない」と言った。",
        effects: { health: -5, reputation: 2, npc: { friend: { trust: 25, intimacy: 10 } }, addFlags: ["helped_friend"] },
        log: { title: "窮地の{友人}を助ける", text: "友のために汗を流し、固い絆を結んだ。" },
      },
      {
        text: "関わらないことにする",
        result: "{友人}は何も言わずに去っていった。",
        effects: { npc: { friend: { trust: -30, intimacy: -20 } }, addFlags: ["abandoned_friend"] },
        log: { title: "{友人}を見捨てる", text: "助けを求める友に背を向けた。", important: false },
      },
    ],
  },
  {
    id: "common_adolescence_006",
    tags: ["adolescence", "training",],
    conditions: { ageMin: 12, ageMax: 17 ,notFlags: ["slave"] },
    repeatable: true,
    cooldown: 2,
    text: "将来、自分は何になるのだろう。{名前}はぼんやりと考えていた。",
    choices: [
      { text: "剣の稽古に励む", effects: { health: 3, addFlags: ["swordplay"] } },
      { text: "本を読みふける", effects: { ability: 3 } },
      { text: "町の人と話して回る", effects: { reputation: 3 } },
      { text: "料理を手伝う", effects: { health: 3, addFlags: ["cooking"] } },
    ],
  },
  {
    id: "common_adolescence_007",
    tags: ["adolescence", "love", "rival"],
    weight: 10,
    weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
    conditions: {
      // tags だけでは年齢は絞られない。少年期の範囲を明示する
      ageMin: 12,
      ageMax: 17,
      noNpcs: ["lover", "rival"],
      notFlags: ["slave"],
    },
    text: "最近気になる相手がいる。",
    choices: [
      {
        text: "話しかける",
        check: { chance: 50 },
        success: {
          result: "{恋人}と過ごす時間は夢のようだった。言葉を重ねるうち、いい雰囲気になった。",
          effects: { addNpc: { role: "lover", intimacy: 50, trust: 40 } },
          log: { title: "{恋人}と恋に落ちる", text: "少し言葉を交わしただけで、心が騒いだ。" },
        },
        failure: {
          result: "先に話しかけようとしたところへ、割り込んできた者がいた。名は{ライバル}。その後も、張り合う関係になった。",
          effects: { addNpc: { role: "rival", trust: 30, intimacy: 20 }, ability: 2 },
          log: { title: "{ライバル}と競い合う", text: "気になる相手の前で、好敵手と顔を合わせた。" },
        },
      },
      {
        text: "手紙を出す",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "数日して{恋人}から返事が来た。やり取りは続き、手紙の束は{名前}の宝物になった。",
          effects: { addNpc: { role: "lover", intimacy: 50, trust: 40 } },
          log: { title: "{恋人}と文通する", text: "静かな手紙から、恋が始まった。" },
        },
        failure: {
          result: "残念ながら、返事は来なかった。",
          effects: { reputation: -1 },
        },
      },
    ],
  },
  {
    id: "common_adolescence_008",
    tags: ["adolescence", "friend"],
    weight: 8,
    weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
    conditions: {
      ageMin: 12,
      ageMax: 17,
      notFlags: ["slave"],
      // 友人は複数可。引っ越しの出会いを一度きりにしたいなら noNpcs: ["friend"] でも可
    },
    text: "見慣れない子がいることに気付いた。家族の事情で、最近引っ越してきたらしい。",
    choices: [
      {
        text: "遊びに誘う",
        result: "その子の名は{友人}。不思議と気が合った。",
        effects: { addNpc: { role: "friend", trust: 45, intimacy: 50 } },
        log: { title: "{友人}と友人になる", text: "引っ越してきた子と、すぐに打ち解けた。" },
      },
      {
        text: "特に何もしない",
      },
    ],
  },
  {
    id: "common_adolescence_009",
    tags: ["adolescence", "family", "slave"],
    weight: 6,
    conditions: {
      // このファイルは少年期向け。10歳は childhood 側の年齢なので 12 起算に揃えた
      ageMin: 12,
      ageMax: 13,
      origin: ["farmer", "craftsman", "merchant"],
      notFlags: ["slave"],
      hasJob: false,
    },
    text: "今年はひどい不作だったらしい。不景気のため、我が家の家計も厳しい。",
    choices: [
      {
        text: "口減らしに志願する",
        result: "家族のために、自分を金に換える道を選んだ。",
        effects: { job: "slave", addFlags: ["slave"], setStats: { money: 0 } },
        log: { title: "奉公に出る", text: "家計を助けるため、身を売るように家を出た。" },
      },
      {
        text: "家業を手伝う",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "家族のため、若くてもできる限り働いた。",
          effects: { reputation: 2, ability: 1 },
        },
        failure: {
          result: "役に立ちたいと動いたが、食卓の厳しさは変わらなかった。",
          effects: { health: -2 },
        },
      },
    ],
  },

  // ---------- 追加（rival・仕事の芽・友人）----------
  {
    id: "common_adolescence_010",
    tags: ["adolescence", "rival"],
    weight: 9,
    repeatable: true,
    cooldown: 4,
    maxTimes: 2,
    conditions: { ageMin: 12, ageMax: 17, npcs: ["rival"], notFlags: ["slave"] },
    text: "{ライバル}が、人前で挑発してきた。周りがざわつく。",
    choices: [
      {
        text: "真正面から受けて立つ",
        check: { stat: "health", difficulty: 45 },
        success: {
          result: "勝負は辛くもこちらのものだった。{ライバル}は唇を噛み、次を予告して去った。",
          effects: { health: 2, ability: 2, reputation: 2, npc: { rival: { trust: -5, intimacy: 8 } } },
        },
        failure: {
          result: "力及ばず、泥に手をついた。笑いが耳に残る。",
          effects: { health: -5, reputation: -2, npc: { rival: { intimacy: 5 } } },
        },
      },
      {
        text: "言葉でやり込める",
        check: { stat: "reputation", difficulty: 40 },
        success: {
          result: "場の空気が傾いた。{ライバル}は赤い顔で黙り込んだ。",
          effects: { reputation: 3, ability: 1, npc: { rival: { trust: -8, intimacy: 3 } } },
        },
        failure: {
          result: "言い返されて言葉に詰まった。負けたのは体じゃない、と分かって余計に悔しい。",
          effects: { reputation: -3, npc: { rival: { intimacy: 2 } } },
        },
      },
      {
        text: "相手にせず去る",
        effects: { reputation: 1, npc: { rival: { trust: 3, intimacy: -5 } } },
      },
    ],
  },
  {
    id: "common_adolescence_011",
    tags: ["adolescence", "work"],
    weight: 8,
    conditions: {
      ageMin: 13,
      ageMax: 17,
      hasJob: false,
      moneyUnlocked: false,
      notFlags: ["slave", "magic_student"],
    },
    text: "村の店が、繁忙期だけ手伝いを雇うらしい。日当は少ないが、自分の金になる。",
    choices: [
      {
        text: "手伝いを申し込む",
        check: { stat: "ability", difficulty: 35 },
        success: {
          result: "荷物運びと掃除で手が真っ黒になった。掌に残った硬貨が、妙に重かった。",
          effects: { unlockMoney: true, money: 15, ability: 2, health: -3, addFlags: ["first_wages"] },
          log: { title: "初めての日当を得る", text: "繁忙期の手伝いで、自分の金を手にした。" },
        },
        failure: {
          result: "不器用さを見抜かれ、半日で帰された。日当は出なかった。",
          effects: { health: -2, reputation: -1 },
        },
      },
      {
        text: "今はまだ家にいる",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "common_adolescence_012",
    tags: ["adolescence", "friend"],
    weight: 9,
    repeatable: true,
    cooldown: 5,
    maxTimes: 2,
    conditions: { ageMin: 12, ageMax: 17, npcs: ["friend"], notFlags: ["slave"] },
    text: "{友人}が、秘密の場所へ連れていってくれた。誰にも言わないでほしい、と言う。",
    choices: [
      {
        text: "約束を守って一緒に行く",
        result: "朽ちた祠の影で、二人だけの時間があった。世界が少し広くなった気がした。",
        effects: { ability: 1, npc: { friend: { trust: 12, intimacy: 10 } } },
        log: { title: "{友人}の秘密を共有する", text: "友だけが知る場所へ、足を踏み入れた。" },
      },
      {
        text: "怖くなって断る",
        result: "{友人}は一瞬だけ寂しそうにして、すぐに笑った。「また今度ね」。",
        effects: { npc: { friend: { intimacy: -3 } } },
      },
      {
        text: "つい親に話してしまう",
        result: "翌日、その場所は大人が見回りに来ていた。{友人}の目は、冷たかった。",
        effects: { reputation: -2, npc: { friend: { trust: -20, intimacy: -15 } } },
        log: { title: "{友人}の秘密を漏らす", text: "守れと言われた約束を、破ってしまった。" },
      },
    ],
  },
  {
    id: "common_adolescence_013",
    tags: ["adolescence", "mentor", "work"],
    weight: 8,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 13, ageMax: 17, npcs: ["mentor"], jobs: ["apprentice"] },
    text: "{師匠}の仕事を真似して、失敗してしまった。材料が無駄になる。",
    choices: [
      {
        text: "すぐに謝ってやり直す",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "{師匠}は短く頷いただけだったが、手元の動きを少しゆっくり見せてくれた。",
          effects: { ability: 3, npc: { mentor: { trust: 8 } } },
        },
        failure: {
          result: "同じ失敗を繰り返し、夕方まで無言の空気が続いた。",
          effects: { health: -2, npc: { mentor: { trust: -5 } } },
        },
      },
      {
        text: "言い訳をする",
        result: "{師匠}は工具を置いた。「下手なのは仕方ない。嘘は、別だ」。",
        effects: { reputation: -2, npc: { mentor: { trust: -12, intimacy: -5 } } },
      },
      {
        text: "黙って片づける",
        effects: { ability: 1, npc: { mentor: { intimacy: 3 } } },
      },
    ],
  },
  {
    id: "common_adolescence_014",
    tags: ["adolescence", "training"],
    weight: 7,
    conditions: {
      ageMin: 14,
      ageMax: 17,
      flags: ["swordplay"],
      notFlags: ["slave", "sword_tested"],
    },
    text: "旅の兵士が村に泊まり、希望者に木刀の打ち合いを見せてくれるという。",
    choices: [
      {
        text: "稽古の成果を試す",
        check: { stat: "health", difficulty: 50 },
        success: {
          result: "兵士は目を細めた。「素人にしては、足が動く」。褒め言葉は短かったが、胸に残った。",
          effects: { health: 3, ability: 2, reputation: 3, addFlags: ["sword_tested"] },
          log: { title: "木刀で兵士と打ち合う", text: "日頃の稽古が、初めて人前で通った。" },
        },
        failure: {
          result: "二合で木刀を弾かれ、尻餅をついた。兵士は手を貸して起こしてくれた。",
          effects: { health: -4, addFlags: ["sword_tested"] },
        },
      },
      {
        text: "見学だけする",
        effects: { ability: 1, addFlags: ["sword_tested"] },
      },
    ],
  },
  {
    id: "common_adolescence_015",
    tags: ["adolescence", "childhood", "family"],
    weight: 6,
    conditions: {
      ageMin: 10,
      ageMax: 15,
      npcs: ["mother", "father"],
      notFlags: ["slave"],
    },
    text: "両親が、夜遅くまで低い声で話している。家計か、将来の話か——扉の向こうは聞こえない。",
    choices: [
      {
        text: "耳を澄ます",
        check: { chance: 50 },
        success: {
          result: "断片だけ聞こえた。心配されているのは、どうやら{名前}のこれかららしい。",
          effects: { ability: 1, npc: { mother: { intimacy: 2 }, father: { intimacy: 2 } } },
        },
        failure: {
          result: "床が軋んでばれ、こっぴどく叱られた。内容は結局わからなかった。",
          effects: { reputation: -1, npc: { mother: { trust: -3 }, father: { trust: -3 } } },
        },
      },
      {
        text: "自分の寝床へ戻る",
        effects: { health: 1 },
      },
      {
        text: "翌朝、手伝いを増やす",
        result: "言葉にはしなかったが、食卓の空気が少しだけ柔らかかった。",
        effects: { reputation: 2, ability: 1, npc: { mother: { trust: 3 }, father: { trust: 3 } } },
      },
    ],
  },
]);

