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
    text: "長い修行の日々が実を結び、一人前と認められる日が来た。この先、どの道を歩むか。",
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
          result: "客はつかず、工房はすぐに畳むことになった。雇われ職人として働き始める。",
          effects: { job: "craftsman", money: -50 },
          log: { title: "独立に失敗し、雇われ職人になる", text: "工房を畳み、他人の工房で働くことになった。" },
        },
      },
      {
        conditions: { origin: ["farmer"] },
        text: "修行で得た腕を活かしつつ、家業の農家へ戻る",
        effects: { job: "farmer", reputation: 2 },
        log: { title: "修行を終え、農家へ戻る", text: "年季明けを機に、故郷の畑へ戻った。" },
      },
      {
        text: "職人の道を離れ、兵士に志願する",
        check: { stat: "health", difficulty: 45 },
        success: {
          result: "鍛えた体を見込まれ、王国軍に採用された。",
          effects: { job: "soldier" },
          log: { title: "修行のあと兵士になる", text: "職人の道を降り、槍を取った。" },
        },
        failure: {
          result: "体力が足りないと追い返された。とりあえず日雇いで食いつなぐ。",
          effects: { job: "laborer", reputation: -1 },
        },
      },
      {
        text: "冒険者ギルドに登録する",
        effects: { job: "adventurer", ability: 1 },
        log: { title: "修行のあと冒険者になる", text: "工房を出て、危険と隣り合わせの道を選んだ。" },
      },
      {
        text: "日雇いの仕事で食いつなぐ",
        effects: { job: "laborer" },
        log: { title: "修行のあと日雇いになる", text: "職人にはならず、その日暮らしを選んだ。" },
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
    conditions: { ageMin: 18, ageMax: 50, notJobs: ["slave", "retired","miner","prostitute","mistress"] },
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
        conditions: { origin: ["farmer"], notJobs: ["farmer"] },
        text: "家業の農家に戻る",
        effects: { job: "farmer", reputation: 1 },
        log: { title: "家業の農家に戻る", text: "出自の畑仕事へ、足を向け直した。" },
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
    tags: ["young", "prime", "elder"],
    conditions: {
      ageMin: 18,
      stats: { health: { max: 19 } },
      // 職名に先頭スペースを入れると一致しない（" miner" は無効）
      notJobs: ["slave", "retired", "miner", "prostitute", "mistress"],
    },
    weight: 10,
    repeatable: true,
    cooldown: 4,
    text: "近頃、疲れを感じる。",
    choices: [
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 50 } } },
        text: "温泉地で休養する（50ゴールド）",
        effects: { money: -50, health: 5 },
      },
      {
        text: "仕事を減らして休む",
        effects: { health: 2, ability: -1 },
      },
      {
        text: "無理を続ける",
        effects: { health: -3 },
      },
    ],
  },

  // ---------- 友人と金（借りる／返す／保証人）----------
  // debt_to_friend … 自分が友人に借りている
  // guarantor_for_friend … 友人の借金の保証人（理由フラグとセット）
  //   guarantor_shop / guarantor_daughter / guarantor_spouse
  {
    id: "common_young_013",
    tags: ["young", "prime", "elder", "friend", "money"],
    conditions: {
      ageMin: 18,
      moneyUnlocked: true,
      stats: { money: { max: -10 } },
      npcs: ["friend"],
      notFlags: ["debt_to_friend", "slave"],
      notJobs: ["slave", "miner"],
    },
    weight: 6,
    repeatable: true,
    cooldown: 5,
    text: "帳面の赤字が、目を逸らせない大きさになった。このままでは、来月の家賃すら危ない。",
    choices: [
      {
        text: "{友人}に借金を申し込む",
        result: "{友人}は長い沈黙のあと、匙を置いた。「返す前提だぞ」——掌に、80ゴールドの重みがある。",
        effects: { money: 80, addFlags: ["debt_to_friend"], npc: { friend: { trust: -5 } } },
        log: { title: "{友人}に借金をする", text: "苦しい家計を、友の懐で繋いだ。" },
      },
      {
        text: "夜も働いて繋ぐ",
        result: "睡眠を削って稼いだ。数字は少しだけマシになった。",
        effects: { health: -4, money: 30 },
      },
      {
        text: "食費を切り詰める",
        result: "味気ない粥が続く。財布は、わずかに持ち直した。",
        effects: { health: -2, money: 8 },
      },
    ],
  },
  {
    id: "common_young_014",
    tags: ["young", "prime", "elder", "friend", "money"],
    conditions: {
      flags: ["debt_to_friend"],
      npcs: ["friend"],
      moneyUnlocked: true,
    },
    weight: 10,
    repeatable: true,
    cooldown: 4,
    text: "{友人}が、いつもの冗談なしで扉を開けた。「あの金の話、そろそろ決着をつけたい」。",
    choices: [
      {
        conditions: { stats: { money: { min: 80 } } },
        text: "借りた80ゴールドを返す",
        result: "{友人}は受け取り、ようやく肩の力を抜いた。「友達でよかったよ」。",
        effects: { removeFlags: ["debt_to_friend"], money: -80, npc: { friend: { trust: 8, intimacy: 3 } } },
        log: { title: "{友人}に借金を返す", text: "借りた金を返し、友の信用に応えた。" },
      },
      {
        text: "今は返せないと告げる",
        result: "{友人}の目から、熱が消えた。扉は、静かに閉じられた。",
        effects: { npcState: { friend: "left" }, removeFlags: ["debt_to_friend"], reputation: -3 },
        log: { title: "{友人}への借金を踏み倒す", text: "返済を拒み、友情を切った。" },
      },
      {
        text: "待ってほしいと頭を下げる",
        result: "{友人}は溜息をつき、利子だけを受け取った。「次はないからな」。",
        effects: { money: -10 },
      },
    ],
  },
  {
    id: "common_young_015",
    tags: ["young", "prime", "friend", "slave"],
    conditions: {
      jobs: ["slave", "miner", "prostitute"],
      flags: ["slave"],
      npcs: ["friend"],
      notFlags: ["debt_to_friend"],
    },
    weight: 8,
    repeatable: true,
    cooldown: 5,
    text: "{友人}が、人目を忍ぶように訪ねてきた。{名前}が{職業}だと知り、黙っていられなかったらしい。",
    choices: [
      {
        text: "身請けを頼む",
        check: { chance: 30 },
        success: {
          result: "{友人}は財産の大半を投げ打ち、書類に印を押した。自由の味は、同時に借りた恩の味でもあった。",
          effects: {
            job: null,
            housing: "none",
            removeFlags: ["slave", "prostitute"],
            addFlags: ["debt_to_friend"],
            npc: { friend: { trust: 12, intimacy: 12 } },
          },
          log: { title: "{友人}に身請けされる", text: "{友人}が金を出し、{職業}の身分から救い出してくれた。" },
        },
        failure: {
          result: "交渉は決裂した。あとで主人の怒りが、{名前}に降りかかった。",
          effects: { reputation: -3, health: -6 },
        },
      },
      {
        text: "今の境遇でもやっていけると笑う",
        result: "{友人}は納得しない顔のまま、「生きていろ」とだけ言って去った。",
        effects: { ability: 1, npc: { friend: { intimacy: 5, trust: 3 } } },
      },
      {
        text: "苦しい胸の内を打ち明ける",
        result: "{友人}は言葉少なに頷き、隠していたパンと小銭を置いていった。",
        effects: { money: 10, health: 2, npc: { friend: { intimacy: 6 } } },
      },
    ],
  },
  {
    id: "common_young_016",
    tags: ["young", "prime", "elder", "friend", "money"],
    conditions: {
      ageMin: 18,
      ageMax: 45,
      npcs: ["friend"],
      notFlags: ["guarantor_for_friend", "slave"],
      notJobs: ["slave", "miner"],
    },
    weight: 2,
    repeatable: true,
    cooldown: 10,
    text: "{友人}が、図面を握りしめてきた。小さな店を開く資金を借りたい——保証人になってくれないか、と。",
    choices: [
      {
        text: "保証人になる",
        result: "{友人}の目が輝いた。「絶対に、お前には迷惑かけない」。握手は熱く、書類の字は冷たかった。",
        effects: {
          reputation: 3,
          addFlags: ["guarantor_for_friend", "guarantor_shop"],
          npc: { friend: { trust: 10, intimacy: 5 } },
        },
        log: { title: "{友人}の開業を保証する", text: "店を出すための借金の、保証人になった。" },
      },
      {
        text: "応援はするが保証は断る",
        result: "{友人}は無理に笑った。「そうだよな。自分の足でやるよ」。声だけが、少し細い。",
        effects: { npc: { friend: { intimacy: -3, trust: -2 } } },
      },
    ],
  },
  {
    id: "common_young_019",
    tags: ["prime", "elder", "friend", "money"],
    conditions: {
      ageMin: 36,
      npcs: ["friend"],
      notFlags: ["guarantor_for_friend", "slave"],
      notJobs: ["slave", "miner"],
    },
    weight: 2,
    repeatable: true,
    cooldown: 10,
    text: "{友人}が、声を潰して頼んできた。娘が夜の街にいる。身請けの金を借りたい——名を貸してほしい、と。",
    choices: [
      {
        text: "保証人になる",
        result: "{友人}は深く頭を下げた。「娘だけは、取り戻す」。証書には、{名前}の名が並ぶ。",
        effects: {
          reputation: 4,
          addFlags: ["guarantor_for_friend", "guarantor_daughter"],
          npc: { friend: { trust: 12, intimacy: 6 } },
        },
        log: { title: "{友人}の娘の身請けを保証する", text: "娘を救い出す借金の、保証人になった。" },
      },
      {
        text: "別の助け方を探すよう勧める",
        result: "{友人}は拳を震わせたまま、やがて小さく頷いた。扉の向こうで、長い溜息がした。",
        effects: { npc: { friend: { intimacy: -4 } } },
      },
    ],
  },
  {
    id: "common_young_020",
    tags: ["prime", "elder", "friend", "money"],
    conditions: {
      ageMin: 36,
      npcs: ["friend"],
      notFlags: ["guarantor_for_friend", "slave"],
      notJobs: ["slave", "miner"],
    },
    weight: 2,
    repeatable: true,
    cooldown: 10,
    text: "{友人}の配偶者が、長い病の床にいるという。治療費の借用に、保証人が足りない——頼めるのは{名前}だけだ、と。",
    choices: [
      {
        text: "保証人になる",
        result: "{友人}は何度も礼を言った。薬の匂いのする袖が、震えていた。",
        effects: {
          reputation: 4,
          addFlags: ["guarantor_for_friend", "guarantor_spouse"],
          npc: { friend: { trust: 12, intimacy: 8 } },
        },
        log: { title: "{友人}の治療費を保証する", text: "配偶者の治療費の借金で、保証人になった。" },
      },
      {
        text: "金銭の保証だけは断る",
        result: "冷ややかに聞こえたかもしれない。{友人}は「わかった」とだけ言い、診療の話へ戻っていった。",
        effects: { npc: { friend: { intimacy: -5, trust: -3 } } },
      },
    ],
  },
  {
    id: "common_young_017_shop",
    tags: ["young", "prime", "elder", "friend", "money"],
    conditions: {
      flags: ["guarantor_for_friend", "guarantor_shop"],
      npcs: ["friend"],
    },
    weight: 5,
    cooldown: 3,
    text: "借金取りが、閉店したばかりの看板を抱えて訪ねてきた。{友人}は店ごと消えたらしい。保証人欄に、{名前}の字がある。",
    choices: [
      {
        text: "開業資金のかわりに返済する",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "シャッターの前で、勘定を清算した。夢の代金は、まるごと自分の懐から出ていった。",
          effects: {
            money: -150,
            removeFlags: ["guarantor_for_friend", "guarantor_shop"],
            npc: { friend: { trust: -8, intimacy: -10 } },
          },
          log: { title: "{友人}の開業借金を肩代わりする", text: "逃げた友の店の借金を、自分が払った。" },
        },
        failure: {
          result: "額は想像を超えていた。帳面の終わりに、奴隷契約が待っていた。",
          effects: {
            job: "slave",
            addFlags: ["slave"],
            housing: "none",
            removeFlags: ["guarantor_for_friend", "guarantor_shop"],
            setStats: { money: 0 },
            reputation: -10,
          },
          log: { title: "開業保証の身代わりに奴隷へ", text: "{友人}の店の借金を背負い、自由を失った。" },
        },
      },
      {
        text: "保証の責任を拒む",
        result: "知らない名だと突っぱねた。後ろで、誰かが舌打ちした気がした。",
        effects: {
          npcState: { friend: "left" },
          removeFlags: ["guarantor_for_friend", "guarantor_shop"],
          reputation: -6,
        },
        log: { title: "開業の保証を捨てる", text: "{友人}の店の借金から、保証人を降りた。" },
      },
    ],
  },
  {
    id: "common_young_017_daughter",
    tags: ["prime", "elder", "friend", "money"],
    conditions: {
      flags: ["guarantor_for_friend", "guarantor_daughter"],
      npcs: ["friend"],
    },
    weight: 5,
    cooldown: 3,
    text: "借金取りが冷たく告げた。{友人}は娘を連れて夜逃げした、と。身請けの借用書に、{名前}の署名が残っている。",
    choices: [
      {
        text: "身請けの借金を肩代わりする",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "娘の行方はわからない。残ったのは、紙と、空の椅子と、払いきった領収だけだ。",
          effects: {
            money: -150,
            removeFlags: ["guarantor_for_friend", "guarantor_daughter"],
            npc: { friend: { trust: -10, intimacy: -12 } },
          },
          log: { title: "娘の身請け借金を肩代わりする", text: "逃げた{友人}の借用を、自分が清算した。" },
        },
        failure: {
          result: "身請けの残額は、人一人を買うに足りた。次に売られたのは、{名前}自身だった。",
          effects: {
            job: "slave",
            addFlags: ["slave"],
            housing: "none",
            removeFlags: ["guarantor_for_friend", "guarantor_daughter"],
            setStats: { money: 0 },
            reputation: -12,
          },
          log: { title: "身請け保証の身代わりに奴隷へ", text: "{友人}の娘の借金を背負い、自由を失った。" },
        },
      },
      {
        text: "署名の責任を拒む",
        result: "家族の事情だと突き返した。胸の奥で、誰かの名前が棘になった。",
        effects: {
          npcState: { friend: "left" },
          removeFlags: ["guarantor_for_friend", "guarantor_daughter"],
          reputation: -8,
        },
        log: { title: "身請けの保証を捨てる", text: "{友人}一家の借金から、手を引いた。" },
      },
    ],
  },
  {
    id: "common_young_017_spouse",
    tags: ["prime", "elder", "friend", "money"],
    conditions: {
      flags: ["guarantor_for_friend", "guarantor_spouse"],
      npcs: ["friend"],
    },
    weight: 5,
    cooldown: 3,
    text: "薬屋経由で借金取りが来た。{友人}は配偶者を連れて町を出たという。治療費の保証人は、{名前}のまま残されている。",
    choices: [
      {
        text: "治療費の残りを支払う",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "病院の匂いのする借用書に、済の印が押された。助かった命の代金を、いない友人のかわりに置いた。",
          effects: {
            money: -150,
            removeFlags: ["guarantor_for_friend", "guarantor_spouse"],
            npc: { friend: { trust: -6, intimacy: -10 } },
          },
          log: { title: "治療費の借金を肩代わりする", text: "{友人}が残した治療費を、自分が払った。" },
        },
        failure: {
          result: "病の請求は、終わらなかった。最後に差し出したのは、自分の身分だった。",
          effects: {
            job: "slave",
            addFlags: ["slave"],
            housing: "none",
            removeFlags: ["guarantor_for_friend", "guarantor_spouse"],
            setStats: { money: 0 },
            reputation: -10,
          },
          log: { title: "治療費保証の身代わりに奴隷へ", text: "{友人}の治療費を背負い、自由を失った。" },
        },
      },
      {
        text: "これ以上は払えぬと拒む",
        result: "冷酷に聞こえたろう。それでも、署名から身を剝がした。",
        effects: {
          npcState: { friend: "left" },
          removeFlags: ["guarantor_for_friend", "guarantor_spouse"],
          reputation: -5,
        },
        log: { title: "治療費の保証を捨てる", text: "{友人}の治療費から、保証を降りた。" },
      },
    ],
  },
  {
    id: "common_young_018",
    tags: ["young", "friend", "prime", "elder"],
    weight: 10,
    repeatable: true,
    cooldown: 5,
    conditions: { ageMin: 20, npcs: ["friend"] },
    text: "{友人}が訪ねてきた。",
    choices: [
      {
        text: "旧交を温める",
        result: "会えなかった日々の話に花が咲いた。",
        effects: { health: 5, npc: { friend: { intimacy: 8 } } },
      },
      {
        text: "ごちそうをふるまって歓待する",
        result: "上等なワインを開け、夜が更けるまで語り合った。",
        effects: { money: -5, health: 10, npc: { friend: { intimacy: 12, trust: 3 } } },
      },
      {
        text: "帰ってもらう",
        result: "忙しいのを理由に、{友人}との時間を持てなかった。",
        effects: { npc: { friend: { intimacy: -5 } } },
      },
    ],
  },
]);

