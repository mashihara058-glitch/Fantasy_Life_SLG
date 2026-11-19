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
  {
    // 派手枠：近海の巨大烏賊。竜討伐より下、蜘蛛・墓所より上。回数制限あり
    id: "adventurer_015",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 8,
    repeatable: true,
    cooldown: 10,
    maxTimes: 2,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobYearsMin: 5,
      jobs: ["adventurer"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "近海に現れた巨大な烏賊の討伐依頼だ。港に船が入らず、豪商が困り切っている。船倉には遠い国の香辛料が満載だが、膠着が続けば船員の食料が先に尽きる。",
    choices: [
      {
        text: "海中戦を挑み、近接で仕留める",
        check: { stat: "ability", difficulty: 62 },
        success: {
          result: "触腕の間を抜け、両目の間に細い剣を突き立てた。体色が一瞬で変わり、「仕留めた」感触だけが残る。港に、ようやく帆が戻る。",
          effects: { money: 90, reputation: 6, ability: 3, health: -8, addFlags: ["adventurer_kraken"] },
          log: {
            title: "近海の巨大烏賊を討伐する",
            text: "海中の近接戦で烏賊を仕留め、港の船路を開いた。",
          },
        },
        failure: {
          result: "地の利は敵にある。触腕であしらわれ、息だけが上がる。生還できたことが精一杯だ。",
          effects: { health: [-22, -10], ability: 1 },
        },
      },
      {
        text: "漁火と閃光で夜戦を仕掛ける",
        check: { stat: "ability", difficulty: 58 },
        success: {
          result: "光に寄る習性を使い、漁火で引き寄せて閃光で目を奪った。動きが止まった隙に、味方が一気に攻め込む。",
          effects: { money: 80, reputation: 5, ability: 3, health: -5, addFlags: ["adventurer_kraken"] },
          log: {
            title: "夜戦で巨大烏賊を討伐する",
            text: "漁火と閃光で烏賊を封じ、船路を取り戻した。",
          },
        },
        failure: {
          result: "夜目は相手が上回る。連携が乱れ、闇の中で触腕の音だけが近い。",
          effects: { health: [-18, -8], ability: 1 },
        },
      },
      {
        text: "囮になり、河の真水へ誘引する",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "縄張りから河へおびき寄せた。真水に弱ったところを、両岸の味方が仕留める。自分の舟は、半分しぶきで沈みかけた。",
          effects: { money: 75, reputation: 7, ability: 2, health: -6, addFlags: ["adventurer_kraken"] },
          log: {
            title: "巨大烏賊を河へ誘引して討伐する",
            text: "囮を務め、真水で弱った烏賊を仲間と仕留めた。",
          },
        },
        failure: {
          result: "烏賊は海の縄張りから出ようとしない。囮の灯だけが、無駄に揺れる。",
          effects: { health: [-12, -5], money: -10 },
        },
      },
      {
        text: "今は手が足りないと断る",
        result: "豪商の顔が暗くなる。別の札が、翌朝には掲示板の上段へ移っているだろう。",
        effects: { reputation: -1 },
      },
    ],
  },
  {
    // 派手枠：迷宮氾濫＋兵不在。私掠より防衛・評判寄り
    id: "adventurer_016",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 8,
    repeatable: true,
    cooldown: 10,
    maxTimes: 2,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobYearsMin: 4,
      jobs: ["adventurer"],
      moneyUnlocked: true,
      notFlags: ["slave"],
    },
    text: "大量のモンスターが防壁に取りつく。迷宮の氾濫だ。兵士や騎士は遠征で町にほとんど残っていない——冒険者たちに、緊急の招集がかかった。",
    choices: [
      {
        text: "壁の上から遠距離で食い止める",
        check: { stat: "ability", difficulty: 56 },
        success: {
          result: "近づく影を次々と射抜く。倒れた個体は後続に踏みつぶされる。地獄のような光景のまま、夜が明ける。",
          effects: { money: 35, reputation: 5, ability: 2, health: -6, addFlags: ["adventurer_wall_defense"] },
          log: {
            title: "迷宮氾濫の防衛戦で射撃を担う",
            text: "壁上からモンスターの波を撃ち、町を持ちこたえた。",
          },
        },
        failure: {
          result: "距離が足りず、矢は皮膚をこそぐだけ。もっと引きつけてから、と誰かが叫ぶ。",
          effects: { health: [-14, -6], ability: 1 },
        },
      },
      {
        text: "門から打って出て奮戦する",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "殺到する影を切り伏せ、足場に屍の段ができる。銀より先に、喉が焼ける。それでも門は、閉じたまま残った。",
          effects: { money: 45, reputation: 7, ability: 3, health: -10, addFlags: ["adventurer_wall_defense"] },
          log: {
            title: "迷宮氾濫で門前に立ち奮戦する",
            text: "打って出てモンスターの波を斬り、門を守り切った。",
          },
        },
        failure: {
          result: "腕は確かでも、スタミナが先に折れる。敵を減らしつつ、やむなく門内へ退く。",
          effects: { health: [-20, -10], ability: 1, reputation: 1 },
        },
      },
      {
        text: "住民の避難と支援にあたる",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "迫る区域から人を逃がす。子どもの手を引き、足の悪い老人を担ぐ。刃より、声と肩が仕事になる夜だ。",
          effects: { money: 25, reputation: 8, ability: 2, health: -4, addFlags: ["adventurer_wall_defense"] },
          log: {
            title: "迷宮氾濫で住民の避難を支援する",
            text: "防衛の刃ではなく、避難の手として町の夜を支えた。",
          },
        },
        failure: {
          result: "壁外の貧民街では、すでに間に合わない影があった。後ろ髪を引かれながら、まだ動ける者を急がせる。",
          effects: { health: [-10, -4], reputation: 2, ability: 1 },
        },
      },
      {
        text: "招集に応じきれず、欠ける",
        result: "理由はどうあれ、壁の上に自分の影はない。翌朝の町は、軋んだまま朝を迎える。",
        effects: { reputation: -3 },
      },
    ],
  },
  {
    // 貴族護衛：情報漏洩・武器供給の密書。後続用フラグ
    //   adventurer_escort_overlook / _exposed / _held / _quit
    id: "adventurer_017",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 8,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobYearsMin: 5,
      jobs: ["adventurer"],
      moneyUnlocked: true,
      notFlags: ["slave", "adventurer_escort_overlook", "adventurer_escort_exposed", "adventurer_escort_held", "adventurer_escort_quit"],
    },
    text: "とある貴族の街道護衛を請けた。安全を確保するだけの仕事——はずだった。宿で、貴族が開いていた書面が目に入る。外国へ国の情報を漏らし、武器の供給まで約束する文面だ。",
    choices: [
      {
        text: "任務を優先し、気づかなかったことにする",
        check: { stat: "ability", difficulty: 52 },
        success: {
          result: "冒険者は信用が商売だ。仕事で見た秘密は、胸の奥へ沈めた。目的地で厚い銀が渡る。書面のことは、誰も口にしない。",
          effects: {
            money: 70,
            reputation: 2,
            ability: 2,
            addFlags: ["adventurer_escort_overlook"],
          },
          log: {
            title: "貴族の密書を見過ごして護衛を全うする",
            text: "漏洩と武器供給の約束に目を留めつつ、任務として黙った。",
          },
        },
        failure: {
          result: "視線を貴族に読まれた。食事の毒でしびれているあいだに置き去りにされる。報酬は、もちろん無い。",
          effects: { health: [-16, -8], money: -5, addFlags: ["adventurer_escort_quit"] },
          log: {
            title: "貴族の護衛中に毒を盛られ置き去りにされる",
            text: "密書に気づいた気配を悟られ、道半ばで捨てられた。",
          },
        },
      },
      {
        text: "道徳を優先し、次の街で摘発する",
        check: { stat: "reputation", difficulty: 55 },
        success: {
          result: "衛兵に知らせた。だが貴族は到着より早く行方をくらませている。銀は得ない。代わりに、胸の鉛は少し軽い。",
          effects: {
            reputation: 6,
            ability: 2,
            money: -10,
            addFlags: ["adventurer_escort_exposed"],
          },
          log: {
            title: "護衛先の貴族の密書を衛兵へ知らせる",
            text: "情報漏洩と武器供給の文面を告発した。本人は逃げた。",
          },
        },
        failure: {
          result: "取り調べは入ったが、証拠はすでに隠されていた。「依頼主に嫌疑をかけた」——悪評だけが残る。",
          effects: { reputation: -4, ability: 1, addFlags: ["adventurer_escort_exposed"] },
        },
      },
      {
        text: "証拠の写しだけ取り、黙って送り届ける",
        check: { chance: 65 },
        success: {
          result: "何も見ていない顔で護衛を終えた。袖の中の写しだけが、熱い。貴族の目は、読めない。",
          effects: {
            money: 55,
            reputation: 1,
            ability: 2,
            addFlags: ["adventurer_escort_held"],
          },
          log: {
            title: "貴族の密書の写しを握ったまま護衛する",
            text: "漏洩の文面を控え、表向きは無事に送り届けた。",
          },
        },
        failure: {
          result: "写そうとして紙音が鳴った。貴族は何も言わず、翌日から護衛の配置を変える。目的地では銀が少し減らされた。",
          effects: { money: 40, reputation: -1, health: -2, addFlags: ["adventurer_escort_held"] },
        },
      },
      {
        text: "危ないと見て、途中で降りる",
        result: "前金だけ受け取り、次の街で依頼から外れた。後ろで何が運ばれるかは、もう自分の仕事ではない。",
        effects: { money: 25, reputation: -2, ability: 1, addFlags: ["adventurer_escort_quit"] },
        log: {
          title: "貴族の護衛依頼から途中で降りる",
          text: "密書の匂いに触れ、報酬の残りを捨てて手を引いた。",
        },
      },
    ],
  },
  {
    // 017 quit の余韻（判定なし）
    id: "adventurer_escort_quit",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 12,
    maxTimes: 1,
    conditions: {
      jobs: ["adventurer"],
      flags: ["adventurer_escort_quit"],
      notFlags: ["slave"],
    },
    text: "掲示板を眺めていて気付く。しばらく、あの貴族の名を見ない。",
    choices: [
      {
        text: "雑談として話題を振る",
        result: "後日談が少しだけ聞こえた。別の護衛が、黙って運んだらしい——それ以上は、誰も知らない。",
        effects: { ability: 1, removeFlags: ["adventurer_escort_quit"] },
      },
      {
        text: "気にしないことにする",
        result: "捕まった、という噂もない。その後どうなったかは、わからないままになる。",
        effects: { removeFlags: ["adventurer_escort_quit"] },
      },
    ],
  },
  {
    // held / overlook への口封じ。flags は AND なので custom で OR
    id: "adventurer_escort_assassin",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 11,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobs: ["adventurer"],
      moneyUnlocked: true,
      notFlags: ["slave", "adventurer_escort_assassin"],
      custom: (s) =>
        s.flags.includes("adventurer_escort_held") ||
        s.flags.includes("adventurer_escort_overlook"),
    },
    text: "夜道を歩いていたら、黒ずくめの男女に囲まれた。刃の光が、ランプの届かない位置にある。",
    choices: [
      {
        text: "応戦する",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "一人を仕留めると、残りは仲間を抱えて退いた。路地に、血の匂いだけが残る。",
          effects: { health: -4, ability: 2, reputation: 1, addFlags: ["adventurer_escort_assassin"] },
          log: {
            title: "口封じの襲撃者を返り討ちにする",
            text: "貴族の密書に触れたあと、夜道で暗殺を退けた。",
          },
        },
        failure: {
          result: "腹にナイフが深々と沈む。口封じの代金は、自分の血だった。",
          effects: { death: "暗殺" },
          log: { title: "口封じのため殺される", text: "知ってはならないことを知った代償を払った。" },
        },
      },
      {
        text: "裏道へ逃げる",
        check: { stat: "health", difficulty: 52 },
        success: {
          result: "この町の抜け道は、自分の方が詳しい。足音が遠ざかるまで、息を殺した。",
          effects: { health: -3, ability: 2, addFlags: ["adventurer_escort_assassin"] },
          log: {
            title: "口封じの襲撃から逃げ切る",
            text: "夜の裏道を知り尽くし、暗殺者を振り切った。",
          },
        },
        failure: {
          result: "背に矢が突き立つ。体が動かない。鏃の毒に気付いた頃には、もう遅い。",
          effects: { death: "暗殺" },
          log: { title: "口封じのため殺される", text: "陰謀の手に、逃げ切れなかった。" },
        },
      },
      {
        text: "助けを呼ぶ",
        check: { stat: "reputation", difficulty: 52 },
        success: {
          result: "声に応えて、店の灯りがいくつも開く。襲撃者は、光が届く前に消えた。",
          effects: { health: -2, ability: 1, reputation: 2, addFlags: ["adventurer_escort_assassin"] },
          log: {
            title: "住民の灯りで暗殺者を退ける",
            text: "夜の呼びかけに町が応じ、口封じを阻んだ。",
          },
        },
        failure: {
          result: "叫びは、乾いた破裂音に掻き消された。見慣れない筒の先が、闇で一瞬だけ光る。",
          effects: { death: "暗殺" },
          log: { title: "口封じのため殺される", text: "火薬の音とともに、声が途切れた。" },
        },
      },
      {
        conditions: { flags: ["adventurer_escort_held"] },
        text: "写しを渡せば命は助かると考え交渉する",
        check: { chance: 55 },
        success: {
          result: "差し金はあの貴族だと読んだ。写しと引き換えに、命と少なからぬ銀を得た。袖は空だ。胸の奥も、少し空だ。",
          effects: {
            money: 80,
            health: -2,
            ability: 1,
            addFlags: ["adventurer_escort_assassin"],
            removeFlags: ["adventurer_escort_held"],
          },
          log: {
            title: "密書の写しを渡して命を買う",
            text: "暗殺者に証拠を売り、口封じを金で止めた。",
          },
        },
        failure: {
          result: "「代金は刃で払う」——それでも写しを置かせろ、と短刀が迫る。やむなく差し出し、命だけ拾った。",
          effects: {
            health: -5,
            ability: 1,
            addFlags: ["adventurer_escort_assassin"],
            removeFlags: ["adventurer_escort_held"],
          },
          log: {
            title: "密書の写しを奪われ命だけ残る",
            text: "交渉は通じず、証拠を奪われて生き残った。",
          },
        },
      },
    ],
  },
  {
    // 濡れ衣。overlook / exposed / held のいずれか。health.max:-4 は発火不能だったため削除
    id: "adventurer_escort_doubt",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 11,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobs: ["adventurer"],
      notFlags: ["slave", "adventurer_escort_doubt", "adventurer_escort_accused"],
      custom: (s) =>
        s.flags.includes("adventurer_escort_overlook") ||
        s.flags.includes("adventurer_escort_exposed") ||
        s.flags.includes("adventurer_escort_held"),
    },
    text: "兵士が戸を叩く。とある貴族への罪だと言うが、身に覚えはない。ただ——その貴族の名には、覚えがあった。",
    choices: [
      {
        conditions: { flags: ["adventurer_escort_held"] },
        text: "写しを証拠に差し出す",
        result: "知られたくない秘密を自分が握っている、と伝えた。憲兵は「追加の調査をする」と言い、監視付きながら一旦は自由になる。",
        effects: {
          reputation: 2,
          ability: 1,
          addFlags: ["adventurer_escort_doubt"],
          removeFlags: ["adventurer_escort_held"],
        },
        log: {
          title: "濡れ衣に密書の写しで抗弁する",
          text: "護衛のおりの写しを差し出し、監視付きで釈放された。",
        },
      },
      {
        text: "身に覚えはないと釈明する",
        check: { stat: "reputation", difficulty: 55 },
        success: {
          result: "証拠不十分で釈放された。だが疑惑は残る。街の目が、少しだけ冷たい。",
          effects: {
            health: -3,
            reputation: -4,
            ability: 1,
            addFlags: ["adventurer_escort_doubt"],
          },
          log: {
            title: "貴族案件の濡れ衣を釈明し釈放される",
            text: "罪は晴れたが、噂だけが後を引く。",
          },
        },
        failure: {
          result: "訴えは聞き入れられない。犯してもいない罪の代償に、犯罪奴隷の鎖が手首へかかる。",
          effects: {
            job: "slave",
            addFlags: ["slave", "adventurer_escort_enslaved"],
            removeFlags: [
              "adventurer_escort_overlook",
              "adventurer_escort_exposed",
              "adventurer_escort_held",
              "adventurer_escort_doubt",
            ],
            health: -10,
            housing: "none",
            setStats: { money: 0 },
          },
          log: {
            title: "濡れ衣のまま犯罪奴隷となる",
            text: "貴族の名にまつわる嫌疑で、奴隷の身分へ落とされた。",
          },
        },
      },
    ],
  },
  {
    // 疑惑のあと、一揆／騎士団へ動くか
    id: "adventurer_escort_accuse",
    tags: ["young", "prime", "elder", "work", "adventure"],
    weight: 10,
    maxTimes: 1,
    logOnce: true,
    conditions: {
      ageMin: 18,
      jobs: ["adventurer"],
      flags: ["adventurer_escort_doubt"],
      notFlags: ["slave", "adventurer_escort_accused"],
    },
    text: "あの貴族の陰謀を、これ以上見過ごせる気がしない。騎士の門か、憤る農村か——動くなら、今しかない。",
    choices: [
      {
        text: "騎士団に訴える",
        check: { stat: "reputation", difficulty: 55 },
        success: {
          result: "訴えが通った。貴族は捕縛され、街道に流れる武器の話が一度止まる。灰は残るが、火種は小さい。",
          effects: {
            reputation: 6,
            ability: 2,
            money: 20,
            addFlags: ["adventurer_escort_accused", "adventurer_revolt_averted"],
            removeFlags: ["adventurer_escort_doubt", "adventurer_escort_overlook", "adventurer_escort_exposed"],
          },
          log: {
            title: "騎士団へ貴族の陰謀を訴えて捕縛させる",
            text: "漏洩と武器供給の件で貴族を捕らえ、一揆の火を小さくした。",
          },
        },
        failure: {
          result: "騎士団は動いたが、向かったのは扇動される側だった。武器と計画が見つかり、平民の首謀者が斬られる。反乱は止まった。あの貴族の名は、まだ白い。",
          effects: {
            reputation: -3,
            ability: 1,
            health: -2,
            addFlags: ["adventurer_escort_accused", "adventurer_revolt_averted"],
            removeFlags: ["adventurer_escort_doubt"],
          },
          log: {
            title: "陰謀の訴えが農民側の粛清になる",
            text: "貴族は罰せられず、憤る側だけが切り取られた。",
          },
        },
      },
      {
        text: "扇動される農村へ真実を伝える",
        check: { stat: "reputation", difficulty: 52 },
        success: {
          result: "憤りを抱えた村は、蜂起の寸前だった。貴族の糸を明かした夜、一揆は保留になる。畑の匂いと、苦い酒の匂いが残る。",
          effects: {
            reputation: 5,
            ability: 2,
            health: -3,
            addFlags: ["adventurer_escort_accused", "adventurer_revolt_averted", "adventurer_warned_farmers"],
            removeFlags: ["adventurer_escort_doubt"],
          },
          log: {
            title: "農村へ貴族の扇動を伝え一揆を思いとどまらせる",
            text: "増税と武器の糸を明かし、決起をひとまず止めた。",
          },
        },
        failure: {
          result: "村は蜂起の寸前だった。真実を話しても、聞く耳はもう持たれない。背中に、燃える藁の匂いがついて回る。",
          effects: {
            reputation: -2,
            ability: 1,
            health: -4,
            addFlags: ["adventurer_escort_accused", "adventurer_revolt_ignored"],
            removeFlags: ["adventurer_escort_doubt"],
          },
          log: {
            title: "農村は貴族の扇動を信じ一揆へ向かう",
            text: "止めようとしたが、憤りはすでに火になっていた。",
          },
        },
      },
      {
        text: "やはり、何もしない",
        result: "真実は胸の奥へ戻した。掲示板の依頼は、いつも通り貼られる。",
        effects: {
          ability: 1,
          addFlags: ["adventurer_escort_accused"],
          removeFlags: ["adventurer_escort_doubt"],
        },
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
        text: "「大蜘蛛の糸腺だ。織物商が高値で待っている」。商人が指で、報酬の袋を叩く。",
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
