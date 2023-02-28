import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class ExplosionObject implements IGameObject{
  private readonly max_sprite: number = 3;
  private readonly game: TanksGame;

  constructor(game: TanksGame, shoot_xx: number, shoot_yy: number)
  {
    this.game = game;
    this.explosion_xx = shoot_xx - 8;
    this.explosion_yy = shoot_yy - 8;
  }

  private explosion_xx: number = 0;
  private explosion_yy: number = 0;
  private fire_direction: Enums.DirectionType = 0;
  private sprite_iteraction: number = 0;
  private sprite_delay: number = 5;
  private current_sprite_delay: number = 0;
  
  public spriteSize: number = 16;
  public get Abs_xx(): number { return this.explosion_xx}
  public get Abs_yy(): number { return this.explosion_yy}
  public get Direction(): Enums.DirectionType { return this.fire_direction}
  public get Sprite_iteraction(): number { return this.sprite_iteraction}

  public Tic(): void {
    this.current_sprite_delay++;
    if (this.current_sprite_delay >= this.sprite_delay)
    {
      this.current_sprite_delay = 0;
      this.sprite_iteraction++;
      if (this.sprite_iteraction >= this.max_sprite)
      {
        this.game.stopExplosion();
      }
    }
  }
}

export default ExplosionObject;