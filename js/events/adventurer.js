// 冒険者の仕事イベント
// 討伐は難易度の階段、006以降は探索・装備・遭遇のバリエーション
// 竜: dragon_survey（巣の調査）→ dragon_slain / met_dragon（討伐成功）
// 他職からの委託: adventurerJobClient（低〜中難度・ability 回復用）

/**
 * 薬師・商人・職人・料理人などからの委託依頼。
 * variants: { text, praise?, doubt?, difficulty? }
 */
function adventurerJobClient({ id, clientLabel, praise, doubt, difficulty = 38, variants }) {
  const weight = Math.max(3, Math.round(7 / Math.sqrt(variants.length)));
  return variants.map((v, i) => {
    const ok = v.praise || praise;
    const no = v.doubt || doubt;
    const diff = v.difficulty != null ? v.difficulty : difficulty;
    return {
      id: variants.length === 1 ? id : `${id}_${i + 1}`,
      tags: ["young", "prime", "elder", "work", "adventure"],
      weight,
      repeatable: true,
      cooldown: 4,
      logOnce: true,
      conditions: { ageMin: 15, jobs: ["adventurer"], notFlags: ["slave"] },
      text: v.text,
      choices: [
        {
          text: "引き受ける",
          check: { stat: "ability", difficulty: diff },
          success: {
            result: ok,
            effects: { money: 22, reputation: 1, ability: 2 },
            log: {
              title: `${clientLabel}の委託を果たす`,
              text: `${clientLabel}からの依頼を無事に納品した。`,
            },
          },
          failure: {
            result: no,
            effects: { health: [-10, -4], money: -5 },
          },
        },
        {
          text: "今は手が離せないと断る",
          result: "依頼主は別の冒険者を探すと言う。掲示板には、似た札がまた貼られるだろう。",
        },
      ],
    };
  });
}

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
          effects: {
            money: 150,
            reputation: 10,
            ability: 5,
            addFlags: ["dragon_survey", "met_dragon"],
          },
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
          result: "カチリ、という音のあと手首が痺れた。解毒薬を飲む羽目になる。",
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
  {
    id: "adventurer_011",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 9,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 15, jobs: ["adventurer"], notFlags: ["slave"] },
    text: "緊急招集だ。下水道のスライムが市街へ溢れ始めている。ギルド職員が喉を嗄らして叫ぶ——少しでも刃が振れる者は、手を貸せ、と。",
    choices: [
      {
        text: "駆けつけて討つ",
        check: { stat: "ability", difficulty: 28 },
        success: {
          result: "数は多いが、核の位置は読める。他の冒険者と列を組み、通りを無事に開けた。",
          effects: { money: 15, reputation: 2, ability: 1 },
        },
        failure: {
          result: "倒すこと自体は造作もない。だが飛沫の酸で装備が焼け、報酬は修理代に消えた。",
          effects: { money: -8, ability: 1, health: -2 },
        },
      },
      {
        text: "今は手が離せないと断る",
        result: "鐘の音が遠ざかる。誰かが代わりに行ったのだろう——そう思うことにした。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "adventurer_012",
    tags: ["prime", "elder", "work", "adventure", "friend"],
    weight: 8,
    repeatable: true,
    cooldown: 8,
    logOnce: true,
    maxTimes: 2,
    conditions: { ageMin: 40, jobs: ["adventurer"], notFlags: ["slave"] },
    text: "若い頃に肩を並べた仲間と、何年も経ってからギルドで顔が合った。皺も傷も増えている。笑い方だけが、昔のままだ。",
    choices: [
      {
        text: "再びパーティーを組む",
        check: { stat: "ability", difficulty: 45 },
        success: {
          result: "合図も視線も、空白の年を飛ばして噛み合う。依頼のあと、酒場で「またな」が自然に出た。",
          effects: { money: 25, ability: 2, reputation: 2 },
          log: {
            title: "旧友と再び組む",
            text: "昔の仲間とパーティーを組み、息の合った仕事をした。",
          },
        },
        failure: {
          result: "体も間合いも、昔のままではなかった。連携はぎこちなく、無傷で済んだのが精一杯だ。",
          effects: { ability: 1, health: -3 },
        },
      },
      {
        text: "酒場で交流を温める",
        check: { stat: "reputation", difficulty: 40 },
        success: {
          result: "乾杯のあと、空白の年月が話で埋まる。懐かしい話も初耳もあった。地図の余白が、少し広がった気がする。",
          effects: { reputation: 2, ability: 1, health: 2 },
          log: {
            title: "旧友と酒を酌み交わす",
            text: "昔の仲間と再会し、長い空白を言葉で埋めた。",
          },
        },
        failure: {
          result: "杯は進んだが、空白が互いを疎遠にしていた。些細な食い違いが口論になり、若い冒険者にあきれられる。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "会釈だけして通り過ぎる",
        result: "目が合う。短く頷き、別々の掲示板へ向かう。縁は、まだ切れきってはいない。",
        effects: { health: 1 },
      },
    ],
  },
  {
    id: "adventurer_013",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: { ageMin: 15, jobs: ["adventurer"], notFlags: ["slave"] },
    text: "依頼の道中、深い谷に架かる古い吊り橋が行く手を塞ぐ。ロープはほつれ、板は黒い。",
    choices: [
      {
        text: "慎重に渡る",
        check: { chance: 70 },
        success: {
          result: "一歩ごとに足場を試し、時間をかけて渡り切った。対岸で、膝が初めて震える。",
          effects: { ability: 1 },
        },
        failure: {
          result: "板が限界だった。踏み抜き、腿を大きく削った。渡れたことだけが救いだ。",
          effects: { health: [-12, -6] },
        },
      },
      {
        text: "一気に駆け渡る",
        check: { chance: 35 },
        success: {
          result: "巧遅より拙速——そう決めて駆けた。予定より早く現場に着き、報酬に色が付く。",
          effects: { money: 12, reputation: 1, ability: 1 },
        },
        failure: {
          result: "橋が大きく揺れ、あわや谷へ落ちる。一命はとりとめたが、道具袋が闇へ消えた。",
          effects: { money: -15, health: -4 },
        },
      },
      {
        text: "補助ロープを張ってから渡る",
        check: { chance: 85 },
        success: {
          result: "材料費は噛むが、帰路も安心だ。橋の軋みより、自分の紐の方が信頼できる。",
          effects: { money: -8, ability: 1 },
        },
        failure: {
          result: "買ったロープが不良品で、倍近く継ぎ足す羽目になった。渡れたが、財布は軽い。",
          effects: { money: -14 },
        },
      },
    ],
  },
  {
    id: "adventurer_014",
    tags: ["prime", "elder", "work", "adventure", "career"],
    weight: 10,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobs: ["adventurer"],
      flags: ["dragon_survey"],
      notFlags: ["slave", "dragon_slain"],
    },
    text: "ギルド長からの直々の指名だ。竜の討伐——かつて巣の調査を成し遂げた{名前}の力を借りたい、と。生還を約束する文言は、依頼書にない。",
    choices: [
      {
        text: "装備を整え、正面から仕留める",
        check: { stat: "ability", difficulty: 68 },
        success: {
          result: "整え直した刃が、体の延長のように走る。急所を貫いた瞬間、翼の影が山を離れた。",
          effects: {
            money: 200,
            reputation: 15,
            ability: 6,
            health: -8,
            addFlags: ["dragon_slain", "met_dragon"],
          },
          log: {
            title: "竜を討伐する",
            text: "巣を知る冒険者として指名を受け、竜を仕留めた。",
          },
        },
        failure: {
          result: "善戦した。吐息が岩を削り、撤退の角笛が喉より先に出る。命は、まだ手元にある。",
          effects: { health: [-28, -14], money: -20 },
        },
      },
      {
        text: "地形と生態を読み、知略で仕留める",
        check: { stat: "ability", difficulty: 62 },
        success: {
          result: "風向き、巣の段差、眠りの浅さ——調査の記憶が噛み合う。罠が閉じたとき、咆哮は一度だけだった。",
          effects: {
            money: 180,
            reputation: 12,
            ability: 7,
            health: -4,
            addFlags: ["dragon_slain", "met_dragon"],
          },
          log: {
            title: "知略で竜を討伐する",
            text: "調査知見を活かし、作戦で竜を仕留めた。",
          },
        },
        failure: {
          result: "知れば知るほど、今の装備では足りないと結論が出た。撤退は恥ではない。次のための地図だけが増える。",
          effects: { money: -15, ability: 2, health: -3 },
        },
      },
      {
        text: "今はその時ではないと断る",
        result: "ギルド長は黙って依頼書をしまった。「生きていれば、また声をかける」。それだけが残る。",
        effects: { health: 1 },
      },
    ],
  },

  // ---------- 他職からの委託（低〜中難度・復帰用）----------
  ...adventurerJobClient({
    id: "adventurer_job_medic",
    clientLabel: "薬師",
    difficulty: 36,
    praise: "指定どおりの薬草とキノコを籠に詰めた。薬師は匂いを確かめてうなずき、目方どおりの銀を渡す。",
    doubt: "似た葉を摘んでしまい、薬師に突き返された。山道の疲れだけが残る。",
    variants: [
      {
        text: "薬師から委託が来た。傷薬用の薬草を、指定の谷で摘んでほしい——量より鮮度、と念を押される。",
      },
      {
        text: "薬師の使いが札を持ってきた。「夜光茸だ。洞窟の壁に生える。折らずに根ごと頼む」。",
        praise: "洞窟の湿気の中で夜光茸を根ごと抜いた。薬師の目が、初めて少しだけ緩む。",
        doubt: "光る茸を踏み砕いてしまった。使い道はない、と短く突き返される。",
        difficulty: 40,
      },
      {
        text: "老いた薬師が頼む。「解熱に効く樹皮だ。山の北側、三日歩いた先の木々を」。地図は粗い。",
        difficulty: 42,
      },
    ],
  }),
  ...adventurerJobClient({
    id: "adventurer_job_merchant",
    clientLabel: "商人",
    difficulty: 38,
    praise: "荷物も自分も、無事に街へ着いた。商人は通帳に印を押し、約束の報奨を渡す。",
    doubt: "途中で追い剥ぎに遭い、積み荷の一部が消えた。商人の顔が、帳面より暗い。",
    variants: [
      {
        text: "商人から商路の護衛を頼まれた。盗賊が多い峠を、荷車一台ぶん見送ってほしいという。",
      },
      {
        text: "「大蜘蛛の糸腺だ。織物商が高値で待っている」。商人が指で、报酬の袋を叩く。",
        praise: "糸腺を傷めず持ち帰る。商人は光に透かして笑い、「これなら織れる」と繰り返した。",
        doubt: "巣を焼いてしまい、糸は炭になった。商人は肩をすくめ、日当だけ置いて去る。",
        difficulty: 44,
      },
      {
        text: "行商の女が頼む。「次の市まで、香辛料の樽を盗まれないように付いてきて」。",
        difficulty: 34,
      },
    ],
  }),
  ...adventurerJobClient({
    id: "adventurer_job_craftsman",
    clientLabel: "職人",
    difficulty: 40,
    praise: "指定の素材を工房の台に置く。職人はハンマーを休め、「よし、これなら打てる」と短く言った。",
    doubt: "質が足りないと一目で却下された。取り直す体力より先に、日が暮れる。",
    variants: [
      {
        text: "職人からの依頼だ。希少な鉱石を、崩落の多い坑道の奥から拾ってきてほしい。",
      },
      {
        text: "革職人の使いが来る。「魔物の背革だ。傷のない一枚。牙も三本、折れずに」。",
        praise: "背革と牙を揃えて渡す。職人が厚みを摘み、「ええ革や」と母国語を混ぜた。",
        doubt: "革は裂け、牙は根元から折れた。使い物にならんと、袋ごと返される。",
        difficulty: 45,
      },
      {
        text: "鍛冶屋が煤だらけの顔で言う。「竜ではない。だが硬い。バシリクスの鱗板を一枚」。",
        difficulty: 48,
      },
    ],
  }),
  ...adventurerJobClient({
    id: "adventurer_job_cook",
    clientLabel: "料理人",
    difficulty: 35,
    praise: "鮮度のいい肉を氷囊で運んだ。料理人は匂いだけで満足し、酒までつけてくれた。",
    doubt: "持ち帰りが遅れて肉が傷んだ。厨房の扉は、鼻で先に閉じられた。",
    variants: [
      {
        text: "料理人から依頼が来た。魔物猪の新鮮な肉——市場ものではなく、自分で仕留めたやつがいい、と。",
      },
      {
        text: "食堂の主が札を出す。「翼竜の肝は高すぎる。だからワイバーンの若鳥でいい。丸ごと一羽」。",
        praise: "若鳥を丸ごと渡す。主は涎を隠さず、「今夜の看板だ」と前金を上乗せした。",
        doubt: "落とした拍子に肝を潰した。食用にならんと、骨だけ買い取られた。",
        difficulty: 42,
      },
      {
        text: "旅亭の厨が頼む。「川魚でいい。ただし今朝の。鱗を落とすな、こちらでやる」。",
        difficulty: 30,
      },
    ],
  }),
]);
