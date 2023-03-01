import React from 'react';
import SpriteAccessor from './SpriteAccessor';
import TanksGame from './TanksGame';

class TanksGamePage extends React.Component<{ spriteAccessor: SpriteAccessor, game: TanksGame }, { }> {
  private readonly game: TanksGame;
  private readonly spriteAccessor: SpriteAccessor;
  private gameTimer?: NodeJS.Timer;
  private playerCanvas?: HTMLCanvasElement;
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
        this.game.tic();
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

    for (let index = 0; index < this.game.GameField.gameField.length; index++) {
      const wall = this.game.GameField.gameField[index];
      const imageData = this.spriteAccessor.getImage(wall);

      context2d.putImageData(
        imageData,
        wall.X1,
        wall.Y1);
    }

    for (let y = 0; y < this.game.GameField.GameField.length; y++) {
      for (let x = 0; x < this.game.GameField.GameField[y].length; x++) {

        // context2d.putImageData(this.spriteAccessor.getImage(null, 0, this.game.GameField.GameField[y][x]), x * this.spriteAccessor.spriteSize, y * this.spriteAccessor.spriteSize);
      }
    }

    this.playerCanvas = playerCanvasElement as HTMLCanvasElement;
    this.playerContext = this.playerCanvas.getContext("2d") as CanvasRenderingContext2D;
  }

  private renderGameObjects()
  {
    if (!this.playerContext)
    {
      return;
    }

    if (!this.playerCanvas)
    {
      return;
    }

    this.playerContext.fillStyle = "rgba(0, 0, 1, 0)";
    this.playerContext.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);

    const imageData = this.spriteAccessor.getImage(this.game.Player1);
    this.playerContext.putImageData(
      imageData,
      this.game.Player1.X1,
      this.game.Player1.Y1);

    if (this.game.Fire1 !== undefined)
    {
      const imageData = this.spriteAccessor.getImage(this.game.Fire1);
      this.playerContext.putImageData(
        imageData,
        this.game.Fire1.X1,
        this.game.Fire1.Y1);
    }

    if (this.game.ExplosionObject1 !== undefined)
    {
      const imageData = this.spriteAccessor.getImage(this.game.ExplosionObject1);
      this.playerContext.putImageData(
        imageData,
        this.game.ExplosionObject1.X1,
        this.game.ExplosionObject1.Y1);
    }
  }

  private onKeyPress(e: globalThis.KeyboardEvent) {
    if (e.code === "Space") {
      this.game.fire();
    }

    if (e.code === "ArrowRight") {
      this.game.moveRight();
    }

    if (e.code === "ArrowLeft") {
      this.game.moveLeft();
    }

    if (e.code === "ArrowDown") {
      this.game.moveDown();
    }

    if (e.code === "ArrowUp") {
      this.game.moveUp();
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
