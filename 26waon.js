export function waon() {
  document.getElementById("content").innerHTML = `
  <main role="main" class="container ">
  <div id="piano" class="d-flex justify-content-center">
    tempo=<span id="range">84　</span>
    <input type="range" value="84" max="300" min="10" step="1" id="tempo" style="max-width:100%;width:600px;cursor: pointer;">
  </div>
  <div class="mt-3 text-center">ハ長調でよく使われる和音</div>
  <div id="piano" class="d-flex justify-content-center">
  <table id="TBL" class="table">
  </table>
  <button id="Key_none" class="btn btn-danger">とめる</button>
  </div>
  <div class="mb-3 text-center">イ短調でよく使われる和音</div>
</main>
  `;

  //和音
  var C_chord = ["C3", "C4", "E4", "G4"];
  var F_chord = ["F2", "C4", "F4", "A4"];
  var G_chord = ["G2", "B3", "D4", "G4"];
  var G7_chord = ["G2", "B3", "F4", "G4"];
  var Am_chord = ["A2", "C4", "E4", "A4"];
  var Dm_chord = ["D2", "D3", "F4", "A4"];
  var E_chord = ["E3", "B3", "E4", "G#4"];
  var E7_chord = ["E3", "D4", "E4", "G#4"];
  var stop_chord = ["", "", "", ""];

  //シンセ生成
  var synth = new Tone.PolySynth().toMaster();
  Tone.Transport.bpm.value = 84;

  document.getElementById("tempo").addEventListener("input", () => {
    Tone.Transport.bpm.value = tempo.value;
    document.getElementById("range").innerText = tempo.value + "　";
  });

  const Key = ["C", "F", "G", "G7", "Am", "Dm", "E", "E7", "none"];
  const Chord = [C_chord, F_chord, G_chord, G7_chord, Am_chord, Dm_chord, E_chord, E7_chord, stop_chord];
  const yobina = ["１度", "４度", "５度", "５度の７", "１度", "４度", "５度", "５度の７"];

  for (let i = 0; i < 4; i++) {
    const tr = document.createElement("tr");
    if (i == 0 || i == 2) {
      for (let j = 0; j < 4; j++) {
        const td = document.createElement("td");
        const img = document.createElement("img");
        img.src = "./image/chord_" + Key[(i / 2) * 4 + j] + ".png";
        td.appendChild(img);
        tr.appendChild(td);
      }
    } else if (i == 1 || i == 3) {
      for (let j = 0; j < 4; j++) {
        const td = document.createElement("td");
        const div = document.createElement("div");
        td.style.width = "200px";
        div.style.width = "200px";
        div.style.backgroundColor = "#fff";
        td.style.border = "1px solid #333";
        div.style.textAlign = "center";
        div.style.cursor = "pointer";
        div.style.height = "50px";
        div.style.borderRadius = "0";
        div.innerText = yobina[((i - 1) / 2) * 4 + j] + "の和音";
        div.addEventListener("click", () => {
          synth.triggerAttackRelease(Chord[((i - 1) / 2) * 4 + j], "1n");
        });
        td.appendChild(div);
        tr.appendChild(td);
      }
    }
    document.getElementById("TBL").appendChild(tr);
  }
  document.getElementById("Key_none").addEventListener("click", () => {
    synth.triggerAttackRelease(Chord[8], "16n");
  });
}
