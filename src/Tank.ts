import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class Tank implements IGameObject
{
  private readonly maxSprite: number = 2;
  private readonly game: TanksGame;

  constructor(game: TanksGame, playerY1: number, playerX1: number)
  {
    this.game = game;
    this.playerX1 = playerX1;
    this.playerY1 = playerY1;
    this.playerX2 = this.playerX1 + this.spriteSize;
    this.playerY2 = this.playerY1 + this.spriteSize;
  }

  private playerX1: number = 0;
  private playerY1: number = 0;
  private playerX2: number = 0;
  private playerY2: number = 0;
  private direction: Enums.DirectionType = 0;
  private spriteIteraction: number = 0;
  
  public spriteSize: number = 16;
  public get X1(): number { return this.playerX1; };
  public get Y1(): number { return this.playerY1; };
  public get X2(): number { return this.playerX2; };
  public get Y2(): number { return this.playerY2; };
  public get Direction(): Enums.DirectionType { return this.direction; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.BattleCity; };
  public get GameObjectType(): number { return Enums.GameObjectType.TankType1; };

  public tic(): void {
    // Do nothing because this is player object.
  }

  public moveLeft()
  {
    this.move(this.X1 - 1, this.Y1, Enums.DirectionType.Left);
  }

  public moveRight()
  {
    this.move(this.X1 + 1, this.Y1, Enums.DirectionType.Right);
}

  public moveUp() {
    this.move(this.X1, this.Y1 - 1, Enums.DirectionType.Up);
  }

  public moveDown() {
    this.move(this.X1, this.Y1 + 1, Enums.DirectionType.Down);
  }

  private move(candidateX: number, candidateY: number, direction: Enums.DirectionType)
  {
    const gameObjects = this.game.getObjectsOnThePath(candidateX, candidateY, this.spriteSize);
    if (gameObjects.length !== 0) {
      return;
    }

    this.playerX1 = candidateX;
    this.playerY1 = candidateY;
    this.playerX2 = this.playerX1 + this.spriteSize;
    this.playerY2 = this.playerY1 + this.spriteSize;
    this.direction = direction;
    this.setNextSpriteInteraction();
  }
  
  public interaction(): void {}

  private setNextSpriteInteraction()
  {
    this.spriteIteraction++;
    if (this.spriteIteraction >= this.maxSprite)
    {
      this.spriteIteraction = 0;
    }
  }
}

export default Tank;