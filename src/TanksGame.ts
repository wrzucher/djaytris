import BreakWallObject from './BreakWallObject';
import ExplosionObject from './ExplosionObject';
import FireObject from './FireObject';
import GameField from './GameField';
import IGameObject from './IGameObject';
import PacMan from './PacMan';
import PacManDieObject from './PacManDieObject';
import Tank from './Tank';
import Enums from './TanksGameEnums';

class TanksGame{

  public readonly Player1: Tank;
  public readonly GameField: GameField;
  private readonly spriteSize: number;

  constructor(spriteSize: number, filed_max_y: number, filed_max_x: number)
  {
    this.spriteSize = spriteSize;
    this.GameField = new GameField(this, spriteSize, filed_max_y, filed_max_x);
    this.Player1 = new Tank(this, 1 * this.spriteSize, 1 * this.spriteSize);
    this.createPacMan();
    this.GameField.gameField.push(this.Player1);
  }

  public tic()
  {
    this.GameField.gameField.forEach(_ => _.tic());
  }

  public moveLeft() {
    this.Player1.moveLeft();
  }

  public fire() {
    this.Player1.makeFire();
  }

  public moveRight() {
    this.Player1.moveRight();
  }

  public moveUp() {
    this.Player1.moveUp();
  }

  public moveDown() {
    this.Player1.moveDown();
  }

  public getObjectsOnThePath(gameObjectType: Enums.GameObjectType, newX1: number, newY1: number, size: number): IGameObject[]
  {
    let newX_01 = newX1 + size;
    let newY_01 = newY1 + size;

    return this.GameField.gameField.filter((_) => _.GameObjectType !== gameObjectType && _.X1 < newX_01 && _.X2 > newX1 && _.Y1 < newY_01 && _.Y2 > newY1);
  }

  public stopFire(fireObject: FireObject)
  {
    this.GameField.gameField.push(new ExplosionObject(this, fireObject));
    this.GameField.gameField = this.GameField.gameField.filter((_) => _ !== fireObject);
  }

  public PlayerDie(player: Tank)
  {
    this.GameField.gameField.push(new ExplosionObject(this, player));
    this.GameField.gameField = this.GameField.gameField.filter((_) => _ !== player);
  }

  public PacmanDie(pacman: PacMan)
  {
    this.GameField.gameField.push(new PacManDieObject(this, pacman));
    this.GameField.gameField = this.GameField.gameField.filter((_) => _ !== pacman);
  }

  public breakTheWall(wall: BreakWallObject)
  {
    this.GameField.gameField = this.GameField.gameField.filter((_) => _ !== wall);
  }

  public stopExplosion(explosionObject: ExplosionObject)
  {
    this.GameField.gameField = this.GameField.gameField.filter((_) => _ !== explosionObject);
  }

  public stopPacManDie(pacManDieObject: PacManDieObject)
  {
    this.GameField.gameField = this.GameField.gameField.filter((_) => _ !== pacManDieObject);
    this.createPacMan();
  }

  private createPacMan() {
    let isAdded = false;
    do {
      let x = Math.floor(Math.random() * (20 - 2 + 1) + 2);
      let y = Math.floor(Math.random() * (20 - 2 + 1) + 2);
      isAdded = this.GameField.pushNewObject(new PacMan(this, x * this.spriteSize, y * this.spriteSize));
    }
    while (!isAdded);
  }
}

export default TanksGame;