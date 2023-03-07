import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class PacManDieObject implements IGameObject{
  private readonly maxSprite: number = 11;
  private readonly game: TanksGame;

  constructor(game: TanksGame, gameObject: IGameObject)
  {
    this.game = game;
    this.dieX = gameObject.X1;
    this.dieY = gameObject.Y1;
  }

  private dieX: number = 0;
  private dieY: number = 0;
  private direction: Enums.DirectionType = 0;
  private spriteIteraction: number = 0;
  private spriteDelay: number = 5;
  private currentSpriteDelay: number = 0;
  
  public spriteSize: number = 16;
  public get X1(): number { return this.dieX; };
  public get Y1(): number { return this.dieY; };
  public get X2(): number { return this.dieX + this.spriteSize; };
  public get Y2(): number { return this.dieY + this.spriteSize; };
  public get Direction(): Enums.DirectionType { return this.direction; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.PacMan; };
  public get GameObjectType(): number { return Enums.GameObjectType.PacManDie; };

  public tic(): void {
    this.currentSpriteDelay++;
    if (this.currentSpriteDelay >= this.spriteDelay)
    {
      this.currentSpriteDelay = 0;
      this.spriteIteraction++;
      if (this.spriteIteraction >= this.maxSprite)
      {
        this.game.stopPacManDie(this);
      }
    }
  }

  public interaction(initiator: IGameObject): void {}
}

export default PacManDieObject;