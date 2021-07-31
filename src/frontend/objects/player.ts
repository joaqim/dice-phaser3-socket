interface IDicePair {
  dice1: number;
  dice2: number;
}

const randRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

const diceRoll = (): number[] => [randRange(1, 6), randRange(1, 6)];

export default class Player extends Phaser.Physics.Matter.Sprite {
  socketId: string;
  loginTime: number;
  dice: number[] = [];

  rollDice = false;
  diceResult: IDicePair | undefined;

  constructor(scene: Phaser.Scene, data) {
    super(scene.matter.world, data.x, data.y, "dice");
    scene.add.existing(this);
    this.socketId = data.socketId;
    this.angle = data.angle;
    this.setBounce(0.7);
    this.setScale(0.5);
    this.setTint(data.color);
    this.setFriction(0.9);
    this.loginTime = data.loginTime;
    this.diceResult = data.diceResult;
  }

  get dice1(): number {
    return this.dice[0];
  }
  get dice2(): number {
    return this.dice[1];
  }
  diceTotal(): number {
    return this.dice1 + this.dice2;
  }
  getDiceString(): string {
    return this.dice.length == 2
      ? `${this.dice1.toString()} + ${this.dice2.toString()} = ${this.diceTotal()}`
      : "";
  }
}
