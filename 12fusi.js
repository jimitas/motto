export function fusi() {
  const data = ["2buo", "4buo", "4buo", "f4bo", "8buo", "4buo", "4kyu"];
  const doremi = ["レ", "ド", "ラ", "ソ", "ミ"];

  const section = document.createElement("section");
  section.style.display = "flex";
  section.style.padding = "20px";

  const input = document.createElement("input");
  input.setAttribute("type", "range");
  input.setAttribute("class", "custom-range");
  input.setAttribute("min", "60");
  input.setAttribute("max", "180");
  input.setAttribute("step", "5");
  input.style.width = "300px";
  input.style.cursor = "pointer";
  input.addEventListener("change", () => {
    div.innerHTML = "速さ＝" + input.value;
  });
  
  const div = document.createElement("div");
  div.innerHTML = "速さ＝" + input.value;
  div.style.width = "100px";
  
  const btn = document.createElement("button");
  btn.innerHTML = "プレイ";
  btn.style.marginLeft = "20px";
  btn.classList.add("btn", "btn-primary");
  btn.addEventListener("click", () => {
    melody();
  });

  content.appendChild(section);
  section.appendChild(div);
  section.appendChild(input);
  section.appendChild(btn);
  const TBL = document.createElement("table");
  content.appendChild(TBL);
  for (let i = 0; i < 2; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const td = document.createElement("td");
      td.setAttribute("class", "o" + data[j]);
      td.style.backgroundColor = "white";
      if (i == 0) {
        const img = document.createElement("img");
        img.setAttribute("src", "image/" + data[j] + ".png");
        img.setAttribute("class", "onpu");
        td.appendChild(img);
      }
      if (i == 1 && j != 6) {
        const select = document.createElement("select");
        select.setAttribute("id", "select" + j);
        for (let k = 0; k < 5; k++) {
          const kaimei = document.createElement("option");
          kaimei.value = k;
          kaimei.textContent = doremi[k];
          select.appendChild(kaimei);
          select.style.width = "50px";
        }
        td.setAttribute("class", "o" + data[j]);
        td.appendChild(select);
      }
      tr.style.border = "solid 1px black";
      tr.appendChild(td);
    }
    TBL.appendChild(tr);
  }

  function melody() {
    var se = [];
    var tempo = input.value;
    const note = [27, 25, 22, 20, 17];
    for (let i = 0; i < 6; i++) {
      let index = Number(document.getElementById("select" + i).value);
      se[i] = new Howl({
        //読み込む音声ファイル
        src: ["Sounds/re_" + note[index] + ".mp3"],

        sprite: {
          play1: [0, (2000 / tempo) * 60], // 開始から2秒間を再生
          play2: [0, (1000 / tempo) * 60], // 開始から1秒間再生
          play3: [0, (1500 / tempo) * 60], // 開始から1.5秒間再生
          play4: [0, (500 / tempo) * 60], //  開始から0.5秒間再生
        },

        // 設定 (以下はデフォルト値です)
        preload: true, // 事前ロード
        volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
        loop: false, // ループ再生するか
        autoplay: false, // 自動再生するか
      });
    }
    se[0].play("play1");
    se[0].on("end", () => {
      se[1].play("play2");
    });
    se[1].on("end", () => {
      se[2].play("play2");
    });
    se[2].on("end", () => {
      se[3].play("play3");
    });
    se[3].on("end", () => {
      se[4].play("play4");
    });
    se[4].on("end", () => {
      se[5].play("play2");
    });
  }
}
