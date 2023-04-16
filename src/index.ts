import Game from "./game";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
const game = new Game(canvas);

let previousTime;

function gameLoop(time: number) {
  if (previousTime == undefined) {
    previousTime = time;
    requestAnimationFrame(gameLoop);
    return;
  }

  const delta = (time - previousTime) / 1000;
  previousTime = time;

  game.update(delta);
  game.render(canvas, ctx);

  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", function () {
  gameLoop(0);
});

document.getElementById("shuffle-button")!.onclick = function () {
  const shuffleInput = document.getElementById(
    "shuffle-input"
  ) as HTMLInputElement;

  game.shuffle(parseInt(shuffleInput.value));
};
