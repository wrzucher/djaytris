import React from 'react';
import Game from './Game';
import TetrisGameField from './TetrisGameField';

class TetrisGame extends React.Component<{}, { gameField: number[][] }> {
  private readonly game: Game;
  private gameTimer?: NodeJS.Timer;
  
  
  constructor(props: {}) {
    super(props);
    const initialField = new Array(20).fill(0).map(() => new Array(10).fill(0));
    const firstRandom = Math.floor(Math.random() * (5 + 1));
    this.game = new Game(initialField, firstRandom);
    this.game.Initialize();
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
        <TetrisGameField gameField={this.state.gameField} />
      </div>
    );
  }
}

export default TetrisGame;
