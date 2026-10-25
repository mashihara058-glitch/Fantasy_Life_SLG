// 薬師の仕事イベント
// 成功すると medic_* フラグが付き、最期の年表で「どんな薬を残したか／何を選んだか」が振り返れる想定
//
// 日常・依頼:
//   medic_cosmetic / medic_field / medic_pediatric / medic_forage
//   medic_aphrodisiac / medic_truth_harsh / medic_truth_mercy
// 集大成の分岐:
//   medic_resuscitation（死者蘇生薬） / medic_panacea（万能薬） / medic_mundane（どちらも追わない）
// 材料クエスト（蘇生は順番制＝物語が積み上がる。並列にすると抽選次第で理不尽になりやすい）:
//   medic_resusc_mat1（火竜の心臓）→ mat2（風精の鱗粉）→ mat3（金の林檎）
//   → medic_resuscitation_done（完成）／ medic_resusc_king（王の要請を処理済み）
//   万能: medic_panacea_mat1（世界樹）→ mat2（水竜）→ mat3（雷鳥）
//   → medic_panacea_done／ medic_panacea_used（令嬢／令息／先着）
GAME.registerEvents([
  // ---------- 日常の調合 ----------
  {
    id: "medic_001",
    tags: ["young", "prime", "work", "medic"],
    weight: 10,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["medic"], notFlags: ["slave"] },
    text: "貴族の婦人から依頼が来た。メイドたちをねぎらうため、下賜する品を調合してほしい、と。",
    choices: [
      {
        text: "ハンドクリームを調合する",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "水仕事で荒れた手に、すっと馴染むクリームができた。平民の間でも「救世主」と呼ばれ始めた。",
          effects: { money: 12, ability: 1, reputation: 2, addFlags: ["medic_cosmetic"] },
          log: { title: "手当　手荒れのクリーム", text: "水仕事の手を守る薬が、巷で評判になった。" },
        },
        failure: {
          result: "水と脂が分離し、べちゃついた塊で終わった。",
          effects: { ability: -1, reputation: -1 },
        },
      },
      {
        text: "化粧水を調合する",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "肌を整え、化粧のりをよくする水剤ができた。貴族のサロンでも、名が噂される。",
          effects: { money: 18, ability: 1, reputation: 2, addFlags: ["medic_cosmetic"] },
          log: { title: "化粧　サロンの化粧水", text: "貴婦人たちのあいだで、{名前}の調合が話題になった。" },
        },
        failure: {
          result: "多くの者には効いたが、一人のメイドの肌が赤く腫れ、謝罪と弁償に追われた。",
          effects: { money: -8, reputation: -3 },
        },
      },
    ],
  },
  {
    id: "medic_002",
    tags: ["young", "prime", "work", "medic"],
    weight: 10,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["medic"], notFlags: ["slave"] },
    text: "騎士団長からの依頼だ。兵士の訓練を捗らせる常備薬が欲しいらしい。",
    choices: [
      {
        text: "傷を塞ぐポーションを調合する",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "浅い傷ならすぐに塞がる薬液ができた。訓練用だと言いつつ、実戦分の追加発注が来た。",
          effects: { money: 20, ability: 2, reputation: 2, addFlags: ["medic_field"] },
          log: { title: "戦傷　治癒ポーション", text: "騎士団の常備薬として、傷を塞ぐ薬が採用された。" },
        },
        failure: {
          result: "効き目はあるが、味が苛烈すぎて兵士が顔をしかめる。採用は見送りになった。",
          effects: { ability: 1, reputation: -1 },
        },
      },
      {
        text: "筋肉痛向けの軟膏を調合する",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "塗って眠れば翌朝足が軽い、と喜ばれた。訓練の回転が目に見えて上がる。",
          effects: { money: 15, ability: 1, reputation: 2, addFlags: ["medic_field"] },
          log: { title: "鍛錬　疲労の軟膏", text: "筋肉の痛みを抑える軟膏が、兵営で重宝された。" },
        },
        failure: {
          result: "効きは悪くないが、臭いがきつく、連用を嫌がられた。",
          effects: { ability: 1, reputation: -1 },
        },
      },
    ],
  },
  {
    id: "medic_003",
    tags: ["young", "prime", "work", "medic"],
    weight: 10,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["medic"], notFlags: ["slave"] },
    text: "村の子どもたちのあいだで、風邪が流行っている。",
    choices: [
      {
        text: "甘い薬を調合する",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "飲みやすい薬に、親たちは安堵した。小さい子でも、匙を拒まない。",
          effects: { money: 10, ability: 1, reputation: 3, addFlags: ["medic_pediatric"] },
          log: { title: "小児　甘い風邪薬", text: "子どもが嫌がらない薬が、親たちの間で広まった。" },
        },
        failure: {
          result: "効き目より甘さが勝ち、風邪でもない子が欲しがって親が困った。",
          effects: { reputation: -1 },
        },
      },
      {
        text: "苦いが確かな薬を調合する",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "子どもには不評だったが、「飲みたくないなら手を洗いなさい」と、親のしつけにも使われた。",
          effects: { money: 10, ability: 2, reputation: 2, addFlags: ["medic_pediatric"] },
          log: { title: "小児　苦い風邪薬", text: "効きを優先した薬が、家庭の風邪対策になった。" },
        },
        failure: {
          result: "苦すぎてほとんど飲んでもらえず、棚に残った瓶だけが増えた。",
          effects: { ability: 1, reputation: -1 },
        },
      },
    ],
  },
  {
    id: "medic_004",
    tags: ["young", "prime", "work", "medic", "adventure"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["medic"], notFlags: ["slave"] },
    text: "どうしても必要な薬草が、危険な魔物の巣の近くでしか採れない。",
    choices: [
      {
        text: "自分で採取に入る",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "息を殺し、影を縫って薬草を摘んだ。籠は満たされ、心拍だけが騒がしい。",
          effects: { health: -3, ability: 2, reputation: 2, addFlags: ["medic_forage"] },
          log: { title: "採取　魔物の足元の薬草", text: "危険地帯で、自ら必要な草を手に入れた。" },
        },
        failure: {
          result: "草は取れたが、発見されて逃げる途中に傷を負った。",
          effects: { health: -8, ability: 1, addFlags: ["medic_forage"] },
        },
      },
      {
        text: "冒険者に依頼する",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "費用はかさんだが、薬が売れて帳尻は合った。自分の腕より、人を動かす腕も薬師の道具だ。",
          effects: { money: 8, ability: 1, reputation: 1, addFlags: ["medic_forage"] },
        },
        failure: {
          result: "冒険者は帰ってこなかった。前金だけが、静かに消えた。",
          effects: { money: -15 },
        },
      },
      {
        text: "代用品で我慢する",
        result: "効きは落ちるが、誰も傷つかない。棚の瓶は、いつもの色のまま増えた。",
        effects: { ability: 1 },
      },
    ],
  },

  // ---------- 灰色の依頼 ----------
  {
    id: "medic_005",
    tags: ["young", "prime", "work", "medic"],
    weight: 6,
    repeatable: true,
    cooldown: 10,
    maxTimes: 2,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobs: ["medic"],
      notFlags: ["slave", "medic_aphrodisiac"],
    },
    text: "青年貴族が、声を潜めて頼んできた。意中の相手を射止めるための媚薬が欲しい、と。",
    choices: [
      {
        text: "引き受ける",
        check: { chance: 65 },
        success: {
          result: "指定の品を渡すと、報酬は厚かった。相手のその後は、自分の棚には届かない。",
          effects: { money: 35, addFlags: ["medic_aphrodisiac"] },
          log: { title: "禁忌　媚薬を調合する", text: "恋の駆け引きに、薬で手を貸した。" },
        },
        failure: {
          result: "報酬は得たが、後日、とある令嬢の身に不幸があったという噂が風に乗ってきた。",
          effects: { money: 20, health: -4, reputation: -5, addFlags: ["medic_aphrodisiac"] },
          log: { title: "禁忌　媚薬の余波", text: "調合の先で、誰かの人生が歪んだかもしれない。" },
        },
      },
      {
        text: "きっぱり断る",
        result: "青年は唇を噛んで去った。棚の瓶は、いつも通り静かだった。",
        effects: { reputation: 2 },
      },
    ],
  },
  {
    id: "medic_006",
    tags: ["young", "prime", "work", "medic"],
    weight: 6,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobs: ["medic"],
      jobYearsMin: 3,
      notFlags: ["slave", "medic_truth_harsh", "medic_truth_mercy"],
    },
    text: "軍人からの依頼だ。自白剤が要る——うんと効くやつを。拒否は、許されない目つきだった。",
    choices: [
      {
        text: "言われた通りの強いものを調合する",
        check: { chance: 70 },
        success: {
          result: "品は渡り、報酬は積まれた。あとの部屋で何が起きるかは、薬師の領分の外だ。",
          effects: { money: 40, ability: 3, addFlags: ["medic_truth_harsh"] },
          log: { title: "禁忌　強い自白剤", text: "効果を優先した自白剤を、軍へ渡した。" },
        },
        failure: {
          result: "報酬は受け取った。後日、広場の処刑で、骨のように痩せた囚人と目が合った気がした。",
          effects: { money: 40, ability: 3, health: -6, addFlags: ["medic_truth_harsh"] },
          log: { title: "禁忌　強い自白剤", text: "調合の先に、正気を失った瞳があった。" },
        },
      },
      {
        text: "効きを抑え、副作用の少ないものを渡す",
        check: { chance: 40 },
        success: {
          result: "素人には差が分からない仕上がりにした。依頼者は満足げで、こちらの意図には気づかなかった。",
          effects: { money: 35, ability: 2, addFlags: ["medic_truth_mercy"] },
          log: { title: "禁忌　弱い自白剤", text: "命じられた薬を、そっと骨抜きにした。" },
        },
        failure: {
          result: "使い心地を怪しまれ、報酬を削られた。だが、あの部屋の惨さは、少しだけ薄かったはずだ。",
          effects: { money: 12, ability: 1, reputation: -8, addFlags: ["medic_truth_mercy"] },
          log: { title: "禁忌　弱い自白剤", text: "評判は落ちたが、良心の側に寄った。" },
        },
      },
    ],
  },
  {
    id: "medic_008",
    tags: ["young", "prime", "elder", "work", "medic"],
    weight: 5,
    maxTimes: 1,
    logOnce: true,
    conditions: { ageMin: 20, jobs: ["medic"], notFlags: ["slave"] },
    text: "質の悪い感染症が流行した。特効薬の材料は、生きた人間の体からしか採れない。一人分で、おおよそ五人を救える計算だ。",
    choices: [
      {
        text: "志願者の犠牲で特効薬を作る",
        check: { chance: 65 },
        success: {
          result: "何人かが自らを差し出した。多くの命が残り、提供した者は聖人として教会に葬られた。棚の乳鉢が、いつもより重い。",
          effects: { reputation: 6, ability: 4, addFlags: ["medic_sacrifice"] },
          log: { title: "禁忌　人体を材料にした薬", text: "尊い犠牲で、流行を押しとどめた。" },
        },
        failure: {
          result: "材料には死刑囚が充てられた。街は助かった。後味だけが、長く残った。",
          effects: { reputation: 2, ability: 3, health: -3, addFlags: ["medic_sacrifice"] },
          log: { title: "禁忌　死刑囚の体で薬を作る", text: "命を数で測った夜を、忘れられずにいる。" },
        },
      },
      {
        text: "代替材料を探して時間を稼ぐ",
        check: { chance: 35 },
        success: {
          result: "間に合わなかった命もある。それでも、禁忌に手を染めずに、いくつもの熱を下げた。",
          effects: { reputation: 8, ability: 6, health: -6 },
          log: { title: "流行に代替薬で抗う", text: "人体を使わず、遅れて届く救いを選んだ。" },
        },
        failure: {
          result: "探索は遅れた。棺は増えた。それでも、わずかな家だけは持ちこたえた。",
          effects: { reputation: 2, ability: 2, health: -5 },
        },
      },
    ],
  },
  {
    id: "medic_009",
    tags: ["young", "prime", "elder", "work", "medic"],
    weight: 5,
    maxTimes: 2,
    logOnce: true,
    cooldown: 8,
    conditions: { ageMin: 18, jobs: ["medic"], notFlags: ["slave"] },
    text: "施療院からの依頼だ。手の施しようのない患者に、痛みを和らげる薬を——ただし用法を誤れば、健常者すら廃人にしうる代物だ。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { chance: 70 },
        success: {
          result: "長い手紙が届いた。薬のおかげで、最期の日々が少し静かだった、と。字は震えていた。",
          effects: { reputation: 5, ability: 3, money: 12, addFlags: ["medic_palliative"] },
          log: { title: "禁忌　死にゆく者のための薬", text: "先のない痛みを、一時だけ鎮めた。" },
        },
        failure: {
          result: "貧民街で、正気を失った者が見つかった。症状は、あの薬の盗用に一致する。",
          effects: { reputation: -6, money: 12, addFlags: ["medic_palliative"] },
          log: { title: "禁忌　鎮痛薬の流出", text: "安らぎの薬が、街の闇へ漏れた。" },
        },
      },
      {
        text: "危険を避け、弱い薬だけ渡す",
        result: "効きは落ちる。代わりに、悪用の余地も薄い。院長は黙って受け取った。",
        effects: { money: 8, reputation: 2 },
      },
    ],
  },

  // ---------- 集大成の分岐 ----------
  {
    id: "medic_007",
    tags: ["prime", "elder", "work", "medic", "career"],
    weight: 14,
    conditions: {
      ageMin: 30,
      jobs: ["medic"],
      jobYearsMin: 10,
      stats: { ability: { min: 40 } },
      notFlags: ["slave", "medic_resuscitation", "medic_panacea", "medic_mundane"],
    },
    text: "古い文献の余白に、二つの言葉が並んでいた。「死者蘇生薬」。そして「万能薬」。夢のような薬——自分の手でも、届くだろうか。",
    choices: [
      {
        text: "死者蘇生薬を生涯の目標にする",
        result: "死した者を再び息づかせる奇跡。それこそが、自分の集大成だと信じた。必要な材料の名が、すでに頭の中で点り始めている。",
        effects: { addFlags: ["medic_resuscitation"], ability: 2 },
        log: {
          title: "誓い　死者蘇生薬を目指す",
          text: "薬師としての終わりに、蘇生の秘薬を置くと決めた。",
        },
      },
      {
        text: "万能薬を生涯の目標にする",
        result: "あらゆる病を鎮める一瓶。歴史に名を残すなら、こちらだと直感した。材料のリストが、夜の机で長くなっていく。",
        effects: { addFlags: ["medic_panacea"], ability: 2 },
        log: {
          title: "誓い　万能薬を目指す",
          text: "薬師としての終わりに、万病に効く薬を置くと決めた。",
        },
      },
      {
        text: "どちらも追わず、足元の仕事に戻る",
        result: "奇跡より、今日の患者の熱を下げること。文献を閉じ、いつもの乳鉢に手を伸ばした。",
        effects: { addFlags: ["medic_mundane"], reputation: 1, health: 2 },
        log: {
          title: "誓い　奇跡を追わない",
          text: "蘇生も万能も求めず、地に足のついた薬師でいると決めた。",
        },
      },
    ],
  },

  // ---------- 死者蘇生薬：材料（順番制。失敗しても再挑戦可）----------
  {
    id: "medic_resuscitation_01",
    tags: ["prime", "elder", "work", "medic", "adventure"],
    weight: 12,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_resuscitation"],
      notFlags: ["medic_resusc_mat1", "slave"],
    },
    text: "文献の一行目——「火竜の心臓」。火竜の巣まで案内できるのは、現地のドワーフだけだ。",
    choices: [
      {
        text: "火酒を手土産に談判する",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "喉が焼ける酒に、ドワーフたちは目を細めた。案内だけでなく、回収まで肩を貸してくれた。",
          effects: {
            money: -15,
            health: -3,
            reputation: 3,
            ability: 3,
            addFlags: ["medic_resusc_mat1"],
          },
          log: { title: "材料　火竜の心臓", text: "死者蘇生薬の第一の材料を得た。" },
        },
        failure: {
          result: "酒は気に入られた。だが巣の手前で、ブレスの熱に進路を塞がれた。生きて戻れただけが幸いだ。",
          effects: { money: -15, health: -5, ability: 2 },
        },
      },
      {
        text: "珍しい鉱石で心を買う",
        check: { stat: "reputation", difficulty: 48 },
        conditions: { moneyUnlocked: true, stats: { money: { min: 40 } } },
        success: {
          result: "鉱石を見た長老が唸った。対価は高い。代わりに、心臓は壺の中でまだ熱を残している。",
          effects: {
            money: -40,
            reputation: 5,
            ability: 2,
            addFlags: ["medic_resusc_mat1"],
          },
          log: { title: "材料　火竜の心臓", text: "鉱石の取引で、火竜の心臓を手に入れた。" },
        },
        failure: {
          result: "案内は得られた。巣ではブレスがすべてを薙いだ。持ち帰れたのは、煤けた靴だけだ。",
          effects: { money: -40, health: -12, reputation: 2 },
        },
      },
      {
        text: "情熱だけをぶつけて頼み込む",
        check: { chance: 40 },
        success: {
          result: "拙い演説に、若いドワーフが肩を貸した。討伐勢の雇い賃は嵩んだが、心臓は届いた。",
          effects: {
            money: -55,
            reputation: 4,
            addFlags: ["medic_resusc_mat1"],
          },
          log: { title: "材料　火竜の心臓", text: "熱意で仲間を得て、第一の材料を得た。" },
        },
        failure: {
          result: "話は聞いてもらえた。「死にに行くな」——それが、返ってきた言葉のすべてだった。",
          effects: { reputation: 1 },
        },
      },
    ],
  },
  {
    id: "medic_resuscitation_02",
    tags: ["prime", "elder", "work", "medic", "adventure"],
    weight: 12,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_resuscitation", "medic_resusc_mat1"],
      notFlags: ["medic_resusc_mat2", "slave"],
    },
    text: "次は「風精の鱗粉」。深い森で、半透明の風精の気配を拾わねばならない。",
    choices: [
      {
        text: "痕跡を読んで追跡する",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "風向きと光の粒を頼りに巣へ辿り着いた。鱗粉は、掌の上で夜空のように散った。",
          effects: {
            money: -8,
            health: -4,
            reputation: 3,
            ability: 4,
            addFlags: ["medic_resusc_mat2"],
          },
          log: { title: "材料　風精の鱗粉", text: "死者蘇生薬の第二の材料を得た。" },
        },
        failure: {
          result: "手がかりはあった。尽きる前に見つかったのは、空の水筒だけだった。",
          effects: { money: -8, health: -5 },
        },
      },
      {
        text: "護衛を固め、脅威を除く",
        check: { stat: "health", difficulty: 55 },
        success: {
          result: "怪鳥を落とすと、風精が姿を見せた。敵を共有していたらしい。礼として、鱗粉が分けられた。",
          effects: {
            health: -3,
            reputation: 4,
            ability: 3,
            addFlags: ["medic_resusc_mat2"],
          },
          log: { title: "材料　風精の鱗粉", text: "森の脅威を払い、鱗粉を分けてもらった。" },
        },
        failure: {
          result: "スライムと棘に阻まれ、深入りを諦めた。旅費だけが減った。",
          effects: { money: -12, health: -2 },
        },
      },
      {
        text: "泉のろ過で鱗粉だけ集める",
        check: { chance: 42 },
        success: {
          result: "風精そのものは追わない。水浴びの泉に濾し器を仕込み、後日、キラキラした粉だけを回収した。",
          effects: {
            ability: 5,
            reputation: 3,
            addFlags: ["medic_resusc_mat2"],
          },
          log: { title: "材料　風精の鱗粉", text: "知恵で第二の材料を集めた。" },
        },
        failure: {
          result: "思いつきは途中で乾いた。森は、何もくれなかった。",
          effects: { health: -2 },
        },
      },
    ],
  },
  {
    id: "medic_resuscitation_03",
    tags: ["prime", "elder", "work", "medic", "adventure"],
    weight: 12,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_resuscitation", "medic_resusc_mat2"],
      notFlags: ["medic_resusc_mat3", "slave"],
    },
    text: "最後の材料——「金の林檎」。ダンジョン深層で、双頭の魔獣が木を守っている。雇った冒険者の息が、荒い。",
    choices: [
      {
        text: "ポーションで前線を支援する",
        check: { stat: "health", difficulty: 58 },
        success: {
          result: "回復と強化をタイミングよく渡した。魔獣が倒れたあと、黄金の実が籠を満たした。",
          effects: {
            money: -25,
            health: -5,
            reputation: 4,
            ability: 3,
            addFlags: ["medic_resusc_mat3"],
          },
          log: { title: "材料　金の林檎", text: "死者蘇生薬の第三の材料を得た。" },
        },
        failure: {
          result: "支援は届いた。止めは、あと一歩届かなかった。撤退の足音だけが残る。",
          effects: { money: -25, health: -6 },
        },
      },
      {
        text: "眠りの隙に毒餌を仕掛ける",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "特製の毒が四肢を止めた。その間に、身軽な冒険者が実を摘んだ。薬師の戦い方だ。",
          effects: {
            health: -2,
            reputation: 3,
            ability: 5,
            addFlags: ["medic_resusc_mat3"],
          },
          log: { title: "材料　金の林檎", text: "調合の毒で守りを解き、金の林檎を得た。" },
        },
        failure: {
          result: "罠は蹴散らされた。魔獣の咆哮が、廊を震わせる。",
          effects: { money: -20, health: -4 },
        },
      },
      {
        text: "単独で潜伏し、落ちた実だけ拾う",
        check: { chance: 28 },
        success: {
          result: "土と葉に紛れ、落ちている実だけを最低限回収した。心臓が口に出そうだったが、籠は軽い黄金色だ。",
          effects: {
            reputation: 2,
            ability: 4,
            health: -3,
            addFlags: ["medic_resusc_mat3"],
          },
          log: { title: "材料　金の林檎", text: "危険を冒し、落ちた金の林檎を持ち帰った。" },
        },
        failure: {
          result: "見ていないと思っていた耳が、こちらを向いた。バレている——足が、先に逃げる。",
          effects: { health: -4 },
        },
      },
    ],
  },

  // ---------- 完成 ----------
  {
    id: "medic_resuscitation_craft",
    tags: ["prime", "elder", "work", "medic", "career"],
    weight: 16,
    repeatable: true,
    cooldown: 2,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_resuscitation", "medic_resusc_mat1", "medic_resusc_mat2", "medic_resusc_mat3"],
      notFlags: ["medic_resuscitation_done", "slave"],
    },
    text: "三つの材料が、同じ棚に並んだ。あとは火と時間と、失敗しない指先だけだ。生涯の瓶が、空白のラベルを向けている。",
    choices: [
      {
        text: "文献どおり、慎重に仕上げる",
        check: { stat: "ability", difficulty: 62 },
        success: {
          result: "夜明け前、液は薄い金色になった。蓋を閉じた音が、妙に大きかった。これは——死者を欺く匂いがする。",
          effects: {
            ability: 5,
            reputation: 8,
            health: -4,
            addFlags: ["medic_resuscitation_done"],
          },
          log: {
            title: "完成　死者蘇生薬",
            text: "火竜・風精・金の林檎から、蘇生の秘薬を仕上げた。",
          },
        },
        failure: {
          result: "色が濁った。まだ、封印には早い。材料は残っている。指の感覚を、もう一度信じるしかない。",
          effects: { ability: 2, health: -3 },
        },
      },
      {
        text: "自分の勘で配分を変えてみる",
        check: { chance: 45 },
        success: {
          result: "文献から外れた比率が、かえって澄んだ。成功は、偶然にも執念にも見えた。",
          effects: {
            ability: 6,
            reputation: 6,
            health: -5,
            addFlags: ["medic_resuscitation_done"],
          },
          log: {
            title: "完成　死者蘇生薬（独創）",
            text: "処方を改変し、なお蘇生の薬を完成させた。",
          },
        },
        failure: {
          result: "独創は煤になった。材料は無事だ。次は、もっと静かな手で。",
          effects: { ability: 1, health: -2 },
        },
      },
    ],
  },

  // ---------- 完成後：王の要請 ----------
  {
    id: "medic_resuscitation_after",
    tags: ["prime", "elder", "work", "medic"],
    weight: 14,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_resuscitation_done"],
      notFlags: ["medic_resusc_king", "slave"],
    },
    text: "完成の噂は速かった。王の使者が、扉を叩く。求められるは蘇生薬——相手は国境の反乱の首謀者だ。生き返っても死刑はほぼ確定。それでも、死んだままでは真実が眠る、と。",
    choices: [
      {
        text: "薬を渡し、真実のためだと受け入れる",
        result: "使者は瓶を抱き、「忠誠に感謝する。無駄にはしない」と頭を下げた。棚は空だ。歴史の側に、自分の印が残る。",
        effects: {
          reputation: 10,
          ability: -3,
          addFlags: ["medic_resusc_king", "medic_resusc_for_crown"],
        },
        log: {
          title: "蘇生薬を王に渡す",
          text: "反乱の首謀者をよみがえらせるため、秘薬を差し出した。",
        },
      },
      {
        text: "死刑前提の蘇生には使わせないと断る",
        result: "使者の顔が硬くなる。断った理由を、誰も褒めてはくれないかもしれない。瓶は、まだ自分の棚にある。",
        effects: {
          reputation: -4,
          ability: 2,
          addFlags: ["medic_resusc_king", "medic_resusc_refused_crown"],
        },
        log: {
          title: "王の蘇生要請を拒む",
          text: "処刑前提の蘇生を拒み、秘薬を手元に残した。",
        },
      },
      {
        text: "条件付きで一小瓶だけ分ける",
        check: { stat: "reputation", difficulty: 55 },
        success: {
          result: "「証言のあと、速やかに処遇せよ」——文言を付けて渡した。妥協か、責任か。両方の味がする。",
          effects: {
            reputation: 4,
            money: 40,
            addFlags: ["medic_resusc_king", "medic_resusc_for_crown"],
          },
          log: {
            title: "条件付きで蘇生薬を渡す",
            text: "王に一小瓶を託し、使い道に条件を付けた。",
          },
        },
        failure: {
          result: "条件は一蹴された。渡すか、敵か——その二者択一を、翌日に持ち越した。",
          effects: { reputation: -2 },
        },
      },
    ],
  },

  // ---------- 万能薬：材料（順番制）----------
  {
    id: "medic_panacea_01",
    tags: ["prime", "elder", "work", "medic", "adventure"],
    weight: 12,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_panacea"],
      notFlags: ["slave", "medic_panacea_mat1"],
    },
    text: "万能薬の第一の材料——世界樹の葉。深い谷のエルフ集落が、その木を守っている。葉を分かつには、言葉か、対等な契約が要る。",
    choices: [
      {
        text: "万病を癒す夢を語る",
        check: { stat: "reputation", difficulty: 58 },
        success: {
          result: "病床で見てきた顔を思い出しながら話した。長老は長く沈黙し、やがて一枚の葉を差し出した。",
          effects: {
            money: -15,
            health: -3,
            ability: 3,
            reputation: 4,
            addFlags: ["medic_panacea_mat1"],
          },
          log: { title: "材料　世界樹の葉", text: "言葉がエルフの心を動かし、葉を分けてもらった。" },
        },
        failure: {
          result: "訴えても、森は動かなかった。旅費だけが、谷の霧に溶ける。",
          effects: { money: -15, health: -3 },
        },
      },
      {
        text: "ドラゴン討伐を交換条件にする",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "集落を悩ませる竜の話を掴み、葉と引き換えに討伐を請け負った。火傷と煤のあと、約束の葉が渡された。",
          effects: {
            money: -20,
            health: -10,
            ability: 4,
            reputation: 5,
            addFlags: ["medic_panacea_mat1"],
          },
          log: { title: "材料　世界樹の葉", text: "竜を退け、契約どおり世界樹の葉を得た。" },
        },
        failure: {
          result: "交渉の材料を探して歩いたが、相手の急所には届かなかった。",
          effects: { money: -10, ability: 1 },
        },
      },
    ],
  },
  {
    id: "medic_panacea_02",
    tags: ["prime", "elder", "work", "medic", "adventure"],
    weight: 12,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_panacea", "medic_panacea_mat1"],
      notFlags: ["slave", "medic_panacea_mat2"],
    },
    text: "次は水竜の肝。海に削られた洞窟は迷路で、潮の音が方角を偽る。",
    choices: [
      {
        text: "記録を頼りに踏破する",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "壁の傷と潮流をノートに積み、巣へ辿り着いた。費用も時間も削ったが、肝は氷袋の中にある。",
          effects: {
            money: -20,
            health: -5,
            ability: 4,
            reputation: 3,
            addFlags: ["medic_panacea_mat2"],
          },
          log: { title: "材料　水竜の肝", text: "迷路を踏み破り、第二の材料を得た。" },
        },
        failure: {
          result: "同じ広場に何度も出る。物資が尽き、明かりだけが先に折れた。",
          effects: { money: -15, health: -5 },
        },
      },
      {
        text: "餌場で待ち伏せる",
        check: { stat: "health", difficulty: 55 },
        success: {
          result: "生態から餌場を読み、何日も潮を待った。遭遇は短く、容赦なかったが、目的は達した。",
          effects: {
            money: -18,
            health: -8,
            ability: 3,
            reputation: 3,
            addFlags: ["medic_panacea_mat2"],
          },
          log: { title: "材料　水竜の肝", text: "忍耐の待ち伏せで、水竜の肝を得た。" },
        },
        failure: {
          result: "罠は潮に流され、水竜の影は一度も落ちなかった。",
          effects: { money: -30 },
        },
      },
      {
        text: "魔術学院に助言を乞う",
        check: { chance: 38 },
        success: {
          result: "水竜に詳しい講師から、巣の潮汐と弱点の図が届いた。あとの洞窟は、地図のある旅になった。",
          effects: {
            money: -35,
            ability: 3,
            reputation: 2,
            addFlags: ["medic_panacea_mat2"],
          },
          log: { title: "材料　水竜の肝", text: "学院の知を借り、第二の材料へ辿り着いた。" },
        },
        failure: {
          result: "返事は短かった。「水竜には未知が多く、期待には応えられぬ」——切手代だけが残る。",
          effects: { money: -20 },
        },
      },
    ],
  },
  {
    id: "medic_panacea_03",
    tags: ["prime", "elder", "work", "medic", "adventure"],
    weight: 12,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_panacea", "medic_panacea_mat2"],
      notFlags: ["slave", "medic_panacea_mat3"],
    },
    text: "最後は雷鳥の血液。巣は、雲より上の険しい稜線にある。",
    choices: [
      {
        text: "鍛えて自ら登る",
        check: { stat: "health", difficulty: 62 },
        success: {
          result: "鍛え直した足が、崖を許した。雷の残光の中で採血し、下山する頃には手が震えなかった。",
          effects: {
            money: -15,
            health: 4,
            ability: 3,
            reputation: 3,
            addFlags: ["medic_panacea_mat3"],
          },
          log: { title: "材料　雷鳥の血液", text: "肉体を追い込み、第三の材料を得た。" },
        },
        failure: {
          result: "十分だと思って登った。稜線の手前で、膝が先に限界を告げた。",
          effects: { money: -15, health: -4 },
        },
      },
      {
        text: "冒険者ギルドに依頼する",
        check: { stat: "reputation", difficulty: 60 },
        success: {
          result: "募集は静かだったが、待った末に腕利きが挙手した。血の入った瓶が、手数料より重く届く。",
          effects: {
            money: -45,
            ability: 2,
            reputation: 2,
            addFlags: ["medic_panacea_mat3"],
          },
          log: { title: "材料　雷鳥の血液", text: "人を雇い、第三の材料を手に入れた。" },
        },
        failure: {
          result: "掲示は黄ばんだ。誰も、雷の山へは行きたがらなかった。",
          effects: { money: -20 },
        },
      },
    ],
  },

  // ---------- 万能薬：完成 ----------
  {
    id: "medic_panacea_craft",
    tags: ["prime", "elder", "work", "medic", "career"],
    weight: 16,
    repeatable: true,
    cooldown: 2,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_panacea", "medic_panacea_mat1", "medic_panacea_mat2", "medic_panacea_mat3"],
      notFlags: ["slave", "medic_panacea_done"],
    },
    text: "いよいよ材料はそろった。だが薬液は分離したまま混じらない。長年の勘が、「あと一味が足りない」と囁く。",
    choices: [
      {
        text: "マンドラゴラの根を足す",
        check: { chance: 45 },
        success: {
          result: "乾燥させた根の粉で練ると、液は丸薬になった。万能は、意外なほど手のひらに収まる。",
          effects: {
            money: -15,
            health: -4,
            ability: 4,
            reputation: 6,
            addFlags: ["medic_panacea_done"],
          },
          log: { title: "完成　万能薬（丸薬）", text: "マンドラゴラで結び、万能薬を完成させた。" },
        },
        failure: {
          result: "まだ分かれたままだ。材料は残っている。次の匙を信じる。",
          effects: { ability: 2, health: -2 },
        },
      },
      {
        text: "バロメッツの胚乳を足す",
        check: { chance: 45 },
        success: {
          result: "芳醇なクリームのような薬液が、鍋の底で夜明け色に光った。",
          effects: {
            money: -15,
            health: -4,
            ability: 4,
            reputation: 6,
            addFlags: ["medic_panacea_done"],
          },
          log: { title: "完成　万能薬（乳剤）", text: "胚乳で結び、万能薬を完成させた。" },
        },
        failure: {
          result: "濁った汁になった。手ごたえだけが、わずかに残る。",
          effects: { ability: 2, health: -3 },
        },
      },
      {
        text: "ミノタウロスの脂を足す",
        check: { chance: 45 },
        success: {
          result: "水に溶けなかった粉も、熱した脂の中では素直に混ざった。濃厚な一瓶だ。",
          effects: {
            money: -15,
            health: -4,
            ability: 4,
            reputation: 6,
            addFlags: ["medic_panacea_done"],
          },
          log: { title: "完成　万能薬（脂溶）", text: "獣脂で結び、万能薬を完成させた。" },
        },
        failure: {
          result: "鍋が焦げた。処方が間違いだという感触は、まだない。",
          effects: { ability: 1, health: -2 },
        },
      },
    ],
  },

  // ---------- 万能薬：完成後の選択 ----------
  {
    id: "medic_panacea_after",
    tags: ["prime", "elder", "work", "medic"],
    weight: 14,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      jobs: ["medic"],
      flags: ["medic_panacea_done"],
      notFlags: ["slave", "medic_panacea_used"],
    },
    text: "万能薬を求める声が、同じ日に二つ届く。瓶は一人分しかない。一人は皮膚病の侯爵令嬢——死には至らぬが、生涯続く苦痛に苛まれている。もう一人は幼い女伯の令息——余命は短い。女伯は夫を失い、自身も二度と子を宿せぬ体だという。",
    choices: [
      {
        text: "侯爵令嬢を救う",
        result: "執事が涙を拭った。後日、初めて笑う令嬢の肖像が届く。宛名のない礼状だけが、長い。",
        effects: {
          ability: 3,
          reputation: 8,
          money: 80,
          addFlags: ["medic_panacea_used", "medic_panacea_saved_lady"],
        },
        log: {
          title: "万能薬で侯爵令嬢を救う",
          text: "生涯の苦痛から、令嬢を解放した。",
        },
      },
      {
        text: "女伯の令息を救う",
        result: "女伯が膝をついた。後日、市場で、生きた子の手を引く背中を見た。",
        effects: {
          ability: 3,
          reputation: 8,
          money: 60,
          addFlags: ["medic_panacea_used", "medic_panacea_saved_child"],
        },
        log: {
          title: "万能薬で幼い令息を救う",
          text: "残り少ない命を、母の腕に戻した。",
        },
      },
      {
        text: "先に届いた依頼を機械的に選ぶ",
        result: "封筒の届いた順に従った。誰かを選んだ実感より、選ばなかった重さの方が残る。",
        effects: {
          ability: 2,
          reputation: 2,
          addFlags: ["medic_panacea_used", "medic_panacea_saved_first"],
        },
        log: {
          title: "万能薬を先着で使う",
          text: "情より手順を取り、一人だけを救った。",
        },
      },
    ],
  },

  // TODO: aged 時の振り返り（cook_farewell 相当）
]);
