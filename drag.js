import * as data from "./data.js";

export function drag(event) {
  //マウスでのドラッグを可能にする。
  var dragged;
  var flag;
  const gomibako = document.getElementById("gomibako");

  document.addEventListener(
    "dragstart",
    (event) => {
      // store a ref. on the dragged elem
      dragged = event.target;

      //asideパレットから直接ゴミ箱へ入れないように制御する。
      if (window.innerWidth - event.clientX > 200) flag = true;
      else flag = false;
    },
    false
  );

  /* events fired on the draggable target */
  document.addEventListener("drag", (event) => {}, false);

  /* events fired on the drop targets */
  document.addEventListener(
    "dragover",
    (event) => {
      // prevent default to allow drop
      event.preventDefault();
    },
    false
  );

  document.addEventListener(
    "drop",
    (event) => {
      event.preventDefault();
      if (event.target.className.match(/droppable-elem/) && flag == true) {
        if (event.target.id.match(/gomibako/)) {
          data.cancel.play();
        } else {
          data.pi.play();
        }
        event.target.appendChild(dragged);
      }
    },
    false
  );

  //ドラッグ開始の操作
  event.addEventListener(
    "touchstart",
    (event) => {
      //タッチによる画面スクロールを止める
      event.preventDefault();
    },
    false
  );

  //ドラッグ中の操作
  event.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
      //ドラッグ中のアイテムをカーソルの位置に追従
      var draggedElem = event.target;
      var touch = event.changedTouches[0];
      event.target.style.position = "fixed";
      event.target.style.top = touch.pageY - window.pageYOffset - draggedElem.offsetHeight / 2 + "px";
      event.target.style.left = touch.pageX - window.pageXOffset - draggedElem.offsetWidth / 2 + "px";
    },
    false
  );

  //ドラッグ終了後の操作
  event.addEventListener(
    "touchend",
    (event) => {
      event.preventDefault();
      //ドラッグ中の操作のために変更していたスタイルを元に戻す
      var droppedElem = event.target;
      droppedElem.style.position = "";
      event.target.style.top = "";
      event.target.style.left = "";
      //ドロップした位置にあるドロップ可能なエレメントに親子付けする
      var touch = event.changedTouches[0];
      //スクロール分を加味した座標に存在するエレメントを新しい親とする
      var newParentElem = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
      if (newParentElem.className.match(/droppable-elem/)) {
        if (newParentElem.id.match(/gomibako/)) {
          data.cancel.play();
        } else {
          data.pi.play();
        }
        newParentElem.appendChild(droppedElem);
      }
    },
    false
  );
}
