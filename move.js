import * as se from "./se.js";

//ドラッグのみ
export function move(event) {
  const moveable = new Moveable(document.body, {
    target: document.querySelector(".target"),
    draggable: true,
    resizable: true,
    origin: false,
    throttleDrag: 0,
    throttleResize: 0,
    renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
    zoom: 0,
    padding: { left: 0, top: 0, right: 0, bottom: 0 },
  });

  const move_check = document.getElementById("move_check");
  if (move_check.checked == true) {
    moveable.draggable = true;
    moveable.zoom = 1;
  } else {
    moveable.draggable = false;
    moveable.zoom = 0;
  }
  move_check.addEventListener("click", () => {
    if (move_check.checked == true) {
      moveable.draggable = true;
      moveable.zoom = 1;
      se.set.currentTime = 0;
      se.set.play();
    } else {
      moveable.draggable = false;
      moveable.zoom = 0;
      se.move1.currentTime = 0;
      se.move1.play();
    }
  });

  moveable.on("drag", ({ target, transform }) => {
    target.style.transform = transform;
  });

  moveable.on("resize", (e) => {
    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
  });
}
