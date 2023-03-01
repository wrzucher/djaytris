import IGameObject from './IGameObject';
import Enums from './TanksGameEnums';

class BreakWallObject implements IGameObject{
  constructor(wallX1: number, wallY1: number)
  {
    this.wallX1 = wallX1;
    this.wallY1 = wallY1;
    this.wallX2 = wallX1 + this.spriteSize;
    this.wallY2 = wallY1 + this.spriteSize;
  }

  private wallX1: number = 0;
  private wallY1: number = 0;
  private wallX2: number = 0;
  private wallY2: number = 0;

  private direction: Enums.DirectionType = 0;
  private spriteIteraction: number = 0;
  
  public spriteSize: number = 16;
  public get X1(): number { return this.wallX1; };
  public get Y1(): number { return this.wallY1; };
  public get X2(): number { return this.wallX2; };
  public get Y2(): number { return this.wallY2; };
  public get Direction(): Enums.DirectionType { return this.direction; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.BattleCity; };
  public get GameObjectType(): number { return Enums.GameObjectType.BreakWall1; };

  public tic(): void {
  }
}

export default BreakWallObject;