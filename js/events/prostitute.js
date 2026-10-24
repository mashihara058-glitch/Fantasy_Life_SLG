// 娼婦イベント
// 方針: 18歳未満は直接的な性的労働（客を取る）イベントを出さない。
//   - 客取り系は ageMin: 18 かつ flags: ["prostitute"]（水揚げ後／成人入職）
//   - 下働き（prostitute_apprentice）中は家事・盗みなど非性的イベントのみ

/**
 * 特定種族を求める客。
 * variants に { text, praise?, doubt? } を並べると、セリフ違いのイベントをまとめて登録できる。
 * praise / doubt を省略した variant は、引数の共通 praise / doubt を使う。
 */
function prostituteRaceClient({ id, species, raceLabel, praise, doubt, variants }) {
  const tip = { money: 8, ability: 1, reputation: 2 };
  // バリアントが増えても種族イベント全体が重くなりすぎないよう、少し割り振る
  const weight = Math.max(3, Math.round(6 / Math.sqrt(variants.length)));

  return variants.map((v, i) => {
    const askText = v.text;
    const ok = v.praise || praise;
    const no = v.doubt || doubt;
    return {
      id: variants.length === 1 ? id : `${id}_${i + 1}`,
      tags: ["young", "prime", "work", "prostitute"],
      weight,
      repeatable: true,
      cooldown: 4,
      conditions: {
        ageMin: 18,
        jobs: ["prostitute"],
        flags: ["prostitute"],
        species: [species],
      },
      text: askText,
      choices: [
        {
          text: "名乗って席へ向かう",
          conditions: { notFlags: ["changeling"] },
          result: ok,
          effects: tip,
          log: { title: `${raceLabel}好みの客をとる`, text: "珍しい出自が、夜の値を上げた。" },
        },
        {
          text: "名乗って席へ向かう",
          conditions: { flags: ["changeling"] },
          check: { chance: 50 },
          success: {
            result: ok,
            effects: tip,
            log: { title: `${raceLabel}好みの客をとる`, text: "化けの皮が、うまく持った夜だった。" },
          },
          failure: {
            result: no,
            effects: { reputation: -2, health: -2 },
          },
        },
        {
          text: "他の嬢に譲る",
          result: "話題の客は、別の階へ案内されていった。",
        },
      ],
    };
  });
}

GAME.registerEvents([
  {
    id: "prostitute_001",
    tags: ["young", "work", "prostitute"],
    weight: 12,
    repeatable: true,
    cooldown: 1,
    conditions: {
      ageMin: 18,
      jobs: ["prostitute"],
      flags: ["prostitute_apprentice"],
    },
    text: "下働きの年季が開けた。主人が、初めて客をとる話を切り出してきた。",
    choices: [
      {
        text: "水揚げを受け入れる",
        check: { stat: "ability", difficulty: 35 },
        success: {
          result: "緊張で肩が凝る夜だったが、祝儀は厚く、先輩たちも杯を重ねて祝ってくれた。",
          effects: {
            money: 20,
            ability: 5,
            health: -5,
            addFlags: ["prostitute"],
            removeFlags: ["prostitute_apprentice"],
          },
          log: { title: "水揚げする", text: "下働きを終え、娼婦として客をとり始めた。" },
        },
        failure: {
          result: "相手は気難しかった。それでも仕事としては通り、主人は「次は慣れる」とだけ言った。",
          effects: {
            health: -5,
            reputation: -1,
            addFlags: ["prostitute"],
            removeFlags: ["prostitute_apprentice"],
          },
          log: { title: "水揚げする", text: "初めての夜は厳しい相手だったが、一応の区切りはついた。" },
        },
      },
      {
        text: "まだその覚悟が決まらない",
        result: "主人は舌打ちひとつで引き下がった。話は、また来年になるだろう。",
      },
    ],
  },
  {
    id: "prostitute_002",
    tags: ["young", "work", "prostitute"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    conditions: {
      jobs: ["prostitute"],
      flags: ["prostitute_apprentice"],
    },
    text: "洗濯当番の桶に、人気の嬢の衣裳が浮いている。袖の縫い目から、高い指輪がこぼれ落ちた。",
    choices: [
      {
        text: "指輪を盗む",
        check: { chance: 50 },
        success: {
          result: "ポケットに滑り込ませた。翌朝は館中が騒いだが、嫌疑はこちらまで来なかった。",
          effects: { money: 20, reputation: -1 },
          log: { title: "指輪を持ち出す", text: "洗濯場で見つけた指輪を、黙って自分のものにした。" },
        },
        failure: {
          result: "総点検で荷物を開けられ、底から指輪が出た。言い訳の余地はなかった。",
          effects: { health: -5, reputation: -10 },
          log: { title: "盗みを見咎められる", text: "洗濯場の指輪を持ち出したのが、すぐにばれた。" },
        },
      },
      {
        text: "持ち主に返す",
        check: { stat: "reputation", difficulty: 30 },
        success: {
          result: "嬢は安堵の息をついた。「助かった。これ、あげる」——菓子と、わずかな礼金だった。",
          effects: { health: 3, reputation: 5, money: 3 },
        },
        failure: {
          result: "受け取ってはくれたが、目は冷たい。「あんたが抜いたんじゃないの」と、短く言われた。",
          effects: { reputation: -1 },
        },
      },
    ],
  },
  {
    id: "prostitute_003",
    tags: ["young", "prime", "work", "prostitute"],
    weight: 10,
    repeatable: true,
    cooldown: 3,
    conditions: { jobs: ["prostitute"] },
    text: "同僚が青ざめている。今夜の指名客が来るというのに、熱っぽくて立てないらしい。",
    choices: [
      {
        text: "肩と背をほぐしてあげる",
        check: { stat: "ability", difficulty: 35 },
        success: {
          result: "息が少し楽になったようだ。同僚は握った手に、短い礼を乗せた。",
          effects: { ability: 2, reputation: 1 },
        },
        failure: {
          result: "技が足りず、あまり楽にはならなかった。それでも「気を使ってくれてありがとう」と言われた。",
        },
      },
      {
        text: "自分が代わりに出る",
        conditions: { ageMin: 18, flags: ["prostitute"] },
        check: { stat: "ability", difficulty: 30 },
        success: {
          result: "急な代役だと断っておいたが、客は機嫌を損ねず、夜は無事に明けた。",
          effects: { ability: 1, reputation: 1, money: 5 },
        },
        failure: {
          result: "扉を開けた客が、明らかに失望した。「呼ばれた子と違う」——短い夜になった。",
          effects: { reputation: -2 },
        },
      },
      {
        text: "手元の薬を分ける",
        check: { chance: 50 },
        success: {
          result: "薬が当たり、同僚はなんとか化粧台の前に立てた。後日、薬代以上の礼が届いた。",
          effects: { ability: 1, reputation: 3, money: 2 },
        },
        failure: {
          result: "効き目は鈍く、結局ほかの嬢が穴を埋めた。薬は無駄になったが、悪意は買われなかった。",
          effects: { money: -5, reputation: 1 },
        },
      },
    ],
  },
  {
    id: "prostitute_004",
    tags: ["young", "prime", "work", "prostitute"],
    weight: 5,
    repeatable: true,
    cooldown: 4,
    conditions: { jobs: ["prostitute"] },
    text: "このところ、店のみんなの元気がない。",
    choices: [
      {
        text: "おいしい料理を作る",
        conditions: { notFlags: ["prostitute_to_cook"] },
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "故郷の味を思い出しながら、元気が出るといわれる料理を作った。みんなおいしそうに食べてくれた。",
          effects: { reputation: 5, health: 5, addFlags: ["prostitute_to_cook"] },
          log: { title: "店で料理をふるまう", text: "料理上手という評判が広まった。" },
        },
        failure: {
          result: "残念ながら鍋を焦げ付かせてしまった。先輩が励ましてくれた。",
          effects: { reputation: -1, health: -1 },
        },
      },
      {
        text: "薬草茶を淹れる",
        conditions: { notFlags: ["prostitute_to_medic"] },
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "体を温め、気分を良くすると言われている薬草でお茶を淹れた。「体が軽くなった」と礼を言われた。",
          effects: { reputation: 5, health: 5, addFlags: ["prostitute_to_medic"] },
          log: { title: "薬草茶をふるまう", text: "薬草に詳しいという評判が広まった。" },
        },
        failure: {
          result: "火加減を誤ったのか、苦くて草のにおいがきつい液体が出来上がった。とても飲めたものではなかった。",
          effects: { reputation: -1, health: -1 },
        },
      },
      {
        text: "励ます",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "明るい{名前}に、店のみんなが元気をもらった。",
          effects: { reputation: 3 },
        },
        failure: {
          result: "{名前}の空回りで終わった。",
          effects: { reputation: -2 },
        },
      },
    ],
  },
  {
    id: "prostitute_to_cook",
    tags: ["young", "prime", "work", "prostitute", "career"],
    weight: 8,
    repeatable: true,
    cooldown: 3,
    conditions: {
      jobs: ["prostitute"],
      flags: ["prostitute_to_cook"],
    },
    text: "とある料理人が、{名前}の評判を聞いて店にやってきた。新しい料理人を探しているのだという。",
    choices: [
      {
        text: "料理の腕を披露する",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "料理人は{名前}の料理を味見して深くうなずき、自分の店で働かないかと誘った。",
          effects: {
            job: "cook",
            reputation: 5,
            health: 5,
            removeFlags: [
              "slave",
              "prostitute",
              "prostitute_apprentice",
              "prostitute_to_cook",
              "prostitute_to_medic",
            ],
          },
          log: { title: "料理人になる", text: "娼館から料理屋へ転職した。" },
        },
        failure: {
          result: "料理はうまくできたが、料理人の基準には達していなかった。店のみんなが「おいしいよ」と褒めてくれた。",
          effects: { reputation: 1, health: 2, ability: 2 },
        },
      },
      {
        text: "料理人にはならないと断る",
        result: "自分には今の仕事のほうがあっていると思った。",
        // 旗を外さないと、断っても同じ勧誘が条件を満たし続ける
        effects: { removeFlags: ["prostitute_to_cook"] },
      },
    ],
  },
  {
    id: "prostitute_to_medic",
    tags: ["young", "prime", "work", "prostitute", "career"],
    weight: 8,
    repeatable: true,
    cooldown: 3,
    conditions: {
      jobs: ["prostitute"],
      flags: ["prostitute_to_medic"],
    },
    text: "とある老婆が、{名前}の評判を聞いて店にやってきた。薬の扱いがうまい嬢がいると聞いたのだという。",
    choices: [
      {
        text: "調合の腕を披露する",
        check: { stat: "ability", difficulty: 60 },
        success: {
          result: "老婆は「まだまだだが、教え込めば使い物になりそうだ」と厳しく言った。しかし{名前}への期待が見て取れた。",
          effects: {
            job: "medic",
            reputation: 5,
            health: 5,
            removeFlags: [
              "slave",
              "prostitute",
              "prostitute_apprentice",
              "prostitute_to_cook",
              "prostitute_to_medic",
            ],
          },
          log: { title: "薬師になる", text: "娼館から薬師へ転職した。" },
        },
        failure: {
          result: "老婆は首を横に振った。残念ながら、{名前}は老婆の求める基準から程遠かったらしい。",
          effects: { reputation: 1, ability: 2 },
        },
      },
      {
        text: "薬師にはならないと断る",
        result: "自分には今の仕事のほうがあっていると思った。",
        effects: { removeFlags: ["prostitute_to_medic"] },
      },
    ],
  },
  {
    id: "prostitute_lover",
    tags: ["young", "prime", "work", "prostitute"],
    weight: 10,
    conditions: {
      ageMin: 18,
      jobs: ["prostitute"],
      flags: ["prostitute"],
      npcs: ["lover"],
    },
    text: "娼婦として働いている{名前}のもとに、{恋人}が訪ねてきた。",
    choices: [
      {
        text: "迎え入れる",
        check: { chance: 50 },
        success: {
          result: "{恋人}は{名前}が元気でやっているのを見て安心し、差し入れを置いて帰っていった。",
          effects: { money: 5, health: 10, npc: { lover: { trust: 3, intimacy: 3 } } },
        },
        failure: {
          result: "{恋人}は{名前}が自分だけのものではないことに耐えられず、別れを告げた。",
          effects: { health: -10, npcState: { lover: "left" } },
          log: { title: "{恋人}と別れる", text: "夜の仕事を受け入れられず、恋は終わった。" },
        },
      },
      {
        text: "会うのを拒否する",
        check: { chance: 50 },
        success: {
          result: "{恋人}は「また来る」と告げ、ドアの前に差し入れを置いて去った。",
          effects: { health: 1, money: 5 },
        },
        failure: {
          result: "その後、{恋人}が訪れることは二度となかった。",
          effects: { health: -10, npcState: { lover: "left" } },
          log: { title: "{恋人}を拒む", text: "扉の向こうで、恋が終わった。" },
        },
      },
    ],
  },
  {
    id: "prostitute_spouse",
    tags: ["young", "prime", "work", "prostitute"],
    weight: 10,
    conditions: {
      ageMin: 18,
      jobs: ["prostitute"],
      flags: ["prostitute", "married"],
      npcs: ["spouse"],
    },
    text: "娼婦として働いている{名前}のもとに、{配偶者}が訪ねてきた。",
    choices: [
      {
        text: "迎え入れる",
        check: { chance: 70 },
        success: {
          result: "{配偶者}は{名前}が元気でやっているのを見て安心し、差し入れを置いて帰っていった。",
          effects: { money: 5, health: 10, npc: { spouse: { trust: 3, intimacy: 3 } } },
        },
        failure: {
          result: "{配偶者}は{名前}が自分だけのものではないことに耐えられず、別れを告げた。",
          effects: {
            health: -10,
            npcState: { spouse: "left" },
            removeFlags: ["married"],
          },
          log: { title: "{配偶者}と離別する", text: "夜の仕事を受け入れられず、夫婦は別れた。" },
        },
      },
      {
        text: "会うのを拒否する",
        check: { chance: 70 },
        success: {
          result: "{配偶者}は「また来る」と告げ、ドアの前に差し入れを置いて去った。",
          effects: { health: 1, money: 5 },
        },
        failure: {
          result: "その後、{配偶者}が訪れることは二度となかった。",
          effects: {
            health: -10,
            npcState: { spouse: "left" },
            removeFlags: ["married"],
          },
          log: { title: "{配偶者}を拒む", text: "扉の向こうで、夫婦の縁が切れた。" },
        },
      },
    ],
  },
  {
    id: "prostitute_spouse_NTR",
    tags: ["young", "prime", "work", "prostitute"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      ageMin: 18,
      jobs: ["prostitute"],
      flags: ["prostitute", "married"],
      npcs: ["spouse"],
    },
    text: "娼婦として働いている{名前}のもとに、{配偶者}の友人だという者が訪ねてきた。{名前}をぜひとも買いたいという。",
    choices: [
      {
        text: "迎え入れる",
        check: { chance: 70 },
        success: {
          result: "{名前}はプロとして、ほかの客と同じように扱った。この一件を知った周囲は、どちらかといえば{名前}に同情的だった。",
          effects: { money: 5, reputation: 1, npc: { spouse: { trust: -5, intimacy: -5 } } },
          log: { title: "{配偶者}の知人を客にする", text: "仕事として受けたが、家庭には影が差した。" },
        },
        failure: {
          result: "客は「これで{配偶者}を悔しがらせることができる」と下衆な笑みを浮かべた。",
          effects: {
            money: 5,
            reputation: -3,
            npc: { spouse: { trust: -10, intimacy: -10 } },
          },
          log: { title: "{配偶者}の知人を客にする", text: "悪意ある指名に、心がざわついた。" },
        },
      },
      {
        text: "断る",
        result: "{名前}はそれはできないと拒否した。客は「あきらめないからな」と言い捨てて帰った。",
        effects: { reputation: 1, npc: { spouse: { trust: 5, intimacy: 5 } } },
      },
    ],
  },
  {
    id: "prostitute_lover_NTR",
    tags: ["young", "prime", "work", "prostitute"],
    weight: 8,
    repeatable: true,
    cooldown: 5,
    conditions: {
      ageMin: 18,
      jobs: ["prostitute"],
      flags: ["prostitute"],
      npcs: ["lover"],
      noNpcs: ["spouse"],
    },
    text: "{恋人}の友人だという者が訪ねてきた。にやにやしながら{名前}を指名してきた。",
    choices: [
      {
        text: "迎え入れる",
        check: { chance: 70 },
        success: {
          result: "{名前}は他の客と同じように、今夜の客を扱った。",
          effects: { money: 5, reputation: 1, npc: { lover: { trust: -5, intimacy: -5 } } },
          log: { title: "{恋人}の知人を客にする", text: "仕事として通したが、胸の奥が重かった。" },
        },
        failure: {
          result: "客は去り際、「{恋人}に教えてやらないとな」と告げて{名前}を悲しませた。",
          effects: {
            money: 5,
            reputation: -3,
            npc: { lover: { trust: -10, intimacy: -10 } },
          },
          log: { title: "{恋人}の知人を客にする", text: "{恋人}との絆に、ひびが入った。" },
        },
      },
      {
        text: "断る",
        result: "{名前}はそれはできないと拒否した。客は「また来る」と言い捨てて帰った。",
        effects: { reputation: 1, npc: { lover: { trust: 5, intimacy: 5 } } },
      },
    ],
  },
  {
    id: "prostitute_friend",
    tags: ["young", "prime", "work", "prostitute"],
    weight: 5,
    repeatable: true,
    cooldown: 4,
    conditions: {
      ageMin: 18,
      jobs: ["prostitute"],
      flags: ["prostitute"],
      npcs: ["friend"],
    },
    text: "友人の{友人}が店に来た。意外なことに{名前}を指名してきた。",
    choices: [
      {
        text: "迎え入れる",
        check: { stat: "ability", difficulty: 50 },
        success: {
          result: "{名前}は他の客と同じように、今夜の客を扱った。{友人}は「実は以前からこうしたかった」と照れ臭そうに告げた。",
          effects: { money: 5, npc: { friend: { intimacy: 5 } } },
          log: { title: "{友人}を接客する", text: "{友人}の本心を知った。" },
        },
        failure: {
          result: "{友人}とは、今まで通りの関係でいられない気がした。",
          effects: { npc: { friend: { trust: -5, intimacy: -5 } } },
          log: { title: "{友人}を接客する", text: "友人関係に、気まずい影が差した。" },
        },
      },
      {
        text: "断る",
        result: "{名前}は「{友人}は友達としてしか見られない」と断った。{友人}は残念そうに店を後にした。",
        effects: { npc: { friend: { intimacy: -5 } } },
      },
    ],
  },

  // ---------- 種族指名の客（variants を増やすだけでセリフ違いを追加できる）----------
  ...prostituteRaceClient({
    id: "prostitute_dwarf",
    species: "dwarf",
    raceLabel: "ドワーフ",
    praise: "客は{名前}の肩幅と手のひらの厚みを気に入り、杯を重ねるたびにチップを置いていった。",
    doubt: "「ドワーフだと？　背丈も鬚も、芝居くさい」——席を立つ音が、階まで響いた。",
    variants: [
      {
        text: "カウンターで、低い声が通る。「ドワーフの嬢はいるか。腕の太いのがいい」。視線が、フロアを舐めるように動く。",
      },
      {
        text: "酔った客が卓を叩く。「ひげが黒くて、うんと太く編んでるやつだ！　いないのか、ドワーフは」。",
        praise: "客は{名前}の編みひげを指でなぞり、「これだよこれ」と何度も笑い、懐を緩めた。",
      },
      {
        text: "鉱夫上がりらしい客が、靴音も荒く入ってくる。「丸太みてぇな太腿を出せ。ドワーフ以外は要らん」。",
        praise: "客は{名前}の踏み込みを見て満足げに頷き、鉱石の匂いのする指でチップを置いた。",
      },
    ],
  }),
  ...prostituteRaceClient({
    id: "prostitute_beastfolk",
    species: "beastfolk",
    raceLabel: "獣人",
    praise: "客は{名前}の体温と、毛並みに残る野外の匂いをほめ、夜明け前まで離れなかった。",
    doubt: "鼻を鳴らした客が首を振る。「獣人の匂いがしない。寄せ集めだろ」——勘定は最小限だった。",
    variants: [
      {
        text: "耳と尾を探す目つきの客がいる。「獣人はいないのか。匂いの濃い子でいい」。隣の嬢が、小さく息を詰めた。",
      },
      {
        text: "毛皮の外套の客が、喉を鳴らすように言う。「牙の見える笑みの子を。狩りのあとの熱が残ってるやつ」。",
        praise: "客は{名前}の牙に触れるふりをして笑い、「いい獣だ」と短く言い、礼を厚く置いた。",
      },
      {
        text: "上等な身なりの紳士が金貨をカウンターに積んだ。「全身毛むくじゃらの嬢がいい。人間には飽きたんだ」",
        praise: "「この毛並みと手触り、なんとも癒される！」紳士は感動し、{名前}をお姫様のように扱った。",
      },
    ],
  }),
  ...prostituteRaceClient({
    id: "prostitute_elf",
    species: "elf",
    raceLabel: "エルフ",
    praise: "客は{名前}の輪郭を長く眺め、「時が止まったようだ」と繰り返し、礼を厚く置いていった。",
    doubt: "近づいた拍子に、客の目が冷えた。「耳も肌も、本物の退屈さがない」——短い退出だった。",
    variants: [
      {
        text: "静かな客が、主人にだけ聞こえる声で頼む。「エルフはいるか。歳を感じさせない顔がいい」。",
      },
      {
        text: "詩人じみた客が手帳を閉じる。「森の言葉を知る耳がいい。エルフ以外には、用がない」。",
        praise: "客は{名前}の耳に短い詩を捧げ、「今夜は筆が走る」と呟いて、余分な銀を残した。",
      },
      {
        text: "魔術師らしい格好をした客が、切羽詰まった様子で「エルフを！」と叫んだ。",
        praise: "「これでなければ、深い森の木漏れ日のような魔力を感じることはできない」と、客は大いに感動し、再来店を約束した。",
      },
    ],
  }),
  ...prostituteRaceClient({
    id: "prostitute_lizardfolk",
    species: "lizardfolk",
    raceLabel: "竜人",
    praise: "客は{名前}の鱗の光沢に触れ、低い声で満足し、冷えた酒ごとチップを残した。",
    doubt: "指先で腕を確かめた客が、すぐ手を引く。「温かい。鱗も薄い」——疑いは、もう覆らなかった。",
    variants: [
      {
        text: "鱗を探す客が、灯の遠い席を指定した。「竜人はいるか。冷たい肌の子を」。夏でも、息が白い客だ。",
      },
      {
        text: "旅の商人らしき客が地図を畳む。「砂漠越しの鱗がいい。熱を吸わない肌の、竜人を」。",
        praise: "客は{名前}の腕の冷たさに目を細め、砂漠の話をひとつだけして、静かに銀を置いた。",
      },
      {
        text: "異国の衣装に身を包んだ客が「しっぽがあって、へそのない嬢を出してくれ」と言った。",
        praise: "客は「やはり竜人はいい。{名前}か、覚えておく」といい、その後常連になった。",
      },
    ],
  }),
]);

