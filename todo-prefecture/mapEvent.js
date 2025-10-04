import * as se from "./se.js";

export function mapEvent(NUM, ken_A, flag) {
  //正答数初期化
  let Ten = 0;
  let Max_ten = Ten;
  //ドラッグ操作を与える。
  ugoki();

  //マウスでのドラッグを可能にする。
  var dragged;

  document.addEventListener(
    "dragstart",
    function (event) {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
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
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        hantei();
      }
    },
    false
  );

  function ugoki() {
    //ドラッグ可能アイテムへのタッチイベントの設定
    var draggableItems = $(".draggable-elem");
    for (var i = 0; i < draggableItems.length; i++) {
      var item = draggableItems[i];
      item.addEventListener("touchstart", touchStartEvent, false);
      item.addEventListener("touchmove", touchMoveEvent, false);
      item.addEventListener("touchend", touchEndEvent, false);
    }
  }

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
    }
    ugoki();
    hantei();
  }

  function hantei() {
    let ten = 0;
    let aaa;
    let bbb;
    for (let n = 1; n < NUM + 1; n++) {
      var ken = document.getElementById(n);
      var maru = document.getElementById("maru" + n);
      if (flag == "kyot") {
        aaa = ken.innerText.slice(0, 2);
        bbb = ken_A[n - 1].slice(0, 2);
      } else if (flag == "todo") {
        switch (Math.floor(n / 10)) {
          case 0:
            aaa = ken.innerText.slice(2, 4);
            break;
          default:
            aaa = ken.innerText.slice(3, 5);
        }
        bbb = ken_A[n - 1].slice(0, 2);
      }

      if (aaa == bbb) {
        maru.style.color = "red";
        ten = ten + 1;
      } else {
        maru.style.color = "darkgray";
      }
    }

    if (Max_ten < ten && ten != NUM) {
      se.right.currentTime = 0;
      se.right.play();
    } else if (Max_ten >= ten && ten != NUM) {
      se.pi.currentTime = 0;
      se.pi.play();
    }
    Max_ten = ten;
    const tensu = document.getElementById("tensu");
    tensu.innerHTML = Max_ten + "点";
    if (Max_ten === NUM) {
      se.seikai2.play();
      title.innerHTML = "ぜんもん せいかい!";
      title.style.color = "orangered";
    }
  }
}