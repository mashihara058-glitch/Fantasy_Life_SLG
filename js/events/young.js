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
    ],
  },
  {
    id: "common_young_003",
    tags: ["young", "love", "marriage"],
    conditions: { ageMin: 18, ageMax: 40, npcs: ["lover"], noNpcs: ["spouse"] },
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
    conditions: { ageMin: 18, ageMax: 28, origin: ["noble"], noNpcs: ["spouse"] },
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
    id: "common_young_005",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 17, ageMax: 50, jobs: ["adventurer"] },
    weight: 20,
    repeatable: true,
    cooldown: 2,
    logOnce: true,
    text: "ギルドの掲示板に、竜の巣の調査依頼が貼り出されている。報酬は破格だ。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "竜の目を盗んで巣を調べ上げ、無事に帰還した。ギルド中の噂の的だ。",
          effects: { money: 150, reputation: 10, addFlags: ["dragon_survey"] },
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
    id: "common_young_006",
    tags: ["young", "prime", "work"],
    conditions: { ageMin: 18, ageMax: 59, hasJob: true, notJobs: ["slave", "retired"] },
    repeatable: true,
    cooldown: 3,
    text: "{職業}としての仕事にも、すっかり慣れてきた。",
    choices: [
      {
        text: "昇給を願い出る",
        check: { stat: "reputation", difficulty: 45 },
        success: { result: "日頃の働きぶりが認められた。", effects: { incomeBonus: 10 } },
        failure: { result: "「生意気を言うな」と一蹴された。", effects: { reputation: -3 } },
      },
      { text: "腕を磨く", effects: { ability: 3 } },
      { text: "ほどほどに働く", effects: { health: 2 } },
    ],
  },
]);
