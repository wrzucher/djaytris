import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class ExplosionObject implements IGameObject{
  private readonly maxSprite: number = 3;
  private readonly game: TanksGame;

  constructor(game: TanksGame, shootXx: number, shootYy: number)
  {
    this.game = game;
    this.explosionXx = shootXx - 8;
    this.explosionYy = shootYy - 8;
  }

  private explosionXx: number = 0;
  private explosionYy: number = 0;
  private fireDirection: Enums.DirectionType = 0;
  private spriteIteraction: number = 0;
  private spriteDelay: number = 5;
  private currentSpriteDelay: number = 0;
  
  public spriteSize: number = 16;
  public get AbsXx(): number { return this.explosionXx; };
  public get AbsYy(): number { return this.explosionYy; };
  public get Direction(): Enums.DirectionType { return this.fireDirection; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.BattleCity; };

  public tic(): void {
    this.currentSpriteDelay++;
    if (this.currentSpriteDelay >= this.spriteDelay)
    {
      this.currentSpriteDelay = 0;
      this.spriteIteraction++;
      if (this.spriteIteraction >= this.maxSprite)
      {
        this.game.stopExplosion();
      }
    }
  }
}

export default ExplosionObject;