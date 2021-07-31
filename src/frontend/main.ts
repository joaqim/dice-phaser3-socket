import "phaser";
import MainScene from "./scenes/mainScene";

//const DEFAULT_WIDTH = 1024;
//const DEFAULT_HEIGHT = 800;
const DEFAULT_WIDTH = 768;
const DEFAULT_HEIGHT = 1024;

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: "#aaaaaa",
  scale: {
    parent: "phaser-game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [MainScene],
  physics: {
    default: "matter",
    arcade: {
      debug: true,
      gravity: { y: 100 },
    },
  },
};

function resize() {
  var canvas = document.querySelector("canvas");
  if (!canvas) return;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}

window.addEventListener("load", () => {
  let game = new Phaser.Game(config);
  resize();
  window.addEventListener("resize", resize, false);
});

//
