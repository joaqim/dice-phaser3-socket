import io from "socket.io-client";
import Player from "../objects/player";
//import Ball from '../objects/ball'

//const DEFAULT_WIDTH = 1024;
//const DEFAULT_HEIGHT = 800;
const DEFAULT_WIDTH = 768;
const DEFAULT_HEIGHT = 1024;

interface IDicePair {
  dice1: number;
  dice2: number;
}

interface UserData {
  socketId: string;
  loginTime: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  color: string;

  dice: number[];

  diceResult: IDicePair | undefined;
}

const diceLabel = (
  scene: Phaser.Scene,
  label: Phaser.GameObjects.Text | undefined,
  x,
  y,
  dices: IDicePair
): Phaser.GameObjects.Text => {
  if (!label) {
    label = scene.add
      .text(0, 0, "", {
        fontFamily: "Helvetica",
        fontSize: "22",
        color: "#000",
      })
      .setFontSize(42)
      .setOrigin(0.5, 0.5);
  }
  label.text = `${dices.dice1 + dices.dice2}`;
  label.x = x;
  label.y = y;
  //label.x = x - label.getBounds().width / 2;
  //label.y = y - label.getBounds().height / 2;
  return label;
};

export default class MainScene extends Phaser.Scene {
  firstHi = false;
  playersConnectedText: Phaser.GameObjects.Text;
  player: Player;
  socket: SocketIOClient.Socket;
  opponents: Player[] = [];

  playerLabel: Phaser.GameObjects.Text;
  playerDiceLabel: Phaser.GameObjects.Text;

  diceLabels = new Map<string, Phaser.GameObjects.Text>();

  diceResults = new Map<string, IDicePair>();

  constructor() {
    super("MainScene");
  }

  init(data: any) {}
  preload() {
    this.load.image("square", "assets/square.png");
    this.load.image("circle", "assets/circle.png");

    this.load.image("dice", "assets/dice_empty.png");
    /*
    this.load.spritesheet("dice", "assets/dice.png", {
      frameWidth: 128,
    });
    */
  }

  create() {
    this.add
      .text(500, 300, "Klicka för\natt slå\nTärningen", {
        fontSize: "40px",
      })
      .setOrigin(0.5, 1.25)
      .setAlign("left");

    this.playerLabel = this.add
      .text(-50, -50, "Din tärning")
      .setOrigin(0.5, 3.7);

    this.playersConnectedText = this.add.text(20, 20, "");
    this.matter.world.setBounds(
      0,
      0,
      DEFAULT_WIDTH,
      DEFAULT_HEIGHT - 50,
      50,
      true,
      true,
      true,
      true
    );

    this.socket = io();
    this.socket.on("first hi", (data: UserData, opponentData: UserData[]) => {
      if (this.firstHi != true) {
        this.firstHi = true;
        this.player = new Player(this, data);
        opponentData.forEach((o) => {
          let opponent = new Player(this, o);
          this.opponents.push(opponent);
        });
        this.time.addEvent({
          delay: 1000 / 60,
          loop: true,
          callback: this.updateState(),
          callbackScope: this,
        });
      }
    });

    this.socket.on("add opponent", (data: UserData) => {
      let opponent = new Player(this, data);
      this.opponents.push(opponent);
      if (data.diceResult) this.diceResults.set(data.socketId, data.diceResult);
    });

    this.socket.on(
      "update dice",
      (data: { socketId: string }, diceResult: IDicePair) => {
        console.log(this.diceResults);
        this.diceResults.set(data.socketId, diceResult);
      }
    );

    this.socket.on("remove player", (pSocket) => {
      let o: Player[] = this.opponents.filter((player: Player) => {
        return player.socketId == pSocket;
      });
      if (o && o[0]) {
        let p = o[0];
        this.opponents.splice(this.opponents.indexOf(p, 1));
        this.diceResults.delete(p.socketId);
        p.destroy();
      }
    });
    this.socket.on("update all", (data: any[]) => {
      data.forEach((p) => {
        let o: Player[] = this.opponents.filter((player: Player) => {
          return player.socketId == p.socketId;
        });
        if (o && o[0] && o[0].socketId != this.player.socketId) {
          let opponent = o[0];
          opponent.x = p.x;
          opponent.y = p.y;
          opponent.setVelocityX(p.vx);
          opponent.setVelocityY(p.vY);
          opponent.angle = p.angle;
          let dices = this.diceResults.get(opponent.socketId);
          opponent.diceResult = dices;

          if (dices) {
            let label = this.diceLabels.get(opponent.socketId);
            this.diceLabels.set(
              opponent.socketId,
              diceLabel(this, label, p.x, p.y, dices)
            );
          }
        }
      });
    });

    this.socket.emit("ready");
    this.input.on("pointerdown", () => {
      if (this.player.y > 700) {
        let data = { socketId: this.player.socketId };
        this.socket.emit("player roll dice", data);

        const force_multiplier = 3.5;
        this.player.applyForce(
          new Phaser.Math.Vector2(
            (0.025 - 0.05 * Math.random()) * force_multiplier,
            (-0.05 - 0.125 * Math.random()) * force_multiplier
          )
        );
      }
    });
  }

  update() {
    if (this.player) {
      this.playerLabel.x = this.player.x;
      this.playerLabel.y = this.player.y; // - 40;
      let dices = this.diceResults.get(this.player.socketId);
      if (dices) {
        this.playerDiceLabel = diceLabel(
          this,
          this.playerDiceLabel,
          this.player.x,
          this.player.y,
          dices
        );
        /*
        this.playerDiceLabel.text = `${dices.dice1 + dices.dice2}`;
        this.playerDiceLabel.x =
          this.player.x - (this.player.getDiceString().length * 10) / 2;
        this.playerDiceLabel.y = this.player.y - 60;
        */
      }
    }
  }

  updateState() {
    let oldX = 0;
    let oldY = 0;
    let oldAngle = 0;

    //send a position update only if position is changed
    return () => {
      this.playersConnectedText.setText(
        "clients connected: " + (this.opponents.length + 1).toString()
      );

      if (
        this.player &&
        (Math.abs(this.player.x - oldX) > 2 ||
          Math.abs(this.player.y - oldY) > 2)
        /* || Math.abs(this.player.angle - oldAngle) > 1*/
      ) {
        let data = {
          socketId: this.socket.id,
          x: this.player.x,
          y: this.player.y,
          vx: this.player.body.velocity.x,
          vy: this.player.body.velocity.x,
          angle: this.player.angle,
        };
        this.socket.emit("player update", data);
        oldX = this.player.x;
        oldY = this.player.y;
        oldAngle = this.player.angle;
      }
    };
  }
}
