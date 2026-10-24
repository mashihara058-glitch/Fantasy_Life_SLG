// 職業の定義（数値はたたき台）
//   income     : 年収（数値 or [最小, 最大]）
//   livingCost : 年間の生活費。省略時は GAME.data.livingCost
// イベントの effects.job で就職・転職、effects.job: null で失業する。
GAME.data.livingCost = 40;

// 住居。年間生活費は「職業の livingCost（なければ livingCost）＋住居の livingCost」
// state.housing に id を持つ。effects.housing で変更。conditions.housing で絞り込み可。
GAME.data.housing = {
  none: { name: "間借り", livingCost: 0 },
  house: { name: "一軒家", livingCost: 35 },
  mansion: { name: "豪邸", livingCost: 90 },
};

GAME.data.jobs = {
  apprentice: { name: "見習い", income: 20, livingCost: 15 },
  laborer: { name: "日雇い労働者", income: [15, 40] },
  farmer: { name: "農夫", income: 45 },
  craftsman: { name: "職人", income: 55 },
  master_craftsman: { name: "名工", income: 75 },
  merchant: { name: "商人", income: [30, 80] },
  cook: { name: "料理人", income: [20, 70] },
  medic: { name: "薬師", income: [20, 70] },
  soldier: { name: "兵士", income: 50 },
  knight: { name: "騎士", income: 70 },
  adventurer: { name: "冒険者", income: [0, 80] },
  mage: { name: "魔術師", income: 80 },
  wizard:{ name:"上級魔術師", income: 100 },
  noble: { name: "貴族", income: 150, livingCost: 110 },
  slave: { name: "奴隷", income: 0, livingCost: 0 },
  miner: { name: "鉱夫", income: [0,5], livingCost: 0 },
  prostitute: { name: "娼婦", income: [30,55], livingCost: 25 },
  mistress:{ name: "愛人", income: 60, livingCost: 20 },
  retired: { name: "隠居", income: 0, livingCost: 25 },
  gambler: { name: "博打師", income: [-50,100], livingCost: 50 },
};
