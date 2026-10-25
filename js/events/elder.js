// 老年期・長寿期
//   aged: true … 寿命の約80%以降（全種族）
//   ageMin: 100 … 長寿種族の「まだ老い前だが年月は長い」層（人間にはほぼ出ない）
GAME.registerEvents([
  {
    id: "common_elder_001",
    tags: ["elder", "work"],
    conditions: { aged: true, hasJob: true, notJobs: ["slave", "retired"] },
    weight: 25,
    repeatable: true,
    cooldown: 3,
    text: "体の衰えを感じる。そろそろ仕事を退く頃かもしれない。",
    choices: [
      {
        text: "引退する",
        effects: { job: "retired", health: 5 },
        log: { title: "仕事を退き、隠居する", text: "長年の務めに区切りをつけた。" },
      },
      {
        text: "生涯現役を貫く",
        effects: { reputation: 3, health: -3 },
      },
    ],
  },
  {
    id: "common_elder_002",
    tags: ["elder", "family", "successor"],
    conditions: { aged: true, notFlags: ["slave", "has_successor"] },
    weight: 15,
    text: "自分の知識や技を、誰かに残しておきたいと思うようになった。",
    choices: [
      {
        conditions: { npcs: ["child"] },
        text: "{子}に家と技を託す",
        effects: { addFlags: ["has_successor"], npc: { child: { trust: 15 } } },
        log: { title: "{子}に後を託す", text: "我が子に、自らが築いたものを譲り渡した。" },
      },
      {
        text: "見込みのある若者を弟子にとる",
        result: "{弟子}という若者が、目を輝かせて門を叩いた。",
        effects: { addNpc: { role: "pupil", age: [14, 20], trust: 50 }, addFlags: ["has_successor"], reputation: 5 },
        log: { title: "{弟子}を弟子にとる", text: "若者に、生涯で培ったものを伝え始めた。" },
      },
      {
        text: "自分の代で終わりでいい",
      },
    ],
  },
  {
    id: "common_elder_003",
    tags: ["elder", "family", "death"],
    conditions: { aged: true, npcs: ["spouse"] },
    weight: 6,
    text: "{配偶者}が床に伏せ、日に日に弱っていく。",
    choices: [
      {
        text: "最期まで手を握り続ける",
        effects: { npcState: { spouse: "dead" }, health: -5 },
        log: { title: "伴侶の{配偶者}を看取る", text: "長年連れ添った{配偶者}が、静かに旅立った。" },
      },
    ],
  },
  {
    id: "common_elder_004",
    tags: ["elder", "friend"],
    conditions: { aged: true, npcs: ["friend"] },
    weight: 10,
    text: "{友人}から手紙が届いた。「久しぶりに、あの広場で会わないか」",
    choices: [
      {
        text: "会いに行く",
        result: "互いに皺だらけになった顔を見て、二人は声を上げて笑った。",
        effects: { health: 3, npc: { friend: { intimacy: 10 } } },
        log: { title: "旧友{友人}と語り合う", text: "幼き日の思い出を語り合い、穏やかな時を過ごした。" },
      },
      {
        text: "返事だけ書く",
        effects: { npc: { friend: { intimacy: 2 } } },
      },
    ],
  },
  {
    id: "common_elder_005",
    tags: ["elder", "health"],
    conditions: { aged: true },
    repeatable: true,
    cooldown: 4,
    text: "最近、咳が止まらない。",
    choices: [
      {
        // 薬師本人には「他の薬師にかかる」を出さない
        conditions: { moneyUnlocked: true, stats: { money: { min: 30 } }, notJobs: ["medic"] },
        text: "薬師にかかる",
        effects: { money: -30, health: 5 },
      },
      {
        // Jobs ではなく jobs（小文字）。大文字だと条件が無視される
        conditions: { moneyUnlocked: true, jobs: ["medic"], stats: { money: { min: 10 } } },
        text: "自分で薬を調合する",
        effects: { money: -10, health: 5 },
      },
      {
        text: "放っておく",
        effects: { health: [-15, -5] },
      },
    ],
  },

  // ---------- エルフとドワーフの時間感覚 ----------
  {
    id: "common_elder_elf_dwarf_01",
    tags: ["elder", "species", "comedy"],
    weight: 10,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 100,
      species: ["elf"],
      notFlags: ["slave"],
    },
    text: "酒場で近況を話すと、隣のドワーフが眉を上げた。「つい先日、ドワーフの王が代替わりした」——自分には昨日のような話だ。",
    choices: [
      {
        text: "つい先日のことだと繰り返す",
        result: "ドワーフが卓を叩いて怒鳴る。「それは百二十年も前だ！　ワシの祖父の時代だぞ！」店内が、一瞬だけ静まる。",
        effects: { reputation: 1, health: 2 },
        log: {
          title: "「つい先日」の王位交替",
          text: "エルフの時間感覚で話した王位交替が、ドワーフには百年超の昔話だった。",
        },
      },
      {
        text: "暦を確認してから言い直す",
        result: "指折り数えたあと、「……百二十年ほど前、であったか」と訂正した。ドワーフは唸り、酒を追加で注文した。",
        effects: { ability: 1, reputation: 1 },
        log: {
          title: "暦を合わせて話を直す",
          text: "エルフの「先日」を、ドワーフの暦に直して言い直した。",
        },
      },
      {
        text: "黙って杯を傾ける",
        result: "ドワーフは独りごちる。「長い耳は、時計を持たんのか」。喧嘩にはならなかった。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "common_elder_elf_dwarf_02",
    tags: ["elder", "species", "comedy"],
    weight: 10,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 100,
      species: ["dwarf"],
      notFlags: ["slave"],
    },
    text: "取引の席で、エルフが小さく息を吐いた。「ドワーフはせっかちな種族だ」。相手の目は、本気で困っている。",
    choices: [
      {
        text: "二百年前の頼みの返事をまだ待っていると告げる",
        result: "エルフの耳が、かすかに揺れた。「……あれは、まだ検討中で」。自分の髭の方が、先に納得した顔をする。",
        effects: { reputation: 2, ability: 1 },
        log: {
          title: "「せっかち」への反論",
          text: "エルフにせっかちと言われ、二百年待ちの返事があると返した。",
        },
      },
      {
        text: "せっかちで悪かったな、と皮肉を返す",
        result: "場が凍る。やがてエルフが薄い笑みを作り、「では急がぬよう」とだけ言った。契約は来四半期に持ち越しだ。",
        effects: { reputation: -1, money: -5 },
      },
      {
        text: "商売の話に戻す",
        result: "時間論は棚上げし、数字だけを詰めた。帰り際、エルフが「またゆっくり」と言ったのが、いちばん皮肉に聞こえた。",
        effects: { money: 8, ability: 1 },
      },
    ],
  },
  {
    id: "common_elder_elf_dwarf_03",
    tags: ["elder", "species", "comedy"],
    weight: 8,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 100,
      species: ["elf", "dwarf"],
      notFlags: ["slave"],
    },
    text: "宿の談話室で、エルフとドワーフが暦の話でもめている。どちらも自分の正しさを、百年単位で主張している。",
    choices: [
      {
        conditions: { species: ["elf"] },
        text: "エルフ側の時間感覚で仲裁する",
        result: "「どちらも昨日のようなものでは」と言った瞬間、ドワーフだけが顔を赤くした。仲裁になっていない。",
        effects: { reputation: 1, health: -1 },
        log: {
          title: "暦論争に首を突っこむ",
          text: "エルフ寄りの言葉で仲裁し、ドワーフを怒らせた。",
        },
      },
      {
        conditions: { species: ["dwarf"] },
        text: "ドワーフ側の時間感覚で仲裁する",
        result: "「百二十年は昨日ではない」と言い切ると、エルフが優雅に黙った。勝った気がしない。",
        effects: { reputation: 1, health: -1 },
        log: {
          title: "暦論争に首を突っこむ",
          text: "ドワーフ寄りの言葉で仲裁し、場を黙らせた。",
        },
      },
      {
        text: "別の話題を振る",
        result: "天気と酒の話に逃げた。二人はしばらく睨み合い、やがて別々の樽に戻った。",
        effects: { health: 2 },
      },
      {
        text: "関わらずに席を立つ",
        result: "背後で、また「昨日」「百年」がぶつかる。長い命同士の喧嘩は、短い命の者には計測不能だ。",
        effects: { health: 1 },
      },
    ],
  },

  // ---------- 長寿ならではの「老害」コメディ ----------
  {
    id: "common_elder_long_01",
    tags: ["elder", "comedy", "craft"],
    weight: 9,
    maxTimes: 1,
    logOnce: true,
    conditions: { ageMin: 100, notFlags: ["slave"] },
    text: "若い職人の仕事場で、つい口が滑る。「最近の者は道具を大切にせん。昔は一本の槌を何十年も磨いたものだ」。先方が持ってきた槌を見て、言葉を失う。",
    choices: [
      {
        text: "自慢げに見せられた槌を眺める",
        result: "木柄の摩耗も頭の型も、今では博物館行きの古い規格だ。若者は「祖父の祖父の」と胸を張っている。自分が古いのではなく、槌が遺跡だった。",
        effects: { ability: 1, reputation: 1 },
        log: {
          title: "博物館級の槌を見せられる",
          text: "道具を大切にせよと説教し、展示物まがいの古槌を自慢された。",
        },
      },
      {
        text: "それでも手入れの話だけはする",
        result: "型は古くても、油の差し方は通じる。若者は真剣にメモを取り、「やっぱり長老は違う」と言った。槌の時代錯誤には触れないでおいた。",
        effects: { reputation: 2, ability: 1 },
        log: {
          title: "古槌の手入れを教える",
          text: "時代遅れの槌でも、手入れの心得だけは伝えた。",
        },
      },
      {
        text: "自分の歳を笑ってごまかす",
        result: "「……ワシより槌の方が先輩かもな」。工房が和み、茶が出た。説教の威厳だけが、静かに引退する。",
        effects: { health: 2, reputation: 1 },
      },
    ],
  },
  {
    id: "common_elder_long_02",
    tags: ["elder", "comedy", "friend"],
    weight: 9,
    maxTimes: 1,
    logOnce: true,
    conditions: { ageMin: 100, notFlags: ["slave"] },
    text: "市場の人混みで、旧友にそっくりな横顔を見かける。思わず名を呼ぶと、相手が不思議そうに振り返った。",
    choices: [
      {
        text: "近づいて話しかける",
        result: "よく見ると骨格も声も若い。曰く、その旧友の孫だという。懐から出す手紙の筆跡だけが、古い友人に似ていた。",
        effects: { health: 2, reputation: 1 },
        log: {
          title: "旧友の孫とすれ違う",
          text: "旧友かと思った人物は、その孫だった。",
        },
      },
      {
        text: "遠目に手を振るだけで去る",
        result: "呼び止める勇気は出ない。別れたあとに気づく。あれは、孫の年齢だ。",
        effects: { health: -1 },
      },
    ],
  },
  {
    id: "common_elder_long_03",
    tags: ["elder", "comedy", "money"],
    weight: 8,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 100,
      moneyUnlocked: true,
      stats: { money: { min: 5 } },
      notFlags: ["slave"],
    },
    text: "昔の蓄えを崩そうと袋を開ける。中から出てきた硬貨の刻印を、若い両替商が一瞬で怪しみの目で見た。",
    choices: [
      {
        text: "通用するか尋ねる",
        result: "「その貨幣制度は、もう三代前に廃止されています」。額面の記憶だけが立派で、手元に残るのは金属の重さだ。",
        effects: { money: -5, ability: 1 },
        log: {
          title: "廃止された通貨を持ち出す",
          text: "昔の貯蓄を崩そうとして、もう使えない貨幣だと知った。",
        },
      },
      {
        text: "コレクションとして買い取ってもらう",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "骨董趣味の商人が目を細める。「歴史としては面白い」。実用の金にはならないが、茶代にはなった。",
          effects: { money: 3, reputation: 1 },
          log: {
            title: "旧貨幣を骨董として換金",
            text: "廃止通貨を、わずかな骨董値で手放した。",
          },
        },
        failure: {
          result: "「溶かせば数銅貨ですが、手間賃で相殺です」。袋は軽くなり、歴史だけが重い。",
          effects: { money: -2 },
        },
      },
      {
        text: "袋を閉じ、記憶だけ残す",
        result: "硬貨をひとつ、掌に残す。使えぬ金でも、あの頃の自分の重さは残っている。",
        effects: { health: 2 },
      },
    ],
  },
  {
    id: "common_elder_long_04",
    tags: ["elder", "comedy", "history"],
    weight: 9,
    maxTimes: 1,
    logOnce: true,
    conditions: { ageMin: 100, notFlags: ["slave"] },
    text: "若い学者が、歴史的事件について質問に来る。教科書を開かせると、日時も人名も、自分が覚えているものと食い違っている。",
    choices: [
      {
        text: "その場の記憶で訂正する",
        result: "学者の羽ペンが止まらない。「一次資料になり得ます」。自分にとっては昨日の話が、すでに学説の争点だ。",
        effects: { reputation: 3, ability: 2 },
        log: {
          title: "教科書の歴史を訂正する",
          text: "学者の質問に答え、教科書の重大な誤りを指摘した。",
        },
      },
      {
        text: "手紙で詳しく書き送ると約束する",
        result: "学者は深々と頭を下げる。机に向かうと、記憶は鮮明なのに、暦の換算だけが億劫だ。",
        effects: { reputation: 2, ability: 1, health: -1 },
        log: {
          title: "歴史の証言を書き残す約束",
          text: "誤った教科書記述について、後で詳しく書くと約束した。",
        },
      },
      {
        text: "昔のことは忘れたと言う",
        result: "学者は残念そうに本を閉じる。扉の向こうで、「また生き証人を探さねば」と呟く声がした。",
        effects: { health: 1 },
      },
    ],
  },
]);
