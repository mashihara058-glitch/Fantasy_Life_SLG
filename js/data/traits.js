// 性格傾向
//   stats  : 初期ステータスへの補正
//   innate : false にすると生まれつきは選ばれず、イベントの addTraits でのみ身につく
// イベント側では次のように参照できる。
//   conditions.traitsAny : いずれかの性格を持つ
//   conditions.notTraits : いずれの性格も持たない
//   effects.addTraits / removeTraits : 性格を加える・消す
// choices[].conditions に書けば「その性格の人だけが選べる選択肢」になる。
GAME.data.traits = {
  diligent: { name: "勤勉", stats: { ability: 5 } },
  curious: { name: "好奇心旺盛", stats: { ability: 3 } },
  gentle: { name: "温厚", stats: { reputation: 5 } },
  ambitious: { name: "野心家", stats: { reputation: 2 } },
  timid: { name: "臆病", stats: { health: 3 } },
  sturdy: { name: "頑丈", stats: { health: 10 } },

  // 人生の中で身につく性格
  brave: { name: "勇敢", innate: false },
  distrustful: { name: "人間不信", innate: false },
  vengeful: { name: "復讐", innate: false },
  worldweary: { name: "厭世", innate: false },
};

// effects.loseNpc で人物を失ったときに付く性格
//   その人物との（信頼 + 親密）÷ 2 が bondThreshold 以上なら high、未満なら low
//   loseNpc に trait: false を書くと付かない
GAME.data.lossTraits = {
  bondThreshold: 60,
  high: "vengeful",
  low: "worldweary",
};

// 1人あたりの生まれつきの性格の数 [最小, 最大]
GAME.data.traitCount = [1, 2];
