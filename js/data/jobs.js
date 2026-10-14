// 職業の定義（数値はたたき台）
//   income     : 年収（数値 or [最小, 最大]）
//   livingCost : 年間の生活費。省略時は GAME.data.livingCost
// イベントの effects.job で就職・転職、effects.job: null で失業する。
GAME.data.livingCost = 40;

GAME.data.jobs = {
  apprentice: { name: "見習い", income: 30, livingCost: 20 },
  laborer: { name: "日雇い労働者", income: [20, 60] },
  farmer: { name: "農夫", income: 55 },
  craftsman: { name: "職人", income: 65 },
  merchant: { name: "商人", income: [30, 120] },
  soldier: { name: "兵士", income: 60 },
  adventurer: { name: "冒険者", income: [0, 160] },
  mage: { name: "魔術師", income: 90 },
  noble: { name: "貴族", income: 150, livingCost: 110 },
  slave: { name: "奴隷", income: 0, livingCost: 0 },
  retired: { name: "隠居", income: 0, livingCost: 25 },
};
