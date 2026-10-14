// 性格傾向。stats は初期ステータスへの補正。
// イベント側では conditions.traitsAny や choices[].conditions.traitsAny で参照できる。
GAME.data.traits = {
  diligent: { name: "勤勉", stats: { ability: 5 } },
  curious: { name: "好奇心旺盛", stats: { ability: 3 } },
  gentle: { name: "温厚", stats: { reputation: 5 } },
  ambitious: { name: "野心家", stats: { reputation: 2 } },
  timid: { name: "臆病", stats: { health: 3 } },
  sturdy: { name: "頑丈", stats: { health: 10 } },
};

// 1人あたりの性格傾向の数 [最小, 最大]
GAME.data.traitCount = [1, 2];
