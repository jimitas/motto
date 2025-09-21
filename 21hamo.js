export function ham2() {
  document.getElementById("content").innerHTML = `
  <section style="position:fixed; top:100px; left: 100px;display:flex; margin-left:20px;">
  <img id="node91" style="width:80px;height:80px;" src="./image/cas.png">
  <img id="node92" style="width:80px;height:80px;" src="./image/tam.png">
  <img id="node93" style="width:80px;height:80px;" src="./image/cow.png">
  </section>
  <ul id="piano" style="position:fixed; top:200px; left: 100px;display:flex; margin-left:20px;">
  <li class="whitekey" id="node8">ド</li>
  <li class="whitekey" id="node10">レ</li>
    <li class="whitekey" id="node12">ミ</li>
    <li class="whitekey" id="node13">ﾌｧ</li>
    <li class="whitekey" id="node15">ソ</li>
    <li class="whitekey" id="node17">ラ</li>
    <li class="whitekey" id="node19">シ</li>
    <li class="whitekey" id="node20">ド</li>
    </ul>
  `;
  

  // スワイプによる誤動作をなるべく阻止する。
  document.body.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  const height = 400;

  const index = ["", "ke-8", "ke-10", "ke-12", "ke-13", "ke-15", "ke-17", "ke-19", "ke-20", "kasuta", "tam", "cow"];
  const num = [, 8, 10, 12, 13, 15, 17, 19, 20, 91, 92, 93];
  var Key_flag = [];

  // インスタンスを生成
  for (let i = 1; i < 12; i++) {
    const Key = document.getElementById("node" + num[i]);
    if (i < 9) {
      Key.style.verticalAlign = "bottom";
      Key.style.textAlign = "center";
      Key.style.paddingTop = "200px";
      Key.style.height = height + "px";
      Key.style.width = "100px";
    }
    const se = new Howl({
      //読み込む音声ファイル
      src: ["./Sounds/" + index[i] + ".mp3"],

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

    Key_flag[i] = false; //キーボードのキーを押したかどうか。

    Key.addEventListener("touchstart", () => {
      se.play();
      Key.classList.add("bgPink");
    });
    Key.addEventListener("mousedown", () => {
      se.play();
      Key.classList.add("bgPink");
    });

    Key.addEventListener("touchend", () => {
      se.pause();
      se.seek(0);
      Key.classList.remove("bgPink");
    });
    Key.addEventListener("mouseup", () => {
      se.pause();
      se.seek(0);
      Key.classList.remove("bgPink");
    });
  }
}
