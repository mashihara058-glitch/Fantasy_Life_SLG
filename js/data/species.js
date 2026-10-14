// 種族の定義。lifespan は [最小, 最大] の範囲から寿命（プレイヤーには非公開）を抽選する。
GAME.data.species = {
  human: { name: "人間", lifespan: [55, 85] },
  // 例：エルフを追加する場合
  // elf: { name: "エルフ", lifespan: [400, 600] },
};

// 新しい人生で抽選される種族
GAME.data.enabledSpecies = ["human"];
