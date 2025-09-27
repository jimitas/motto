import { soun } from "./sound.js";

function createHamonikaAudioSources() {
  const No = [2, 4, 6, 0, 9, 11, 0, 14, 16, 18, 0, 21, 23, 0, 26, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25, 27];
  const se = {};
  const promises = [];

  for (let i = 0; i < No.length; i++) {
    if (No[i] !== 0) {
      promises.push(new Promise((resolve) => {
        se[No[i]] = new Howl({
          src: ["Sounds/ke-" + No[i] + ".mp3"],
          preload: true,
          volume: 1.0,
          loop: false,
          autoplay: false,
          onload: () => {
            console.log(`ハーモニカ音源 ${No[i]} 読み込み完了`);
            resolve();
          },
          onloaderror: (id, error) => {
            console.warn(`ハーモニカ音源 ${No[i]} 読み込みエラー:`, error);
            resolve();
          }
        });
      }));
    }
  }

  return { se, loadPromise: Promise.all(promises) };
}

function createHamonikaKeyboard(audioSources) {
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

        Key.addEventListener("mousedown", () => {
          if (audioSources[No[i]]) {
            audioSources[No[i]].play();
          }
        });
        Key.addEventListener("mouseup", () => {
          if (audioSources[No[i]]) {
            audioSources[No[i]].stop();
          }
        });
        Key.addEventListener("touchstart", () => {
          if (audioSources[No[i]]) {
            audioSources[No[i]].play();
          }
        });
        Key.addEventListener("touchend", () => {
          if (audioSources[No[i]]) {
            audioSources[No[i]].stop();
          }
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
  return Kenhamo;
}

export function hamo() {
  soun(0);

  // 読み込み状態表示
  document.getElementById("content").innerHTML = `
    <div id="loading-status" style="position: fixed; top: 20px; right: 20px; padding: 8px 16px; background-color: #e3f2fd; border-radius: 4px; font-size: 12px; color: #1976d2; z-index: 1000;">
      ハーモニカ音源読み込み中...
    </div>
  `;

  // 音声を並列で読み込み
  const audioData = createHamonikaAudioSources();

  // 読み込み完了後にキーボードを設定
  audioData.loadPromise.then(() => {
    const keyboard = createHamonikaKeyboard(audioData.se);

    const content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(keyboard);

    // 読み込み状態を更新
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.style.backgroundColor = "#e8f5e8";
      loadingStatus.style.color = "#2e7d32";
      loadingStatus.innerHTML = "ハーモニカ音源読み込み完了! クリックで演奏できます。";

      setTimeout(() => {
        if (loadingStatus) {
          loadingStatus.style.transition = "opacity 0.5s";
          loadingStatus.style.opacity = "0";
          setTimeout(() => {
            if (loadingStatus && loadingStatus.parentNode) {
              loadingStatus.parentNode.removeChild(loadingStatus);
            }
          }, 500);
        }
      }, 3000);
    }

    console.log("全ハーモニカ音源読み込み完了 - ハーモニカ準備完了!");
  }).catch((error) => {
    console.error("ハーモニカ音源読み込みエラー:", error);

    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.style.backgroundColor = "#ffebee";
      loadingStatus.style.color = "#c62828";
      loadingStatus.innerHTML = "ハーモニカ音源読み込みエラーが発生しました。";
    }
  });
}