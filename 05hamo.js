import { soun } from "./sound.js";
export function hamo() {
  soun(0);
  //データの読み込み
  const No = [2, 4, 6, 0, 9, 11, 0, 14, 16, 18, 0, 21, 23, 0, 26, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25, 27];
  const sound_data = [
    `#ﾌｧ/♭ｿ<br>(A)`,
    `#ｿ/♭ﾗ<br>(S)`,
    `#ﾗ/♭ｼ<br>(D)`,
    ``,
    `#ﾄﾞ/♭ﾚ<br>(G)`,
    `#ﾚ/♭ﾐ<br>(H)`,
    ``,
    `#ﾌｧ/♭ｿ<br>(K)<br>(1)`,
    `#ｿ/♭ﾗ<br>(L)<br>(2)`,
    `#ﾗ/♭ｼ<br>(;)<br>(3)`,
    ``,
    `#ﾄﾞ/♭ﾚ<br>(5)`,
    `#ﾚ/♭ﾐ<br>(6)`,
    ``,
    `#ﾌｧ/♭ｿ<br>(8)`,
    // `#ｿ/♭ﾗ<br>(9)`,
    // `#ﾗ/♭ｼ<br>(0)`,
    // `#ﾄﾞ/♭ﾚ<br>(-)`,
    `ﾌｧ<br>(左shift)`,
    `ｿ<br>(Z)`,
    `ﾗ<br>(X)`,
    `ｼ<br>(C)`,
    `ﾄﾞ<br>(V)`,
    `ﾚ<br>(B)`,
    `ﾐ<br>(N)`,
    `ﾌｧ<br>(M)`,
    `ｿ<br>(,)<br>(Q)`,
    `ﾗ<br>(.)<br>(W)`,
    `ｼ<br>(/)<br>(E)`,
    `ﾄﾞ<br>(_)<br>(R)`,
    `ﾚ<br>(T)`,
    `ﾐ<br>(Y)`,
    `ﾌｧ<br>(U)`,
    `ｿ<br>(I)`,
    `ﾗ<br>(O)`,
    `ｼ<br>(P)`,
    `ﾄﾞ<br>(@)`,
    `ﾚ<br>([)`,
  ];

  var Key_flag = [];
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
          src: ["Sounds/ke-" + No[i] + ".mp3"],

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
          Key.classList.add("black");
          Black.appendChild(Key);
        } else if (j == 1) {
          Key.classList.add("white");
          White.appendChild(Key);
        }
      }
    }
    Kenhamo.appendChild(Black);
    Kenhamo.appendChild(White);
  }

  content.appendChild(Kenhamo);
}
