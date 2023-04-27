import Game from './Game';
import GameBlockType from './GameBlockType';

test('We can create any game field', () => {
  // Arrange
  const filed_max_x = 21;
  const filed_max_y = 22;
  const gameField = new Array(filed_max_y).fill(0).map(() => new Array(filed_max_x).fill(0));

  // Act
  const game = new Game(gameField, GameBlockType.Square);

  // Assert
  expect(game.GameField.length).toBe(22);
  expect(game.GameField[0].length).toBe(21);
});

test('Object should appear on first line', () => {
  // Arrange
  const gameField = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ];
  const game = new Game(gameField, GameBlockType.Square, 2, 0);

  // Act
  game.Initialize();

  // Assert
  expect(game.GameField).toStrictEqual([
    [0,0,1,1,0],
    [0,0,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ]);
});

test('Object should freeze after stuck and start from top', () => {
  // Arrange
  const gameField = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ];
  const player_y = 3; // Player almost on the ground
  const game = new Game(gameField, GameBlockType.Square, 2, player_y);
  game.Initialize();
  game.SetNextObject(GameBlockType.Square);

  // Act
  game.Tic();

  // Assert
  expect(game.GameField).toStrictEqual([
    [0,0,1,1,0],
    [0,0,1,1,0],
    [0,0,0,0,0],
    [0,0,2,2,0],
    [0,0,2,2,0],
  ]);
});

test('We can reverse object', () => {
  // Arrange
  const gameField = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ];
  const player_y = 1; // Player almost on the ground
  const game = new Game(gameField, GameBlockType.Line, 0, player_y);
  game.Initialize();

  // Act
  game.RotateLeft();

  // Assert
  expect(game.GameField).toStrictEqual([
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
  ]);
});

test('Object does not move right beyond the edge', () => {
  // Arrange
  const gameField = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ];
  const player_y = 1; // Player almost on the ground
  const game = new Game(gameField, GameBlockType.Line, 2, player_y);
  game.Initialize();

  // Act
  game.MoveRight();

  // Assert
  expect(game.GameField).toStrictEqual([
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,1],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ]);
});

test('Object does not move left beyond the edge', () => {
  // Arrange
  const gameField = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ];
  const player_y = 0; // Player almost on the ground
  const game = new Game(gameField, GameBlockType.Square, 0, player_y);
  game.Initialize();

  // Act
  game.MoveLeft();

  // Assert
  expect(game.GameField).toStrictEqual([
    [1,1,0,0,0],
    [1,1,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ]);
});

test('Object does not go down beyond the edge', () => {
  // Arrange
  const gameField = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ];
  const player_y = 3; // Player almost on the ground
  const game = new Game(gameField, GameBlockType.LLeft, 0, player_y);
  game.Initialize();
  game.SetNextObject(GameBlockType.LLeft)

  // Act
  game.MoveDown();

  // Assert
  expect(game.GameField).toStrictEqual([
    [1,0,0,0,0],
    [1,1,1,0,0],
    [0,0,0,0,0],
    [2,0,0,0,0],
    [2,2,2,0,0],
  ]);
});
test('If there is one full line, this line should disappear ', () => {
  // Arrange
  const gameField = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ];
  const player_y = 3; // Player almost on the ground
  const game = new Game(gameField, GameBlockType.LLeft, 0, player_y);
  game.Initialize();
  game.SetNextObject(GameBlockType.Line);
  game.MoveDown();
  game.MoveRight();
  game.MoveDown();
  game.MoveDown();
  
  // Act
  game.SetNextObject(GameBlockType.Square);
  game.MoveDown();

  // Assert
  expect(game.GameField).toStrictEqual([
    [0,1,1,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [2,2,2,0,0],
  ]);
});