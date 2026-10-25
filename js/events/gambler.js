// 博打師の仕事イベント
// gambler_009 は稀な職業固有の死（weight 低・一度きり）
GAME.registerEvents([
  {
    id: "gambler_001",
    tags: ["young", "prime", "elder", "work", "gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"], notFlags: ["slave"] },
    weight: 10,
    repeatable: true,
    cooldown: 2,
    text: "ポーカーの勝負に挑んだ。",
    choices: [
      {
        text: "コール",
        check: { chance: 50 },
        success: {
          result: "ツーペア。わずかな差で、場のチップをかき集めた。",
          effects: { money: 50 },
        },
        failure: {
          result: "ワンペア。悪くない手だったが、相手はそれを上回っていた。",
          effects: { money: -50 },
        },
      },
      {
        text: "レイズ",
        check: { chance: 30 },
        success: {
          result: "フォーカード。卓を囲む全員が、息を呑んだ。",
          effects: { money: 120 },
          log: { title: "ポーカーで大勝ちする", text: "四枚の札が、一夜にして財布を膨らませた。" },
        },
        failure: {
          result: "フルハウス……しかし相手の役はストレートフラッシュだった。",
          effects: { money: -150 },
          log: { title: "ポーカーで大負けする", text: "フルハウスを握りしめたまま、有り金を失った。" },
        },
      },
      {
        text: "フォールド",
        result: "勝負を降りた。賭けたチップは戻らないが、傷は浅い。",
        effects: { money: -10 },
      },
    ],
  },
  {
    id: "gambler_002",
    tags: ["young", "prime", "elder", "work", "gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"], notFlags: ["slave"] },
    weight: 10,
    repeatable: true,
    cooldown: 2,
    text: "賭場で腕利きの博打師に、勝負を持ちかけられた。",
    choices: [
      {
        text: "小さく賭ける",
        check: { chance: 60 },
        success: {
          result: "手堅く張った賭けが、確かな稼ぎになった。",
          effects: { money: 40 },
        },
        failure: {
          result: "相手の読みが、一枚上手だった。",
          effects: { money: -30 },
        },
      },
      {
        text: "大きく賭ける",
        check: { chance: 30 },
        success: {
          result: "腕利きの顔から、余裕の笑みが消えた。",
          effects: { money: 100 },
          log: { title: "賭場で腕利きを打ち負かす", text: "名うての博打師を相手に、大金をせしめた。" },
        },
        failure: {
          result: "身ぐるみを剥がされ、夜風の冷たさが身に染みた。",
          effects: { money: -150 },
          log: { title: "賭場で身ぐるみ剥がされる", text: "名うての博打師に挑み、すべてを失った。" },
        },
      },
      {
        text: "勝負を降りる",
        result: "誘いを断り、場代だけ置いて賭場を出た。",
        effects: { money: -10 },
      },
    ],
  },
  {
    id: "gambler_003",
    tags: ["young", "prime", "elder", "work", "gambler"],
    conditions: { ageMin: 16, jobs: ["gambler"], notFlags: ["slave"] },
    weight: 10,
    repeatable: true,
    cooldown: 3,
    text: "王都で大きな競馬大会が開かれる。どの馬に賭けるか。",
    choices: [
      {
        text: "人気馬",
        check: { chance: 60 },
        success: {
          result: "人気馬は危なげなく、先頭でゴールを駆け抜けた。",
          effects: { money: 40 },
        },
        failure: {
          result: "人気馬は最後の直線で失速した。手元には、紙くずになった馬券だけが残った。",
          effects: { money: -30 },
        },
      },
      {
        text: "穴馬",
        check: { chance: 25 },
        success: {
          result: "誰も見向きもしなかった馬が、大外から全頭を差し切った。",
          effects: { money: 150 },
          log: { title: "競馬で大穴を当てる", text: "誰も信じなかった馬に賭け、競馬場の噂の的になった。" },
        },
        failure: {
          result: "穴馬は、最後まで穴馬のままだった。",
          effects: { money: -120 },
          log: { title: "競馬で大損する", text: "穴馬に夢を託し、大金を失った。" },
        },
      },
      {
        text: "知り合いの馬主から情報を買う",
        check: { chance: 55 },
        success: {
          result: "情報は本物だった。教えられた馬が、ゆうゆうと一着でゴールした。",
          effects: { money: 55, reputation: -2 },
        },
        failure: {
          result: "情報はガセだった。どうやら馬主自身も騙されていたらしい。",
          effects: { money: -45, reputation: -2 },
          log: { title: "競馬でガセ情報をつかまされる", text: "馬主の耳打ちを信じ、まんまと損をした。" },
        },
      },
    ],
  },
  {
    id: "gambler_004",
    tags: ["young", "prime", "elder", "work", "gambler", "friend"],
    conditions: { ageMin: 16, jobs: ["gambler"], npcs: ["friend"], notFlags: ["slave"] },
    weight: 8,
    repeatable: true,
    cooldown: 4,
    text: "{友人}と、安い酒を片手にカードで勝負した。",
    choices: [
      {
        text: "いかさまをする",
        check: { chance: 75 },
        success: {
          result: "勝った。だが{友人}は、どこか腑に落ちない顔をしていた。",
          effects: { money: 35, npc: { friend: { trust: -8, intimacy: -5 } } },
        },
        failure: {
          result: "袖から札が滑り落ちた。{友人}は黙って席を立った。",
          effects: { money: -20, npcState: { friend: "left" }, reputation: -3 },
          log: { title: "友とのカードでいかさまがばれる", text: "{友人}の信頼を、たった一枚の札で失った。" },
        },
      },
      {
        text: "正々堂々と勝負する",
        check: { chance: 50 },
        success: {
          result: "勝った。{友人}は悔しがりながらも笑っていた。",
          effects: { money: 40, npc: { friend: { trust: 2, intimacy: 4 } } },
        },
        failure: {
          result: "負けた。{友人}は勝ち誇り、酒をおごらせた。",
          effects: { money: -40, npc: { friend: { trust: 2, intimacy: 4 } } },
        },
      },
    ],
  },
  {
    id: "gambler_005",
    tags: ["young", "prime", "elder", "work", "gambler"],
    conditions: {
      ageMin: 18,
      jobs: ["gambler"],
      notFlags: ["slave", "cheat"],
      stats: { reputation: { min: 25 } },
    },
    weight: 7,
    maxTimes: 1,
    text: "大貴族に腕前を見込まれ、特別な勝負に招かれた。",
    choices: [
      {
        text: "いかさまをする",
        check: { chance: 55 },
        success: {
          result: "鮮やかな手さばきで相手を出し抜いた。大貴族は感嘆の声を上げた——今は、まだ。",
          effects: { money: 120, reputation: 8, addFlags: ["cheat"] },
          log: { title: "貴族の卓でいかさまを決める", text: "特別な勝負で不正を通し、大金を得た。" },
        },
        failure: {
          result: "仕込みは悪くなかった。それでも、相手の運が上回った。不正には気づかれなかったようだ。",
          effects: { money: -40 },
        },
      },
      {
        text: "正々堂々と勝負する",
        check: { chance: 35 },
        success: {
          result: "正面からの勝負を制し、大貴族から惜しみない賛辞を受けた。",
          effects: { money: 100, reputation: 6 },
          log: { title: "貴族の卓で正々堂々と勝つ", text: "いかさまなしで、特別な勝負を制した。" },
        },
        failure: {
          result: "居並ぶ貴族たちの前で、身ぐるみを剥がされた。",
          effects: { money: -150, reputation: -3 },
        },
      },
      {
        text: "勝負を断る",
        result: "誘いを断ったことで、「臆病者」という噂が、しばらく賭場を歩いた。",
        effects: { reputation: -8 },
      },
    ],
  },
  {
    id: "gambler_006",
    tags: ["young", "prime", "elder", "work", "gambler"],
    conditions: { ageMin: 18, jobs: ["gambler"], flags: ["cheat"], notFlags: ["slave"] },
    weight: 12,
    repeatable: true,
    cooldown: 3,
    text: "過去、大貴族の卓で通したいかさまが、ようやく噂になった。使いが、冷たい文面を持ってきた。",
    choices: [
      {
        text: "賠償金を払って頭を下げる",
        result: "指定の額を払い、深々と礼をした。これ以上の追及は、いったん止まった。",
        effects: { money: -100, reputation: -5, removeFlags: ["cheat"] },
        log: { title: "いかさまの賠償を払う", text: "貴族への不正を認め、金で決着をつけた。" },
      },
      {
        text: "言いくるめる",
        check: { chance: 30 },
        success: {
          result: "なんとか言い逃れた。だが疑惑は消えず、肩の荷は残ったままだ。",
          effects: { reputation: -4 },
        },
        failure: {
          result: "言い訳は通らず、多額の賠償を突きつけられた。",
          effects: { money: -160, reputation: -12, removeFlags: ["cheat"] },
          log: { title: "いかさまが公になる", text: "言い逃れに失敗し、財布も名声も削られた。" },
        },
      },
      {
        text: "減額を交渉する",
        check: { chance: 35 },
        success: {
          result: "和解金で手打ちになった。高い勉強代だ。",
          effects: { money: -55, reputation: -4, removeFlags: ["cheat"] },
        },
        failure: {
          result: "交渉は決裂し、請求は膨らんだだけだった。",
          effects: { money: -160, reputation: -12, removeFlags: ["cheat"] },
          log: { title: "いかさまの交渉が決裂する", text: "減額を拒まれ、重い賠償を課された。" },
        },
      },
    ],
  },
  {
    id: "gambler_007",
    tags: ["young", "prime", "elder", "work", "gambler"],
    weight: 9,
    repeatable: true,
    cooldown: 3,
    conditions: { ageMin: 16, jobs: ["gambler"], notFlags: ["slave"] },
    text: "赤と黒に塗り分けられた円盤の上を、玉が走る。運か、観察か。",
    choices: [
      {
        text: "直感で賭ける",
        check: { chance: 50 },
        success: {
          result: "赤に50ゴールド。玉はころころと転がり、赤いポケットに落ちた。",
          effects: { money: 50, reputation: 1 },
        },
        failure: {
          result: "赤に50ゴールド。玉は黒いポケットに吸い込まれた。",
          effects: { money: -50 },
        },
      },
      {
        text: "観察してストリートに張る",
        check: { stat: "ability", difficulty: 65 },
        success: {
          result: "目算では16から18。ストリートにチップを置いた瞬間、玉はまさにその帯へ落ちた。",
          effects: { money: 280, reputation: 6, ability: 1 },
          log: { title: "ルーレットで大勝する", text: "観察と計算で、山のチップを引き寄せた。" },
        },
        failure: {
          result: "目算では16から18。置いたチップの隣——19——で、玉は止まった。",
          effects: { money: -80, ability: 1 },
        },
      },
      {
        text: "見送る",
        result: "今夜は、円盤の呼び声に背を向けた。",
      },
    ],
  },
  {
    id: "gambler_008",
    tags: ["young", "prime", "elder", "work", "gambler"],
    weight: 7,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 16, jobs: ["gambler"], notFlags: ["slave"] },
    text: "見世物の一座が、パンチ台への挑戦者を募っている。錘を目盛りの一点で止めれば、賞金だという。",
    choices: [
      {
        text: "挑戦する",
        check: { stat: "health", difficulty: 55 },
        success: {
          result: "肩を回し、パッドを叩く。錘は狙いの目盛りで、ぴたりと止まった。",
          effects: { money: 45, reputation: 2, health: 2 },
        },
        failure: {
          result: "勢い余って錘は標的を飛び越えた。賞金は逃したが、血は巡った。",
          effects: { money: -20, health: 3 },
        },
      },
      {
        text: "見送る",
        result: "座の呼び込みを、聞き流して通り過ぎた。",
      },
    ],
  },
  {
    id: "gambler_010",
    tags: ["young", "prime", "elder", "work", "gambler"],
    weight: 8,
    repeatable: true,
    cooldown: 4,
    conditions: { ageMin: 16, jobs: ["gambler"], notFlags: ["slave"] },
    text: "立派なひげの紳士が、チェス盤を挟んで座った。勝てば賞金をくれるという。ただし——本気で潰すより、長く楽しませた方が、懐は温かくなりそうだ。",
    choices: [
      {
        text: "手加減せず勝負する",
        check: { stat: "ability", difficulty: 55 },
        success: {
          result: "詰めの一手。紳士は短く息をつき、「見事だ」と机に金貨を落とした。",
          effects: { money: 25, ability: 2 },
        },
        failure: {
          result: "王が倒されたのは、こちらの番だった。紳士は満足げに顎を撫で、チップは一枚も動かなかった。",
          effects: { ability: 1, health: -1 },
        },
      },
      {
        text: "接戦に見せて接待する",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "危うい勝負を何度も演じた。紳士の目が熱を帯び、最後に重い革袋が滑り込んできた。",
          effects: { money: 70, ability: 3, reputation: 2 },
          log: { title: "チェスで紳士を接待する", text: "勝負より空気を売り、厚く礼を得た。" },
        },
        failure: {
          result: "勝ちを譲るつもりが、指が本気を出した。紳士は笑って敗れ、代わりに上等な酒で機嫌を直した。",
          effects: { health: 4, reputation: 1 },
        },
      },
      {
        text: "盤を畳んで断る",
        result: "今夜は札の感触の方が恋しい。紳士は肩をすくめ、別の相手を探しに消えた。",
      },
    ],
  },
  {
    id: "gambler_011",
    tags: ["young", "prime", "elder", "work", "gambler"],
    weight: 3,
    repeatable: true,
    cooldown: 12,
    maxTimes: 2,
    conditions: { ageMin: 18, jobs: ["gambler"], notFlags: ["slave"] },
    text: "目の奥が笑っていない紳士が、机に手を置いた。賭け金は爪だ。勝れば一枚につき50ゴールド。負ければ——その爪は、もう自分のものではない。",
    choices: [
      {
        text: "爪を1枚賭ける",
        check: { chance: 50 },
        success: {
          result: "卓が息を飲んだ。勝った側の手が震え、負けた側の目だけが静かだった。50ゴールドが、妙に熱い。",
          effects: { money: 50, ability: 1, reputation: 4 },
          log: { title: "爪賭けに勝つ", text: "狂気じみた勝負で、一枚分の金を得た。" },
        },
        failure: {
          result: "紳士の唇がゆがむ。次の瞬間、世界が白く弾けた。痛みは、言葉を置いていく。",
          effects: { health: -12, reputation: 2 },
          log: { title: "爪賭けに負ける", text: "賭けた爪を失い、卓の笑いものになった。" },
        },
      },
      {
        text: "爪を5枚賭ける",
        check: { chance: 35 },
        success: {
          result: "夜が白むまで盤は終わらなかった。終わったとき、カジノは自分の名を囁いていた。手は動かない。代わりに、札束がある。",
          effects: { money: 280, ability: 4, reputation: 12, health: -5 },
          log: { title: "伝説の爪賭けに勝つ", text: "五枚を賭けた狂気の勝負を制し、名を残した。" },
        },
        failure: {
          result: "歓声と悲鳴が混ざる。最後に笑ったのは紳士だけだ。包帯の下で、指が数えられない。",
          effects: { health: -28, reputation: 3, ability: -2 },
          log: { title: "伝説の爪賭けに負ける", text: "五枚を賭け、痛みと噂だけを持ち帰った。" },
        },
      },
      {
        text: "正気の沙汰ではないと断る",
        result: "椅子を下げた。紳士は残念そうに、次の愚か者を探し始めた。",
        effects: { reputation: 1 },
      },
    ],
  },
  {
    id: "gambler_012",
    tags: ["young", "prime", "elder", "work", "gambler"],
    weight: 7,
    repeatable: true,
    cooldown: 5,
    logOnce: true,
    conditions: { ageMin: 16, jobs: ["gambler"], notFlags: ["slave"] },
    text: "つぎはぎの神官服の女が、場違いな足取りで入ってきた。孤児院の食費を、どうにかしたいのだという。",
    choices: [
      {
        text: "まっとうに勝負する",
        check: { stat: "ability", difficulty: 48 },
        success: {
          result: "彼女は必死だった。それでも場数の差は残酷で、最後の札で沈んだ。出ていく背中が、妙に小さかった。",
          effects: { money: 15, ability: 1, reputation: -4 },
        },
        failure: {
          result: "ビギナーズラック——あるいは加護か。神官のツキに舌を巻き、チップが減っていく音だけがした。",
          effects: { money: -20, reputation: 1 },
        },
      },
      {
        text: "カモにして剥ぐ",
        check: { stat: "ability", difficulty: 25 },
        success: {
          result: "いかさまと実力で、あっさり懐を空にした。勝ち金より、卓のざわめきの方が後味が悪い。",
          effects: { money: 35, reputation: -12 },
          log: { title: "困窮した神官をカモにする", text: "弱者から金を巻き上げ、賭場の噂になった。" },
        },
        failure: {
          result: "追い詰めたつもりが、土壇場で札が神側に寄った。大敗のあと、自分の手が汚く見えた。",
          effects: { money: -120, reputation: -8, ability: -5 },
          log: { title: "神官に大敗する", text: "弱者狩りが裏目に出て、金も自信も失った。" },
        },
      },
      {
        text: "勝負などやめろと金を渡す",
        conditions: { moneyUnlocked: true, stats: { money: { min: 20 } } },
        result: "彼女は何度も礼を言い、子供たちの話をしてから去った。財布は軽い。胸のあたりは、少しだけ軽い。",
        effects: { money: -25, reputation: 3, ability: 1 },
        log: { title: "孤児院のために金を渡す", text: "賭場で出会った神官に、食費を恵んだ。" },
      },
      {
        text: "関わらず席を立つ",
        result: "救うでもなく、狩るでもなく、煙の向こうへ歩いた。",
      },
    ],
  },

  // ---------- ライバル（幼少〜少年期からの因縁）----------
  {
    id: "gambler_013",
    tags: ["young", "prime", "elder", "work", "gambler", "rival"],
    weight: 9,
    repeatable: true,
    cooldown: 8,
    maxTimes: 3,
    conditions: {
      ageMin: 18,
      jobs: ["gambler"],
      npcs: ["rival"],
      moneyUnlocked: true,
      stats: { money: { max: 40 } },
      notFlags: ["slave"],
    },
    text: "積み上げた負けが、今夜で止めを刺しにくる。チップは底をつき、「あと三回——三回だけ続ければひっくり返せる」と唇が動く。そのとき、見慣れた足音が止まった。",
    choices: [
      {
        text: "黙ってチップを受け取る",
        result: "{ライバル}がチップを卓へ滑らせた。「勘違いするな。お前を倒すのは、この俺だ」。背中だけ投げて、煙の向こうへ消えていく。",
        effects: {
          money: 80,
          npc: { rival: { trust: 5, intimacy: 8 } },
          addFlags: ["rival_stake_owed"],
        },
        log: {
          title: "{ライバル}にチップを立ててもらう",
          text: "ピンチの卓で、好敵手が意地の援助をした。",
        },
      },
      {
        text: "意地でも断る",
        result: "手を払った。「借りは作らない」。{ライバル}は鼻で笑い、「なら潰れてろ」と去った。胸の奥が、少し熱い。",
        effects: {
          reputation: 2,
          npc: { rival: { trust: 3, intimacy: 5 } },
        },
      },
      {
        text: "今すぐ卓で決着をつけろと挑む",
        check: { chance: 40 },
        success: {
          result: "援助のチップを、勝負の火種にした。夜明け前、{ライバル}の山がこちらへ倒れ込む。「……次は、本気で来る」。笑っているようにも、見えた。",
          effects: {
            money: 60,
            reputation: 4,
            npc: { rival: { trust: -3, intimacy: 10 } },
            removeFlags: ["rival_stake_owed"],
          },
          log: {
            title: "{ライバル}との借りを卓で返す",
            text: "援助をきっかけに、因縁の勝負で勝ちを拾った。",
          },
        },
        failure: {
          result: "挑んだ末路は、さらなる赤。{ライバル}は舌打ち一つで追加のチップを置き、「死ぬなよ。俺の獲物だ」と言い残した。",
          effects: {
            money: 40,
            health: -2,
            npc: { rival: { intimacy: 6 } },
            addFlags: ["rival_stake_owed"],
          },
        },
      },
    ],
  },
  {
    id: "gambler_014",
    tags: ["young", "prime", "elder", "work", "gambler", "rival"],
    weight: 8,
    repeatable: true,
    cooldown: 6,
    conditions: {
      ageMin: 18,
      jobs: ["gambler"],
      npcs: ["rival"],
      flags: ["rival_stake_owed"],
      notFlags: ["slave"],
    },
    text: "{ライバル}が対岸の卓から顎をしゃくった。「貸しの分、今日返すぞ」——今夜は、逃げ場のない勝負らしい。",
    choices: [
      {
        text: "正々堂々と受けて立つ",
        check: { chance: 45 },
        success: {
          result: "長く苦い卓だった。最後の札で、貸しは消えた。{ライバル}は勝ち誇らず、「これでイーブンだ。次からが本番だ」とだけ言った。",
          effects: {
            money: 30,
            reputation: 3,
            removeFlags: ["rival_stake_owed"],
            npc: { rival: { trust: 4, intimacy: 8 } },
          },
          log: {
            title: "{ライバル}への借りを清算する",
            text: "因縁の勝負で、チップの貸しを返した。",
          },
        },
        failure: {
          result: "力及ばず、また借りが増えた。{ライバル}は勝ち金を受け取らず、「まだだ。起きろ」と肩を殴った。",
          effects: {
            money: -20,
            health: 1,
            npc: { rival: { intimacy: 5 } },
          },
        },
      },
      {
        text: "いかさまででも返す",
        check: { chance: 55 },
        success: {
          result: "手先は通った。しかし{ライバル}の目は、最初から全部見ていた気がする。「借りは消えた。お前の品位もな」。笑って、席を立つ。",
          effects: {
            money: 50,
            reputation: -4,
            removeFlags: ["rival_stake_owed"],
            npc: { rival: { trust: -8, intimacy: 3 } },
            addFlags: ["cheat"],
          },
          log: {
            title: "{ライバル}への借りを不正で消す",
            text: "いかさまで清算したが、好敵手の目は冷たかった。",
          },
        },
        failure: {
          result: "袖を掴まれた。「俺を誰だと思ってる」。貸しは倍になり、顔は赌场中に売られた。",
          effects: {
            money: -40,
            reputation: -8,
            npc: { rival: { trust: -12, intimacy: -5 } },
          },
          log: {
            title: "{ライバル}へのいかさまがばれる",
            text: "借りを返そうとして不正が露呈した。",
          },
        },
      },
      {
        text: "今はまだ早いと逃げる",
        result: "{ライバル}の呼び声を背に、扉へ走った。貸しは、まだ息をしている。",
        effects: { npc: { rival: { intimacy: -3 } } },
      },
    ],
  },

  // ---------- 稀な死：仮面の闘技 ----------
  {
    id: "gambler_009",
    tags: ["young", "prime", "elder", "work", "gambler", "death"],
    weight: 1,
    maxTimes: 1,
    conditions: {
      ageMin: 18,
      jobs: ["gambler"],
      notFlags: ["slave"],
      stats: { money: { min: 80 } },
    },
    text: "目が覚めると、見知らぬ男女と同じ檻の中にいた。正面には猛獣の檻。客席の仮面が、一斉にこちらを向いている。通る声が響く。「誰が生き残るでしょう。さあ、お賭けください」",
    choices: [
      {
        text: "逃げ回って生き残る",
        check: { stat: "health", difficulty: 62 },
        success: {
          result: "砂を蹴り、影に紛れ、他者へ牙が向くのを祈った。気づけば、立っている人間は{名前}だけだった。渡された賞金は重い。眠れぬ夜のほうが、もっと重い。",
          effects: { money: 800, health: -25, reputation: -5 },
          log: {
            title: "仮面の闘技から生還する",
            text: "見世物の檻で猛獣から逃げ切り、賞金だけを持ち帰った。",
          },
        },
        failure: {
          result: "背中を爪が裂いた。砂に伏せた次の瞬間、顎の力が世界を終わらせた。",
          effects: { death: "仮面闘技の猛獣" },
          log: {
            title: "仮面の闘技で果てる",
            text: "賭博好きの観客の前で、贄として散らされた。",
          },
        },
      },
      {
        text: "他の贄に呼びかけ、連携する",
        check: { stat: "reputation", difficulty: 52 },
        success: {
          result: "声が通った。囮、抑え、一撃——拙くとも役割が生まれ、獣は倒れた。生き延びた全員の手が、震えていた。分け前は少ない。代わりに、息がある。",
          effects: { money: 250, reputation: 8, health: -8 },
          log: {
            title: "仮面の闘技で皆を生かす",
            text: "人望で贄たちを束ね、猛獣の夜を越えた。",
          },
        },
        failure: {
          result: "誰も動かなかった。日頃の卓と酒の評判が、ここでは足枷になる。一人、また一人と砂に沈み、やがて{名前}の番が来た。",
          effects: { death: "仮面闘技の猛獣" },
          log: {
            title: "仮面の闘技で見捨てられる",
            text: "連携を拒まれ、見世物の砂の上で命を落とした。",
          },
        },
      },
      {
        text: "最初の隙に猛獣へ飛びかかる",
        check: { chance: 20 },
        success: {
          result: "狂気じみた突進が、獣の瞬きを奪った。傷だらけで賞金を掴んだとき、仮面の列が初めてざわめいた。",
          effects: { money: 600, health: -35, reputation: 10, ability: 2 },
          log: {
            title: "仮面の闘技で獣に立ち向かう",
            text: "逃げずに猛獣へ飛び込み、血まみれで生還した。",
          },
        },
        failure: {
          result: "牙のほうが早かった。観客の賭け声が、遠ざかるように聞こえた。",
          effects: { death: "仮面闘技の猛獣" },
          log: {
            title: "仮面の闘技で果てる",
            text: "無謀な突撃のまま、猛獣の餌食となった。",
          },
        },
      },
    ],
  },
]);
