import Enums from './TanksGameEnums';

class GameField{

  public readonly GameField: Enums.GameBlockType[][];

  private readonly filed_max_x: number;
  private readonly filed_max_y: number;

  private readonly filed_max_xx: number;
  private readonly filed_max_yy: number;

  private readonly spriteSize: number;

  constructor(spriteSize: number, filed_max_y: number, filed_max_x: number)
  {
    this.spriteSize = spriteSize;
    this.filed_max_x = filed_max_x;
    this.filed_max_y = filed_max_y;
    this.filed_max_xx = filed_max_x * this.spriteSize;
    this.filed_max_yy = filed_max_y * this.spriteSize;
    this.GameField = new Array(this.filed_max_y).fill(Enums.GameBlockType.Ground).map(() => new Array(this.filed_max_x).fill(Enums.GameBlockType.Ground));
    
    for (let index = 0; index < this.filed_max_y; index++) {
      this.GameField[index][0] = Enums.GameBlockType.ConcreteWall1;
      this.GameField[index][this.filed_max_x - 1] = Enums.GameBlockType.ConcreteWall1;
    }

    for (let index = 0; index < this.filed_max_x; index++) {
      this.GameField[0][index] = Enums.GameBlockType.ConcreteWall1
      this.GameField[this.filed_max_y - 1][index] = Enums.GameBlockType.ConcreteWall1;
    }

    this.GameField[5][5] = Enums.GameBlockType.BreakWall1;
  }

  public canMove(new_xx: number, new_yy: number, size: number): boolean
  {
    if (new_xx <= 0) {
      return false;
    }

    if (new_yy <= 0) {
      return false;
    }

    if (new_xx >= this.filed_max_xx) {
      return false;
    }

    if (new_yy >= this.filed_max_yy) {
      return false;
    }

    let new_x = Math.floor(new_xx / this.spriteSize);
    let new_y = Math.floor(new_yy / this.spriteSize);
    if (this.GameField[new_y][new_x] !== Enums.GameBlockType.Ground)
    {
      return false;
    }

    new_x = Math.floor((new_xx + size) / this.spriteSize);
    new_y = Math.floor(new_yy / this.spriteSize);
    if (this.GameField[new_y][new_x] !== Enums.GameBlockType.Ground)
    {
      return false;
    }

    new_x = Math.floor(new_xx / this.spriteSize);
    new_y = Math.floor((new_yy  + size) / this.spriteSize);
    if (this.GameField[new_y][new_x] !== Enums.GameBlockType.Ground)
    {
      return false;
    }

    new_x = Math.floor((new_xx + size) / this.spriteSize);
    new_y = Math.floor((new_yy + size) / this.spriteSize);
    if (this.GameField[new_y][new_x] !== Enums.GameBlockType.Ground)
    {
      return false;
    }

    return true;
  }
}

export default GameField;