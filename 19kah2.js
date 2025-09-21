import * as se from "./se.js";
export function kah2() {
  //音源の事前ロード
  se.pi.load();
  se.set.load();
  se.seikai1.load();
  se.seikai2.load();
  se.reset.load();
  document.getElementById("title").innerHTML = "かけ算のひっ算(１けたをかける)　(タッチのみ対応)";

  //初期設定------------------------------------
  let hijousu = 123;
  let jousu = 45;
  let max_keta = 5;
  let seki;
  let bubun_seki1;
  let bubun_seki2;
  let kuriagari;
  var flag_hint1 = 0;
  var flag_hint2 = 0;
  var flag_hint3 = false;
  let hijousu_arr = [];
  let jousu_arr = [];
  let seki_arr = [];
  let bubun_seki1_arr = [];
  let bubun_seki2_arr = [];
  let hijousu_keta;
  let jousu_keta;
  let seki_keta;
  let bubun_seki1_keta;
  let bubun_seki2_keta;

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
  const type_data = ["(２けた)×(２けた)", "(３けた)×(２けた)"];
  const tasu_type = document.createElement("select");
  tasu_type.style.fontSize = "16px";
  for (let i = 1; i <= 2; i++) {
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

  const hint_1 = document.createElement("button");
  hint_1.innerHTML = "ヒント１";
  hint_1.setAttribute("class", "btn btn-secondary");
  hint_1.style.marginLeft = "20px";
  hint_1.addEventListener("click", () => bubun1());
  buttons.appendChild(hint_1);
  const hint_2 = document.createElement("button");
  hint_2.innerHTML = "ヒント２";
  hint_2.setAttribute("class", "btn btn-secondary");
  hint_2.style.marginLeft = "20px";
  hint_2.addEventListener("click", () => bubun2());
  buttons.appendChild(hint_2);
  const hint_3 = document.createElement("button");
  hint_3.innerHTML = "九九の表";
  hint_3.style.marginLeft = "20px";
  hint_3.setAttribute("class", "btn btn-secondary");
  hint_3.addEventListener("click", () => kukuhyou());
  buttons.appendChild(hint_3);

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
  box1.value = hijousu;
  shiki.appendChild(box1);
  const box2 = document.createElement("div");
  box2.innerHTML = "×";
  box2.setAttribute("class", "kigo");
  shiki.appendChild(box2);
  const box3 = document.createElement("input");
  box3.setAttribute("type", "number");
  box3.setAttribute("max", 99);
  box3.setAttribute("min", 10);
  box3.value = jousu;
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
    if (box5.value == seki) {
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

  for (let i = 0; i < 8; i++) {
    const tr = document.createElement("tr");
    tr.style.maxHeight = "60px";
    if (i == 1 || i == 5) {
      tr.style.borderBottom = "3px solid black";
    }
    if (i == 3 || i == 5) {
      tr.setAttribute("class", "seki_tochu");
    }
    if (i == 2) {
      tr.style.maxHeight = "20px";
      tr.setAttribute("class", "seki_kuriagari1");
    }
    if (i == 4) {
      tr.style.maxHeight = "20px";
      tr.setAttribute("class", "seki_kuriagari2");
    }
    if (i == 6) {
      tr.style.maxHeight = "20px";
      tr.setAttribute("class", "seki_kuriagari3");
    }
    if (i == 7) {
      tr.setAttribute("class", "seki_kotae");
    }
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
      if (i > 1) {
        td.setAttribute("class", "droppable-elem");
      }
      if (i == 2 || i == 4 || i == 6) {
        td.style.height = "20px";
      }
      if (i == 2) {
        td.style.backgroundColor = "lightpink";
      } else if (i == 4) {
        td.style.backgroundColor = "lightyellow";
      } else if (i == 6) {
        td.style.backgroundColor = "lightblue";
      }
    }
    TBL.appendChild(tr);
    TBL.style.height = "360px";
  }

  // ゴミ箱の設置-------------------------
  const gomibako = document.createElement("img");
  gomibako.setAttribute("class", "droppable-elem");
  gomibako.setAttribute("src", "./image/gomibako.png");
  gomibako.style.width = "50px";
  gomibako.style.height = "60px";
  gomibako.style.position = "relative";
  gomibako.style.left = "10px";
  gomibako.style.top = "300px";
  field.appendChild(gomibako);

  const text_box_1 = document.createElement("div");
  text_box_1.style.width = "350px";
  text_box_1.style.height = "40px";
  text_box_1.style.fontSize = "30px";
  text_box_1.style.textAlign = "center";
  text_box_1.style.color = "blue";
  text_box_1.style.position = "absolute";
  text_box_1.style.left = "350px";
  text_box_1.style.top = "420px";
  text_box_1.style.backgroundColor = "lightpink";
  const text_box_2 = document.createElement("div");
  text_box_2.style.width = "350px";
  text_box_2.style.height = "40px";
  text_box_2.style.fontSize = "30px";
  text_box_2.style.textAlign = "center";
  text_box_2.style.color = "blue";
  text_box_2.style.position = "absolute";
  text_box_2.style.left = "350px";
  text_box_2.style.top = "500px";
  text_box_2.style.backgroundColor = "lightyellow";
  field.appendChild(text_box_1);
  field.appendChild(text_box_2);

  const TBL_2 = document.createElement("table");
  TBL_2.style.position = "absolute";
  TBL_2.style.left = "520px";
  TBL_2.style.top = "180px";
  TBL_2.style.opacity = 0.9;
  TBL_2.style.zIndex = 100;
  for (let row = 0; row < 10; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 10; col++) {
      const td = document.createElement("td");
      td.setAttribute("class", "hyou");
      td.style.height = "20px";
      td.style.width = "20px";
      td.style.fontSize = "12px";
      tr.appendChild(td);
      if (row == 0 && col != 0) {
        td.innerHTML = col;
      }
      if (col == 0 && row != 0) {
        td.innerHTML = row;
      } else if (row == 0 && col == 0) {
        td.innerHTML = "×";
      }
      if (row != 0 && col != 0) {
        td.style.color = "red";
        td.style.backgroundColor = "white";
        td.innerHTML = row * col;
      }
    }
    TBL_2.appendChild(tr);
  }

  //数字パレットの設置
  const num_pallet = document.createElement("div");
  num_pallet.setAttribute("id", "num_pallet");
  num_pallet.setAttribute("class", "droppable-elem");
  content.appendChild(num_pallet);

  hissan_set();
  num_set();

  //ここから関数-----------------------------------------------------
  //関数　マス内の数字をクリア
  function masu_clear() {
    se.reset.currentTime = 0;
    se.reset.play();
    hint_clear();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 5; col++) {
        TBL.rows[row].cells[col].innerHTML = "";
      }
    }
    TBL.rows[1].cells[1].innerHTML = "×";
    box1.value = "";
    box3.value = "";
    box5.value = "";
  }

  function hint_clear() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 5; col++) {
        TBL.rows[row].cells[col].style.backgroundColor = "white";
      }
    }
    text_box_1.innerHTML = "";
    text_box_2.innerHTML = "";
    TBL.rows[5].cells[4].innerHTML = "";
  }

  // 関数　問題をランダムに出す
  function shutudai() {
    switch (tasu_type.value) {
      case "1":
        hijousu = Math.floor(Math.random() * 90 + 10);
        jousu = Math.floor(Math.random() * 90 + 10);
        break;
      case "2":
        hijousu = Math.floor(Math.random() * 900 + 100);
        jousu = Math.floor(Math.random() * 90 + 10);
        break;
    }
    box1.value = hijousu;
    box3.value = jousu;
    hissan_set();
    se.set.currentTime = 0;
    se.set.play();
  }

  // 関数　問題をセットする
  function mondai_set() {
    hijousu = box1.value;
    jousu = box3.value;
    hissan_set();
    se.set.currentTime = 0;
    se.set.play();
  }

  // 関数　答えの表示
  function show_answer() {
    box5.value = seki;
    box5.style.color = "blue";
    se.seikai2.currentTime = 0;
    se.seikai2.play();
    kuriagari = 0;
    //くり上がり１の表示
    for (let col = 0; col < hijousu_keta; col++) {
      if (Math.floor(hijousu_arr[col] * jousu_arr[0] + kuriagari) > 9) {
        kuriagari = Math.floor((hijousu_arr[col] * jousu_arr[0] + kuriagari) / 10);
        TBL.rows[2].cells[max_keta - col - 2].innerHTML = kuriagari;
        TBL.rows[2].cells[max_keta - col - 2].style.fontSize = "12px";
        TBL.rows[2].cells[max_keta - col - 2].style.color = "gray";
        TBL.rows[2].cells[max_keta - col - 2].style.verticalAlign = "bottom";
        TBL.rows[2].cells[max_keta - col - 2].style.textAlign = "right";
      } else {
        kuriagari = 0;
      }
    }
    kuriagari = 0;
    //くり上がりの表示
    for (let col = 0; col < hijousu_keta; col++) {
      if (Math.floor(hijousu_arr[col] * jousu_arr[1] + kuriagari) > 9) {
        kuriagari = Math.floor((hijousu_arr[col] * jousu_arr[1] + kuriagari) / 10);
        TBL.rows[4].cells[max_keta - col - 3].innerHTML = kuriagari;
        TBL.rows[4].cells[max_keta - col - 3].style.fontSize = "12px";
        TBL.rows[4].cells[max_keta - col - 3].style.color = "gray";
        TBL.rows[4].cells[max_keta - col - 3].style.verticalAlign = "bottom";
        TBL.rows[4].cells[max_keta - col - 3].style.textAlign = "right";
      } else {
        kuriagari = 0;
      }
    }
    kuriagari = 0;
    
    //部分積１の表示
    for (let col = 0; col < bubun_seki1_keta; col++) {
      TBL.rows[3].cells[max_keta - col - 1].innerHTML = bubun_seki1_arr[col];
    }
    //部分積２の表示
    for (let col = 0; col < bubun_seki2_keta; col++) {
      TBL.rows[5].cells[max_keta - col - 2].innerHTML = bubun_seki2_arr[col];
    }
    //くり上がり答えの表示
    for (let col = 0; col < seki_keta; col++) {
      let sum = 0;
      sum = Math.floor(Number(TBL.rows[3].cells[max_keta - col - 1].innerText) + Number(TBL.rows[5].cells[max_keta - col - 1].innerText) + Number(TBL.rows[6].cells[max_keta - col - 1].innerText));
      console.log(max_keta - col - 1,Number(TBL.rows[3].cells[max_keta - col - 1].innerText,sum),Number(TBL.rows[5].cells[max_keta - col - 1].innerText),Number(TBL.rows[6].cells[max_keta - col - 1].innerText));
      if (sum > 9) {
        kuriagari = 1;
        TBL.rows[6].cells[max_keta - col - 2].innerHTML = kuriagari;
        TBL.rows[6].cells[max_keta - col - 2].style.fontSize = "20px";
        TBL.rows[6].cells[max_keta - col - 2].style.color = "red";
        TBL.rows[6].cells[max_keta - col - 2].style.verticalAlign = "bottom";
      } else {
        kuriagari = 0;
      }
    }
    //筆算の答え表示
    for (let col = 0; col < seki_keta; col++) {
      TBL.rows[7].cells[max_keta - col - 1].innerHTML = seki_arr[col];
    }
    //答えの表示の時，お金を並べ直すかは要検討
  }

  // 関数　答えの入力---------------
  function kotae_input() {
    hijousu = Math.floor(box1.value);
    jousu = Math.floor(box3.value);
    seki = Math.floor(hijousu * jousu);
    box5.value =
      Number(TBL.rows[7].cells[0].innerText) * 10000 +
      Number(TBL.rows[7].cells[1].innerText) * 1000 +
      Number(TBL.rows[7].cells[2].innerText) * 100 +
      Number(TBL.rows[7].cells[3].innerText) * 10 +
      Number(TBL.rows[7].cells[4].innerText) * 1;
    if (box5.value == seki) {
      box5.style.color = "red";
      se.seikai1.currentTime = 0;
      se.seikai1.play();
    } else {
      box5.style.color = "black";
    }
  }
  function bubun1() {
    hint_clear();
    se.reset.currentTime = 0;
    se.reset.play();
    let data = [0, 2, 0, 3, 0, 4, 1, 4, 3, 1, 3, 2, 3, 3, 3, 4];
    if (flag_hint1 == 0) {
      for (let i = 0; i < data.length / 2; i++) {
        TBL.rows[data[i * 2]].cells[data[Math.floor(i * 2 + 1)]].style.backgroundColor = "lightpink";
      }
      text_box_1.innerHTML = `${hijousu}　×　${jousu_arr[0]}`;
      flag_hint1 = 1;
    } else if (flag_hint1 == 1) {
      for (let i = 0; i < data.length / 2; i++) {
        TBL.rows[data[i * 2]].cells[data[Math.floor(i * 2 + 1)]].style.backgroundColor = "lightpink";
      }
      text_box_1.innerHTML = `${hijousu}　×　${jousu_arr[0]}　＝　${hijousu * jousu_arr[0]}`;
      flag_hint1 = 2;
    } else if (flag_hint1 == 2) {
      flag_hint1 = 0;
    }
  }

  function bubun2() {
    hint_clear();
    se.reset.currentTime = 0;
    se.reset.play();
    let data = [0, 2, 0, 3, 0, 4, 1, 3, 5, 0, 5, 1, 5, 2, 5, 3];
    if (flag_hint2 == 0) {
      for (let i = 0; i < data.length / 2; i++) {
        TBL.rows[data[i * 2]].cells[data[Math.floor(i * 2 + 1)]].style.backgroundColor = "lightyellow";
      }
      TBL.rows[5].cells[4].innerHTML = `<span style="color:gray">0</span>`;
      text_box_2.innerHTML = `${hijousu}　×　${jousu_arr[1]}<span style="color:gray">0</span>`;
      flag_hint2 = 1;
    } else if (flag_hint2 == 1) {
      for (let i = 0; i < data.length / 2; i++) {
        TBL.rows[data[i * 2]].cells[data[Math.floor(i * 2 + 1)]].style.backgroundColor = "lightyellow";
        TBL.rows[5].cells[4].innerHTML = `<span style="color:gray">0</span>`;
        text_box_2.innerHTML = `${hijousu}　×　${jousu_arr[1]}<span style="color:gray">0</span>　＝　${hijousu * jousu_arr[1]}<span style="color:gray">0</span>`;
      }
      flag_hint2 = 2;
    } else if (flag_hint2 == 2) {
      flag_hint2 = 0;
    }
  }

  function kukuhyou() {
    se.reset.currentTime = 0;
    se.reset.play();
    if (flag_hint3 == 0) {
      field.appendChild(TBL_2);
      flag_hint3 = 1;
    } else if (flag_hint3 == 1) {
      field.removeChild(TBL_2);
      flag_hint3 = 0;
    }
  }

  //関数　筆算の描画---------------------
  function hissan_set() {
    if (hijousu > 999 || jousu > 99 || hijousu < 0 || jousu < 0) {
      se.alert.play();
      alert("かけられる数は1～999，かける数は1～99までにしてください。");
      box1.value = "";
      box3.value = "";
      return;
    }
    hint_clear();
    flag_hint1 = 0;
    flag_hint2 = 0;
    flag_hint3 = 0;
    box5.style.color = "black";
    hijousu = Math.floor(hijousu);
    jousu = Math.floor(jousu);
    seki = Math.floor(hijousu * jousu);
    box1.value = hijousu;
    box3.value = jousu;
    box5.value = "";

    //数字を配列として代入
    hijousu_keta = String(hijousu).length;
    jousu_keta = String(jousu).length;
    seki_keta = String(seki).length;

    hijousu_arr[2] = 0;

    for (let i = 0; i < hijousu_keta; i++) {
      hijousu_arr[i] = Number(String(hijousu).charAt(hijousu_keta - i - 1));
    }
    for (let i = 0; i < jousu_keta; i++) {
      jousu_arr[i] = Number(String(jousu).charAt(jousu_keta - i - 1));
    }
    for (let i = 0; i < seki_keta; i++) {
      seki_arr[i] = Number(String(seki).charAt(seki_keta - i - 1));
    }

    bubun_seki1 = Math.floor(hijousu * jousu_arr[0]);
    bubun_seki2 = Math.floor(hijousu * jousu_arr[1]);
    bubun_seki1_keta = String(bubun_seki1).length;
    bubun_seki2_keta = String(bubun_seki2).length;
    for (let i = 0; i < bubun_seki1_keta; i++) {
      bubun_seki1_arr[i] = Number(String(bubun_seki1).charAt(bubun_seki1_keta - i - 1));
    }
    for (let i = 0; i < bubun_seki2_keta; i++) {
      bubun_seki2_arr[i] = Number(String(bubun_seki2).charAt(bubun_seki2_keta - i - 1));
    }
    suuji_set();
  }

  //マス内に数字を書き込む-------------------
  function suuji_set() {
    //一度　マス内の数字をクリア
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 5; col++) {
        TBL.rows[row].cells[col].innerHTML = "";
      }
    }
    //マス内に数字を代入
    for (let col = 0; col < hijousu_keta; col++) {
      TBL.rows[0].cells[max_keta - col - 1].innerHTML = hijousu_arr[col];
    }
    for (let col = 0; col < jousu_keta; col++) {
      TBL.rows[1].cells[max_keta - col - 1].innerHTML = jousu_arr[col];
    }
    if ((hijousu < 100) & (jousu < 100)) {
      TBL.rows[1].cells[2].innerHTML = "×";
    } else {
      TBL.rows[1].cells[1].innerHTML = "×";
    }
  }

  //関数　数字のセット
  function num_set() {
    for (let i = 0; i < 10; i++) {
      const div = document.createElement("div");
      div.innerHTML = i;
      div.setAttribute("class", "draggable-elem");
      div.setAttribute("draggable", "true");

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
}
