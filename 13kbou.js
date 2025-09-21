import * as se from "./se.js";

export function kbou() {
  const section = document.createElement("section");
  section.setAttribute("id", "pallet");
  content.appendChild(section);
  for (let i = 0; i < 3; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", "pallet" + i);
    div.setAttribute("class", "droppable-elem");
    section.appendChild(div);
  }
  const section_L = document.createElement("section");
  section_L.setAttribute("id", "pallet");
  content.appendChild(section_L);
  for (let i = 0; i < 3; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", "pallet" + i);
    div.setAttribute("class", "droppable-elem");
    section_L.appendChild(div);
  }

  const section2 = document.createElement("section");
  section2.style.display = "flex";
  content.appendChild(section2);
  const box = document.createElement("section");
  box.setAttribute("id", "box");
  box.setAttribute("class", "droppable-elem");
  section2.appendChild(box);
  const gomibako = document.createElement("img");
  gomibako.setAttribute("class", "droppable-elem");
  gomibako.setAttribute("src", "./image/gomibako.png");
  gomibako.style.width = "60px";
  gomibako.style.height = "80px";
  section2.appendChild(gomibako);

  img_set();

  function img_set() {
    var ele = document.getElementById("box");
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
    const data = ["hyaku", "80px", "juu", "30px", "ichi", "20px"];
    for (let i = 0; i < 3; i++) {
      const img = document.createElement("img");
      img.setAttribute("src", "./image/" + data[i * 2] + ".png");
      img.setAttribute("class", "draggable-elem");
      img.style.width = data[i * 2 + 1];
      img.style.height = "80px";
      img.style.cursor = "pointer";
      img.addEventListener("touchstart", touchStartEvent, false);
      img.addEventListener("touchmove", touchMoveEvent, false);
      img.addEventListener("touchend", touchEndEvent, false);
      box.appendChild(img);
    }
  }
  //マウスでのドラッグを可能にする。
  var dragged;

  /* events fired on the draggable target */
  document.addEventListener("drag", function (event) {}, false);

  document.addEventListener(
    "dragstart",
    function (event) {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = 0.5;
    },
    false
  );

  document.addEventListener(
    "dragend",
    function (event) {
      // reset the transparency
      event.target.style.opacity = "";
    },
    false
  );

  /* events fired on the drop targets */
  document.addEventListener(
    "dragover",
    function (event) {
      // prevent default to allow drop
      event.preventDefault();
    },
    false
  );

  document.addEventListener(
    "drop",
    function (event) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if (event.target.className == "droppable-elem") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        img_set();
        se.pi.currentTime = 0;
        se.pi.play();
      }
    },
    false
  );

  //ドラッグ開始の操作
  function touchStartEvent(event) {
    //タッチによる画面スクロールを止める
    event.preventDefault();
  }

  //ドラッグ中の操作
  function touchMoveEvent(event) {
    event.preventDefault();
    //ドラッグ中のアイテムをカーソルの位置に追従
    var draggedElem = event.target;
    var touch = event.changedTouches[0];
    event.target.style.position = "fixed";
    event.target.style.top = touch.pageY - window.pageYOffset - draggedElem.offsetHeight / 2 + "px";
    event.target.style.left = touch.pageX - window.pageXOffset - draggedElem.offsetWidth / 2 + "px";
  }

  //ドラッグ終了後の操作
  function touchEndEvent(event) {
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
    if (newParentElem.className == "droppable-elem") {
      newParentElem.appendChild(droppedElem);
      img_set();
    }
    se.pi.currentTime = 0;
    se.pi.play();
  }
}
