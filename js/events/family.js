// 家族（兄弟姉妹）
// 兄弟姉妹の差し込みは {兄弟}（名前）と {兄弟の続柄}（兄・姉・弟・妹）
GAME.registerEvents([
  {
    id: "common_family_newsibling",
    tags: ["childhood", "adolescence", "family"],
    conditions: {
      ageMin: 1,
      ageMax: 14,
      npcs: ["father", "mother"],
      npcAgeMax: { mother: 42 },
      custom: (s) => s.npcs.filter((n) => n.role === "sibling").length < 6,
    },
    weight: 5,
    repeatable: true,
    cooldown: 2,
    maxTimes: 3,
    text: "{母}のお腹が、日に日に大きくなっていく。そしてある朝、家に小さな産声が響いた。",
    choices: [
      {
        text: "生まれた赤子をのぞき込む",
        result: "{兄弟の続柄}の{兄弟}だ。小さな手が、{名前}の指をぎゅっと握った。",
        effects: { addNpc: { role: "sibling", age: 0, trust: 50, intimacy: [55, 75] } },
        log: { title: "{兄弟の続柄}の{兄弟}が生まれる", text: "家族がひとり増えた。" },
      },
      {
        text: "両親を取られた気がして、すねる",
        result: "{兄弟の続柄}の{兄弟}が生まれた。みんな赤子にかかりきりだ。",
        effects: { addNpc: { role: "sibling", age: 0, trust: 40, intimacy: [20, 40] } },
        log: { title: "{兄弟の続柄}の{兄弟}が生まれる", text: "家族がひとり増えたが、素直に喜べなかった。" },
      },
    ],
  },
  {
    id: "common_family_sibling_001",
    tags: ["childhood", "family"],
    conditions: { ageMin: 3, ageMax: 11, npcs: ["sibling"] },
    repeatable: true,
    cooldown: 4,
    maxTimes: 2,
    text: "{兄弟の続柄}の{兄弟}と、最後の焼き菓子をめぐって睨み合いになった。",
    choices: [
      {
        text: "譲ってあげる",
        effects: { reputation: 1, npc: { sibling: { intimacy: 10 } } },
      },
      {
        text: "力ずくで奪い取る",
        effects: { health: 1, npc: { sibling: { trust: -10, intimacy: -5 } } },
      },
    ],
  },
  {
    id: "common_family_sibling_002",
    tags: ["adolescence", "young", "family"],
    conditions: { ageMin: 15, ageMax: 30, npcs: ["sibling"], notFlags: ["inheritance_settled", "slave"] },
    weight: 8,
    text: "家を継ぐのは誰か、という話が持ち上がった。{兄弟の続柄}の{兄弟}も、じっとこちらの出方をうかがっている。",
    choices: [
      {
        text: "{兄弟}に譲る",
        effects: { addFlags: ["inheritance_settled"], npc: { sibling: { trust: 15, intimacy: 5 } } },
      },
      {
        text: "自分こそが跡継ぎだと主張する",
        check: { stat: "reputation", difficulty: 45 },
        success: {
          result: "親族の多くが{名前}を推した。{兄弟}は唇を噛んで黙り込んだ。",
          effects: { reputation: 5, money: 80, addFlags: ["inheritance_settled", "heir"], npc: { sibling: { trust: -20 } } },
          log: { title: "家督争いに勝つ", text: "{兄弟の続柄}の{兄弟}を退け、家の跡継ぎとなった。" },
        },
        failure: {
          result: "親族たちは{兄弟}を選んだ。",
          effects: { addFlags: ["inheritance_settled"], npc: { sibling: { trust: -15 } } },
          log: { title: "家督争いに敗れる", text: "跡継ぎの座は{兄弟の続柄}の{兄弟}のものとなった。" },
        },
      },
    ],
  },
  {
    id: "common_family_sibling_003",
    tags: ["prime", "family"],
    conditions: { ageMin: 25, ageMax: 59, npcs: ["sibling"] },
    weight: 5,
    repeatable: true,
    cooldown: 8,
    text: "{兄弟の続柄}の{兄弟}が、久しぶりに訪ねてきた。",
    choices: [
      {
        text: "昔話に花を咲かせる",
        effects: { health: 2, npc: { sibling: { intimacy: 10 } } },
      },
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 50 } } },
        text: "暮らし向きが苦しいらしい。金を援助する（50ゴールド）",
        effects: { money: -50, npc: { sibling: { trust: 15, intimacy: 5 } } },
      },
      {
        text: "忙しいと言って追い返す",
        effects: { npc: { sibling: { trust: -10, intimacy: -10 } } },
      },
    ],
  },
  {
    id: "common_family_sibling_004",
    tags: ["childhood", "family"],
    conditions: { ageMin: 3, ageMax: 11, npcs: ["sibling"] },
    repeatable: true,
    cooldown: 4,
    maxTimes: 2,
    text: "{兄弟の続柄}の{兄弟}が、一緒に遊ぼうと誘ってきた。",
    choices: [
      {
        text: "本を読む",
        result: "読めない文字を教えあい、物語に没頭した。",
        effects: { reputation: 1, ability: 1, npc: { sibling: { intimacy: 10 } } },
      },
      {
        text: "おいかけっこをする",
        result: "汗だくになって駆け回った。",
        effects: { reputation: 1, health: 1, npc: { sibling: { intimacy: 10 } } },
      },
      {
        text: "地面に絵を描く",
        result: "地面におかしな線を引いて遊んだ。腹の底から大笑いした。",
        effects: { ability: 1, npc: { sibling: { intimacy: 8 } } },
      },
      {
        text: "近場を散策する",
        result: "{兄弟}と近所を探検した。小さな発見がいくつもあった。",
        effects: { health: 2, npc: { sibling: { intimacy: 8 } } },
      },
      {
        text: "遊ばない",
        effects: { npc: { sibling: { trust: -5, intimacy: -3 } } },
      },
    ],
  },
  {
    id: "common_family_sibling_005",
    tags: ["childhood", "adolescence", "family"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    maxTimes: 2,
    conditions: { ageMin: 5, ageMax: 14, npcs: ["sibling"], notFlags: ["slave"] },
    text: "家の壺が割れていた。{兄弟の続柄}の{兄弟}と、顔を見合わせる。",
    choices: [
      {
        text: "自分がやったと言う",
        result: "叱られたが、{兄弟}の肩は少し下がった。あとで「ありがとう」とだけ言われた。",
        effects: { reputation: 2, npc: { sibling: { trust: 12, intimacy: 8 } } },
        log: { title: "{兄弟}の身代わりになる", text: "割れた壺の咎を、自分が被った。" },
      },
      {
        text: "{兄弟}のせいにする",
        result: "{兄弟}が泣きながら叱られている間、胸の奥が重かった。",
        effects: { reputation: -3, npc: { sibling: { trust: -15, intimacy: -10 } } },
      },
      {
        text: "二人で正直に話す",
        check: { chance: 55 },
        success: {
          result: "怒られたが、罰は半分ずつだった。不思議と、距離が縮まった気がした。",
          effects: { reputation: 1, npc: { sibling: { trust: 8, intimacy: 5 } } },
        },
        failure: {
          result: "どちらも言い訳に聞こえ、叱責は倍になった。",
          effects: { reputation: -2, health: -1, npc: { sibling: { intimacy: 2 } } },
        },
      },
    ],
  },
  {
    id: "common_family_sibling_006",
    tags: ["adolescence", "family"],
    weight: 7,
    repeatable: true,
    cooldown: 5,
    maxTimes: 2,
    conditions: { ageMin: 12, ageMax: 18, npcs: ["sibling"], notFlags: ["slave"] },
    text: "{兄弟の続柄}の{兄弟}が、夜更けに起こしてきた。どうしても話したいことがある、と。",
    choices: [
      {
        text: "本気で聞いてやる",
        result: "くだらないことから将来の不安まで、長く話した。明け方、二人とも目が腫れていた。",
        effects: { health: -2, npc: { sibling: { trust: 10, intimacy: 12 } } },
        log: { title: "{兄弟}の夜話を聞く", text: "兄弟だけで、長い夜を分け合った。" },
      },
      {
        text: "眠いから明日にしてくれと返す",
        result: "{兄弟}は「そうだね」と短く言って、足音を忍ばせて戻っていった。",
        effects: { npc: { sibling: { intimacy: -5 } } },
      },
      {
        text: "一緒に夜食を探す",
        result: "禁じられたはずの菓子を分け合い、話は自然と途切れた。それでも、悪くない夜だった。",
        effects: { health: 2, npc: { sibling: { intimacy: 8 } } },
      },
    ],
  },
  // ---------- 孫 ----------

  // 子が成人したあと発生する。主人公の実年齢ではなく「子の年齢」で判定するので、
  // 長寿種族でも、子どもがいれば自然に孫が生まれる。
  {
    id: "common_family_grandchild",
    tags: ["prime", "elder", "family"],
    conditions: {
      npcs: ["child"],
      npcAgeMin: { child: 18 },
      custom: (s) => s.npcs.filter((n) => n.role === "grandchild").length < 6,
    },
    weight: 12,
    repeatable: true,
    cooldown: 4,
    maxTimes: 5,
    text: "{子}のもとから使いが来た。新しい命が授かったという。",
    choices: [
      {
        text: "生まれた孫に会いに行く",
        result: "小さな手が、{名前}の指を握った。名は{孫}。",
        effects: {
          addNpc: { role: "grandchild", age: 0, trust: 60, intimacy: 65 },
          npc: { child: { trust: 5, intimacy: 10 } },
          health: 2,
        },
        log: { title: "孫の{孫}が生まれる", text: "{子}に子どもが生まれ、{名前}は祖父母になった。" },
      },
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 40 } } },
        text: "祝い金を持って会いに行く（40ゴールド）",
        result: "{子}は涙ぐんで礼を言った。赤子の名は{孫}。",
        effects: {
          money: -40,
          addNpc: { role: "grandchild", age: 0, trust: 65, intimacy: 70 },
          npc: { child: { trust: 10, intimacy: 15 } },
          reputation: 2,
        },
        log: { title: "孫の{孫}が生まれる", text: "祝い金を持参し、{子}の子・{孫}と対面した。" },
      },
      {
        text: "手紙で祝福を伝える",
        result: "返事とともに、{孫}という名が記されていた。",
        effects: {
          addNpc: { role: "grandchild", age: 0, trust: 50, intimacy: 40 },
          npc: { child: { intimacy: 5 } },
        },
        log: { title: "孫の{孫}が生まれる", text: "遠方から、{子}に子どもが生まれた知らせを受けた。" },
      },
    ],
  },
  {
    id: "common_family_grandchild_visit",
    tags: ["elder", "family"],
    conditions: { aged: true, npcs: ["grandchild"], npcAgeMin: { grandchild: 3 } },
    weight: 10,
    repeatable: true,
    cooldown: 5,
    text: "孫の{孫}が、はしゃぎながら訪ねてきた。",
    choices: [
      {
        text: "昔話を聞かせる",
        effects: { health: 2, npc: { grandchild: { trust: 5, intimacy: 10 } } },
      },
      {
        conditions: { moneyUnlocked: true, stats: { money: { min: 20 } } },
        text: "小遣いを渡す（20ゴールド）",
        effects: { money: -20, npc: { grandchild: { intimacy: 15 } } },
      },
      {
        text: "外で一緒に遊ぶ",
        effects: { health: -2, npc: { grandchild: { intimacy: 12 } } },
      },
    ],
  },
  // ---------- 夫婦 ----------
  {
    id: "common_family_spouse01",
    tags: ["young", "prime", "elder", "family"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 18, npcs: ["spouse"], flags: ["married"] },
    text: "最近{配偶者}との時間を持てていない。",
    choices: [
      {
        text: "ゆっくり話をする",
        result: "{配偶者}は、{名前}の苦労をねぎらってくれた。",
        effects: { health: 5, npc: { spouse: { intimacy: 5 } } },
      },
      {
        text: "気にしない",
        effects: { npc: { spouse: { intimacy: -5 } } },
      },
    ],
  },
  {
    id: "common_family_spouse02",
    tags: ["young", "prime", "elder", "family"],
    weight: 10,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 18, npcs: ["spouse"], flags: ["married"] },
    text: "{配偶者}がお茶を淹れて、話したそうにしている。",
    choices: [
      {
        text: "ゆっくり話をする",
        result: "{配偶者}との絆が深まった気がする。",
        effects: { health: 5, npc: { spouse: { trust: 5 } } },
      },
      {
        text: "忙しいと断る",
        effects: { npc: { spouse: { trust: -5 } } },
      },
    ],
  },
  {
    id: "common_family_spouse03",
    tags: ["prime", "elder", "family"],
    weight: 10,
    repeatable: true,
    cooldown: 6,
    conditions: {
      ageMin: 30,
      npcs: ["spouse"],
      flags: ["married"],
      // 配偶者の信頼か親密度が20以下のときだけ（専用キーはないので custom で書く）
      custom: (s) => {
        const sp = s.npcs.find((n) => n.role === "spouse" && n.status === "active");
        return !!sp && (sp.trust <= 20 || sp.intimacy <= 20);
      },
    },
    text: "{配偶者}が「もう{名前}には付き合いきれない」と言い出した。",
    choices: [
      {
        text: "拒否する",
        check: { chance: 50 },
        success: {
          result: "離婚はありえないと断言した。なんとか{配偶者}を説得できた。",
          effects: { health: -3, npc: { spouse: { trust: 3 } } },
        },
        failure: {
          result: "{配偶者}の意志は固かった。何を言っても受け入れられなかった。",
          effects: {
            npcState: { spouse: "left" },
            removeFlags: ["married"],
            health: -3,
            moneyRate: -0.5,
          },
          log: { title: "{配偶者}と離婚する", text: "家庭を顧みなかったつけが回った。" },
        },
      },
      {
        text: "なぜそう思うのか尋ねる",
        check: { stat: "reputation", difficulty: 50 },
        success: {
          result: "{配偶者}とひざを突き合わせて話した。些細なすれ違いが積もっていたと分かった。話し合ったことで、絆は前より強まった。",
          effects: { health: 5, npc: { spouse: { trust: 8, intimacy: 8 } } },
          log: { title: "{配偶者}との離婚を回避する", text: "話し合いで関係を立て直した。" },
        },
        failure: {
          result: "話し合いを試みたが、口論になってしまった。",
          effects: { health: -5, npc: { spouse: { trust: -5, intimacy: -5 } } },
        },
      },
      {
        text: "受け入れる",
        result: "{配偶者}との別れを受け入れた。",
        effects: {
          npcState: { spouse: "left" },
          removeFlags: ["married"],
          health: -3,
          moneyRate: -0.5,
        },
        log: { title: "{配偶者}と離婚する", text: "家庭を顧みなかったつけが回った。" },
      },
    ],
  },
  {
  id: "common_family_spouse04",
  tags: ["family", "prime", "elder", "young"],
  weight: 5,
  repeatable: true,
  cooldown: 5,
  conditions: {
    npcs: ["spouse"],
    stats: { health: { max: 35 } }
  },
  text: "{配偶者}が、最近疲れている{名前}を見かねて、滋養強壮に効く薬を買ってきてくれた。",
  choices: [
    {
      text: "感謝して飲む",
      result: "{配偶者}との絆が深まった気がする。",
      effects: { npc:{spouse: { trust: 5 ,intimacy: 5}},health:5 },
    },
    {
      text: "必要ないと断る",
      result: "{配偶者}は悲しそうな顔をした。",
      effects: { npc:{spouse: { trust: -5,intimacy:-5 } }},
    }
  ],
},
{
  id: "common_family_child01",
  tags: ["family", "prime", "elder"],
  weight: 5,
  repeatable: true,
  cooldown: 5,
  conditions: {
    hasJob: true,
    notJobs: ["apprentice", "gambler"],
    npcs: ["spouse", "child"],
    stats: { health: { max: 35 } }
  },
  text: "{子}は最近悩みがあるらしい。人生の先輩である{名前}に助言を求めてきた。",
  choices: [
    {
      text: "ゆっくり話を聞く",
      result: "ワインを酌み交わし、{子}と語り合った。若い者との対話では気づきを得られた。",
      effects: { npc:{child: { trust: 5 ,intimacy: 5}},ability:5 },
    },
    {
      text: "必要ないと断る",
      result: "{子}の頼みを断った。{配偶者}は心配そうに二人を見ていた。",
      effects: { npc:{child: { trust: -5,intimacy:-5 }, spouse: { trust: -1,intimacy:-1 }} },
    }
  ],
},
]);
