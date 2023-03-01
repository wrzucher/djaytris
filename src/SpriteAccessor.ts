import IGameObject from './IGameObject';
import Enums from './TanksGameEnums';

class SpriteAccessor {

  private sprite?: HTMLCanvasElement;
  private renderingContex?: CanvasRenderingContext2D;
  private readonly spriteAmountMaxX = 24;
  private readonly spriteAmountMaxY = 15;
  
  public readonly spriteSize: number = 16;
  public readonly fireSpriteSize: number = 5;

  public Initialize() {
    const image = window.document.getElementById("tanksSprite");
    const canvas = window.document.getElementById("tanksSpriteCanvas");
    if (image === null && canvas === null)
    {
      throw new Error("Image or canvas for sprite not found");
    }

    var imageElement = image as HTMLImageElement;
    this.sprite = canvas as HTMLCanvasElement;
    this.renderingContex = this.sprite?.getContext("2d") as CanvasRenderingContext2D;
    this.renderingContex.drawImage(imageElement, 0, 0);

    const imageData = this.renderingContex.getImageData(0, 0, this.sprite.width, this.sprite.height);
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

    this.renderingContex.putImageData(imageData, 0, 0);
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

      if (!this.renderingContex)
      {
        throw new Error("Image or canvas for sprite not found");
      }

      return this.renderingContex.getImageData(
        x,
        y,
        this.fireSpriteSize,
        this.fireSpriteSize);
    }

    const startPosition = this.getStartPosition(gameObject.GameObjectType);
    const directionIncrement = this.getDirectionIncrement(gameObject.Direction);

    const currentPosition = startPosition + gameObject.SpriteIteraction + directionIncrement;
    return this.getRawSprite(currentPosition);
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
        throw new Error(`Direction ${gameBlockType} doesn't exist`);
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
        return 0;
    }
  }

  private getRawSprite(spriteNumber: number): ImageData {
    let x = 0;
    let y = 0;

    let i = this.spriteAmountMaxY;

    do {
      i--;
    } while (spriteNumber < this.spriteAmountMaxX * i);

    y = i;
    x = spriteNumber - this.spriteAmountMaxX * y;

    if (!this.renderingContex)
    {
      throw new Error("Image or canvas for sprite not found");
    }

    return this.renderingContex.getImageData(
      this.spriteSize * x,
      this.spriteSize * y,
      this.spriteSize,
      this.spriteSize);
  }
}

export default SpriteAccessor;