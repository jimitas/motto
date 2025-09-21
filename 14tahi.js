import * as se from "./se.js";

export function tahi() {
  //音源の事前ロード
  se.pi.load();
  se.set.load();
  se.seikai1.load();
  se.seikai2.load();
  se.reset.load();
  document.getElementById("title").innerHTML = "たし算のひっ算(タッチのみ対応)";

  //初期設定------------------------------------
  let hikasu = 123;
  let kasu = 456;
  let max_keta = 4;
  let wa;
  let kuriagari;
  let hikasu_arr = [];
  let kasu_arr = [];
  let wa_arr = [];
  let hikasu_keta;
  let kasu_keta;
  let wa_keta;

  //--各ボタンの設定-------------------------------------
  const buttons = document.createElement("section");
  buttons.style.marginBottom = "10px";
  content.appendChild(buttons);
  //クリアボタン
  const clear = document.createElement("button");
  clear.setAttribute("class", "btn btn-primary");
  clear.innerHTML = "クリア";
  clear.addEventListener("click", () => masu_clear());
  buttons.appendChild(clear);
  //問題タイプ　リストボックス
  const type_data = ["(２けた)+(２けた)", "(３けた)+(２けた)", "(２けた)+(３けた)", "(３けた)+(３けた)"];
  const tasu_type = document.createElement("select");
  tasu_type.style.fontSize = "16px";
  for (let i = 1; i <= 4; i++) {
    const type = document.createElement("option");
    type.value = i;
    type.textContent = type_data[i - 1];
    tasu_type.appendChild(type);
  }
  buttons.appendChild(tasu_type);
  //問題ボタン＆問題を出す。
  const mondai = document.createElement("button");
  mondai.innerHTML = "もんだい";
  mondai.setAttribute("class", "btn btn-success");
  mondai.addEventListener("click", () => shutudai());
  buttons.appendChild(mondai);
  //問題　セット
  const set = document.createElement("button");
  set.innerHTML = "セット";
  set.setAttribute("class", "btn btn-info");
  set.addEventListener("click", () => mondai_set());
  buttons.appendChild(set);
  //こたえ　セット
  const kotae = document.createElement("button");
  kotae.innerHTML = "こたえ";
  kotae.setAttribute("class", "btn btn-danger");
  kotae.addEventListener("click", () => show_answer());
  buttons.appendChild(kotae);

  //式ボックスの設定------------------------------------
  const shiki = document.createElement("section");
  shiki.style.marginBottom = "10px";
  content.appendChild(shiki);
  shiki.style.display = "flex";
  const box1 = document.createElement("input");
  box1.setAttribute("type", "number");
  box1.setAttribute("max", 999);
  box1.setAttribute("min", 10);
  box1.setAttribute("class", "keisan_shiki");
  box1.value = hikasu;
  shiki.appendChild(box1);
  const box2 = document.createElement("div");
  box2.innerHTML = "+";
  box2.setAttribute("class", "kigo");
  shiki.appendChild(box2);
  const box3 = document.createElement("input");
  box3.setAttribute("type", "number");
  box3.setAttribute("max", 999);
  box3.setAttribute("min", 10);
  box3.value = kasu;
  box3.setAttribute("class", "keisan_shiki");
  shiki.appendChild(box3);
  const box4 = document.createElement("div");
  box4.innerHTML = "=";
  box4.setAttribute("class", "kigo");
  shiki.appendChild(box4);
  const box5 = document.createElement("input");
  box5.setAttribute("type", "number");
  box5.setAttribute("class", "keisan_shiki");
  box5.value = "";
  box5.addEventListener("change", () => {
    if (box5.value == wa) {
      box5.style.color = "red";
      se.seikai1.currentTime = 0;
      se.seikai1.play();
    } else {
      box5.style.color = "black";
    }
  });
  shiki.appendChild(box5);

  //フィールドの設定------------------------------------
  const field = document.createElement("div");
  field.setAttribute("id", "field");
  field.style.display = "flex";
  field.style.marginBottom = "10px";
  content.appendChild(field);

  //筆算マスの定義------------------------------------
  const TBL = document.createElement("table");
  field.appendChild(TBL);
  for (let i = 0; i < 4; i++) {
    const tr = document.createElement("tr");
    tr.style.maxHeight = "60px";
    for (let j = 0; j < max_keta; j++) {
      const td = document.createElement("td");
      td.style.border = "1px solid #333";
      td.style.width = "60px";
      td.style.maxWidth = "60px";
      td.style.height = "60px";
      td.style.maxHeight = "60px";
      td.style.fontSize = "30px";
      td.style.textAlign = "center";
      td.style.backgroundColor = "white";
      tr.appendChild(td);
      if (i == 0 || i == 3) {
        td.setAttribute("class", "droppable-elem");
        td.style.backgroundColor = "lightyellow";
      }
    }
    TBL.appendChild(tr);
    TBL.style.height = "240px";
  }

  // ゴミ箱の設置-------------------------
  const gomibako = document.createElement("img");
  gomibako.setAttribute("class", "droppable-elem");
  gomibako.setAttribute("src", "./image/gomibako.png");
  gomibako.style.width = "50px";
  gomibako.style.height = "60px";
  gomibako.style.position = "relative";
  gomibako.style.left = "10px";
  gomibako.style.top = "150px";
  field.appendChild(gomibako);

  //お金パレットの設置--------------------------------
  const TBL_2 = document.createElement("table");
  field.appendChild(TBL_2);
  for (let i = 0; i < 4; i++) {
    const tr = document.createElement("tr");
    tr.style.maxHeight = "60px";
    for (let j = 0; j < max_keta; j++) {
      const td = document.createElement("td");
      td.style.border = "1px solid #333";
      td.style.width = "200px";
      td.style.maxWidth = "200px";
      td.style.height = "60px";
      td.style.maxHeight = "60px";
      td.style.backgroundColor = "white";

      td.style.flexDirection = "column";
      tr.appendChild(td);
      td.setAttribute("class", "droppable-elem-2");
      if (i == 0 || i == 3) {
        td.style.backgroundColor = "lightyellow";
      }
    }
    TBL_2.appendChild(tr);
    TBL_2.style.height = "240px";
    TBL_2.style.marginLeft = "10px";
  }

  //数字パレットの設置
  const num_pallet = document.createElement("div");
  num_pallet.setAttribute("id", "num_pallet");
  num_pallet.setAttribute("class", "droppable-elem");
  content.appendChild(num_pallet);


  //スコアパレットの設置
  const score_pallet = document.createElement("div");
  score_pallet.setAttribute("id", "score_pallet");
  content.appendChild(score_pallet);

  hissan_set(hikasu, kasu);
  num_set();

  //ここから関数-----------------------------------------------------
  //関数　マス内の数字をクリア
  function masu_clear() {
    se.reset.currentTime = 0;
    se.reset.play();
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        TBL.rows[row].cells[col].innerHTML = "";
      }
    }
    TBL.rows[2].cells[0].innerHTML = "+";
    box1.value = "";
    box3.value = "";
    box5.value = "";
  }

  // 関数　問題をランダムに出す
  function shutudai() {
    switch (tasu_type.value) {
      case "1":
        hikasu = Math.floor(Math.random() * 90 + 10);
        kasu = Math.floor(Math.random() * 90 + 10);
        break;
      case "2":
        hikasu = Math.floor(Math.random() * 900 + 100);
        kasu = Math.floor(Math.random() * 90 + 10);
        break;
      case "3":
        hikasu = Math.floor(Math.random() * 90 + 10);
        kasu = Math.floor(Math.random() * 900 + 10);
        break;
      case "4":
        hikasu = Math.floor(Math.random() * 900 + 100);
        kasu = Math.floor(Math.random() * 900 + 100);
        break;
    }
    box1.value = hikasu;
    box3.value = kasu;
    hissan_set(hikasu, kasu);
    se.set.currentTime = 0;
    se.set.play();
  }

  // 関数　問題をセットする
  function mondai_set() {
    hikasu = box1.value;
    kasu = box3.value;
    hissan_set(hikasu, kasu);
    se.set.currentTime = 0;
    se.set.play();
  }

  // 関数　答えの表示
  function show_answer() {
    box5.value = wa;
    box5.style.color = "blue";
    se.seikai2.currentTime = 0;
    se.seikai2.play();
    //くり上がりの表示
    for (let col = 0; col < Math.min(hikasu_keta, kasu_keta); col++) {
      if (Math.floor(hikasu_arr[col] + kasu_arr[col] + kuriagari) > 9) {
        TBL.rows[0].cells[max_keta - col - 2].innerHTML = "1";
        kuriagari = 1;
        TBL.rows[0].cells[max_keta - col - 2].style.fontSize = "20px";
        TBL.rows[0].cells[max_keta - col - 2].style.color = "red";
        TBL.rows[0].cells[max_keta - col - 2].style.verticalAlign = "bottom";
      } else {
        kuriagari = 0;
      }
    }
    //筆算の答え表示
    for (let col = 0; col < wa_keta; col++) {
      TBL.rows[3].cells[max_keta - col - 1].innerHTML = wa_arr[col];
    }
    //答えの表示の時，お金を並べ直すかは要検討
  }

  // 関数　答えの入力---------------
  function kotae_input() {
    hikasu = Math.floor(box1.value);
    kasu = Math.floor(box3.value);
    wa = Math.floor(hikasu + kasu);
    box5.value =
      Number(TBL.rows[3].cells[0].innerText) * 1000 + Number(TBL.rows[3].cells[1].innerText) * 100 + Number(TBL.rows[3].cells[2].innerText) * 10 + Number(TBL.rows[3].cells[3].innerText) * 1;
    if (box5.value == wa) {
      box5.style.color = "red";
      se.seikai1.currentTime = 0;
      se.seikai1.play();
      scoreWrite();
    } else {
      box5.style.color = "black";
    }
  }

    //スコアの描画
    function scoreWrite() {
      const img = document.createElement("img");
      img.src = "./image/coin.png";
      img.style.width = "30px"
      img.style.height = "30px"
      score_pallet.appendChild(img);
    }


  //関数　筆算の描画---------------------
  function hissan_set(hikasu, kasu) {
    if (hikasu > 999 || kasu > 999 || hikasu < 0 || kasu < 0) {
      se.alert.play();
      alert("数字は1～999までにしてください。");
      box1.value = "";
      box3.value = "";
      return;
    }
    box5.style.color = "black";
    hikasu = Math.floor(hikasu);
    kasu = Math.floor(kasu);
    wa = Math.floor(hikasu + kasu);
    box1.value = hikasu;
    box3.value = kasu;
    box5.value = "";

    //数字を配列として代入
    hikasu_keta = String(hikasu).length;
    kasu_keta = String(kasu).length;
    wa_keta = String(wa).length;

    for (let i = 0; i < hikasu_keta; i++) {
      hikasu_arr[i] = Number(String(hikasu).charAt(hikasu_keta - i - 1));
    }
    for (let i = 0; i < kasu_keta; i++) {
      kasu_arr[i] = Number(String(kasu).charAt(kasu_keta - i - 1));
    }
    for (let i = 0; i < wa_keta; i++) {
      wa_arr[i] = Number(String(wa).charAt(wa_keta - i - 1));
    }

    suuji_set();
    okane_set();
  }

  //マス内にお金を並べる-----------------------
  function okane_set() {
    //一度　マス内のお金をクリア
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        TBL_2.rows[row].cells[col].innerHTML = "";
      }
    }

    const img_arr = ["ichien", "juuen", "hyakuen"];
    for (let col = 0; col < hikasu_keta; col++) {
      for (let i = 0; i < hikasu_arr[col]; i++) {
        const img = document.createElement("img");
        img.setAttribute("src", "./image/" + img_arr[col] + ".png");
        img.setAttribute("class", img_arr[col]);
        img.setAttribute("draggable", "true");
        img.style.width = "25px";
        img.style.height = "25px";
        img.style.cursor = "pointer";
        img.addEventListener("touchstart", touchStartEvent, false);
        img.addEventListener("touchmove", touchMoveEvent, false);
        img.addEventListener("touchend", touchEndEvent_2, false);
        TBL_2.rows[1].cells[max_keta - col - 1].appendChild(img);
      }
    }
    for (let col = 0; col < kasu_keta; col++) {
      for (let i = 0; i < kasu_arr[col]; i++) {
        const img = document.createElement("img");
        img.setAttribute("src", "./image/" + img_arr[col] + ".png");
        img.setAttribute("class", img_arr[col]);
        img.setAttribute("draggable", "true");
        img.style.width = "25px";
        img.style.cursor = "pointer";
        img.style.height = "25px";
        img.addEventListener("touchstart", touchStartEvent, false);
        img.addEventListener("touchmove", touchMoveEvent, false);
        img.addEventListener("touchend", touchEndEvent_2, false);
        TBL_2.rows[2].cells[max_keta - col - 1].appendChild(img);
      }
    }
    if ((hikasu < 100) & (kasu < 100)) {
      TBL_2.rows[2].cells[1].innerHTML = "+";
    } else {
      TBL_2.rows[2].cells[0].innerHTML = "+";
    }
  }

  //マス内に数字を書き込む-------------------
  function suuji_set() {
    //一度　マス内の数字をクリア
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        TBL.rows[row].cells[col].innerHTML = "";
      }
    }
    //マス内に数字を代入
    for (let col = 0; col < hikasu_keta; col++) {
      TBL.rows[1].cells[max_keta - col - 1].innerHTML = hikasu_arr[col];
    }
    for (let col = 0; col < kasu_keta; col++) {
      TBL.rows[2].cells[max_keta - col - 1].innerHTML = kasu_arr[col];
    }
    if ((hikasu < 100) & (kasu < 100)) {
      TBL.rows[2].cells[1].innerHTML = "+";
    } else {
      TBL.rows[2].cells[0].innerHTML = "+";
    }
  }

  //関数　数字のセット
  function num_set() {
    for (let i = 0; i < 10; i++) {
      const div = document.createElement("div");
      div.innerHTML = i;
      div.setAttribute("class", "draggable-elem");
      div.setAttribute("draggable", "true");
      div.style.width = "50px";
      div.style.height = "50px";
      div.style.lineHeight = "50px";
      div.style.backgroundColor = "white";
      div.style.fontSize = "30px";
      div.style.textAlign = "center";
      div.style.borderRadius = "10%";
      div.style.border = "1px solid #333";
      div.addEventListener("touchstart", touchStartEvent, false);
      div.addEventListener("touchmove", touchMoveEvent, false);
      div.addEventListener("touchend", touchEndEvent, false);
      document.getElementById("num_pallet").appendChild(div);
    }
  }

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
        //数パレット内の数字を一旦消去
        var ele = document.getElementById("num_pallet");
        while (ele.firstChild) {
          ele.removeChild(ele.firstChild);
        }
        num_set();
        kotae_input();
      } else if (event.target.className == "droppable-elem-2" && dragged.tagName == "IMG") {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        img_kuriagari();
      }
      se.pi.currentTime = 0;
      se.pi.play();
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
      //数パレット内の数字を一旦消去
      var ele = document.getElementById("num_pallet");
      while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
      }

      num_set();
      kotae_input();
    }
    se.pi.currentTime = 0;
    se.pi.play();
  }

  //ドラッグ終了後の操作2
  function touchEndEvent_2(event) {
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
    if (newParentElem.className == "droppable-elem-2") {
      newParentElem.appendChild(droppedElem);
    }
    se.pi.currentTime = 0;
    se.pi.play();
    img_kuriagari();
  }

  //くり上がりの操作
  function img_kuriagari() {
    const img_arr = ["ichien", "juuen", "hyakuen", "senen"];
    for (let j = 0; j < 3; j++) {
      var count = TBL_2.rows[3].cells[3 - j].getElementsByClassName(img_arr[j]).length;
      if (count > 9) {
        se.reset.currentTime = 0;
        se.reset.play();
        for (let i = 0; i < 10; i++) {
          TBL_2.rows[3].cells[3 - j].getElementsByClassName(img_arr[j])[0].remove();
        }
        img_style(j);
      }
    }
    function img_style(j) {
      const img = document.createElement("img");
      img.setAttribute("src", "./image/" + img_arr[j + 1] + ".png");
      img.setAttribute("class", img_arr[j + 1]);
      img.style.width = "25px";
      if (j == 2) {
        img.style.width = "60px";
      }
      img.style.height = "25px";
      img.addEventListener("touchstart", touchStartEvent, false);
      img.addEventListener("touchmove", touchMoveEvent, false);
      img.addEventListener("touchend", touchEndEvent_2, false);
      TBL_2.rows[0].cells[2 - j].appendChild(img);
    }
  }
}
