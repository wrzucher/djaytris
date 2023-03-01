import BreakWallObject from './BreakWallObject';
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
    this.GameField = new GameField(this, spriteSize, filed_max_y, filed_max_x);
    this.Player1 = new Tank(this, 3 * this.spriteSize, 3 * this.spriteSize);
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

  public canMove(newX1: number, newY1: number, size: number): boolean
  {
    if (newX1 <= 0) {
      return false;
    }

    if (newY1 <= 0) {
      return false;
    }

    if (newX1 >= this.GameField.filedMaxXx) {
      return false;
    }

    if (newY1 >= this.GameField.filedMaxYy) {
      return false;
    }

    let newX_01 = newX1 + size;
    let newY_01 = newY1 + size;

    let found = this.GameField.gameField.filter((_) => _.X1 <= newX_01 && _.X2 >= newX1 && _.Y1 <= newY_01 && _.Y2 >= newY1);
    if (found && found.length > 0)
    {
      found[0].interaction();
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

  public breakTheWall(wall: BreakWallObject)
  {
    this.GameField.gameField = this.GameField.gameField.filter((_) => _ != wall);
  }

  public stopExplosion()
  {
    this.ExplosionObject1 = undefined;
  }
}

export default TanksGame;