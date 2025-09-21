export function otoo() {
  document.getElementById("content").innerHTML = `
  <div class="container">
  <p>3年理科「音のふしぎ」で続けて同じ音を出すときなどに使えます。(USBスピーカーに接続して音を大きくします。)</p>
  <p>大きな音が出ないように注意してください。</p>
  <select class="select" name="" id="select">
    <option value="sine">sine</option>
    <option value="square">square</option>
    <option value="sawtooth">sawtooth</option>
    <option value="triangle">triangle</option>
  </select>
  <input type="range" value="440" max="2000" min="10" step="1" id="hz" style="max-width:100%;width:600px;cursor: pointer;"><br>
  <div id="hz_label">440Hz</div>
  <div class="d-flex justify-content-left" id="up"></div>
  <br>
  <div class="d-flex justify-content-left" id="lo"></div>
  <br>
  <button class="btn btn-success m-1" onclick="" style="cursor:pointer;" id="play">音を鳴らす</button>
  <button class="btn btn-danger m-1" onclick="" style="cursor:pointer;" id="stop">音を止める</button>
  <br>
</div>
  `;
  const hz = [261, 294, 330, 349, 392, 440, 494, 522, 522, 588, 660, 698, 784, 880, 988, 1044];
  const note = ["ド", "レ", "ミ", "ﾌｧ", "ソ", "ラ", "シ", "ド"];

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 8; j++) {
      const button = document.createElement("button");
      button.innerText = note[j % 8];
      button.classList.add("btn","btn-primary")
      button.addEventListener("click", () => {
        setHz(hz[i * 8 + j]);
      });
      if (i == 0) {
        document.getElementById("lo").appendChild(button);
      }
      if (i == 1) {
        document.getElementById("up").appendChild(button);
      }
    }
  }

  var audioCtx = null,
    oscillator = null;
  var type = "sine";

  // ボタンを押したときの挙動
  document.getElementById("play").addEventListener(
    "click",
    () => {
      sound_play();
    },
    false
  );

  document.getElementById("stop").addEventListener(
    "click",
    () => {
      sound_stop();
    },
    false
  );

  document.getElementById("select").addEventListener(
    "change",
    () => {
      sound_stop();
    },
    false
  );

  //周波数変更
  document.getElementById("hz").addEventListener("input", function () {
    document.getElementById("hz_label").innerHTML = document.getElementById("hz").value + "Hz";
    if (oscillator != null) {
      let hz = document.getElementById("hz").value;
      oscillator.frequency.setValueAtTime(hz, audioCtx.currentTime);
    }
  });

  //音を鳴らす
  function sound_play() {
    type = select.value;
    if (audioCtx == null) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (oscillator == null) {
      oscillator = audioCtx.createOscillator();
      oscillator.type = type;
      let hz = document.getElementById("hz").value;
      oscillator.frequency.setValueAtTime(hz, audioCtx.currentTime);
      oscillator.connect(audioCtx.destination);
      oscillator.start();
    }
  }

  //音を止める
  function sound_stop() {
    if (oscillator !== null) {
      oscillator.stop();
      oscillator = null;
    }
  }

  function setHz(hz) {
    document.getElementById("hz").value = hz;
    document.getElementById("hz_label").innerHTML = hz + "Hz";
    if (oscillator != null) {
      let hz = document.getElementById("hz").value;
      oscillator.frequency.setValueAtTime(hz, audioCtx.currentTime);
    }
  }
}
