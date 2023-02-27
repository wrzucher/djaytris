import GameField from './GameField';
import IGameObject from './IGameObject';
import Enums from './TanksGameEnums';

class Tank implements IGameObject
{
  private readonly max_sprite: number = 2;
  private readonly gameField: GameField;

  constructor(gameField: GameField, player_yy: number, player_xx: number)
  {
    this.gameField = gameField;
    this.player_xx = player_xx;
    this.player_yy = player_yy;
  }

  private player_xx: number = 0;
  private player_yy: number = 0;
  private direction: Enums.DirectionType = 0;
  private sprite_iteraction: number = 0;
  
  public spriteSize: number = 16;
  public get Abs_xx(): number { return this.player_xx}
  public get Abs_yy(): number { return this.player_yy}
  public get Direction(): Enums.DirectionType { return this.direction}
  public get Sprite_iteraction(): number { return this.sprite_iteraction}

  public Tic(): void {
    // Do nothing because this is player object.
  }

  public MoveLeft()
  {
    const new_xx = this.Abs_xx - 1;
    const new_yy = this.Abs_yy;
    if (this.gameField.canMove(new_xx, new_yy, this.spriteSize)) {
      this.player_xx--;
      this.direction = Enums.DirectionType.Left;
      this.setNextSpriteInteraction();
    }
  }

  public MoveRight()
  {
    const new_xx = this.Abs_xx + 1;
    const new_yy = this.Abs_yy;
    if (this.gameField.canMove(new_xx, new_yy, this.spriteSize)) {
      this.player_xx++;
      this.direction = Enums.DirectionType.Right;
      this.setNextSpriteInteraction();
    }
}

  public MoveUp() {
    const new_xx = this.Abs_xx;
    const new_yy = this.Abs_yy - 1;
    if (this.gameField.canMove(new_xx, new_yy, this.spriteSize)) {
      this.player_yy--;
      this.direction = Enums.DirectionType.Up;
      this.setNextSpriteInteraction();
    }
  }

  public MoveDown() {
    const new_xx = this.Abs_xx;
    const new_yy = this.Abs_yy + 1;
    if (this.gameField.canMove(new_xx, new_yy, this.spriteSize)) {
      this.player_yy++;
      this.direction = Enums.DirectionType.Down;
      this.setNextSpriteInteraction();
    }
  }

  private setNextSpriteInteraction()
  {
    this.sprite_iteraction++;
    if (this.sprite_iteraction >= this.max_sprite)
    {
      this.sprite_iteraction = 0;
    }
  }
}

export default Tank;