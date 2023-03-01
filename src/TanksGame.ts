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

    this.Fire1 = new FireObject(this, this.Player1.AbsYy, this.Player1.AbsXx, this.Player1.Direction, this.Player1.spriteSize);
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

    let newX = Math.floor(newXx / this.spriteSize);
    let newY = Math.floor(newYy / this.spriteSize);
    if (this.GameField.GameField[newY][newX] !== Enums.GameObjectType.Ground)
    {
      return false;
    }

    newX = Math.floor((newXx + size) / this.spriteSize);
    newY = Math.floor(newYy / this.spriteSize);
    if (this.GameField.GameField[newY][newX] !== Enums.GameObjectType.Ground)
    {
      return false;
    }

    newX = Math.floor(newXx / this.spriteSize);
    newY = Math.floor((newYy  + size) / this.spriteSize);
    if (this.GameField.GameField[newY][newX] !== Enums.GameObjectType.Ground)
    {
      return false;
    }

    newX = Math.floor((newXx + size) / this.spriteSize);
    newY = Math.floor((newYy + size) / this.spriteSize);
    if (this.GameField.GameField[newY][newX] !== Enums.GameObjectType.Ground)
    {
      return false;
    }

    return true;
  }

  public stopFire()
  {
    if (this.Fire1)
    {
      this.ExplosionObject1 = new ExplosionObject(this, this.Fire1?.AbsXx, this.Fire1?.AbsYy);
    }

    this.Fire1 = undefined;
  }

  public stopExplosion()
  {
    this.ExplosionObject1 = undefined;
  }
}

export default TanksGame;