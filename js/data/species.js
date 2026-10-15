// 種族の定義
//   weight   : 抽選のされやすさ
//   lifespan : [最小, 最大] の範囲から寿命（プレイヤーには非公開）を抽選する
//   stats    : 初期ステータスへの補正（出自の初期値に加算）
GAME.data.species = {
  human: { name: "人間", weight: 60, lifespan: [55, 85], stats: {} },
  dwarf: { name: "ドワーフ", weight: 15, lifespan: [150, 300], stats: { ability: 10, health: -10 } },
  beastfolk: { name: "獣人", weight: 15, lifespan: [45, 70], stats: { health: 15, reputation: -10 } },
  elf: { name: "エルフ", weight: 5, lifespan: [400, 600], stats: { ability: 5 } },
  lizardfolk: { name: "竜人", weight: 5, lifespan: [50, 200], stats: { health: 15, ability: -5, reputation: -5 } },
  // 例：エルフを追加する場合
  // elf: { name: "エルフ", weight: 10, lifespan: [400, 600], stats: { ability: 5 } },
};

// 新しい人生で抽選される種族
GAME.data.enabledSpecies = ["human", "dwarf", "beastfolk","elf","lizardfolk"];

// チェンジリング（取り換え子）
//   種族に関係なく、ごくまれに妖精の特徴を持って生まれる。
//   flags のフラグを生まれつき持つので、イベント側では
//   conditions.flags: ["changeling"] / notFlags: ["changeling"] や weightMods で扱う。
GAME.data.changeling = {
  name: "取り換え子",
  chance: 0.03,
  stats: { ability: 10, reputation: -10, health: -5 },
  flags: ["changeling", "magic_spark"],
};
