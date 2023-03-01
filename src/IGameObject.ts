import Enums from './TanksGameEnums';

interface IGameObject
{
  readonly spriteSize: number;
  get AbsXx(): number;
  get AbsYy(): number;
  get Direction(): Enums.DirectionType;
  get SpriteIteraction(): number;
  get SpriteType(): Enums.GameSpriteType;
  get GameObjectType(): Enums.GameObjectType;

  tic(): void;
}

export default IGameObject;