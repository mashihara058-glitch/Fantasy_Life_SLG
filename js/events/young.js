// 青年期（18〜29歳）
GAME.registerEvents([
  {
    id: "common_young_001",
    tags: ["young", "magic", "work"],
    forced: true,
    conditions: { ageMin: 18, flags: ["magic_student"], notFlags: ["graduated"] },
    text: "魔術学院の卒業の日がやって来た。進む道を決めなければならない。",
    choices: [
      {
        text: "王都の魔術師ギルドに就職する",
        effects: { job: "mage", addFlags: ["graduated"], reputation: 5 },
        log: { title: "王都の魔術師ギルドに就職", text: "研究者としての人生を歩み始めた。" },
      },
      {
        text: "故郷に戻り、村の魔法使いになる",
        effects: { job: "mage", addFlags: ["graduated"], reputation: 10, incomeBonus: -30 },
        log: { title: "故郷の村の魔法使いになる", text: "学んだ魔法を、故郷の人々のために使うことにした。" },
      },
      {
        text: "魔法の腕を頼りに冒険者になる",
        effects: { job: "adventurer", addFlags: ["graduated"], ability: 3 },
        log: { title: "魔法使いの冒険者になる", text: "学院で磨いた魔法を武器に、冒険の道を選んだ。" },
      },
    ],
  },
  {
    id: "common_young_007",
    tags: ["young", "work", "mentor"],
    conditions: { ageMin: 18, ageMax: 30, jobs: ["apprentice"] },
    weight: 40,
    text: "長い修行の日々が実を結び、一人前と認められる日が来た。",
    choices: [
      {
        conditions: { npcs: ["mentor"] },
        text: "{師匠}の工房で働き続ける",
        effects: { job: "craftsman", npc: { mentor: { trust: 10, intimacy: 10 } } },
        log: { title: "年季が明け、一人前の職人になる", text: "{師匠}のもとで、職人として働き始めた。" },
      },
      {
        text: "独立して自分の工房を構える",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "小さいながらも、自分の看板を掲げた。",
          effects: { job: "craftsman", reputation: 5, incomeBonus: 15 },
          log: { title: "独立して工房を構える", text: "自分の名を冠した工房を開いた。" },
        },
        failure: {
          result: "客はつかず、工房はすぐに畳むことになった。",
          effects: { job: "craftsman", money: -50 },
          log: { title: "独立に失敗し、雇われ職人になる", text: "工房を畳み、他人の工房で働くことになった。" },
        },
      },
    ],
  },
    {
    id: "common_young_009",
    tags: ["young", "work"],
    forced: true,
    conditions: { ageMin: 18, flags: ["cooking"], notFlags: ["slave"] },
    text: "最近、包丁を握ると、とてもしっくりくる。自分は料理の道を目指すべきだと感じる。",
    choices: [
      {
        text: "町の飯屋で働く",
        effects: { job: "cook", reputation: 5 },
        log: { title: "町の料理人になる", text: "流行に敏感な人々の舌を満足させるため、勉強の日々が始まった。" },
      },
      {
        text: "故郷で飯屋を開く",
        effects: { job: "cook",  reputation: 10 },
        log: { title: "飯屋の店主になる", text: "慣れ親しんだ故郷の味が、一番腹を満足させると知った。" },
      },
      {
        text: "未知の食材を求めて冒険者になる",
        effects: { job: "adventurer", ability: 3 },
        log: { title: "料理人の冒険者になる", text: "まだ誰も味わったことのないごちそうを夢見て心を躍らせた。" },
      },
      {
        text: "料理は趣味にとどめ、今の暮らしを続ける",
        effects: { health: 2 },
      },
    ],
  },
  {
    id: "common_young_002",
    tags: ["young", "prime", "work"],
    conditions: { ageMin: 17, ageMax: 50, hasJob: false, notFlags: ["slave"] },
    weight: 20,
    repeatable: true,
    cooldown: 2,
    text: "仕事のない日々が続いている。蓄えも心もとない。",
    choices: [
      {
        text: "日雇いの仕事を探す",
        effects: { job: "laborer" },
      },
      {
        text: "兵士に志願する",
        check: { stat: "health", difficulty: 45 },
        success: {
          result: "体つきを見込まれ、王国軍に採用された。",
          effects: { job: "soldier" },
          log: { title: "王国軍の兵士になる", text: "槍を手に、国を守る務めに就いた。" },
        },
        failure: { result: "体力が足りないと追い返された。", effects: { reputation: -1 } },
      },
      {
        text: "冒険者ギルドに登録する",
        effects: { job: "adventurer" },
        log: { title: "冒険者になる", text: "冒険者ギルドに登録し、危険と隣り合わせの日々が始まった。" },
      },
         {
        text: "カジノへ行く",
        effects: { job: "gambler" },
        log: { title: "博打師になる", text: "有り金を握りしめ、運否天賦の綱渡りに挑んだ。" },
      },
    ],
  },
  {
    id: "common_young_003",
    tags: ["young", "love", "marriage"],
    conditions: { ageMin: 18, ageMax: 40, npcs: ["lover"], noNpcs: ["spouse"], notJobs: ["mistress"], notFlags: ["mistress"] },
    weight: 15,
    weightMods: [{ conditions: { flags: ["changeling"], notFlags: ["changeling_accepted"] }, multiply: 0.3 }],
    text: "{恋人}との付き合いも長くなった。二人の将来について、考える時が来たようだ。",
    choices: [
      {
        text: "結婚を申し込む",
        check: { stat: "reputation", difficulty: 25 },
        success: {
          result: "{配偶者}は涙を浮かべて頷いた。",
          effects: { npcRole: { lover: "spouse" }, addFlags: ["married"], money: -30, health: 3 },
          log: { title: "{配偶者}と結婚する", text: "ささやかな式を挙げ、夫婦となった。" },
        },
        failure: {
          result: "{恋人}はうつむき、「ごめんなさい」とだけ言って去っていった。",
          effects: { npcState: { lover: "left" }, health: -3 },
          log: { title: "{恋人}と別れる", text: "求婚は受け入れられなかった。" },
        },
      },
      {
        text: "まだその時ではない",
        effects: { npc: { lover: { intimacy: -5 } } },
      },
    ],
  },
  {
    id: "common_young_004",
    tags: ["young", "marriage", "noble"],
    conditions: {
      ageMin: 18,
      ageMax: 28,
      origin: ["noble"],
      noNpcs: ["spouse"],
      notJobs: ["slave", "miner", "prostitute", "mistress"],
      notFlags: ["slave", "mistress", "prostitute"],
    },
    weight: 15,
    weightMods: [{ conditions: { flags: ["changeling"] }, multiply: 0.2 }],
    text: "家の都合で、名家との縁談が持ち込まれた。",
    choices: [
      {
        text: "縁談を受け入れる",
        result: "相手は{配偶者}という、物静かな人物だった。",
        effects: { addNpc: { role: "spouse", trust: 40, intimacy: 20 }, addFlags: ["married"], reputation: 10, money: 100 },
        log: { title: "{配偶者}と政略結婚する", text: "家同士の縁談により、名家の{配偶者}と結ばれた。" },
      },
      {
        conditions: { npcs: ["lover"] },
        text: "縁談を蹴り、{恋人}と結ばれる",
        effects: { npcRole: { lover: "spouse" }, addFlags: ["married", "defied_family"], reputation: -10 },
        log: { title: "家に逆らい{配偶者}と結婚する", text: "縁談を断り、愛する人を選んだ。" },
      },
      {
        text: "丁重に断る",
        effects: { reputation: -3 },
      },
    ],
  },
  {
    id: "common_young_006",
    tags: ["young", "prime", "work"],
    conditions: { ageMin: 18, ageMax: 59, hasJob: true, notJobs: ["slave", "retired","gambler","mistress"] },
    repeatable: true,
    cooldown: 3,
    text: "{職業}としての仕事にも、すっかり慣れてきた。",
    choices: [
      {
        text: "昇給を願い出る",
        check: { stat: "reputation", difficulty: 45 },
        success: { result: "日頃の働きぶりが認められた。しかし、報酬に見合うだけの責任をも求められた。", effects: { incomeBonus: 10,ability:-15 } },
        failure: { result: "「生意気を言うな」と一蹴された。", effects: { reputation: -3 } },
      },
      { text: "腕を磨く", effects: { ability: 3 } },
      { text: "ほどほどに働く", effects: { health: 2 } },
    ],
  },
  {
    id: "common_young_008",
    tags: ["young", "work"],
    conditions: { ageMin: 18, ageMax: 50, notJobs: ["slave", "retired"] },
    weight: 10,
    text: "ベッドの中でふと思う。今の仕事は自分に合っているだろうか？",
    choices: [
       {
        text: "日雇いの仕事を探す",
        effects: { job: "laborer" },
      },
      {
        text: "兵士に志願する",
        check: { stat: "health", difficulty: 45 },
        success: {
          result: "体つきを見込まれ、王国軍に採用された。",
          effects: { job: "soldier" },
          log: { title: "王国軍の兵士になる", text: "槍を手に、国を守る務めに就いた。" },
        },
        failure: { result: "体力が足りないと追い返された。", effects: { reputation: -1 } },
      },
      {
        text: "冒険者ギルドに登録する",
        effects: { job: "adventurer" },
        log: { title: "冒険者になる", text: "冒険者ギルドに登録し、危険と隣り合わせの日々が始まった。" },
      },
         {
        text: "カジノへ行く",
        effects: { job: "gambler" },
        log: { title: "博打師になる", text: "有り金を握りしめ、運否天賦の綱渡りに挑んだ。" },
      },
        {
        text: "美食を追求する",
        effects: { job: "cook" },
        log: { title: "料理人になる", text: "まだ見ぬ味を追い求めて、食材と格闘することに決めた。" },
      },
      {
        conditions: { hasJob: true },
        text: "今の仕事を続ける",
      },
    ],
  },
  {
    id: "common_young_011",
    tags: ["young","noble"],
    conditions: { ageMin: 18, origin: ["noble"], jobs: ["noble"] },
    weight: 5,
    repeatable: true,
    cooldown: 8,
    text: "領地で洪水があり、橋が流されてしまった。",
    choices: [
      {
        conditions: { stats: { money: { min: 100 } } },
        text: "100ゴールドかけて修理する",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "交通は維持された。その年、交易で多くの利益が出た。",
          effects: { money: 20 },
          log: { title: "橋を修理する", text: "領民は領主に感謝した。" },
        },
        failure: { result: "手抜き工事だった。橋は再び流された。", effects: { money: -150 } },
      },
      {
        text: "借金をしてでも修理する",
        check: { stat: "reputation", difficulty: 60 },
        success: {
          result: "その年の交易で、修理費を上回る利益が出た。",
          effects: { money: 120 },
        },
        failure: {
          result: "手抜き工事で、再び橋が流れてしまった。手元には借用書だけが残った。",
          effects: { money: -150},
          log: { title: "橋の修理で借金を作った", text: "悪徳業者に当たってしまった。", important: true },
        },
      },
      {
         text: "何もしない",
          check: { stat: "reputation", difficulty: 70 },
        success: {
          result: "領民の有志が橋を直してくれた。",
        },
        failure: { result: "領民は領主に不満を覚えた。", effects: { reputation: -10 } },
         },
    ],
  },
    {
    id: "common_young_010",
    tags: ["young","farmer"],
    conditions: { ageMin: 16, jobs: ["farmer"] },
    weight: 5,
    repeatable: true,
    cooldown: 8,
    text: "獣害によって、収穫間近の畑が荒らされてしまった。残る食料は乏しい。",
    choices: [
      {
        text: "他の村や町から食料を買う",
        effects:{ money: -50, health: 2},
      },
      {
        text: "狩りをして獣の肉を得る",
        effects:{ health: -2,ability: 1}
      },
      {
         text: "わずかな食料で耐え忍ぶ",
         effects:{ health: -3}
         },
    ],
  },

{
  id: "common_young_012",
  tags: ["young", "elder"],
  conditions: { ageMin: 18, stats: { health: { max: 19 } } },
  weight: 10,
  repeatable: true,
  text: "近頃疲れを感じる。",
  choices: [
    {
      text: "温泉地で休養する",
      effects: { money: -50, health: 5 },
    },
    {
      text: "残業を減らす",
      effects: { health: 2, ability: -1 },
    },
    {
      text: "無理を続ける",
      effects: { health: -3 },
    },
  ],
},
  {
    id: "common_young_013",
    tags: ["young", "prime", "elder", "friend", "money"],
    conditions: {
      ageMin: 18,
      moneyUnlocked: true,
      stats: { money: { max: -10 } },
      npcs: ["friend"],
      notFlags: ["debt_to_friend", "slave"],
    },
    weight: 8,
    repeatable: true,
    cooldown: 3,
    text: "家計が苦しい。{名前}家に残された時間はあとわずかだ。",
    choices: [
      {
        text: "{友人}に借金を申し込む",
        result: "{友人}を拝み倒し、なんとか80ゴールド借りた。",
        effects: { money: 80, addFlags: ["debt_to_friend"], npc: { friend: { trust: -5 } } },
        log: { title: "{友人}に借金をする", text: "{友人}に金を借りた。" },
      },
      {
        text: "仕事を増やす",
        effects: { health: -3, money: 30 },
      },
      {
        text: "生活費を削る",
        effects: { health: -1, money: 5 },
      },
    ],
  },
  {
    id: "common_young_014",
    tags: ["young", "prime", "elder", "friend", "money"],
    conditions: { flags: ["debt_to_friend"], npcs: ["friend"] },
    weight: 12,
    repeatable: true,
    cooldown: 3,
    text: "{友人}が訪ねてきた。以前借りた金を返してほしいらしい。",
    choices: [
      {
        text: "{友人}に借金を返す",
        effects: { removeFlags: ["debt_to_friend"], money: -80, npc: { friend: { trust: 5 } } },
        log: { title: "{友人}に借金を返す", text: "{友人}の信用に報いた。" },
      },
      {
        text: "返済を断る",
        effects: { npcState: { friend: "left" }, removeFlags: ["debt_to_friend"] },
        log: { title: "{友人}への借金を踏み倒す", text: "{友人}を裏切った。" },
      },
      {
        text: "待ってほしいと懇願する",
        result: "{友人}に利子を払い、返済を待ってもらうことにした。",
        effects: { money: -8 },
      },
    ],
  },
  {
    id: "common_young_015",
    tags: ["young", "prime", "friend", "slave"],
    conditions: { jobs: ["slave", "miner", "prostitute"], npcs: ["friend"], flags: ["slave"] },
    weight: 10,
    repeatable: true,
    cooldown: 3,
    text: "{友人}が訪ねてきた。{名前}が{職業}をしていると知り、駆けつけてくれたようだ。",
    choices: [
      {
        text: "助けを求める",
        check: { chance: 30 },
        success: {
          result: "{友人}の尽力により、{職業}の道から解放された。",
          effects: {
            job: null,
            removeFlags: ["slave", "prostitute"],
            addFlags: ["debt_to_friend"],
            npc: { friend: { trust: 10, intimacy: 10 } },
          },
          log: { title: "{友人}に助けられ、{職業}から足を洗う", text: "{友人}が借金を肩代わりしてくれた。" },
        },
        failure: {
          result: "脱出に失敗し、折檻を受けることになった。",
          effects: { reputation: -3, health: -5 },
        },
      },
      {
        text: "自分が仕事に誇りを持っていると話す",
        result: "{友人}は{名前}が元気であることに安心し、「また来る」と告げて去った。",
        effects: { ability: 1, npc: { friend: { intimacy: 5 } } },
      },
      {
        text: "愚痴をこぼす",
        result: "{友人}は{名前}の苦境に涙し、差し入れをくれた。",
        effects: { money: 10, npc: { friend: { intimacy: 5 } } },
      },
    ],
  },
  {
    id: "common_young_016",
    tags: ["young", "prime", "elder", "friend", "money"],
    conditions: {
      ageMin: 18,
      npcs: ["friend"],
      notFlags: ["guarantor_for_friend", "slave"],
      notJobs: ["slave", "miner"],
    },
    weight: 5,
    repeatable: true,
    cooldown: 8,
    text: "{友人}が店を開くらしい。保証人になってほしいと頼んできた。",
    choices: [
      {
        text: "承諾する",
        result: "{友人}は{名前}に感謝を告げ、決して迷惑はかけないと誓った。",
        effects: { reputation: 5, addFlags: ["guarantor_for_friend"], npc: { friend: { trust: 10 } } },
        log: { title: "{友人}の借金の保証人になる", text: "{友人}を信じた。" },
      },
      {
        text: "断る",
        result: "ない袖は振れないと告げると、{友人}との関係が少しぎこちなくなった。",
        effects: { npc: { friend: { intimacy: -5 } } },
      },
    ],
  },
  {
    id: "common_young_017",
    tags: ["young", "prime", "elder", "friend", "money"],
    conditions: { flags: ["guarantor_for_friend"], npcs: ["friend"] },
    weight: 8,
    repeatable: true,
    cooldown: 4,
    text: "借金取りが訪ねてきた。{友人}が借金を置いて逃げたらしい。保証人欄には{名前}の名が記されている。",
    choices: [
      {
        text: "{友人}のかわりに返済する",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "{友人}の借金を肩代わりした。",
          effects: { money: -80, removeFlags: ["guarantor_for_friend"], npc: { friend: { trust: -10 } } },
          log: { title: "{友人}の借金を肩代わりする", text: "{友人}を助けた。" },
        },
        failure: {
          result: "{友人}の借金は莫大で、返済しきれなかった。{名前}は奴隷として売られることになった。",
          effects: {
            job: "slave",
            addFlags: ["slave"],
            removeFlags: ["guarantor_for_friend"],
            setStats: { money: 0 },
            reputation: -10,
          },
          log: { title: "他人の身代わりに奴隷へ落ちる", text: "{友人}の借金を背負い、自由を失った。" },
        },
      },
      {
        text: "断る",
        result: "{友人}のことなど知らないと、きっぱり断った。",
        effects: { npcState: { friend: "left" }, removeFlags: ["guarantor_for_friend"], reputation: -5 },
        log: { title: "保証人の責任を拒む", text: "{友人}を見捨て、保証の義務から逃げた。" },
      },
    ],
  },
  {
  id: "common_young_017",
  tags: ["young", "friend", "prime", "elder"],
  weight: 10,
  repeatable: true,
  conditions: {
    ageMin: 20,
    npcs: ["friend"]
  },
  text: "{友人｝が訪ねてきた。",
  choices: [
    {
      text: "旧交を温める",
      result: "お互い会えなかった期間の話をした。",
      effects: { health:5 },
    },
    {
      text: "ごちそうをふるまい歓待する",
      result: "上等なワインを開け、一晩中語り合った。",
      effects: { money:-5,health:10 },
    },
    {
      text: "帰ってもらう",
      result: "とても忙しいので、{友人}との時間を持てなかった。",
    }
  ],
},
]);
