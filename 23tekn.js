function createTekkenAudioSources() {
  const No = [2, 4, 6, 0, 9, 11, 0, 14, 16, 18, 0, 21, 23, 0, 26, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25, 27];
  const se = {};
  const promises = [];

  for (let i = 0; i < No.length; i++) {
    if (No[i] !== 0) {
      promises.push(new Promise((resolve) => {
        se[No[i]] = new Howl({
          src: ["Sounds/te_" + No[i] + ".mp3"],
          preload: true,
          volume: 1.0,
          loop: false,
          autoplay: false,
          onload: () => {
            console.log(`鉄琴音源 ${No[i]} 読み込み完了`);
            resolve();
          },
          onloaderror: (id, error) => {
            console.warn(`鉄琴音源 ${No[i]} 読み込みエラー:`, error);
            resolve();
          }
        });
      }));
    }
  }

  return { se, loadPromise: Promise.all(promises) };
}

function createTekkenKeyboard(audioSources) {
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
  return Kenhamo;
}

export function tekn() {
  // 音声を並列で読み込み開始
  const audioData = createTekkenAudioSources();

  // UIを即座に表示（音声読み込みと並行）
  const keyboard = createTekkenKeyboard(audioData.se);
  const content = document.getElementById("content");
  content.innerHTML = "";
  content.appendChild(keyboard);

  // 読み込み状態表示
  const loadingStatus = document.createElement("div");
  loadingStatus.id = "loading-status";
  loadingStatus.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    background-color: #e3f2fd;
    border-radius: 4px;
    font-size: 12px;
    color: #1976d2;
    z-index: 1000;
  `;
  loadingStatus.innerHTML = "鉄琴音源読み込み中...";
  document.body.appendChild(loadingStatus);

  // すべての鍵盤を無効状態に設定
  const allKeys = keyboard.querySelectorAll('.mokkin_black, .mokkin_white');
  allKeys.forEach(key => {
    key.style.opacity = '0.6';
    key.style.pointerEvents = 'none';
    key.style.cursor = 'not-allowed';
  });

  // 音声読み込み完了後に鍵盤を有効化
  audioData.loadPromise.then(() => {
    // 鍵盤を有効化
    allKeys.forEach(key => {
      key.style.opacity = '1';
      key.style.pointerEvents = 'auto';
      key.style.cursor = 'pointer';
    });

    // 読み込み状態を更新
    loadingStatus.style.backgroundColor = "#e8f5e8";
    loadingStatus.style.color = "#2e7d32";
    loadingStatus.innerHTML = "鉄琴音源読み込み完了! クリックで演奏できます。";

    setTimeout(() => {
      if (loadingStatus && loadingStatus.parentNode) {
        loadingStatus.style.transition = "opacity 0.5s";
        loadingStatus.style.opacity = "0";
        setTimeout(() => {
          if (loadingStatus.parentNode) {
            loadingStatus.parentNode.removeChild(loadingStatus);
          }
        }, 500);
      }
    }, 3000);

    console.log("全鉄琴音源読み込み完了 - 鉄琴準備完了!");
  }).catch((error) => {
    console.error("鉄琴音源読み込みエラー:", error);

    // エラー時も鍵盤は有効化（音は出ないが操作可能）
    allKeys.forEach(key => {
      key.style.opacity = '1';
      key.style.pointerEvents = 'auto';
      key.style.cursor = 'pointer';
    });

    loadingStatus.style.backgroundColor = "#ffebee";
    loadingStatus.style.color = "#c62828";
    loadingStatus.innerHTML = "鉄琴音源読み込みエラーが発生しました。";
  });
}