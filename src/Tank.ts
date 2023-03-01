import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class Tank implements IGameObject
{
  private readonly maxSprite: number = 2;
  private readonly game: TanksGame;

  constructor(game: TanksGame, playerYy: number, playerXx: number)
  {
    this.game = game;
    this.playerXx = playerXx;
    this.playerYy = playerYy;
  }

  private playerXx: number = 0;
  private playerYy: number = 0;
  private direction: Enums.DirectionType = 0;
  private spriteIteraction: number = 0;
  
  public spriteSize: number = 16;
  public get AbsXx(): number { return this.playerXx; };
  public get AbsYy(): number { return this.playerYy; };
  public get Direction(): Enums.DirectionType { return this.direction; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.BattleCity; };

  public Tic(): void {
    // Do nothing because this is player object.
  }

  public MoveLeft()
  {
    const newXx = this.AbsXx - 1;
    const newYy = this.AbsYy;
    if (this.game.canMove(newXx, newYy, this.spriteSize)) {
      this.playerXx--;
      this.direction = Enums.DirectionType.Left;
      this.setNextSpriteInteraction();
    }
  }

  public MoveRight()
  {
    const newXx = this.AbsXx + 1;
    const newYy = this.AbsYy;
    if (this.game.canMove(newXx, newYy, this.spriteSize)) {
      this.playerXx++;
      this.direction = Enums.DirectionType.Right;
      this.setNextSpriteInteraction();
    }
}

  public MoveUp() {
    const newXx = this.AbsXx;
    const newYy = this.AbsYy - 1;
    if (this.game.canMove(newXx, newYy, this.spriteSize)) {
      this.playerYy--;
      this.direction = Enums.DirectionType.Up;
      this.setNextSpriteInteraction();
    }
  }

  public MoveDown() {
    const newXx = this.AbsXx;
    const newYy = this.AbsYy + 1;
    if (this.game.canMove(newXx, newYy, this.spriteSize)) {
      this.playerYy++;
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