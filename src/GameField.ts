import BreakWallObject from './BreakWallObject';
import ConcreteWallObject from './ConcreteWallObject';
import IGameObject from './IGameObject';
import Enums from './TanksGameEnums';

class GameField{

  public readonly GameField: Enums.GameObjectType[][];
  public readonly gameField: IGameObject[];
  public readonly sortByX: IGameObject[];
  public readonly sortByY: IGameObject[];

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
    this.gameField = new Array();

    for (let index = 0; index < this.filedMaxY; index++) {
      this.GameField[index][0] = Enums.GameObjectType.ConcreteWall1;
      this.GameField[index][this.filedMaxX - 1] = Enums.GameObjectType.ConcreteWall1;
      this.gameField.push(new ConcreteWallObject(index * this.spriteSize, 0));
      this.gameField.push(new ConcreteWallObject(index * this.spriteSize, (this.filedMaxY - 1) * this.spriteSize));
    }

    for (let index = 0; index < this.filedMaxX; index++) {
      this.GameField[0][index] = Enums.GameObjectType.ConcreteWall1
      this.GameField[this.filedMaxY - 1][index] = Enums.GameObjectType.ConcreteWall1;
      this.gameField.push(new ConcreteWallObject(0, index * this.spriteSize));
      this.gameField.push(new ConcreteWallObject((this.filedMaxY - 1) * this.spriteSize, index * this.spriteSize));
    }

      this.gameField.push(new BreakWallObject(5 * this.spriteSize, 5 * this.spriteSize));
      this.GameField[5][5] = Enums.GameObjectType.BreakWall1;

      this.sortByX = this.gameField.sort((_) => _.X1);
      this.sortByY = this.gameField.sort((_) => _.Y1);
  }
}

export default GameField;