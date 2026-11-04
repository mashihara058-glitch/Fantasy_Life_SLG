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
GAME.registerEvents([
  // ============================================================
  // 適性：どの作業をするか → 専門フラグ
  // ============================================================
  {
    id: "craftsman_aptitude",
    tags: ["adolescence", "young", "prime", "work", "craftsman"],
    weight: 14,
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
        check: { stat: "ability", difficulty: 48 },
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
        check: { stat: "ability", difficulty: 48 },
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
        check: { stat: "ability", difficulty: 48 },
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
        check: { stat: "ability", difficulty: 50 },
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
        check: { stat: "ability", difficulty: 50 },
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

  // ============================================================
  // 木工 craft_wood
  // ============================================================
  {
    id: "craftsman_wood_order",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_wood"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_wood"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "客が図面を広げた。木製品の注文だ。どれを優先する。",
    choices: [
      {
        text: "タンスを仕立てる",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "引き出しが滑らかに開く。客は満足げに銀を置いた。",
          effects: { money: 28, ability: 1, reputation: 1 },
        },
        failure: {
          result: "扉の収まりが悪く、値を叩かれた。",
          effects: { money: 10, ability: 1 },
        },
      },
      {
        text: "椅子を作る",
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
        text: "ベッド枠を組む",
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
          effects: { money: 40, ability: 2, reputation: 2 },
        },
        failure: {
          result: "予算が合わず、話は流れた。図面だけが机に残る。",
          effects: { ability: 1 },
        },
      },
    ],
  },

  // ============================================================
  // 縫製 craft_sewing
  // ============================================================
  {
    id: "craftsman_sewing_order",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_sewing"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_sewing"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "布と糸の注文が並ぶ。今日はどの仕事に手を付ける。",
    choices: [
      {
        text: "衣服を仕立てる",
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
        text: "機を織る／レースを編む",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "細い模様が布に浮かぶ。手間の分だけ、値がつく。",
          effects: { money: 30, ability: 2 },
        },
        failure: {
          result: "糸が絡まり、半日がほどけた。",
          effects: { money: 5, ability: 1 },
        },
      },
      {
        text: "紡糸の下仕事に徹する",
        result: "地味だが、工房の血流だ。指先が熱を持つ。",
        effects: { money: 10, ability: 1, health: -1 },
      },
    ],
  },

  // ============================================================
  // 皮革 craft_leather
  // ============================================================
  {
    id: "craftsman_leather_order",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_leather"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_leather"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "革の匂いが強い日だ。受注票に、いくつもの品名が並ぶ。",
    choices: [
      {
        text: "皮鎧や盾を仕立てる",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "重ねた革が、打撃を受け止める厚みになる。衛兵向けの値だ。",
          effects: { money: 34, ability: 1, reputation: 1 },
        },
        failure: {
          result: "縫いが浅く、補強に追われた。",
          effects: { money: 12, health: -2 },
        },
      },
      {
        text: "鞍や靴、かばんを作る",
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
        text: "皮なめしの工程を丁寧にやる",
        result: "臭い仕事だが、良い革はここからしか生まれない。",
        effects: { ability: 2, health: -2, money: 8 },
      },
    ],
  },

  // ============================================================
  // 鋳造 craft_casting（リボルバー部品の芽）
  // ============================================================
  {
    id: "craftsman_casting_order",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_casting"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_casting"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "炉の熱が工房を満たす。今日の湯は、何の型へ流す。",
    choices: [
      {
        text: "剣や槍の頭を鋳る",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "刃の芯が、冷えて鳴る。武具商人が目を細めた。",
          effects: { money: 30, ability: 1, reputation: 1 },
        },
        failure: {
          result: "巣ができ、欠けた品になった。溶け直しだ。",
          effects: { money: 8, health: -2 },
        },
      },
      {
        text: "鍋や釘など日用品を量産する",
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
        // 後続：組立職人とつなげてリボルバー完成へ、など
        text: "見慣れない銃の部品の型を試す",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "円筒に穴が並ぶ、奇妙な部品が冷えた。発注主は「組立側へ回せ」とだけ言った。",
          effects: { money: 40, ability: 2, addFlags: ["craft_revolver_parts"] },
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
    ],
  },

  // ============================================================
  // 組立 craft_assembly（リボルバー完成・魔道具）
  // ============================================================
  {
    id: "craftsman_assembly_order",
    tags: ["young", "prime", "elder", "work", "craftsman", "craft_assembly"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["apprentice", "craftsman", "master_craftsman"],
      flags: ["craft_assembly"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "部品箱が机に並ぶ。噛み合わせの精度が、品の命だ。",
    choices: [
      {
        text: "魔道具めいた装置を組み立てる",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "最後の留め具を締めると、小さな光が走った。依頼主は黙って銀を置いた。",
          effects: { money: 36, ability: 2, reputation: 1 },
        },
        failure: {
          result: "接触が悪く、動かない箱だけが残った。",
          effects: { money: 10, ability: 1 },
        },
      },
      {
        text: "日常の道具を組み立てて納品する",
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
        conditions: { flags: ["craft_revolver_parts"] },
        text: "鋳造部品を組み、回転式の銃を仕上げる",
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
          effects: { money: 75, reputation: 6, ability: 1 },
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
          effects: { money: 90, reputation: 5, ability: 2 },
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
          effects: { money: 60, reputation: 3, ability: 1 },
        },
        failure: {
          result: "軍の規格に合わず、返品された。時代が、まだ追いついていない。",
          effects: { reputation: -2 },
        },
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
          effects: { money: 100, ability: 3, reputation: 4 },
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
]);
