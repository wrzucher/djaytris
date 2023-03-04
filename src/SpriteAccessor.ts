import IGameObject from './IGameObject';
import Enums from './TanksGameEnums';

class SpriteAccessor {

  private tanksSpriteContex?: CanvasRenderingContext2D;
  private pacmanSpriteContex?: CanvasRenderingContext2D;
  private readonly tanksSpriteAmountMaxX = 24;
  private readonly tanksSpriteAmountMaxY = 15;
  private readonly pacmanSpriteAmountMaxX = 14;
  private readonly pacmanSpriteAmountMaxY = 15;
  
  public readonly spriteSize: number = 16;
  public readonly fireSpriteSize: number = 5;

  public Initialize() {
    const tanksSprite = window.document.getElementById("tanksSprite");
    const pacmanSprites = window.document.getElementById("pacmanSprites");
    const tanksSpriteCanvas = window.document.getElementById("tanksSpriteCanvas");
    const pacmanSpriteCanvas = window.document.getElementById("pacmanSpriteCanvas");
    if (tanksSprite === null || tanksSpriteCanvas === null || pacmanSprites === null || pacmanSpriteCanvas === null)
    {
      throw new Error("Image or canvas for sprite not found");
    }

    const tanksImageElement = tanksSprite as HTMLImageElement;
    const pacmanImageElement = pacmanSprites as HTMLImageElement;
    const tanksSpriteElement = tanksSpriteCanvas as HTMLCanvasElement;
    const pacmanSpriteElement = pacmanSpriteCanvas as HTMLCanvasElement;
    this.tanksSpriteContex = tanksSpriteElement.getContext("2d") as CanvasRenderingContext2D;
    this.pacmanSpriteContex = pacmanSpriteElement.getContext("2d") as CanvasRenderingContext2D;
    this.tanksSpriteContex.drawImage(tanksImageElement, 0, 0);
    this.pacmanSpriteContex.drawImage(pacmanImageElement, 0, 0);

    const tanksImageData = this.tanksSpriteContex.getImageData(0, 0, tanksSpriteElement.width, tanksSpriteElement.height);
    const pacmanImageData = this.pacmanSpriteContex.getImageData(0, 0, tanksSpriteElement.width, tanksSpriteElement.height);
    this.applyTransparency(tanksImageData);
    this.applyTransparency(pacmanImageData);

    this.tanksSpriteContex.putImageData(tanksImageData, 0, 0);
    this.pacmanSpriteContex.putImageData(pacmanImageData, 0, 0);
  }

  public getValidSpriteIteraction(currentSpriteIneraction: number, gameBlockType: Enums.GameObjectType): number {
    switch (gameBlockType) {
      case Enums.GameObjectType.Ground:
        return 0;
      case Enums.GameObjectType.TankType1:
        var next = currentSpriteIneraction++;
        if (currentSpriteIneraction > 1)
        {
          next = 0;
        }

        return next;
      case Enums.GameObjectType.ConcreteWall1:
        return 0;
      case Enums.GameObjectType.BreakWall1:
        return 0;
      case Enums.GameObjectType.Fire:
        return 0;
      default:
        throw new Error(`GameBlockType ${gameBlockType} doesn't exist`);
    }
  }

  public getImage(gameObject: IGameObject): ImageData {
    if (gameObject.GameObjectType === Enums.GameObjectType.Fire)
    {
      let y = 102;
      let x = 322;
      
      switch (gameObject.Direction) {
        case Enums.DirectionType.Up:
          // do not do anything
          break;
        case Enums.DirectionType.Left:
          x = 330;
          break;
        case Enums.DirectionType.Down:
          y--;
          x = 338;
          break;
        case Enums.DirectionType.Right:
          x = 345;
          break;
      
        default:
          throw new Error(`Incorrect direction ${gameObject.Direction}`);
      }

      if (!this.tanksSpriteContex)
      {
        throw new Error("Image or canvas for sprite not found");
      }

      return this.getImageData(
        gameObject.SpriteType,
        x,
        y,
        this.fireSpriteSize,
        this.fireSpriteSize);
    }

    let startPosition = 0;
    let directionIncrement = 0;
    if (gameObject.SpriteType === Enums.GameSpriteType.BattleCity)
    {
      startPosition = this.getStartPosition(gameObject.GameObjectType);
      directionIncrement = this.getDirectionIncrement(gameObject.Direction);
    }

    if (gameObject.SpriteType === Enums.GameSpriteType.PacMan)
    {
      startPosition = this.getPacManIncrement(gameObject.GameObjectType, gameObject.Direction);
    }

    const currentPosition = startPosition + gameObject.SpriteIteraction + directionIncrement;
    return this.getRawSprite(gameObject.SpriteType, currentPosition);
  }

  private getImageData(spriteType: Enums.GameSpriteType, x: number, y: number, dx: number, dy: number): ImageData
  {
    if (!this.tanksSpriteContex || !this.pacmanSpriteContex)
    {
      throw new Error("Image or canvas for sprite not found");
    }

    switch (spriteType) {
      case Enums.GameSpriteType.BattleCity:
        return this.tanksSpriteContex.getImageData(x, y, dx, dy);
      case Enums.GameSpriteType.PacMan:
        return this.pacmanSpriteContex.getImageData(x, y, dx, dy);
      default:
        throw new Error(`Unsupported type ${spriteType}`);
    }
  }

  private getStartPosition(gameBlockType: Enums.GameObjectType): number {
    switch (gameBlockType) {
      case Enums.GameObjectType.Ground:
        return 21;
      case Enums.GameObjectType.TankType1:
        return 0;
      case Enums.GameObjectType.BreakWall1:
        return 16;
      case Enums.GameObjectType.ConcreteWall1:
        return 40;
      case Enums.GameObjectType.Fire:
        return 0;
      case Enums.GameObjectType.Explosion:
        return 208;
      default:
        throw new Error(`Position ${gameBlockType} doesn't exist`);
    }
  }

  private getDirectionIncrement(direction: Enums.DirectionType | null): number {
    if (direction === null)
    {
      return 0;
    }

    switch (direction) {
      case Enums.DirectionType.Up:
        return 0;
      case Enums.DirectionType.Down:
        return 4;
      case Enums.DirectionType.Left:
        return 2;
      case Enums.DirectionType.Right:
        return 6;
      default:
        throw new Error(`Incorrect direction ${direction}!`);
    }
  }

  private getPacManIncrement(gameBlockType: Enums.GameObjectType, direction: Enums.DirectionType | null): number {

    switch (gameBlockType) {
      case Enums.GameObjectType.PacMan1:
        if (direction === null)
        {
          throw new Error(`Pacman ${gameBlockType} should have direction!`);
        }

        switch (direction) {
          case Enums.DirectionType.Up:
            return this.pacmanSpriteAmountMaxX * 7 + 8;
          case Enums.DirectionType.Down:
            return this.pacmanSpriteAmountMaxX * 8 + 8;
          case Enums.DirectionType.Left:
            return this.pacmanSpriteAmountMaxX * 6 + 8;
          case Enums.DirectionType.Right:
            return this.pacmanSpriteAmountMaxX * 5 + 8;
          default:
            throw new Error(`Incorrect direction ${direction}!`);
        }
      default:
        throw new Error(`Position ${gameBlockType} doesn't exist`);
    }
  }

  private getRawSprite(spriteType: Enums.GameSpriteType, spriteNumber: number): ImageData {
    let x = 0;
    let y = 0;

    let spriteAmountMaxY = 0;
    let spriteAmountMaxX = 0;

    switch (spriteType) {
      case Enums.GameSpriteType.BattleCity:
        spriteAmountMaxY = this.tanksSpriteAmountMaxY;
        spriteAmountMaxX = this.tanksSpriteAmountMaxX;
      break;
      case Enums.GameSpriteType.PacMan:
        spriteAmountMaxY = this.pacmanSpriteAmountMaxY;
        spriteAmountMaxX = this.pacmanSpriteAmountMaxX;
      break;
      default:
      throw new Error(`Unsupported type ${spriteType}`);
    }

    let i = spriteAmountMaxY;

    do {
      i--;
    } while (spriteNumber < spriteAmountMaxX * i);

    y = i;
    x = spriteNumber - spriteAmountMaxX * y;

    return this.getImageData(
      spriteType,
      this.spriteSize * x,
      this.spriteSize * y,
      this.spriteSize,
      this.spriteSize);
  }

  private applyTransparency(imageData: ImageData) {
    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        const offset = (y * imageData.width + x) * 4;
        const r = imageData.data[offset];
        const g = imageData.data[offset + 1];
        const b = imageData.data[offset + 2];

        if (r === 0 && g === 0 && b === 1) {
          imageData.data[offset + 3] = 0;
        }
      }
    }
  }
}

export default SpriteAccessor;