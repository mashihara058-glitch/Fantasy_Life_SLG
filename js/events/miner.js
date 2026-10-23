//鉱夫用イベント
     GAME.registerEvents([

        {
  id: "miner_001",
  tags: ["miner"],
  weight: 10,
  conditions: {
    jobs: ["miner"]
  },
  text: "いつものように、ツルハシを振るっていた。\n岩盤の隙間から見慣れない色が見えたのは気のせいではなかった。\n高価な鉱物を偶然掘り当ててしまったようだ。",
  choices: [
    {
      text: "鉱物を隠し持つ",
      check: { chance: 25 },
      success: {
        result: "主人にはバレなかった。鉱夫らの間で開通された闇ルートで売却して大金を得た。",
        effects: { money: 200 },
      },
      failure: {
        result: "主人にバレた。こっぴどく殴られ、ツルハシを没収された。",
        effects: { heath: [-30,-10], reputation: -10 },
      },
    },
    {
      text: "主人に報告する",
      result: "鉱物は売却され、大金を手に入れた主人が{名前}に見返りを渡すことはなかった。",
    }
  ],
},

     ]);