import React, { useState } from 'react';
import './App.css';
import TetrisGame from './TetrisGame';
import TanksGamePage from './TanksGamePage';

function App() {
  const [state, setState] = useState('start')

  return (
      <div>
        {state === 'tetrisGame' && ( <TetrisGame /> )}
        {state === 'tanksGame' && ( <TanksGamePage /> )}
        {state === 'start' && ( <button onClick={() => setState('tetrisGame')}>Play tetris!</button> )}
        {state === 'start' && ( <button onClick={() => setState('tanksGame')}>Play tanks!</button> )}

      </div>
  );
}

export default App;
