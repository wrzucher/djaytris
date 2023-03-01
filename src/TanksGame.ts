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

  public Tic()
  {
    if (this.Fire1)
    {
      this.Fire1.Tic();
    }

    if (this.ExplosionObject1)
    {
      this.ExplosionObject1.Tic();
    }
  }

  public MoveLeft() {
    this.Player1.MoveLeft();
  }

  public Fire() {
    if (this.Fire1)
    {
      return;
    }

    this.Fire1 = new FireObject(this, this.Player1.AbsYy, this.Player1.AbsXx, this.Player1.Direction, this.Player1.spriteSize);
  }

  public MoveRight() {
    this.Player1.MoveRight();
  }

  public MoveUp() {
    this.Player1.MoveUp();
  }

  public MoveDown() {
    this.Player1.MoveDown();
  }

  public canMove(new_xx: number, new_yy: number, size: number): boolean
  {
    if (new_xx <= 0) {
      return false;
    }

    if (new_yy <= 0) {
      return false;
    }

    if (new_xx >= this.GameField.filed_max_xx) {
      return false;
    }

    if (new_yy >= this.GameField.filed_max_yy) {
      return false;
    }

    let new_x = Math.floor(new_xx / this.spriteSize);
    let new_y = Math.floor(new_yy / this.spriteSize);
    if (this.GameField.GameField[new_y][new_x] !== Enums.GameBlockType.Ground)
    {
      return false;
    }

    new_x = Math.floor((new_xx + size) / this.spriteSize);
    new_y = Math.floor(new_yy / this.spriteSize);
    if (this.GameField.GameField[new_y][new_x] !== Enums.GameBlockType.Ground)
    {
      return false;
    }

    new_x = Math.floor(new_xx / this.spriteSize);
    new_y = Math.floor((new_yy  + size) / this.spriteSize);
    if (this.GameField.GameField[new_y][new_x] !== Enums.GameBlockType.Ground)
    {
      return false;
    }

    new_x = Math.floor((new_xx + size) / this.spriteSize);
    new_y = Math.floor((new_yy + size) / this.spriteSize);
    if (this.GameField.GameField[new_y][new_x] !== Enums.GameBlockType.Ground)
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