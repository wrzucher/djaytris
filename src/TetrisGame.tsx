import React from 'react';
import Game from './Game';
import GameField from './GameField';

class TetrisGame extends React.Component<{}, { gameField: number[][] }> {
  private readonly game: Game;
  private gameTimer?: NodeJS.Timer;
  
  
  constructor(props: {}) {
    super(props);
    this.game = new Game(50, 50);
    this.state = {gameField: this.game.GameField };    

    window.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  componentDidMount() {
    if (!this.gameTimer)
    {
      this.gameTimer = setInterval(() => {
        this.game.Tic();
        this.setState({
          gameField : this.game.GameField,
        })
      }, 1000)
    }
  }

  private onKeyPress(e: globalThis.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      this.game.MoveRight();
      this.setState({
        gameField : this.game.GameField,
      })
    }

    if (e.key === "ArrowLeft") {
      this.game.MoveLeft();
      this.setState({
        gameField : this.game.GameField,
      })
    }

    if (e.key === "ArrowDown") {
      this.game.MoveDown();
      this.setState({
        gameField : this.game.GameField,
      })
    }

    if (e.key === "ArrowUp") {
      this.game.RotateLeft();
      this.setState({
        gameField : this.game.GameField,
      })
    }
  }

  render() {
    return (
      <div>
        <GameField gameField={this.state.gameField} />
      </div>
    );
  }
}

export default TetrisGame;
