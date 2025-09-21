import * as se from "./se.js";

export function hyou() {
  se.move1.load();
  const Colors = ["white", "しろ", "pink", "ピンク", "yellow", "きいろ", "lightgreen", "みどり", "lightblue", "あお", "orange", "オレンジ", "lightpurple", "むらさき", "lightbrown", "ちゃいろ"];
  let div_color = "white";

  document.getElementById("content").innerHTML = `
  <select id="color_val"></select>  
  <button  id="reset_btn" class="btn btn-danger">リセット</button>
  <p>ヒント「×」をおすとぜんぶの数字が出るよ</p> 
  <div id="kuku_hyou">
  </div>
`;

  const TBL = document.createElement("table");
  document.getElementById("kuku_hyou").appendChild(TBL);

  for (let i = 1; i <= 8; i++) {
    const Color = document.createElement("option");
    Color.value = i;
    Color.textContent = Colors[i * 2 - 1];
    color_val.appendChild(Color);
  }

  document.getElementById("color_val").addEventListener("change", () => {
    div_color = Colors[color_val.value * 2 - 2];
    se.set.currentTime = 0;
    se.set.play();
  });

  var flag, flag_col, flag_row, flag_ALL;

  document.getElementById("reset_btn").addEventListener("click", () => {
    se.set.currentTime = 0;
    se.set.play();
    var result = window.confirm("ぬった　いろを　もとに　もどしますか？");
    if (result === true) {
      se.reset.currentTime = 0;
      se.reset.play();
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (row == 0 && col != 0) {
            flag_col = false;
          }
          if (col == 0 && row != 0) {
            td.innerHTML = row;
            flag_row = false;
          }
          if (row == 0 && col == 0) {
            flag_ALL = false;
          }
          if (row != 0 && col != 0) {
            flag = false;
            TBL.rows[row].cells[col].innerHTML = "";
            TBL.rows[row].cells[col].style.backgroundColor = "white";
          }
        }
      }
    }
  });

  for (let row = 0; row < 10; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 10; col++) {
      const td = document.createElement("td");
      td.setAttribute("class", "hyou");

      tr.appendChild(td);
      if (row == 0 && col != 0) {
        td.innerHTML = col;
        flag_col = false;
        td.addEventListener("click", () => {
          se.move1.currentTime = 0;
          se.move1.play();
          console.log(flag_col);
          if (flag_col == false) {
            for (let k = 1; k < 10; k++) {
              TBL.rows[k].cells[col].innerHTML = k * col;
            }
            flag_col = true;
          } else if (flag_col == true) {
            for (let k = 1; k < 10; k++) {
              TBL.rows[k].cells[col].innerHTML = "";
              td.style.backgroundColor = "white";
            }
            flag_col = false;
          }
        });
      }
      if (col == 0 && row != 0) {
        td.innerHTML = row;
        flag_row = false;
        td.addEventListener("click", () => {
          se.move1.currentTime = 0;
          se.move1.play();
          console.log(flag_row);
          if (flag_row == false) {
            for (let k = 1; k < 10; k++) {
              TBL.rows[row].cells[k].innerHTML = row * k;
            }
            flag_row = true;
          } else if (flag_row == true) {
            for (let k = 1; k < 10; k++) {
              TBL.rows[row].cells[k].innerHTML = "";
            }
            flag_row = false;
          }
        });
      } else if (row == 0 && col == 0) {
        td.innerHTML = "×";
        flag_ALL = false;
        td.addEventListener("click", () => {
          se.move1.currentTime = 0;
          se.move1.play();
          if (flag_ALL == false) {
            for (let k = 1; k < 10; k++) {
              for (let l = 1; l < 10; l++) {
                TBL.rows[k].cells[l].innerHTML = k * l;
              }
            }
            flag_ALL = true;
          } else if (flag_ALL == true) {
            for (let k = 1; k < 10; k++) {
              for (let l = 1; l < 10; l++) {
                TBL.rows[k].cells[l].innerHTML = "";
              }
            }
            flag_ALL = false;
          }
        });
      }
      if (row != 0 && col != 0) {
        flag = false;
        td.style.color = "red";
        td.style.backgroundColor = "white";
        td.addEventListener("click", () => {
          se.move1.currentTime = 0;
          se.move1.play();
          if (flag == false) {
            td.innerHTML = row * col;
            td.style.backgroundColor = div_color;
            flag = true;
          } else if (flag == true) {
            td.innerHTML = "";
            flag = false;
          }
        });
      }
    }
    TBL.appendChild(tr);
  }
}
