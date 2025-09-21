export function reco() {
  var finger;
  //運指データ(0_あける　1_おさえる 2_サミング)
  const u1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const u2 = [1, 1, 1, 1, 1, 1, 1, 1, 0, 1];
  const u3 = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0];
  const u4 = [1, 1, 1, 1, 1, 1, 0, 1, 0, 0];
  const u5 = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0];
  const u6 = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
  const u7 = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1];
  const u8 = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
  const u9 = [1, 1, 1, 0, 1, 1, 0, 1, 0, 0];
  const u10 = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
  const u11 = [1, 1, 0, 1, 1, 0, 0, 0, 0, 0];
  const u12 = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
  const u13 = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0];
  const u14 = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0];
  const u15 = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
  const u16 = [0, 0, 1, 1, 1, 1, 1, 1, 0, 0];
  const u17 = [2, 1, 1, 1, 1, 1, 0, 0, 0, 0];
  const u18 = [2, 1, 1, 1, 1, 0, 0, 0, 0, 0];
  const u19 = [2, 1, 1, 1, 0, 1, 0, 0, 1, 1];
  const u20 = [2, 1, 1, 1, 0, 0, 0, 0, 0, 0];
  const u21 = [2, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const u22 = [2, 1, 1, 0, 0, 0, 0, 0, 0, 0];
  const u23 = [2, 1, 1, 0, 1, 1, 1, 1, 0, 0];
  const u24 = [2, 1, 1, 0, 1, 1, 0, 0, 0, 0];
  const u25 = [2, 1, 0, 0, 1, 1, 0, 0, 0, 0];
  const u26 = [2, 1, 0, 1, 1, 0, 1, 1, 1, 1];
  const u27 = [2, 1, 0, 1, 1, 0, 1, 1, 0, 0];

  const h_class = ["h0", "h1", "h0", "h1", "h0", "h1", "h0", "h1", "h0", "h2", "h0", "h2", "h2", "h2"];

  //リコーダー描画部分の作成(四角)
  const TBL = document.createElement("table");
  for (let i = 0; i < 7; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 2; j++) {
      const td = document.createElement("td");
      td.classList.add(h_class[i * 2 + j]);
      tr.appendChild(td);
    }
    TBL.appendChild(tr);
  }
  content.appendChild(TBL);

  //リコーダー穴の部分の作成
  const hole = [];
  for (let i = 0; i < 10; i++) {
    hole[i] = document.createElement("div");
    hole[i].id = "hole_" + i;
  }
  const H89 = document.createElement("div");
  H89.appendChild(hole[8]);
  H89.appendChild(hole[9]);
  H89.classList.add("hole");
  const H67 = document.createElement("div");
  H67.appendChild(hole[6]);
  H67.appendChild(hole[7]);
  H67.classList.add("hole");
  TBL.rows[0].cells[1].appendChild(H89);
  TBL.rows[1].cells[1].appendChild(H67);
  TBL.rows[2].cells[1].appendChild(hole[5]);
  TBL.rows[3].cells[1].appendChild(hole[4]);
  TBL.rows[4].cells[1].appendChild(hole[3]);
  TBL.rows[5].cells[1].appendChild(hole[2]);
  TBL.rows[6].cells[0].appendChild(hole[0]);
  TBL.rows[6].cells[1].appendChild(hole[1]);

  //データの読み込み
  const No = [9, 11, 0, 14, 16, 18, 0, 21, 23, 0, 26, 28, 30, 0, 33, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25, 27, 29, 31, 32, 34];
  const sound_data = [
    "#ﾄﾞ/♭ﾚ",
    "#ﾚ/♭ﾐ",
    "",
    "#ﾌｧ/♭ｿ",
    "#ｿ/♭ﾗ",
    "#ﾗ/♭ｼ",
    "",
    "#ﾄﾞ/♭ﾚ",
    "#ﾚ/♭ﾐ",
    "",
    "#ﾌｧ/♭ｿ",
    "#ｿ/♭ﾗ",
    "#ﾗ/♭ｼ",
    "",
    "#ﾄﾞ/♭ﾚ",
    "ﾄﾞ",
    "ﾚ",
    "ﾐ",
    "ﾌｧ",
    "ｿ",
    "ﾗ",
    "ｼ",
    "ﾄﾞ",
    "ﾚ",
    "ﾐ",
    "ﾌｧ",
    "ｿ",
    "ﾗ",
    "ｼ",
    "ﾄﾞ",
    "ﾚ",
  ];

  const len = [0, 15, 31];
  //それぞれのキーにイベントを割り当てる。
  const field = document.createElement("div");
  field.classList.add("field");
  const Kenhamo = document.createElement("div");
  Kenhamo.classList.add("reco_Kenhamo");
  const Black = document.createElement("div");
  Black.classList.add("reco_B_Kenban");
  const White = document.createElement("div");
  White.classList.add("W_Kenban");

  for (let j = 0; j < 2; j++) {
    for (let i = len[j]; i < len[j + 1]; i++) {
      const Key = document.createElement("div");
      if (No[i] == 0) {
        Key.classList.add("none", "reco_none");
        Black.appendChild(Key);
      } else {
        Key.innerHTML = sound_data[i];

        const se = new Howl({
          //読み込む音声ファイル
          src: ["Sounds/re_" + No[i] + ".mp3"],

          // 設定 (以下はデフォルト値です)
          preload: true, // 事前ロード
          volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
          loop: false, // ループ再生するか
          autoplay: false, // 自動再生するか

          // 読み込み完了時に実行する処理
          onload: () => {
            Key.removeAttribute("disabled"); // ボタンを使用可能にする
          },
        });

        Key.addEventListener("mousedown", () => {
          Finger(No[i] - 7);
          unshi(finger);
          se.play();
        });
        Key.addEventListener("mouseup", () => {
          se.stop();
        });
        Key.addEventListener("touchstart", () => {
          Finger(No[i] - 7);
          unshi(finger);
          se.play();
        });
        Key.addEventListener("touchend", () => {
          se.stop();
        });
        if (j == 0) {
          Key.classList.add("black", "reco_black");
          Black.appendChild(Key);
        } else if (j == 1) {
          Key.classList.add("white", "reco_white");
          White.appendChild(Key);
        }
      }
    }
    Kenhamo.appendChild(Black);
    Kenhamo.appendChild(White);
  }
  field.appendChild(TBL);
  field.appendChild(Kenhamo);
  content.appendChild(field);
  field.style.display = "flex";

  function Finger(i) {
    switch (i) {
      case 1:
        finger = u1;
        break;
      case 2:
        finger = u2;
        break;
      case 3:
        finger = u3;
        break;
      case 4:
        finger = u4;
        break;
      case 5:
        finger = u5;
        break;
      case 6:
        finger = u6;
        break;
      case 7:
        finger = u7;
        break;
      case 8:
        finger = u8;
        break;
      case 9:
        finger = u9;
        break;
      case 10:
        finger = u10;
        break;
      case 11:
        finger = u11;
        break;
      case 12:
        finger = u12;
        break;
      case 13:
        finger = u13;
        break;
      case 14:
        finger = u14;
        break;
      case 15:
        finger = u15;
        break;
      case 16:
        finger = u16;
        break;
      case 17:
        finger = u17;
        break;
      case 18:
        finger = u18;
        break;
      case 19:
        finger = u19;
        break;
      case 20:
        finger = u20;
        break;
      case 21:
        finger = u21;
        break;
      case 22:
        finger = u22;
        break;
      case 23:
        finger = u23;
        break;
      case 24:
        finger = u24;
        break;
      case 25:
        finger = u25;
        break;
      case 26:
        finger = u26;
        break;
      case 27:
        finger = u27;
        break;
    }
    return finger;
  }

  function unshi(finger) {
    for (let i = 0; i < 10; i++) {
      switch (finger[i]) {
        case 0:
          hole[i].style.backgroundColor = "white";
          hole[i].style.backgroundImage = "linear-gradient(45deg, transparent 49%, white 49%, white 51%, transparent 51%, transparent)";
          break;
        case 1:
          hole[i].style.backgroundColor = "black";
          hole[i].style.backgroundImage = "linear-gradient(45deg, transparent 49%, black 49%, black 51%, transparent 51%, transparent)";
          break;
        case 2:
          hole[i].style.backgroundColor = "white";
          hole[i].style.backgroundImage = "linear-gradient(45deg, transparent 0%, black 0%, black 50%, transparent 50%, transparent)";
          break;
      }
    }
  }
}
