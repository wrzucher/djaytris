import React, { useState } from 'react';
import './App.css';
import TetrisGame from './TetrisGame';
import TanksGamePage from './TanksGamePage';
import SpriteAccessor from './SpriteAccessor';
import TanksGame from './TanksGame';

const spriteAccessor: SpriteAccessor = new SpriteAccessor();
const tanksGame: TanksGame = new TanksGame(16, 22, 22);

function App() {
  const [state, setState] = useState('start')

  return (
      <div>
        {state === 'tetrisGame' && ( <TetrisGame /> )}
        {state === 'tanksGame' && ( <TanksGamePage spriteAccessor={ spriteAccessor } game={ tanksGame } /> )}
        {state === 'start' && ( <button onClick={() => setState('tetrisGame')}>Play tetris!</button> )}
        {state === 'start' && ( <button onClick={() => setState('tanksGame')}>Play tanks!</button> )}

      </div>
  );
}

export default App;
