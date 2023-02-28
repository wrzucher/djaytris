import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class FireObject implements IGameObject{
  private readonly max_sprite: number = 1;
  private readonly game: TanksGame;
  private readonly playerSize: number;

  constructor(game: TanksGame, player_yy: number, player_xx: number, player_direction: Enums.DirectionType, playerSize: number)
  {
    this.game = game;
    this.fire_direction = player_direction;
    this.playerSize = playerSize;

    switch (this.fire_direction) {
      case Enums.DirectionType.Down:
        this.fire_xx = player_xx + Math.floor(this.playerSize / 2) - 3;
        this.fire_yy = player_yy + this.playerSize;
        break;
      case Enums.DirectionType.Up:
        this.fire_xx = player_xx + Math.floor(this.playerSize / 2) - 3;
        this.fire_yy = player_yy - this.spriteSize;
        break;
      case Enums.DirectionType.Left:
        this.fire_xx = player_xx - this.spriteSize;
        this.fire_yy = player_yy + Math.floor(this.playerSize / 2) - 2;
        break;
      case Enums.DirectionType.Right:
        this.fire_xx = player_xx + this.playerSize;
        this.fire_yy = player_yy + Math.floor(this.playerSize / 2) - 2;
        break;
      default:
        throw new Error(`Incorrect direction ${this.fire_direction}`);
    }
  }

  private fire_xx: number = 0;
  private fire_yy: number = 0;
  private fire_direction: Enums.DirectionType = 0;
  private sprite_iteraction: number = 0;
  
  public spriteSize: number = 4;
  public get Abs_xx(): number { return this.fire_xx}
  public get Abs_yy(): number { return this.fire_yy}
  public get Direction(): Enums.DirectionType { return this.fire_direction}
  public get Sprite_iteraction(): number { return this.sprite_iteraction}

  public Tic(): void {
    let new_fire_xx = this.fire_xx;
    let new_fire_yy = this.fire_yy;
    switch (this.fire_direction) {
      case Enums.DirectionType.Down:
        new_fire_yy++;
        break;
      case Enums.DirectionType.Up:
        new_fire_yy--;
        break;
      case Enums.DirectionType.Left:
        new_fire_xx--;
        break;
      case Enums.DirectionType.Right:
        new_fire_xx++;
        break;
      default:
        throw new Error(`Incorrect direction ${this.fire_direction}`);
    }

    if (this.game.canMove(new_fire_xx, new_fire_yy, this.spriteSize)) {
      this.fire_xx = new_fire_xx;
      this.fire_yy = new_fire_yy;
    } else {
      this.game.stopFire();
    }
  }
}

export default FireObject;