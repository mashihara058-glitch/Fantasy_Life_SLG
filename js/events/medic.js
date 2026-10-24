// 薬師の仕事イベント
// 成功すると medic_* フラグが付き、最期の年表で「どんな薬を残したか／何を選んだか」が振り返れる想定
//
// 日常・依頼:
//   medic_cosmetic / medic_field / medic_pediatric / medic_forage
//   medic_aphrodisiac / medic_truth_harsh / medic_truth_mercy
// 集大成の分岐:
//   medic_resuscitation（死者蘇生薬） / medic_panacea（万能薬） / medic_mundane（どちらも追わない）
// 材料クエスト（予定）:
//   蘇生: medic_resusc_mat1〜3 ／ 万能: medic_panacea_mat1〜3
//   完成: medic_resuscitation_done / medic_panacea_done
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

  // ---------- 集大成の分岐（材料クエストへ続く）----------
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

  // TODO: medic_resuscitation 後の材料イベント（3つ想定）
  // TODO: medic_panacea 後の材料イベント（3つ想定）
  // TODO: 材料が揃ったあとの完成イベント／aged 時の振り返り（cook_farewell 相当）
]);
