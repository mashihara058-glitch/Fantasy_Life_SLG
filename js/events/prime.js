// 壮年〜晩年の共通イベント
//   従来: おおむね 25〜59
//   006〜: ageMin 50/60 で長寿の「間」と晩年の人間関係を厚くする（ageMax なし）
GAME.registerEvents([
  {
    id: "common_prime_001",
    tags: ["prime", "friend"],
    conditions: { ageMin: 25, ageMax: 59, flags: ["helped_friend"], npcs: ["friend"] },
    weight: 20,
    text: "かつて窮地を救った{友人}が、訪ねてきた。今では大きな商会を営んでいるという。",
    choices: [
      {
        text: "再会を喜び合う",
        result: "「あの時の恩を返させてくれ」{友人}は重い革袋を差し出した。",
        effects: { money: 200, reputation: 5, npc: { friend: { intimacy: 10 } } },
        log: { title: "{友人}と再会し、恩を返される", text: "若き日に助けた友が、大きな助けとなって戻ってきた。" },
      },
      {
        text: "礼は受け取らず、酒を酌み交わす",
        effects: { health: 2, reputation: 3, npc: { friend: { trust: 10, intimacy: 15 } } },
        log: { title: "{友人}と再会する", text: "かつての友人との交流が再び始まった。" },
      },
    ],
  },
  {
    id: "common_prime_002",
    tags: ["prime", "friend"],
    conditions: { ageMin: 25, ageMax: 59, flags: ["abandoned_friend"], npcs: ["friend"] },
    weight: 15,
    text: "人混みの中に、見覚えのある顔があった。かつて見捨てた{友人}が、冷たい目でこちらを見ている。",
    choices: [
      {
        text: "あの時のことを謝る",
        result: "{友人}は長い沈黙のあと、「もういい」とだけ言った。",
        effects: { npc: { friend: { trust: 15 } }, removeFlags: ["abandoned_friend"] },
        log: { title: "{友人}に過去を詫びる", text: "長年のわだかまりに、ようやく向き合った。" },
      },
      {
        text: "目を逸らして立ち去る",
        effects: { npcState: { friend: "left" }, reputation: -3 },
      },
    ],
  },
  {
    id: "common_prime_003",
    tags: ["prime", "work"],
    weight: 10,
    repeatable: true,
    maxTimes: 3,
    cooldown: 10,
    logOnce: true,
    conditions: {
      ageMin: 28,
      ageMax: 55,
      hasJob: true,
      notJobs: ["slave", "retired", "laborer", "gambler", "mistress", "miner", "prostitute"],
      stats: { ability: { min: 45 } },
    },
    text: "長年の働きぶりが認められ、責任ある立場を任されることになった。",
    choices: [
      {
        text: "謹んで引き受ける",
        effects: {
          reputation: 8,
          incomeBonus: 25,
          health: -3,
          ability: -10,
          addFlags: ["promoted"],
        },
        log: { title: "{職業}として昇進する", text: "重責を担う立場となった。" },
      },
      {
        text: "今の立場のままでいたい",
        effects: { health: 2 },
      },
    ],
  },
  {
    id: "common_prime_004",
    tags: ["prime", "money"],
    conditions: { ageMin: 25, ageMax: 55, moneyUnlocked: true, notFlags: ["slave"] },
    repeatable: true,
    cooldown: 8,
    text: "旧知の商人から、東方交易への出資を持ちかけられた。「うまくいけば倍以上になる」",
    choices: [
      {
        conditions: { stats: { money: { min: 100 } } },
        text: "100ゴールド出資する",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "交易船は香辛料を満載して戻ってきた。",
          effects: { money: 150 },
          log: { title: "東方交易で財を成す", text: "出資が実を結び、懐が大いに潤った。" },
        },
        failure: { result: "船は嵐で沈んだ。出資金は戻らない。", effects: { money: -100 } },
      },
      {
        text: "借金をしてでも出資する",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "賭けは当たった。借金を返しても十分な儲けが出た。",
          effects: { money: 120 },
        },
        failure: {
          result: "船は帰らなかった。手元には借用書だけが残った。",
          effects: { money: -150, addFlags: ["indebted"] },
          log: { title: "交易の失敗で借金を背負う", text: "無理な出資が裏目に出た。", important: true },
        },
      },
      { text: "断る" },
    ],
  },
  {
    id: "common_prime_005",
    tags: ["prime", "reflection"],
    conditions: { ageMin: 30, ageMax: 59, notFlags: ["slave"] },
    repeatable: true,
    cooldown: 6,
    text: "ふと、自分の人生はこれでよかったのかと考える夜があった。",
    choices: [
      { text: "今の道を極める", effects: { ability: 2 } },
      {
        text: "新しいことを始めてみる",
        check: { stat: "ability", difficulty: 40 },
        success: { result: "思いのほか性に合っていた。", effects: { ability: 3, reputation: 3 } },
        failure: { result: "三日坊主に終わった。", effects: { money: -10 } },
      },
      {
        conditions: { npcs: ["spouse"] },
        text: "{配偶者}とゆっくり過ごす",
        effects: { health: 2, npc: { spouse: { intimacy: 5 } } },
      },
    ],
  },
  {
    id: "common_prime_006",
    tags: ["prime", "elder", "friend"],
    weight: 8,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: { ageMin: 50, npcs: ["friend"], notFlags: ["slave"] },
    text: "{友人}が声をかけてきた。小舟を出して、釣りでもしないか、と。",
    choices: [
      {
        text: "誘いに乗る",
        check: { chance: 65 },
        success: {
          result: "脂ののった魚がかかった。岸辺で{友人}と焼き、煙くさいまま笑い合った。",
          effects: { health: 4, npc: { friend: { intimacy: 5 } } },
          log: {
            title: "{友人}と釣りに行く",
            text: "友人に誘われ、舟の上で半日を過ごした。",
          },
        },
        failure: {
          result: "坊主だった。それでも風と話だけで、十分に値打ちがある。",
          effects: { health: 3, npc: { friend: { intimacy: 3 } } },
        },
      },
      {
        text: "今日は見送る",
        result: "{友人}は肩をすくめて笑った。「また声をかける」。それだけでよかった。",
        effects: { npc: { friend: { intimacy: 1 } } },
      },
    ],
  },
  {
    id: "common_prime_007",
    tags: ["prime", "elder", "friend"],
    weight: 8,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: { ageMin: 50, npcs: ["friend"], notFlags: ["slave"] },
    text: "{友人}が盤を抱えて訪ねてきた。巷で流行の勝負事だという。頭の体操に、一局どうだ、と。",
    choices: [
      {
        text: "誘いに乗る",
        check: { chance: 60 },
        success: {
          result: "ルールを確認しながら盤を進めるうち、互いの悪手が笑いになった。勝負より、時間が勝った。",
          effects: {
            health: 2,
            ability: 1,
            npc: { friend: { intimacy: 5 } },
          },
          log: {
            title: "{友人}と盤上で遊ぶ",
            text: "流行の勝負事に付き合い、友人と午後を潰した。",
          },
        },
        failure: {
          result: "ルールが頭に残りにくい。勝負にはならなかったが、{友人}の早口の説明を聞いているだけで楽しかった。",
          effects: { health: 2, npc: { friend: { intimacy: 3 } } },
        },
      },
      {
        text: "今日は頭を使いたくないと断る",
        result: "{友人}は盤を畳み、「茶だけ置いていく」と言ってくれた。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "common_prime_008",
    tags: ["prime", "elder", "family"],
    weight: 8,
    repeatable: true,
    cooldown: 7,
    logOnce: true,
    conditions: { ageMin: 50, npcs: ["spouse"], notFlags: ["slave"] },
    text: "家に戻ると、いつもより手が込んだ食事が並んでいた。燭台まで出ている。",
    choices: [
      {
        text: "{配偶者}と食卓を囲む",
        result: "どうしたのかと聞くと、{配偶者}は笑った。「今日は、私たちの記念日だよ」。料理の味より、先に言葉が熱い。",
        effects: {
          health: 4,
          npc: { spouse: { intimacy: 8, trust: 2 } },
        },
        log: {
          title: "{配偶者}と記念日の食卓",
          text: "配偶者の用意した食卓で、結婚の記念日を祝った。",
        },
      },
      {
        text: "礼だけ言って席を外す",
        result: "腹は満たされた。だが{配偶者}の視線が、皿の向こうで少しだけ迷っていた気がする。",
        effects: {
          health: 1,
          npc: { spouse: { intimacy: -2 } },
        },
      },
    ],
  },
  {
    id: "common_prime_009",
    tags: ["prime", "elder", "reflection"],
    weight: 7,
    repeatable: true,
    cooldown: 8,
    logOnce: true,
    conditions: { ageMin: 50, notFlags: ["slave"] },
    text: "片づけの途中、若いころの日記が出てきた。墨が滲んだ頁が、指に匂いを残す。",
    choices: [
      {
        text: "読んでみる",
        check: { chance: 55 },
        success: {
          result: "当時は大ごとだった悩みが、今は小さく見える。頁の端を閉じると、懐かしい熱だけが残った。",
          effects: { ability: 2, health: 1 },
          log: {
            title: "若い頃の日記を読み返す",
            text: "昔の自分の記録に目を通し、不思議と肩が軽くなった。",
          },
        },
        failure: {
          result: "読み進めるほど、忘れていた恥が戻ってくる。蓋をして、棚の奥へ押し込んだ。",
          effects: { health: -2 },
        },
      },
      {
        text: "封をしたまま片づける",
        result: "紐を結び直す。過去は、今すぐ開かなくても消えない。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "common_prime_010",
    tags: ["prime", "elder", "family", "money"],
    weight: 9,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 60,
      npcs: ["child"],
      moneyUnlocked: true,
      notFlags: ["slave", "help_child", "guarantor_for_child"],
    },
    text: "{子}が訪ねてきた。頬が痩せ、声だけが急いている。生活が、かなり苦しいらしい。",
    choices: [
      {
        text: "八十ゴールドを貸す",
        conditions: { stats: { money: { min: 80 } } },
        result: "{子}は何度も礼を言い、「必ず返す」と約束して扉を出た。袋は軽く、胸は少し重い。",
        effects: {
          money: -80,
          addFlags: ["help_child"],
          npc: { child: { trust: 5, intimacy: 4 } },
        },
        log: {
          title: "{子}に金を貸す",
          text: "生活に窮した子へ、八十ゴールドを手渡した。",
        },
      },
      {
        text: "借金の保証人になる",
        result: "{子}は深く頭を下げ、「決して親に迷惑はかけない」と誓った。紙の重さが、掌に残る。",
        effects: {
          addFlags: ["guarantor_for_child"],
          npc: { child: { trust: 5, intimacy: 3 } },
        },
        log: {
          title: "{子}の保証人になる",
          text: "子の借金について、保証人の署名をした。",
        },
      },
      {
        text: "今は何もできないと断る",
        result: "{子}は一度うなずき、礼だけ残して去った。夜の戸が、いつもより大きい音を立てる。",
        effects: {
          health: -2,
          npc: { child: { intimacy: -3, trust: -2 } },
        },
      },
    ],
  },
  {
    id: "common_prime_011",
    tags: ["prime", "elder", "family", "money"],
    weight: 10,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 60,
      npcs: ["child"],
      flags: ["help_child"],
      notFlags: ["slave"],
    },
    text: "{子}が再び訪ねてきた。以前借りた金を、今日こそ返しに来たのだという。",
    choices: [
      {
        text: "受け取る",
        result: "約束を守った{子}の顔を見て、立派に育ったことを静かに喜んだ。",
        effects: {
          money: 80,
          removeFlags: ["help_child"],
          npc: { child: { trust: 6, intimacy: 4 } },
        },
        log: {
          title: "{子}から借金を返される",
          text: "子が、借りた金をきちんと返してきた。",
        },
      },
      {
        text: "返さなくていいと言う",
        result: "{子}が元気ならそれでいい。代わりに、今夜の食卓へ引きずり込んだ。",
        effects: {
          health: 3,
          removeFlags: ["help_child"],
          npc: { child: { trust: 4, intimacy: 6 } },
        },
        log: {
          title: "{子}の返済を受け取らない",
          text: "子の返済を断り、元気な姿だけで良しとした。",
        },
      },
    ],
  },
  {
    id: "common_prime_012",
    tags: ["prime", "elder", "family", "money"],
    weight: 11,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 60,
      npcs: ["child"],
      flags: ["guarantor_for_child"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "金貸しが戸を叩いた。{子}と連絡が取れない。保証人の{名前}に、残債を払ってほしいと言う。",
    choices: [
      {
        text: "代わりに返済する",
        conditions: { stats: { money: { min: 80 } } },
        result: "革袋を渡すと、金貸しは勘定を合わせて短く礼を言った。扉の向こうで、長い吐息だけが出る。",
        effects: {
          money: -80,
          removeFlags: ["guarantor_for_child"],
          npc: { child: { trust: -3 } },
        },
        log: {
          title: "{子}の借金を立て替える",
          text: "連絡の途絶えた子の借金を、保証人として払った。",
        },
      },
      {
        text: "払えない／払わないと突っぱねる",
        result: "子が負うべきだと突っぱねた。金貸しは嫌な笑みを残し、「では別の手段で」と去った。噂は、すぐに巷へ落ちる。",
        effects: {
          reputation: -6,
          health: -3,
          removeFlags: ["guarantor_for_child"],
          addFlags: ["broke_guarantor"],
          npc: { child: { trust: -8, intimacy: -5 } },
        },
        log: {
          title: "{子}の保証債務を拒む",
          text: "保証人でありながら、子の借金返済を拒んだ。",
          important: true,
        },
      },
    ],
  },
  {
    id: "common_prime_013",
    tags: ["prime", "elder", "family", "money"],
    weight: 6,
    repeatable: true,
    cooldown: 8,
    logOnce: true,
    conditions: {
      ageMin: 50,
      moneyUnlocked: true,
      npcs: ["spouse"],
      notFlags: ["slave", "solve_scam"],
      stats: { money: { min: 50 } },
    },
    text: "{配偶者}が青い顔で相談してきた。商人に品を勧められ、契約書へ先に印を押してしまったという。いま請求が法外で、断っても執拗に来る、と。",
    choices: [
      {
        text: "契約を読み、まっとうに争う",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "条文の穴を突くと、商人の声が小さくなった。支払いの義務はない——{配偶者}の肩から、やっと力が抜ける。",
          effects: {
            ability: 2,
            reputation: 2,
            addFlags: ["solve_scam"],
            npc: { spouse: { trust: 5, intimacy: 3 } },
          },
          log: {
            title: "{配偶者}の契約トラブルを解く",
            text: "配偶者の不利な契約を読み破り、不当な請求を退けた。",
          },
        },
        failure: {
          result: "条文が絡み合い、結局は半額で手を打つしかなかった。傷は残るが、家は守れた。",
          effects: {
            money: -25,
            addFlags: ["solve_scam"],
            npc: { spouse: { intimacy: 2 } },
          },
        },
      },
      {
        text: "請求どおり支払う",
        result: "{配偶者}は何度も頭を下げる。銀は減る。市場の端で、同じ商人の影がまた動いた気がした——一度払った家は、忘れられにくい。",
        effects: {
          money: -50,
          health: -1,
          npc: { spouse: { intimacy: 1, trust: -1 } },
        },
        log: {
          title: "{配偶者}の請求を肩代わりする",
          text: "配偶者の契約トラブルを支払いですませた。決着には、ならなかった。",
        },
      },
      {
        text: "今は手が回らないと伝える",
        result: "{配偶者}は唇を噛み、書類を抱えて部屋へ戻った。夜の食卓が、ひとつ静かになる。",
        effects: { npc: { spouse: { intimacy: -4, trust: -2 } }, health: -1 },
      },
    ],
  },
  {
    id: "common_prime_014",
    tags: ["prime", "elder", "reflection"],
    weight: 5,
    repeatable: true,
    cooldown: 10,
    logOnce: true,
    conditions: { ageMin: 50, notFlags: ["slave"] },
    text: "広場を散歩していると、吟遊詩人が人だかりの中心で弦を鳴らしていた。",
    choices: [
      {
        text: "立ち止まって聴く",
        result: "戦の煙と、落城の夜を歌う声が生々しい。「まるで見てきたようだ」とこぼすと、詩人は微笑んだ。「体験談だよ」——耳は長く、目は五百の冬を宿していた。",
        effects: { health: 2, ability: 1 },
        log: {
          title: "長寿の吟遊詩人の歌を聴く",
          text: "広場で、五百歳を超えるエルフの戦の歌を聴いた。",
        },
      },
      {
        text: "先を急ぐ",
        result: "弦の音だけが背中を追ってくる。今日は、用の方が勝った。",
      },
    ],
  },

  // ---------- 老衰・先立ち（自然死）----------
  // npcState ではなく loseNpc + trait:false … 既定の「復讐」を避け、厭世を明示付与
  {
    id: "common_prime_friend_death",
    tags: ["prime", "elder", "friend", "death"],
    weight: 4,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 45,
      npcs: ["friend"],
      npcAgeMin: { friend: 55 },
      notFlags: ["slave"],
    },
    text: "{友人}の具合が、ここ数季で明らかに落ちている。手紙の字も、声も、細い。",
    choices: [
      {
        text: "見舞いに通う",
        result: "枕元で昔話をひとつだけした。笑いのあとに訪れた静けさは、もう戻らない種類だった。",
        effects: {
          health: -4,
          loseNpc: { role: "friend", status: "dead", trait: false },
          addTraits: ["worldweary"],
        },
        log: {
          title: "友人の{友人}を看取る",
          text: "長い付き合いの友人が、病の末に世を去った。",
          important: true,
        },
      },
      {
        text: "知らせを待つ",
        result: "ある朝、使いが短い言葉だけを置いていった。間に合わなかった後悔が、部屋の空気より重い。",
        effects: {
          health: -6,
          loseNpc: { role: "friend", status: "dead", trait: false },
          addTraits: ["worldweary"],
        },
        log: {
          title: "友人の{友人}の訃報を受ける",
          text: "友人の死を、後から知らされた。",
          important: true,
        },
      },
    ],
  },
  {
    id: "common_prime_spouse_decline",
    tags: ["prime", "elder", "family", "death"],
    weight: 5,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 50,
      npcs: ["spouse"],
      npcAgeMin: { spouse: 55 },
      notFlags: ["slave"],
      // elder の看取りと二重にならないよう、老い開始前〜中盤向け
      aged: false,
    },
    text: "{配偶者}の歩みが、季節ごとに短くなっている。薬も食事も、効きが浅くなってきた。",
    choices: [
      {
        text: "仕事を減らして寄り添う",
        result: "残された季節は短かった。手の温もりが冷えるまで、言葉より沈黙の方が多かった。",
        effects: {
          health: -5,
          money: -10,
          loseNpc: { role: "spouse", status: "dead", trait: false },
          addTraits: ["worldweary"],
          removeFlags: ["married"],
        },
        log: {
          title: "伴侶の{配偶者}を看取る",
          text: "衰弱していく配偶者の傍らにあり、最期を看取った。",
          important: true,
        },
      },
      {
        text: "できる限りの治療に金を尽くす",
        result: "袋は空になり、命は延びなかった。少なくとも、「何もしなかった」という夜だけは避けられた。",
        effects: {
          money: -40,
          health: -4,
          loseNpc: { role: "spouse", status: "dead", trait: false },
          addTraits: ["worldweary"],
          removeFlags: ["married"],
        },
        log: {
          title: "伴侶の{配偶者}を失う",
          text: "治療に尽くした末、配偶者を亡くした。",
          important: true,
        },
      },
    ],
  },
  // ---------- 子の失踪 → 予想 → 帰還 ----------
  // フラグ:
  //   child_missing … 失踪中
  //   suspect_enslaved / suspect_safe / suspect_incident / suspect_thriving … 予想（排他・一度きり）
  //   child_reunited … 帰還済み
  // 経過年数は common_prime_child_missing の eventHistory を custom で参照
  {
    id: "common_prime_child_missing",
    tags: ["prime", "elder", "family", "loss"],
    weight: 0.8,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 35,
      npcs: ["child"],
      npcAgeMin: { child: 5 },
      notFlags: ["slave", "child_missing", "child_reunited"],
    },
    text: "{子}が、いつもの時間に帰ってこない。近隣を当たっても、足跡は途中で消えている。",
    choices: [
      {
        text: "夜を徹して探す",
        result: "松明は減り、声は嗄れた。夜明けの路地に残ったのは、知らない者の沈黙だけだ。生きている——そう信じないと、足が止まる。",
        effects: {
          health: -6,
          loseNpc: { role: "child", status: "missing", trait: false },
          addTraits: ["worldweary"],
          addFlags: ["child_missing"],
        },
        log: {
          title: "子の{子}が行方不明になる",
          text: "我が子の行方が、途中で途絶えた。",
          important: true,
        },
      },
      {
        text: "役所と神殿に届け出る",
        result: "記録係は淡々と紙に書いた。祈りは上がるが、返事はない。空いた椅子だけが、毎日の食卓に残る。",
        effects: {
          health: -5,
          money: -5,
          loseNpc: { role: "child", status: "missing", trait: false },
          addTraits: ["worldweary"],
          addFlags: ["child_missing"],
        },
        log: {
          title: "子の{子}の行方を届け出る",
          text: "行方不明の子について、役所と神殿に届けた。",
          important: true,
        },
      },
    ],
  },
  {
    id: "common_prime_child_suspect",
    tags: ["prime", "elder", "family", "loss"],
    weight: 8,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      flags: ["child_missing"],
      missingNpcs: ["child"],
      notFlags: [
        "slave",
        "child_reunited",
        "suspect_enslaved",
        "suspect_safe",
        "suspect_incident",
        "suspect_thriving",
      ],
      custom: (s) => {
        const hist = s.eventHistory["common_prime_child_missing"];
        return !!(hist && hist.length && s.age - hist[hist.length - 1] >= 3);
      },
    },
    text: "{子}がいなくなった夜のことを、今でも時々、思い返してしまう。足取りは消えたまま、想像だけが先を歩く。",
    choices: [
      {
        text: "人さらいに遭い、売られたのかもしれない",
        result: "あの頃の街は治安が悪かった。人さらいの噂もあった。売られた——考えたくない筋が、いちばん現実味を帯びる。",
        effects: { addFlags: ["suspect_enslaved"], health: -1 },
        log: {
          title: "失踪の子を想像する（奴隷）",
          text: "行方不明の子は、さらわれて売られたのかもしれない、と思い至った。",
        },
      },
      {
        text: "ひょうひょうと、どこかで無事でいるはずだ",
        result: "あの子には、掴みどころのないところがあった。きっとどこかで飯を食っている。そのうち、何食わぬ顔で扉を叩く——そう信じることにした。",
        effects: { addFlags: ["suspect_safe"], health: 1 },
        log: {
          title: "失踪の子を想像する（無事）",
          text: "行方不明の子は、どこかで無事に過ごしているはずだと思った。",
        },
      },
      {
        text: "見てはならぬものに関わり、追われているのでは",
        result: "予兆などなかった失踪だ。偶然にしてはきれいすぎる。密偵、憲兵、誰かの口封じ——大きな影の匂いがする。",
        effects: { addFlags: ["suspect_incident"], health: -1 },
        log: {
          title: "失踪の子を想像する（事件）",
          text: "行方不明の子は、大きな事件に巻き込まれたのでは、と考えた。",
        },
      },
      {
        text: "旅の先で、思いがけず名を上げているのでは",
        result: "迷子の末に冒険者になり、名を残す——馬鹿な夢想だ。それでも、暗い夜よりは、その馬鹿を選ぶ。",
        effects: { addFlags: ["suspect_thriving"], health: 1 },
        log: {
          title: "失踪の子を想像する（大成）",
          text: "行方不明の子が、外の世界で成功しているのかもと夢想した。",
        },
      },
    ],
  },
  {
    id: "common_prime_child_return_enslaved",
    tags: ["prime", "elder", "family", "loss"],
    weight: 4,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      flags: ["child_missing", "suspect_enslaved"],
      missingNpcs: ["child"],
      notFlags: ["slave", "child_reunited"],
      custom: (s) => {
        const hist = s.eventHistory["common_prime_child_missing"];
        return !!(hist && hist.length && s.age - hist[hist.length - 1] >= 10);
      },
    },
    text: "知らせが入った。行方不明だった{子}が見つかった、と。再会したその顔は痩せこけ、別人のようだった。だが、目だけは確かに{子}だ。",
    choices: [
      {
        text: "言葉より先に、抱きとめる",
        result: "年季が明けてようやく解放された、と{子}はぼそぼそ話した。自由がなかったから、連絡もできなかった、と。帰ってきた命の重さが、想像の正しさより先に胸を潰す。",
        effects: {
          health: 2,
          npcState: { child: "active" },
          npc: { child: { trust: 5, intimacy: 8 } },
          removeFlags: ["child_missing", "suspect_enslaved"],
          addFlags: ["child_reunited", "child_was_enslaved"],
        },
        log: {
          title: "奴隷から解放された{子}と再会する",
          text: "行方不明の子が、人身売買の末に帰ってきた。",
          important: true,
        },
      },
      {
        text: "責めず、まずは食事を出す",
        result: "湯気の立つ皿の前で、{子}の肩が初めて少し落ちた。話は、明日でいい。今夜は、空いていた椅子を埋めるだけで精一杯だ。",
        effects: {
          health: 3,
          money: -5,
          npcState: { child: "active" },
          npc: { child: { intimacy: 10, trust: 3 } },
          removeFlags: ["child_missing", "suspect_enslaved"],
          addFlags: ["child_reunited", "child_was_enslaved"],
        },
        log: {
          title: "解放された{子}を家に迎える",
          text: "人身売買から戻った子に、まず食卓を用意した。",
          important: true,
        },
      },
    ],
  },
  {
    id: "common_prime_child_return_safe",
    tags: ["prime", "elder", "family", "loss"],
    weight: 4,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      flags: ["child_missing", "suspect_safe"],
      missingNpcs: ["child"],
      notFlags: ["slave", "child_reunited"],
      custom: (s) => {
        const hist = s.eventHistory["common_prime_child_missing"];
        return !!(hist && hist.length && s.age - hist[hist.length - 1] >= 10);
      },
    },
    text: "知らせが入った。{子}が見つかった、と。再会した顔には年月がある。それでも、あの頃の間の抜けた目つきだけは、残っていた。",
    choices: [
      {
        text: "無事を、静かに喜ぶ",
        result: "ふと思い立って旅に出たのだという。国内はよかったが、国境の先で戦に巻き込まれ、帰りが年単位で遅れた、と。信じた通りの無事は、空白の長さまで帳消しにはしてくれない。",
        effects: {
          health: 4,
          npcState: { child: "active" },
          npc: { child: { trust: 4, intimacy: 6 } },
          removeFlags: ["child_missing", "suspect_safe"],
          addFlags: ["child_reunited"],
          removeTraits: ["worldweary"],
        },
        log: {
          title: "旅から戻った{子}と再会する",
          text: "行方不明の子が、長い旅の末に無事帰ってきた。",
          important: true,
        },
      },
      {
        text: "なぜ連絡しなかったのかと問う",
        result: "{子}は唇を噛んだ。「恥ずかしくて」「忙しくて」——理由は弱い。それでも帰ってきた事実の方が、今夜は勝っている。",
        effects: {
          health: 2,
          npcState: { child: "active" },
          npc: { child: { trust: -2, intimacy: 4 } },
          removeFlags: ["child_missing", "suspect_safe"],
          addFlags: ["child_reunited"],
        },
        log: {
          title: "無事の{子}を問い質す",
          text: "帰ってきた子に、長い空白の理由を問うた。",
          important: true,
        },
      },
    ],
  },
  {
    id: "common_prime_child_return_incident",
    tags: ["prime", "elder", "family", "loss"],
    weight: 4,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      flags: ["child_missing", "suspect_incident"],
      missingNpcs: ["child"],
      notFlags: ["slave", "child_reunited"],
      custom: (s) => {
        const hist = s.eventHistory["common_prime_child_missing"];
        return !!(hist && hist.length && s.age - hist[hist.length - 1] >= 10);
      },
    },
    text: "知らせが入った。{子}が見つかった、と。再会したその目は、常に出口を探していた。抱きしめても、肩が先に警戒する。",
    choices: [
      {
        text: "詳細は急がず、まず家へ入れる",
        result: "詳しくは言えない、見てはならぬものを見てしまった、追われる身だった——{子}はそこまでしか話さない。家族に火の粉をかけぬよう、身を潜めていたのだという。想像が、嫌な形で正しかった。",
        effects: {
          health: 1,
          reputation: -1,
          npcState: { child: "active" },
          npc: { child: { trust: 6, intimacy: 5 } },
          removeFlags: ["child_missing", "suspect_incident"],
          addFlags: ["child_reunited", "child_saw_too_much"],
        },
        log: {
          title: "追われていた{子}と再会する",
          text: "行方不明の子が、見るべきでないものを見た末に帰ってきた。",
          important: true,
        },
      },
      {
        text: "誰に追われているのか聞く",
        result: "{子}は首を横に振った。「言えば、巻き込まれる」。沈黙の方が、答えより詳しかった。",
        effects: {
          health: -1,
          npcState: { child: "active" },
          npc: { child: { trust: 3, intimacy: 3 } },
          removeFlags: ["child_missing", "suspect_incident"],
          addFlags: ["child_reunited", "child_saw_too_much"],
        },
        log: {
          title: "秘密を抱えた{子}を迎える",
          text: "帰ってきた子は、追手の名を最後まで言わなかった。",
          important: true,
        },
      },
    ],
  },
  {
    id: "common_prime_child_return_thriving",
    tags: ["prime", "elder", "family", "loss"],
    weight: 3,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      flags: ["child_missing", "suspect_thriving"],
      missingNpcs: ["child"],
      notFlags: ["slave", "child_reunited"],
      custom: (s) => {
        const hist = s.eventHistory["common_prime_child_missing"];
        return !!(hist && hist.length && s.age - hist[hist.length - 1] >= 10);
      },
    },
    text: "知らせが入った。{子}が見つかった、と。再会した姿は、記憶より背が高く、立ち居振る舞いにも余裕がある。空白の年月が、想像より多くを足していた。",
    choices: [
      {
        text: "立派になったな、と言う",
        result: "馬車の行き先を間違え、見知らぬ土地へ出たのだという。帰りの路銀を稼ごうと冒険者ギルドへ登録し、思わぬ適性で名を上げた——いまでは、ちょっとした英雄だそうだ。馬鹿な夢想が、図らずも近かった。",
        effects: {
          health: 5,
          reputation: 3,
          npcState: { child: "active" },
          npc: { child: { trust: 5, intimacy: 7 } },
          removeFlags: ["child_missing", "suspect_thriving"],
          addFlags: ["child_reunited", "child_became_hero"],
          removeTraits: ["worldweary"],
        },
        log: {
          title: "名を上げた{子}と再会する",
          text: "行方不明の子が、冒険者として名を成して帰ってきた。",
          important: true,
        },
      },
      {
        text: "なぜ家へ顔を出さなかったのかと笑う",
        result: "{子}は照れて頭を掻いた。「恥ずかしくて」「忙しくて」「英雄ぶるのも嫌で」。理由は弱いが、帰ってきた背中は本物だ。",
        effects: {
          health: 4,
          reputation: 2,
          npcState: { child: "active" },
          npc: { child: { intimacy: 8, trust: 2 } },
          removeFlags: ["child_missing", "suspect_thriving"],
          addFlags: ["child_reunited", "child_became_hero"],
          removeTraits: ["worldweary"],
        },
        log: {
          title: "英雄の{子}を家に迎える",
          text: "外で名を上げた子が、ようやく家の戸を叩いた。",
          important: true,
        },
      },
    ],
  },
]);
