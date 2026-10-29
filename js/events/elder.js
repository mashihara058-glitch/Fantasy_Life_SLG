// 老年期・長寿期
//   aged: true … 寿命の約80%以降（全種族）
//   ageMin: 100 … 長寿種族の「まだ老い前だが年月は長い」層（人間にはほぼ出ない）
// 高齢の恋人探し: common_elder_lover_*（同族は高確率・異族は低確率）
//   late_love … 晩年の恋が実った
//   late_love_cross_species … 異族の恋人（年齢は相手種族の成年帯。以後は仕様として同じ時を歩く）
//   shared_time_blessing … 妖精の泉の祈り（叙述上の祝福。配偶者の死は別途あり得る）

/**
 * 長寿帯の出会い。同族なら付きやすく、異族は断られやすい。
 * partnerAdultAge: 異族成功時のみ使う、相手種族の成年年齢 [min, max]
 */
function elderRaceLover({ id, species, raceLabel, partnerAdultAge, text, sameOk, sameNo, otherOk, otherNo }) {
  return {
    id: `common_elder_lover_${id}`,
    tags: ["elder", "love"],
    weight: 5,
    weightMods: [{ conditions: { species: [species] }, multiply: 2.2 }],
    repeatable: true,
    cooldown: 10,
    logOnce: true,
    conditions: {
      ageMin: 100,
      noNpcs: ["lover", "spouse"],
      notJobs: ["mistress", "slave"],
      notFlags: ["slave", "mistress"],
    },
    text,
    choices: [
      {
        conditions: { species: [species] },
        text: `同じ${raceLabel}だとわかり、距離を詰める`,
        check: { chance: 72 },
        success: {
          result: sameOk,
          effects: {
            addNpc: { role: "lover", intimacy: 55, trust: 45 },
            health: 4,
            addFlags: ["late_love"],
          },
          log: {
            title: `{恋人}と恋人になる（${raceLabel}）`,
            text: `晩年に、同族の${raceLabel}と交際が始まった。`,
          },
        },
        failure: {
          result: sameNo,
          effects: { health: 1 },
        },
      },
      {
        conditions: { custom: (s) => s.species !== species },
        text: "惹かれるまま、声をかける",
        check: { chance: 28 },
        success: {
          result: otherOk,
          effects: {
            addNpc: {
              role: "lover",
              age: partnerAdultAge,
              intimacy: 50,
              trust: 40,
            },
            health: 3,
            reputation: 1,
            addFlags: ["late_love", "late_love_cross_species"],
          },
          log: {
            title: `{恋人}と恋人になる（異族）`,
            text: `${raceLabel}の相手と、種族の壁を越えて交際が始まった。`,
          },
        },
        failure: {
          result: otherNo,
          effects: { health: -1 },
        },
      },
      {
        text: "見守るだけにする",
        result: "惹かれ方は本物でも、今夜の踏み込みはしない。長い人生は、焦らなくても続いていく。",
        effects: { health: 1 },
      },
    ],
  };
}

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
    conditions: { aged: true, npcs: ["spouse"], notFlags: ["slave"] },
    weight: 7,
    maxTimes: 1,
    logOnce: true,
    text: "{配偶者}が床に伏せ、日に日に弱っていく。長い季節を共にした手が、もう返事を返さない日が近い。",
    choices: [
      {
        text: "最期まで手を握り続ける",
        result: "呼吸が雪のように薄くなり、やがて止まった。部屋に残るのは、共に過ごした年月の匂いだけだ。",
        effects: {
          health: -5,
          loseNpc: { role: "spouse", status: "dead", trait: false },
          addTraits: ["worldweary"],
          removeFlags: ["married"],
        },
        log: {
          title: "伴侶の{配偶者}を看取る",
          text: "長年連れ添った配偶者が、静かに旅立った。",
          important: true,
        },
      },
    ],
  },
  {
    id: "common_elder_friend_death",
    tags: ["elder", "friend", "death"],
    conditions: {
      aged: true,
      npcs: ["friend"],
      npcAgeMin: { friend: 60 },
      notFlags: ["slave"],
    },
    weight: 5,
    maxTimes: 1,
    logOnce: true,
    text: "老いの同じ側にいた{友人}から、短い手紙が届いた。「もう、長くはないと思う」。",
    choices: [
      {
        text: "駆けつけて傍らにいる",
        result: "枕元で、若い頃の失敗をひとつだけ笑い合った。次の言葉は、来なかった。",
        effects: {
          health: -4,
          loseNpc: { role: "friend", status: "dead", trait: false },
          addTraits: ["worldweary"],
        },
        log: {
          title: "旧友の{友人}を看取る",
          text: "長い人生を並走した友人が、先に世を去った。",
          important: true,
        },
      },
      {
        text: "手紙に返事を書く",
        result: "墨が乾く前に、訃報が追い越してきた。届かなかった手紙が、机の上で軽い。",
        effects: {
          health: -5,
          loseNpc: { role: "friend", status: "dead", trait: false },
          addTraits: ["worldweary"],
        },
        log: {
          title: "旧友の{友人}の死を知る",
          text: "返事の届く前に、友人を失った。",
          important: true,
        },
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
  {
    id: "common_elder_006",
    tags: ["prime", "elder", "family"],
    weight: 8,
    repeatable: true,
    cooldown: 6,
    conditions: {
      ageMin: 60,
      npcs: ["sibling"],
      notFlags: ["slave"],
    },
    text: "{兄弟の続柄}の{兄弟}が、手土産を持って訪ねてきた。旅行に行ってきたらしい。",
    choices: [
      {
        text: "旅の思い出を聞く",
        result: "{兄弟}は旅先の景色や珍しい品の話をしてくれた。長い時間でも、血縁の話は意外と短い。",
        effects: { health: 2, npc: { sibling: { trust: 2, intimacy: 3 } } },
      },
      {
        text: "土産だけ受け取り、礼は後で書く",
        result: "忙しさを理由に短く見送った。後日の手紙に、「土産は旨かった」とだけ添える。",
        effects: { health: 1, npc: { sibling: { intimacy: 1 } } },
      },
      {
        text: "都合が悪いと断る",
        result: "{兄弟}は残念そうに肩を落とし、手土産を抱えたまま去った。",
        effects: { npc: { sibling: { trust: -2, intimacy: -2 } } },
      },
    ],
  },
  {
    id: "common_elder_007",
    tags: ["elder", "work"],
    weight: 8,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: {
      ageMin: 60,
      // 引退は flags ではなく job: "retired"
      jobs: ["retired"],
      notFlags: ["slave"],
    },
    text: "昔の仕事仲間が訪ねてきた。若い者に技を教える人が足りないので、{名前}にも手伝ってほしい、と。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "熟練の手つきを見せると、よそよそしかった視線が熱を帯びていく。半日の講義で、銀が少し残る。",
          effects: { money: 12, reputation: 3, health: -2 },
          log: {
            title: "隠居先で後進を教える",
            text: "引退後、かつての職場に招かれ若者へ技を伝えた。",
          },
        },
        failure: {
          result: "知らない老人の話に、若者は乗ってこない。礼金だけ置いて、役割は終わった。",
          effects: { money: 8, health: -1 },
        },
      },
      {
        text: "今は静かに暮らしたいと断る",
        result: "仲間は頷いて帰った。道具の音から遠ざかった生活が、まだ続く。",
        effects: { health: 2 },
      },
    ],
  },
  {
    id: "common_elder_008",
    tags: ["elder", "work", "family"],
    weight: 8,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: {
      ageMin: 60,
      jobs: ["retired"],
      npcs: ["pupil"],
      notFlags: ["slave"],
    },
    text: "{弟子}が訪ねてきた。昔なじみの客が、「どうしても{名前}でないとだめだ」と言い張っているらしい。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "仕事のあと、後継は{弟子}だと客に言い含めた。腕は渡せても、信頼は一日では渡らない。",
          effects: {
            money: 12,
            reputation: 2,
            health: -2,
            npc: { pupil: { trust: 5, intimacy: 4 } },
          },
          log: {
            title: "弟子の客を手伝う",
            text: "引退後、弟子に頼まれて昔の客の仕事を請けた。",
          },
        },
        failure: {
          result: "衰えた体では、昔の精度は出ない。客の目が、静かに失望へ落ちる。",
          effects: { money: 8, health: -3, npc: { pupil: { trust: -1 } } },
        },
      },
      {
        text: "{弟子}に任せよと突き返す",
        result: "{弟子}は唇を噛み、やがて「わかりました」と頭を下げた。成長の機会か、見捨てか——今夜は判別できない。",
        effects: { npc: { pupil: { trust: 2, intimacy: -1 } }, health: 1 },
      },
    ],
  },

  // ---------- 行きつけの食堂（壮年で出会い → 代替わり → 再現依頼 → 休業）----------
  // フラグ favorite_eatery … 行きつけ登録。廃業や見限りで外す
  {
    id: "common_elder_011",
    tags: ["young", "prime", "food"],
    weight: 7,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 30,
      ageMax: 45,
      notFlags: ["slave", "favorite_eatery"],
    },
    text: "食事を探して街をうろつくうち、見慣れない料理店の暖簾が目に入った。何となく、足が向く。",
    choices: [
      {
        text: "ダンプリングのシチューを頼む",
        check: { chance: 55 },
        success: {
          result: "スープを吸った小麦団子が絶品だ。野菜の歯ごたえとの対比に、また来ようと思う。",
          effects: { health: 3, addFlags: ["favorite_eatery"] },
          log: {
            title: "行きつけの食堂を見つける",
            text: "ダンプリングのシチューが気に入り、通い始める店ができた。",
          },
        },
        failure: {
          result: "仕込みから時間が経ったらしく、団子はふやけていた。味は悪くない。別の時間に、また来てみよう。",
          effects: { health: 1 },
        },
      },
      {
        text: "川魚のソテーを頼む",
        check: { chance: 55 },
        success: {
          result: "脂ののった魚を香草で焼いた一皿に、残った汁までパンで拭う。腹も、足も、満足した。",
          effects: { health: 3, addFlags: ["favorite_eatery"] },
          log: {
            title: "行きつけの食堂を見つける",
            text: "川魚のソテーが気に入り、通い始める店ができた。",
          },
        },
        failure: {
          result: "不漁らしく魚は痩せていた。付け合わせだけが素晴らしい。またの機会を残す。",
          effects: { health: 1 },
        },
      },
      {
        text: "今日はやめておく",
        result: "暖簾は記憶の端に残る。今日の腹は、別の店で満たす。",
      },
    ],
  },
  {
    id: "common_elder_009",
    tags: ["prime", "elder", "food"],
    weight: 7,
    repeatable: true,
    cooldown: 8,
    logOnce: true,
    conditions: {
      ageMin: 50,
      flags: ["favorite_eatery"],
      notFlags: ["slave"],
    },
    text: "行きつけの店に入ると、店主が代わっていた。厨房では、先代の息子が包丁を振っている。",
    choices: [
      {
        text: "いつものメニューを頼む",
        check: { chance: 55 },
        success: {
          result: "味の骨は同じで、香りだけが少し若い。これはこれで、悪くない世代交代だ。",
          effects: { health: 2 },
        },
        failure: {
          result: "「いつもの、ですか？」と聞き返される。品名を言い直す。旨いが、少し寂しい。",
          effects: { health: 1 },
        },
      },
      {
        text: "新しいメニューを頼む",
        check: { chance: 55 },
        success: {
          result: "今の店主の得意料理だ。先代とは違うが、新鮮で意外と腹に残る。",
          effects: { health: 2 },
        },
        failure: {
          result: "品名から想像した味と違った。旨いのに、先代の皿が恋しい。",
          effects: { health: 1 },
        },
      },
    ],
  },
  {
    id: "common_elder_010",
    tags: ["elder", "food"],
    weight: 7,
    repeatable: true,
    cooldown: 10,
    logOnce: true,
    maxTimes: 2,
    conditions: {
      ageMin: 80,
      flags: ["favorite_eatery"],
      notFlags: ["slave"],
    },
    text: "行きつけの店で、店主が話しかけてきた。先々代の看板を再現したい。当時から通う自分に、味の記憶はないか、と。",
    choices: [
      {
        text: "思い出しながら答える",
        check: { chance: 50 },
        success: {
          result: "具と香りの輪郭を、言葉にして渡す。店主は礼に一品をサービスしてくれた。",
          effects: { health: 3, reputation: 1 },
          log: {
            title: "行きつけの味を伝える",
            text: "長年通った食堂で、昔の看板メニューの記憶を店主に話した。",
          },
        },
        failure: {
          result: "舌は覚えているのに、言葉にならない。試作品は「うまいが、これじゃない」としか言えなかった。",
          effects: { health: 1 },
        },
      },
      {
        text: "記憶は自分の内にしまっておく",
        result: "答えないまま食事を終え、静かに帰った。味は、共有しなくても残る。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "common_elder_012",
    tags: ["elder", "food"],
    weight: 6,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 85,
      flags: ["favorite_eatery"],
      notFlags: ["slave"],
    },
    text: "行きつけの店へ行くと、戸が閉まっていた。休業の札だけが、風に小さく揺れる。",
    choices: [
      {
        text: "日を改めて、また来てみる",
        check: { chance: 50 },
        success: {
          result: "次に訪れると店は開いていた。休んだ理由を聞くと、その日、店主に子供が生まれたのだという。",
          effects: { health: 3 },
          log: {
            title: "行きつけの店の休業明け",
            text: "行きつけの食堂が、店主の出産で一時休業していた。",
          },
        },
        failure: {
          result: "次に来たとき、店は空だった。廃業らしく、売り物件の看板が下がっている。暖簾の記憶だけが残る。",
          effects: { health: -1, removeFlags: ["favorite_eatery"] },
          log: {
            title: "行きつけの店が廃業する",
            text: "長年通った食堂が、いつの間にか廃業していた。",
            important: true,
          },
        },
      },
      {
        text: "別の店を探しはじめる",
        result: "新しい暖簾の下で飯を食う。悪くはない。それでも、舌のどこかが旧い店を探している。",
        effects: { health: 1, removeFlags: ["favorite_eatery"] },
        log: {
          title: "行きつけを離れる",
          text: "休業中の行きつけを見限り、別の店へ通い始めた。",
        },
      },
    ],
  },
  {
    id: "common_elder_career_change",
    tags: ["prime", "elder", "work", "career"],
    weight: 8,
    repeatable: true,
    cooldown: 12,
    logOnce: true,
    maxTimes: 3,
    conditions: {
      jobYearsMin: 40,
      hasJob: true,
      notJobs: ["slave", "retired"],
      notFlags: ["slave"],
    },
    text: "今の仕事に就いて、もう長い。おおよその目標は達した気がする夜がある。今からでも、別の世界の入口を覗いてみるか。",
    choices: [
      {
        conditions: { notJobs: ["farmer"] },
        text: "土地を借り、農業を始めてみる",
        result: "畝の匂いと、天気の話。派手さはないが、季節が仕事を教えてくれる。",
        effects: { job: "farmer", health: 2 },
        log: {
          title: "農夫に転職する",
          text: "長年の職を離れ、土に生きる道へ移った。",
        },
      },
      {
        conditions: { notJobs: ["adventurer"] },
        text: "冒険者ギルドの門を叩く",
        result: "若い者に交じり、錆びた刃を研ぎ直す。遅すぎる挑戦も、挑戦ではある。",
        effects: { job: "adventurer", ability: 1, health: -2 },
        log: {
          title: "冒険者に転職する",
          text: "長年の職を離れ、冒険者として名を登録した。",
        },
      },
      {
        conditions: { notJobs: ["gambler"] },
        text: "一攫千金を夢見て賭場へ入る",
        result: "最後の花を、賽の目に託す。鼓動だけが、若い頃より正直だ。",
        effects: { job: "gambler", money: -10 },
        log: {
          title: "博打師に転職する",
          text: "長年の職を離れ、博打の世界に身を投じた。",
        },
      },
      {
        conditions: { notJobs: ["cook"] },
        text: "包丁を握り、厨房に立つ",
        result: "自分の舌が信じる味を、他人の皿へ載せる。遅咲きの伝道も、悪くない。",
        effects: { job: "cook", ability: 1 },
        log: {
          title: "料理人に転職する",
          text: "長年の職を離れ、料理人として厨房に入った。",
        },
      },
      {
        text: "今のままでよい",
        result: "扉は開けずに閉じた。慣れた仕事着の匂いが、今夜は少し優しい。",
        effects: { health: 2 },
      },
    ],
  },

  // ---------- 高齢・長寿帯の恋人（種族の相性）----------
  // partnerAdultAge は異族成功時のみ（寿命レンジに対する「成年〜働き盛り」の目安）
  elderRaceLover({
    id: "elf",
    species: "elf",
    raceLabel: "エルフ",
    partnerAdultAge: [80, 160],
    text: "夜会の端に、長い時をまとった美しさの人が立っている。耳の形も、間の取り方も、森の側の者だ。",
    sameOk: "同じ暦を生きてきた者同士だとわかると、話が百年単位で噛み合う。名は{恋人}。遅すぎる春ではなかった。",
    sameNo: "同族でも、心の扉は別だ。「悪いが、今は一人でいたい」。優雅な拒絶が、胸に残る。",
    otherOk: "短い命の側の熱に、相手は驚いたあと微笑んだ。名は{恋人}。異族の恋は、噂より先に始まる。",
    otherNo: "「悪いが、エルフにはエルフの時がある」。拒み方は丁寧で、だからこそ刺さる。",
  }),
  elderRaceLover({
    id: "dwarf",
    species: "dwarf",
    raceLabel: "ドワーフ",
    partnerAdultAge: [40, 90],
    text: "鍛冶の煙る酒場で、髭も腕も確かな客が杯を置いた。岩のような沈黙の奥に、妙な魅力がある。",
    sameOk: "鉱脈の話と、古い酒の話が続く。名は{恋人}。同じ山の匂いを知る者同士、距離は早かった。",
    sameNo: "同族でも気は合わぬことがある。「仕事の話なら聞く。それ以上はいらん」。杯だけが残る。",
    otherOk: "「長い耳や薄っぺらい腕は好みじゃないが……お前は別だ」。名は{恋人}。珍しい通行证をもらった気がする。",
    otherNo: "「種族が違う。山の話が通じん」。短く、だが決定的だった。",
  }),
  elderRaceLover({
    id: "beastfolk",
    species: "beastfolk",
    raceLabel: "獣人",
    partnerAdultAge: [20, 38],
    text: "市場の陰で、耳と尾の動きが先に感情を語る人がいる。視線が合った瞬間、野の匂いがした。",
    sameOk: "狩りと旅と、空腹の冗談が通じる。名は{恋人}。群れの外でも、隣にいられる気がした。",
    sameNo: "同族の礼儀で距離を取られた。「今夜は狩り仲間で十分だ」。尾だけが、少し迷っていた。",
    otherOk: "「毛皮のない相手は珍しいが、嫌じゃない」。名は{恋人}。異質さが、かえって熱になった。",
    otherNo: "鼻を鳴らし、首を横に振る。「匂いが、群れのものじゃない」。それ以上の説明はなかった。",
  }),
  elderRaceLover({
    id: "lizardfolk",
    species: "lizardfolk",
    raceLabel: "竜人",
    partnerAdultAge: [25, 55],
    text: "灯の遠い席に、鱗の光る客がいる。低い声と冷たい指先。熱を知っている者の落ち着きだ。",
    sameOk: "砂漠と寒季の話が、鱗の下で通じる。名は{恋人}。同じ冷えを分け合える相手だった。",
    sameNo: "同族でも、巣は別だ。「関わりは商売までにしろ」。尾が、短く床を叩く。",
    otherOk: "「温かい血の者とは稀だが……お前は例外にする」。名は{恋人}。冷たい掌が、意外なほど丁寧だった。",
    otherNo: "「熱が違う。竜人の夜には、向かん」。拒絶は、体温の話のようでもあった。",
  }),
  elderRaceLover({
    id: "human",
    species: "human",
    raceLabel: "人間",
    partnerAdultAge: [25, 48],
    text: "街の広場で、ごく普通の——だからこそ目を奪う人が、季節の話をしていた。短い命の鮮やかさがある。",
    sameOk: "同じ速さを生きる者同士、無駄が少ない。名は{恋人}。残り少ない季節を、分け合う約束になった。",
    sameNo: "人間同士でも、終わり方は選ぶ。「もう新しい火は焚かない」。穏やかで、痛い。",
    otherOk: "長い命の側の目を、相手は恐れず見返した。名は{恋人}。「短くても濃い方がいい」——その言葉が残る。",
    otherNo: "「寿命の話になると、怖くなる」。正直な断りに、反論の余地はなかった。",
  }),

  // 異族の恋のあと——時を揃える祈り（叙述上の祝福。看取り・死イベントは別途起きうる）
  {
    id: "common_elder_shared_time",
    tags: ["elder", "love", "magic"],
    weight: 7,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      flags: ["late_love_cross_species"],
      npcs: ["lover"],
      noNpcs: ["spouse"],
      notFlags: ["slave", "shared_time_blessing"],
      custom: (s) => {
        const hist = Object.keys(s.eventHistory || {}).some((id) => id.startsWith("common_elder_lover_"));
        if (!hist) return false;
        // 交際から少し間を空ける
        const ages = Object.entries(s.eventHistory)
          .filter(([id]) => id.startsWith("common_elder_lover_"))
          .flatMap(([, arr]) => arr || []);
        if (!ages.length) return false;
        return s.age - Math.max(...ages) >= 2;
      },
    },
    text: "異族の恋人と並ぶ夜、ふと時の差が怖くなる。噂では、森奥の妖精の泉に満月の祈りを捧げる者があるという——同じ時を歩めるようになる、かもしれない、と。",
    choices: [
      {
        text: "満月の夜、泉へ行き祈る",
        result: "水面が銀に揺れ、短い光が二人の影を一度だけ重ねた。効いたのかどうかは、誰にも証明できない。ただ翌朝、{恋人}の笑顔が、妙に同じ季節の風を含んで見えた——気のせいかもしれない。",
        effects: {
          health: 2,
          ability: 1,
          addFlags: ["shared_time_blessing"],
          npc: { lover: { intimacy: 8, trust: 5 } },
        },
        log: {
          title: "妖精の泉に時を祈る",
          text: "異族の恋人と同じ時を歩めるよう、満月の泉に祈った。叶ったかどうかは、わからない。",
          important: true,
        },
      },
      {
        text: "{恋人}と一緒に祈る",
        result: "二人分の願が、冷たい水に落ちる。帰路、{恋人}が「もし同じ速さで歳をとれるなら、それでいい」と笑った。同じ速さ——その言葉の重さだけが確かな気がした。",
        effects: {
          health: 3,
          addFlags: ["shared_time_blessing"],
          npc: { lover: { intimacy: 12, trust: 6 } },
        },
        log: {
          title: "{恋人}と妖精の泉に祈る",
          text: "恋人と並んで泉に祈り、同じ時を願った。",
          important: true,
        },
      },
      {
        text: "噂は噂のままにする",
        result: "魔法に頼らず、残された季節を歩くと決めた。怖いのは時差だけではない。失うこと自体だ。",
        effects: { health: -1, npc: { lover: { intimacy: 3 } } },
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
    text: "若い職人の仕事場で、つい口が滑る。「最近の者は道具を大切にせん。昔は一本の槌を何十年も磨いたものだ」。{名前}が持ってきた槌を見て、若人たちは言葉を失う。",
    choices: [
      {
        text: "自慢げに槌を見せる",
        result: "木柄の摩耗も頭の型も、今では博物館行きの古い規格だ。若者は「祖父の祖父の」と胸を張っている。自分が古いのではなく、槌が遺跡だった。",
        effects: { ability: 1, reputation: 1 },
        log: {
          title: "博物館級の槌を見せられる",
          text: "道具を大切にせよと説教し、展示物まがいの古槌を自慢された。",
        },
      },
      {
        text: "それでも手入れの話だけはする",
        result: "型は古くても、油の差し方は通じる。若者は真剣にメモを取り、「やっぱり長老は違う」と言った。槌の時代錯誤には触れないでくれた。",
        effects: { reputation: 2, ability: 1 },
        log: {
          title: "古槌の手入れを教える",
          text: "時代遅れの槌でも、手入れの心得だけは伝えた。",
        },
      },
      {
        text: "笑ってごまかす",
        result: "「……お前より槌の方が先輩かもな」。工房が和み、茶が出た。説教の威厳だけが、静かに引退する。",
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
  // ---------- 老後の小口収入（生活費を賄いきらない程度の穴埋め）----------
  {
    id: "common_elder_side_income_01",
    tags: ["elder", "money"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: {
      ageMin: 80,
      moneyUnlocked: true,
      notFlags: ["slave"],
      stats: { money: { max: -50 } },
    },
    text: "袋の底が見えている。何か売れるものはないかと古い荷物をあさると、まだ形の残った道具が出てきた。",
    choices: [
      {
        text: "古物商に持ち込む",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "長い年月が、かえって値を付けた。骨董として珍重され、思ったより銀が戻る。借金のすべてには届かないが、今夜の不安は少し薄い。",
          effects: { money: 45, reputation: 1 },
          log: {
            title: "古道具を骨董として売る",
            text: "逼迫した懐を、古い道具の売却でわずかに潤した。",
          },
        },
        failure: {
          result: "「古いが、需要は限られる」。二束三文に近いが、ゼロよりはましだ。",
          effects: { money: 12 },
        },
      },
      {
        text: "まだ手放せないと、しまい直す",
        result: "道具を布に包む。銀にはならないが、記憶の重りとしては正しい気がした。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "common_elder_side_income_02",
    tags: ["elder", "money", "work"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    conditions: {
      ageMin: 70,
      moneyUnlocked: true,
      notFlags: ["slave"],
      notJobs: ["slave"],
      stats: { money: { max: 20 } },
    },
    text: "市場の掲示に、半日で終わる手伝いの札がある。報酬は安い。腰は重い。それでも、今日の粥代にはなる。",
    choices: [
      {
        text: "荷運びを引き受ける",
        check: { stat: "health", difficulty: 40 },
        success: {
          result: "若い衆の間で箱を運ぶ。息は上がるが、日当は確かに掌に残った。",
          effects: { money: 18, health: -3 },
          log: {
            title: "日雇いの荷運びをする",
            text: "老後の足しに、半日の肉体労働をした。",
          },
        },
        failure: {
          result: "途中で腰が鳴り、早退する。心付けだけ置いて、主人は申し訳なさそうだった。",
          effects: { money: 5, health: -5 },
        },
      },
      {
        text: "子供の読み書きを見る",
        check: { stat: "ability", difficulty: 38 },
        success: {
          result: "文字の形を直しているうち、夕方になる。母親が、小さな銀とパンを置いていった。",
          effects: { money: 14, reputation: 1 },
          log: {
            title: "子供に読み書きを教える",
            text: "安価な家庭教師として、半日を過ごした。",
          },
        },
        failure: {
          result: "子供は座ってくれない。謝礼はお茶一杯で、背中だけが疲れた。",
          effects: { health: -1 },
        },
      },
      {
        text: "今日は体を優先する",
        result: "札は他人が剥がしていく。静かな部屋で、今日は支出を減らす側に回る。",
        effects: { health: 2 },
      },
    ],
  },
]);
