// 冒険者の仕事イベント
// 討伐は難易度の階段、006以降は探索・装備・遭遇のバリエーション
GAME.registerEvents([
  // ---------- 討伐（難易度の階段）----------
  {
    id: "adventurer_001",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 17, jobs: ["adventurer"], jobYearsMin: 10 },
    weight: 8,
    repeatable: true,
    cooldown: 6,
    logOnce: true,
    maxTimes: 2,
    text: "ギルドの掲示板の最上段に、赤い札が刺さっている。竜の巣の調査——報酬は破格、生還率は書かれていない。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "硫黄の匂いのする崖を越え、眠る竜の脇を抜けた。持ち帰った鱗の一枚が、ギルド中の噂になる。",
          effects: { money: 150, reputation: 10, ability: 5, addFlags: ["dragon_survey"] },
          log: { title: "竜の巣の調査に成功する", text: "危険な依頼を成し遂げ、名を上げた。" },
        },
        failure: {
          result: "翼の影が地面を覆った翌瞬間、吐息が岩を熔かした。命だけは拾って逃げ帰った。",
          effects: { health: [-35, -15] },
          log: { title: "竜の吐息に焼かれる", text: "竜の巣の調査に失敗し、深手を負った。" },
        },
      },
      {
        text: "地道な依頼に差し替える",
        effects: { money: 30, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_002",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 15, jobs: ["adventurer"] },
    weight: 12,
    repeatable: true,
    cooldown: 2,
    text: "掲示板の端に、子どもでも読めそうな字で「スライム討伐」とある。報酬は少ないが、ギルドの仕事は仕事だ。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 20 },
        success: {
          result: "粘液をかき分け、核を潰す。靴は溶けるが、依頼は完了だ。",
          effects: { money: 20, reputation: 1, ability: 1 },
        },
        failure: {
          result: "踏み込みが浅く、靴ごと包まれた。なんとか抜け出したが、臭いが取れない。",
          effects: { health: -3 },
        },
      },
      {
        text: "もっと安い雑用を選ぶ",
        effects: { money: 5, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_003",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 15, jobs: ["adventurer"] },
    weight: 11,
    repeatable: true,
    cooldown: 2,
    text: "畑を荒らすホーンラビットの討伐依頼が出ている。角は短くとも、勢いだけは猪並みだという。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 30 },
        success: {
          result: "跳躍を読み、角を外して仕留める。毛皮は宿の主人に喜ばれた。",
          effects: { money: 30, reputation: 1, ability: 1 },
        },
        failure: {
          result: "突進をまともに受け、盾がひび割れた。兎に負けたと笑われそうだ。",
          effects: { health: -8 },
        },
      },
      {
        text: "見送り、別の札を探す",
        effects: { money: 5, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_004",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 15, jobs: ["adventurer"], jobYearsMin: 3 },
    weight: 10,
    weightMods: [{ conditions: { flags: ["enemy_goblins"] }, multiply: 3 }],
    repeatable: true,
    cooldown: 4,
    logOnce: true,
    text: "ゴブリンの掃討依頼が貼り出されている。巣の位置は、昔どこかで聞いた話に似ている気がする。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 40 },
        success: {
          result: "松明で巣を炙り、逃げ道を塞いで討ち果たした。近隣の農家が、土間まで礼に来た。",
          effects: {
            money: 50,
            reputation: 3,
            ability: 3,
            removeFlags: ["enemy_goblins"],
            removeTraits: ["vengeful"],
          },
          log: { title: "ゴブリン討伐に成功する", text: "ゴブリンの巣を掃討し、一帯の脅威を除いた。" },
        },
        failure: {
          result: "数が多すぎた。毒塗りの刃をかすめて、仲間に引きずられて戻る。",
          effects: { health: [-18, -8] },
        },
      },
      {
        conditions: { flags: ["enemy_goblins"], traitsAny: ["vengeful"] },
        text: "父の仇として、一匹残らず狩り尽くす",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "刃が止まらなかった。巣が静まったとき、胸のざわつきだけが残った。",
          effects: {
            money: 40,
            reputation: 5,
            ability: 2,
            health: -5,
            removeFlags: ["enemy_goblins"],
            removeTraits: ["vengeful"],
          },
          log: { title: "ゴブリンへの復讐を果たす", text: "掃討依頼の陰で、古い仇に区切りをつけた。" },
        },
        failure: {
          result: "怒りが先走り、包囲された。復讐は、また先送りになる。",
          effects: { health: [-25, -12] },
        },
      },
      {
        text: "今は手を出さない",
        effects: { money: 5, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_005",
    tags: ["young", "prime", "adventure"],
    conditions: { ageMin: 15, jobs: ["adventurer"], jobYearsMin: 5 },
    weight: 9,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    maxTimes: 3,
    text: "山脈の上空を、翼竜が舞っているという。ワイバーン討伐——素材だけでも家が建つ、と酒場は騒がしい。",
    choices: [
      {
        text: "依頼を引き受ける",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "急襲の瞬間を狙い、翼の付け根を射抜いた。落下地点から、熱い血の匂いが立ちのぼる。",
          effects: { money: 100, reputation: 8, ability: 3, addFlags: ["wyvern_hunt"] },
          log: { title: "ワイバーン討伐に成功する", text: "空の脅威を撃ち落とし、希少な素材を得た。" },
        },
        failure: {
          result: "爪風に薙がれ、岩場を転げ落ちた。討伐は持ち越しだ。",
          effects: { health: [-30, -15] },
        },
      },
      {
        text: "見送り、足場の固い仕事を選ぶ",
        effects: { money: 20, ability: 1 },
      },
    ],
  },

  // ---------- 探索・装備・遭遇 ----------
  {
    id: "adventurer_006",
    tags: ["young", "prime", "work", "adventure"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    logOnce: true,
    conditions: { ageMin: 18, jobs: ["adventurer"] },
    text: "古い遺跡の入口を調べる依頼を受けた。石段の先は闇で、風だけが奥から吹き上げてくる。",
    choices: [
      {
        text: "奥まで進む",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "崩れた祭壇の下から、錆びた冠と銀貨が出た。ギルドへ納めたうえで、報奨の袋が渡される。",
          effects: { money: 55, reputation: 3, ability: 1 },
          log: { title: "遺跡の奥で財宝を見つける", text: "危険を冒して進み、報奨を手にした。" },
        },
        failure: {
          result: "床の仕掛けが開き、毒矢が腿をかすめた。それ以上は進めない。",
          effects: { health: [-15, -8] },
        },
      },
      {
        text: "入口付近だけ調べる",
        result: "壁画の写しと、入口の測量だけで納品した。無難だが、確実だ。",
        effects: { money: 20, ability: 1 },
      },
      {
        text: "報酬を割いて仲間を募る",
        result: "人数が増え、闇も浅く感じる。依頼のあと、酒場で顔見知りが一人増えた。",
        effects: { money: -10, reputation: 2, ability: 1 },
      },
    ],
  },
  {
    id: "adventurer_007",
    tags: ["young", "prime", "work", "adventure"],
    weight: 9,
    repeatable: true,
    cooldown: 7,
    conditions: { ageMin: 18, jobs: ["adventurer"] },
    text: "前回の戦闘で、愛用の刃こぼれと、ひびの入った胴当てが気になって仕方ない。",
    choices: [
      {
        text: "修理に出す",
        result: "職人の工房で半日待たされた。財布は軽いが、次の一撃に備えられる。",
        effects: { ability: 2, money: -15 },
      },
      {
        text: "思い切って新調する",
        result: "値は張ったが、手に馴染む逸品に巡り合えた。足元が軽くなる。",
        effects: { ability: 3, money: -35, reputation: 1 },
      },
      {
        text: "このまま使い続ける",
        check: { chance: 40 },
        success: {
          result: "ぎりぎり持った。だが金属の悲鳴は、次こそ本格的だと告げている。",
          effects: { money: -2 },
        },
        failure: {
          result: "戦闘の最中に鍔が折れ、敵の刃をまともに受けた。安物の修理代より高くつく。",
          effects: { health: -10, ability: -3, money: -8 },
        },
      },
    ],
  },
  {
    id: "adventurer_008",
    tags: ["young", "prime", "work", "adventure"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 18, jobs: ["adventurer"] },
    text: "ダンジョンの片隅で宝箱を見つけた。錠の周りに、細い針穴がいくつも開いている。",
    choices: [
      {
        text: "罠を慎重に解除する",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "針を外し、蓋を開けた。中は古い金貨と、地図の切れ端だった。",
          effects: { money: 45, ability: 2 },
        },
        failure: {
          result: "クリック、という音のあと手首が痺れた。解毒薬を飲む羽目になる。",
          effects: { health: [-12, -6], money: -5 },
        },
      },
      {
        text: "力づくでこじ開ける",
        check: { stat: "health", difficulty: 48 },
        success: {
          result: "蓋は弾け飛んだ。中身は無事だが、音で近くの魔物が気づいた気配がある。急いで引き上げる。",
          effects: { money: 40, reputation: 1 },
        },
        failure: {
          result: "爆発の罠だった。煤だらけで、宝は粉々だ。",
          effects: { health: [-20, -10] },
        },
      },
      {
        text: "触らずに引き揚げる",
        result: "欲を出さなかった自分を、宿で褒めてやることにした。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "adventurer_009",
    tags: ["young", "prime", "work", "adventure"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 18, jobs: ["adventurer"] },
    text: "洞窟の奥で、天井いっぱいに張られた巨大蜘蛛の巣が行く手を塞いでいる。糸は指ほど太い。",
    choices: [
      {
        text: "正面から戦う",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "牙を払い、毒袋を避けて仕留めた。糸腺は錬金術師が高く買ってくれる。",
          effects: { money: 40, reputation: 2, ability: 1 },
        },
        failure: {
          result: "糸に足を取られ、毒が肩に回った。解毒が効くまで武具も重い。",
          effects: { health: [-16, -8] },
        },
      },
      {
        text: "巣を焼いて進路を開く",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "火は巣を一気に食った。煙にまぎれて本体も弱り、トドメは容易だった。",
          effects: { money: 25, ability: 2, reputation: 1 },
        },
        failure: {
          result: "狭い洞窟で火が回り、自分の髪とマントまで燃えかけた。",
          effects: { health: [-14, -7] },
        },
      },
      {
        text: "別経路を探して回避する",
        result: "遠回りになったが、無傷で抜けられた。依頼の期限だけが気になる。",
        effects: { money: 10 },
      },
    ],
  },
  {
    id: "adventurer_010",
    tags: ["young", "prime", "work", "adventure"],
    weight: 9,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    conditions: { ageMin: 18, jobs: ["adventurer"] },
    text: "古い墓所の石扉が開き、錆びた武具をつけた骸骨たちが、きしむ音ごと立ち上がった。",
    choices: [
      {
        text: "鋼で応戦する",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "関節を狙い、一つずつ沈黙させた。棺の副葬品は、ギルド鑑定行きだ。",
          effects: { money: 50, reputation: 2, ability: 1 },
          log: { title: "墓所のスケルトンを撃退する", text: "動く骸骨たちを退け、副葬品を持ち帰った。" },
        },
        failure: {
          result: "剣が骨に弾かれ、数に押し込まれた。聖印の無い戦いの難しさを思い知る。",
          effects: { health: [-18, -9] },
        },
      },
      {
        text: "聖職者に助力を頼む",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "祈りとともに骸骨が崩れ落ちる。礼金は張るが、傷一つ無い。",
          effects: { money: -15, reputation: 3, ability: 1 },
        },
        failure: {
          result: "都合のよい聖職者は高くついた。前金だけ取られ、現場には間に合わなかった。",
          effects: { money: -20 },
        },
      },
      {
        text: "扉を閉めて撤退する",
        result: "鍵を落とし、封印の印を雑に描く。今日の仕事は、ここまでだ。",
        effects: { health: 1 },
      },
    ],
  },
]);
