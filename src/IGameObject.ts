import Enums from './TanksGameEnums';

interface IGameObject
{
  readonly spriteSize: number;
  get X1(): number;
  get Y1(): number;
  get X2(): number;
  get Y2(): number;
  get Direction(): Enums.DirectionType;
  get SpriteIteraction(): number;
  get SpriteType(): Enums.GameSpriteType;
  get GameObjectType(): Enums.GameObjectType;

  tic(): void;
  interaction(initiator: IGameObject): void;
}

export default IGameObject;