import * as se from "./se.js";

export function kuku() {
  document.getElementById("content").innerHTML = `
    <select id="dan_menu"></select>  
    <select id="dan_type"></select> 
    <button class="btn btn-primary" id="set">セット</button> 
    <button class="btn btn-success" id="next">つぎ</button> 
    <div class="YOMI">
      <div id="yomi"></div>
      <div id="yomi_kotae"></div>
    </div>
    <div class="SHIKI">
      <div id="shiki"></div>
      <div id="shiki_kotae"></div>
    </div>
    <form>
      <label class="m-2" style="cursor:pointer;font-size:30px;">
        <input style="width:30px;height:30px;" type="checkbox" id="yomi_hide" /> よみをかくす。
      </label>
    </form>
  `;

  const kukua = [
    "いんいち　が",
    "いんに　が",
    "いんさん　が",
    "いんし　が",
    "いんご　が",
    "いんろく　が",
    "いんしち　が",
    "いんはち　が",
    "いんく　が",
    "にいち　が",
    "ににん　が",
    "にさん　が",
    "にし　が",
    "にご",
    "にろく",
    "にしち",
    "にはち（には）",
    "にく",
    "さんいち　が",
    "さんに　が",
    "さざん　が",
    "さんし",
    "さんご",
    "さぶろく",
    "さんしち",
    "さんぱ",
    "さんく",
    "しいち　が",
    "しに　が",
    "しさん",
    "しし",
    "しご",
    "しろく",
    "ししち",
    "しは（しわ）",
    "しく",
    "ごいち　が",
    "ごに",
    "ごさん",
    "ごし",
    "ごご",
    "ごろく",
    "ごしち",
    "ごはち",
    "ごっく",
    "ろくいち　が",
    "ろくに",
    "ろくさん",
    "ろくし",
    "ろくご",
    "ろくろく",
    "ろくしち",
    "ろくは",
    "ろっく",
    "しちいち　が",
    "しちに",
    "しちさん",
    "しちし",
    "しちご",
    "しちろく",
    "しちしち",
    "しちは",
    "しちく",
    "はちいち　が",
    "はちに",
    "はちさん（はっさん）",
    "はちし（はっし）",
    "はちご",
    "はちろく",
    "はちしち",
    "はっぱ",
    "はっく",
    "くいち　が",
    "くに",
    "くさん",
    "くし",
    "くご",
    "くろく",
    "くしち",
    "くはち",
    "くく",
  ];
  const kukub = [
    "いち",
    "に",
    "さん",
    "し",
    "ご",
    "ろく",
    "しち",
    "はち",
    "く",
    "に",
    "し",
    "ろく",
    "はち",
    "じゅう",
    "じゅうに",
    "じゅうし",
    "じゅうろく",
    "じゅうはち",
    "さん",
    "ろく",
    "く",
    "じゅうに",
    "じゅうご",
    "じゅうはち",
    "にじゅういち",
    "にじゅうし",
    "にじゅうしち",
    "し",
    "はち",
    "じゅうに",
    "じゅうろく",
    "にじゅう",
    "にじゅうし",
    "にじゅうはち",
    "さんじゅうに",
    "さんじゅうろく",
    "ご",
    "じゅう",
    "じゅうご",
    "にじゅう",
    "にじゅうご",
    "さんじゅう",
    "さんじゅうご",
    "しじゅう",
    "しじゅうご",
    "ろく",
    "じゅうに",
    "じゅうはち",
    "にじゅうし",
    "さんじゅう",
    "さんじゅうろく",
    "しじゅうに",
    "しじゅうはち",
    "ごじゅうし",
    "しち",
    "じゅうし",
    "にじゅういち",
    "にじゅうはち",
    "さんじゅうご",
    "しじゅうに",
    "しじゅうく",
    "ごじゅうろく",
    "ろくじゅうさん",
    "はち",
    "じゅうろく",
    "にじゅうし",
    "さんじゅうに",
    "しじゅう",
    "しじゅうはち",
    "ごじゅうろく",
    "ろくじゅうし",
    "しちじゅうに",
    "く",
    "じゅうはち",
    "にじゅうしち",
    "さんじゅうろく",
    "しじゅうご",
    "ごじゅうし",
    "ろくじゅうさん",
    "しちじゅうに",
    "はちじゅういち",
  ];

  const type_data = ["上がり九九", "下がり九九", "ばらばら"];
  const dan_menu = document.getElementById("dan_menu");
  const set = document.getElementById("set");
  const next = document.getElementById("next");
  const yomi = document.getElementById("yomi");
  const yomi_kotae = document.getElementById("yomi_kotae");
  const yomi_hide = document.getElementById("yomi_hide");
  const shiki = document.getElementById("shiki");
  const shiki_kotae = document.getElementById("shiki_kotae");

  for (let i = 1; i <= 9; i++) {
    const dan = document.createElement("option");
    dan.value = i;
    dan.textContent = i + "のだん";
    dan_menu.appendChild(dan);
  }

  for (let i = 1; i <= 3; i++) {
    const type = document.createElement("option");
    type.value = i;
    type.textContent = type_data[i - 1];
    dan_type.appendChild(type);
  }

  set.addEventListener("click", () => {
    se.set.currentTime = 0;
    se.set.play();
    var num = 0;
    //テキストクリア
    yomi.innerHTML = dan_menu.value + "のだんの";
    yomi_kotae.innerHTML = "れんしゅう";
    shiki.innerHTML = "";
    shiki_kotae.innerHTML = "";

    // かけられる数のセット
    var hijousu = dan_menu.value;
    // かける数のセット
    var jousu = [];
    switch (dan_type.value) {
      case "1":
        jousu = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        break;
      case "2":
        jousu = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        break;
      case "3":
        const bara = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let index = 0; index < 9; index++) {
          jousu.push(...bara.splice(Math.floor(Math.random() * bara.length), 1));
        }
        break;
    }


    yomi_hide.addEventListener("change", () => {
      se.set.currentTime = 0;
      se.set.play();
    })

    next.addEventListener("click", () => {
      num++;
      se.pi.currentTime = 0;
      se.pi.play();
      switch (num % 2) {
        case 1:
          if (!yomi_hide.checked) {
            yomi.innerHTML = kukua[(hijousu - 1) * 9 + jousu[parseInt(num / 2)] - 1] + "　　";
          } else {
            yomi.innerHTML = "";
          }
          yomi_kotae.innerHTML = "";
          shiki.innerHTML = hijousu + "×" + jousu[parseInt(num / 2)] + "＝";
          shiki_kotae.innerHTML = "？";
          break;
        case 0:
          if (!yomi_hide.checked) {
            yomi.innerHTML = kukua[(hijousu - 1) * 9 + jousu[parseInt(num / 2 - 1)] - 1] + "　　";
            yomi_kotae.innerHTML = kukub[(hijousu - 1) * 9 + jousu[parseInt(num / 2 - 1)] - 1];
          } else {
            yomi.innerHTML = "";
            yomi_kotae.innerHTML = "";
          }
          shiki.innerHTML = hijousu + "×" + jousu[parseInt(num / 2 - 1)] + "＝";
          shiki_kotae.innerHTML = hijousu * jousu[parseInt(num / 2 - 1)];
          break;
      }
      if (num > 17) num = 0;
    });
  });
}
