import { mapEvent } from "./mapEvent.js";

export function kyot() {
  const ken_A = ["右京区", "左京区", "北区", "南区", "東山区", "伏見区", "西京区", "山科区", "上京区", "下京区", "中京区"];
  const ken_B = ["うきょうく", "さきょうく", "きたく", "みなみく", "ひがしやまく", "ふしみく", "にしきょうく", "やましなく", "かみぎょうく", "しもぎょうく", "なかぎょうく"];
  const ken_C = ["red", "orange", "yellow", "yellowgreen", "green", "lightblue", "blue", "plum", "purple", "lightpink", "brown"];
  const ken_left = [7, 22, 14, 5, 30, 25, 2, 33, 33, -1, 32];
  const ken_top = [20, 13, 16, 38, 26, 38, 28, 30, 10, 34, 19];
  const num = [];
  const order = [];
  const NUM = 11;
  const flag = "kyot";

  for (let n = 0; n < NUM; n++) {
    num.push(n);
  }
  //　京都市の地図表示
  const section = document.createElement("section");
  content.appendChild(section);
  const article = document.createElement("article");
  section.appendChild(article);
  const aside = document.createElement("aside");
  section.appendChild(aside);
  const TBL = document.createElement("table");
  TBL.style.marginTop = "0vw";
  TBL.style.marginLeft = "1vw";
  aside.appendChild(TBL);
  section.style.display = "flex";

  //京都市地図の配置
  const img = document.createElement("img");
  img.setAttribute("src", "image/kyoutoshi.png");
  img.setAttribute("id", "kyotoshi");
  article.appendChild(img);
  //点数欄の設置
  const tensu = document.createElement("div");
  tensu.setAttribute("id", "tensu");
  aside.appendChild(tensu);
  
  // 京都市のの色付き枠配置
  for (let n = 0; n < NUM; n++) {
    const ken = document.createElement("section");
    ken.setAttribute("id", String(Math.floor(n + 1)));
    ken.classList.add("droppable-elem");
    ken.style.backgroundColor = ken_C[n];
    ken.style.left = ken_left[n] + 2.5 + "vw";
    ken.style.top = ken_top[n] + 19 + "vw";
    article.appendChild(ken);

    const maru = document.createElement("p");
    maru.setAttribute("id", "maru" + String(Math.floor(n + 1)));
    maru.innerHTML = "○";
    maru.classList.add("maru");
    maru.style.left = ken_left[n] + "vw";
    maru.style.top = ken_top[n] + 17 + "vw";
    article.appendChild(maru);

    order.push(...num.splice(Math.floor(Math.random() * num.length - 1), 1));
  }

  //移動のための枠設置
  for (let row = 0; row < 11; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 1; col++) {
      const td = document.createElement("td");
      td.classList.add("droppable-elem");
      const div = document.createElement("div");
      div.setAttribute("id", String(Math.floor(row * 3 + col + 12)));
      div.innerHTML = ken_A[order[row]] + "<br>" + ken_B[order[row]];
      div.classList.add("draggable-elem");
      div.setAttribute("draggable","true");
      td.appendChild(div);
      tr.appendChild(td);
    }
    TBL.appendChild(tr);
  }

  //マップ一致イベントの追加
  mapEvent(NUM, ken_A, flag);
}
