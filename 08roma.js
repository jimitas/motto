//効果音の設定
import * as se from "./se.js";

export function roma() {
  document.getElementById("content").innerHTML = `
  <h1 class="m-2 text-center">ローマ字の練習</h1>
    <form action="" class="d-flex justify-content-center">
        <label for="mode_1">
            <input type="radio" name="mode" id="mode_1" onchange="changeMode(1)" checked>
            Lv1:かんたん　
        </label>
        <label for="mode_2">
            <input type="radio" name="mode" id="mode_2" onchange="changeMode(2)">
            Lv2:むずかしい　
        </label>
        <label for="mode_3">
            <input type="radio" name="mode" id="mode_3" onchange="changeMode(3)">
            Lv1+Lv2　
        </label>
    </form>

    <div class="d-flex justify-content-center">
        <div id="text_box1" class="w-75 mx-2 p-2 text-center align-middle h2"
            style="height:60px;line-height:60px;background-color: antiquewhite;">
            もんだいを　おしてね。</div>
    </div>
    <div class="d-flex justify-content-center">
        <div id="text_box2" class="w-75 mx-2 p-2 text-center align-middle h2"
            style="height:60px;line-height:60px;background-color: antiquewhite;">
        </div>
    </div>
    <div class="d-flex justify-content-center flex-wrap">
        <button id="btnQuestion" class="btn btn-danger m-2">もんだい</button>
        <button id="btnShow" class="btn btn-success m-2">答えを見る</button>
        <button id="btnDelete" class="btn btn-success m-2">１つ消す</button>
        <button id="btnClear" class="btn btn-success m-2">全部消す</button>
        <button id="btnCaps" class="btn btn-info m-2">A⇔a</button>
    </div>
    <div class="d-flex justify-content-center">
        <div id="keyPallet" class="d-flex flex-wrap my-2 mx-5">
        </div>
    </div>

    <div id="scorePallet" class="m-2"></div>
`

  var index = 0;
  var score = 0;
  var flag = false;
  var capsFlag = false;
  var myAnswer = ""
  var mode = 1;

  const data = [
    { id: 1, word: "あお", ans_1: "ao", ans_2: "", ans_3: "", ans_4: "" },
    { id: 2, word: "いえ", ans_1: "ie", ans_2: "", ans_3: "", ans_4: "" },
    { id: 3, word: "うえ", ans_1: "ue", ans_2: "", ans_3: "", ans_4: "" },
    { id: 4, word: "かい", ans_1: "kai", ans_2: "", ans_3: "", ans_4: "" },
    { id: 5, word: "きく", ans_1: "kiku", ans_2: "", ans_3: "", ans_4: "" },
    { id: 6, word: "いけ", ans_1: "ike", ans_2: "", ans_3: "", ans_4: "" },
    { id: 7, word: "こい", ans_1: "koi", ans_2: "", ans_3: "", ans_4: "" },
    { id: 8, word: "さか", ans_1: "saka", ans_2: "", ans_3: "", ans_4: "" },
    { id: 9, word: "しせい", ans_1: "sisei", ans_2: "shisei", ans_3: "", ans_4: "" },
    { id: 10, word: "せかい", ans_1: "sekai", ans_2: "", ans_3: "", ans_4: "" },
    { id: 11, word: "そこ", ans_1: "soko", ans_2: "", ans_3: "", ans_4: "" },
    { id: 12, word: "たこ", ans_1: "tako", ans_2: "", ans_3: "", ans_4: "" },
    { id: 13, word: "くち", ans_1: "kuti", ans_2: "kuchi", ans_3: "", ans_4: "" },
    { id: 14, word: "てつ", ans_1: "tetu", ans_2: "tetsu", ans_3: "", ans_4: "" },
    { id: 15, word: "とけい", ans_1: "tokei", ans_2: "", ans_3: "", ans_4: "" },
    { id: 16, word: "なす", ans_1: "nasu", ans_2: "", ans_3: "", ans_4: "" },
    { id: 17, word: "にく", ans_1: "niku", ans_2: "", ans_3: "", ans_4: "" },
    { id: 18, word: "ぬの", ans_1: "nuno", ans_2: "", ans_3: "", ans_4: "" },
    { id: 19, word: "ねこ", ans_1: "neko", ans_2: "", ans_3: "", ans_4: "" },
    { id: 20, word: "はと", ans_1: "hato", ans_2: "", ans_3: "", ans_4: "" },
    { id: 21, word: "ひふ", ans_1: "hihu", ans_2: "hifu", ans_3: "", ans_4: "" },
    { id: 22, word: "へそ", ans_1: "heso", ans_2: "", ans_3: "", ans_4: "" },
    { id: 23, word: "ほし", ans_1: "hosi", ans_2: "hoshi", ans_3: "", ans_4: "" },
    { id: 24, word: "まめ", ans_1: "mame", ans_2: "", ans_3: "", ans_4: "" },
    { id: 25, word: "うみ", ans_1: "umi", ans_2: "", ans_3: "", ans_4: "" },
    { id: 26, word: "むし", ans_1: "musi", ans_2: "mushi", ans_3: "", ans_4: "" },
    { id: 27, word: "もも", ans_1: "momo", ans_2: "", ans_3: "", ans_4: "" },
    { id: 28, word: "やま", ans_1: "yama", ans_2: "", ans_3: "", ans_4: "" },
    { id: 29, word: "やさい", ans_1: "yasai", ans_2: "", ans_3: "", ans_4: "" },
    { id: 30, word: "ゆき", ans_1: "yuki", ans_2: "", ans_3: "", ans_4: "" },
    { id: 31, word: "ひよこ", ans_1: "hiyoko", ans_2: "", ans_3: "", ans_4: "" },
    { id: 32, word: "とら", ans_1: "tora", ans_2: "", ans_3: "", ans_4: "" },
    { id: 33, word: "ほたる", ans_1: "hotaru", ans_2: "", ans_3: "", ans_4: "" },
    { id: 34, word: "すみれ", ans_1: "sumire", ans_2: "", ans_3: "", ans_4: "" },
    { id: 35, word: "いろり", ans_1: "irori", ans_2: "", ans_3: "", ans_4: "" },
    { id: 36, word: "わに", ans_1: "wani", ans_2: "", ans_3: "", ans_4: "" },
    { id: 37, word: "みかん", ans_1: "mikan", ans_2: "", ans_3: "", ans_4: "" },
    { id: 38, word: "うさぎ", ans_1: "usagi", ans_2: "", ans_3: "", ans_4: "" },
    { id: 39, word: "えのぐ", ans_1: "enogu", ans_2: "", ans_3: "", ans_4: "" },
    { id: 40, word: "げき", ans_1: "geki", ans_2: "", ans_3: "", ans_4: "" },
    { id: 41, word: "りんご", ans_1: "ringo", ans_2: "", ans_3: "", ans_4: "" },
    { id: 42, word: "ざりがに", ans_1: "zarigani", ans_2: "", ans_3: "", ans_4: "" },
    { id: 43, word: "もじ", ans_1: "mozi", ans_2: "moji", ans_3: "", ans_4: "" },
    { id: 44, word: "かぜ", ans_1: "kaze", ans_2: "", ans_3: "", ans_4: "" },
    { id: 45, word: "かぞく", ans_1: "kazoku", ans_2: "", ans_3: "", ans_4: "" },
    { id: 46, word: "ぱんだ", ans_1: "panda", ans_2: "", ans_3: "", ans_4: "" },
    { id: 47, word: "えんぴつ", ans_1: "enpitu", ans_2: "enpitsu", ans_3: "", ans_4: "" },
    { id: 48, word: "てんぷら", ans_1: "tenpura", ans_2: "", ans_3: "", ans_4: "" },
    { id: 49, word: "たんぽぽ", ans_1: "tanpopo", ans_2: "", ans_3: "", ans_4: "" },
    { id: 50, word: "きゃべつ", ans_1: "kyabetu", ans_2: "kyabetsu", ans_3: "", ans_4: "" },
    { id: 51, word: "でんしゃ", ans_1: "densya", ans_2: "densha", ans_3: "", ans_4: "" },
    { id: 52, word: "ちょきん", ans_1: "tyokin", ans_2: "chokin", ans_3: "", ans_4: "" },
    { id: 53, word: "おもちゃ", ans_1: "omotya", ans_2: "omocha", ans_3: "", ans_4: "" },
    { id: 54, word: "ひゃくえん", ans_1: "hyakuen", ans_2: "", ans_3: "", ans_4: "" },
    { id: 55, word: "みゃく", ans_1: "myaku", ans_2: "", ans_3: "", ans_4: "" },
    { id: 56, word: "りょかん", ans_1: "ryokan", ans_2: "", ans_3: "", ans_4: "" },
    { id: 57, word: "きんぎょ", ans_1: "kingyo", ans_2: "", ans_3: "", ans_4: "" },
    { id: 58, word: "じゃがいも", ans_1: "zyagaimo", ans_2: "jagaimo", ans_3: "", ans_4: "" },
    { id: 59, word: "しんじゅ", ans_1: "sinzyu", ans_2: "sinju", ans_3: "shinzyu", ans_4: "shinju" },
    { id: 60, word: "おかあさん", ans_1: "okâsan", ans_2: "", ans_3: "", ans_4: "" },
    { id: 61, word: "おにいさん", ans_1: "onîsan", ans_2: "", ans_3: "", ans_4: "" },
    { id: 62, word: "ひこうき", ans_1: "hikôki", ans_2: "", ans_3: "", ans_4: "" },
    { id: 63, word: "ねっこ", ans_1: "nekko", ans_2: "", ans_3: "", ans_4: "" },
    { id: 64, word: "ざっし", ans_1: "zassi", ans_2: "zasshi", ans_3: "", ans_4: "" },
    { id: 65, word: "らっぱ", ans_1: "rappa", ans_2: "", ans_3: "", ans_4: "" },

]

  const text_box1 = document.getElementById("text_box1");
  const text_box2 = document.getElementById("text_box2");
  const btnDelete = document.getElementById("btnDelete");
  const btnClear = document.getElementById("btnClear");
  const keyPallet = document.getElementById("keyPallet");
  const btnQuestion = document.getElementById("btnQuestion");
  const btnCaps = document.getElementById("btnCaps");

  const upLetter = "AIUEOKSTNHMYRWGZDBPFJCĀĪŪĒŌ";
  const lowLetter = "aiueokstnhmyrwgzdbpfjcâîûêô";

  btnQuestion.addEventListener("click", () => { question() }, false);
  btnShow.addEventListener("click", () => { showAnswer() }, false);
  btnClear.addEventListener("click", () => { textClear() }, false);
  btnDelete.addEventListener("click", () => { textDelete() }, false);
  btnCaps.addEventListener("click", () => { changeCaps() }, false);

  createButtons();

  function createButtons() {
    keyPallet.innerHTML = "";
    for (let i = 0; i < lowLetter.length; i++) {
      const btn = document.createElement("button");
      btn.classList = "btn btn-primary m-2 letter";
      btn.style.width="80px"
      btn.style.fontSize="40px"
      if (capsFlag) {
        btn.innerHTML = upLetter.charAt(i);
        btn.addEventListener("click", () => {
          if (!flag) return;
          myAnswer = myAnswer + upLetter.charAt(i);
          myAnserWrite();
          checkAnswer();
          se.pi.currentTime = 0;
          se.pi.play();
        })
      } else {
        btn.innerHTML = lowLetter.charAt(i);
        btn.addEventListener("click", () => {
          if (!flag) return;
          myAnswer = myAnswer + lowLetter.charAt(i);
          myAnserWrite();
          checkAnswer();
          se.pi.currentTime = 0;
          se.pi.play();
        })
      }
      keyPallet.appendChild(btn);
    }
  }

  function changeMode(num) {
    se.set.currentTime = 0;
    se.set.play();
    mode = num;
  }

  function changeCaps() {
    se.set.currentTime = 0;
    se.set.play();
    capsFlag = !capsFlag;
    createButtons();
  }

  function textDelete() {
    if (!flag) return;
    if (myAnswer.length < 1) return;
    se.cancel2.currentTime = 0;
    se.cancel2.play();
    myAnswer = myAnswer.substring(0, myAnswer.length - 1);
    myAnserWrite();
  }

  function textClear() {
    if (!flag) return;
    if (myAnswer.length < 1) return;
    se.cancel.currentTime = 0;
    se.cancel.play();
    myAnswer = "";
    myAnserWrite();
  }

  function question() {
    se.set.currentTime = 0;
    se.set.play();
    flag = true;
    if (mode === 1) index = Math.floor(Math.random() * 36);
    if (mode === 2) index = Math.floor(Math.random() * 29 + 36);
    if (mode === 3) index = Math.floor(Math.random() * data.length);
    text_box1.style.color = "black";
    text_box1.innerHTML = data[index].word;
    myAnswer = "";
    myAnserWrite();
  }

  function showAnswer() {
    if (!flag) return;
    se.seikai2.currentTime = 0;
    se.seikai2.play();
    let answers = data[index].ans_1;
    if (data[index].ans_2) answers = answers + "," + data[index].ans_2;
    if (data[index].ans_3) answers = answers + "," + data[index].ans_3;
    if (data[index].ans_4) answers = answers + "," + data[index].ans_4;
    myAnswer = answers;
    myAnserWrite();
  }

  function checkAnswer() {
    if (!flag) return;
    const answer = myAnswer.toLowerCase();
    if (data[index].ans_1 == answer || data[index].ans_2 == answer || data[index].ans_3 == answer || data[index].ans_4 == answer) sendRight();
  }

  function myAnserWrite() {
    text_box2.innerHTML = myAnswer;
  }

  function sendRight() {
    flag = false;
    text_box1.innerHTML = "せいかい！";
    text_box1.style.color = "red";
    score++;
    scoreWrite();
    se.seikai1.currentTime = 0;
    se.seikai1.play();
  }

  function scoreWrite() {
    const img = document.createElement("img");
    img.src = "./image/coin.png";
    img.style.width="30px"
    img.style.height="30px"
    scorePallet.appendChild(img);
  }
}
