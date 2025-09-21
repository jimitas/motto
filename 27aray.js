import * as se from "./se.js";

export function aray() {
  var col = 1;
  var row = 1;
  var seki = col * row;
  init();
  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");
  const val = document.getElementById("val");
  change_array(row, col);

  function init() {
    const field = document.createElement("div");
    content.appendChild(field)
    field.style.display = "flex";
    //九九表の作成
    const TBL = document.createElement("table");
    TBL.id = "kuku_hyou";
    field.appendChild(TBL);
    for (let i = 0; i < 10; i++) {
      const tr = document.createElement("tr");
      TBL.appendChild(tr);
      for (let j = 0; j < 10; j++) {
        const td = document.createElement("td");
        tr.appendChild(td);
        if (i === 0 && j != 0) {
          const btn = document.createElement("button");
          td.appendChild(btn);
          btn.classList.add("btn", "btn-danger");
          btn.innerHTML = j;
          btn.addEventListener("click", () => {
            se.move1.currentTime = 0;
            se.move1.play();
            change_col(j);
          });
        }
        if (i != 0 && j === 0) {
          const btn = document.createElement("button");
          td.appendChild(btn);
          btn.classList.add("btn", "btn-primary");
          btn.innerHTML = i;
          btn.addEventListener("click", () => {
            se.move1.currentTime = 0;
            se.move1.play();
            change_row(i);
          });
        }
        if (i === 0 && j === 0) {
          const btn = document.createElement("button");
          td.appendChild(btn);
          btn.classList.add("btn", "btn-success");
          btn.innerHTML = "？";
          btn.addEventListener("click", () => {
            se.reset.currentTime = 0;
            se.reset.play();
            shuffle();
          });
        }
      }
    }
    //九九の式作成
    const shiki = document.createElement("div");
    field.appendChild(shiki);
    shiki.id = "array_shiki";
    shiki.innerHTML = `
      <div id="input1">?</div>
      <div>×</div>
      <div id="input2">?</div>
      <div>=</div>
      <div id="val">?</div>
    `;
  }

  input1.addEventListener("click", () => {

    if (input1.innerHTML === "?") {
      se.move2.currentTime = 0;
      se.move2.play();
      input1.innerHTML = row;
    } else {
      se.piron.currentTime = 0;
      se.piron.play();
      input1.innerHTML = "?";
    }
  });
  input2.addEventListener("click", () => {
    if (input2.innerHTML === "?") {
      se.move2.currentTime = 0;
      se.move2.play();
      input2.innerHTML = col;
    } else {
      se.piron.currentTime = 0;
      se.piron.play();
      input2.innerHTML = "?";
    }
  });
  val.addEventListener("click", () => {
    if (val.innerHTML === "?") {
      se.move2.currentTime = 0;
      se.move2.play();
      val.innerHTML = seki;
    } else {
      se.piron.currentTime = 0;
      se.piron.play();
      val.innerHTML = "?";
    }
  });

  function change_col(j) {
    col = j;
    change_array(row, col);
  }
  function change_row(i) {
    row = i;
    change_array(row, col);
  }
  function shuffle() {
    col = Math.floor(Math.random() * 9 + 1);
    row = Math.floor(Math.random() * 9 + 1);
    change_array(row, col);
  }
  function change_array(row, col) {
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        document.getElementById("kuku_hyou").rows[i].cells[j].innerHTML = "";
      }
    }
    for (let i = 1; i <= row; i++) {
      for (let j = 1; j <= col; j++) {
        document.getElementById("kuku_hyou").rows[i].cells[j].innerHTML = "<div></div>";
      }
    }
    seki = col * row;
    if (input1.innerHTML === "?") {
      input1.innerHTML = "?";
    } else {
      input1.innerHTML = row;
    }
    if (input2.innerHTML === "?") {
      input2.innerHTML = "?";
    } else {
      input2.innerHTML = col;
    }
    if (val.innerHTML === "?") {
      val.innerHTML = "?";
    } else {
      val.innerHTML = seki;
    }
  }
}
