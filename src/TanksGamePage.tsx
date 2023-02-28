import React from 'react';
import SpriteAccessor from './SpriteAccessor';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class TanksGamePage extends React.Component<{ spriteAccessor: SpriteAccessor, game: TanksGame }, { }> {
  private readonly game: TanksGame;
  private readonly spriteAccessor: SpriteAccessor;
  private gameTimer?: NodeJS.Timer;
  private playerContext?: CanvasRenderingContext2D;

  constructor(props: { spriteAccessor: SpriteAccessor, game: TanksGame}) {
    super(props);
    this.spriteAccessor = props.spriteAccessor;
    this.game = props.game;

    
  }

  componentDidMount() {
    if (!this.gameTimer)
    {
      this.gameTimer = setInterval(() => {
        this.game.Tic();
        this.renderGameObjects();
      }, 20)

      window.addEventListener("keydown", this.onKeyPress.bind(this));
    }

    this.spriteAccessor.Initialize();
    const tanksCanvasElement = window.document.getElementById("tanksCanvas");
    const playerCanvasElement = window.document.getElementById("playerCanvas");
    if (tanksCanvasElement === null || playerCanvasElement == null)
    {
      throw new Error("Image or canvas for sprite not found");
    }

    const tanksCanvas = tanksCanvasElement as HTMLCanvasElement;
    const context2d = tanksCanvas.getContext("2d") as CanvasRenderingContext2D;

    for (let y = 0; y < this.game.GameField.GameField.length; y++) {
      for (let x = 0; x < this.game.GameField.GameField[y].length; x++) {
        context2d.putImageData(this.spriteAccessor.getImage(null, 0, this.game.GameField.GameField[y][x]), x * this.spriteAccessor.spriteSize, y * this.spriteAccessor.spriteSize);
      }
    }

    const playerCanvas = playerCanvasElement as HTMLCanvasElement;
    this.playerContext = playerCanvas.getContext("2d") as CanvasRenderingContext2D;
  }

  private renderGameObjects()
  {
    if (!this.playerContext)
    {
      return;
    }

    const imageData = this.spriteAccessor.getImage(this.game.Player1.Direction, this.game.Player1.Sprite_iteraction, Enums.GameBlockType.Player1);
    this.playerContext.putImageData(
      imageData,
      this.game.Player1.Abs_xx,
      this.game.Player1.Abs_yy);

    if (this.game.Fire1 !== undefined)
    {
      const imageData = this.spriteAccessor.getImage(this.game.Fire1.Direction, 0, Enums.GameBlockType.Fire);
      this.playerContext.putImageData(
        imageData,
        this.game.Fire1.Abs_xx,
        this.game.Fire1.Abs_yy);
    }
  }

  private onKeyPress(e: globalThis.KeyboardEvent) {
    if (e.code === "Space") {
      this.game.Fire();
    }

    if (e.code === "ArrowRight") {
      this.game.MoveRight();
    }

    if (e.code === "ArrowLeft") {
      this.game.MoveLeft();
    }

    if (e.code === "ArrowDown") {
      this.game.MoveDown();
    }

    if (e.code === "ArrowUp") {
      this.game.MoveUp();
    }
  }

  render() {
    return (
      <div>
        <div className="canvaField">
            <canvas id="tanksCanvas" className='tanksCanva canvaField1' width="350" height="350"></canvas>
            <canvas id="playerCanvas" className='tanksCanva canvaField2' width="350" height="350"></canvas>
            <canvas id="tanksSpriteCanvas" className='tanksCanva2' width="672" height="336" hidden></canvas>
        </div>
      </div>
    );
  }
}

export default TanksGamePage;
