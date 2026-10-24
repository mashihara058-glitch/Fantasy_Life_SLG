// 年齢を問わず起こりうる出来事：家族・病・事故・戦争・借金・奴隷・処刑
GAME.registerEvents([
  // ---------- 家族 ----------
  {
    id: "common_life_child",
    tags: ["young", "prime", "family"],
    conditions: { ageMin: 20, ageMax: 45, npcs: ["spouse"], flags: ["married"] },
    weight: 15,
    repeatable: true,
    cooldown: 3,
    maxTimes: 3,
    text: "{配偶者}との間に、新しい命を授かった。",
    choices: [
      {
        text: "生まれてくる子に名を贈る",
        result: "元気な産声が響いた。名は{子}。",
        effects: { addNpc: { role: "child", age: 0, trust: 70, intimacy: 70 }, health: 2 },
        log: { title: "子ども{子}が生まれる", text: "家族がひとり増えた。" },
      },
    ],
  },
  {
    id: "common_life_father_death",
    tags: ["family", "death"],
    conditions: { npcs: ["father"], npcAgeMin: { father: 50 } },
    weight: 5,
    text: "{父}が病に倒れ、そのまま帰らぬ人となった。",
    choices: [
      {
        text: "手厚く弔う",
        effects: { npcState: { father: "dead" }, money: -30, reputation: 3 },
        log: { title: "父{父}を亡くす", text: "父を見送り、その背中を思い返した。" },
      },
      {
        text: "形見の品を受け継ぐ",
        effects: { npcState: { father: "dead" }, ability: 2 },
        log: { title: "父{父}を亡くす", text: "父の形見を胸に、前を向いた。" },
      },
    ],
  },
  {
    id: "common_life_mother_death",
    tags: ["family", "death"],
    conditions: { npcs: ["mother"], npcAgeMin: { mother: 50 } },
    weight: 5,
    text: "{母}が眠るように息を引き取った。",
    choices: [
      {
        text: "母の好きだった花を供える",
        effects: { npcState: { mother: "dead" }, health: -2 },
        log: { title: "母{母}を亡くす", text: "母の好きだった花を、墓前に供えた。" },
      },
    ],
  },

  // ---------- 病・事故 ----------
  {
    id: "common_life_plague",
    tags: ["health", "death"],
    conditions: { ageMin: 0 },
    weight: 1,
    repeatable: true,
    cooldown: 20,
    text: "町に疫病が流行り、{名前}も高熱にうなされている。",
    choices: [
      {
        text: "神殿で祈りを捧げる",
        check: { stat: "health", difficulty: 30 },
        success: {
          result: "峠を越え、なんとか命を取り留めた。",
          effects: { health: -10 },
          log: { title: "疫病から生還する", text: "多くの者が倒れた疫病を生き延びた。" },
        },
        failure: {
          result: "祈りは届かなかった。",
          effects: { death: "疫病" },
          log: { title: "疫病に倒れる", text: "流行り病により、帰らぬ人となった。" },
        },
      },
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 80 } } },
        text: "高名な薬師を呼ぶ（80ゴールド）",
        check: { stat: "health", difficulty: 25 },
        success: { result: "薬が効き、熱は引いていった。", effects: { money: -80, health: -5 } },
        failure: {
          result: "薬の甲斐もなく、容体は悪化した。",
          effects: { money: -80, death: "疫病" },
          log: { title: "疫病に倒れる", text: "手を尽くしたが、流行り病には勝てなかった。" },
        },
      },
      {
        conditions: { origin: ["noble", "merchant"], moneyUnlocked: false },
        text: "家族が薬師を呼んでくれた",
        check: { stat: "health", difficulty: 25 },
        success: { result: "薬が効き、熱は引いていった。", effects: { health: -5 } },
        failure: {
          result: "薬の甲斐もなく、容体は悪化した。",
          effects: { death: "疫病" },
          log: { title: "疫病に倒れる", text: "家族の看病もむなしく、幼くしてこの世を去った。" },
        },
      },
    ],
  },
  {
    id: "common_life_accident01",
    tags: ["health", "death"],
    conditions: { ageMin: 3 },
    weight: 1,
    repeatable: true,
    cooldown: 20,
    text: "崖沿いの細い道で、{名前}は足を滑らせた。",
    choices: [
      {
        text: "とっさに木の根をつかむ",
        check: { stat: "health", difficulty: 20 },
        success: { result: "根にしがみつき、なんとか這い上がった。", effects: { health: -5 } },
        failure: {
          result: "指は空を切った。",
          effects: { death: "事故死" },
          log: { title: "崖から転落する", text: "不慮の事故により、帰らぬ人となった。" },
        },
      },
      {
        text: "身を丸めて斜面を転がり落ちる",
        check: { stat: "ability", difficulty: 30 },
        success: { result: "全身打ち身だらけだが、命は助かった。", effects: { health: -15 } },
        failure: {
          result: "岩に強く頭を打ち、長く寝込むことになった。",
          effects: { health: -35 },
          log: { title: "崖から転落し、大怪我を負う", text: "命は取り留めたが、深い傷が残った。" },
        },
      },
    ],
  },
{
  id: "common_life_accident02",
  tags: ["health", "death"],
  weight: 5,
  repeatable: true,
  cooldown: 8,
  conditions: {
    ageMin: 30,
    stats: { money: { max: -100 } }
  },
  text: "金がなく、もう何日も食事をとれていない。目の前には、よくわからないキノコが生えている。",
  choices: [
    {
      text: "食べる",
      check: { stat: "health", difficulty: 30 },
      success: {
        result: "謎のキノコを焼いて食べた。口の中でじゅわっと広がる旨みに、生き返った心地がした。",
        effects: { health: 5 },
      },
      failure: {
        result: "謎のキノコを食べた。何日も腹痛と吐き気が続き、やがて{名前}は息絶えた。",
        effects: {  death: "食中毒"  },
      },
    },
    {
      text: "耐える",
      result: "腹の鳴る音だけが、何もない部屋に響く。",
      effects: { health: -5 },
    }
  ],
},  

  // ---------- 戦争 ----------
  {
    id: "common_life_war",
    tags: ["young", "prime", "war", "death"],
    conditions: { ageMin: 18, ageMax: 45, notFlags: ["slave"] },
    weight: 4,
    repeatable: true,
    cooldown: 12,
    maxTimes: 2,
    text: "隣国との戦が始まり、王国全土に徴兵令が下った。",
    choices: [
      {
        text: "戦場へ向かう",
        check: { stat: "health", difficulty: 20 },
        success: {
          result: "泥と血にまみれた日々の末、生きて故郷の土を踏んだ。",
          effects: { reputation: 15, health: -10, addFlags: ["war_veteran"] },
          log: { title: "戦争から生還する", text: "隣国との戦に出征し、生き延びた。" },
        },
        failure: {
          result: "流れ矢が、{名前}の胸を貫いた。",
          effects: { death: "戦死" },
          log: { title: "戦場に散る", text: "隣国との戦に出征し、還らぬ人となった。" },
        },
      },
      {
        conditions: { traitsAny: ["brave"] },
        text: "先陣を切って敵陣に斬り込む",
        check: { stat: "health", difficulty: 35 },
        success: {
          result: "{名前}の突撃が戦況を覆した。凱旋の列で、その名が叫ばれた。",
          effects: { reputation: 25, health: -10, addFlags: ["war_veteran", "war_hero"] },
          log: { title: "戦場で武勲を立てる", text: "先陣を切って敵陣を破り、英雄と称えられた。" },
        },
        failure: {
          result: "敵陣の槍衾の中に、{名前}の姿は消えた。",
          effects: { death: "戦死" },
          log: { title: "先陣を切って散る", text: "勇猛に敵陣へ斬り込み、還らぬ人となった。" },
        },
      },
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 100 } } },
        text: "金を払って兵役を免れる（100ゴールド）",
        effects: { money: -100, reputation: -5 },
      },
      {
        text: "夜陰に紛れて逃げる",
        effects: { reputation: -15, addFlags: ["deserter"] },
        log: { title: "徴兵から逃亡する", text: "兵役を拒み、追われる身となった。" },
      },
    ],
  },

  // ---------- 借金・奴隷 ----------
  {
    id: "common_life_debt",
    tags: ["money", "slave"],
    conditions: { ageMin: 16, ageMax: 65, moneyUnlocked: true, stats: { money: { max: -50 } }, notFlags: ["slave"] },
    weight: 30,
    repeatable: true,
    cooldown: 2,
    text: "借金取りが、ついに戸を叩いた。返済の期限はとうに過ぎている。",
    choices: [
      {
        text: "夜逃げする",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "闇に紛れて町を出た。借金は消えないが、ひとまず追っ手は撒いた。",
          effects: { reputation: -10, addFlags: ["fugitive"] },
        },
        failure: {
          result: "町の門で捕まった。借金のかたに、奴隷商人へ売り渡された。",
          effects: { job: "slave", addFlags: ["slave"], setStats: { money: 0 }, reputation: -20 },
          log: { title: "借金のかたに奴隷として売られる", text: "夜逃げに失敗し、自由を失った。" },
        },
      },
      {
        text: "自らの身で借金を返す",
        result: "{名前}の首に、奴隷の鉄輪がはめられた。",
        effects: { job: "slave", addFlags: ["slave"], setStats: { money: 0 }, reputation: -15 },
        log: { title: "借金のかたに奴隷として売られる", text: "返しきれない借金のために、自由を差し出した。" },
      },
      {
        conditions: { npcs: ["friend"], flags: ["helped_friend"] },
        text: "{友人}に助けを求める",
        result: "{友人}は何も聞かずに借金を肩代わりしてくれた。",
        effects: { setStats: { money: 0 }, npc: { friend: { trust: -5, intimacy: 5 } } },
        log: { title: "{友人}に借金を肩代わりしてもらう", text: "かつて助けた友に、今度は救われた。" },
      },
      {
        text: "もう少し待ってくれと頭を下げる",
        result: "借金取りは舌打ちし、利息を上乗せして帰っていった。",
        effects: { money: -30, reputation: -3 },
      },
    ],
  },
  {
    id: "common_life_slave_escape",
    tags: ["slave"],
    conditions: { flags: ["slave"] },
    weight: 15,
    repeatable: true,
    cooldown: 3,
    text: "主人の目を盗み、逃げ出す機会が訪れた。",
    choices: [
      {
        text: "今しかない、逃げる",
        check: { stat: "health", difficulty: 50 },
        success: {
          result: "追っ手を振り切り、国境の森へ逃げ込んだ。",
          effects: { job: null, removeFlags: ["slave"], addFlags: ["fugitive"] },
          log: { title: "奴隷の身から逃亡する", text: "鉄輪を断ち切り、自由を取り戻した。" },
        },
        failure: { result: "すぐに捕まり、ひどく鞭打たれた。", effects: { health: [-25, -10] } },
      },
      {
        text: "解放される日まで耐える",
        check: { stat: "reputation", difficulty: 60 },
        success: {
          result: "長年の忠勤が認められ、主人から解放の証書を受け取った。",
          effects: { job: null, removeFlags: ["slave"], reputation: 5 },
          log: { title: "奴隷の身から解放される", text: "忠勤の末に、自由の身となった。" },
        },
        failure: { effects: { health: -3, reputation: 3 } },
      },
    ],
  },

  // ---------- 処刑 ----------
  {
    id: "common_life_arrest",
    tags: ["crime", "death"],
    conditions: { ageMin: 16, custom: (s) => s.flags.includes("deserter") || s.flags.includes("fugitive") },
    weight: 3,
    repeatable: true,
    cooldown: 5,
    text: "衛兵に取り囲まれた。手配書の似顔絵は、たしかに{名前}の顔だった。",
    choices: [
      {
        text: "裁判で弁明する",
        check: { stat: "reputation", difficulty: 30 },
        success: {
          result: "情状が酌量され、罰金だけで放免された。",
          effects: { money: -50, removeFlags: ["deserter", "fugitive"], reputation: -5 },
          log: { title: "裁判にかけられ、放免される", text: "過去の罪を問われたが、命は助かった。" },
        },
        failure: {
          result: "判決は、絞首刑だった。",
          effects: { death: "処刑" },
          log: { title: "処刑される", text: "罪を問われ、広場の絞首台で最期を迎えた。" },
        },
      },
      {
        text: "隙を見て逃げ出す",
        check: { stat: "health", difficulty: 50 },
        success: { result: "路地裏に飛び込み、追っ手を撒いた。", effects: { health: -5 } },
        failure: {
          result: "背後から斬りつけられた。",
          effects: { death: "処刑" },
          log: { title: "逃亡の果てに斬られる", text: "捕縛を逃れようとして、衛兵の剣に倒れた。" },
        },
      },
    ],
  },
]);
