import ExplosionObject from './ExplosionObject';
import FireObject from './FireObject';
import GameField from './GameField';
import Tank from './Tank';
import Enums from './TanksGameEnums';

class TanksGame{

  public readonly Player1: Tank;
  public Fire1?: FireObject;
  public ExplosionObject1?: ExplosionObject;
  
  public readonly GameField: GameField;

  private readonly spriteSize: number;

  constructor(spriteSize: number, filed_max_y: number, filed_max_x: number)
  {
    this.spriteSize = spriteSize;
    this.GameField = new GameField(spriteSize, filed_max_y, filed_max_x);
    this.Player1 = new Tank(this, 1 * this.spriteSize, 1 * this.spriteSize);
  }

  public tic()
  {
    if (this.Fire1)
    {
      this.Fire1.tic();
    }

    if (this.ExplosionObject1)
    {
      this.ExplosionObject1.tic();
    }
  }

  public moveLeft() {
    this.Player1.moveLeft();
  }

  public fire() {
    if (this.Fire1)
    {
      return;
    }

    this.Fire1 = new FireObject(this, this.Player1.Y1, this.Player1.X1, this.Player1.Direction, this.Player1.spriteSize);
  }

  public moveRight() {
    this.Player1.moveRight();
  }

  public moveUp() {
    this.Player1.moveUp();
  }

  public moveDown() {
    this.Player1.moveDown();
  }

  public canMove(newXx: number, newYy: number, size: number): boolean
  {
    if (newXx <= 0) {
      return false;
    }

    if (newYy <= 0) {
      return false;
    }

    if (newXx >= this.GameField.filedMaxXx) {
      return false;
    }

    if (newYy >= this.GameField.filedMaxYy) {
      return false;
    }

    let newX_00 = newXx;
    let newY_00 = newYy;

    let newX_01 = newXx + this.spriteSize;
    let newY_01 = newYy + this.spriteSize;

    let found = this.GameField.gameField.filter((_) => _.X1 >= newXx && _.X1 <= newX_01 && _.Y1 >= newYy && _.Y1 <= newY_01);
    if (found && found.length > 0)
    {
      return false;
    }

    return true;
  }

  public stopFire()
  {
    if (this.Fire1)
    {
      this.ExplosionObject1 = new ExplosionObject(this, this.Fire1?.X1, this.Fire1?.Y1);
    }

    this.Fire1 = undefined;
  }

  public stopExplosion()
  {
    this.ExplosionObject1 = undefined;
  }
}

export default TanksGame;