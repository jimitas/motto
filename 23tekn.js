export function tekn() {
  //データの読み込み
  const No = [2, 4, 6, 0, 9, 11, 0, 14, 16, 18, 0, 21, 23, 0, 26, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25, 27];
  const sound_data = [
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
    "#ﾚ/♭ﾐ",
    "",
    "#ﾌｧ/♭ｿ",
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
    "ﾐ",
    "ﾌｧ",
    "ｿ",
  ];
  const len = [0, 15, 31];
  //それぞれのキーにイベントを割り当てる。
  const Kenhamo = document.createElement("div");
  Kenhamo.classList.add("Kenhamo");
  const Black = document.createElement("div");
  Black.classList.add("B_Kenban");
  const White = document.createElement("div");
  White.classList.add("W_Kenban");

  for (let j = 0; j < 2; j++) {
    for (let i = len[j]; i < len[j + 1]; i++) {
      const Key = document.createElement("div");
      if (No[i] == 0) {
        Key.classList.add("none");
        Black.appendChild(Key);
      } else {
        Key.innerHTML = sound_data[i];

        const se = new Howl({
          //読み込む音声ファイル
          src: ["Sounds/te_" + No[i] + ".mp3"],

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
          se.play();
        });
        Key.addEventListener("mouseup", () => {
          se.stop();
        });
        Key.addEventListener("touchstart", () => {
          se.play();
        });
        Key.addEventListener("touchend", () => {
          se.stop();
        });
        if (j == 0) {
          Key.classList.add("mokkin_black");
          Key.style.backgroundColor="#555";
          Black.appendChild(Key);
        } else if (j == 1) {
          Key.classList.add("mokkin_white");
          Key.style.backgroundColor="#555";
          White.appendChild(Key);
        }
      }
    }
    Kenhamo.appendChild(Black);
    Kenhamo.appendChild(White);
  }
  content.appendChild(Kenhamo);
}
