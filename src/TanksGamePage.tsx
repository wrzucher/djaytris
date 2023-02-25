import React from 'react';
import TanksGame from './TanksGame';

class TanksGamePage extends React.Component<{}, { }> {
  private readonly game: TanksGame;
  private gameTimer?: NodeJS.Timer;
  
  constructor(props: {}) {
    super(props);
    this.game = new TanksGame(20, 10);

    window.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  componentDidMount() {
    if (!this.gameTimer)
    {
      this.gameTimer = setInterval(() => {
        this.game.Tic();
      }, 1000)
    }
  }

  private onKeyPress(e: globalThis.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      this.game.MoveRight();
    }

    if (e.key === "ArrowLeft") {
      this.game.MoveLeft();
    }

    if (e.key === "ArrowDown") {
      this.game.MoveDown();
    }

    if (e.key === "ArrowUp") {
      this.game.RotateLeft();
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default TanksGamePage;
