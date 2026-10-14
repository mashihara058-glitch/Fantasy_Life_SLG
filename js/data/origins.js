// 出自の定義
//   weight        : 抽選のされやすさ
//   stats         : 初期ステータス（数値 or [最小, 最大]）
//   startingMoney : 家計が解放されたとき（就職・独り立ち）に受け取る所持金
GAME.data.origins = {
  farmer: {
    name: "農家",
    weight: 40,
    stats: { health: [60, 80], ability: [15, 35], reputation: [20, 35] },
    startingMoney: 20,
  },
  craftsman: {
    name: "職人の家",
    weight: 25,
    stats: { health: [55, 75], ability: [25, 40], reputation: [25, 40] },
    startingMoney: 40,
  },
  merchant: {
    name: "商家",
    weight: 25,
    stats: { health: [50, 70], ability: [25, 45], reputation: [30, 45] },
    startingMoney: 80,
  },
  noble: {
    name: "貴族",
    weight: 10,
    stats: { health: [50, 70], ability: [30, 50], reputation: [45, 60] },
    startingMoney: 300,
  },
};
