import GameBlockType from './TanksGameEnums';

class SpriteAccessor {

  private sprite?: HTMLCanvasElement;
  private renderingContex?: CanvasRenderingContext2D;
  private readonly sprite_amount_max_x = 8;
  private readonly sprite_amount_max_y = 4;
  
  public readonly spriteSize: number = 84;

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
        // if it is pure white, change its alpha to 0
        if (r == 255 && g == 255 && b == 255) {
          imageData.data[offset + 3] = 0;
        }
      }
    }

    this.renderingContex.putImageData(imageData, 0, 0);
  }

  public getValidSpriteIteraction(current_sprite_ineraction: number, gameBlockType: GameBlockType): number {
    switch (gameBlockType) {
      case GameBlockType.Ground:
        return 0;
      case GameBlockType.Player1:
        var next = current_sprite_ineraction++;
        if (current_sprite_ineraction > 8)
        {
          next = 0;
        }

        return next;
      case GameBlockType.ConcreteWall1:
        return 0;
      case GameBlockType.ConcreteWall2:
          return 0;
      default:
        return 0;
    }
  }

  public getImage(sprite_ineraction: number, gameBlockType: GameBlockType): ImageData {
    const startPosition = this.getStartPosition(gameBlockType);
    const currentPosition = startPosition + sprite_ineraction;

    return this.getRawSprite(currentPosition);
  }

  public getStartPosition(gameBlockType: GameBlockType): number {
    switch (gameBlockType) {
      case GameBlockType.Ground:
        return 0;
      case GameBlockType.Player1:
        return 1;
      case GameBlockType.Wall1_1:
        return 24;
      case GameBlockType.ConcreteWall1:
        return 30;
      case GameBlockType.ConcreteWall2:
        return 31;
      default:
        return 0;
    }
  }

  private getRawSprite(spriteNumber: number): ImageData {
    let x = 0;
    let y = 0;

    let i = this.sprite_amount_max_y;

    do {
      i--;
    } while (spriteNumber < this.sprite_amount_max_x * i);

    y = i;
    x = spriteNumber - this.sprite_amount_max_x * y;

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