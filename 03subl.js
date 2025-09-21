import { dragEvent } from "./dragEvent.js";

export function subl() {
  document.getElementById("content").innerHTML = `
  <section id="UP" style="
    display: flex;
    justify-content: center;
    margin-top: 2vw;"
  >
    <table id="TBL_A"></table>
    <table id="TBL_B"></table>
  </section>
  <section id="DOWN" style="
    display: flex;
    justify-content: center;
    margin-top: 10vw;"
  >
    <table id="TBL_C"></table>
    <table id="TBL_D"></table>
  </section>
   `;

  // テーブル(空白)　作成
  for (let i = 0; i < 4; i++) {
    for (let row = 0; row < 2; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 5; col++) {
        const td = document.createElement("td");
        td.classList.add("droppable-elem");
        tr.appendChild(td);
        if (i > 1) {
          const div = document.createElement("div");
          div.classList.add("draggable-elem");
          div.setAttribute("draggable","true");
          td.appendChild(div);
          if (i == 2) {
            div.style.backgroundColor = "#ff2599";
          } else if (i == 3) {
            div.style.backgroundColor = "#3b82c4";
          }
        }
      }
      switch (i) {
        case 0:
          TBL_A.appendChild(tr);
          break;
        case 1:
          TBL_B.appendChild(tr);
          break;
        case 2:
          TBL_C.appendChild(tr);
          break;
        case 3:
          TBL_D.appendChild(tr);
          break;
      }
    }
  }
  dragEvent();
}
