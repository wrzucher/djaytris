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
    const newXx = this.X1 - 1;
    const newYy = this.Y1;
    if (this.game.canMove(newXx, newYy, this.spriteSize)) {
      this.playerX1--;
      this.playerX2 = this.playerX1 + this.spriteSize;
      this.playerY2 = this.playerY1 + this.spriteSize;
      this.direction = Enums.DirectionType.Left;
      this.setNextSpriteInteraction();
    }
  }

  public moveRight()
  {
    const newXx = this.X1 + 1;
    const newYy = this.Y1;
    if (this.game.canMove(newXx, newYy, this.spriteSize)) {
      this.playerX1++;
      this.playerX2 = this.playerX1 + this.spriteSize;
      this.playerY2 = this.playerY1 + this.spriteSize;
      this.direction = Enums.DirectionType.Right;
      this.setNextSpriteInteraction();
    }
}

  public moveUp() {
    const newXx = this.X1;
    const newYy = this.Y1 - 1;
    if (this.game.canMove(newXx, newYy, this.spriteSize)) {
      this.playerY1--;
      this.playerX2 = this.playerX1 + this.spriteSize;
      this.playerY2 = this.playerY1 + this.spriteSize;
      this.direction = Enums.DirectionType.Up;
      this.setNextSpriteInteraction();
    }
  }

  public moveDown() {
    const newXx = this.X1;
    const newYy = this.Y1 + 1;
    if (this.game.canMove(newXx, newYy, this.spriteSize)) {
      this.playerY1++;
      this.playerX2 = this.playerX1 + this.spriteSize;
      this.playerY2 = this.playerY1 + this.spriteSize;
      this.direction = Enums.DirectionType.Down;
      this.setNextSpriteInteraction();
    }
  }

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