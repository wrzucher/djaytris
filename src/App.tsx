import React from 'react';
import './App.css';
import Game from './Game';
import GameField from './GameField';

class App extends React.Component<{}, { gameField: number[][] }> {
  private Game: Game;
  
  constructor(props: {}) {
    super(props);
    this.Game = new Game(20, 10);
    this.state = {gameField: this.Game.GameField };
    setInterval(() => {
      this.Game.Tic();
      this.setState({
        gameField : this.Game.GameField,
      })
    }, 2000)

    window.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  private onKeyPress(e: globalThis.KeyboardEvent) {
    if (e.key === "ArrowRight")
    {
      this.Game.MoveRight();
      this.setState({
        gameField : this.Game.GameField,
      })
    }

    if (e.key === "ArrowLeft")
    {
      this.Game.MoveLeft();
      this.setState({
        gameField : this.Game.GameField,
      })
    }

    if (e.key === "ArrowDown")
    {
      this.Game.MoveDown();
      this.setState({
        gameField : this.Game.GameField,
      })
    }

    if (e.key === "ArrowUp")
    {
      this.Game.RotateLeft();
      this.setState({
        gameField : this.Game.GameField,
      })
    }
  }

  render() {
    return (
      <div className="App">
        <GameField gameField={this.state.gameField} />
      </div>
    );
    }
}

export default App;
