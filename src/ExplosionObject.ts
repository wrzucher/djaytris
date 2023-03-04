import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class ExplosionObject implements IGameObject{
  private readonly maxSprite: number = 3;
  private readonly game: TanksGame;

  constructor(game: TanksGame, gameObject: IGameObject)
  {
    this.game = game;
    this.explosionXx = gameObject.X1 + (gameObject.X2 - gameObject.X1) / 2 - this.spriteSize / 2;
    this.explosionYy = gameObject.Y1 + (gameObject.Y2 - gameObject.Y1) / 2 - this.spriteSize / 2;
  }

  private explosionXx: number = 0;
  private explosionYy: number = 0;
  private fireDirection: Enums.DirectionType = 0;
  private spriteIteraction: number = 0;
  private spriteDelay: number = 5;
  private currentSpriteDelay: number = 0;
  
  public spriteSize: number = 16;
  public get X1(): number { return this.explosionXx; };
  public get Y1(): number { return this.explosionYy; };
  public get X2(): number { return this.explosionXx + this.spriteSize; };
  public get Y2(): number { return this.explosionYy + this.spriteSize; };
  public get Direction(): Enums.DirectionType { return this.fireDirection; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.BattleCity; };
  public get GameObjectType(): number { return Enums.GameObjectType.Explosion; };

  public tic(): void {
    this.currentSpriteDelay++;
    if (this.currentSpriteDelay >= this.spriteDelay)
    {
      this.currentSpriteDelay = 0;
      this.spriteIteraction++;
      if (this.spriteIteraction >= this.maxSprite)
      {
        this.game.stopExplosion(this);
      }
    }
  }

  public interaction(initiator: IGameObject): void {}
}

export default ExplosionObject;