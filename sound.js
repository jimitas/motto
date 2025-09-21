export function soun(no) {
  //楽器の音色（鍵盤ハーモニカ，リコーダー，木琴，鉄琴）
  const Tone = ["ke-", "re_", "mo_", "te_"];
  //鍵盤の数（鍵盤ハーモニカ，リコーダー，木琴，鉄琴）
  const ToneLength = [27, 34, 32, 32];
  //はじめの音色番号（鍵盤ハーモニカ）
  var ToneNo = no;
  var result;

  // const select_box = document.createElement("select");
  // for (let i = 0; i < Tone.length; i++) {
  //   const option = document.createElement("option");
  //   option.value = i;
  //   option.textContent = Tone[i];
  //   select_box.appendChild(option);
  // }
  // select_box.addEventListener("change", () => {
  //   ToneNo = select_box.value;
  //   // createKey();
  // });
  // content.appendChild(select_box);

  const keyboard = document.createElement("div");
  keyboard.style.display = "flex";
  keyboard.style.flexWrap = "wrap";
  content.appendChild(keyboard);

  //音色の登録
  var se = [[], [], [], []];
  var Key_flag = [[], [], [], []];
  for (let i = 0; i < Tone.length; i++) {
    for (let j = 1; j <= ToneLength[i]; j++) {
      se[i][j] = new Howl({
        //読み込む音声ファイル
        src: [`Sounds/${Tone[i]}${j}.mp3`],
        // 設定 (以下はデフォルト値です)
        preload: true, // 事前ロード
        volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
        loop: false, // ループ再生するか
        autoplay: false, // 自動再生するか
      });

      Key_flag[i][j] = false; //キーボードのキーを押したかどうか。
    }
  }

  // createKey();
  keyboardRemoveEvent();

  function createKey() {
    keyboard.innerHTML = "";
    //ボタンの作成
    for (let i = 1; i <= ToneLength[ToneNo]; i++) {
      const Key = document.createElement("button");
      Key.setAttribute("id", `se_${Tone[ToneNo]}${i}`);
      keyboard.appendChild(Key);
      Key.innerText = i;

      Key.addEventListener("touchstart", () => se_play(i), false);
      Key.addEventListener("mousedown", () => se_play(i), false);
      Key.addEventListener("touchend", () => se_stop(i), false);
      Key.addEventListener("mouseup", () => se_stop(i), false);

      function se_play(i) {
        se[ToneNo][i].play();
        Key.classList.add("bgPink");
      }
      function se_stop(i) {
        se[ToneNo][i].pause();
        se[ToneNo][i].seek(0);
        Key.classList.remove("bgPink");
      }
    }
  }

  // keyboardRemoveEvent();

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
    if (Key_flag[ToneNo][result] === false) {
      Key_flag[ToneNo][result] = true;
      se[ToneNo][result].play();
      // document.getElementById(`se_${Tone[ToneNo]}${result}`).classList.add("bgPink");
    }
  };

  var key_up = (e) => {
    check_code(e);
    if (Key_flag[ToneNo][result] === true) {
      Key_flag[ToneNo][result] = false;
      se[ToneNo][result].pause();
      se[ToneNo][result].seek(0);
      // document.getElementById(`se_${Tone[ToneNo]}${result}`).classList.remove("bgPink");
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

  keyboardAddEvent();

  document.addEventListener(
    "keydown",
    (e) => {
      if (e.code === "Escape") {
        keyboardRemoveEvent();
      } else if (e.code === "Backspace") {
        keyboardAddEvent();
      }
    },
    false
  );

}
