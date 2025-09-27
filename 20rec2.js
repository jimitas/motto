import { move } from "./move.js";

function setupRecorderSystem() {
  // 確実な定数
  const HOLE_COUNT = 11;        // リコーダーの穴数
  const AUDIO_COUNT = 35;       // 音源数
  const ALTO_OFFSET = 7;        // アルトリコーダーオフセット

  //指の穴，運指コード　初期設定
  const h0 = document.getElementById("h0");
  const h7 = document.getElementById("h7");
  const h9 = document.getElementById("h9");
  const alt_check = document.getElementById("alt_check");
  var index_minus = 0; // TODO: アルトリコーダーならインデックスにALTO_OFFSETをひく

  alt_check.addEventListener("click", () => {
    if (alt_check.checked == true) {
      index_minus = ALTO_OFFSET;
    } else {
      index_minus = 0;
    }
  });

  var hole = new Array(HOLE_COUNT).fill(0); //指の穴の指定
  var Code = 0; //運指コード初期値
  //運指データ;
  const listA = [2047, 1023, 511, 255, 127, 63, 447, 1983, 2015, 479, 31, 239, 495, 111, 15, 55, 7, 11, 12, 3, 8, 504, 253, 125, 61, 445, 93, 29, 45, 2013, 13, 493, 109, 101, 1653, 437]; //運指データ;
  const listB = [8, 9, 10, 11, 12, 13, 13, 13, 14, 14, 15, 16, 16, 16, 17, 18, 19, 20, 21, 21, 22, 23, 23, 24, 25, 25, 26, 27, 28, 28, 29, 30, 31, 32, 33, 34]; //音の番号;
  const data_width = [100, 100, 100, 100, 100, 100, 100, 50, 50, 50, 50];
  const data_height = [150, 150, 100, 100, 100, 100, 100, 75, 75, 75, 75];
  // iPad基準の中央配置（画面中央寄りに調整）
  const data_top = [480, 480, 300, 210, 150, 400, 275, 210, 210, 180, 150];
  const data_left = [300, 400, 325, 230, 125, 550, 610, 760, 710, 840, 790];
  const data_borderRadius = ["50% 0 0 50%", "0 50% 50% 0", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"];

  // 音源変数（後で設定）
  var se;

  // 音声処理の共通関数
  function updateSound() {
    // 現在鳴っている音を停止
    var preindex = listA.findIndex((element) => element === Code);
    if (preindex != -1) {
      var index = listB[preindex];
      se[index - index_minus].stop();
    }

    // 新しいCodeを計算
    Code = 0;
    for (let i = 0; i < HOLE_COUNT; i++) {
      Code = Code + hole[i] * 2 ** i;
    }

    // 新しい音を再生
    preindex = listA.findIndex((element) => element === Code);
    if (preindex != -1) {
      var index = listB[preindex];
      se[index - index_minus].play();
    }
  }

  //各指の動きをあらかじめ登録
  for (let j = 0; j < HOLE_COUNT; j++) {
    const HOLE = document.getElementById("h" + j); // 対象となるID名の取得
    HOLE.style.top = data_top[j] + "px";
    HOLE.style.left = data_left[j] + "px";
    HOLE.style.width = data_width[j] + "px";
    HOLE.style.height = data_height[j] + "px";
    HOLE.style.borderRadius = data_borderRadius[j];
    HOLE.style.position = "fixed";
    HOLE.style.textAlign = "center";
    HOLE.style.margin = "auto";
    HOLE.style.opacity = 1;
    HOLE.style.backgroundColor = "lightgray";
    HOLE.classList.add("target");
    move(HOLE);

    //指で押さえたときの動きの登録
    HOLE.addEventListener("touchstart", () => {
      hole[j] = 1; //押さえた状態を登録
      HOLE.style.backgroundColor = "black"; //押さえた部分は黒色に
      // リコーダー運指の特殊動作
      switch (j) {
        case 1:  // サミング: 半月型で半分だけ穴を開ける動作の再現
          hole[0] = 1;
          h0.style.backgroundColor = "black";
          break;
        case 8:  // 小さな2穴の連動: 右側穴を押さえる動作
          hole[7] = 1;
          h7.style.backgroundColor = "black";
          break;
        case 10: // 小さな2穴の連動: 右側穴を押さえる動作
          hole[9] = 1;
          h9.style.backgroundColor = "black";
          break;
      }

      // 音声処理
      updateSound();
    });

    //指を離したときの動きの登録
    HOLE.addEventListener("touchend", () => {
      hole[j] = 0; //離した状態を登録
      HOLE.style.backgroundColor = "lightgray";
      // リコーダー運指の特殊動作
      switch (j) {
        case 1:  // サミング: 半月型で半分だけ穴を開ける動作の再現
          hole[0] = 0;
          h0.style.backgroundColor = "lightgray";
          break;
        case 8:  // 小さな2穴の連動: 右側穴を押さえる動作
          hole[7] = 0;
          h7.style.backgroundColor = "lightgray";
          break;
        case 10: // 小さな2穴の連動: 右側穴を押さえる動作
          hole[9] = 0;
          h9.style.backgroundColor = "lightgray";
          break;
      }

      // 音声処理
      updateSound();
    });
  }

  // 音源を設定
  function setSoundEngine(soundEngine) {
    se = soundEngine;
  }

  return { hole, Code, listA, listB, index_minus, h0, h7, h9, updateSound, setSoundEngine };
}

function setupTouchPrevention() {
  // ピンチイン・アウトによる拡大縮小をなるべくふせぐ。
  document.body.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );
}

function createAudioSources() {
  //音源の並列読み込み
  const se = [];
  const promises = [];

  for (let i = 1; i < 35; i++) {
    promises.push(new Promise((resolve) => {
      se[i] = new Howl({
        //読み込む音声ファイル
        src: "./Sounds/re_" + i + ".mp3",
        // 設定 (以下はデフォルト値です)
        preload: true, // 事前ロード
        volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
        loop: false, // ループ再生するか
        autoplay: false, // 自動再生するか
        onload: () => {
          console.log(`音源 ${i} 読み込み完了`);
          resolve();
        },
        onloaderror: (id, error) => {
          console.warn(`音源 ${i} 読み込みエラー:`, error);
          resolve(); // エラーでも続行
        }
      });
    }));
  }

  return { se, loadPromise: Promise.all(promises) };
}

export function rec2() {
  // 確実な定数
  const HOLE_COUNT = 11;        // リコーダーの穴数
  const AUDIO_COUNT = 35;       // 音源数
  const ALTO_OFFSET = 7;        // アルトリコーダーオフセット

  // DOMは即座に構築
  document.getElementById("content").innerHTML = `
<div style="display: flex; gap: 20px; align-items: flex-start;">
  <!-- リコーダー部分 -->
  <div id="recorder-area" style="flex: 1; position: relative;">
    <div id="h10"></div>
    <div id="h9"></div>
    <div id="h8"></div>
    <div id="h7"></div>
    <div id="h6"></div>
    <div id="h5"></div>
    <div id="h4"></div>
    <div id="h3"></div>
    <div id="h2"></div>
    <div id="h1"></div>
    <div id="h0"></div>
  </div>

  <!-- コントロールパネル -->
  <div id="control-panel" style="width: 300px; padding: 20px; background-color: #f5f5f5; border-radius: 8px; border: 1px solid #ddd; margin-top: 200px;">
    <h3 style="margin-top: 0; font-size: 16px; color: #333;">コントロール</h3>

    <div style="margin-bottom: 20px;">
      <label style="display: block; cursor: pointer; margin-bottom: 10px;">
        <input type="checkbox" style="width:18px; height:18px; margin-right: 8px;" id="move_check"/>
        うごかす
      </label>

      <label style="display: block; cursor: pointer;">
        <input type="checkbox" style="width:18px; height:18px; margin-right: 8px;" id="alt_check"/>
        アルトリコーダー
      </label>

      <div style="font-size: 12px; color: #666; margin-top: 10px; padding: 10px; background-color: #fff; border-radius: 4px; border-left: 3px solid #ffc107;">
        <strong>アルトリコーダーについて：</strong><br>
        単に移調したもので、運指が一致していない箇所があります。<br>
        おまけ程度にお考えください。タッチのみ対応です。
      </div>

      <!-- 読み込み状態表示 -->
      <div id="loading-status" style="margin-top: 15px; padding: 8px; background-color: #e3f2fd; border-radius: 4px; font-size: 11px; color: #1976d2;">
        音源読み込み中...
      </div>
    </div>
  </div>
</div>
`;

  // リコーダーシステムを先に初期化
  const recorderSystem = setupRecorderSystem();

  // 音声を並列で読み込み
  const audioData = createAudioSources();

  // 読み込み完了後に音源を設定
  audioData.loadPromise.then(() => {
    recorderSystem.setSoundEngine(audioData.se);

    // 読み込み状態を更新
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.style.backgroundColor = "#e8f5e8";
      loadingStatus.style.color = "#2e7d32";
      loadingStatus.innerHTML = "音源読み込み完了! タッチで演奏できます。";

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

    console.log("全音源読み込み完了 - リコーダー準備完了!");
  }).catch((error) => {
    console.error("音源読み込みエラー:", error);

    // エラー状態を表示
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.style.backgroundColor = "#ffebee";
      loadingStatus.style.color = "#c62828";
      loadingStatus.innerHTML = "音源読み込みエラーが発生しました。";
    }
  });

  setupTouchPrevention();
}