import Enums from './TanksGameEnums';

class GameField{

  public readonly GameField: Enums.GameObjectType[][];

  public readonly filedMaxX: number;
  public readonly filedMaxY: number;

  public readonly filedMaxXx: number;
  public readonly filedMaxYy: number;

  public readonly spriteSize: number;

  constructor(spriteSize: number, filedMaxY: number, filedMaxX: number)
  {
    this.spriteSize = spriteSize;
    this.filedMaxX = filedMaxX;
    this.filedMaxY = filedMaxY;
    this.filedMaxXx = filedMaxX * this.spriteSize;
    this.filedMaxYy = filedMaxY * this.spriteSize;
    this.GameField = new Array(this.filedMaxY).fill(Enums.GameObjectType.Ground).map(() => new Array(this.filedMaxX).fill(Enums.GameObjectType.Ground));
    
    for (let index = 0; index < this.filedMaxY; index++) {
      this.GameField[index][0] = Enums.GameObjectType.ConcreteWall1;
      this.GameField[index][this.filedMaxX - 1] = Enums.GameObjectType.ConcreteWall1;
    }

    for (let index = 0; index < this.filedMaxX; index++) {
      this.GameField[0][index] = Enums.GameObjectType.ConcreteWall1
      this.GameField[this.filedMaxY - 1][index] = Enums.GameObjectType.ConcreteWall1;
    }

    this.GameField[5][5] = Enums.GameObjectType.BreakWall1;
  }
}

export default GameField;