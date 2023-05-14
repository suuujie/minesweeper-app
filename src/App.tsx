import { useEffect, useReducer, useState } from 'react';
import { faBurst, faFlag } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './App.css';
import reducer, { initialState } from './store/reducer';
import Tile from './components/Tile';
import { Timer } from './components/Timer';
import { MinesCounter } from './components/MinesCounter';
import { BoardSettings } from './models';
import { useGetDevice } from './hooks';
import { Difficulty, GameState, hard } from './common/constants';
import { DifficultyButtons } from './components/DifficultyButtons';

// Font awesome icons
library.add(faFlag, faBurst);

const buttonWidth = 40;

function App() {
  const device = useGetDevice();
  const [board, dispatch] = useReducer(reducer, initialState);
  const [start, setStart] = useState<`${GameState}`>(GameState.IDLE);
  const [boardSettings, setBoardSettings] = useState<BoardSettings>(
    hard[device]
  );

  useEffect(() => {
    if (start === GameState.IDLE) {
      dispatch({
        type: 'setBoard',
        payload: boardSettings,
      });
    }
  }, [start, boardSettings]);

  useEffect(() => {
    if (
      board.flat().filter((tile) => tile.open).length +
        board.flat().filter((tile) => tile.mine).length ===
      board.flat().length
    ) {
      setStart(GameState.WIN);
      alert('u win');
    }
  }, [board]);

  const flag = (row: number, col: number) => {
    if (start === GameState.START) {
      dispatch({ type: 'flag', payload: { row, col } });
    }
  };
  const open = (row: number, col: number) => {
    if (start === GameState.START) {
      dispatch({ type: 'open', payload: { row, col } });
    }
    if (start === GameState.IDLE) {
      dispatch({
        type: 'setMines',
        payload: { mines: boardSettings.mines, board, row, col },
      });
      setStart(GameState.START);
    }
  };
  const dblClickOpen = (row: number, col: number) => {
    if (start === GameState.START) {
      dispatch({ type: 'dblClickOpen', payload: { row, col } });
    }
  };

  const getContainerClass = () => {
    const { cols } = boardSettings;
    switch (boardSettings.difficulty) {
      case Difficulty.EASY:
        return buttonWidth * cols;
      case Difficulty.MEDIUM:
        return buttonWidth * cols;
      case Difficulty.HARD:
        return buttonWidth * cols;
    }
  };

  return (
    <div className="App">
      <header>
        <Timer start={start} />
        <MinesCounter board={board} />
        <DifficultyButtons
          device={device}
          setStart={setStart}
          setBoardSettings={setBoardSettings}
        />
      </header>
      <main className={`container`} style={{ width: getContainerClass() }}>
        {board.map((row, r) =>
          row.map((col, c) => (
            <Tile
              key={r * board[0].length + c}
              flag={flag}
              open={open}
              setStart={setStart}
              dblClickOpen={dblClickOpen}
              state={col}
              row={r}
              col={c}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;
