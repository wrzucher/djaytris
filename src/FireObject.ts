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
        this.fireX1 = playerXx + Math.floor(this.playerSize / 2) - 3;
        this.fireY1 = playerYy + this.playerSize;
        break;
      case Enums.DirectionType.Up:
        this.fireX1 = playerXx + Math.floor(this.playerSize / 2) - 3;
        this.fireY1 = playerYy - this.spriteSize;
        break;
      case Enums.DirectionType.Left:
        this.fireX1 = playerXx - this.spriteSize;
        this.fireY1 = playerYy + Math.floor(this.playerSize / 2) - 2;
        break;
      case Enums.DirectionType.Right:
        this.fireX1 = playerXx + this.playerSize;
        this.fireY1 = playerYy + Math.floor(this.playerSize / 2) - 2;
        break;
      default:
        throw new Error(`Incorrect direction ${this.fireDirection}`);
    }

    this.fireX2 = this.fireX1 + this.spriteSize;
    this.fireY2 = this.fireY1 + this.spriteSize;
  }

  private fireX1: number = 0;
  private fireY1: number = 0;
  private fireX2: number = 0;
  private fireY2: number = 0;
  private fireDirection: Enums.DirectionType = 0;
  private spriteIteraction: number = 0;
  
  public spriteSize: number = 4;
  public get X1(): number { return this.fireX1; };
  public get Y1(): number { return this.fireY1; };
  public get X2(): number { return this.fireX2; };
  public get Y2(): number { return this.fireY2; };
  public get Direction(): Enums.DirectionType { return this.fireDirection; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.BattleCity; };
  public get GameObjectType(): number { return Enums.GameObjectType.Fire; };

  public tic(): void {
    let newFireXx = this.fireX1;
    let newFireYy = this.fireY1;
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

    const gameObjects = this.game.getObjectsOnThePath(this.GameObjectType, newFireXx, newFireYy, this.spriteSize)
      .filter((_) => _.GameObjectType !== Enums.GameObjectType.Explosion)
      .filter((_) => _.GameObjectType !== Enums.GameObjectType.Fire);
    if (gameObjects.length === 0) {
      this.fireX1 = newFireXx;
      this.fireY1 = newFireYy;
      
      this.fireX2 = this.fireX1 + this.spriteSize;
      this.fireY2 = this.fireY1 + this.spriteSize;
    } else {
      this.game.stopFire(this);
      gameObjects.forEach((_) => _.interaction(this));
    }
  }

  public interaction(initiator: IGameObject): void {}
}

export default FireObject;