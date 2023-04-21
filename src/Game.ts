import GameBlockType from "./GameBlockType";

class Game{

  private nextObject?: GameBlockType = GameBlockType.Square;
  private gameObject: number[][] = new Array(4).fill(0).map(() => new Array(4).fill(0));
  
  private filed_max_x: number;
  private filed_max_y: number;
  
  private player_x: number = 5;
  private player_y: number = 0;

  public GameField: number[][];

  public constructor(gameField: number[][], firstObject: GameBlockType, player_x: number = 5, player_y: number = 0)
  {
    this.filed_max_y = gameField.length;
    this.filed_max_x = gameField[0].length;
    this.GameField = gameField;
    this.gameObject = this.GetGameBlock(firstObject)
    this.player_x = player_x;
    this.player_y = player_y;
  }

  public Initialize()
  {
    this.DrawPlayer();
  }
  
  public SetNextObject(nextObject: GameBlockType)
  {
    this.nextObject = nextObject;
  }

  public Tic()
  {
    this.MoveDown();
  }

  public MoveLeft()
  {
    this.CleanUpPlayer();
    const newX = this.player_x - 1;
    const checkResult = this.CanMove(this.player_y, newX, this.gameObject);
    if (checkResult.canMove)
    {
      this.player_x = newX;
    }

    this.DrawPlayer();
  }

  public MoveRight()
  {
    this.CleanUpPlayer();
    const newX = this.player_x + 1;
    const checkResult = this.CanMove(this.player_y, newX, this.gameObject);
    if (checkResult.canMove)
    {
      this.player_x = newX;
    }

    this.DrawPlayer();
  }

  public RotateLeft() {
    this.CleanUpPlayer();
    const candidateGameObject = this.RotateCW(this.gameObject);
    const checkResult = this.CanMove(this.player_y, this.player_x, candidateGameObject);
    if (checkResult.canMove) {
      this.gameObject = candidateGameObject;
    }

    this.DrawPlayer();
  }

  public MoveDown() {
    this.CleanUpPlayer();
    const newY = this.player_y + 1;
    const checkResult = this.CanMove(newY, this.player_x, this.gameObject);

    if (checkResult.shouldStuck) {
      this.Stuck();
    }

    if (checkResult.canMove) {
      this.player_y = newY;
    }
    
    this.DrawPlayer();
  }

  private CanMove(check_player_y: number, check_player_x: number, gameObject: number[][]): MoveCheck {
    for(let x = 0; x < 4; x++) {
      for(let y = 0; y < 4; y++) {
        if (gameObject[y][x] === 1) {
          const checkResult = this.CanMoveCell(check_player_y + y, check_player_x + x);
          if (!checkResult.canMove) {
            return checkResult;
          }
        }
      }
    }
      
    const result = new MoveCheck();
    return result;
  }

  private CanMoveCell(check_cell_y: number, check_cell_x: number): MoveCheck {
    const result = new MoveCheck();

    if (check_cell_y >= this.filed_max_y) {
      result.canMove = false;
      result.shouldStuck = true;
      return result;
    }

    if (this.GameField[check_cell_y][check_cell_x] === 2) {
      result.canMove = false;
      result.shouldStuck = true;
    }

    if (check_cell_x >= this.filed_max_x) {
      result.canMove = false;
    }

    if (check_cell_x < 0) {
      result.canMove = false;
    }

    return result;
  }

  private CleanUpPlayer() {
    for(let x = 0; x < 4; x++) {
      for(let y = 0; y < 4; y++) {
        if (this.gameObject[y][x] !== 0 &&
          this.GameField[this.player_y + y][this.player_x + x] === this.gameObject[y][x]) {
          this.GameField[this.player_y + y][this.player_x + x] = 0
        }
      }
    }
  }

  private DrawPlayer() {
    for(let x = 0; x < 4; x++) {
      for(let y = 0; y < 4; y++) {
        if (this.gameObject[y][x] !== 0 &&
          this.player_y + y < this.filed_max_y &&
          this.player_x + x < this.filed_max_x) {
            this.GameField[this.player_y + y][this.player_x + x] = this.gameObject[y][x]
          }
      }
    }
  }

  private Stuck() {
    for(let x = 0; x < 4; x++) {
      for(let y = 0; y < 4; y++) {
          if (this.player_y + y < this.filed_max_y &&
              this.player_x + x < this.filed_max_x &&
              this.gameObject[y][x] === 1) {
            this.GameField[this.player_y + y][this.player_x + x] = 2
          }
      }
    }

    const cleanedYs = this.CleanMatch();
    if (cleanedYs.length > 0) {
      cleanedYs.forEach(element => {
        this.MoveFieldDown(element);
      });
    }

    this.player_y = 0;
    this.gameObject = this.GetGameBlock(this.GetNextObject())
  }

  private GetNextObject(): GameBlockType
  {
    const next =  this.nextObject ?? Math.floor(Math.random() * (5 + 1));
    this.nextObject = undefined;
    return next;
  }

  private MoveFieldDown(lineNumber: number) {
    this.GameField.splice(lineNumber, 1);
    this.GameField.unshift(new Array(this.filed_max_x).fill(0));
  }

  private CleanMatch(): number[] {
    let cleanedYs: number[] = new Array(0);
    let lineSum = 0;
    for(let y = 0; y < this.filed_max_y; y++) {
      for(let x = 0; x < this.filed_max_x; x++) {
        if (this.GameField[y][x] !== 2) {
          break;
        }

        lineSum++;
      }

      if (lineSum === this.filed_max_x) {
        cleanedYs.push(y);
        for(let x = 0; x < this.filed_max_x; x++) {
          this.GameField[y][x] = 0;
        }
      }

      lineSum = 0;
    }

    return cleanedYs;
  }

  private GetGameBlock(gameBlockType: GameBlockType): number[][] {
    const gameBlock = new Array(4).fill(0).map(() => new Array(4).fill(0));

    switch (gameBlockType) {
        case GameBlockType.Square:
          gameBlock[0][0] = 1;
          gameBlock[0][1] = 1;
          gameBlock[1][0] = 1;
          gameBlock[1][1] = 1;
          break;
        case GameBlockType.ZLeft:
          gameBlock[0][2] = 1;
          gameBlock[1][2] = 1;
          gameBlock[1][1] = 1;
          gameBlock[2][1] = 1;
          break;
        case GameBlockType.ZRight:
          gameBlock[0][1] = 1;
          gameBlock[1][1] = 1;
          gameBlock[1][2] = 1;
          gameBlock[2][2] = 1;
          break;
        case GameBlockType.LLeft:
          gameBlock[0][0] = 1;
          gameBlock[1][0] = 1;
          gameBlock[1][1] = 1;
          gameBlock[1][2] = 1;
          break;
        case GameBlockType.LRight:
          gameBlock[2][0] = 1;
          gameBlock[1][0] = 1;
          gameBlock[1][1] = 1;
          gameBlock[1][2] = 1;
          break;
        case GameBlockType.Line:
          gameBlock[1][0] = 1;
          gameBlock[1][1] = 1;
          gameBlock[1][2] = 1;
          gameBlock[1][3] = 1;
          break;
      }

      return gameBlock;
    }

    private RotateCW(mat: number[][]): number[][] {
      const M = 4;
      const N = 4;
      const ret = new Array(4).fill(0).map(() => new Array(4).fill(0));
      for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            ret[c][M-1-r] = mat[r][c];
        }
      }
      return ret;
  }
}

class MoveCheck {
  public canMove: boolean = true;
  public shouldStuck: boolean = false;
}

export default Game;