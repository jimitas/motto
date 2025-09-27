function createRecorderTable() {
  // 確実な定数
  const HOLE_COUNT = 10;        // リコーダーの穴数
  const TABLE_ROWS = 7;         // テーブル行数
  const TABLE_COLS = 2;         // テーブル列数

  const h_class = ["h0", "h1", "h0", "h1", "h0", "h1", "h0", "h1", "h0", "h2", "h0", "h2", "h2", "h2"];

  //リコーダー描画部分の作成(四角)
  const TBL = document.createElement("table");
  for (let i = 0; i < TABLE_ROWS; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < TABLE_COLS; j++) {
      const td = document.createElement("td");
      td.classList.add(h_class[i * 2 + j]);
      tr.appendChild(td);
    }
    TBL.appendChild(tr);
  }

  //リコーダー穴の部分の作成
  const hole = [];
  for (let i = 0; i < HOLE_COUNT; i++) {
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

  return { table: TBL, holes: hole };
}

function setupFingerSystem() {
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

  // 運指パターンの配列
  const fingerPatterns = [
    u1, u2, u3, u4, u5, u6, u7, u8, u9, u10,
    u11, u12, u13, u14, u15, u16, u17, u18, u19, u20,
    u21, u22, u23, u24, u25, u26, u27
  ];

  function Finger(i) {
    finger = fingerPatterns[i - 1];
    return finger;
  }

  function unshi(holes) {
    const HOLE_COUNT = 10;  // リコーダーの穴数
    for (let i = 0; i < HOLE_COUNT; i++) {
      switch (finger[i]) {
        case 0:
          holes[i].style.backgroundColor = "white";
          holes[i].style.backgroundImage = "linear-gradient(45deg, transparent 49%, white 49%, white 51%, transparent 51%, transparent)";
          break;
        case 1:
          holes[i].style.backgroundColor = "black";
          holes[i].style.backgroundImage = "linear-gradient(45deg, transparent 49%, black 49%, black 51%, transparent 51%, transparent)";
          break;
        case 2:
          holes[i].style.backgroundColor = "white";
          holes[i].style.backgroundImage = "linear-gradient(45deg, transparent 0%, black 0%, black 50%, transparent 50%, transparent)";
          break;
      }
    }
  }

  return { Finger, unshi };
}

function createKeyboard(holes, fingerSystem) {
  // 確実な定数
  const KEYBOARD_TYPES = 2;     // 鍵盤の種類数（黒鍵・白鍵）

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
  // TODO: 鍵盤範囲の意味要確認 (おそらく黒鍵0-15、白鍵15-31)
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

  for (let j = 0; j < KEYBOARD_TYPES; j++) {
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
          // TODO: なぜ7を引く？（おそらくアルトリコーダーの音程オフセット）
          fingerSystem.Finger(No[i] - 7);
          fingerSystem.unshi(holes);
          se.play();
        });
        Key.addEventListener("mouseup", () => {
          se.stop();
        });
        Key.addEventListener("touchstart", () => {
          // TODO: なぜ7を引く？（おそらくアルトリコーダーの音程オフセット）
          fingerSystem.Finger(No[i] - 7);
          fingerSystem.unshi(holes);
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
  field.appendChild(Kenhamo);
  return field;
}

export function reco() {
  const fingerSystem = setupFingerSystem();

  const recorderData = createRecorderTable();
  const keyboard = createKeyboard(recorderData.holes, fingerSystem);

  keyboard.appendChild(recorderData.table);
  content.appendChild(keyboard);
  keyboard.style.display = "flex";
}
