import IGameObject from './IGameObject';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';
import { makeObservable, observable } from "mobx"
import FireObject from './FireObject';
import ExplosionObject from './ExplosionObject';

class Tank implements IGameObject
{
  private readonly maxSprite: number = 2;
  private readonly game: TanksGame;

  constructor(game: TanksGame, playerY1: number, playerX1: number)
  {
     makeObservable(this, {
      life: observable,
     });

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
  private get CanMove(): boolean { return this.life > 0; };

  public fire?: FireObject;
  public life: number = 50;
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
    this.move(this.X1 - 1, this.Y1, Enums.DirectionType.Left);
  }

  public moveRight()
  {
    this.move(this.X1 + 1, this.Y1, Enums.DirectionType.Right);
  }

  public moveUp() {
    this.move(this.X1, this.Y1 - 1, Enums.DirectionType.Up);
  }

  public moveDown() {
    this.move(this.X1, this.Y1 + 1, Enums.DirectionType.Down);
  }

  public makeFire() {
    if (!this.CanMove) {
      return;
    }

    if (this.fire)
    {
      return;
    }

    this.fire = new FireObject(this.game, this.Y1, this.X1, this.Direction, this.spriteSize);
    this.game.GameField.gameField.push(this.fire);
  }

  public stopFire(fireObject: FireObject)
  {
    if (this.fire !== fireObject) {
      return;
    }

    this.game.GameField.gameField.push(new ExplosionObject(this.game, fireObject));
    this.game.GameField.gameField = this.game.GameField.gameField.filter((_) => _ !== fireObject);
    this.fire = undefined;
  }

  private move(candidateX: number, candidateY: number, direction: Enums.DirectionType)
  {
    if (!this.CanMove) {
      return;
    }

    this.direction = direction;
    this.setNextSpriteInteraction();

    const gameObjects = this.game.getObjectsOnThePath(this.GameObjectType, candidateX, candidateY, this.spriteSize);
    if (gameObjects.length !== 0) {
      return;
    }

    this.playerX1 = candidateX;
    this.playerY1 = candidateY;
    this.playerX2 = this.playerX1 + this.spriteSize;
    this.playerY2 = this.playerY1 + this.spriteSize;
  }
  
  public interaction(initiator: IGameObject): void {
    this.life--;
    if (this.life <= 0)
    {
      // We have to kill player.
      this.life = 0;
      this.game.PlayerDie(this);
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