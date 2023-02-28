import Enums from './TanksGameEnums';

class GameField{

  public readonly GameField: Enums.GameBlockType[][];

  public readonly filed_max_x: number;
  public readonly filed_max_y: number;

  public readonly filed_max_xx: number;
  public readonly filed_max_yy: number;

  public readonly spriteSize: number;

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
}

export default GameField;