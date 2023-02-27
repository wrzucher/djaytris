import Enums from './TanksGameEnums';

interface IGameObject
{
  readonly spriteSize: number;
  get Abs_xx(): number;
  get Abs_yy(): number;
  get Direction(): Enums.DirectionType;
  get Sprite_iteraction(): number;

  Tic(): void;
}

export default IGameObject;