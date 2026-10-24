// 鉱夫用イベント
GAME.registerEvents([
  {
    id: "miner_001",
    tags: ["miner"],
    weight: 10,
    // 提案: 他職イベント同様、repeatable: true と cooldown を付けると連発しにくい
    // repeatable: true,
    // cooldown: 5,
    conditions: {
      jobs: ["miner"],
      // 提案: 闇ルート売却で所持金を動かすなら、家計解放済みを明示してもよい
      // （slave→miner 転職時は自動で unlock されるが、念のため）
      // moneyUnlocked: true,
    },
    text: "いつものように、ツルハシを振るっていた。\n岩盤の隙間から見慣れない色が見えたのは気のせいではなかった。\n高価な鉱物を偶然掘り当ててしまったようだ。",
    choices: [
      {
        text: "鉱物を隠し持つ",
        check: { chance: 25 },
        success: {
          result: "主人にはバレなかった。鉱夫らの間で開通された闇ルートで売却して大金を得た。",
          effects: { money: 200 },
          // 提案: 大きな転機なら年表用 log を付けると振り返りやすい
          // log: { title: "鉱物を闇で売り抜ける", text: "主人の目を盗んで、掘り当てた鉱物を売り払った。" },
        },
        failure: {
          result: "主人にバレた。こっぴどく殴られ、ツルハシを没収された。",
          // 修正済み: heath → health（typo。このままだと体力が減らない）
          effects: { health: [-30, -10], reputation: -10 },
          // 提案: ツルハシ没収のニュアンスを効果でも示すなら ability 減少など
          // effects: { health: [-30, -10], reputation: -10, ability: -5 },
        },
      },
      {
        text: "主人に報告する",
        // 提案: 現状は効果なし。報告しても何も変わらないので、わずかな信頼やダメージ回避などがあると意図が伝わりやすい
        // result: "鉱物は売却され、大金を手に入れた主人が{名前}に見返りを渡すことはなかった。報いはなかったが、咎められることもなかった。",
        // effects: { reputation: 2 },
        result: "鉱物は売却され、大金を手に入れた主人が{名前}に見返りを渡すことはなかった。",
      },
    ],
  },
]);
