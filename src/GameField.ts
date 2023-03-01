import BreakWallObject from './BreakWallObject';
import ConcreteWallObject from './ConcreteWallObject';
import IGameObject from './IGameObject';
import TanksGame from './TanksGame';

class GameField{

  private readonly game: TanksGame;
  public gameField: IGameObject[];

  public readonly filedMaxX: number;
  public readonly filedMaxY: number;

  public readonly filedMaxXx: number;
  public readonly filedMaxYy: number;

  public readonly spriteSize: number;

  constructor(game: TanksGame, spriteSize: number, filedMaxY: number, filedMaxX: number)
  {
    this.game = game;
    this.spriteSize = spriteSize;
    this.filedMaxX = filedMaxX;
    this.filedMaxY = filedMaxY;
    this.filedMaxXx = filedMaxX * this.spriteSize;
    this.filedMaxYy = filedMaxY * this.spriteSize;
    this.gameField = new Array();

    for (let index = 0; index < this.filedMaxY; index++) {
      this.gameField.push(new ConcreteWallObject(index * this.spriteSize, 0));
      this.gameField.push(new ConcreteWallObject(index * this.spriteSize, (this.filedMaxY - 1) * this.spriteSize));
    }

    for (let index = 0; index < this.filedMaxX; index++) {
      this.gameField.push(new ConcreteWallObject(0, index * this.spriteSize));
      this.gameField.push(new ConcreteWallObject((this.filedMaxY - 1) * this.spriteSize, index * this.spriteSize));
    }

    for (let index = 0; index < 20; index++) {
      const x = Math.floor(Math.random() * (20 - 2 + 1) + 2);
      const y = Math.floor(Math.random() * (20 - 2 + 1) + 2);
      this.gameField.push(new BreakWallObject(this.game, x * this.spriteSize, y * this.spriteSize));
    }
  }
}

export default GameField;