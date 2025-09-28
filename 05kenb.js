export function kenb() {
  document.getElementById("content").innerHTML = `
  <div>
  <select id="select_box">
  <option value=0>けんハモ</option>
  <option value=1>ﾘｺｰﾀﾞｰ</option>
  <option value=2>もっきん</option>
  <option value=3>てっきん</option>
  </select>
  <ul id="piano">
  </ul>
  <p>キーボードからの入力は「esc」キーで中断、「backspace」キーで再開</p>
  </div>
  `;

  //楽器の音色（鍵盤ハーモニカ，リコーダー，木琴，鉄琴）
  const Tone = ["ke-", "re_", "mo_", "te_"];

  //はじめの音色番号（鍵盤ハーモニカ）
  var ToneNo = 0;
  var se = [];
  var Key_flag = [];
  var result;
  tone_set();

  // 音色の変更 select_box
  document.getElementById("select_box").addEventListener("change", () => {
    ToneNo = select_box.value;
    tone_set();
  });

  //音色の登録
  function tone_set() {
    for (let j = 1; j <= 34; j++) {
      se[j] = new Howl({
        //読み込む音声ファイル
        src: [`Sounds/${Tone[ToneNo]}${j}.mp3`],
        // 設定 (以下はデフォルト値です)
        preload: true, // 事前ロード
        volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
        loop: false, // ループ再生するか
        autoplay: false, // 自動再生するか
      });
      Key_flag[j] = false; //キーボードのキーを押したかどうか。
    }
  }

  // 鍵盤を表示
  const piano = document.getElementById("piano");
  const totalWidth = window.innerWidth;
  const height = 300;
  const allNotes = [
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A3",
    "A#3",
    "B3",
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "A#5",
    "B5",
    "C6",
    "C#6",
    "D6",
  ];
  const sound_data = [
    `ﾌｧ<br>(左shift)`,
    `#ﾌｧ/♭ｿ<br>(A)`,
    `ｿ<br>(Z)`,
    `#ｿ/♭ﾗ<br>(S)`,
    `ﾗ<br>(X)`,
    `#ﾗ/♭ｼ<br>(D)`,
    `ｼ<br>(C)`,
    `ﾄﾞ<br>(V)`,
    `#ﾄﾞ/♭ﾚ<br>(G)`,
    `ﾚ<br>(B)`,
    `#ﾚ/♭ﾐ<br>(H)`,
    `ﾐ<br>(N)`,
    `ﾌｧ<br>(M)`,
    `#ﾌｧ/♭ｿ<br>(K)<br>(1)`,
    `ｿ<br>(,)<br>(Q)`,
    `#ｿ/♭ﾗ<br>(L)<br>(2)`,
    `ﾗ<br>(.)<br>(W)`,
    `#ﾗ/♭ｼ<br>(;)<br>(3)`,
    `ｼ<br>(/)<br>(E)`,
    `ﾄﾞ<br>(_)<br>(R)`,
    `#ﾄﾞ/♭ﾚ<br>(5)`,
    `ﾚ<br>(T)`,
    `#ﾚ/♭ﾐ<br>(6)`,
    `ﾐ<br>(Y)`,
    `ﾌｧ<br>(U)`,
    `#ﾌｧ/♭ｿ<br>(8)`,
    `ｿ<br>(I)`,
    `#ｿ/♭ﾗ<br>(9)`,
    `ﾗ<br>(O)`,
    `#ﾗ/♭ｼ<br>(0)`,
    `ｼ<br>(P)`,
    `ﾄﾞ<br>(@)`,
    `#ﾄﾞ/♭ﾚ<br>(-)`,
    `ﾚ<br>([)`,
  ];
  const sizePerNote = Math.min((totalWidth / allNotes.length) * 0.9, 50);
  for (let i = 0; i < allNotes.length; i++) {
    var currentNote = allNotes[i];
    var node = document.createElement("li");
    node.innerHTML = sound_data[i];
    node.id = `node${i + 1}`;

    node.className = "whitekey";
    node.style.verticalAlign = "bottom";
    node.style.textAlign = "center";
    node.style.paddingTop = "200px";
    node.style.height = height + "px";
    node.style.width = sizePerNote + "px";
    if (~currentNote.indexOf("#")) {
      node.style.paddingTop = "5px";
      node.style.color = "white";
      node.className = "blackkey";
      node.style.width = sizePerNote / 1.2 + "px";
      node.style.height = height / 1.6 + "px";
    }
    // 鍵盤でマウスが押されたら音を鳴らす
    node.addEventListener("mousedown", () => {
      se[i + 1].play();
    });
    node.addEventListener("mouseup", () => {
      se[i + 1].pause();
      se[i + 1].seek(0);
    });
    node.addEventListener("touchstart", () => {
      se[i + 1].play();
    });
    node.addEventListener("touchend", () => {
      se[i + 1].pause();
      se[i + 1].seek(0);
    });
    piano.appendChild(node);
  }

  //何のキーが押されたかを判定してコードを返す
  function check_code(e) {
    switch (e.code) {
      case "KeyA":
        result = 2;
        break;
      case "KeyS":
        result = 4;
        break;
      case "KeyD":
        result = 6;
        break;
      case "KeyG":
        result = 9;
        break;
      case "KeyH":
        result = 11;
        break;
      case "KeyK":
        result = 14;
        break;
      case "KeyL":
        result = 16;
        break;
      case "Semicolon":
        result = 18;
        break;
      case "Digit1":
        result = 14;
        break;
      case "Digit2":
        result = 16;
        break;
      case "Digit3":
        result = 18;
        break;
      case "Digit5":
        result = 21;
        break;
      case "Digit6":
        result = 23;
        break;
      case "Digit8":
        result = 26;
        break;
      case "Digit9":
        result = 28;
        break;
      case "Digit0":
        result = 30;
        break;
      case "Equal":
        result = 33;
        break;
      case "ShiftLeft":
        result = 1;
        break;
      case "KeyZ":
        result = 3;
        break;
      case "KeyX":
        result = 5;
        break;
      case "KeyC":
        result = 7;
        break;
      case "KeyV":
        result = 8;
        break;
      case "KeyB":
        result = 10;
        break;
      case "KeyN":
        result = 12;
        break;
      case "KeyM":
        result = 13;
        break;
      case "Comma":
        result = 15;
        break;
      case "Period":
        result = 17;
        break;
      case "Slash":
        result = 19;
        break;
      case "IntlRo":
        result = 20;
        break;
      case "KeyQ":
        result = 15;
        break;
      case "KeyW":
        result = 17;
        break;
      case "KeyE":
        result = 19;
        break;
      case "KeyR":
        result = 20;
        break;
      case "KeyT":
        result = 22;
        break;
      case "KeyY":
        result = 24;
        break;
      case "KeyU":
        result = 25;
        break;
      case "KeyI":
        result = 27;
        break;
      case "KeyO":
        result = 29;
        break;
      case "KeyP":
        result = 31;
        break;
      case "BracketLeft":
        result = 32;
        break;
      case "BracketRight":
        result = 34;
        break;
      default:
        result = 0;
        break;
    }
    return result;
  }

  var key_down = (e) => {
    check_code(e);
    if (Key_flag[result] === false) {
      Key_flag[result] = true;
      se[result].play();
      document.getElementById("node" + result).classList.add("bgPink");
    }
  };

  var key_up = (e) => {
    check_code(e);
    if (Key_flag[result] === true) {
      Key_flag[result] = false;
      se[result].pause();
      se[result].seek(0);
      document.getElementById("node" + result).classList.remove("bgPink");
    }
  };

  function keyboardAddEvent() {
    document.addEventListener("keydown", key_down, false);
    document.addEventListener("keyup", key_up, false);
  }
  function keyboardRemoveEvent() {
    document.removeEventListener("keydown", key_down, false);
    document.removeEventListener("keyup", key_up, false);
  }

  // Escape/Backspaceハンドラーを変数に保存（後でクリーンアップできるように）
  const escapeBackspaceHandler = (e) => {
    if (e.code === "Escape") {
      keyboardRemoveEvent();
    } else if (e.code === "Backspace") {
      keyboardAddEvent();
    }
  };

  // クリーンアップ関数をエクスポート
  function cleanupKenb() {
    // キーボードイベントを削除
    keyboardRemoveEvent();

    // Escape/Backspaceイベントを削除
    document.removeEventListener("keydown", escapeBackspaceHandler, false);

    // グローバル参照をクリア
    if (window.currentPageCleanup === cleanupKenb) {
      delete window.currentPageCleanup;
    }

    console.log("05kenb.js のキーボードイベントをクリーンアップしました");
  }

  // イベントリスナーを設定
  keyboardAddEvent();
  document.addEventListener("keydown", escapeBackspaceHandler, false);

  // クリーンアップ関数をグローバルに登録
  window.currentPageCleanup = cleanupKenb;
}
