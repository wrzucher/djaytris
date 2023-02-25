import GameBlockType from './TanksGameEnums';

class TanksGame{

  private Player1: Tank;
  
  public GameField: GameBlockType[][];

  private filed_max_x: number;
  private filed_max_y: number;


  constructor(filed_max_y: number, filed_max_x: number)
  {
    this.filed_max_x = filed_max_x;
    this.filed_max_y = filed_max_y;
    this.GameField = new Array(this.filed_max_y).fill(GameBlockType.Ground).map(() => new Array(this.filed_max_x).fill(GameBlockType.Ground));
    this.Player1 = new Tank(50, 50);
    for (let index = 0; index < this.filed_max_y; index++) {
      this.GameField[index][0] = GameBlockType.ConcreteWall1;
      this.GameField[index][this.filed_max_x - 1] = GameBlockType.ConcreteWall1;
    }

    for (let index = 0; index < this.filed_max_x; index++) {
      this.GameField[0][index] = GameBlockType.ConcreteWall2;
      this.GameField[this.filed_max_y - 1][index] = GameBlockType.ConcreteWall2;
    }
  }

  public Tic()
  {
  }

  public MoveLeft()
  {
  }

  public MoveRight()
  {
  }

  public MoveUp() {
  }

  public MoveDown() {
  }
}

class Tank
{
  constructor(player_y: number, player_x: number)
  {
    this.player_x = player_x;
    this.player_y = player_y;
  }

  private player_x: number = 0;
  private player_y: number = 0;
  private direction: number = 0;
  private sprite_iteraction: number = 0;

  get Player_x(): number { return this.player_x}
  get Player_y(): number { return this.player_y}
  get Direction(): number { return this.direction}
  get Sprite_iteraction(): number { return this.sprite_iteraction}

}

export default TanksGame;