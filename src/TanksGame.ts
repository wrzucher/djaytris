class TanksGame{

  private gameObject: number[][] = new Array(4).fill(0).map(() => new Array(4).fill(0));
  
  private filed_max_x: number;
  private filed_max_y: number;
  
  private player_x: number = 5;
  private player_y: number = 0;

  constructor(filed_max_y: number, filed_max_x: number)
  {
    this.filed_max_x = filed_max_x;
    this.filed_max_y = filed_max_y;
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

  public RotateLeft() {
  }

  public MoveDown() {
  }
}

export default TanksGame;