import { makeObservable, observable } from 'mobx';
import IGameObject from './IGameObject';
import Point from './Point';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class PacMan implements IGameObject {
  private readonly maxSprite: number = 3;
  private readonly game: TanksGame;
  private path: Point[] = [];

  constructor(game: TanksGame, playerY1: number, playerX1: number) {
    makeObservable(this, {
      life: observable,
     });
     
    this.game = game;
    this.playerX1 = playerX1;
    this.playerY1 = playerY1;
    this.playerX2 = this.playerX1 + this.spriteSize;
    this.playerY2 = this.playerY1 + this.spriteSize;
    this.setPath();
  }

  private playerX1: number = 0;
  private playerY1: number = 0;
  private playerX2: number = 0;
  private playerY2: number = 0;
  private direction: Enums.DirectionType = Enums.DirectionType.Left;
  private spriteIteraction: number = 0;
  
  public spriteSize: number = 16;
  public life: number = 50;
  public get X1(): number { return this.playerX1; };
  public get Y1(): number { return this.playerY1; };
  public get X2(): number { return this.playerX2; };
  public get Y2(): number { return this.playerY2; };
  public get Direction(): Enums.DirectionType { return this.direction; };
  public get SpriteIteraction(): number { return this.spriteIteraction; };
  public get SpriteType(): number { return Enums.GameSpriteType.PacMan; };
  public get GameObjectType(): number { return Enums.GameObjectType.PacMan1; };

  public tic(): void {
    if (!this.game.Player1) {
      return;
    }

    if (this.path.length === 0) {
      this.setPath();
    }

    const target = this.path[0];
    if (target.X === this.X1 && target.Y === this.Y1)
    {
      this.setPath();
    }

    const direction = this.getDirection(this.X1, this.Y1, target.X, target.Y);
    if (!this.move(direction)) {
      this.setPath();
    }
  }
  
  public interaction(initiator: IGameObject): void {
    if (initiator.GameObjectType !== Enums.GameObjectType.Fire) {
      return;
    }

    this.life--;
    if (this.life <= 0) {
      // We have to kill player.
      this.life = 0;
      this.game.PacmanDie(this);
    }
  }

  private setPath(): void {
    this.path = [];
    let dX = this.X1 - this.game.Player1.X1;
    let dY = this.Y1 - this.game.Player1.Y1;
    if (Math.abs(dX) >= Math.abs(dY)) {
      this.path.push(new Point(this.game.Player1.X1, this.Y1));
    }
    
    if (Math.abs(dX) < Math.abs(dY)) {
      this.path.push(new Point(this.X1, this.game.Player1.Y1));
    }

    this.path.push(new Point(this.game.Player1.X1, this.game.Player1.Y1));
  }
  
  private getDirection(xSource: number, ySource: number, xDestination: number, yDestination: number): Enums.DirectionType {
    let dX = xSource - xDestination;
    let dY = ySource - yDestination;

    if (Math.abs(dX) > Math.abs(dY) || dY === 0) {
      return dX < 0 ? Enums.DirectionType.Right : Enums.DirectionType.Left;
    }
    
    if (Math.abs(dX) < Math.abs(dY) || dX === 0) {
      return dY < 0 ? Enums.DirectionType.Down : Enums.DirectionType.Up;
    }

    if (Math.random() < 0.5) {
      return dX < 0 ? Enums.DirectionType.Right : Enums.DirectionType.Left;
    } else {
      return dY < 0 ? Enums.DirectionType.Down : Enums.DirectionType.Up;
    }
  }

  private move(direction: Enums.DirectionType): boolean {
    this.direction = direction;
    this.setNextSpriteInteraction();
    let candidateX = this.playerX1; 
    let candidateY = this.playerY1;
    switch (direction) {
      case Enums.DirectionType.Down:
        candidateY++;
        break;
      case Enums.DirectionType.Up:
        candidateY--;
        break;
      case Enums.DirectionType.Left:
        candidateX--;
        break;
      case Enums.DirectionType.Right:
        candidateX++;
        break;
      default:
        throw new Error(`Unsupported direction ${direction}`);
    }

    const gameObjects = this.game.getObjectsOnThePath(this.GameObjectType, candidateX, candidateY, this.spriteSize);
    if (gameObjects.length !== 0) {
      gameObjects
        .filter((_) => _.GameObjectType === Enums.GameObjectType.TankType1 || _.GameObjectType === Enums.GameObjectType.BreakWall1)
        .map((_) => _.interaction(this));
      return false;
    }

    this.playerX1 = candidateX;
    this.playerY1 = candidateY;
    this.playerX2 = this.playerX1 + this.spriteSize;
    this.playerY2 = this.playerY1 + this.spriteSize;
    return true;
  }

  private setNextSpriteInteraction() {
    this.spriteIteraction++;
    if (this.spriteIteraction >= this.maxSprite) {
      this.spriteIteraction = 0;
    }
  }
}

export default PacMan;