import * as data from "./data.js";
import { move } from "./move.js";

export function draw() {
  //
  // JavaScriptのグローバル変数群
  //
  var canvas;
  var context;
  var wbound;
  var CANVAS_SIZE;
  var undoDataStack = [];
  var redoDataStack = [];
  var mouseDown = false;
  var touchDown = false;
  var x, y, stX, stY;

  $(function () {
    //
    // 画面読み込み時のロード処理
    //
    $(document).ready(function () {
      // キャンバスのサイズを設定

      // キャンバスの属性を設定
      canvas = document.getElementById("tegaki_canvas");
      canvas.width = window.innerWidth - 200;
      canvas.height = window.innerHeight - 70;
      CANVAS_SIZE = canvas.clientWidth;

      // 描画開始 → 描画中 → 描画終了
      canvas.addEventListener("mousedown", startDraw, false);
      canvas.addEventListener("mousemove", drawing, false);
      canvas.addEventListener("mouseup", endDraw, false);
      canvas.addEventListener("touchstart", touchStart, false);
      canvas.addEventListener("touchmove", touchMove, false);
      canvas.addEventListener("touchend", endTouch, false);
    });

    //
    // undo
    //
    $("#undo").click(function () {
      if (undoDataStack.length <= 0) {
        return;
      }

      canvas = document.getElementById("tegaki_canvas");
      context = canvas.getContext("2d");
      redoDataStack.unshift(context.getImageData(0, 0, canvas.width, canvas.height));

      var imageData = undoDataStack.shift();
      context.putImageData(imageData, 0, 0);
      data.cancel.currentTime = 0;
      data.cancel.play();
    });

    //
    // redo
    //
    $("#redo").click(function () {
      if (redoDataStack.length <= 0) {
        return;
      }

      canvas = document.getElementById("tegaki_canvas");
      context = canvas.getContext("2d");
      undoDataStack.unshift(context.getImageData(0, 0, canvas.width, canvas.height));

      var imageData = redoDataStack.shift();
      context.putImageData(imageData, 0, 0);
      data.move2.currentTime = 0;
      data.move2.play();
    });

    //
    // send
    //
    $("#send").click(function () {
      canvas = document.getElementById("tegaki_canvas");
      var png = canvas.toDataURL();
      var img = document.createElement("img");
      img.src = png;
      img.classList.add("tegaki");
      document.getElementById("content").appendChild(img);
      move(img);
      canvas.style.pointerEvents = "none";
      canvas.style.background = "rgba(255, 255, 205, 0)";
      canvas.style.border = "border: none;";
      tegaki_img.style.backgroundColor = "white";
      main_text_box.innerHTML = `じみぱれ。(地味に助かる算数パレット)`;
      main_text_box.style.color = "white";
      main_text_box.style.backgroundColor = "#005aff";
      data.cancel2.currentTime = 0;
      data.cancel2.play();
    });

    //
    // crear
    //
    $("#clear").click(function () {
      canvas = document.getElementById("tegaki_canvas");
      context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      data.cancel3.currentTime = 0;
      data.cancel3.play();
    });
  });

  //
  // 描画開始
  //
  function startDraw(event) {
    // 描画前処理をおこないマウス押下状態にする。
    beforeDraw();
    mouseDown = true;
    // クライアント領域からマウス開始位置座標を取得
    wbound = event.target.getBoundingClientRect();
    stX = event.clientX - wbound.left;
    stY = event.clientY - wbound.top;

    // キャンバス情報を取得
    canvas = document.getElementById("tegaki_canvas");
    context = canvas.getContext("2d");
  }

  function touchStart(event) {
    // 描画前処理をおこないマウス押下状態にする。
    beforeDraw();
    touchDown = true;
    // クライアント領域からマウス開始位置座標を取得
    wbound = event.target.getBoundingClientRect();
    stX = event.touches[0].pageX - wbound.left;
    stY = event.touches[0].pageY - wbound.top;
    // キャンバス情報を取得
    canvas = document.getElementById("tegaki_canvas");
    context = canvas.getContext("2d");
  }

  //
  // 描画前処理
  //
  function beforeDraw() {
    // undo領域に描画情報を格納
    redoDataStack = [];
    canvas = document.getElementById("tegaki_canvas");
    context = canvas.getContext("2d");
    undoDataStack.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
  }

  //
  // 描画中処理
  //
  function drawing(event) {
    // マウスボタンが押されていれば描画中と判断
    if (mouseDown) {
      x = event.clientX - wbound.left;
      y = event.clientY - wbound.top;
      draw(x, y);
    }
  }
  function touchMove(event) {
    // マウスボタンが押されていれば描画中と判断
    if (touchDown == true) {
      x = event.touches[0].pageX - wbound.left;
      y = event.touches[0].pageY - wbound.top;
      draw(x, y);
    }
  }

  //
  // 描画終了
  //
  function endDraw(event) {
    // マウスボタンが押されていれば描画中と判断
    if (mouseDown) {
      context.globalCompositeOperation = "source-over";
      context.setLineDash([]);
      mouseDown = false;
    }
  }

  function endTouch(event) {
    // マウスボタンが押されていれば描画中と判断
    if (touchDown) {
      context.globalCompositeOperation = "source-over";
      context.setLineDash([]);
      touchDown = false;
    }
  }

  //
  // 描画
  //
  function draw(x, y) {
    canvas = document.getElementById("tegaki_canvas");
    context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = data.color_data[document.getElementById("color_box").value];
    // context.strokeStyle = "black";
    context.fillStyle = data.color_data[document.getElementById("color_box").value];
    // context.fillStyle = "black";
    context.lineWidth = 2;
    context.lineCap = "round";

    context.globalCompositeOperation = "source-over";
    context.moveTo(stX, stY);
    context.lineTo(x, y);
    context.stroke();
    stX = x;
    stY = y;
  }
}
