import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class FireObject implements IGameObject{
  private readonly maxSprite: number = 1;
  private readonly game: TanksGame;
  private readonly playerSize: number;

  constructor(game: TanksGame, playerYy: number, playerXx: number, player_direction: Enums.DirectionType, playerSize: number)
  {
    this.game = game;
    this.fireDirection = player_direction;
    this.playerSize = playerSize;

    switch (this.fireDirection) {
      case Enums.DirectionType.Down:
        this.fireXx = playerXx + Math.floor(this.playerSize / 2) - 3;
        this.fireYy = playerYy + this.playerSize;
        break;
      case Enums.DirectionType.Up:
        this.fireXx = playerXx + Math.floor(this.playerSize / 2) - 3;
        this.fireYy = playerYy - this.spriteSize;
        break;
      case Enums.DirectionType.Left:
        this.fireXx = playerXx - this.spriteSize;
        this.fireYy = playerYy + Math.floor(this.playerSize / 2) - 2;
        break;
      case Enums.DirectionType.Right:
        this.fireXx = playerXx + this.playerSize;
        this.fireYy = playerYy + Math.floor(this.playerSize / 2) - 2;
        break;
      default:
        throw new Error(`Incorrect direction ${this.fireDirection}`);
    }
  }

  private fireXx: number = 0;
  private fireYy: number = 0;
  private fireDirection: Enums.DirectionType = 0;
  private spriteIteraction: number = 0;
  
  public spriteSize: number = 4;
  public get AbsXx(): number { return this.fireXx; };
  public get AbsYy(): number { return this.fireYy; };
  public get Direction(): Enums.DirectionType { return this.fireDirection; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.BattleCity; };

  public tic(): void {
    let newFireXx = this.fireXx;
    let newFireYy = this.fireYy;
    switch (this.fireDirection) {
      case Enums.DirectionType.Down:
        newFireYy++;
        break;
      case Enums.DirectionType.Up:
        newFireYy--;
        break;
      case Enums.DirectionType.Left:
        newFireXx--;
        break;
      case Enums.DirectionType.Right:
        newFireXx++;
        break;
      default:
        throw new Error(`Incorrect direction ${this.fireDirection}`);
    }

    if (this.game.canMove(newFireXx, newFireYy, this.spriteSize)) {
      this.fireXx = newFireXx;
      this.fireYy = newFireYy;
    } else {
      this.game.stopFire();
    }
  }
}

export default FireObject;