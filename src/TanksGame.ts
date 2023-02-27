import GameField from './GameField';
import Tank from './Tank';
import Enums from './TanksGameEnums';

class TanksGame{

  public readonly Player1: Tank;
  
  public readonly GameField: GameField;

  public fire_xx?: number;
  public fire_yy?: number;
  public fire_size: number = 4;
  public fire_direction?: Enums.DirectionType; 

  private readonly spriteSize: number;

  constructor(spriteSize: number, filed_max_y: number, filed_max_x: number)
  {
    this.spriteSize = spriteSize;
    this.GameField = new GameField(spriteSize, filed_max_y, filed_max_x);
    this.Player1 = new Tank(this.GameField, 1 * this.spriteSize, 1 * this.spriteSize);
  }

  public Tic()
  {
    
  }

  public MoveLeft() {
    this.Player1.MoveLeft();
  }

  public Fire() {
    if (this.fire_xx || this.fire_yy)
    {
      return;
    }

    this.fire_direction = this.Player1.Direction;
  }

  public MoveRight() {
    const new_xx = this.Player1.Abs_xx + 1;
    const new_yy = this.Player1.Abs_yy;
    if (this.GameField.canMove(new_xx, new_yy, this.spriteSize)) {
      this.Player1.MoveRight();
    }
  }

  public MoveUp() {
    this.Player1.MoveUp();
  }

  public MoveDown() {
    this.Player1.MoveDown();
  }
}

export default TanksGame;