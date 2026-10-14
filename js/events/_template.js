/*
 * ============================================================
 *  イベント作成テンプレート
 * ============================================================
 *  このファイルはゲームには読み込まれません（見本用）。
 *
 *  【イベントの追加手順】
 *   1. 既存のイベントファイル（childhood.js など）の配列に追記する。
 *      または、このファイルをコピーして新しいファイルを作る。
 *   2. 新しいファイルを作った場合は、index.html の
 *      「イベントデータ」の欄に <script> を1行追加する。
 *   3. ブラウザで index.html を開き直す。
 *      index.html?debug=1 で開くと、書き間違い（不明な項目・id重複など）が画面に表示されます。
 *
 *  【IDの付け方（推奨）】
 *   種族限定のイベント : human_childhood_001
 *   種族を問わないもの : common_childhood_001
 *   システム用         : sys_xxx
 *
 *  【年齢段階のタグ（推奨）】
 *   childhood（0〜11歳） adolescence（12〜17歳） young（18〜29歳）
 *   prime（30〜59歳）  elder（60歳以降）  death（死亡に関わるもの）
 *   タグは今のところ整理用です。抽選には conditions の年齢を使います。
 *
 *  【差し込み文字】文章中に書くと自動で置き換わります。
 *   {名前} {姓} {フルネーム} {出身} {職業} {年齢} {種族}
 *   {父} {母} {友人} {恋人} {配偶者} {師匠} {ライバル} {子} {弟子}
 *   ※人物の差し込みは、conditions.npcs で「その人物がいること」を条件にしておくと確実です。
 *     同じ役割の人物が複数いる場合、イベント中は同じ1人に固定されます。
 *     いない場合は「誰か」と表示されます。
 */

GAME.registerEvents([
  {
    // ---- 基本情報 ----
    id: "common_stage_000",          // 必須。重複不可
    tags: ["young", "work"],          // 任意。整理用
    weight: 10,                       // 抽選ウェイト（省略時 10）。大きいほど出やすい
    repeatable: false,                // true なら何度も発生する（省略時 false）
    cooldown: 3,                      // repeatable 時、次に発生できるまでの年数（省略時 3）
    maxTimes: 3,                      // repeatable 時、一生での最大発生回数（省略可）
    logOnce: true,                    // repeatable 時、年表の「重要な出来事」に載せるのは最初の1回だけにする
    // 条件つきでウェイトを掛け算する（複数書くとすべて掛け合わされる）
    // 例：チェンジリングは友人ができにくい／獣人は起きやすい
    weightMods: [
      { conditions: { flags: ["changeling"] }, multiply: 0.2 },
      { conditions: { species: ["beastfolk"] }, multiply: 2 },
    ],
    // forced: true,                  // 条件を満たしたら抽選より優先して必ず発生
    // priority: 0,                   // forced 同士の優先度。大きい方が先
    // fallback: true,                // 「穏やかな一年」用。他のイベントと一緒に低めのウェイト（5）で抽選され、候補がないときは必ず使われる
    // image: "img/events/xxx.png",   // 任意。イベント画像

    // ---- 発生条件（すべて任意。書いたものはすべて満たす必要がある）----
    conditions: {
      ageMin: 18,                     // 何歳から
      ageMax: 29,                     // 何歳まで
      species: ["human"],             // 種族 human / dwarf / beastfolk
      // チェンジリング限定なら flags: ["changeling"]、除外するなら notFlags: ["changeling"]
      origin: ["farmer", "merchant"], // 出自 farmer / craftsman / merchant / noble
      gender: ["female"],             // 性別 male / female
      traitsAny: ["curious"],         // いずれかの性格を持つ（性格の一覧は js/data/traits.js）
      notTraits: ["timid"],           // いずれの性格も持たない
      flags: ["met_dragon"],          // すべてのフラグを持つ
      notFlags: ["slave"],            // いずれのフラグも持たない
      stats: {                        // ステータスの範囲
        ability: { min: 40 },
        money: { max: -100 },
      },
      hasJob: true,                   // 職に就いている(true) / いない(false)
      jobs: ["farmer", "none"],       // 現在の職業がいずれか（"none" は無職）
      notJobs: ["slave", "retired"],  // 現在の職業がいずれでもない
      npcs: ["friend"],               // この役割の人物がいる（亡くなった・別れた人物は除く）
      noNpcs: ["spouse"],             // この役割の人物がいない
      npcAgeMin: { father: 55 },      // その人物が何歳以上
      moneyUnlocked: true,            // 家計（所持金）が解放済みか
      lifespanReached: false,         // 寿命に達しているか
      // custom: (state) => state.stats.health < state.stats.ability,  // 上記で書けない条件
    },

    // ---- 本文 ----
    text: "{名前}のもとに、一通の手紙が届いた。差出人は{友人}だ。",

    // ---- 年表への記録（任意）----
    // 書いた場合は「重要な出来事」として年表に表示されます。
    // 選択肢ごと・成功/失敗ごとにも書けます（そちらが優先）。
    // log: { title: "…", text: "…", important: true },

    // ---- 選択肢（1つ以上）----
    choices: [
      {
        text: "手紙を読む",           // 必須
        result: "懐かしい文字が並んでいた。",  // 選択後に表示する文章（任意）
        effects: {
          // ステータス（数値 or [最小, 最大] で範囲ランダム）
          health: -5,
          ability: [1, 5],
          reputation: 3,
          money: 50,                  // 家計が未解放の間は無視される
          // moneyRate: -0.3,         // 所持金の割合で増減（-0.3 で3割を失う）。所持金がプラスのときだけ効く
          // setStats: { money: 0 }, // 値を直接設定
          // incomeBonus: 30,        // 年収に加算（転職するとリセット）

          addFlags: ["read_letter"],
          removeFlags: ["waiting_letter"],

          // 性格の変化
          // addTraits: ["brave"],
          // removeTraits: ["timid"],

          // 人物
          npc: { friend: { trust: 5, intimacy: 3 } },  // 信頼度・親密度の変化
          // addNpc: { role: "friend", tags: ["scholar"] },  // 新しい人物（age, gender, name, trust, intimacy も指定可）
          // npcRole: { lover: "spouse" },   // 役割の変更（恋人 → 配偶者 など）
          // npcState: { father: "dead" },   // "dead"（死亡）/ "left"（別れ・疎遠）

          // 職業
          // job: "mage",             // 就職・転職。null で失業。初めての就職で家計が解放される
          // unlockMoney: true,       // 職に関係なく家計を解放する

          // 死亡
          // death: "病死",           // 死因。この選択で人生が終わる
        },
        log: { title: "{友人}から手紙が届く", text: "旧友との文通が始まった。" },
      },

      {
        // 選択肢の表示条件（conditions と同じ書き方）
        // 例：conditions: { traitsAny: ["brave"] } で「勇敢な人だけの選択肢」になる
        conditions: { stats: { money: { min: 100 } } },
        text: "返事と一緒に贈り物を送る",

        // 成功判定つきの選択肢
        //   成功率 = 50% + (ステータス - difficulty) × 2%（5〜95%）
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "{友人}はとても喜んだ。",
          effects: { money: -100, npc: { friend: { intimacy: 10 } } },
        },
        failure: {
          result: "贈り物は途中でなくなってしまった。",
          effects: { money: -100 },
        },
      },

      {
        text: "読まずにしまっておく",
      },
    ],
  },
]);
