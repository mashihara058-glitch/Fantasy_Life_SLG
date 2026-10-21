// 日雇い労働者
// 単発の日雇い仕事は少なめ・軽め。いい働きのあと「うちで働かないか」系の転職を厚くする
GAME.registerEvents([
  // ---------- 日雇いの仕事（少なめ）----------
  {
    id: "laborer_001",
    tags: ["young", "prime", "work", "laborer"],
    weight: 8,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 16, jobs: ["laborer"] },
    text: "今日の仕事は城壁の修理だ。石と土が、朝から積み上げられている。",
    choices: [
      {
        text: "運搬を担当する",
        check: { stat: "health", difficulty: 45 },
        success: {
          result: "重い資材を何度も往復した。「いい働きっぷりだ」と、親方が給金を上乗せしてくれた。",
          effects: { money: 8, addFlags: ["laborer_wall"] },
        },
        failure: {
          result: "足をくじき、荷を落とせないまま座り込んだ。その日の給金は半分だ。",
          effects: { health: -5, money: -3 },
        },
      },
      {
        text: "高所で補修作業をする",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "梯子の上でコテを走らせる。なめらかな壁面に、職人見習いの目が止まった。",
          effects: { reputation: 2, ability: 1, addFlags: ["laborer_wall"] },
        },
        failure: {
          result: "足場から落ちて腰を強打した。城壁より、自分の骨の方が危うい。",
          effects: { health: -8 },
        },
      },
      { text: "この仕事は見送る" },
    ],
  },
  {
    id: "laborer_002",
    tags: ["young", "prime", "work", "laborer"],
    weight: 7,
    repeatable: true,
    cooldown: 5,
    conditions: { ageMin: 16, jobs: ["laborer"] },
    text: "下水道の流れが悪い。誰もやりたがらない清掃を、今日は引き受ける番だ。",
    choices: [
      {
        text: "ヘドロを掻き出す",
        check: { stat: "health", difficulty: 50 },
        success: {
          result: "排水溝のごみを取り除くと、水が勢いよく流れ出した。臭いは残るが、町は一息ついた。",
          effects: { money: 10, addFlags: ["laborer_sewer"] },
        },
        failure: {
          result: "ヘドロの中にスライムがいた。驚いて尻もちをつき、酸で服が溶ける。",
          effects: { health: -6 },
        },
      },
      {
        text: "詰まりの原因を調べる",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "倒木がはまっている箇所を見つけ、印をつけた。「頭も使えるのか」と、監督が目を細めた。",
          effects: { reputation: 2, ability: 1, addFlags: ["laborer_sewer"] },
        },
        failure: {
          result: "暗がりで巨大ネズミの群れに囲まれた。棒切れでは多勢に無勢だ。",
          effects: { health: -7 },
        },
      },
      { text: "この仕事は見送る" },
    ],
  },
  {
    id: "laborer_003",
    tags: ["young", "prime", "work", "laborer"],
    weight: 7,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 16, jobs: ["laborer"] },
    text: "今日の仕事は引っ越しの手伝いだ。家具と箱が、道いっぱいに並んでいる。",
    choices: [
      {
        text: "黙々と運ぶ",
        check: { stat: "health", difficulty: 40 },
        success: {
          result: "予定より早く終わった。依頼の老婆が、そっとチップを握らせてくれた。",
          effects: { money: 12 },
        },
        failure: {
          result: "積み荷が台車から落ち、拾い直すうちに日が暮れた。追加の給金はない。",
          effects: { reputation: -1 },
        },
      },
      {
        text: "依頼者と話しながら働く",
        check: { stat: "reputation", difficulty: 40 },
        success: {
          result: "夫を亡くし家が広くなった、という話を聞いた。帰り際、薬草茶とお茶請けをごちそうになった。",
          effects: { reputation: 2, health: 3, addFlags: ["laborer_kind"] },
        },
        failure: {
          result: "「口じゃなくて手を動かせ」と叱られた。",
          effects: { reputation: -2 },
        },
      },
      { text: "この仕事は見送る" },
    ],
  },
  {
    id: "laborer_004",
    tags: ["young", "prime", "work", "laborer"],
    weight: 8,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 16, jobs: ["laborer"] },
    text: "農家からの急ぎの依頼だ。雨雲が近づいている。収穫を間に合わせねばならない。",
    choices: [
      {
        text: "黙々と刈る",
        check: { stat: "health", difficulty: 40 },
        success: {
          result: "畝を端から端まで走った。農家は「助かった」と、袋に野菜を詰めてくれた。",
          effects: { money: 10, addFlags: ["laborer_farm"] },
        },
        failure: {
          result: "途中で膝が笑い、座り込んだ。「さぼるな」と叱られる。",
          effects: { reputation: -1, health: -3 },
        },
      },
      {
        text: "農家と段取りを話し合う",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "「また頼むよ」と言いながら、とれたての野菜を鍋にしてふるまってくれた。顔を覚えられた気がする。",
          effects: { reputation: 2, health: 3, addFlags: ["laborer_farm"] },
        },
        failure: {
          result: "「口じゃなくて手を動かせ」と叱られた。雨は待ってくれない。",
          effects: { reputation: -2 },
        },
      },
      { text: "この仕事は見送る" },
    ],
  },
  {
    id: "laborer_005",
    tags: ["young", "prime", "work", "laborer", "adventure"],
    weight: 6,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    conditions: { ageMin: 16, jobs: ["laborer"] },
    text: "下水道で増えたスライムが町にあふれている。冒険者だけでは足りず、「少しでも戦えるものは出てこい」と触れが出た。",
    choices: [
      {
        text: "前線で戦う",
        check: { stat: "health", difficulty: 45 },
        success: {
          result: "棒切れと鍋の蓋で持ちこたえた。本職には及ばないが、隣の冒険者が「悪くない」と顎をしゃくった。",
          effects: { money: 12, reputation: 2, addFlags: ["laborer_fight"] },
          log: { title: "スライム騒動で奮戦する", text: "日雇いの身で討伐に加わり、働きを見られた。" },
        },
        failure: {
          result: "酸を浴びて火傷を負った。治療は無料だったが、数日は重い。",
          effects: { health: -10 },
        },
      },
      {
        text: "後方で物資を回す",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "地図を読み、人手と水を配った。指揮をしていた兵士が、名前を聞いてきた。",
          effects: { money: 10, reputation: 2, ability: 1, addFlags: ["laborer_fight"] },
        },
        failure: {
          result: "「余計な指図をするな」と一喝された。",
          effects: { reputation: -2 },
        },
      },
      { text: "騒ぎに関わらない" },
    ],
  },

  // ---------- 転職の誘い（多め・ここが本体）----------
  {
    id: "laborer_job_farmer",
    tags: ["young", "prime", "work", "laborer", "career"],
    weight: 14,
    conditions: {
      ageMin: 17,
      ageMax: 45,
      jobs: ["laborer"],
      flags: ["laborer_farm"],
      notFlags: ["laborer_offered_farm"],
    },
    text: "収穫を手伝ったあの農家が、土間で待っていた。「毎年人手が足りん。うちで、ちゃんと雇わねえか」",
    choices: [
      {
        text: "百姓として働くことにする",
        effects: { job: "farmer", reputation: 3, addFlags: ["laborer_offered_farm"] },
        log: { title: "日雇いから農家へ落ち着く", text: "何度も手伝った畑で、定職を得た。" },
      },
      {
        text: "もう少し自由でいたいと断る",
        effects: { addFlags: ["laborer_offered_farm"] },
      },
    ],
  },
  {
    id: "laborer_job_apprentice",
    tags: ["young", "prime", "work", "laborer", "career"],
    weight: 14,
    conditions: {
      ageMin: 16,
      ageMax: 30,
      jobs: ["laborer"],
      flags: ["laborer_wall"],
      notFlags: ["laborer_offered_craft"],
      stats: { ability: { min: 30 } },
    },
    text: "城壁の現場で目が合った職人が、休みの合図のあと声をかけてきた。「手先が器用だな。うちの工房で、見習いにならんか」",
    choices: [
      {
        text: "見習いとして弟子入りする",
        effects: {
          job: "apprentice",
          ability: 2,
          addFlags: ["laborer_offered_craft"],
          addNpc: { role: "mentor", age: [35, 55], trust: 40, intimacy: 20 },
        },
        log: { title: "日雇いから職人見習いへ", text: "城壁の仕事ぶりを見込まれ、工房の門をくぐった。" },
      },
      {
        text: "今はまだ早いと断る",
        effects: { addFlags: ["laborer_offered_craft"], reputation: 1 },
      },
    ],
  },
  {
    id: "laborer_job_soldier",
    tags: ["young", "prime", "work", "laborer", "career"],
    weight: 12,
    conditions: {
      ageMin: 17,
      ageMax: 35,
      jobs: ["laborer"],
      flags: ["laborer_fight"],
      notFlags: ["laborer_offered_soldier"],
      stats: { health: { min: 35 } },
    },
    text: "スライム騒動のとき指揮していた兵士が、兵舎の前で呼び止めた。「戦力になる。王国軍に来い」",
    choices: [
      {
        text: "兵士に志願する",
        check: { stat: "health", difficulty: 40 },
        success: {
          result: "体格を見込まれ、その場で名簿に名を書かれた。",
          effects: { job: "soldier", reputation: 3, addFlags: ["laborer_offered_soldier"] },
          log: { title: "日雇いから王国軍の兵士へ", text: "騒動での働きを見込まれ、兵籍に入った。" },
        },
        failure: {
          result: "体力が足りないと突き返された。だが「鍛えてまた来い」とは言われた。",
          effects: { reputation: 1, addFlags: ["laborer_offered_soldier"] },
        },
      },
      {
        text: "剣より日銭の方が性に合うと断る",
        effects: { addFlags: ["laborer_offered_soldier"] },
      },
    ],
  },
  {
    id: "laborer_job_adventurer",
    tags: ["young", "prime", "work", "laborer", "career"],
    weight: 11,
    conditions: {
      ageMin: 17,
      ageMax: 40,
      jobs: ["laborer"],
      flags: ["laborer_fight"],
      notFlags: ["laborer_offered_adventurer"],
    },
    text: "騒動のあと、冒険者ギルドの受付が声をかけてきた。「鍋の蓋で戦う奴は珍しい。登録してみろ」",
    choices: [
      {
        text: "冒険者ギルドに登録する",
        effects: { job: "adventurer", ability: 2, addFlags: ["laborer_offered_adventurer"] },
        log: { title: "日雇いから冒険者へ", text: "スライム騒動をきっかけに、ギルドへ名を載せた。" },
      },
      {
        text: "命がけの仕事はごめんだと断る",
        effects: { addFlags: ["laborer_offered_adventurer"], health: 2 },
      },
    ],
  },
  {
    id: "laborer_job_merchant",
    tags: ["young", "prime", "work", "laborer", "career"],
    weight: 10,
    conditions: {
      ageMin: 18,
      ageMax: 50,
      jobs: ["laborer"],
      flags: ["laborer_sewer"],
      notFlags: ["laborer_offered_merchant"],
      stats: { reputation: { min: 25 } },
    },
    text: "汚れた仕事を厭わなかったのが噂になったのか、行商の親方が声をかけてきた。「荷物持ちじゃなく、商売の手足になってくれ」",
    choices: [
      {
        text: "商人の手伝いとして働く",
        effects: { job: "merchant", reputation: 2, money: 20, addFlags: ["laborer_offered_merchant"] },
        log: { title: "日雇いから商人の道へ", text: "汚い仕事も厭わない姿勢を見込まれ、商売の世界に入った。" },
      },
      {
        text: "帳面より体を動かす方がいいと断る",
        effects: { addFlags: ["laborer_offered_merchant"] },
      },
    ],
  },
  {
    id: "laborer_job_cook",
    tags: ["young", "prime", "work", "laborer", "career"],
    weight: 10,
    conditions: {
      ageMin: 17,
      ageMax: 40,
      jobs: ["laborer"],
      flags: ["laborer_kind"],
      notFlags: ["laborer_offered_cook"],
    },
    text: "引っ越しを手伝った老婆の紹介で、町の飯屋の主人が現れた。「人柄がよさそうだ。厨房の手伝いをしないか」",
    choices: [
      {
        text: "料理人として働き始める",
        effects: { job: "cook", reputation: 2, addFlags: ["laborer_offered_cook", "cooking"] },
        log: { title: "日雇いから料理人へ", text: "人づてに飯屋へ招かれ、厨房に立った。" },
      },
      {
        text: "火を使う仕事は自信がないと断る",
        effects: { addFlags: ["laborer_offered_cook"] },
      },
    ],
  },
]);
