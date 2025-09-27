function createHamonica2AudioSources() {
  const index = ["", "ke-8", "ke-10", "ke-12", "ke-13", "ke-15", "ke-17", "ke-19", "ke-20", "kasuta", "tam", "cow"];
  const num = [, 8, 10, 12, 13, 15, 17, 19, 20, 91, 92, 93];
  const se = {};
  const promises = [];

  for (let i = 1; i < 12; i++) {
    promises.push(new Promise((resolve) => {
      se[num[i]] = new Howl({
        src: ["./Sounds/" + index[i] + ".mp3"],
        preload: true,
        volume: 1.0,
        loop: false,
        autoplay: false,
        onload: () => {
          console.log(`ハーモニカ2音源 ${index[i]} 読み込み完了`);
          resolve();
        },
        onloaderror: (id, error) => {
          console.warn(`ハーモニカ2音源 ${index[i]} 読み込みエラー:`, error);
          resolve();
        }
      });
    }));
  }

  return { se, loadPromise: Promise.all(promises) };
}

function setupHamonica2Keyboard(audioSources) {
  const height = 400;
  const index = ["", "ke-8", "ke-10", "ke-12", "ke-13", "ke-15", "ke-17", "ke-19", "ke-20", "kasuta", "tam", "cow"];
  const num = [, 8, 10, 12, 13, 15, 17, 19, 20, 91, 92, 93];
  var Key_flag = [];

  // スワイプによる誤動作をなるべく阻止する。
  document.body.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  // インスタンスを生成
  for (let i = 1; i < 12; i++) {
    const Key = document.getElementById("node" + num[i]);
    if (i < 9) {
      Key.style.textAlign = "center";
      Key.style.height = "300px";
      Key.style.display = "flex";
      Key.style.alignItems = "flex-end";
      Key.style.justifyContent = "center";
      Key.style.paddingBottom = "20px";
    }

    Key_flag[i] = false; //キーボードのキーを押したかどうか。

    Key.addEventListener("touchstart", () => {
      if (audioSources[num[i]]) {
        audioSources[num[i]].play();
      }
      Key.classList.add("bgPink");
    });
    Key.addEventListener("mousedown", () => {
      if (audioSources[num[i]]) {
        audioSources[num[i]].play();
      }
      Key.classList.add("bgPink");
    });

    Key.addEventListener("touchend", () => {
      if (audioSources[num[i]]) {
        audioSources[num[i]].pause();
        audioSources[num[i]].seek(0);
      }
      Key.classList.remove("bgPink");
    });
    Key.addEventListener("mouseup", () => {
      if (audioSources[num[i]]) {
        audioSources[num[i]].pause();
        audioSources[num[i]].seek(0);
      }
      Key.classList.remove("bgPink");
    });
  }
}

export function ham2() {
  // DOMを即座に構築
  document.getElementById("content").innerHTML = `
  <div style="display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 10px; box-sizing: border-box; width: 100%; max-width: 100vw; overflow-x: hidden;">
    <!-- 楽器セクション -->
    <section style="display: flex; gap: 10px; margin-bottom: 20px;">
      <img id="node91" style="width: 60px; height: 60px;" src="./image/cas.png">
      <img id="node92" style="width: 60px; height: 60px;" src="./image/tam.png">
      <img id="node93" style="width: 60px; height: 60px;" src="./image/cow.png">
    </section>

    <!-- 鍵盤セクション -->
    <ul id="piano" style="display: flex; gap: 2px; list-style: none; padding: 0; margin: 0; flex-wrap: nowrap; width: 100%; max-width: 100%; overflow-x: auto;">
      <li class="whitekey" id="node8" style="flex: 1; min-width: 60px; max-width: 90px;">ド</li>
      <li class="whitekey" id="node10" style="flex: 1; min-width: 60px; max-width: 90px;">レ</li>
      <li class="whitekey" id="node12" style="flex: 1; min-width: 60px; max-width: 90px;">ミ</li>
      <li class="whitekey" id="node13" style="flex: 1; min-width: 60px; max-width: 90px;">ﾌｧ</li>
      <li class="whitekey" id="node15" style="flex: 1; min-width: 60px; max-width: 90px;">ソ</li>
      <li class="whitekey" id="node17" style="flex: 1; min-width: 60px; max-width: 90px;">ラ</li>
      <li class="whitekey" id="node19" style="flex: 1; min-width: 60px; max-width: 90px;">シ</li>
      <li class="whitekey" id="node20" style="flex: 1; min-width: 60px; max-width: 90px;">ド</li>
    </ul>
  </div>

  <!-- 読み込み状態表示 -->
  <div id="loading-status" style="position: fixed; top: 20px; right: 20px; padding: 8px 16px; background-color: #e3f2fd; border-radius: 4px; font-size: 12px; color: #1976d2; z-index: 1000;">
    ハーモニカ2音源読み込み中...
  </div>
  `;

  // 音声を並列で読み込み
  const audioData = createHamonica2AudioSources();

  // 読み込み完了後にキーボードを設定
  audioData.loadPromise.then(() => {
    setupHamonica2Keyboard(audioData.se);

    // 読み込み状態を更新
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.style.backgroundColor = "#e8f5e8";
      loadingStatus.style.color = "#2e7d32";
      loadingStatus.innerHTML = "ハーモニカ2音源読み込み完了! クリックで演奏できます。";

      // 3秒後に状態表示をフェードアウト
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

    console.log("全ハーモニカ2音源読み込み完了 - ハーモニカ2準備完了!");
  }).catch((error) => {
    console.error("ハーモニカ2音源読み込みエラー:", error);

    // エラー状態を表示
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.style.backgroundColor = "#ffebee";
      loadingStatus.style.color = "#c62828";
      loadingStatus.innerHTML = "ハーモニカ2音源読み込みエラーが発生しました。";
    }
  });
}