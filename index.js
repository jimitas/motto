import { cren } from "./01cren.js";
import { enwo } from "./02enwo.js";
import { subl } from "./03subl.js";
import { kata } from "./04kata.js";
import { kenb } from "./05kenb.js";
import { kuku } from "./06kuku.js";
import { reco } from "./07reco.js";
import { roma } from "./08roma.js";
import { kyot } from "./09kyot.js";
import { todo } from "./10todo.js";
import { hyou } from "./11hyou.js";
import { fusi } from "./12fusi.js";
import { kbou } from "./13kbou.js";
import { tahi } from "./14tahi.js";
import { hihi } from "./15hihi.js";
import { kah1 } from "./16kah1.js";
import { masu } from "./17masu.js";
import { toke } from "./18toke.js";
import { kah2 } from "./19kah2.js";
import { rec2 } from "./20rec2.js";
import { ham2 } from "./21hamo.js";
import { mokn } from "./22mokn.js";
import { tekn } from "./23tekn.js";
import { gktn } from "./24gktn.js";
import { otoo } from "./25otoo.js";
import { waon } from "./26waon.js";
import { aray } from "./27aray.js";
import { metr } from "./28metr.js";
import { kane } from "./29kane.js";
import * as se from "./se.js";
se.pi.load();
se.set.load();
se.seikai1.load();
se.seikai2.load();
se.reset.load();
se.right.load();
se.move1.load();
se.move2.load();
se.alert.load();
// 読み込み時ページ先頭にスクロール，メニューの登録
window.onload = function () {
  $("html,body").animate({ scrollTop: 0 }, "1");
  menu();
};

// メニュー選択時の，関数呼び出しの登録
function menu() {
  const title = [
    "cren",
    "enwo",
    "subl",
    "kata",
    "kbou",
    "toke",
    "ham2",
    "kenb",
    "mokn",
    "tekn",
    "tahi",
    "hihi",
    "kuku",
    "masu",
    "hyou",
    "reco",
    "rec2",
    "kah1",
    "kah2",
    "roma",
    "kyot",
    "todo",
    "fusi",
    "gktn",
    "otoo",
    "waon",
    "aray",
    "metr",
    "kane",
  ];

  for (let i = 0; i < title.length; i++) {
    const menu = document.getElementById(title[i]);
    menu.addEventListener("click", () => {
      //メイン内の画面をクリア
      se.pi.currentTime = 0;
      se.pi.play();

      var ele = document.getElementById("header");
      while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
      }
      var ele = document.getElementById("content");
      while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
      }
      // タイトルの表示
      document.getElementById("title").innerHTML = menu.innerHTML;

      // それぞれのボタンに応じたコンテンツの呼び出し
      switch (i) {
        case 0:
          cren();
          break;
        case 1:
          enwo();
          break;
        case 2:
          subl();
          break;
        case 3:
          kata();
          break;
        case 4:
          kbou();
          break;
        case 5:
          toke();
          break;
        case 6:
          ham2();
          break;
        case 7:
          kenb();
          break;
        case 8:
          mokn();
          break;
        case 9:
          tekn();
          break;
        case 10:
          tahi();
          break;
        case 11:
          hihi();
          break;
        case 12:
          kuku();
          break;
        case 13:
          masu();
          break;
        case 14:
          hyou();
          break;
        case 15:
          reco();
          break;
        case 16:
          rec2();
          break;
        case 17:
          kah1();
          break;
        case 18:
          kah2();
          break;
        case 19:
          roma();
          break;
        case 20:
          kyot();
          break;
        case 21:
          todo();
          break;
        case 22:
          fusi();
          break;
        case 23:
          gktn();
          break;
        case 24:
          otoo();
          break;
        case 25:
          waon();
          break;
        case 26:
          aray();
          break;
        case 27:
          metr();
          break;
        case 28:
          kane();
          break;
      }
      //ハンバーガーアイコンを閉じる
      $("#menubar_hdr").removeClass("ham");
      $("#menubar").removeClass("db");
    });
  }
}
