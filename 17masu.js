import * as se from "./se.js";

export function masu() {
  let tate_masu = 10;
  let yoko_masu = 18;
  let line_thickness = "0.7vw";
  let div_color = "red";

  const Colors = [
    "red",
    "あか",
    "black",
    "くろ",
    "yellow",
    "きいろ",
    "blue",
    "あお",
    "orange",
    "オレンジ",
    "white",
    "しろ",
    "green",
    "みどり",
    "purple",
    "むらさき",
    "pink",
    "ピンク",
    "brown",
    "ちゃいろ",
  ];

  document.getElementById("content").innerHTML = `
  <select id="masu_type"></select>  
  <select id="color_val"></select>  
  <button  id="reset_btn" class="btn btn-danger">リセット</button> 
  <div id="kei_sen">
  </div>
`;

  for (let i = 1; i <= 2; i++) {
    const Type = document.createElement("option");
    Type.value = i;
    if (i == 1) Type.textContent = "せんをひく";
    else if (i == 2) Type.textContent = "ますをぬる";
    masu_type.appendChild(Type);
  }
  for (let i = 1; i <= 10; i++) {
    const Color = document.createElement("option");
    Color.value = i;
    Color.textContent = Colors[i * 2 - 1];
    color_val.appendChild(Color);
  }

  document.getElementById("color_val").addEventListener("change", () => {
    div_color = Colors[color_val.value * 2 - 2];
    se.set.currentTime = 0;
    se.set.play();
  });
  document.getElementById("masu_type").addEventListener("change", () => {
    se.set.currentTime = 0;
    se.set.play();
  });

  document.getElementById("reset_btn").addEventListener("click", () => {
    se.set.currentTime = 0;
    se.set.play();
    var result = window.confirm("ぬった　いろを　もとに　もどしますか？");
    if (result === true) {
      se.reset.currentTime = 0;
      se.reset.play();
      var ele = document.getElementById("kei_sen");
      while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
      }
      masu_write();
    }
  });

  const Width = [`calc(5vw - ${line_thickness})`, line_thickness, `calc(5vw - ${line_thickness})`];
  const Left = ["calc(20px)", `calc(20px - ${line_thickness})`, "calc(20px)"];
  const Height = [line_thickness, "4vw", "4vw"];
  const Top = ["calc(180px)", `calc(180px + ${line_thickness})`, `calc(180px + ${line_thickness})`];
  const B_color = ["lightblue", "lightblue", "white"];

  masu_write();

  function masu_write() {
    for (let h = 0; h < 3; h++) {
      for (let i = 0; i <= tate_masu; i++) {
        for (let j = 0; j <= yoko_masu; j++) {
          if ((h == 2 || h == 0) && j == yoko_masu) continue;
          if ((h == 2 || h == 1) && i == tate_masu) continue;
          const div = document.createElement("div");
          let flag = false;
          div.setAttribute("style", "position: fixed;");
          div.style.width = Width[h];
          div.style.height = Height[h];
          div.style.backgroundColor = B_color[h];
          div.style.top = `calc(${i * 5}vw + ${Top[h]} )`;
          div.style.left = `calc(${j * 5}vw + ${Left[h]})`;
          div.addEventListener("click", () => {
            se.pi.currentTime = 0;
            se.pi.play();
            if (h < 2) {
              div.style.cursor = "pointer";
              if ((masu_type.value == "1" && flag === false) || (masu_type.value == "1" && flag === true && div.style.backgroundColor != div_color)) {
                div.style.backgroundColor = div_color;
                flag = true;
              } else if (masu_type.value == "1" && flag === true && div.style.backgroundColor == div_color) {
                div.style.backgroundColor = B_color[h];
                flag = false;
              }
            } else if (h == 2) {
              if ((masu_type.value == "2" && flag === false) || (masu_type.value == "2" && flag === true && div.style.backgroundColor != div_color)) {
                div.style.backgroundColor = div_color;
                flag = true;
              } else if (masu_type.value == "2" && flag === true && div.style.backgroundColor == div_color) {
                div.style.backgroundColor = B_color[h];
                flag = false;
              }
            }
          });
          kei_sen.appendChild(div);
        }
      }
    }
  }
}
