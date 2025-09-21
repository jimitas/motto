//効果音の設定
import * as se from "./se.js";

export function text_box(index, data, image, kotoba, flag) {
  //初期設定
  document.getElementById("content").innerHTML = `
    <section style="display:flex;">
      <aside style="width:120px">
        <img id="myimg">
      </aside>
      <article>
        <div id="text_box">
        </div>
        <button class="btn btn-primary" id="clear">クリア</button>
        <button class="btn btn-info" id="del">１つけす</button>
        <button class="btn btn-success" id="next">つぎ</button>
        <button class="btn btn-danger" id="answer">こたえ</button>
      </article>
    </section>
   `;
  let row_length;
  let column_length;

  //文字 テーブルの行数と列数を指定
  if (flag == "katakana") {
    //カタカナの練習のとき
    row_length = 5;
    column_length = 16;
  } else if (flag == "romaji") {
    //ローマ字の練習のとき
    row_length = 4;
    column_length = 16;
  }

  // 配列の入れ替え・設定
  const hairetu = [];
  let arr = [];
  for (let j = 0; j < image.length; j++) {
    hairetu[j] = j;
  }
  for (let j = 0; j < image.length; j++) {
    arr.push(...hairetu.splice(Math.floor(Math.random() * hairetu.length - 1), 1));
  }
  var n = 0;

  var kotae = kotoba[arr[0]];
  var kotae_index = index[arr[0]];
  var kotae_length = kotoba[kotae_index];

  const text_box = document.getElementById("text_box");
  text_box.innerHTML = "";
  const img = document.getElementById("myimg");
  img.setAttribute("src", "./image/" + image[arr[0]]);

  //文字をクリア
  document.getElementById("clear").addEventListener("click", () => {
    text_box.innerHTML = "";
    se.move2.currentTime = 0;
    se.move2.play();
  });

  //文字を1文字消去
  document.getElementById("del").addEventListener("click", () => {
    text_box.innerHTML = text_box.innerHTML.slice(0, text_box.innerHTML.length - 1);
    se.move1.currentTime = 0;
    se.move1.play();
  });

  //次の問題を表示
  document.getElementById("next").addEventListener("click", () => {
    text_box.style.color = "black";
    text_box.innerText = "";
    n = n + 1;
    if (image.length < n + 1) n = 0;
    var img = document.getElementById("myimg");
    img.setAttribute("src", "./image/" + image[arr[n]]);
    if (flag == "romaji") {
      //答えのindexと答えの数を設定
      kotae_index = index[arr[n]];
      kotae_length = kotoba[kotae_index];
    }
    se.set.currentTime = 0;
    se.set.play();
  });

  //こたえの表示
  document.getElementById("answer").addEventListener("click", () => {
    text_box.innerHTML = "";
    text_box.style.color = "blue";
    if (flag == "katakana") {
      text_box.innerHTML = kotoba[arr[n]];
    } else if (flag == "romaji") {
      for (let num = 1; num < kotae_length + 1; num++) {
        text_box.innerHTML = text_box.innerHTML + "　　" + kotoba[kotae_index + num];
      }
    }
    se.reset.currentTime = 0;
    se.reset.play();
  });

  //文字テーブル作成
  const TBL = document.createElement("table");
  TBL.style.marginTop = "20px";
  content.appendChild(TBL);

  for (let i = 0; i < row_length; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < column_length; j++) {
      const td = document.createElement("td");
      td.classList.add("masu");
      const div = document.createElement("div");
      let moji;
      if (flag == "katakana") {
        moji = data[(15 - j) * 5 + i];
      } else if (flag == "romaji") {
        moji = data[i * 16 + j];
      }
      div.classList.add("moji");
      div.innerHTML = moji;
      div.addEventListener("click", () => {
        text_box.style.color = "black";
        se.pi.currentTime = 0;
        se.pi.play();
        text_box.innerHTML = text_box.innerHTML + moji;
        //こたえあわせ
        if (flag == "katakana") {
          if (text_box.innerHTML == kotoba[arr[n]]) {
            se.seikai1.currentTime = 0;
            se.seikai1.play();
            text_box.style.color = "red";
          }
        } else if (flag == "romaji") {
          for (let num = 1; num < kotae_length + 1; num++) {
            kotae = kotoba[kotae_index + num];
            if (text_box.innerHTML == kotae) {
              se.seikai1.currentTime = 0;
              se.seikai1.play();
              text_box.style.color = "red";
            }
          }
        }
      });
      td.appendChild(div);
      tr.appendChild(td);
    }
    TBL.appendChild(tr);
  }
}
