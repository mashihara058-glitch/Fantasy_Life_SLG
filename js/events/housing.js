// 住居の購入・転居
// 生活費は「職業の livingCost（なければ data.livingCost）＋ data.housing[id].livingCost」
//   none（間借り +0）→ house（一軒家 +35）→ mansion（豪邸 +90）
GAME.registerEvents([
  {
    id: "common_housing_house",
    tags: ["young", "prime", "money", "housing"],
    weight: 10,
    conditions: {
      ageMin: 20,
      ageMax: 55,
      moneyUnlocked: true,
      housing: ["none"],
      notFlags: ["slave"],
      notJobs: ["slave", "miner"],
      stats: { money: { min: 400 } },
    },
    text: "長年の貯えで、自分の家を持てそうだ。間借りをやめ、一軒家を買う話が現実味を帯びている。",
    choices: [
      {
        text: "一軒家を買う（400ゴールド）",
        conditions: { stats: { money: { min: 400 } } },
        result: "鍵を受け取った夜、壁を叩く音が自分の足音だけなのが、妙に新鮮だった。年間の暮らし向きは、確実に嵩む。",
        effects: { money: -400, housing: "house", reputation: 3 },
        log: {
          title: "一軒家を買う",
          text: "間借りをやめ、自分の家を持った。生活費が上がる。",
        },
      },
      {
        text: "もう少し貯めてからにする",
        result: "宿賃は安い。今は、まだ荷物をまとめる時ではない。",
      },
    ],
  },
  {
    id: "common_housing_mansion",
    tags: ["prime", "elder", "money", "housing"],
    weight: 8,
    conditions: {
      ageMin: 28,
      moneyUnlocked: true,
      housing: ["house"],
      notFlags: ["slave"],
      notJobs: ["slave", "miner"],
      stats: { money: { min: 1200 }, reputation: { min: 35 } },
    },
    text: "一軒家では手狭に感じる日が増えた。街の外れに、手が届きそうな豪邸の話が舞い込んできた。",
    choices: [
      {
        text: "豪邸へ移る（1200ゴールド）",
        conditions: { stats: { money: { min: 1200 } } },
        result: "広すぎる廊下に、自分の声が返ってくる。見栄と安心が同居する暮らしが始まった。維持費は、覚悟した通り重い。",
        effects: { money: -1200, housing: "mansion", reputation: 8 },
        log: {
          title: "豪邸に転居する",
          text: "一軒家から豪邸へ移った。生活費が大きく膨らむ。",
        },
      },
      {
        text: "今の家で十分だと断る",
        result: "使い慣れた柱に手を当てた。広さより、足の向きに合う家でいい。",
        effects: { health: 2 },
      },
    ],
  },
  // すでに裕福な者が、一軒家を飛ばして豪邸を狙う（高額）
  {
    id: "common_housing_mansion_direct",
    tags: ["prime", "money", "housing"],
    weight: 4,
    conditions: {
      ageMin: 30,
      moneyUnlocked: true,
      housing: ["none"],
      notFlags: ["slave"],
      notJobs: ["slave", "miner"],
      stats: { money: { min: 1600 }, reputation: { min: 45 } },
    },
    text: "間借りの身のまま、突然大きな金が手元にある。周りは「屋敷を持て」と噂する。",
    choices: [
      {
        text: "一気に豪邸を構える（1600ゴールド）",
        conditions: { stats: { money: { min: 1600 } } },
        result: "昨日まで間借りだった者が、門を構えた。噂は速い。請求書の速さも、それに負けない。",
        effects: { money: -1600, housing: "mansion", reputation: 10 },
        log: {
          title: "豪邸を一気に構える",
          text: "間借りから、直接豪邸の主人になった。",
        },
      },
      {
        text: "まずは堅実に一軒家から（400ゴールド）",
        conditions: { stats: { money: { min: 400 } } },
        result: "派手さはないが、鍵の感触は確かだった。",
        effects: { money: -400, housing: "house", reputation: 3 },
        log: {
          title: "一軒家を買う",
          text: "財はあるが、まず一軒家から始めた。",
        },
      },
      {
        text: "住居には手を出さない",
        result: "金は別のところへ回す。屋根は、当分借りものでいい。",
      },
    ],
  },
  {
    id: "common_housing_fire",
    tags: ["young", "prime", "elder", "money", "housing"],
    weight: 3,
    repeatable: true,
    cooldown: 12,
    conditions: {
      housing: ["house", "mansion"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "空気の乾いた冬の夜、不穏な気配で目を覚ました。火事だ——我が家が燃えている。",
    choices: [
      {
        text: "消火を試みる",
        check: { chance: 70 },
        success: {
          result: "幸い小火で済んだ。梁は残せたが、修理費はばかみたいな金額になりそうだ。",
          effects: { money: -100, health: -8 },
          log: { title: "自宅の火事を食い止める", text: "焼けは小さかったが、修理に金がかかった。" },
        },
        failure: {
          result: "火はもう手に負えなかった。命からがら飛び出すのが、精いっぱいだった。",
          effects: { housing: "none", health: -5, reputation: -2 },
          log: { title: "火事で家を失う", text: "冬の夜の火事に、住まいを焼かれた。" },
        },
      },
      {
        text: "すぐに避難する",
        result: "命より大事なものはない。{名前}は荷物を捨て、夜気の中へ走り出た。",
        effects: { housing: "none", health: -2 },
        log: { title: "火事で家を失う", text: "家は灰になったが、命までは失わなかった。" },
      },
    ],
  },
]);
