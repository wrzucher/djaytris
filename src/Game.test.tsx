import Game from './Game';

test('We can create any game field', () => {
  // Arrange
  const filed_max_x = 21;
  const filed_max_y = 22;

  // Act
  const game = new Game(filed_max_y, filed_max_x);

  // Assert
  expect(game.GameField.length).toBe(22);
  expect(game.GameField[0].length).toBe(21);
});
