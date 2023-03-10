import React from 'react';
import PlayerState from './PlayerState';
import SpriteAccessor from './SpriteAccessor';
import TanksGame from './TanksGame';
import Enums from './TanksGameEnums';

class TanksGamePage extends React.Component<{ spriteAccessor: SpriteAccessor, game: TanksGame }, { }> {
  private readonly game: TanksGame;
  private readonly spriteAccessor: SpriteAccessor;
  private gameTimer?: NodeJS.Timer;
  private renderTimer?: NodeJS.Timer;
  private keyMap: string[] = [];

  private backStaticCanvas?: HTMLCanvasElement;
  private lowChangesCanvas?: HTMLCanvasElement;
  private playerCanvas?: HTMLCanvasElement;
  private pacmanCanvas?: HTMLCanvasElement;
  private fireCanvas?: HTMLCanvasElement;

  private backStaticContext?: CanvasRenderingContext2D;
  private lowChangesContext?: CanvasRenderingContext2D;
  private playerContext?: CanvasRenderingContext2D;
  private pacmanContext?: CanvasRenderingContext2D;
  private fireContext?: CanvasRenderingContext2D;

  constructor(props: { spriteAccessor: SpriteAccessor, game: TanksGame}) {
    super(props);
    this.spriteAccessor = props.spriteAccessor;
    this.game = props.game;
  }

  componentDidMount() {
    if (!this.gameTimer) {
      this.gameTimer = setInterval(() => {
        this.pressKeys();
        this.game.tic();
        this.renderGameObjects();
      }, 20)
    }

    if (!this.renderTimer) {
      this.renderTimer = setInterval(() => {
        this.renderGameObjects();
      }, 20)

      window.addEventListener("keydown", this.onKeyPress.bind(this));
      window.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    this.spriteAccessor.Initialize();
    const backStaticElement = window.document.getElementById("backStaticCanvas");
    const lowChangesCanvasElement = window.document.getElementById("lowChangesCanvas");
    const playerCanvasElement = window.document.getElementById("playerCanvas");
    const pacmanCanvasElement = window.document.getElementById("pacmanCanvas");
    const fireCanvasElement = window.document.getElementById("fireCanvas");

    if (backStaticElement === null
      || lowChangesCanvasElement === null
      || playerCanvasElement === null
      || pacmanCanvasElement === null
      || fireCanvasElement === null)
    {
      throw new Error("Image or canvas for sprite not found");
    }
      
    this.backStaticCanvas = backStaticElement as HTMLCanvasElement;
    this.lowChangesCanvas = lowChangesCanvasElement as HTMLCanvasElement;
    this.playerCanvas = playerCanvasElement as HTMLCanvasElement;
    this.pacmanCanvas = pacmanCanvasElement as HTMLCanvasElement;
    this.fireCanvas = fireCanvasElement as HTMLCanvasElement;
    
    this.backStaticContext = this.backStaticCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.lowChangesContext = this.lowChangesCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.playerContext = this.playerCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.pacmanContext = this.pacmanCanvas.getContext("2d") as CanvasRenderingContext2D;
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

  private pressKeys() {
    for (let index = 0; index < this.keyMap.length; index++) {
      const code = this.keyMap[index];     
      if (code === "ArrowRight") {
        this.game.moveRight();
        break;
      }
      
      if (code === "ArrowLeft") {
        this.game.moveLeft();
        break;
      }
      
      if (code === "ArrowDown") {
        this.game.moveDown();
        break;
      }
      
      if (code === "ArrowUp") {
        this.game.moveUp();
        break;
      }
    }
  }

  private renderGameObjects() {
    if (!this.playerContext
      || !this.lowChangesContext
      || !this.playerCanvas
      || !this.pacmanCanvas
      || !this.pacmanContext
      || !this.fireContext
      || !this.lowChangesCanvas
      || !this.fireCanvas) {
      return;
    }

    this.lowChangesContext.fillStyle = "rgba(0, 0, 1, 0)";
    this.playerContext.fillStyle = "rgba(0, 0, 1, 0)";
    this.pacmanContext.fillStyle = "rgba(0, 0, 1, 0)";
    this.fireContext.fillStyle = "rgba(0, 0, 1, 0)";
    this.lowChangesContext.clearRect(0, 0, this.lowChangesCanvas.width, this.lowChangesCanvas.height);
    this.playerContext.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);
    this.pacmanContext.clearRect(0, 0, this.pacmanCanvas.width, this.pacmanCanvas.height);
    this.fireContext.clearRect(0, 0, this.fireCanvas.width, this.fireCanvas.height);

    for (let index = 0; index < this.game.GameField.gameField.length; index++) {
      const gameObject = this.game.GameField.gameField[index];
      if (gameObject.GameObjectType === Enums.GameObjectType.ConcreteWall1)
      {
        continue;
      }

      if (gameObject.GameObjectType === Enums.GameObjectType.TankType1)
      {
        const tankImageData = this.spriteAccessor.getImage(gameObject);
        this.playerContext.putImageData(
          tankImageData,
          gameObject.X1,
          gameObject.Y1);
        continue;
      }

      if (gameObject.GameObjectType === Enums.GameObjectType.PacMan1)
      {
        const pacmanImageData = this.spriteAccessor.getImage(gameObject);
        this.pacmanContext.putImageData(
          pacmanImageData,
          gameObject.X1,
          gameObject.Y1);
        continue;
      }

      
      if (gameObject.GameObjectType === Enums.GameObjectType.Fire)
      {
        const imageData = this.spriteAccessor.getImage(gameObject);
        this.fireContext.putImageData(
          imageData,
          gameObject.X1,
          gameObject.Y1);
        continue;
      }

      if (gameObject.GameObjectType === Enums.GameObjectType.Explosion)
      {
        const imageData = this.spriteAccessor.getImage(gameObject);
        this.fireContext.putImageData(
          imageData,
          gameObject.X1,
          gameObject.Y1);
        continue;
      }

      const imageData = this.spriteAccessor.getImage(gameObject);

      this.lowChangesContext.putImageData(
        imageData,
        gameObject.X1,
        gameObject.Y1);
    }
  }

  private onKeyPress(e: globalThis.KeyboardEvent) {
    if (e.code === "Space") {
      this.game.fire();
    }

    if (!this.keyMap.find((_) => _ === e.code)) {
      this.keyMap.push(e.code);
    }
  }

  private onKeyUp(e: globalThis.KeyboardEvent) {
    this.keyMap = this.keyMap.filter((_) => _ !== e.code);
  }

  render() {
    return (
      <div>
        <PlayerState player={this.game.Player1} />
        <div className="canvaField tanksCanva2">
          <div className="canvaField1 tanksCanva2">
              <canvas id="backStaticCanvas" className='tanksCanva' style={{zIndex:0}} width="352" height="352"></canvas>
              <canvas id="lowChangesCanvas" className='tanksCanva canvaField2' style={{zIndex:1}}  width="352" height="352"></canvas>
              <canvas id="playerCanvas" className='tanksCanva canvaField2' style={{zIndex:2}}  width="352" height="352"></canvas>
              <canvas id="pacmanCanvas" className='tanksCanva canvaField2' style={{zIndex:3}}  width="352" height="352"></canvas>
              <canvas id="fireCanvas" className='tanksCanva canvaField2' style={{zIndex:4}}  width="352" height="352"></canvas>
          </div>
        </div>
            <canvas id="tanksSpriteCanvas" className='tanksCanva2' width="672" height="336" hidden></canvas>
            <canvas id="pacmanSpriteCanvas" className='tanksCanva2' width="239" height="231" hidden></canvas>
      </div>
    );
  }
}

export default TanksGamePage;
