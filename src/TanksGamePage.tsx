import React from 'react';
import SpriteAccessor from './SpriteAccessor';
import TanksGame from './TanksGame';
import GameBlockType from './TanksGameEnums';

class TanksGamePage extends React.Component<{}, { }> {
  private readonly game: TanksGame;
  private readonly spriteAccessor: SpriteAccessor;
  private gameTimer?: NodeJS.Timer;

  constructor(props: {}) {
    super(props);
    this.game = new TanksGame(20, 20);
    this.spriteAccessor = new SpriteAccessor();

    window.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  componentDidMount() {
    if (!this.gameTimer)
    {
      this.gameTimer = setInterval(() => {
        this.game.Tic();
      }, 1000)
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

    for (let y = 0; y < this.game.GameField.length; y++) {
      for (let x = 0; x < this.game.GameField[y].length; x++) {
        context2d.putImageData(this.spriteAccessor.getImage(0, this.game.GameField[y][x]), x * this.spriteAccessor.spriteSize, y * this.spriteAccessor.spriteSize);
      }
    }

    const playerCanvas = playerCanvasElement as HTMLCanvasElement;
    const playerContext2d = playerCanvas.getContext("2d") as CanvasRenderingContext2D;
    const imageData = this.spriteAccessor.getImage(0, GameBlockType.Player1);
    playerContext2d.putImageData(imageData, 10 * this.spriteAccessor.spriteSize, 10 * this.spriteAccessor.spriteSize);
  }

  private onKeyPress(e: globalThis.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      this.game.MoveRight();
    }

    if (e.key === "ArrowLeft") {
      this.game.MoveLeft();
    }

    if (e.key === "ArrowDown") {
      this.game.MoveDown();
    }

    if (e.key === "ArrowUp") {
      this.game.MoveUp();
    }
  }

  render() {
    return (
      <div>
        <div className="canvaField">
            <canvas id="tanksCanvas" className='tanksCanva canvaField1' width="2000" height="2000"></canvas>
            <canvas id="playerCanvas" className='tanksCanva2 canvaField2' width="2000" height="2000"></canvas>
        </div>
        <canvas id="tanksSpriteCanvas" width="672" height="336" hidden></canvas>
      </div>
    );
  }
}

export default TanksGamePage;
