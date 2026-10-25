// 料理人の仕事イベント
// 成功すると cook_* フラグが付き、最期の年表が「生涯の献立」のように並ぶことを想定している
//   cook_bread / cook_veg / cook_fish / cook_pie / cook_egg / cook_meat
//   cook_appetizer / cook_soup / cook_dessert / cook_signature / cook_dragon
//   cook_drink_elf / dwarf / beast / lizard / human
// 生涯現役用（maxTimes なし・repeatable）: cook_common_01〜04
// 種族客の好み料理: cook_dwarf_* / beastfolk / elf / lizardfolk / human（cookRaceClient）

/**
 * 各種族の客が、好みの料理を注文する。
 * ※娼婦の種族指名と違い、プレイヤー種族は問わない（客側の趣味）。
 * 同種族の料理人だけ weight が上がり、得意技の選択肢も出る。
 * variants: { text, praise?, doubt? }
 */
function cookRaceClient({ id, species, raceLabel, praise, doubt, variants }) {
  const tip = { money: 12, ability: 1, reputation: 2 };
  const weight = Math.max(3, Math.round(6 / Math.sqrt(variants.length)));

  return variants.map((v, i) => {
    const ok = v.praise || praise;
    const no = v.doubt || doubt;
    return {
      id: variants.length === 1 ? id : `${id}_${i + 1}`,
      tags: ["young", "prime", "elder", "work", "cook"],
      weight,
      weightMods: [{ conditions: { species: [species] }, multiply: 1.5 }],
      repeatable: true,
      cooldown: 5,
      logOnce: true,
      conditions: { ageMin: 16, jobs: ["cook"], notFlags: ["slave"] },
      text: v.text,
      choices: [
        {
          text: "注文どおりに作る",
          check: { stat: "ability", difficulty: 48 },
          success: {
            result: ok,
            effects: tip,
            log: {
              title: `接客　${raceLabel}好み`,
              text: `${raceLabel}の客の注文に応え、店の評判を少し伸ばした。`,
            },
          },
          failure: {
            result: no,
            effects: { reputation: -2, money: -4 },
          },
        },
        {
          conditions: { species: [species] },
          text: "出自の舌で、寸分違わず合わせる",
          check: { stat: "ability", difficulty: 38 },
          success: {
            result: ok,
            effects: { money: 14, ability: 2, reputation: 3 },
            log: {
              title: `接客　${raceLabel}の味（出自）`,
              text: `自ら知る${raceLabel}の味覚で、注文を完璧に通した。`,
            },
          },
          failure: {
            result: no,
            effects: { ability: -1, reputation: -1 },
          },
        },
        {
          text: "店の定番で代用する",
          check: { chance: 45 },
          success: {
            result: "期待とは違うが、空腹は満たされたらしい。銀は普通に残る。",
            effects: { money: 8 },
          },
          failure: {
            result: no,
            effects: { reputation: -1 },
          },
        },
        {
          text: "今は出せないと断る",
          result: "客は肩を落として扉へ向かう。厨房には、売れ残りの匂いだけが残る。",
        },
      ],
    };
  });
}

GAME.registerEvents([
  // ---------- 既存：素材テーマ ----------
  {
    id: "cook_01",
    tags: ["young", "prime", "work", "cook"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "粉袋を開けると、白い粉が空気に舞った。今日の仕入れは小麦だ。どう仕上げるか。",
    choices: [
      {
        text: "小麦そのもので勝負する",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "窯から出したばかりのパンは、湯気を立ててふくらんでいた。客の手が、すぐに伸びる。",
          effects: { ability: 1, money: 10, addFlags: ["cook_bread"] },
          log: { title: "主食　ふかふかのパン", text: "小麦の味だけで勝負し、店の定番になった。" },
        },
        failure: {
          result: "生地がうまく起きず、重い塊になってしまった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "季節の果物と合わせる",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "焼きたての生地に、甘酸っぱい果実が染み込んだ。子どもの声が店先で弾む。",
          effects: { ability: 1, reputation: 1, addFlags: ["cook_bread", "cook_dessert"] },
          log: { title: "甘味　果物のケーキ", text: "小麦と果物を合わせた菓子が評判になった。" },
        },
        failure: {
          result: "水分を見誤り、生地がべちゃついてしまった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "焼きたてに肉を挟む",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "香ばしいパンで熱々の肉を包むと、旅人たちが「片手で食える」と喜んだ。",
          effects: { ability: 1, money: 15, addFlags: ["cook_bread", "cook_meat"] },
          log: { title: "主食　肉包みパン", text: "忙しい客向けの一品が、看板候補になった。" },
        },
        failure: {
          result: "肉の脂でパンがふやけ、見た目も味もぼやけた。",
          effects: { ability: -1 },
        },
      },
    ],
  },
  {
    id: "cook_02",
    tags: ["young", "prime", "work", "cook"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "畑から届いた野菜が、かごいっぱいに並ぶ。色も形もまちまちだ。今夜の一皿を決める。",
    choices: [
      {
        text: "じっくり煮込む",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "鍋の底から立ち上がる香りに、店内が静かになった。スプーンが止まる客はいない。",
          effects: { ability: 1, money: 10, addFlags: ["cook_veg"] },
          log: { title: "煮込み　野菜シチュー", text: "あり合わせの野菜を、深い味の煮込みにした。" },
        },
        failure: {
          result: "火が強すぎて、野菜が形を失い、灰汁だけが残った。",
          effects: { ability: -1 },
        },
      },
      {
        text: "卵と合わせて焼く",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "溶き卵に野菜を沈め、窯で焼くと、切り口から湯気がふわりと立った。",
          effects: { ability: 1, reputation: 1, addFlags: ["cook_veg", "cook_egg"] },
          log: { title: "焼き物　野菜のキッシュ", text: "卵と野菜を重ねた一品が、午後の客を呼んだ。" },
        },
        failure: {
          result: "生地が焼けすぎ、中身は半熟のままだった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "肉と一緒にグリルする",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "芋の甘みと肉の脂が溶け合い、鉄板の上でいい音を立てた。",
          effects: { ability: 1, money: 15, addFlags: ["cook_veg", "cook_meat"] },
          log: { title: "グリル　肉と野菜", text: "香ばしいグリルが、夜の献立の主役になった。" },
        },
        failure: {
          result: "火加減を誤り、野菜は焦げ、肉は生焼けだった。",
          effects: { ability: -1 },
        },
      },
    ],
  },
  {
    id: "cook_03",
    tags: ["young", "prime", "work", "cook"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "港市から氷詰めの魚が届いた。鱗がまだ光っている。鮮度を活かすも、火を通すも、腕次第だ。",
    choices: [
      {
        text: "出汁を取って煮込む",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "澄んだスープに、海の匂いだけが残った。一口で、客の肩が下がる。",
          effects: { ability: 1, reputation: 2, addFlags: ["cook_fish", "cook_soup"] },
          log: { title: "魚介　海のスープ", text: "あっさりとした煮込みが、通のリピーターを生んだ。" },
        },
        failure: {
          result: "臭みを取りきれず、鍋全体が魚臭くなった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "衣をつけて揚げる",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "熱した油に白身を沈めると、衣が黄金色に弾ける。外はカリッ、中はふっくらだ。",
          effects: { ability: 1, money: 15, addFlags: ["cook_fish"] },
          log: { title: "魚介　白身のフライ", text: "サックリ揚がった魚が、昼の人気枠を占めた。" },
        },
        failure: {
          result: "油の温度が低く、衣が油を吸って重くなった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "大きな海老で豪勢に見せる",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "グリルした海老が皿いっぱいに乗る。通りかかった商人まで足を止めた。",
          effects: { ability: 2, money: 25, reputation: 2, addFlags: ["cook_fish"] },
          log: { title: "魚介　大海老のグリル", text: "見栄えのする一品が、高値でも注文された。" },
        },
        failure: {
          result: "火が通りすぎ、弾力のある身がゴムのように縮んだ。",
          effects: { ability: -1, money: -10 },
        },
      },
    ],
  },
  {
    id: "cook_04",
    tags: ["young", "prime", "work", "cook"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "バターを摺り込み、薄く伸ばした生地が台に広がる。中に何を詰めるかで、パイの顔が決まる。",
    choices: [
      {
        text: "香辛料を効かせた肉を詰める",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "切り口から湯気とハーブの香りが立ちのぼる。兵士たちが二個目を頼んだ。",
          effects: { ability: 1, money: 15, addFlags: ["cook_pie", "cook_meat"] },
          log: { title: "パイ　ミートパイ", text: "腹持ちのよい肉パイが、常連の定番になった。" },
        },
        failure: {
          result: "中身の火が足りず、生地だけが先に焦げた。",
          effects: { ability: -1 },
        },
      },
      {
        text: "甘い果物を詰める",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "焼き色のついた生地を割ると、果実の蜜がとろりとこぼれた。",
          effects: { ability: 1, reputation: 1, addFlags: ["cook_pie", "cook_dessert"] },
          log: { title: "甘味　果物のパイ", text: "デザート用のパイが、午後の客を呼び込んだ。" },
        },
        failure: {
          result: "果汁が多すぎて、底がふやけてしまった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "芋とキノコ、ベーコンを詰める",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "ベーコンの脂が芋に染み、キノコの香りが生地をまとう。酒が進む味だ。",
          effects: { ability: 1, money: 20, addFlags: ["cook_pie"] },
          log: { title: "パイ　ベーコンと芋", text: "香ばしい具材のパイが、夜の酒場でも評判になった。" },
        },
        failure: {
          result: "具材の水気で生地が割れ、中身が窯に落ちた。",
          effects: { ability: -1 },
        },
      },
    ],
  },
  {
    id: "cook_05",
    tags: ["young", "prime", "work", "cook"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "今朝届いた卵は、殻がまだ温かい。白身も黄身も、扱い方ひとつで別の料理になる。",
    choices: [
      {
        text: "泡立てて菓子にする",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "窯から出した菓子は、指で押すとゆっくり戻る。甘さ控えめで、お茶請けにぴったりだ。",
          effects: { ability: 1, reputation: 2, addFlags: ["cook_egg", "cook_dessert"] },
          log: { title: "甘味　卵の菓子", text: "泡立てた卵の菓子が、上品な店の顔になった。" },
        },
        failure: {
          result: "泡が潰れて、焼き上がりは平たい板のようになった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "冒険者に魔物の卵を頼む",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "届いたのは、掌より大きなまだらの卵。茹でると黄身が琥珀のように輝いた。",
          effects: { ability: 2, money: 20, reputation: 2, addFlags: ["cook_egg"] },
          log: { title: "珍味　魔物の卵", text: "冒険者が運んだ珍しい卵が、一夜の話題になった。" },
        },
        failure: {
          result: "茹で時間を誤り、殻の中で黄身が固まりすぎた。高価な仕入れが無駄になる。",
          effects: { ability: -1, money: -20 },
        },
      },
      {
        text: "茹で野菜に乗せて出す",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "割った黄身が野菜を濡らし、塩ひとつで皿が完成した。単純なほど、腕が出る。",
          effects: { ability: 1, money: 8, addFlags: ["cook_egg", "cook_veg"] },
          log: { title: "前菜寄　卵乗せ野菜", text: "黄身をソースにした素朴な一皿が、朝の定番になった。" },
        },
        failure: {
          result: "卵を割りすぎて白身が広がり、見た目が崩れた。",
          effects: { ability: -1 },
        },
      },
    ],
  },
  {
    id: "cook_06",
    tags: ["young", "prime", "work", "cook"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "肉蔵の扉を開けると、冷たい空気とともに血の匂いがする。今日はどの肉を主役にするか。",
    choices: [
      {
        text: "硬いスネ肉を長く煮込む",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "半日火にかけた肉は、箸でほぐれるほど柔らかくなっていた。スープも深い。",
          effects: { ability: 1, money: 15, addFlags: ["cook_meat"] },
          log: { title: "肉　牛スネの煮込み", text: "安価な部位を、時間をかけて旨みに変えた。" },
        },
        failure: {
          result: "火が足りず、噛んでも噛んでも終わらない硬さのままだった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "市場の山鳥で上品に仕上げる",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "澄んだ黄金色のスープに、山鳥の香りが乗る。貴族の使いが「店の名を教えてくれ」と聞いた。",
          effects: { ability: 2, money: 25, reputation: 3, addFlags: ["cook_meat", "cook_soup"] },
          log: { title: "肉　山鳥のスープ", text: "上品な一椀が、上流の客を店に引き寄せた。" },
        },
        failure: {
          result: "臭み抜きを誤り、野趣が勝ちすぎて上品さが出なかった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "ソーセージを焼いて酒のつまみにする",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "香ばしい脂がじわりと染み出す。酒を注文する手が、自然と増えた。",
          effects: { ability: 1, money: 20, addFlags: ["cook_meat"] },
          log: { title: "肉　ソーセージの焼き物", text: "酒のつまみ向きの一皿が、夜の売上を伸ばした。" },
        },
        failure: {
          result: "火が強すぎて皮が裂け、中身が鉄板に散った。",
          effects: { ability: -1 },
        },
      },
    ],
  },

  // ---------- コースの骨格 ----------
  {
    id: "cook_appetizer",
    tags: ["young", "prime", "work", "cook", "course"],
    weight: 12,
    repeatable: true,
    cooldown: 4,
    logOnce: true,
    maxTimes: 2,
    conditions: { ageMin: 16, jobs: ["cook"], notFlags: ["cook_appetizer"] },
    text: "開店の鐘が鳴る前、厨房は静かに息を潜めている。客の口を開く、最初の小皿を決めなければならない。",
    choices: [
      {
        text: "香草と塩漬け野菜の冷製",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "塩気と緑の香りが舌を起こす。最初の一口で、店の空気がほぐれた。",
          effects: { ability: 1, reputation: 1, addFlags: ["cook_appetizer", "cook_veg"] },
          log: { title: "前菜　香草の冷製", text: "口を開く一皿が、コースの始まりになった。" },
        },
        failure: {
          result: "塩が勝ちすぎて、前菜のうちに客の顔がしかんだ。",
          effects: { ability: -1 },
        },
      },
      {
        text: "薄い魚のマリネ",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "酸味が鮮度を引き立てる。港町の客が「海を思い出す」と呟いた。",
          effects: { ability: 1, money: 10, addFlags: ["cook_appetizer", "cook_fish"] },
          log: { title: "前菜　魚のマリネ", text: "冷たい魚の一皿が、献立の冒頭を飾った。" },
        },
        failure: {
          result: "漬けすぎて身が白く濁り、鮮度の印象が消えた。",
          effects: { ability: -1 },
        },
      },
      {
        text: "魔物の肝を薄造りに",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "苦みのあとに甘い余韻が残る。通だけが注文する、危険な名物になった。",
          effects: { ability: 2, reputation: 2, money: 15, addFlags: ["cook_appetizer"] },
          log: { title: "前菜　禁忌の肝", text: "魔物の肝の薄造りが、通好みの一品になった。" },
        },
        failure: {
          result: "下処理を誤り、苦みが毒のように広がった。客が席を立った。",
          effects: { ability: -1, health: -5, reputation: -3 },
        },
      },
    ],
  },
  {
    id: "cook_soup",
    tags: ["young", "prime", "work", "cook", "course"],
    weight: 12,
    repeatable: true,
    cooldown: 4,
    logOnce: true,
    maxTimes: 2,
    conditions: { ageMin: 16, jobs: ["cook"], notFlags: ["cook_soup"] },
    text: "大鍋の番が回ってきた。今夜のスープひとつで、店の温度も客の声の大きさも変わる。",
    choices: [
      {
        text: "野菜のポタージュ",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "滑らかな舌触りに、子どもも老人もスプーンを進める。",
          effects: { ability: 1, money: 10, addFlags: ["cook_soup", "cook_veg"] },
          log: { title: "スープ　野菜のポタージュ", text: "優しい一杯が、献立の二品目になった。" },
        },
        failure: {
          result: "裏ごしが甘く、口当たりがざらついた。",
          effects: { ability: -1 },
        },
      },
      {
        text: "骨から取る澄まし汁",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "透明度の高い汁に、旨みだけが沈んでいる。無口な常連が、静かに椀を空けた。",
          effects: { ability: 2, reputation: 2, addFlags: ["cook_soup"] },
          log: { title: "スープ　骨の澄まし汁", text: "丁寧に取った出汁が、店の格を上げた。" },
        },
        failure: {
          result: "濁りが取れず、澄まし汁とは呼べない色になった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "血を使った濃いスープ",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "濃厚な一杯に、冒険者たちが杯を合わせる。一般客は少し距離を取った。",
          effects: { ability: 2, money: 20, reputation: -1, addFlags: ["cook_soup", "cook_meat"] },
          log: { title: "スープ　血の煮込み", text: "野趣の強いスープが、冒険者に支持された。" },
        },
        failure: {
          result: "凝固してしまい、鍋が鉄臭い塊になった。",
          effects: { ability: -1, reputation: -2 },
        },
      },
    ],
  },
  {
    id: "cook_dessert",
    tags: ["young", "prime", "work", "cook", "course"],
    weight: 10,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    maxTimes: 2,
    conditions: {
      ageMin: 18,
      jobs: ["cook"],
      jobYearsMin: 2,
      notFlags: ["cook_dessert_finale"],
      custom: (s) =>
        s.flags.includes("cook_meat") ||
        s.flags.includes("cook_fish") ||
        s.flags.includes("cook_soup") ||
        s.flags.includes("cook_appetizer"),
    },
    text: "メインを食べ終えた客の目が、まだ皿を探している。締めの甘味を、今夜こそ決めたい。",
    choices: [
      {
        text: "蜂蜜と木の実のタルト",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "香ばしい木の実が歯に残り、蜂蜜の甘さが後から追いつく。満足げな吐息が聞こえた。",
          effects: { ability: 1, money: 15, reputation: 2, addFlags: ["cook_dessert", "cook_dessert_finale"] },
          log: { title: "甘味　蜂蜜と木の実のタルト", text: "コースの締めが、店の記憶に残る味になった。" },
        },
        failure: {
          result: "生地が硬く、甘さだけが浮いてしまった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "冷たい果汁の氷菓子",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "舌の上で溶ける冷気に、エルフ風の客が目を細めた。「夏の森のようだ」",
          effects: { ability: 2, reputation: 3, addFlags: ["cook_dessert", "cook_dessert_finale"] },
          log: { title: "甘味　果汁の氷菓子", text: "冷たい一皿が、食後の定番になった。" },
        },
        failure: {
          result: "氷が粗く、果汁が分離してしまった。",
          effects: { ability: -1 },
        },
      },
      {
        text: "酒粕を使った大人の菓子",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "ほろ苦い余韻に、酒を嗜む客だけが頷く。子ども向けではない、店の夜の顔だ。",
          effects: { ability: 1, money: 20, addFlags: ["cook_dessert", "cook_dessert_finale"] },
          log: { title: "甘味　酒粕の菓子", text: "大人向けの締めが、夜のコースを完成させた。" },
        },
        failure: {
          result: "酒の香りが勝ちすぎて、菓子というより酒そのものになった。",
          effects: { ability: -1 },
        },
      },
    ],
  },

  // ---------- 看板料理 ----------
  {
    id: "cook_signature",
    tags: ["young", "prime", "work", "cook", "career"],
    weight: 14,
    conditions: {
      jobs: ["cook"],
      jobYearsMin: 8,
      notFlags: ["cook_signature"],
      custom: (s) =>
        s.flags.includes("cook_fish") ||
        s.flags.includes("cook_meat") ||
        s.flags.includes("cook_soup") ||
        s.flags.includes("cook_dessert") ||
        s.flags.includes("cook_bread"),
    },
    text: "常連が「いつもの」と呼ぶ皿がない。店の名を残す一品を、そろそろ決めねばならない。",
    choices: [
      {
        conditions: { flags: ["cook_fish"] },
        text: "これまで磨いた魚料理を看板にする",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "看板に魚の絵が描かれた。通りの人が、指さして店に入ってくる。",
          effects: { reputation: 10, money: 40, ability: -15, addFlags: ["cook_signature"] },
          log: { title: "看板　魚の名物料理", text: "魚料理が、店の顔として据えられた。" },
        },
        failure: {
          result: "自信作のはずが、今日に限って火が狂った。看板にするには早かった。",
          effects: { reputation: -3, ability: -2 },
        },
      },
      {
        conditions: { flags: ["cook_meat"] },
        text: "肉の一皿を看板にする",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "鉄板の音が店の合図になった。肉を求める客が、遠方からも来る。",
          effects: { reputation: 10, money: 40, ability: -15, addFlags: ["cook_signature"] },
          log: { title: "看板　肉の名物料理", text: "肉料理が、店の顔として据えられた。" },
        },
        failure: {
          result: "仕入れの肉が悪く、味がばらついた。名物には遠い。",
          effects: { reputation: -3, ability: -2 },
        },
      },
      {
        conditions: { flags: ["cook_dessert"] },
        text: "甘味を看板にする",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "食後だけでなく、甘味だけを目的に来る客が現れた。",
          effects: { reputation: 8, money: 30, ability: -12, addFlags: ["cook_signature"] },
          log: { title: "看板　甘味の名物", text: "デザートが、店の顔として据えられた。" },
        },
        failure: {
          result: "甘さが時代の好みとずれ、子ども以外には受けなかった。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "今日の仕入れ任せで、新しい一皿を看板にする",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "思い切りが功を奏した。誰も見たことのない皿が、店の伝説の始まりになる。",
          effects: { reputation: 12, money: 35, ability: -18, addFlags: ["cook_signature"] },
          log: { title: "看板　独創の一皿", text: "既存の型に頼らず、新しい名物を打ち立てた。" },
        },
        failure: {
          result: "独創のつもりが、ただの珍奇に終わった。",
          effects: { reputation: -5, money: -15 },
        },
      },
    ],
  },

  // ---------- 宴会 ----------
  {
    id: "cook_banquet",
    tags: ["young", "prime", "work", "cook"],
    weight: 8,
    repeatable: true,
    cooldown: 10,
    maxTimes: 2,
    logOnce: true,
    conditions: { ageMin: 20, jobs: ["cook"], stats: { reputation: { min: 35 } }, notFlags: ["slave"] },
    text: "使いが厨房の扉を叩いた。貴族の婚礼か、ギルドの大宴会か——今夜、大人数の胃袋を任される。",
    choices: [
      {
        conditions: { flags: ["cook_signature"] },
        text: "看板料理を披露して切り盛りする",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "名物が並ぶたびに歓声が上がる。主人から、翌年の予約をその場で取られた。",
          effects: { money: 120, reputation: 8, health: -5 },
          log: { title: "宴会　看板料理で大成功", text: "大宴会で名物を振るい、名を上げた。" },
        },
        failure: {
          result: "人数に押され、看板の味がばらついた。噂は良いとも悪いともつかない。",
          effects: { money: 40, reputation: -2, health: -8 },
        },
      },
      {
        text: "無難に量と温度で押し切る",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "華やかさはないが、誰も腹を空かせていない。それが一番の褒め言葉だ。",
          effects: { money: 80, reputation: 3, health: -5 },
          log: { title: "宴会　大人数を切り盛りする", text: "大宴会を無難に終え、信頼を得た。" },
        },
        failure: {
          result: "配膳が遅れ、冷めた料理が並んだ。主人の顔が曇る。",
          effects: { money: 20, reputation: -5, health: -5 },
        },
      },
      {
        text: "見栄え重視で豪勢に振るまう",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "山盛りの肉と魚に、会場が沸いた。財布は軽くなるが、伝説は残る。",
          effects: { money: 60, reputation: 10, health: -8, ability: -5 },
          log: { title: "宴会　豪勢なフルコース", text: "見栄えのする宴会が、長く語り草になった。" },
        },
        failure: {
          result: "生焼けが出て、席の端から咳払いが広がった。賠償交渉の夜になる。",
          effects: { money: -50, reputation: -10, health: -5 },
          log: { title: "宴会で食当たりを出す", text: "大宴会が裏目に出た。" },
        },
      },
    ],
  },

  // ---------- 種族ドリンク ----------
  {
    id: "cook_drink_elf",
    tags: ["young", "prime", "work", "cook", "drink"],
    weight: 5,
    maxTimes: 1,
    weightMods: [{ conditions: { species: ["elf"] }, multiply: 2 }],
    conditions: { ageMin: 18, jobs: ["cook"], notFlags: ["cook_drink_elf"] },
    text: "耳の長い客が、静かに頼んだ。「故郷の薬酒に近いものを」。葉と花を、長く浸す酒だ。",
    choices: [
      {
        text: "苦い薬草を丁寧に調合する",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "一口飲んだ客が、目を閉じた。「……森の匂いがする」。隣の席まで注文が飛ぶ。",
          effects: { reputation: 3, money: 15, addFlags: ["cook_drink_elf"] },
          log: { title: "食前酒　エルフの薬酒", text: "葉と花を浸した苦い酒が、長寿の客に愛された。" },
        },
        failure: {
          result: "苦みが薬そのもので、返品の山になった。",
          effects: { reputation: -2, money: -5 },
        },
      },
      {
        conditions: { species: ["elf"] },
        text: "自分の記憶にある味を再現する",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "手元の感覚が正しい。客ではなく、自分の喉が先に納得した。",
          effects: { reputation: 4, ability: 1, money: 15, addFlags: ["cook_drink_elf"] },
          log: { title: "食前酒　エルフの薬酒", text: "自らの出自を活かし、薬酒を仕上げた。" },
        },
        failure: {
          result: "記憶と手が食い違い、ただの苦い水になった。",
          effects: { ability: -1 },
        },
      },
      { text: "丁寧に断る", effects: { reputation: 1 } },
    ],
  },
  {
    id: "cook_drink_dwarf",
    tags: ["young", "prime", "work", "cook", "drink"],
    weight: 5,
    maxTimes: 1,
    weightMods: [{ conditions: { species: ["dwarf"] }, multiply: 2 }],
    conditions: { ageMin: 18, jobs: ["cook"], notFlags: ["cook_drink_dwarf"] },
    text: "髭の客が樽をトンと叩いた。「火酒だ。燃えるやつを寄こせ」。蒸留の香が、厨房に立ちこめる。",
    choices: [
      {
        text: "樽の底から強い酒を出す",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "一口で咳き込み、二口目で大笑する。勘定は酒のぶんだけ嵩んだ。",
          effects: { money: 25, reputation: 2, addFlags: ["cook_drink_dwarf"] },
          log: { title: "食前酒　ドワーフの火酒", text: "燃えるような蒸留酒が、夜の売上を伸ばした。" },
        },
        failure: {
          result: "アルコールが強すぎて喧嘩になり、テーブルが一つ潰れた。",
          effects: { health: -5, reputation: -3, money: -10 },
        },
      },
      {
        conditions: { species: ["dwarf"] },
        text: "故郷仕込みの火加減で醸す",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "客が杯を掲げた。「お前、分かってるな」。健康的とは言えない連帯感が生まれる。",
          effects: { money: 25, health: 2, reputation: 3, addFlags: ["cook_drink_dwarf"] },
          log: { title: "食前酒　ドワーフの火酒", text: "出自を活かした火酒が、髭の客たちを熱狂させた。" },
        },
        failure: {
          result: "蒸留を誤り、ただの刺激臭になった。",
          effects: { reputation: -2 },
        },
      },
      { text: "弱い酒しか出せないと謝る", effects: { money: 5 } },
    ],
  },
  {
    id: "cook_drink_beast",
    tags: ["young", "prime", "work", "cook", "drink"],
    weight: 4,
    maxTimes: 1,
    weightMods: [{ conditions: { species: ["beastfolk"] }, multiply: 2 }],
    conditions: { ageMin: 18, jobs: ["cook"], notFlags: ["cook_drink_beast"] },
    text: "獣耳の一行が席を取った。「血酔いの蜜酒はあるか」。生々しさと甘さの、紙一重の酒だ。",
    choices: [
      {
        text: "獲物の血と蜂蜜で仕込む",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "獣人の客で満席になる。人間の客は、そっと別の店を探す。",
          effects: { money: 20, reputation: -1, addFlags: ["cook_drink_beast"] },
          log: { title: "食前酒　獣人の蜜酒", text: "血と蜂蜜の酒が、獣人たちに支持された。" },
        },
        failure: {
          result: "生臭さが厨房まで埋め、一時閉店レベルの騒ぎになった。",
          effects: { reputation: -5, money: -15 },
        },
      },
      {
        conditions: { species: ["beastfolk"] },
        text: "自分が飲み慣れた割合で合わせる",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "甘みの奥に鉄の味。仲間内では「本物」と呼ばれる仕上がりだ。",
          effects: { money: 20, reputation: 2, addFlags: ["cook_drink_beast"] },
          log: { title: "食前酒　獣人の蜜酒", text: "自ら知る味を再現し、血酔いの蜜酒を出した。" },
        },
        failure: {
          result: "蜂蜜が勝ちすぎて、ただの甘い酒になった。",
          effects: { ability: -1 },
        },
      },
      { text: "店の方針に合わないと断る", effects: { reputation: 1 } },
    ],
  },
  {
    id: "cook_drink_lizard",
    tags: ["young", "prime", "work", "cook", "drink"],
    weight: 4,
    maxTimes: 1,
    weightMods: [{ conditions: { species: ["lizardfolk"] }, multiply: 2 }],
    conditions: { ageMin: 18, jobs: ["cook"], notFlags: ["cook_drink_lizard"] },
    text: "鱗のある客が、低く頼んだ。「熱くて辛いの」。体の内側を起こす、竜人好みの一杯だ。",
    choices: [
      {
        text: "唐辛子を効かせた熱い酒を出す",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "一口で頬が赤らむ。寒季の夜に限って、注文が途切れない。",
          effects: { money: 15, reputation: 2, addFlags: ["cook_drink_lizard"] },
          log: { title: "食前酒　竜人の辛酒", text: "熱と辛さの酒が、寒季の名物になった。" },
        },
        failure: {
          result: "辛すぎて客が席で咳き込み、水を何十杯も持っていくことになった。",
          effects: { reputation: -2, money: -5 },
        },
      },
      {
        conditions: { species: ["lizardfolk"] },
        text: "鱗の下を温める、故郷の辛さで",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "客が長く息を吐いた。「……いい」。それ以上の言葉はいらなかった。",
          effects: { money: 18, reputation: 3, health: 1, addFlags: ["cook_drink_lizard"] },
          log: { title: "食前酒　竜人の辛酒", text: "出自を活かした辛酒が、鱗の客を満足させた。" },
        },
        failure: {
          result: "火が弱く、ぬるい刺激に終わった。",
          effects: { ability: -1 },
        },
      },
      { text: "刺激の強い酒は置いていないと断る" },
    ],
  },
  {
    id: "cook_drink_human",
    tags: ["young", "prime", "work", "cook", "drink"],
    weight: 6,
    maxTimes: 2,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "麦と果実の酒は、いちばん売れ、いちばん忘れられる。それでも今夜も、樽を開ける。",
    choices: [
      {
        text: "素直な麦酒を出す",
        check: { chance: 70 },
        success: {
          result: "話題にはならないが、空の杯が静かに増える。それが店の土台だ。",
          effects: { money: 12, addFlags: ["cook_drink_human"] },
          log: { title: "食前酒　麦酒", text: "平凡な麦酒が、毎晩の売上を支えた。" },
        },
        failure: {
          result: "樽が傷んでいて、すっぱい匂いがした。今夜は水で誤魔化す。",
          effects: { money: -5 },
        },
      },
      {
        text: "季節の果実酒にする",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "ほのかな酸味に、人間の客がいちばん長く居残った。",
          effects: { money: 15, reputation: 1, addFlags: ["cook_drink_human"] },
          log: { title: "食前酒　果実酒", text: "季節の果実酒が、人間の客に受け入れられた。" },
        },
        failure: {
          result: "甘さが足りず、ただの薄い酒になった。",
          effects: { ability: -1 },
        },
      },
    ],
  },

  // ---------- 竜肉料理（冒険寄り料理人の集大成）----------
  {
    id: "cook_dragon",
    tags: ["prime", "work", "cook", "adventure"],
    weight: 6,
    weightMods: [
      { conditions: { flags: ["dragon_survey"] }, multiply: 4 },
      { conditions: { flags: ["met_dragon"] }, multiply: 2 },
    ],
    conditions: {
      jobs: ["cook"],
      jobYearsMin: 10,
      flags: ["cook_meat"],
      stats: { reputation: { min: 40 }, ability: { min: 45 } },
      notFlags: ["cook_dragon"],
    },
    text: "噂が厨房まで届いた。竜の肉が、ごくわずか市場に出る——あるいは、冒険者が「調理できる奴はいるか」と店を探している。猪とは訳が違う。失敗すればただの灰だ。",
    choices: [
      {
        conditions: { flags: ["dragon_survey"] },
        text: "昔調べた巣の知識を頼りに、自分で肉を降ろす",
        check: { stat: "ability", difficulty: 70 },
        success: {
          result: "鱗の下の繊維を読み、火を通す。脂が蜜のように滴り、店内に雷鳴のような沈黙が落ちた。一口目のあと、誰も言葉を持たなかった。",
          effects: {
            ability: -20,
            reputation: 15,
            money: 80,
            addFlags: ["cook_dragon", "cook_signature"],
          },
          log: {
            title: "主菜　ドラゴンステーキ",
            text: "竜の巣を知る料理人だけが辿り着いた、生涯の一皿。",
          },
        },
        failure: {
          result: "火が竜の脂に負けた。厨房が煤け、高価な肉は炭になった。",
          effects: { health: -10, money: -40, reputation: -5, ability: -5 },
          log: { title: "竜肉の調理に失敗する", text: "ドラゴンステーキへの挑戦は、灰で終わった。" },
        },
      },
      {
        text: "冒険者から肉を譲り受け、生涯の技で焼く",
        check: { stat: "ability", difficulty: 65 },
        success: {
          result: "分厚い肉の中心まで、ゆっくりと熱を入れる。切り口は紅玉のようで、常連でさえ箸を忘れる。",
          effects: {
            ability: -18,
            reputation: 12,
            money: 50,
            addFlags: ["cook_dragon", "cook_signature"],
          },
          log: {
            title: "主菜　ドラゴンステーキ",
            text: "冒険者が運んだ竜肉を、店の頂点の一皿にした。",
          },
        },
        failure: {
          result: "焼きすぎた。竜の肉は許してくれない。煙だけが残った。",
          effects: { money: -30, reputation: -4, ability: -3 },
        },
      },
      {
        text: "高値でも市場から買い、謹んで調理する",
        check: { stat: "reputation", difficulty: 55 },
        conditions: { stats: { money: { min: 100 } } },
        success: {
          result: "財布は空になる。だが皿の上の一枚が、十年分の看板を一夜で超える。",
          effects: {
            money: -100,
            reputation: 10,
            ability: -15,
            addFlags: ["cook_dragon", "cook_signature"],
          },
          log: {
            title: "主菜　ドラゴンステーキ",
            text: "相場を超える代償で手にした竜肉を、主菜の頂点にした。",
          },
        },
        failure: {
          result: "肉は届いたが、扱いを誤り硬くなった。高い勉強代だ。",
          effects: { money: -100, reputation: -3 },
        },
      },
      {
        text: "今の腕では早すぎると見送る",
        effects: { health: 2 },
      },
    ],
  },

  // ---------- 引退の最後の一膳 ----------
  {
    id: "cook_farewell",
    tags: ["elder", "work", "cook"],
    weight: 20,
    conditions: {
      aged: true,
      jobs: ["cook"],
      notFlags: ["cook_farewell"],
      custom: (s) =>
        s.flags.some((f) =>
          [
            "cook_appetizer",
            "cook_soup",
            "cook_fish",
            "cook_meat",
            "cook_dessert",
            "cook_signature",
            "cook_bread",
            "cook_dragon",
          ].includes(f)
        ),
    },
    text: "厨房の火を、そろそろ下ろす時が来た気がする。最後に、自分のために一皿だけ作ろう。",
    choices: [
      {
        conditions: { flags: ["cook_dragon"] },
        text: "ドラゴンステーキをもう一度、自分だけのために焼く",
        result: "誰にも出さない。煙の向こうに、あの日の沈黙だけが戻ってくる。献立の最後の一行は、竜の名で閉じられた。",
        effects: { health: 3, reputation: 5, addFlags: ["cook_farewell"], job: "retired" },
        log: { title: "食後　最後のドラゴンステーキ", text: "引退の日、頂点の一皿を自分のためにだけ焼いた。" },
      },
      {
        text: "初めて成功した味を再現する",
        result: "拙い手つきの頃の味が、今の腕の中に蘇る。誰かのための料理ではない。自分の献立の、最後の一行だ。",
        effects: { health: 5, addFlags: ["cook_farewell"], job: "retired" },
        log: { title: "食後　最後の一膳", text: "厨房を降りる日、初めの味をもう一度作った。" },
      },
      {
        text: "隠し味を弟子に託す",
        result: "ノートの端に、誰にも言わなかった割合を書いた。受け取った若者が、深く頭を下げる。",
        effects: {
          reputation: 5,
          addFlags: ["cook_farewell", "has_successor"],
          addNpc: { role: "pupil", age: [16, 22], trust: 60, intimacy: 40 },
          job: "retired",
        },
        log: { title: "食後　レシピを弟子に託す", text: "最後の一膳とともに、味の継承を決めた。" },
      },
      {
        conditions: { flags: ["cook_dragon"] },
        text: "竜肉のレシピだけを竈で燃やす",
        result: "紙が炎に巻かれる。猪も魚も残していい。だが竜だけは、自分の世代の秘密のままだ。",
        effects: { ability: -5, addFlags: ["cook_farewell"], job: "retired" },
        log: { title: "食後　竜のレシピを燃やす", text: "引退の日、ドラゴンステーキの秘伝だけを灰にした。" },
      },
      {
        text: "レシピを竈で燃やす",
        result: "紙が炎に巻かれ、香ばしい灰だけが残る。店の味は、自分の世代で終わりだ。",
        effects: { ability: -5, addFlags: ["cook_farewell"], job: "retired" },
        log: { title: "食後　レシピを燃やす", text: "厨房を去る日、秘伝を灰にした。" },
      },
    ],
  },

  // ---------- 冒険味のある仕入れ ----------
  {
    id: "cook_07",
    tags: ["young", "prime", "work", "cook", "adventure"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "魔物猪が大量発生しているらしい。畑を荒らす害獣だが、その肉を料理してみたいという衝動の方が強い。",
    choices: [
      {
        text: "自分で狩る",
        check: { stat: "health", difficulty: 55 },
        success: {
          result: "包丁を武器に替え、兵士や冒険者に交じって戦った。新鮮な肉を串焼きにして、戦友にふるまった。",
          effects: { ability: 1, health: -2, reputation: 2, addFlags: ["cook_meat"] },
          log: { title: "肉　魔物猪の串焼き", text: "自ら狩った猪を、戦友たちに振る舞った。" },
        },
        failure: {
          result: "牙がエプロンを裂いた。料理人の戦場は、やはり厨房だったらしい。",
          effects: { health: -8 },
        },
      },
      {
        text: "冒険者に依頼する",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "費用は掛かったが、冒険者は仕事を全うした。その足で店の常連にもなってくれた。",
          effects: { ability: 1, money: -20, reputation: 2, addFlags: ["cook_meat"] },
          log: { title: "肉　依頼狩りと猪料理", text: "冒険者に猪を獲らせ、その肉で店を賑わせた。" },
        },
        failure: {
          result: "冒険者は依頼に失敗した。金は戻らないが、傷が治ったら食べに来ると約束してくれた。",
          effects: { money: -20 },
        },
      },
      {
        text: "市場に出るのを待つ",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "伝手で精肉を取り寄せた。高くついたが、珍味として客には好評だった。",
          effects: { money: -30, reputation: 2, addFlags: ["cook_meat"] },
          log: { title: "肉　市場の魔物猪", text: "市場経由で魔物猪を仕入れ、珍味として出した。" },
        },
        failure: {
          result: "他の料理人に先を越された。「二番煎じ」と笑う客もいた。",
          effects: { reputation: -2 },
        },
      },
    ],
  },
  {
    id: "cook_08",
    tags: ["young", "prime", "work", "cook", "adventure"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    maxTimes: 3,
    conditions: { ageMin: 16, jobs: ["cook"] },
    text: "今年の潮は、うまい魚を運んでくるらしい。新鮮な一尾を、自分の手で皿に載せたい。",
    choices: [
      {
        text: "自分で釣る",
        check: { stat: "health", difficulty: 50 },
        success: {
          result: "船に乗り、釣竿を垂らした。地元の漁師に教わりながら魚を下ろす。塩一振りが、海そのものだった。",
          effects: { ability: 2, health: -2, addFlags: ["cook_fish"] },
          log: { title: "魚介　自分で釣った魚", text: "釣ったての魚を、その場の知恵で料理した。" },
        },
        failure: {
          result: "竿は揺れたが、桶は空のままだった。船酔いだけがお土産になる。",
          effects: { health: -5 },
        },
      },
      {
        text: "漁師に依頼する",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "仕入れは安くなかった。だが評判どおりの鮮度で、その日の売上はいつもの上をいった。",
          effects: { ability: 1, money: 10, reputation: 2, addFlags: ["cook_fish"] },
          log: { title: "魚介　特注の朝獲れ", text: "漁師に頼んだ特注の魚が、一日の売上を押し上げた。" },
        },
        failure: {
          result: "輸送中の事故で食材は届かず、前金だけが消えた。",
          effects: { money: -20 },
        },
      },
      {
        text: "市場に出るのを待つ",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "伝手で取り寄せた。高くついたが、新しい味は常連に大評判だった。",
          effects: { money: -25, reputation: 2, addFlags: ["cook_fish"] },
          log: { title: "魚介　市場の旬魚", text: "旬の魚を市場から確保し、常連を喜ばせた。" },
        },
        failure: {
          result: "良い魚はすべて先に引かれていた。後追いのメニューに、冷たい目が向けられる。",
          effects: { reputation: -2 },
        },
      },
    ],
  },
  // ---------- 生涯現役：枯れない日常仕事 ----------
  {
    id: "cook_common_01",
    tags: ["young", "prime", "elder", "work", "cook"],
    weight: 7,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    conditions: { ageMin: 16, jobs: ["cook"], notFlags: ["slave"] },
    text: "貧民街の角で、薄汚れた男が壁に凭れていた。「腹が空いた……」声だけが、細い。",
    choices: [
      {
        text: "残った煮込みを恵む",
        check: { chance: 55 },
        success: {
          result: "男は両手で器を抱え、「うまい……」と何度も呟いた。その日のうちに、通りの噂が店へ流れ込む。",
          effects: { money: -5, reputation: 2 },
          log: {
            title: "貧民に残飯を分ける",
            text: "空腹の男に煮込みを分け、路地の評判を少しだけ暖めた。",
          },
        },
        failure: {
          result: "翌日には「あの料理人は断れない」と噂が回り、店先にも路地にも、手を出す者が増えた。",
          effects: { money: -12, reputation: -2 },
          log: {
            title: "施しがつけ込まれる",
            text: "空腹への情けが、たかりの種になった。",
          },
        },
      },
      {
        text: "目を逸らし、通りすぎる",
        result: "足音だけが遠ざかる。厨房に戻ると、鍋の匂いがいつもより濃い。",
        effects: { health: -1 },
      },
    ],
  },
  {
    id: "cook_common_02",
    tags: ["young", "prime", "elder", "work", "cook"],
    weight: 6,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: { ageMin: 16, jobs: ["cook"], notFlags: ["slave"] },
    text: "奴隷商が厨房に現れた。鎖つきの者たちへ出す給食だという。「まずくていい。安くて、腹にたまるものだけ頼む」。",
    choices: [
      {
        text: "注文どおり、安く腹持ちだけを作る",
        result: "薄い粥と固い黒パン。依頼者は満足げに袋を置き、約束の報酬だけが残った。",
        effects: { money: 18, ability: -1 },
        log: {
          title: "奴隷給食を安く請け負う",
          text: "味より原価を優先し、奴隷商の注文をこなした。",
        },
      },
      {
        text: "自腹を切り、こっそり具を足す",
        result: "スープに豆と脂を忍ばせた。市場では「あの商会の奴隷は、最近血色がいい」と笑われた。自分の帳簿だけが、静かに赤字だ。",
        effects: { money: -15, reputation: 3, ability: 1 },
        log: {
          title: "奴隷給食に手心を加える",
          text: "原価を自分で補い、見えない皿の味をわずかに上げた。",
        },
      },
      {
        text: "そういう仕事は断る",
        result: "商は肩をすくめて去った。別の厨房が、安く請け負うだろう。",
        effects: { reputation: 1, money: -3 },
      },
    ],
  },
  {
    id: "cook_common_03",
    tags: ["young", "prime", "elder", "work", "cook"],
    weight: 7,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    conditions: { ageMin: 16, jobs: ["cook"], notFlags: ["slave"] },
    text: "兵舎から携行食の発注が来た。野外訓練用——運びやすく、腹を支え、あとで後悔しないものが要る。",
    choices: [
      {
        text: "がっつり肉の弁当にする",
        check: { chance: 65 },
        success: {
          result: "訓練後の兵士が、弁当の底まで平らげたという。次の行軍でも頼む、と使いが笑った。",
          effects: { money: 14, reputation: 2, ability: 1 },
          log: {
            title: "兵舎へ肉弁当",
            text: "野外訓練向けの肉弁当が、兵たちに受けた。",
          },
        },
        failure: {
          result: "報酬は入った。だが激しい動きの直後に重い肉は厳しく、腹を下す兵が出たという苦情が届く。",
          effects: { money: 14, reputation: -2 },
        },
      },
      {
        text: "腹持ちのよい柔らかいパン食にする",
        check: { chance: 65 },
        success: {
          result: "具を挟んだパンは手づかみで済み、休憩の短い隊にも好評だった。次は具の希望まで書き添えてきた。",
          effects: { money: 12, reputation: 2, ability: 1 },
          log: {
            title: "兵舎へ携行パン",
            text: "消化のよいパン食が、訓練の携行食になった。",
          },
        },
        failure: {
          result: "金は払われた。現場からは「量と脂が足りぬ」とだけ、短い紙が返ってきた。",
          effects: { money: 12, reputation: -2 },
        },
      },
    ],
  },
  {
    id: "cook_common_04",
    tags: ["young", "prime", "elder", "work", "cook"],
    weight: 6,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: { ageMin: 16, jobs: ["cook"], notFlags: ["slave"] },
    text: "継ぎはぎの法衣の神官が、扉の前で頭を下げた。孤児院の食が尽きかけている。余ったものでいい。助けてくれないか、と。",
    choices: [
      {
        text: "余ったスープとパンを分ける",
        result: "野菜の切れ端が浮く鍋と、余った生地を丸めたパンを渡した。神官は感謝して受け取った。",
        effects: { money: -8, reputation: 3 },
        log: {
          title: "孤児院へ残食を贈る",
          text: "厨房の余りを、孤児院の食卓へ回した。",
        },
      },
      {
        text: "年長の孤児を見習いとして雇う",
        result: "皿洗いと下拵えを教え、日当を持たせて帰した。手が足りる日が増え、店の朝も少し早くなった。",
        effects: { money: -6, ability: 2, reputation: 1 },
        log: {
          title: "孤児を厨房の見習いに",
          text: "年長の孤児に働きを教え、賃金を渡した。",
        },
      },
      {
        text: "今は余裕がないと断る",
        result: "神官は一度うなずき、礼だけ残して去った。釜の音が、いつもより大きく聞こえる。",
        effects: { health: -1 },
      },
    ],
  },

  // ---------- 種族客の好み料理（variants を増やすだけでセリフ違いを追加できる）----------
  ...cookRaceClient({
    id: "cook_dwarf",
    species: "dwarf",
    raceLabel: "ドワーフ",
    praise: "「これだ！　ワシの求めていた味だ」客は杯を掲げ、つまみの皿を空にする速度が上がった。",
    doubt: "「酒精が足りん！　塩も薄い！」怒号が店内を一周する。隣の席が、そっと勘定を済ませる。",
    variants: [
      {
        text: "カウンターで髭の男ががなり立てる。「酒だ、うんと強いのを！　つまみも忘れるなよ！」",
      },
      {
        text: "酔った客が卓を叩く。「肉汁を吸った芋だ！　それに上等のビールを！」",
        praise: "「これだよこれ」と何度も笑い、芋の皿が空になるたびに銀を追加していく。",
      },
      {
        text: "鉱夫上がりらしい客が、靴音も荒く入ってくる。「塩の効いたベーコンだ。野菜は芋しか認めん。酒も持ってこい」",
      },
    ],
  }),
  ...cookRaceClient({
    id: "cook_beastfolk",
    species: "beastfolk",
    raceLabel: "獣人",
    praise: "「故郷を出て、こんな味には久々だ」客は皿の縁まで舌を這わせる勢いで匙を動かす。",
    doubt: "鼻を鳴らした客が首を振る。「違う。どこが、とは言えんが——獣の腹は誤魔化せん」",
    variants: [
      {
        text: "「メニューにないものでいい？　生に近いお肉が食べたいの」猫耳の客が、小首をかしげる。",
      },
      {
        text: "毛皮の外套の客が、喉を鳴らすように言う。「狩ったばかりのジビエはないか」。",
        praise: "「うまい。血を抜きすぎていない」客は肉にかぶりつき、短い満足しか残さない。",
      },
      {
        text: "「素材の味の魚を。ほどよく冷まして出して」丸い瞳が、期待で光っている。",
      },
    ],
  }),
  ...cookRaceClient({
    id: "cook_elf",
    species: "elf",
    raceLabel: "エルフ",
    praise: "「森を思い出す。いい仕事だ」客は微笑み、薄い杯に唇をつけた。",
    doubt: "「伝統の模倣にすぎない」短い批評が耳に刺さる。皿は、ほとんど戻ってきた。",
    variants: [
      {
        text: "耳の長い客が静かに座る。「蒸した根菜を。ハーブは効かせて、余計な脂はつけないで」",
      },
      {
        text: "詩人じみた客が手帳を閉じる。「木の実を。森の恵みがわかる、自然な香りの果実を」",
        praise: "「懐かしい香りだ。今夜は筆がはかどる」チップの横に、短い詩が残る。",
      },
      {
        text: "魔術師らしい客が声を張る。「キノコだ！　栽培ものではない、森で採れたやつを！」",
        praise: "「この匂いでないと満足できない」客は深く息を吸い、再来を短く約束した。",
      },
    ],
  }),
  ...cookRaceClient({
    id: "cook_lizardfolk",
    species: "lizardfolk",
    raceLabel: "竜人",
    praise: "「火を噴く辛さだ。いい香辛料を使っている」客の尾が、機嫌よく揺れる。",
    doubt: "「バランスがめちゃくちゃだ。ただ辛ければいいわけではない」鋭い目が、鍋の方を見る。",
    variants: [
      {
        text: "鱗のある客が長い舌をちらつかせる。「辛いスープを。赤いやつだ」",
      },
      {
        text: "旅の商人らしき客が地図を畳む。「よく乾いた魚を、軽く炙って。合う薬酒も」",
        praise: "串を咀嚼した客が、一度だけ深くうなずいた。それ以上の言葉はない。",
      },
      {
        text: "異国の衣装の客が耳打ちする。「カエルの脚を、スパイスで揚げたものは出せるか」",
      },
    ],
  }),
  ...cookRaceClient({
    id: "cook_human",
    species: "human",
    raceLabel: "人間",
    praise: "「うまい！　こういうのが一番だ」客は満面で、空いた皿をカウンターに戻す。",
    doubt: "「悪くはないが、どこにでもある味だな」客は勘定だけ済ませ、早々に立つ。",
    variants: [
      {
        text: "「腹が減った！　とにかく量のあるやつを！」若い冒険者が、椅子にどかりと座る。",
      },
      {
        text: "「肉とパン、それとエール！」労働者らしい客が、入店と同時に注文する。",
      },
      {
        text: "魔術学院の制服らしい客が扉を開ける。「勉強で頭がぼんやりする。甘いものがほしい」",
      },
     {
        text: "みすぼらしい男が、じゃらじゃらと銅貨を散らして言った。「これで食えるだけ、なんでもいい！」",
        praise: "「うまい、うまい。何日ぶりの食事だろう」男は涙を流しながらかぶりついた。",
      },
    ],
  }),
]);


