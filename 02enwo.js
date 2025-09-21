export function enwo() {
  //データの登録
  const Data_title = ["Numbers", "Upper", "Lower", "Colors", "Condition", "Body", "Janken", "Animals", "Furuts", "Vegetables", "Things", "Sports", "Foods", "Weeks", "Month"];
  const Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const Upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "L", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const Lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const Stats = ["fine", "happy", "hungry", "sad", "sleepy", "tired"];
  const Body = ["head", "shoulders", "knees", "toes", "eyes", "ears", "mouth", "nose"];
  const Janken = ["rock", "scissors", "paper"];
  const Colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "black", "white"];
  const Animals = [
    "dog",
    "cat",
    "bear",
    "bird",
    "duck",
    "horse",
    "frog",
    "sheep",
    "goldfish",
    "monkey",
    "gorilla",
    "fish",
    "pig",
    "rabbit",
    "panda",
    "mouse",
    "spider",
    "cow",
    "dragon",
    "snake",
    "tiger",
    "chicken",
    "wild boar",
  ];
  const Furuts = ["apple", "banana", "lemon", "melon", "orange", "peach", "strawberry", "grapes", "pineapple", "kiwifruit"];
  const Vegetables = ["broccoli", "cabbage", "carrot", "corn", "cucumber", "green pepper", "lettuce", "onion", "pumpkin", "tomato"];
  const Things = [
    "counter",
    "ball",
    "pencil",
    "eraser",
    "ruler",
    "crayon",
    "hat",
    "ink",
    "jet",
    "king",
    "drum",
    "book",
    "notebook",
    "queen",
    "sun",
    "tree",
    "umbrella",
    "violin",
    "watch",
    "box",
    "yacht",
    "bus",
    "flower",
    "shop",
    "balloon",
    "car",
  ];
  const Sports = ["soccer", "baseball", "basketball", "dodgeball", "swimming", "volleyball", "table tennis"];
  const Foods = ["ice cream", "pudding", "milk", "orange juice", "hamburger", "pizza", "spaghetti", "steak", "salad", "cake", "noodle", "egg", "rice ball", "jam", "candy"];
  const Weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //データを１つにまとめてデータ集とする。
  let Data = [];
  Data = Data.concat(Numbers, Upper, Lower, Colors, Stats, Body, Janken, Animals, Furuts, Vegetables, Things, Sports, Foods, Weeks, Month);
  const Data_len = [31, 26, 26, 10, 6, 8, 3, 23, 10, 10, 26, 7, 15, 7, 12];
  //データの読み込み　ここまで

  //15つのパートのインデックス
  var index = 0;

  //15つのパートに分けて表示
  for (let i = 0; i < 15; i++) {
    const div = document.createElement("div");
    div.classList.add("h4");
    div.innerHTML = Data_title[i];
    content.appendChild(div);
    var len = Data_len[i];

    //各ボタンに名前とボイスを登録
    for (let j = index; j < index + len; j++) {
      let data = String(Data[j]);
      //ボタンの作成
      const button = document.createElement("button");
      button.classList.add("btn", "btn-words", "btn-primary");
      //ボイスの登録
      const se = new Howl({
        //読み込む音声ファイル
        src: ["voice/" + data.toLowerCase() + ".mp3"],
        // 設定 (以下はデフォルト値です)
        preload: true, // 事前ロード
        volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
        loop: false, // ループ再生するか
        autoplay: false, // 自動再生するか
        // 読み込み完了時に実行する処理
        onload: () => {
          button.removeAttribute("disabled"); // ボタンを使用可能にする
        },
      });
      //ボタンへのボイスの登録
      button.addEventListener("click", () => {
        se.seek(0);
        se.play();
      });
      //名称をつけるdivの作成とボタンへの関連づけ
      const div = document.createElement("div");
      div.innerHTML = Data[j];
      button.appendChild(div);

      if (i == 3) {
        button.style.backgroundColor = Data[j];
        if (j == index + 2 || j == index + 6 || j == index + 9) button.style.color = "black";
      }
      //条件によって画像の作成・関連づけ
      if (i > 3) {
        const img = document.createElement("img");
        img.setAttribute("src", "image/" + data.toLowerCase() + ".png");
        button.appendChild(img);
        if (i == 14) {
          img.style.height = "40px";
        }
      }
      content.appendChild(button);
    }
    index = index + len;
    //水平線の挿入
    const hr = document.createElement("hr");
    content.appendChild(hr);
  }
}
