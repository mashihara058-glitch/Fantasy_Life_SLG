// 鉱夫用イベント
GAME.registerEvents([
  {
    id: "miner_001",
    tags: ["young", "prime", "elder", "work", "miner"],
    weight: 10,
    repeatable: true,
    cooldown: 5,
    maxTimes: 3,
    conditions: {
      // 鉱山奴隷は job: miner のまま flags.slave が残る（解放まで）
      jobs: ["miner"],
      moneyUnlocked: true,
    },
    text: "いつものように、ツルハシを振るっていた。岩盤の隙間から見慣れない色が見えたのは、気のせいではなかった。高価な鉱物を偶然掘り当ててしまったようだ。",
    choices: [
      {
        text: "鉱物を隠し持つ",
        check: { chance: 25 },
        success: {
          result: "主人にはバレなかった。鉱夫らの間で開通された闇ルートで売却し、大金を得た。",
          effects: { money: 200, addFlags: ["miner_black_market"] },
          log: { title: "鉱物を闇で売り抜ける", text: "主人の目を盗んで、掘り当てた鉱物を売り払った。" },
        },
        failure: {
          result: "主人にバレた。こっぴどく殴られ、ツルハシを没収された。",
          effects: { health: [-30, -10], reputation: -10, ability: -3 },
          log: { title: "隠し持った鉱物がばれる", text: "主人に見つかり、罰を受けた。" },
        },
      },
      {
        text: "主人に報告する",
        result: "鉱物は売却された。大金を手にした主人が、{名前}に見返りを渡すことはなかった。報いはなかったが、咎められることもなかった。",
        effects: { reputation: 2 },
      },
    ],
  },
  {
    id: "miner_002",
    tags: ["young", "prime", "elder", "work", "miner"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: {
      jobs: ["miner"],
    },
    text: "今日も今日とて、鉱石掘りだ。",
    choices: [
      {
        text: "勤勉に働く",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "真面目な態度を褒められた。腰は重いが、監督の目は少しだけ柔らかい。",
          effects: { ability: 1, reputation: 1, health: -2 },
        },
        failure: {
          result: "「気合が足りん」と、叱られた。",
          effects: { health: -2 },
        },
      },
      {
        text: "さぼる",
        check: { chance: 55 },
        success: {
          result: "監督の目を盗んで、こっそり休憩した。",
          effects: { health: 2 },
        },
        failure: {
          result: "見つかって、こっぴどく叱られた。",
          effects: { health: -2, reputation: -2 },
        },
      },
    ],
  },
  {
    id: "miner_003",
    tags: ["young", "prime", "elder", "work", "miner"],
    weight: 9,
    repeatable: true,
    cooldown: 6,
    conditions: {
      jobs: ["miner"],
      moneyUnlocked: true,
    },
    text: "近頃、どんどんノルマが上がっている。",
    choices: [
      {
        text: "なぜなのかと問う",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "事情を聞き出せた。監督曰く、「鉄鉱石の需要が増えて、掘れば掘るだけ売れる」とのことらしい。",
          effects: { ability: 1, reputation: 1, addFlags: ["miner_heard_demand"] },
          log: { title: "鉄の需要増を耳にする", text: "ノルマ上昇の裏に、鉄鉱石の売れ行きがあると知った。" },
        },
        failure: {
          result: "「くだらないことを詮索するな」と怒られた。",
          effects: { health: -1 },
        },
      },
      {
        text: "ボーナスを交渉する",
        check: { chance: 40 },
        success: {
          result: "これだけ働いているのだから寸志を出せと交渉したところ、ほんの少し銀が出た。",
          effects: { money: 5, reputation: 1 },
        },
        failure: {
          result: "報酬を上げろと要求したら、「奴隷風情が生意気だ」と叱られた。",
          effects: { reputation: -2, health: -1 },
        },
      },
      {
        text: "黙ってツルハシを振る",
        result: "理由を問わず、ノルマだけを満たした。坑道の響は、いつもと変わらない。",
        effects: { health: -1, ability: 1 },
      },
    ],
  },
  {
    id: "miner_004",
    tags: ["young", "prime", "elder", "work", "miner"],
    weight: 8,
    repeatable: true,
    cooldown: 7,
    maxTimes: 2,
    conditions: {
      jobs: ["miner"],
    },
    text: "年老いた同僚が、荷物が重すぎてへばっている。",
    choices: [
      {
        text: "手を貸す",
        check: { stat: "reputation", difficulty: 48 },
        success: {
          result: "同僚は礼を言い、ついでに雑談を交わした。「ワシはもとは農夫だった。怪しいヤツの扇動に乗ってしまってな……」坑道の埃の下で、遠い村の話が短く落ちる。",
          effects: { reputation: 2, health: -1, addFlags: ["miner_heard_revolt"] },
          log: { title: "元農夫の鉱夫から一揆の話を聞く", text: "荷を手伝い、扇動に乗った末路を耳にした。" },
        },
        failure: {
          result: "それを見ていた周囲が、「これも運べ」と荷物を押し付けてきた。",
          effects: { health: -3 },
        },
      },
      {
        text: "見て見ぬふりをする",
        result: "自分のノルマで精一杯だ。老人の息は、やがて坑道の音に溶ける。",
        effects: { reputation: -1 },
      },
    ],
  },
  {
    id: "miner_005",
    tags: ["young", "prime", "elder", "work", "miner"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["miner"],
      moneyUnlocked: true,
    },
    text: "汗だくで働き、粗末な食事をとったあと。宿舎でちょっとした余興が催された。敷物の上に、サイコロが数個転がっている。",
    choices: [
      {
        text: "小さく賭ける",
        check: { chance: 45 },
        success: {
          result: "二つのサイコロがころころと転がる。出目はよい。投げ手の分が、掌に戻ってくる。",
          effects: { money: 8 },
        },
        failure: {
          result: "二つのサイコロがころころと転がる。ポイントから外れた。負けだ。",
          effects: { money: -8 },
        },
      },
      {
        text: "大きく賭ける",
        check: { chance: 25 },
        success: {
          result: "当てずっぽうの一投が見事に的中した。その後も手堅い勝ちが続き、ゲームが終わるころには懐がずいぶん重い。",
          effects: { money: 25, reputation: 1 },
        },
        failure: {
          result: "シューターが一周しても、ディーラーの笑みは余裕のままだ。今夜の銀は、ほとんど消えた。",
          effects: { money: -20 },
        },
      },
      {
        text: "参加しない",
        result: "サイコロの音を背に、早く寝た。明日も、坑は待っている。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "miner_006",
    tags: ["young", "prime", "elder", "work", "miner"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["miner"],
    },
    text: "ノルマ達成まであと少しというところで、カナリアが鳴き止んだ。今から場所を変えるのはおっくうだ。どうする。",
    choices: [
      {
        text: "そのまま掘る",
        check: { chance: 55 },
        success: {
          result: "作業員同士声を掛け合いながら、速やかに、慎重に掘り進んだ。カナリアは再び鳴かなかったが、ノルマは達成できた。",
          effects: { health: -1, ability: 1 },
        },
        failure: {
          result: "掘り進んだ先で、作業員の一人が倒れた。惜しいが、ここはもうだめだ。{名前}たちは後退した。",
          effects: { health: -5 },
          log: { title: "坑内のガスに危うくやられる", text: "カナリアの沈黙を押し切り、仲間が倒れて撤退した。" },
        },
      },
      {
        text: "それでも場所を変える",
        result: "安全には代えられない。残業になるが、仕方ない。",
        effects: { health: -1, ability: 1 },
      },
    ],
  },
  {
    id: "miner_007",
    tags: ["young", "prime", "elder", "work", "miner"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      jobs: ["miner"],
    },
    text: "深夜、不審な物音で目が覚めた。どうやら泥棒のようだ。誰かが、保管された鉱石を運び出している。",
    choices: [
      {
        text: "知らせる",
        check: { chance: 70 },
        success: {
          result: "泥棒には逃げられたが、鉱石は無事だった。監督に「よく知らせてくれた」と褒められた。",
          effects: { ability: 1, reputation: 2 },
        },
        failure: {
          result: "泥棒は追い払えたが、いくらかの鉱石は持ち去られた後だった。翌日は眠い目で、盗まれた分の補填に追われた。",
          effects: { health: -2 },
        },
      },
      {
        // 鉱山奴隷のまま job: miner。成功時に slave を外し逃亡者へ
        conditions: { flags: ["slave"] },
        text: "混乱に乗じて脱走する",
        check: { chance: 30 },
        success: {
          result: "泥棒の侵入経路を探し当て、そこから逃げ出した。鎖の重さだけが、夜風のなかで消えていく。",
          effects: {
            job: null,
            removeFlags: ["slave"],
            addFlags: ["fugitive"],
            housing: "none",
          },
          log: {
            title: "鉱山から脱走する",
            text: "盗賊騒ぎに紛れ、坑の外へ逃げた。",
          },
        },
        failure: {
          result: "逃げ出そうとしたのがばれた。泥棒の共犯と疑われ、尋問を受けた。",
          effects: { health: -5, reputation: -5 },
        },
      },
      {
        conditions: { notFlags: ["slave"] },
        text: "自分の寝床に戻る",
        result: "関われば面倒だ。足音が遠ざかるまで、目を閉じたままにした。",
        effects: { reputation: -1 },
      },
    ],
  },
]);
