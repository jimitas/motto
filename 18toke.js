import * as se from "./se.js";

export function toke() {
  document.getElementById("content").innerHTML = `
  <h3 id="clock_text" style="width: 720px; height: 40px; font-size: 30px text-align:left;"></h3>
  <h6>とけいのはりは，このスライダーでうごかせます。</h6>
  <input id="tokei_range" type="range" class="custom-range" min=0 max=720 step=15 style="height:50px; cursor:pointer;"/>
  <div style="display:flex;justify-content:space-between;width:720px;">
    <button id="Minus">-</button>
    <button id="Plus">+</button>
  </div>
  <div style="display: flex;flex-wrap:wrap;">
  <canvas width="400" height="400" id="clock" class="target"></canvas>
  <div>
  <select name="type" id="type" style="width:200px;margin-left:20px;">
  <option value="nanji">なんじなんふん？</option>
  <option value="ugokasu">はりをうごかそう</option>
  </select>
  <select name="mode" id="mode" style="width:150px;margin-left:20px;">
  <option value="easy">やさしい</option>
  <option value="normal">ふつう</option>
  <option value="difficult">むずかしい</option>
  </select>
  <br />
  <h4 id="score" style="text-align:left;font-family:"BIZ UDGothic";"></h4>
  <button class="btn btn-primary" style="margin-left:20px;" id="question">もんだい</button>
  <button class="btn btn-success" id="check">こたえあわせ</button>
  <button class="btn btn-danger" id="ans">こたえを　みる</button>
  <br />
  <button class="btn btn-secondary" style="margin-left:20px;" id="hint1">ヒント１</button>
  <button class="btn btn-secondary" id="hint2">ヒント２</button>
  <br />
  <input
  id="input_hours"
  class="input-box"
  style="margin: 20px"
  type="number"
  max="12"
  min="1"
  />じ
  <input
  id="input_minutes"
  class="input-box"
  style="margin: 20px"
  type="number"
  max="59"
      min="0"
      />ふん
  </div>
`;

  const canvas = document.getElementById("clock");
  const ctx = canvas.getContext("2d");

  // const moveable = new Moveable(document.body, {
  //   // If you want to use a group, set multiple targets(type: Array<HTMLElement | SVGElement>).
  //   target: document.querySelector(".target"),
  //   rotatable: true,
  //   draggable: true,
  //   throttleRotate: 0,
  //   rotationPosition: "top",
  //   zoom: 1,
  //   origin: true,
  //   padding: { left: 0, top: 0, right: 0, bottom: 0 },
  // });

  // moveable.on("rotate", ({ target, transform }) => {
  //   target.style.transform = transform;
  // });
  // moveable.on("rotateEnd", ({ target, isDrag }) => {
  //   console.log(target, isDrag);
  // });
  // moveable.on("drag", ({ target, transform }) => {
  //   target.style.transform = transform;
  // });
  // moveable.on("dragEnd", ({ target, isDrag }) => {
  //   console.log(target, isDrag);
  // });

  let hours = 6;
  let minutes = 0;
  let score_easy = 0;
  let score_normal = 0;
  let score_difficult = 0;
  let flag = true;
  let hari_hours;
  let hari_minutes;
  let Hint = "";
  const type = document.getElementById("type");
  const mode = document.getElementById("mode");
  const text = document.getElementById("clock_text");
  const tokei_range = document.getElementById("tokei_range");
  tokei_range.step = 15;
  tokei_range.value = 360;
  const plus = document.getElementById("Plus");
  const minus = document.getElementById("Minus");
  const question = document.getElementById("question");
  const score = document.getElementById("score");
  const check = document.getElementById("check");
  const ans = document.getElementById("ans");
  const hint1 = document.getElementById("hint1");
  const hint2 = document.getElementById("hint2");
  const input_hours = document.getElementById("input_hours");
  const input_minutes = document.getElementById("input_minutes");

  //時計の針を動かす。
  tokei_range.addEventListener("input", () => {
    hours = Math.floor(tokei_range.value / 60);
    minutes = Math.floor(tokei_range.value % 60);
    se.kako.currentTime = 0;
    se.kako.play();
    draw();
  });

  //プラスボタンを押したとき
  plus.addEventListener("click", () => {
    tokei_range.value = Math.floor(Number(tokei_range.value) + Number(tokei_range.step));
    hours = Math.floor(tokei_range.value / 60);
    minutes = Math.floor(tokei_range.value % 60);
    se.kako.currentTime = 0;
    se.kako.play();
    draw();
  });

  //マイナスボタンを押したとき
  minus.addEventListener("click", () => {
    tokei_range.value = tokei_range.value - tokei_range.step;
    hours = Math.floor(tokei_range.value / 60);
    minutes = Math.floor(tokei_range.value % 60);
    se.kako.currentTime = 0;
    se.kako.play();
    draw();
  });

  score.innerHTML = `　かんたん　…${score_easy}もん　せいかい<br>　ふつう　　…${score_normal}もん　せいかい<br>　むずかしい…${score_difficult}もん　せいかい`;

  question.addEventListener("click", () => {
    input_hours.value = "";
    input_minutes.value = "";
    text.style.color = "black";
    se.set.currentTime = 0;
    se.set.play();
    flag = true;
    hours = Math.floor(Math.random() * 12 + 1);
    switch (mode.value) {
      case "easy":
        minutes = Math.floor(Math.random() * 4) * 15;
        break;
      case "normal":
        minutes = Math.floor(Math.random() * 12) * 5;
        break;
      case "difficult":
        minutes = Math.floor(Math.random() * 60);
        break;
    }
    if (type.value == "nanji") {
      text.innerHTML = "なんじ　なんふん？";
      draw();
    } else if (type.value == "ugokasu") {
      hari_hours = hours;
      hari_minutes = minutes;
      text.innerHTML = `${hari_hours}じ　${hari_minutes}ふんに　はりを　うごかそう`;
      hours = 6;
      minutes = 0;
      tokei_range.value = 360;
      draw();
    }
  });

  type.addEventListener("change", () => {
    se.set.currentTime = 0;
    se.set.play();
  });

  mode.addEventListener("change", () => {
    switch (mode.value) {
      case "easy":
        tokei_range.step = 15;
        break;
      case "normal":
        tokei_range.step = 5;
        break;
      case "difficult":
        tokei_range.step = 1;
        break;
    }
    se.set.currentTime = 0;
    se.set.play();
  });

  hint1.addEventListener("click", () => {
    se.set.currentTime = 0;
    se.set.play();
    if (Hint == "hint1") {
      Hint = "";
    } else {
      Hint = "hint1";
    }
    draw();
  });

  hint2.addEventListener("click", () => {
    se.set.currentTime = 0;
    se.set.play();
    if (Hint == "hint2") {
      Hint = "";
    } else {
      Hint = "hint2";
    }
    draw();
  });

  input_hours.addEventListener("change", () => {
    se.pi.currentTime = 0;
    se.pi.play();
  });

  input_minutes.addEventListener("change", () => {
    se.pi.currentTime = 0;
    se.pi.play();
  });

  check.addEventListener("click", () => {
    if (hours == 0) hours = 12;
    if (type.value == "nanji") {
      var answer_hours = input_hours.value;
      if (input_hours.value == 0) input_hours.value = 12;
      var answer_minutes = input_minutes.value;
    } else if (type.value == "ugokasu") {
      hours = hari_hours;
      minutes = hari_minutes;
      var answer_hours = Math.floor(tokei_range.value / 60);
      if (answer_hours == 0) answer_hours = 12;
      var answer_minutes = Math.floor(tokei_range.value % 60);
    }
    if (hours == answer_hours && minutes == answer_minutes && flag == true) {
      se.seikai1.currentTime = 0;
      se.seikai1.play();
      text.innerHTML = "せいかい！";
      text.style.color = "red";
      switch (mode.value) {
        case "easy":
          score_easy++;
          break;
        case "normal":
          minutes = Math.floor(Math.random() * 12) * 5;
          score_normal++;
          break;
        case "difficult":
          minutes = Math.floor(Math.random() * 60);
          score_difficult++;
          break;
      }
      score.innerHTML = `　かんたん　…${score_easy}もん　せいかい<br>　ふつう　　…${score_normal}もん　せいかい<br>　むずかしい…${score_difficult}もん　せいかい`;
      flag = false;
    } else if ((hours != answer_hours || minutes != answer_minutes) && flag == true) {
      se.alert.currentTime = 0;
      se.alert.play();
    }
  });

  ans.addEventListener("click", () => {
    se.seikai2.currentTime = 0;
    se.seikai2.play();
    if (hours == 0) hours = 12;
    if (type.value == "nanji") {
      text.style.color = "red";
      text.innerHTML = `こたえは　${hours}じ　${minutes}ふん　です。`;
    } else if (type.value == "ugokasu") {
      hours = hari_hours;
      minutes = hari_minutes;
      draw();
    }
  });

  function mRotate() {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineWidth = 3.0;
    ctx.lineTo(200 + 130 * Math.cos((Math.PI / 180) * (270 + 6 * minutes)), 200 + 130 * Math.sin((Math.PI / 180) * (270 + 6 * minutes)));
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  function hRotate() {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineWidth = 6.0;
    ctx.lineTo(200 + 100 * Math.cos((Math.PI / 180) * (270 + 30 * (hours + minutes / 60))), 200 + 100 * Math.sin((Math.PI / 180) * (270 + 30 * (hours + minutes / 60))));
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  function rotate() {
    mRotate();
    hRotate();
  }

  function drawText() {
    ctx.font = "30px 'ＭＳ ゴシック'";
    ctx.textAlign = "center";
    const textArrX = [260, 305, 325, 310, 265, 200, 140, 95, 75, 95, 135, 200];
    const textArrY = [105, 150, 210, 275, 320, 335, 320, 270, 210, 150, 105, 85];
    const textArrX2 = [200, 280, 340, 360, 340, 280, 200, 120, 60, 40, 60, 120];
    const textArrY2 = [45, 65, 125, 205, 285, 345, 365, 345, 285, 205, 125, 65];
    for (let i = 0; i <= 11; i++) {
      ctx.fillText(i + 1, textArrX[i], textArrY[i]);
    }
    ctx.font = "15px 'ＭＳ ゴシック'";
    if (Hint == "hint1") {
      for (let i = 0; i <= 11; i++) {
        ctx.fillText(i * 5, textArrX2[i], textArrY2[i]);
      }
    } else if (Hint == "hint2") {
      for (let i = 0; i < 60; i++) {
        ctx.fillText(i, 200 + 160 * Math.cos((Math.PI / 180) * (270 + i * 6)), 205 + 160 * Math.sin((Math.PI / 180) * (270 + i * 6)));
      }
    }
    ctx.font = "10px 'ＭＳ ゴシック'";
  }

  function drawScale() {
    for (let l = 0; l < 60; l++) {
      ctx.beginPath();
      ctx.moveTo(200 + 150 * Math.cos((Math.PI / 180) * (270 + l * 6)), 200 + 150 * Math.sin((Math.PI / 180) * (270 + l * 6)));
      ctx.lineTo(200 + 145 * Math.cos((Math.PI / 180) * (270 + l * 6)), 200 + 145 * Math.sin((Math.PI / 180) * (270 + l * 6)));
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
    for (let m = 0; m < 12; m++) {
      ctx.beginPath();
      ctx.moveTo(200 + 150 * Math.cos((Math.PI / 180) * (270 + m * 30)), 200 + 150 * Math.sin((Math.PI / 180) * (270 + m * 30)));
      ctx.lineTo(200 + 140 * Math.cos((Math.PI / 180) * (270 + m * 30)), 200 + 140 * Math.sin((Math.PI / 180) * (270 + m * 30)));
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }

  function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, Math.PI * 2);
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  function draw() {
    drawBoard();
    drawScale();
    drawText();
    rotate();
  }

  draw();
}
