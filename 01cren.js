function createAudioSources() {
  const promises = [];
  const audioSources = {};

  // 全音声ファイルを並列で読み込み
  for (let i = 0; i < 37; i++) {
    promises.push(new Promise((resolve) => {
      audioSources[i] = new Howl({
        src: ["voice/vo_" + (i + 1) + ".mp3"],
        preload: true,
        volume: 1.0,
        loop: false,
        autoplay: false,
        onload: () => {
          console.log(`音声ファイル ${i + 1} 読み込み完了`);
          resolve();
        },
        onloaderror: (id, error) => {
          console.warn(`音声ファイル ${i + 1} 読み込みエラー:`, error);
          resolve(); // エラーでも続行
        }
      });
    }));
  }

  return { audioSources, loadPromise: Promise.all(promises) };
}

export async function cren() {
  const title = ["Greeting（あいさつ）", 7, "Date日付(ひづけ)　Weather 天気(てんき)", 7, "学習(がくしゅう)で使える表現①", 14, "学習(がくしゅう)で使える表現②", 9];
  const data = [
    // 0-6 Greeting（あいさつ）
    `"How are you?" 元気(げんき)ですか。`,
    `"I'm good." 元気です。`,
    `"I'm fine." 元気です。`,
    `"I'm OK." 元気です。`,
    `"I'm hungry." おなかがすきました。`,
    `"I'm sleepy." ねむたいです。`,
    `"I'm not bad." ふつうです。`,
    // 7-13 Date日付(ひづけ)   Weather 天気(てんき)
    `"What's the date?" 何日(なんにち)ですか。`,
    `"What day is it?" 何(なん)曜日(ようび)ですか。`,
    `"How's the weather today?" 今日(きょう)の天気(てんき)はどうですか。`,
    `"It's sunny." 晴(は)れです。`,
    `"It's cloudy." 曇(くも)りです。`,
    `"It's rainy." 雨(あめ)です。`,
    `"It's windy." 風(かぜ)が強(つよ)いです。`,
    // 14-27 学習(がくしゅう)で使える表現①
    `"Nice." （ほめる）`,
    `"Great."（ほめる）`,
    `"Cool." （ほめる）`,
    `"Wonderful."（ほめる）`,
    `"Wow!" （おどろき）`,
    `"Oh!" （おどろき）`,
    `"Good luck!" （はげまし）`,
    `"It's OK." （はげまし）`,
    `"I see." 相(あい)づち"`,
    `"Really?" 相(あい)づち"`,
    `"Well...." 相(あい)づち`,
    `"Me,too." 共感(きょうかん)`,
    `"Thank you." お礼(れい)`,
    `"You're welcome!" どういたしまして`,
    // 28-37 学習(がくしゅう)で使える表現②
    `One more time,please." もう一度(いちど)お願(ねが)いします。`,
    `May I ask a question?" 質問(しつもん)してもいいですか。`,
    `"Can you help me?" 手伝(てつだ)ってくれませんか。`,
    `"Excuse me." ちょっといいですか。`,
    `"Is this right?" これで合(あ)っていますか。`,
    `"How do you say "〇〇〇" in English?"
  「〇〇〇」は英語(えいご)で何(なん)と言(い)いますか。`,
    `"More　slowly,please." もっとゆっくりお願(ねが)いします。`,
    `"It's too easy." 簡単(かんたん)です。`,
    ` "It's too difficult." むずかしいです。`,
  ];

  // 音声ファイルを並列で読み込み開始
  const { audioSources, loadPromise } = createAudioSources();

  //４つのパートのインデックス
  var index = 0;

  // 全てのボタンを無効化状態で作成
  const allButtons = [];

  //４つのパートに分けて表示
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.classList.add("h4");
    div.innerHTML = title[i * 2];
    content.appendChild(div);
    var len = title[i * 2 + 1];

    //各ボタンに名前とボイスを登録
    for (let j = index; j < index + len; j++) {
      const button = document.createElement("button");
      button.innerHTML = data[j];
      button.classList.add("btn", "btn-eng", "btn-primary");
      button.disabled = true; // 音声読み込み完了まで無効化

      //ボタンへのボイスの登録 - 並列読み込みした音声を使用
      button.addEventListener("click", () => {
        if (audioSources[j]) {
          audioSources[j].seek(0);
          audioSources[j].play();
        }
      });

      content.appendChild(button);
      allButtons.push(button);
    }
    index = index + len;
    //水平線の挿入
    const hr = document.createElement("hr");
    content.appendChild(hr);
  }

  // 全音声読み込み完了後にボタンを有効化
  try {
    await loadPromise;
    console.log("全音声ファイルの読み込み完了");
    allButtons.forEach(button => {
      button.disabled = false;
    });
  } catch (error) {
    console.error("音声読み込みエラー:", error);
    // エラーが発生してもボタンは有効化
    allButtons.forEach(button => {
      button.disabled = false;
    });
  }
  // Classroom_Englishのコンテンツここまで。
  // ------------------------------
}
