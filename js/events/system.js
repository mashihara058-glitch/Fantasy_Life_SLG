// システムイベント：誕生・独り立ち・寿命・穏やかな一年
GAME.registerEvents([
  // ---------- 誕生（0歳・出自ごと）----------
  {
    id: "sys_birth_farmer",
    tags: ["childhood", "birth"],
    forced: true,
    conditions: { ageMax: 0, origin: ["farmer"] },
    text: "麦畑に囲まれた小さな村の農家に、ひとりの赤子が生まれた。\n名は{名前}。父は{父}、母は{母}という。",
    log: { title: "農家の家に生まれる", text: "豊かな自然に囲まれた村で生まれた。" },
    choices: [
      { text: "元気よく泣いた", effects: { health: 3 } },
      { text: "静かにまわりを見つめていた", effects: { ability: 3 } },
    ],
  },
  {
    id: "sys_birth_craftsman",
    tags: ["childhood", "birth"],
    forced: true,
    conditions: { ageMax: 0, origin: ["craftsman"] },
    text: "槌の音が響く職人街の工房に、ひとりの赤子が生まれた。\n名は{名前}。父は{父}、母は{母}という。",
    log: { title: "職人の家に生まれる", text: "槌音の絶えない職人街で生まれた。" },
    choices: [
      { text: "槌の音に合わせて手を叩いた", effects: { ability: 3 } },
      { text: "すやすやと眠っていた", effects: { health: 3 } },
    ],
  },
  {
    id: "sys_birth_merchant",
    tags: ["childhood", "birth"],
    forced: true,
    conditions: { ageMax: 0, origin: ["merchant"] },
    text: "交易路が交わる港町の商家に、ひとりの赤子が生まれた。\n名は{名前}。父は{父}、母は{母}という。",
    log: { title: "商家に生まれる", text: "人と品物が行き交う港町で生まれた。" },
    choices: [
      { text: "客に愛想よく笑いかけた", effects: { reputation: 3 } },
      { text: "金貨の音にじっと耳を澄ませた", effects: { ability: 3 } },
    ],
  },
  {
    id: "sys_birth_noble",
    tags: ["childhood", "birth"],
    forced: true,
    conditions: { ageMax: 0, origin: ["noble"] },
    text: "古い城館に住む貴族{姓}家に、ひとりの赤子が生まれた。\n名は{名前}。当主の{父}と、その妻{母}の子である。",
    log: { title: "貴族の家に生まれる", text: "由緒ある{姓}家の子として生まれた。" },
    choices: [
      { text: "祝福に訪れた客たちを見つめた", effects: { reputation: 3 } },
      { text: "乳母の腕の中でよく眠った", effects: { health: 3 } },
    ],
  },

  // ---------- 独り立ち（16歳以降、まだ家計を持っていない場合）----------
  {
    id: "sys_independence",
    tags: ["adolescence", "work"],
    forced: true,
    conditions: { ageMin: 16, moneyUnlocked: false, notFlags: ["slave", "magic_student"] },
    text: "{年齢}歳になった。そろそろ、自分の食い扶持は自分で稼がなければならない。",
    choices: [
      {
        conditions: { origin: ["farmer"] },
        text: "家の畑を継ぐ",
        effects: { job: "farmer" },
        log: { title: "家業の農家を継ぐ", text: "土とともに生きる道を選んだ。" },
      },
      {
        conditions: { origin: ["craftsman"] },
        text: "家の工房を継ぐ",
        effects: { job: "craftsman" },
        log: { title: "家業の工房を継ぐ", text: "父から受け継いだ技で身を立てることにした。" },
      },
      {
        conditions: { origin: ["merchant"] },
        text: "家の商いを手伝う",
        effects: { job: "merchant" },
        log: { title: "商人として独り立ちする", text: "帳簿と天秤を手に、商いの世界に入った。" },
      },
      {
        conditions: { origin: ["noble"] },
        text: "貴族としての務めを始める",
        effects: { job: "noble", reputation: 5 },
        log: { title: "貴族としての務めを始める", text: "{姓}家の一員として社交界に出た。" },
      },
      {
        text: "町に出て仕事を探す",
        check: { stat: "ability", difficulty: 35 },
        success: {
          result: "町の工房で見習いとして雇ってもらえた。",
          effects: { job: "apprentice" },
          log: { title: "町で見習いの職を得る", text: "故郷を離れ、町で働き始めた。" },
        },
        failure: {
          result: "仕事は見つからなかった。日雇いでしのぐしかない。",
          effects: { job: "laborer" },
          log: { title: "町に出て日雇いで暮らし始める", text: "故郷を離れたが、定職は見つからなかった。" },
        },
      },
      {
        text: "冒険者ギルドの門を叩く",
        result: "登録料を払い、駆け出しの冒険者となった。",
        effects: { job: "adventurer", health: -3 },
        log: { title: "冒険者になる", text: "剣一本を頼りに、冒険者ギルドに登録した。" },
      },
    ],
  },

  // ---------- 寿命 ----------
  {
    id: "sys_death_lifespan",
    tags: ["death"],
    forced: true,
    priority: 50,
    conditions: { lifespanReached: true },
    text: "ある朝、{名前}は窓から差し込む光の中で、自分の時が満ちたことを静かに悟った。",
    choices: [
      {
        conditions: { npcs: ["child"] },
        text: "{子}たち家族に見守られて眠る",
        effects: { death: "老衰" },
        log: { title: "家族に見守られ、生涯を終える", text: "{子}たちに囲まれ、穏やかに息を引き取った。" },
      },
      {
        conditions: { npcs: ["spouse"] },
        text: "{配偶者}の手を握り、目を閉じる",
        effects: { death: "老衰" },
        log: { title: "伴侶に看取られ、生涯を終える", text: "{配偶者}に看取られ、静かに息を引き取った。" },
      },
      {
        text: "静かに目を閉じる",
        effects: { death: "老衰" },
        log: { title: "生涯を終える", text: "長い人生を終え、静かに息を引き取った。" },
      },
    ],
  },

  // ---------- 健康が尽きた ----------
  {
    id: "sys_death_health",
    tags: ["death"],
    forced: true,
    priority: 100,
    conditions: { stats: { health: { max: 0 } } },
    text: "長く続いた不調が、ついに{名前}の身体を蝕みきった。",
    choices: [
      {
        text: "最期の時を迎える",
        effects: { death: "衰弱死" },
        log: { title: "力尽きて生涯を終える", text: "病と傷に蝕まれ、帰らぬ人となった。" },
      },
    ],
  },

  // ---------- 穏やかな一年（fallback）----------
  {
    id: "sys_quiet_childhood",
    tags: ["childhood", "quiet"],
    fallback: true,
    conditions: { ageMin: 1, ageMax: 11 },
    text: "穏やかな一年が過ぎた。{名前}はすくすくと育っている。",
    choices: [
      { text: "外を駆け回って遊んだ", effects: { health: 1 } },
      { text: "大人たちの話に耳を傾けた", effects: { ability: 1 } },
    ],
  },
  {
    id: "sys_quiet_adolescence",
    tags: ["adolescence", "quiet"],
    fallback: true,
    conditions: { ageMin: 12, ageMax: 17, notFlags: ["slave"] },
    text: "特に大きな出来事もなく、一年が過ぎた。少しずつ背も伸びてきた。",
    choices: [
      { text: "体を鍛える", effects: { health: 2 } },
      { text: "本を読む", effects: { ability: 2 } },
      { text: "近所の手伝いをする", effects: { reputation: 2 } },
    ],
  },
  {
    id: "sys_quiet_adult",
    tags: ["young", "prime", "quiet"],
    fallback: true,
    conditions: { ageMin: 18, ageMax: 59, notFlags: ["slave"] },
    text: "大きな出来事もなく、{職業}としての一年が過ぎた。",
    choices: [
      { text: "仕事に精を出す", effects: { money: 15, ability: 1 } },
      { text: "体を休める", effects: { health: 2 } },
      { text: "人付き合いを大切にする", effects: { reputation: 2, money: -10 } },
    ],
  },
  {
    id: "sys_quiet_elder",
    tags: ["elder", "quiet"],
    fallback: true,
    conditions: { ageMin: 60, notFlags: ["slave"] },
    text: "季節がまたひとつ巡った。窓の外では、若い者たちが忙しそうに行き交っている。",
    choices: [
      { text: "散歩をして過ごす", effects: { health: 1 } },
      { text: "昔のことを書き留める", effects: { ability: 1 } },
      { text: "若い者の相談に乗る", effects: { reputation: 2 } },
    ],
  },
  {
    id: "sys_quiet_slave",
    tags: ["quiet", "slave"],
    fallback: true,
    conditions: { flags: ["slave"] },
    text: "主人の命じるままに働く、辛い一年が過ぎた。",
    choices: [
      { text: "黙って耐える", effects: { health: -3 } },
      { text: "密かに希望をつなぐ", effects: { health: -4, ability: 1 } },
    ],
  },
]);
