import { move } from "./move.js";

export function rec2() {
  document.getElementById(
    "title"
  ).innerHTML += `　<input type="checkbox" style="width:30px;height:30px" id="move_check"/>うごかす　<input type="checkbox" style="width:30px;height:30px" id="alt_check"/>アルトリコーダー<br><span style="font-size:8px;">アルトリコーダーは単に移調したもので，運指が一致していないところもあります。<br>おまけ程度に考えてください。また，タッチのみ対応です。</span>`;

  document.getElementById("content").innerHTML = `
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
`;

  //指の穴，運指コード　初期設定

  const h0 = document.getElementById("h0");
  const h7 = document.getElementById("h7");
  const h9 = document.getElementById("h9");
  const alt_check = document.getElementById("alt_check");
  var index_minus = 0; //アルトリコーダーならインデックスに7をひく。

  alt_check.addEventListener("click", () => {
    if (alt_check.checked == true) {
      index_minus = 7;
    } else {
      index_minus = 0;
    }
  });

  var hole = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //指の穴の指定
  var Code = 0; //運指コード初期値
  //運指データ;
  const listA = [2047, 1023, 511, 255, 127, 63, 447, 1983, 2015, 479, 31, 239, 495, 111, 15, 55, 7, 11, 12, 3, 8, 504, 253, 125, 61, 445, 93, 29, 45, 2013, 13, 493, 109, 101, 1653, 437]; //運指データ;
  const listB = [8, 9, 10, 11, 12, 13, 13, 13, 14, 14, 15, 16, 16, 16, 17, 18, 19, 20, 21, 21, 22, 23, 23, 24, 25, 25, 26, 27, 28, 28, 29, 30, 31, 32, 33, 34]; //音の番号;
  const data_width = [100, 100, 100, 100, 100, 100, 100, 50, 50, 50, 50];
  const data_height = [150, 150, 100, 100, 100, 100, 100, 75, 75, 75, 75];
  const data_top = [430, 430, 250, 160, 100, 350, 225, 160, 160, 130, 100];
  const data_left = [200, 300, 225, 130, 25, 450, 510, 660, 610, 740, 690];
  const data_borderRadius = ["50% 0 0 50%", "0 50% 50% 0", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"];

  //各指の動きをあらかじめ登録
  for (let j = 0; j < 11; j++) {
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
      //１番・８番・１０番を押したときの追加動作
      switch (j) {
        case 1:
          hole[0] = 1;
          h0.style.backgroundColor = "black";
          break;
        case 8:
          hole[7] = 1;
          h7.style.backgroundColor = "black";
          break;
        case 10:
          hole[9] = 1;
          h9.style.backgroundColor = "black";
          break;
      }

      //音を鳴らす関数を呼び出す。
      // ------------------------------------------------------------------------------
      var preindex = listA.findIndex((element) => element === Code); //算出したCodeが，どの音に対応するのかを調べる。

      //もし，Codeが対応しているのなら音を止める。
      if (preindex != -1) {
        var index = listB[preindex]; //鳴らす音（番号）の決定
        se[index - index_minus].stop();
      }

      //指の押さえ方をCodeとして数値表現
      Code = 0;
      preindex = 0;
      for (let i = 0; i < 11; i++) {
        Code = Code + hole[i] * 2 ** i;
      }

      var preindex = listA.findIndex((element) => element === Code); //算出したCodeが，どの音に対応するのかを調べる。

      //もし，Codeが対応しているのなら音を鳴らす。
      if (preindex != -1) {
        var index = listB[preindex]; //鳴らす音（番号）の決定
        se[index - index_minus].play();
      }
    });

    //指を離したときの動きの登録
    HOLE.addEventListener("touchend", () => {
      hole[j] = 0; //離した状態を登録
      HOLE.style.backgroundColor = "lightgray";
      switch (j) {
        case 1:
          hole[0] = 0;
          h0.style.backgroundColor = "lightgray";
          break;
        case 8:
          hole[7] = 0;
          h7.style.backgroundColor = "lightgray";
          break;
        case 10:
          hole[9] = 0;
          h9.style.backgroundColor = "lightgray";
          break;
      }

      //音を鳴らす関数を呼び出す。
      // ------------------------------------------------------------------------------
      var preindex = listA.findIndex((element) => element === Code); //算出したCodeが，どの音に対応するのかを調べる。

      //もし，Codeが対応しているのなら音を止める。
      if (preindex != -1) {
        var index = listB[preindex]; //鳴らす音（番号）の決定
        se[index - index_minus].stop();
      }
      //指の押さえ方をCodeとして数値表現
      Code = 0;
      preindex = 0;
      for (let i = 0; i < 11; i++) {
        Code = Code + hole[i] * 2 ** i;
      }

      var preindex = listA.findIndex((element) => element === Code); //算出したCodeが，どの音に対応するのかを調べる。

      //もし，Codeが対応しているのなら音を鳴らす。
      if (preindex != -1) {
        var index = listB[preindex]; //鳴らす音（番号）の決定
        se[index - index_minus].play();
      }
    });
  }

  // ピンチイン・アウトによる拡大縮小をなるべくふせぐ。
  document.body.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  //音源の登録
  var se = [];
  for (let i = 1; i < 35; i++) {
    //各音の登録
    se[i] = new Howl({
      //読み込む音声ファイル
      src: "./Sounds/re_" + i + ".mp3",
      // 設定 (以下はデフォルト値です)
      preload: true, // 事前ロード
      volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
      loop: false, // ループ再生するか
      autoplay: false, // 自動再生するか
    });
  }
}
