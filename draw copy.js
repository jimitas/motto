import { move } from "./move.js";

export function draw() {
  main_text_box.innerHTML = `じゆうカード　<span style="font-size:12px;">けすときは，🔨メニュー→「×」</span>`;
  const canvas = document.createElement("canvas");
  document.querySelector("#draw_area").appendChild(canvas);
  // move(canvas);
  canvas.style.width = "300px";
  canvas.style.height = "150px";
  canvas.style.position = "fixed";
  canvas.style.zIndex = "10000px";
  canvas.style.backgroundColor = "lightyellow";
  const context = canvas.getContext("2d");
  const lastPosition = { x: null, y: null };
  let isDrag = false;

  // 現在の線の色を保持する変数(デフォルトは黒(#000000)とする)
  let currentColor = "#000000";

  function draw(x, y) {
    if (!isDrag) {
      return;
    }
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 5;
    context.strokeStyle = currentColor;
    if (lastPosition.x === null || lastPosition.y === null) {
      context.moveTo(x, y);
    } else {
      context.moveTo(lastPosition.x, lastPosition.y);
    }
    context.lineTo(x, y);
    context.stroke();

    lastPosition.x = x;
    lastPosition.y = y;
  }

  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function dragStart(event) {
    context.beginPath();

    isDrag = true;
  }

  function dragEnd(event) {
    context.closePath();
    isDrag = false;
    lastPosition.x = null;
    lastPosition.y = null;
  }

  function initEventHandler() {
    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", clear);

    // 消しゴムモードを選択したときの挙動
    const eraserButton = document.querySelector("#eraser-button");
    eraserButton.addEventListener("click", () => {
      // 消しゴムと同等の機能を実装したい場合は現在選択している線の色を
      // 白(#FFFFFF)に変更するだけでよい
      currentColor = "#FFFFFF";
    });

    canvas.addEventListener("mousedown", dragStart);
    canvas.addEventListener("mouseup", dragEnd);
    canvas.addEventListener("mouseout", dragEnd);
    canvas.addEventListener("mousemove", (event) => {
      draw(event.layerX, event.layerY);
    });
  }
}
