import * as se from "./se.js";
export function metr() {
  document.getElementById("content").innerHTML = `
  <main role="main" class="container ">
    <select id="select" class="select text-center">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option selected>4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
    </select>
    <div class="d-flex justify-content-center">
      tempo=<span id="range">84　</span>
      <input type="range" value="84" max="300" min="10" step="1" id="tempo" style="max-width:100%;width:600px;cursor: pointer;">
    </div>
    <button id="start" class="btn btn-primary">スタート</button>
    <button id="stop" class="btn btn-danger">ストップ</button>
  </main>
  `;

  var bpm = 84;
  var beat = 4;
  var flag = false;
  var hi_click;
  var lo_click;

  function metronome(bpm, beat) {
    if (flag == false) {
      flag = true;
      hi_click = setInterval(() => hi(), 60 / bpm * 1000 * beat);
      lo_click = setInterval(() => lo(), 60 / bpm * 1000);
    }
    else return;
  }

  function hi() {
    se.set.currentTime = 0;
    se.set.play();
  }

  function lo() {
    se.pi.currentTime = 0;
    se.pi.play();
  }

  function stop() {
    clearInterval(hi_click);
    clearInterval(lo_click);
  }

  // tempo : テンポ（1分間に何拍するか）
  document.getElementById("tempo").addEventListener("input", () => {
    stop();
    bpm = tempo.value;
    document.getElementById("range").innerText = tempo.value + "　";
    metronome(bpm, beat);
  });

  document.getElementById("select").addEventListener("input", () => {
    stop();
    beat = select.value;
    metronome(bpm, beat);
  });

  document.getElementById("start").addEventListener("click", () => {
    if (flag == false) {
      se.set.play();
    }
    beat = select.value;
    metronome(bpm, beat);
  });

  document.getElementById("stop").addEventListener("click", () => {
    stop();
  });

}