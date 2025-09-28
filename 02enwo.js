function createAudioSources(Data) {
  const promises = [];
  const audioSources = {};

  // 全音声ファイルを並列で読み込み
  for (let i = 0; i < Data.length; i++) {
    const filename = String(Data[i]).toLowerCase();
    promises.push(new Promise((resolve) => {
      audioSources[i] = new Howl({
        src: ["voice/" + filename + ".mp3"],
        preload: true,
        volume: 1.0,
        loop: false,
        autoplay: false,
        onload: () => {
          console.log(`音声ファイル ${filename} 読み込み完了`);
          resolve();
        },
        onloaderror: (id, error) => {
          console.warn(`音声ファイル ${filename} 読み込みエラー:`, error);
          resolve(); // エラーでも続行
        }
      });
    }));
  }

  return { audioSources, loadPromise: Promise.all(promises) };
}

// 画像は必要な時に読み込む（元の方式）

export async function enwo() {
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

  // 音声ファイルを並列で読み込み開始
  const { audioSources, loadPromise } = createAudioSources(Data);

  // 読み込み中表示の作成
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading-display");
  loadingDiv.style.textAlign = "center";
  loadingDiv.style.padding = "20px";
  loadingDiv.style.fontSize = "16px";
  loadingDiv.style.color = "#666";
  loadingDiv.innerHTML = "音声ファイルを読み込み中です...<br><small>しばらくお待ちください</small>";
  content.appendChild(loadingDiv);

  //15つのパートのインデックス
  var index = 0;

  // 全てのボタンを無効化状態で作成
  const allButtons = [];

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
      button.disabled = true; // 音声読み込み完了まで無効化

      //ボタンへのボイスの登録 - 並列読み込みした音声を使用
      button.addEventListener("click", () => {
        if (audioSources[j]) {
          audioSources[j].seek(0);
          audioSources[j].play();
        }
      });

      //名称をつけるdivの作成とボタンへの関連づけ
      const div = document.createElement("div");
      div.innerHTML = Data[j];
      button.appendChild(div);

      if (i == 3) {
        button.style.backgroundColor = Data[j];
        if (j == index + 2 || j == index + 6 || j == index + 9) button.style.color = "black";
      }
      //条件によって画像の作成・関連づけ（元の方式：必要な時に読み込み）
      if (i > 3) {
        const img = document.createElement("img");
        img.setAttribute("src", "image/" + data.toLowerCase() + ".png");
        button.appendChild(img);
        if (i == 14) {
          img.style.height = "40px";
        }
      }
      content.appendChild(button);
      allButtons.push(button);
    }
    index = index + len;
    //水平線の挿入
    const hr = document.createElement("hr");
    content.appendChild(hr);
  }

  // 音声読み込み完了後にボタンを有効化（画像は個別読み込み）
  try {
    await loadPromise;
    console.log("全音声ファイルの読み込み完了");

    // 読み込み中表示を削除
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }

    allButtons.forEach(button => {
      button.disabled = false;
    });
  } catch (error) {
    console.error("音声読み込みエラー:", error);

    // 読み込み中表示を削除
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }

    // エラーが発生してもボタンは有効化
    allButtons.forEach(button => {
      button.disabled = false;
    });
  }
}
