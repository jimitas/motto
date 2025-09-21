export function cren() {
  const title = ["Greeting（あいさつ）", 7, "Date日付(ひづけ)　Weather 天気(てんき)", 7, "学習(がくしゅう)で使える表現①", 14, "学習(がくしゅう)で使える表現②", 9];
  const data = [
    // 0-6 Greeting（あいさつ）
    `"How are you?" 元気(げんき)ですか。`,
    `"I’m good." 元気です。`,
    `"I’m fine." 元気です。`,
    `"I’m OK." 元気です。`,
    `"I’m hungry." おなかがすきました。`,
    `"I’m sleepy." ねむたいです。`,
    `"I’m not bad." ふつうです。`,
    // 7-13 Date日付(ひづけ)   Weather 天気(てんき)
    `"What’s the date?" 何日(なんにち)ですか。`,
    `"What day is it?" 何(なん)曜日(ようび)ですか。`,
    `"How’s the weather today?" 今日(きょう)の天気(てんき)はどうですか。`,
    `"It’s sunny." 晴(は)れです。`,
    `"It’s cloudy." 曇(くも)りです。`,
    `"It’s rainy." 雨(あめ)です。`,
    `"It’s windy." 風(かぜ)が強(つよ)いです。`,
    // 14-27 学習(がくしゅう)で使える表現①
    `"Nice." （ほめる）`,
    `"Great."（ほめる）`,
    `"Cool." （ほめる）`,
    `"Wonderful."（ほめる）`,
    `"Wow!" （おどろき）`,
    `"Oh!" （おどろき）`,
    `"Good luck!" （はげまし）`,
    `"It’s OK." （はげまし）`,
    `"I see." 相(あい)づち"`,
    `"Really?" 相(あい)づち"`,
    `"Well...." 相(あい)づち`,
    `"Me,too." 共感(きょうかん)`,
    `"Thank you." お礼(れい)`,
    `"You’re welcome!" どういたしまして`,
    // 28-37 学習(がくしゅう)で使える表現②
    `One more time,please." もう一度(いちど)お願(ねが)いします。`,
    `May I ask a question?" 質問(しつもん)してもいいですか。`,
    `"Can you help me?" 手伝(てつだ)ってくれませんか。`,
    `"Excuse me." ちょっといいですか。`,
    `"Is this right?" これで合(あ)っていますか。`,
    `"How do you say “〇〇〇” in English?"
  「〇〇〇」は英語(えいご)で何(なん)と言(い)いますか。`,
    `"More　slowly,please." もっとゆっくりお願(ねが)いします。`,
    `"It’s too easy." 簡単(かんたん)です。`,
    ` "It’s too difficult." むずかしいです。`,
  ];

  //４つのパートのインデックス
  var index = 0;
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

      //ボイスの登録
      const se = new Howl({
        //読み込む音声ファイル
        src: ["voice/vo_" + Math.floor(j + 1) + ".mp3"],

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

      content.appendChild(button);
    }
    index = index + len;
    //水平線の挿入
    const hr = document.createElement("hr");
    content.appendChild(hr);
  }
  // Classroom_Englishのコンテンツここまで。
  // ------------------------------
}
