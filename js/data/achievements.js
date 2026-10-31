// 実績の定義（解除済みデータは js/core/achievements.js が別キーで保存）
// 未取得時はタイトル・条件を伏せ、フレーバーだけ見せて推理させる
GAME.data.achievements = [
  {
    id: "medic_taboo",
    title: "過ぎた薬は毒になる",
    condition: "薬師で禁忌を犯す",
    flavor: "天秤に乗せられたのは、あなたの倫理、そして…",
  },
  {
    id: "sold_as_slave",
    title: "一歩戻って落とし穴",
    condition: "奴隷として売られる",
    flavor: "対価は支払われる。どんな形であれ",
  },
  {
    id: "die_in_battle",
    title: "名も無き英雄",
    condition: "戦死する",
    flavor: "名誉ある最期を迎える",
  },
  {
    id: "die_of_old_age",
    title: "冥界へのエスコート",
    condition: "老衰で死ぬ",
    flavor: "今までお疲れ様でした",
  },
  {
    id: "betrayed_by_friend",
    title: "フレネミー",
    condition: "友人に裏切られる",
    flavor: "友達なんかデバフだ！",
  },
  {
    id: "become_gambler",
    title: "回れ。賽よ、円盤よ、リボルバーよ！",
    condition: "博打師になる",
    flavor: "最も儚く、最も薄汚い生き物",
  },
  {
    id: "farmer_revolt_culled",
    title: "殺処分",
    condition: "農民一揆に参加し、処分される",
    flavor: "人を襲う牛などいらない",
  },
];
