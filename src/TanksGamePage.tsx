import React from 'react';
import SpriteAccessor from './SpriteAccessor';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class TanksGamePage extends React.Component<{ spriteAccessor: SpriteAccessor, game: TanksGame }, { }> {
  private readonly game: TanksGame;
  private readonly spriteAccessor: SpriteAccessor;
  private gameTimer?: NodeJS.Timer;

  private backStaticCanvas?: HTMLCanvasElement;
  private lowChangesCanvas?: HTMLCanvasElement;
  private playerCanvas?: HTMLCanvasElement;
  private fireCanvas?: HTMLCanvasElement;

  private backStaticContext?: CanvasRenderingContext2D;
  private lowChangesContext?: CanvasRenderingContext2D;
  private playerContext?: CanvasRenderingContext2D;
  private fireContext?: CanvasRenderingContext2D;

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
    const backStaticElement = window.document.getElementById("backStaticCanvas");
    const lowChangesCanvasElement = window.document.getElementById("lowChangesCanvas");
    const playerCanvasElement = window.document.getElementById("playerCanvas");
    const fireCanvasElement = window.document.getElementById("fireCanvas");

    if (backStaticElement === null
      || lowChangesCanvasElement === null
      || lowChangesCanvasElement === null
      || fireCanvasElement === null)
    {
      throw new Error("Image or canvas for sprite not found");
    }
      
    this.backStaticCanvas = backStaticElement as HTMLCanvasElement;
    this.lowChangesCanvas = lowChangesCanvasElement as HTMLCanvasElement;
    this.playerCanvas = playerCanvasElement as HTMLCanvasElement;
    this.fireCanvas = fireCanvasElement as HTMLCanvasElement;
    
    this.backStaticContext = this.backStaticCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.lowChangesContext = this.lowChangesCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.playerContext = this.playerCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.fireContext = this.fireCanvas.getContext("2d") as CanvasRenderingContext2D;
    
    this.backStaticContext.fillStyle = "rgba(0, 0, 0, 1)";
    this.backStaticContext.fillRect(0, 0, this.backStaticCanvas.width, this.backStaticCanvas.height);

    for (let index = 0; index < this.game.GameField.gameField.length; index++) {
      const wall = this.game.GameField.gameField[index];
      if (wall.GameObjectType !== Enums.GameObjectType.ConcreteWall1)
      {
        continue;
      }

      const imageData = this.spriteAccessor.getImage(wall);

      this.backStaticContext.putImageData(
        imageData,
        wall.X1,
        wall.Y1);
    }
  }

  private renderGameObjects()
  {
    if (!this.playerContext
      || !this.lowChangesContext
      || !this.playerCanvas
      || !this.fireContext
      || !this.lowChangesCanvas
      || !this.fireCanvas)
    {
      return;
    }

    this.lowChangesContext.fillStyle = "rgba(0, 0, 1, 0)";
    this.playerContext.fillStyle = "rgba(0, 0, 1, 0)";
    this.fireContext.fillStyle = "rgba(0, 0, 1, 0)";
    this.lowChangesContext.clearRect(0, 0, this.lowChangesCanvas.width, this.lowChangesCanvas.height);
    this.playerContext.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);
    this.fireContext.clearRect(0, 0, this.fireCanvas.width, this.fireCanvas.height);

    for (let index = 0; index < this.game.GameField.gameField.length; index++) {
      const wall = this.game.GameField.gameField[index];
      if (wall.GameObjectType === Enums.GameObjectType.ConcreteWall1)
      {
        continue;
      }

      const imageData = this.spriteAccessor.getImage(wall);

      this.lowChangesContext.putImageData(
        imageData,
        wall.X1,
        wall.Y1);
    }

    const imageData = this.spriteAccessor.getImage(this.game.Player1);
    this.playerContext.putImageData(
      imageData,
      this.game.Player1.X1,
      this.game.Player1.Y1);

    if (this.game.Fire1 !== undefined)
    {
      const imageData = this.spriteAccessor.getImage(this.game.Fire1);
      this.fireContext.putImageData(
        imageData,
        this.game.Fire1.X1,
        this.game.Fire1.Y1);
    }

    if (this.game.ExplosionObject1 !== undefined)
    {
      const imageData = this.spriteAccessor.getImage(this.game.ExplosionObject1);
      this.fireContext.putImageData(
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
            <canvas id="backStaticCanvas" className='tanksCanva' style={{zIndex:0}} width="352" height="352"></canvas>
            <canvas id="lowChangesCanvas" className='tanksCanva canvaField2' style={{zIndex:1}}  width="352" height="352"></canvas>
            <canvas id="playerCanvas" className='tanksCanva canvaField2' style={{zIndex:2}}  width="352" height="352"></canvas>
            <canvas id="fireCanvas" className='tanksCanva canvaField2' style={{zIndex:3}}  width="352" height="352"></canvas>
            <canvas id="tanksSpriteCanvas" className='tanksCanva2' width="672" height="336" hidden></canvas>
        </div>
      </div>
    );
  }
}

export default TanksGamePage;
