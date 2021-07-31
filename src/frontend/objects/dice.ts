const randRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export default class Dice extends Phaser.Physics.Matter.Sprite {
  constructor(scene: Phaser.Scene, i: number) {
    super(scene.matter.world, 500, -50 * i, "circle");
    scene.add.existing(this);
    this.angle = Math.random() * 360;
    this.setBounce(1.7);
    this.setScale(0.1 + Math.random() * 0.4);
    this.setCircle((this.width * this.scale) / 2);
    let color = new Phaser.Display.Color();
    color.random(180);
    this.setTint(color.color);
    this.setFriction(0.9);
  }
  rollDice() {}
}
