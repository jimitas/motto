import { mapEvent } from "./mapEvent.js";

export function todo() {
  const ken_A = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ];
  const ken_B = [
    "ほっかいどう",
    "あおもりけん",
    "いわてけん",
    "みやぎけん",
    "あきたけん",
    "やまがたけん",
    "ふくしまけん",
    "いばらきけん",
    "とちぎけん",
    "ぐんまけん",
    "さいたまけん",
    "ちばけん",
    "とうきょうと",
    "かながわけん",
    "にいがたけん",
    "とやまけん",
    "いしかわけん",
    "ふくいけん",
    "やまなしけん",
    "ながのけん",
    "ぎふけん",
    "しずおかけん",
    "あいちけん",
    "みえけん",
    "しがけん",
    "きょうとふ",
    "おおさかふ",
    "ひょうごけん",
    "ならけん",
    "わかやまけん",
    "とっとりけん",
    "しまねけん",
    "おかやまけん",
    "ひろしまけん",
    "やまぐちけん",
    "とくしまけん",
    "かがわけん",
    "えひめけん",
    "こうちけん",
    "ふくおかけん",
    "さがけん",
    "ながさきけん",
    "くまもとけん",
    "おおいたけん",
    "みやざきけん",
    "かごしまけん",
    "おきなわけん",
  ];
  const ken_C = [
    "mediumpurple",
    "skyblue",
    "skyblue",
    "skyblue",
    "skyblue",
    "skyblue",
    "skyblue",
    "mediumseagreen",
    "mediumseagreen",
    "mediumseagreen",
    "mediumseagreen",
    "mediumseagreen",
    "mediumseagreen",
    "mediumseagreen",
    "lightgreen",
    "lightgreen",
    "lightgreen",
    "lightgreen",
    "lightgreen",
    "lightgreen",
    "lightgreen",
    "lightgreen",
    "lightgreen",
    "gold",
    "gold",
    "gold",
    "gold",
    "gold",
    "gold",
    "gold",
    "orange",
    "orange",
    "orange",
    "orange",
    "orange",
    "pink",
    "pink",
    "pink",
    "pink",
    "salmon",
    "salmon",
    "salmon",
    "salmon",
    "salmon",
    "salmon",
    "salmon",
    "salmon",
  ];
  const ken_left = [
    56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 45, 45, 45, 45, 45, 45, 45, 45, 45, 22, 22, 22, 22, 22, 22, 22, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  const ken_top = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 9, 12, 15, 18, 21, 24, 27, 30, 33, 0, 3, 6, 9, 12, 15, 18, 0, 3, 6, 9, 12, 15, 18, 21, 24, 0, 3, 6, 9, 12, 15, 18, 21, 24];
  const num = [];
  const order = [];
  const NUM = 47;
  const flag="todo";

  for (let n = 0; n < NUM; n++) {
    num.push(n);
  }

  //　都道府県の表示
  const section = document.createElement("section");
  content.appendChild(section);
  const article = document.createElement("article");
  section.appendChild(article);
  const aside = document.createElement("aside");
  section.appendChild(aside);
  const TBL = document.createElement("table");
  TBL.style.marginTop = "0vw";
  TBL.style.marginLeft = "6vw";
  aside.appendChild(TBL);
  section.style.display = "flex";
  //点数欄の設置
  const tensu = document.createElement("div");
  tensu.setAttribute("id", "tensu");
  aside.appendChild(tensu);
  //日本地図の配置
  const img = document.createElement("img");
  img.setAttribute("src", "image/nihon.png");
  img.setAttribute("id", "todofuken");
  article.appendChild(img);

  // 都道府県の色付き枠配置
  for (let n = 0; n < NUM; n++) {
    const ken = document.createElement("section");
    ken.innerHTML = Math.floor(n + 1);
    ken.setAttribute("id", String(Math.floor(n + 1)));
    ken.classList.add("droppable-elem");
    ken.style.backgroundColor = ken_C[n];
    ken.style.left = ken_left[n] + 2.5 + "vw";
    ken.style.top = ken_top[n] + 20 + "vw";
    article.appendChild(ken);

    const maru = document.createElement("p");
    maru.setAttribute("id", "maru" + String(Math.floor(n + 1)));
    maru.innerHTML = "○";
    maru.classList.add("maru");
    maru.style.left = ken_left[n] + "vw";
    maru.style.top = ken_top[n] + 18 + "vw";
    article.appendChild(maru);

    order.push(...num.splice(Math.floor(Math.random() * num.length - 1), 1));
  }

  for (let row = 0; row < 16; row++) {
    const tr = document.createElement("tr");
    let COL = 3;
    if (row == 15) COL = 2;
    for (let col = 0; col < COL; col++) {
      const td = document.createElement("td");
      td.classList.add("droppable-elem");
      const div = document.createElement("div");
      div.setAttribute("id", String(Math.floor(row * 3 + col + 48)));
      div.innerHTML = ken_A[order[row * 3 + col]] + "<br>" + ken_B[order[row * 3 + col]];
      div.classList.add("draggable-elem", "ken-drag");
      div.setAttribute("draggable","true");
      td.appendChild(div);
      tr.appendChild(td);
    }
    TBL.appendChild(tr);
  }

  //マップ一致イベントの追加
  mapEvent(NUM, ken_A,flag);
}
