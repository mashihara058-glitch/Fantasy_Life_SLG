// 職人／見習い／名工の仕事イベント（たたき台）
//
// 【職人専門】適性イベント成功で付与（いずれか一つ想定）
//   craft_wood / craft_sewing / craft_leather / craft_casting / craft_assembly
//
// 【名工専門】career.js の昇進成功で付与
//   craft_wood     → craft_master_building（建築）
//   craft_sewing   → craft_master_dress（ドレス）
//   craft_leather  → craft_master_arms（武具）
//   craft_casting  → craft_master_arms（武具）
//   craft_assembly → craft_master_arcane（魔道具）
//
// 専門に紐づく受注は flags で絞る。
// 納期修羅場・大量発注など横断ネタは専門フラグなしの汎用枠へ。
// 戦争予兆の大量納品は addFlags: craft_war_orders（専門別 *_02/*_01 と汎用 arrows_bulk）。
GAME.registerEvents([
  // ============================================================
  // 適性：どの作業をするか → 専門フラグ
  // ============================================================
  {
    id: "craftsman_aptitude",
    tags: ["adolescence", "young", "prime", "work", "craftsman"],
    // 専門の入り口。サッと決めて専門別の日常受注を遊ばせるため、重め・易しめ
    weight: 20,
    // 成功で専門フラグが付くまで繰り返せる（失敗で打ち切りにしない）
    repeatable: true,
    cooldown: 2,
    conditions: {
      ageMin: 14,
      jobs: ["apprentice", "craftsman"],
      notFlags: [
        "slave",
        "craft_wood",
        "craft_sewing",
        "craft_leather",
        "craft_casting",
        "craft_assembly",
      ],
    },
    text: "工房の親方が、作業台の前で腕を組んだ。「どれから手を付ける。向き不向きは、やってみりゃわかる」",
    choices: [
      {
        text: "木を削る（木工）",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "鉋の感触が手に馴染む。親方が短く言った。「木工に適性があるようだ」",
          effects: { ability: 2, addFlags: ["craft_wood"] },
          log: { title: "木工の適性を見いだす", text: "削り屑の匂いがする仕事に、手応えを感じた。" },
        },
        failure: {
          result: "木目を読み違え、材を無駄にした。向きは、まだ分からない。",
          effects: { health: -1 },
        },
      },
      {
        text: "布と針を取る（縫製）",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "針がリズムを刻む。親方が頷いた。「縫製に適性があるようだ」",
          effects: { ability: 2, addFlags: ["craft_sewing"] },
          log: { title: "縫製の適性を見いだす", text: "糸と布の仕事に、手応えを感じた。" },
        },
        failure: {
          result: "縫い目が歪み、ほどき直しになった。向きは、まだ分からない。",
          effects: { health: -1 },
        },
      },
      {
        text: "皮を扱う（皮革）",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "油の匂いと、刃の角度。親方が言った。「皮革に適性があるようだ」",
          effects: { ability: 2, addFlags: ["craft_leather"] },
          log: { title: "皮革の適性を見いだす", text: "なめしと革裁ちの仕事に、手応えを感じた。" },
        },
        failure: {
          result: "刃が深すぎて、一枚だめにした。向きは、まだ分からない。",
          effects: { health: -1 },
        },
      },
      {
        text: "火と型に向かう（鋳造）",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "溶けた金属の流れが、目に入る。親方が短く笑った。「鋳造に適性があるようだ」",
          effects: { ability: 2, addFlags: ["craft_casting"] },
          log: { title: "鋳造の適性を見いだす", text: "火と型の仕事に、手応えを感じた。" },
        },
        failure: {
          result: "型が割れ、湯が床へ走った。向きは、まだ分からない。",
          effects: { health: -2 },
        },
      },
      {
        text: "部品を組み合わせる（組立）",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "小さな歯車が噛み合う感触。親方が目を細めた。「組立に適性があるようだ」",
          effects: { ability: 2, addFlags: ["craft_assembly"] },
          log: { title: "組立の適性を見いだす", text: "精密な組み合わせの仕事に、手応えを感じた。" },
        },
        failure: {
          result: "ネジを一本締め違え、一式をばらす羽目になった。向きは、まだ分からない。",
          effects: { health: -1 },
        },
      },
    ],
  },

  // ============================================================
  // 汎用（専門を問わない）
  // ============================================================
  {
    id: "craftsman_deadline",
    tags: ["young", "prime", "elder", "work", "craftsman"],
    weight: 9,
    repeatable: true,
    cooldown: 5,
    conditions: {
      ageMin: 16,
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "納期が明日に迫っている。工房の灯は、もう何夜も消えていない。",
    choices: [
      {
        text: "徹夜で仕上げる",
        check: { stat: "health", difficulty: 52 },
        success: {
          result: "夜明け前に最後の仕上げが終わった。客は文句を言わなかった。体が、先に文句を言う。",
          effects: { money: 18, health: -6, ability: 1, reputation: 2 },
        },
        failure: {
          result: "手が震え、ミスが増えた。納品は間に合ったが、仕上がりは妥協の塊だ。",
          effects: { money: 8, health: -8, reputation: -2 },
        },
      },
      {
        text: "弟子や仲間に声をかけて分担する",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "人手が集まり、夜明けまでに山が崩れた。礼として銀を少し分けた。",
          effects: { money: 10, reputation: 3, health: -2 },
        },
        failure: {
          result: "誰も手が空いていない。結局ひとりで抱え、納期に遅れた。",
          effects: { money: -5, reputation: -3, health: -3 },
        },
      },
      {
        text: "納期延期を交渉する",
        check: { chance: 40 },
        success: {
          result: "客は舌打ちしたが、三日の猶予をくれた。その三日が、命綱になる。",
          effects: { reputation: -1, ability: 1 },
        },
        failure: {
          result: "「約束は約束だ」。交渉は決裂し、違約金を取られた。",
          effects: { money: -20, reputation: -4 },
        },
      },
    ],
  },
  {
    id: "craftsman_arrows_bulk",
    tags: ["young", "prime", "elder", "work", "craftsman"],
    weight: 8,
    repeatable: true,
    cooldown: 7,
    maxTimes: 3,
    logOnce: true,
    conditions: {
      ageMin: 16,
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "軍の使いが工房の戸を叩いた。「誰でもいい。少しでも器用なら矢を作れ。大量に要る」——専門も格も問わない、むき出しの急ぎようだ。",
    choices: [
      {
        text: "工房を挙げて矢作りに回す",
        check: { chance: 70 },
        success: {
          result: "矢筒が山になる。銀は積まれた。使いの瞳が、国境の方角を見ている気がした。",
          effects: { money: 35, health: -3, addFlags: ["craft_war_orders"] },
          log: {
            title: "軍の大量矢注文を請け負う",
            text: "専門を問わぬ急ぎの発注に、工房が矢作りへ傾いた。",
          },
        },
        failure: {
          result: "数が足りず、夜を徹しても追いつかない。使いの顔が険しくなる。",
          effects: { money: 12, health: -5, reputation: -2, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "自分の専門の仕事を優先し、断る",
        result: "使いは吐き捨てるように去った。工房には、いつもの注文だけが残る。胸の奥に、小さなざわめきが残った。",
        effects: { reputation: 1, ability: 1 },
      },
      {
        text: "単価を吊り上げて受ける",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "急ぎなら高くつく、と通した。銀は厚い。使いの表情は、さらに短い。",
          effects: { money: 55, reputation: -2, addFlags: ["craft_war_orders"] },
          log: {
            title: "軍の矢注文を高値で受ける",
            text: "大量発注の単価を吊り上げ、工房の懐を潤した。",
          },
        },
        failure: {
          result: "値上げは一蹴され、結局ただの大量納品になった。腕は疲れただけだ。",
          effects: { money: 20, health: -4, addFlags: ["craft_war_orders"] },
        },
      },
    ],
  },
  {
    id: "craftsman_01",
    tags: ["young", "prime", "elder", "work", "craftsman"],
    weight: 8,
    repeatable: true,
    cooldown: 7,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      notFlags: ["slave"],
    },
    text: "つぎはぎの神官が工房の戸を叩いた。「恵まれない孤児のために、なにか分けていただけませんか」",
    choices: [
      {
        text: "まかないを分ける",
        result: "習作の鍋にスープをよそい、神官に渡した。何度も礼を言われて去っていく。",
        effects: { reputation: 2, health: -1 },
      },
      {
        text: "習作や訳あり品を譲る",
        result: "売り物にはならないが、使う分には足りる品を渡した。神官は頭を下げ、荷物を重そうに抱えた。",
        effects: { reputation: 3 },
      },
      {
        text: "端材と中古の道具を譲る",
        result: "修繕や工作に使える程度の材と道具を分けた。「助かります」——背中が、工房の明かりを遠ざける。",
        effects: { reputation: 2, ability: 1 },
      },
      {
        text: "今は余裕がないと断る",
        result: "神官は残念そうに礼をして去った。槌の音だけが残る。",
        effects: { reputation: -1 },
      },
    ],
  },

  // ============================================================
  // 木工 craft_wood
  // ============================================================
  {
    id: "craftsman_wood_cabinet",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_wood"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_wood"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "客が図面を広げた。タンスの注文だ。引き出しの数も、寸法も細かい。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "引き出しが滑らかに開く。客は満足げに銀を置いた。",
          effects: { money: 28, reputation: 1 },
        },
        failure: {
          result: "扉の収まりが悪く、値を叩かれた。",
          effects: { money: 10, ability: 1 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "客は図面を巻いて去った。次の注文票が、机に残る。",
      },
    ],
  },
  {
    id: "craftsman_wood_chair",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_wood"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_wood"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "椅子の注文だ。座面のカーブと脚の安定——小さな品ほど、評判に直結する。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "座面のカーブが体に合う。小さな工房でも、評判は椅子から広まることがある。",
          effects: { money: 18, reputation: 2 },
        },
        failure: {
          result: "脚の一本が短く、ガタが残った。",
          effects: { money: 6 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "客は短く礼をして去った。工房には鉋の音だけが残る。",
      },
    ],
  },
  {
    id: "craftsman_wood_bed",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_wood"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_wood"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "ベッド枠の注文だ。大材を組み、運び出しまで含む重労働の依頼である。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "health", difficulty: 48 },
        success: {
          result: "大材を組み上げた。運び出しも重労働だったが、代金は厚い。",
          effects: { money: 32, health: -3, ability: 1 },
        },
        failure: {
          result: "接合が甘く、補強に追われた。利益は薄い。",
          effects: { money: 12, health: -4 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "客は別の工房を当たると言って去った。肩が、少しだけ軽い。",
      },
    ],
  },
  {
    id: "craftsman_wood_repair",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_wood"],
    weight: 8,
    repeatable: true,
    cooldown: 6,
    conditions: {
      jobs: ["craftsman", "master_craftsman"],
      flags: ["craft_wood"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "雨漏りの家から依頼が来た。屋根の木部を直してほしい、という。",
    choices: [
      {
        text: "梯子をかけて直す",
        check: { stat: "health", difficulty: 50 },
        success: {
          result: "傷んだ垂木を替え、雨仕舞いを直した。家主は何度も礼を言った。",
          effects: { money: 22, health: -2, reputation: 3 },
        },
        failure: {
          result: "足場が危うく、応急だけ済ませて降りた。再訪を約束する。",
          effects: { money: 8, health: -3 },
        },
      },
      {
        text: "大掛かりな修繕を提案する",
        check: { chance: 45 },
        success: {
          result: "予算は膨らんだが、家は持ち直した。長く通う仕事になった。",
          effects: { money: 40, reputation: 2 },
        },
        failure: {
          result: "予算が合わず、話は流れた。図面だけが机に残る。",
          effects: { ability: 1 },
        },
      },
      {
        text: "今は手が回らないと断る",
        result: "家主は残念そうに礼をして去った。雨音が、遠ざかる。",
      },
    ],
  },
  {
    id: "craftsman_wood_02",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_wood"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    maxTimes: 3,
    logOnce: true,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_wood"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "騎士団の使いが来た。「弓をたくさん。名人用でなくていい。不慣れな兵でも扱える、取り回しのいいものを——早く。矢もあると尚いい」急ぎようが、いつもの猟用注文とは違う。",
    choices: [
      {
        text: "残業して要求に応える",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "しなる木を削り、弦を張る。夜明けには束が山になった。使いの目が、国境の方角を見ている。",
          effects: { money: 28, ability: 1, health: -3, addFlags: ["craft_war_orders"] },
          log: {
            title: "騎士団へ弓を大量納品する",
            text: "急ぎの弓矢注文に応え、工房が戦支度の匂いを帯びた。",
          },
        },
        failure: {
          result: "急ぎの手直しがかさみ、思ったほど数を揃えられなかった。それでも荷は出ていく。",
          effects: { money: 12, ability: 1, health: -4, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "同業者と分担して数をそろえる",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "隣の工房にも声をかけ、山を分け合った。街の木材店が、いっせいに空になる。",
          effects: { money: 16, reputation: 3, addFlags: ["craft_war_orders"] },
        },
        failure: {
          result: "同じ依頼が、他の工房にも来ていた。それぞれ自分の分で精一杯だ。",
          effects: { money: 8, reputation: -1, health: -2, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "使いは短く礼をして去った。工房には、いつもの椅子の注文だけが残る。",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    // 板＋革の簡易盾（旧 assembly_01 は craft_wood 指定のまま ID が食い違っていた）
    id: "craftsman_wood_03",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_wood"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    maxTimes: 3,
    logOnce: true,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_wood"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "騎士団の使いが言った。「板に革を張れ。革には鋲を打て。少しでも頑丈にして、兵士を生還させてくれ」——盾の量産だ。丁寧な家具仕事とは、別の呼吸が要る。",
    choices: [
      {
        text: "残業して要求に応える",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "革を張り、鋲を打ち、やすりを当てる。空が白むころ、箱がいっぱいになった。",
          effects: { money: 28, ability: 1, health: -3, addFlags: ["craft_war_orders"] },
          log: {
            title: "騎士団へ簡易盾を大量納品する",
            text: "板と革の盾を急ぎ整え、兵の生還を祈る注文に応えた。",
          },
        },
        failure: {
          result: "鋲の打ち損じが続き、数は足りない。それでも「間に合わせ」は出ていく。",
          effects: { money: 12, ability: 1, health: -4, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "同業者と分担して数をそろえる",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "木工と皮革が手分けした。鋲の音が、通り沿いに響く。",
          effects: { money: 16, reputation: 3, addFlags: ["craft_war_orders"] },
        },
        failure: {
          result: "同じ依頼が、他の工房にも来ていた。板も革も、奪い合いになる。",
          effects: { money: 8, reputation: -1, health: -2, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "使いは「生還させてくれ」の言葉だけ残して去った。槌が、いつもより重い。",
        effects: { reputation: 1 },
      },
    ],
  },
  // ============================================================
  // 縫製 craft_sewing
  // ============================================================
  {
    id: "craftsman_sewing_clothes",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_sewing"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_sewing"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "衣服の仕立て依頼だ。寸法票と、生地の束が机に置かれた。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "寸法どおりの一着が、人の形を得た。客の肩が少し上がる。",
          effects: { money: 24, reputation: 2 },
        },
        failure: {
          result: "袖丈を誤り、仕立て直しになった。",
          effects: { money: 8, health: -1 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "客は生地を抱えて去った。針箱の蓋だけが、小さく鳴る。",
      },
    ],
  },
  {
    id: "craftsman_sewing_lace",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_sewing"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_sewing"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "機織りとレース編みの注文だ。細い模様ほど、手間が銀になる。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "細い模様が布に浮かぶ。手間の分だけ、値がつく。",
          effects: { money: 30, ability: 1 },
        },
        failure: {
          result: "糸が絡まり、半日がほどけた。",
          effects: { money: 5, ability: 1 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "依頼主は残念そうに礼をして去った。",
      },
    ],
  },
  {
    id: "craftsman_sewing_spinning",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_sewing"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_sewing"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "紡糸の下仕事の依頼だ。地味だが、工房の血流になる仕事である。",
    choices: [
      {
        text: "引き受ける",
        result: "地味だが、工房の血流だ。指先が熱を持つ。",
        effects: { money: 10, ability: 1, health: -1 },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "糸玉を別の手に回してもらった。今夜は、指が休む。",
      },
    ],
  },
  {
    id: "craftsman_sewing_01",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_sewing"],
    weight: 9,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_sewing"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "下位貴族の令嬢からの依頼だ。「舞踏会のドレスが必要なの。でも、それほど予算がなくて……」",
    choices: [
      {
        text: "古いドレスをリメイクする",
        check: { stat: "ability", difficulty: 42 },
        success: {
          result: "持参の一着に流行のアレンジを足した。価格を抑えつつ、貴族のメンツは保たれた。",
          effects: { ability: 2, money: 12, reputation: 2 },
        },
        failure: {
          result: "面影が消えず、安物の作り直しに見えてしまった。令嬢は唇を噛んで帰っていく。",
          effects: { money: 5, reputation: -2 },
        },
      },
      {
        text: "安い素材で見栄えよく仕上げる",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "材料費を抑え、形で勝負した。斬新な一着は、夜会で噂になったらしい。",
          effects: { money: 10, reputation: 3 },
        },
        failure: {
          result: "格好だけ整えたが、審美眼には見抜かれたらしい。噂は、あまりよくない。",
          effects: { money: 5, reputation: -1 },
        },
      },
      {
        text: "自分の技量では難しいと断る",
        result: "正直に伝えた。令嬢は肩を落とし、別の工房の名を尋ねて去った。",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "craftsman_sewing_02",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_sewing"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    maxTimes: 3,
    logOnce: true,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_sewing"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "騎士団の使いが布の束を見ながら言った。「外套と背嚢を、とにかくたくさん。出征は間近だ。早ければ早いほど助かる」",
    choices: [
      {
        text: "残業して要求に応える",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "夜を徹して裁ち、縫う。針の音が、遠征の足音に聞こえる。",
          effects: { money: 28, ability: 1, health: -3, addFlags: ["craft_war_orders"] },
          log: {
            title: "騎士団へ外套と背嚢を大量納品する",
            text: "出征間近の急ぎ注文に、縫製の工房が応えた。",
          },
        },
        failure: {
          result: "手直しがかさみ、数は足りない。それでも「近い」荷は出ていく。",
          effects: { money: 12, ability: 1, health: -4, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "同業者と分担して数をそろえる",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "街の縫い手が手分けした。布問屋の棚が、一気に薄くなる。",
          effects: { money: 16, reputation: 3, addFlags: ["craft_war_orders"] },
        },
        failure: {
          result: "同じ依頼が、他の工房にも来ていた。それぞれ自分の山を抱えるしかない。",
          effects: { money: 8, reputation: -1, health: -2, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "使いは短く頷いて去った。「出征」の語だけが、糸屑のように残る。",
        effects: { reputation: 1 },
      },
    ],
  },
  // ============================================================
  // 皮革 craft_leather
  // ============================================================
  {
    id: "craftsman_leather_armor",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_leather"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_leather"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "皮鎧と盾の注文だ。衛兵向け——打撃を受け止める厚みが要る。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "重ねた革が、打撃を受け止める厚みになる。衛兵向けの値だ。",
          effects: { money: 34, reputation: 1 },
        },
        failure: {
          result: "縫いが浅く、補強に追われた。",
          effects: { money: 12, health: -2 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "使いは別の工房を当たると言って去った。油の匂いだけが残る。",
      },
    ],
  },
  {
    id: "craftsman_leather_goods",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_leather"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_leather"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "鞍や靴、かばんの注文だ。日常の革製品は、口コミで次の客を連れてくる。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "日常の革製品は、口コミで次の客を連れてくる。",
          effects: { money: 20, reputation: 2 },
        },
        failure: {
          result: "型紙を誤り、革が足りなくなった。",
          effects: { money: 6 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "客は型紙を畳んで去った。",
      },
    ],
  },
  {
    id: "craftsman_leather_tanning",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_leather"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_leather"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "皮なめしの工程を頼まれた。臭い仕事だが、良い革はここからしか生まれない。",
    choices: [
      {
        text: "引き受ける",
        result: "臭い仕事だが、良い革はここからしか生まれない。腕の感覚が、少し厚くなる。",
        effects: { ability: 2, health: -2, money: 8 },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "なめし場の仕事は、別の手に回った。今夜は、鼻が楽だ。",
      },
    ],
  },
  {
    id: "craftsman_leather_01",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_leather"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    maxTimes: 3,
    logOnce: true,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_leather"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "騎士団の使いが言った。「防具を、とにかくたくさん。急所を守れる胸当てがいい。できれば小ぶりの丸盾も」——数の求め方が、衛兵の補充注文より粗い。",
    choices: [
      {
        text: "残業して要求に応える",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "夜を徹して革を裁ち、縫う。油の匂いが、戦の支度の匂いと重なる。",
          effects: { money: 28, ability: 1, health: -3, addFlags: ["craft_war_orders"] },
          log: {
            title: "騎士団へ革防具を大量納品する",
            text: "急ぎの胸当てと丸盾の注文に応えた。",
          },
        },
        failure: {
          result: "手直しがかさみ、数は足りない。それでも「間に合わせ」の荷は出ていく。",
          effects: { money: 12, ability: 1, health: -4, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "同業者と分担して数をそろえる",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "革工房が手分けした。なめし場の在庫が、一気に減る。",
          effects: { money: 16, reputation: 3, addFlags: ["craft_war_orders"] },
        },
        failure: {
          result: "同じ依頼が、他の工房にも来ていた。革も人も、足りない。",
          effects: { money: 8, reputation: -1, health: -2, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "使いは舌打ち一つで去った。工房に残るのは、鞍の修理票だけだ。",
        effects: { reputation: 1 },
      },
    ],
  },

  // ============================================================
  // 鋳造 craft_casting（リボルバー部品の芽）
  // ============================================================
  {
    id: "craftsman_casting_weapons",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_casting"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_casting"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "剣や槍の穂先を鋳ってほしい、という注文だ。武具商人の目が、炉の方を見ている。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "刃の芯が、冷えて鳴る。武具商人が目を細めた。",
          effects: { money: 30, reputation: 1 },
        },
        failure: {
          result: "巣ができ、欠けた品になった。溶け直しだ。",
          effects: { money: 8, health: -2 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "商人は舌打ちして去った。炉には、別の型が待っている。",
      },
    ],
  },
  {
    id: "craftsman_casting_goods",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_casting"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_casting"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "鍋や釘など、日用品の量産注文だ。地味だが、安定した銀になる。",
    choices: [
      {
        text: "引き受ける",
        check: { chance: 65 },
        success: {
          result: "地味な品が、安定した銀になる。村の台所が、少し潤う。",
          effects: { money: 16, reputation: 1 },
        },
        failure: {
          result: "型の摩耗で不良が続いた。",
          effects: { money: 4 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "発注は隣の炉へ回った。湯の音が、少し静かになる。",
      },
    ],
  },
  {
    // 後続：組立側 craftsman_assembly_revolver へ
    id: "craftsman_casting_revolver",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_casting"],
    weight: 7,
    repeatable: true,
    cooldown: 6,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_casting"],
      moneyUnlocked: true,
      notFlags: ["slave", "craft_revolver_parts", "craft_revolver_done"],
    },
    text: "見慣れない図面を持った男が来た。銃の部品の型を試してほしい——円筒に穴が並ぶ、妙な形だ。「組立側へ回せ」とだけ言う。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "円筒に穴が並ぶ、奇妙な部品が冷えた。発注主は「組立側へ回せ」とだけ言った。",
          effects: { money: 40, ability: 1, addFlags: ["craft_revolver_parts"] },
          log: {
            title: "銃の鋳造部品を手がける",
            text: "見慣れない回転部品の型を、炉で起こした。",
          },
        },
        failure: {
          result: "精度が出ず、試作品は屑になった。図面だけが机に残る。",
          effects: { ability: 1, health: -1 },
        },
      },
      {
        text: "怪しすぎると断る",
        result: "男は図面を懐に戻し、短く礼をして去った。炉の熱だけが残る。",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "craftsman_casting_01",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_casting"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    maxTimes: 3,
    logOnce: true,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_casting"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "騎士団の使いが炉の前で言った。「武器が足りん。取り回しのいい長さの剣を、なるべくたくさん用意しろ」——数の言い方が、衛士の補充より荒い。",
    choices: [
      {
        text: "残業して要求に応える",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "汗を流し、炉をくべる。冷え固まった刃の山が、夜明けの光を受ける。",
          effects: { money: 28, ability: 1, health: -3, addFlags: ["craft_war_orders"] },
          log: {
            title: "騎士団へ剣を大量納品する",
            text: "急ぎの量産注文に、鋳造の工房が応えた。",
          },
        },
        failure: {
          result: "巣や歪みの手直しがかさみ、数は足りない。それでも荷は出ていく。",
          effects: { money: 12, ability: 1, health: -4, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "同業者と分担して数をそろえる",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "鍛冶と鋳造が手分けした。炭の値段が、その週だけ跳ねた。",
          effects: { money: 16, reputation: 3, addFlags: ["craft_war_orders"] },
        },
        failure: {
          result: "同じ依頼が、他の炉にも来ていた。湯も人も、奪い合いになる。",
          effects: { money: 8, reputation: -1, health: -2, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "使いは短く礼をして去った。炉には、鍋の型だけが残る。",
        effects: { reputation: 1 },
      },
    ],
  },
  // ============================================================
  // 組立 craft_assembly（リボルバー完成・魔道具）
  // ============================================================
  {
    id: "craftsman_assembly_arcane",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_assembly"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_assembly"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "魔道具めいた装置の組立依頼だ。失敗すれば動かない箱が残る——噛み合わせが命だ。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "最後の留め具を締めると、小さな光が走った。依頼主は黙って銀を置いた。",
          effects: { money: 36, reputation: 1 },
        },
        failure: {
          result: "接触が悪く、動かない箱だけが残った。",
          effects: { money: 10, ability: 1 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "使者は封印箱を抱えて去った。机には、いつものねじだけが残る。",
      },
    ],
  },
  {
    id: "craftsman_assembly_tools",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_assembly"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_assembly"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "日常の道具——歯車付きの柄や留め金の組立注文だ。地味だが、確実な仕事になる。",
    choices: [
      {
        text: "引き受ける",
        check: { chance: 70 },
        success: {
          result: "歯車と柄が噛み合う。地味だが、確実な仕事だ。",
          effects: { money: 14, reputation: 1 },
        },
        failure: {
          result: "ネジを一本噛ませ、ばらす羽目になった。",
          effects: { money: 5 },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "注文票は隣の机へ回った。",
      },
    ],
  },
  {
    id: "craftsman_assembly_revolver",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_assembly"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_assembly", "craft_revolver_parts"],
      moneyUnlocked: true,
      notFlags: ["slave", "craft_revolver_done"],
    },
    text: "鋳造部品が箱に入って届いた。円筒を組み、回転式の銃へ仕上げてほしい——依頼主は「噂にはするな」とだけ言った。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "円筒が回り、乾いた金属音がした。完成品を渡すと、男は帽子を深く被った。「噂にはするな」",
          effects: {
            money: 70,
            ability: 3,
            reputation: 2,
            addFlags: ["craft_revolver_done"],
            removeFlags: ["craft_revolver_parts"],
          },
          log: {
            title: "回転式の銃を組み立てる",
            text: "鋳造部品を組み上げ、見慣れない銃を仕上げた。",
          },
        },
        failure: {
          result: "回転が渋く、暴発の危険を見て組み直しになった。部品はまだ残っている。",
          effects: { health: -2, ability: 1 },
        },
      },
      {
        text: "組み上げを拒む",
        result: "箱を封印したまま返した。男の目が一瞬だけ細くなる。部品は、いつか別の手を探すだろう。",
        effects: { reputation: 1 },
      },
    ],
  },

  {
    id: "craftsman_assembly_01",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_assembly"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    maxTimes: 3,
    logOnce: true,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_assembly"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "騎士団の使いが部品箱を指さした。「合図灯と、夜行用の筒を、とにかくたくさん。精巧でなくていい。壊れにくく、数を揃えろ」——仕上がりの求め方が、貴族の玩具注文とは違う。",
    choices: [
      {
        text: "残業して要求に応える",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "留め具を締め、芯を合わせる。夜明けには箱が並び、使いの目が国境の方角を見る。",
          effects: { money: 28, ability: 1, health: -3, addFlags: ["craft_war_orders"] },
          log: {
            title: "騎士団へ合図灯と夜行筒を大量納品する",
            text: "急ぎの組立注文に応え、工房が戦支度の匂いを帯びた。",
          },
        },
        failure: {
          result: "噛み合わせの手直しが続き、数は足りない。それでも「間に合わせ」は出ていく。",
          effects: { money: 12, ability: 1, health: -4, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "同業者と分担して数をそろえる",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "組立の手が集まった。真鍮とガラスの在庫が、一気に減る。",
          effects: { money: 16, reputation: 3, addFlags: ["craft_war_orders"] },
        },
        failure: {
          result: "同じ依頼が、他の工房にも来ていた。部品も人も、奪い合いになる。",
          effects: { money: 8, reputation: -1, health: -2, addFlags: ["craft_war_orders"] },
        },
      },
      {
        text: "今は手いっぱいだと断る",
        result: "使いは短く礼をして去った。机には、時計の歯車だけが残る。",
        effects: { reputation: 1 },
      },
    ],
  },

  // ============================================================
  // 名工専門（たたき台）
  // ============================================================
  {
    id: "craftsman_master_building",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    conditions: {
      jobs: ["master_craftsman"],
      flags: ["craft_master_building"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "貴族の執事が図面を携えてきた。別邸の増築——梁と階段の相談だという。",
    choices: [
      {
        text: "自ら現場を監督する",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "継手の指示が通ると、大工たちの手が揃う。完成の日、別邸が光を受けた。",
          effects: { money: 80, reputation: 5, ability: 1 },
          log: { title: "名工として別邸の建築を監督する", text: "建築の名で、大きな現場を任された。" },
        },
        failure: {
          result: "工期が延び、予算が鳴る。名は守ったが、利益は薄い。",
          effects: { money: 25, reputation: -2, health: -3 },
        },
      },
      {
        text: "図面だけ見て助言する",
        result: "半日の助言で銀を得た。現場の埃は、若い者たちのものだ。",
        effects: { money: 35, ability: 1 },
      },
    ],
  },
  {
    id: "craftsman_master_building1",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 8,
    repeatable: true,
    cooldown: 8,
    maxTimes: 2,
    logOnce: true,
    conditions: {
      jobs: ["master_craftsman"],
      flags: ["craft_master_building"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "変わった扉の依頼だ。本棚に引き戸の仕掛けを加えてほしい——隠し通路にしか見えない。図面の余白に、依頼主の名はない。",
    choices: [
      {
        text: "引き受ける",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "棚の裏が、音もなく開く。依頼主は満足げに頷き、「他言無用」とだけ言って銀を置いた。",
          effects: { money: 45, reputation: 1, health: -2 },
          log: {
            title: "隠し扉付きの本棚を仕上げる",
            text: "名を伏せた客のため、通路へ続く仕掛けを仕込んだ。",
          },
        },
        failure: {
          result: "「まだ露骨だ」と、何度も手直しを要求された。銀は出たが、腕の疲れの方が大きい。",
          effects: { money: 18, health: -4 },
        },
      },
      {
        text: "用途を問いただす",
        check: { chance: 45 },
        success: {
          result: "「蔵書の保全だ」——それ以上は言わない。だが問い自体は嫌われなかった。条件を少しだけ足して請けた。",
          effects: { money: 40, ability: 1, ability: 1 },
        },
        failure: {
          result: "質問した瞬間、話は流れた。別の名工の噂が、翌週には耳に入る。",
          effects: { reputation: -1 },
        },
      },
      {
        text: "怪しすぎると断る",
        result: "使者は短く礼をして去った。図面の影が、机にしばらく残る。",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "craftsman_master_building2",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 7,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 40,
      jobs: ["master_craftsman"],
      jobYearsMin: 8,
      flags: ["craft_master_building"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "またとない大きな案件だ。貴族の館の新築——報酬は破格。だが図面には、表に出せない通路と室がいくつも描かれている。完成を知る職人の口は、資産にも負債にもなる。",
    choices: [
      {
        text: "引き受ける（秘密を抱えたまま仕上げる）",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "館は建った。仕掛けは影のまま眠る。依頼主は厚く礼をし、「君の名は、表の石には刻まない」と笑った。銀は重い。胸の奥も、重い。",
          effects: { money: 120, reputation: 3, health: -4, addFlags: ["craft_secret_manor"] },
          log: {
            title: "秘密の仕掛けを含む貴族の館を建てる",
            text: "表に出せない通路ごと、館を仕上げた。名は石に残らない。",
          },
        },
        failure: {
          result: "仕事そのものは届いた。だが現場の噂が、一つだけ外へ漏れた。依頼主は静かに言った。「人の口に戸は立てられぬ。だから、こうする」——職人たちに支払われたのは、金貨ではなく刃だった。",
          effects: { death: "口封じ" },
          log: { title: "貴族の館の口封じに遭う", text: "秘密を知りすぎた報酬は、冷たい刃だった。" },
        },
      },
      {
        text: "仕掛けの図面だけ断り、表の建築のみ請ける",
        check: { chance: 50 },
        success: {
          result: "「表だけなら」と通した。報酬は半減したが、夜は眠れる。別の手が、影の通路を継いだらしい。",
          effects: { money: 55, reputation: 2 },
        },
        failure: {
          result: "半請けは侮辱だと受け取られた。案件そのものが消えた。",
          effects: { reputation: -3 },
        },
      },
      {
        text: "関わるまいと断る",
        result: "破格の銀を見送った。数年後、その館の灯だけが、丘の上で不自然に多いと噂になった。",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "craftsman_master_dress",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    conditions: {
      jobs: ["master_craftsman"],
      flags: ["craft_master_dress"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "社交界の夜会が近い。某家から、視線を盗む一着の注文が届いた。",
    choices: [
      {
        text: "夜会用のドレスを仕立てる",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "裾が床を滑る音が、工房の試着室に響く。後日、噂だけが先に帰ってきた。",
          effects: { money: 75, reputation: 6 },
          log: { title: "名工として夜会のドレスを仕立てる", text: "ドレスの名で、社交界の一着を担った。" },
        },
        failure: {
          result: "色の選定を誤り、作り直しになった。夜会には間に合ったが、利益は飛んだ。",
          effects: { money: 20, reputation: -1, health: -2 },
        },
      },
      {
        text: "下絵と見本布だけ納める",
        result: "構想料として十分な銀だ。針は、弟子に委ねる。",
        effects: { money: 30, reputation: 2 },
      },
    ],
  },
  {
    id: "craftsman_master_arms",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    conditions: {
      jobs: ["master_craftsman"],
      flags: ["craft_master_arms"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "騎士団の使いが来た。隊長用の武具——見せるための輝きと、耐えるための芯の両方が要るという。",
    choices: [
      {
        text: "一式を名工の印で仕上げる",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "革と金属が、同じ呼吸で組み上がる。使いが短く礼をした。「これなら、前線でも」",
          effects: { money: 90, reputation: 5 },
          log: { title: "名工として騎士の武具を仕上げる", text: "武具の名で、隊長用の一式を納品した。" },
        },
        failure: {
          result: "装飾に気を取られ、留め具が甘い。補強の夜が続いた。",
          effects: { money: 30, health: -4, ability: 1 },
        },
      },
      {
        conditions: { flags: ["craft_revolver_done"] },
        text: "回転式の銃を、武具として磨き直す",
        check: { chance: 55 },
        success: {
          result: "名工の手が加わると、ただの奇抜が「装備」に見える。発注主の目が細くなった。",
          effects: { money: 60, reputation: 3 },
        },
        failure: {
          result: "軍の規格に合わず、返品された。時代が、まだ追いついていない。",
          effects: { reputation: -2 },
        },
      },
    ],
  },
  {
    id: "craftsman_master_arms1",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 8,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      jobs: ["master_craftsman"],
      jobYearsMin: 5,
      flags: ["craft_master_arms"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "冒険者ギルドから、ドラゴンの革が一枚持ち込まれた。美しく、軽い。任せられる職人は{名前}しかいない、という。だが同じ革を求める注文が、同時に二つ——騎士団長は「騎士の命を守る盾を」。王子の婚約者である聖女は「ふさわしいバッグと靴、それに愛犬の服を」。革は、一枚しかない。",
    choices: [
      {
        text: "騎士団長の盾にする",
        result: "軽く、硬い緑の盾ができた。出征の列に、その輝きが混ざる。聖女側からの音は、しばらく途絶えた。",
        effects: { money: 35, reputation: 6, addFlags: ["craft_dragon_shield"] },
        log: {
          title: "ドラゴンの革で騎士の盾を作る",
          text: "一枚きりの革を、命を守る盾へ回した。",
        },
      },
      {
        text: "聖女の装身具と犬の服にする",
        result: "バッグも靴も、犬の小袖まで美しい。宮廷では賛辞と「悪趣味」が同時に飛ぶ。騎士団の使いの顔だけが、短かった。",
        effects: { money: 70, reputation: 2, addFlags: ["craft_dragon_vanity"] },
        log: {
          title: "ドラゴンの革で聖女の装身具を作る",
          text: "一枚きりの革を、華やかな注文へ回した。",
        },
      },
      {
        text: "どちらも断り、革をギルドへ返す",
        result: "「一枚で二つの命は救えない」——そう言って返した。銀は得ない。夜は、少し静かだ。",
        effects: { reputation: 3 },
      },
    ],
  },
  {
    id: "craftsman_master_arcane",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    conditions: {
      jobs: ["master_craftsman"],
      flags: ["craft_master_arcane"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "魔術師ギルドから密封の依頼が来た。精密な魔道具——失敗すれば依頼主ごと消える、と書いてある。",
    choices: [
      {
        text: "封印を解いて組み立てる",
        check: { stat: "ability", difficulty: 62 },
        success: {
          result: "最後の噛み合わせで、装置が静かに灯った。報酬は厚い。指先の感覚も、厚い。",
          effects: { money: 100, ability: 1, reputation: 4 },
          log: { title: "名工として魔道具を完成させる", text: "魔道具の名で、危険な一品を仕上げた。" },
        },
        failure: {
          result: "接触不良から火花が走り、半日を修理に溶かした。命は拾った。",
          effects: { money: 20, health: -6, ability: 1 },
        },
      },
      {
        text: "危険すぎると断る",
        result: "使者は礼を失わずに去った。工房に残るのは、いつものねじだけだ。",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "craftsman_master_arcane1",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 8,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      jobs: ["master_craftsman"],
      jobYearsMin: 5,
      flags: ["craft_master_arcane"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "冒険者ギルドから、エルダートレントの枝が持ち込まれた。魔力を通し、増幅する木だ。高位の魔術師にしか扱えない杖の芯になるが、大規模な術には欠かせない。一本きり——どの核で仕上げるか。",
    choices: [
      {
        text: "ドラゴンの牙を組み合わせ、撃滅向きにする",
        result: "牙の脈が、枝の導線に噛み合う。攻撃の術を焼く杖だ。ギルドの使いが、遠くを見て言った。「戦の季節に、間に合う」",
        effects: { reputation: 5, money: 55, ability: 2, addFlags: ["craft_staff_ruin"] },
        log: {
          title: "撃滅の杖を仕上げる",
          text: "エルダートレントにドラゴンの牙を合わせ、攻撃向きの杖とした。",
        },
      },
      {
        text: "カーバンクルの額石を嵌め、精緻向きにする",
        result: "柘榴色の核が、術式のほつれを吸う。緻密な魔法ほど、破綻しにくい杖になった。",
        effects: { money: 55, reputation: 5, addFlags: ["craft_staff_fine"] },
        log: {
          title: "精緻の杖を仕上げる",
          text: "エルダートレントにカーバンクルの額石を合わせた。",
        },
      },
      {
        text: "他材を混ぜず、木だけで純化する",
        result: "単純な導線だけが残る。派手さはない。だが放たれる術は、芯が太い。",
        effects: { reputation: 4, money: 40, ability: 3, ability: 1, addFlags: ["craft_staff_pure"] },
        log: {
          title: "純化の杖を仕上げる",
          text: "エルダートレントの木だけを用い、杖を仕上げた。",
        },
      },
    ],
  },
  {
    // 回転式銃の改良。実銃の歴史では
    // ・銃身延長＝カービン化／命中と初速の話（失敗はバランス・反動・騎兵運用）
    // ・装填改善＝薬室ごとの火薬＋球から、一体の薬莢（メタリックカートリッジ）や
    //   早詰め具・スイングアウト式へ（失敗は「着脱弾倉」ではなく回転機構の渋り）
    // 世界観では火薬＝「炎の魔力を込めた粉塵」として扱う
    id: "craftsman_master_arcane2",
    tags: ["prime", "elder", "work", "craftsman", "master"],
    weight: 8,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      jobs: ["master_craftsman"],
      flags: ["craft_master_arcane", "craft_revolver_done"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "棚の奥の回転式の銃を、また手に取る。鉄の薬室に、炎の魔力を込めた粉塵と弾を詰め、槌で火を起こして飛ばす——組立の名工なら、まだ伸ばせるはずだ。",
    choices: [
      {
        text: "銃身を伸ばし、射程と命中を稼ぐ",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "長い筒と、肩に当てる床を足した。初速が乗り、五十歩先の的が静かにくぼむ。騎馬には重いが、陣地では獣になる。",
          effects: { ability: 3, reputation: 3, health: -3, addFlags: ["craft_revolver_long"] },
          log: {
            title: "回転式銃の射程を伸ばす",
            text: "銃身と床を足し、遠射向きの改良型を作った。",
          },
        },
        failure: {
          result: "筒を伸ばしすぎて重心が前へ逃げた。反動で狙いが飛び、騎兵向きでも歩兵向きでもない中途半端が残る。",
          effects: { ability: 1, health: -2 },
        },
      },
      {
        text: "薬室ごと一気に詰められる筒にする",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "粉塵と弾を一つの小筒（薬莢）に封じ、薬室へ落とすだけの形にした。再装填が息を整える間に終わる。軍の目利きが、黙って銀を置いた。",
          effects: { money: 40, ability: 4, reputation: 4, health: -3, addFlags: ["craft_revolver_cartridge"] },
          log: {
            title: "回転式銃の薬莢装填を実用化する",
            text: "粉塵と弾を一体の小筒にし、装填を大幅に速めた。",
          },
        },
        failure: {
          result: "開閉式の薬室は確かにおいしい。だが軸の遊びで回転が渋り、二発目で噛んだ。早詰めの夢は、油とやすりの山に戻る。",
          effects: { ability: 2, health: -2 },
        },
      },
      {
        text: "暴発しにくい火門と隙間の設計に徹する",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "隣の薬室へ火が走る隙間を潰し、火門を深くした。威力は少し落ちる。代わりに、使い手の指が残りやすい。",
          effects: { ability: 3, reputation: 5, health: -2, addFlags: ["craft_revolver_safe"] },
          log: {
            title: "回転式銃の暴発対策を施す",
            text: "連鎖発火を抑える隙間と火門の設計に改めた。",
          },
        },
        failure: {
          result: "安全側に寄せすぎて、湿った日は火が乗らない。戦場の粉塵には、まだ早い。",
          effects: { ability: 1, reputation: 1 },
        },
      },
    ],
  },
]);
