import { cloneDeep } from 'lodash';
import { BoardState } from '../models';
import {
  canOpen,
  dataGenerator,
  minesCalculator,
  openEmptyTile,
} from '../common/utils';

export const initialState = [
  [{ flagged: false, open: false, mine: false, count: 0 }],
];

function reducer(state: BoardState, action: any) {
  const clonedState = cloneDeep(state);
  switch (action.type) {
    case 'setBoard': {
      const newBoard: BoardState = [];
      const { rows, cols } = action.payload;
      for (let r = 0; r < rows; r++) {
        const newRow = [];
        for (let c = 0; c < cols; c++) {
          newRow.push({ flagged: false, open: false, mine: false, count: 0 });
        }
        newBoard.push(newRow);
      }
      return newBoard;
    }
    case 'setMines': {
      let newBoard: BoardState = [];
      const row: number = action.payload?.row ?? 0;
      const col: number = action.payload?.col ?? 0;
      const minesPlacement = dataGenerator(
        action.payload.mines,
        action.payload.board,
        row,
        col
      );
      newBoard = clonedState.map((r, i) => {
        return r.map((tile, k) => {
          const currIndex = i * r.length + k;
          if (minesPlacement[currIndex] >= 0) {
            tile.mine = true;
          }
          return tile;
        });
      });
      newBoard = newBoard.map((r, i) =>
        r.map((tile, j) => {
          tile.count = minesCalculator(i, j, newBoard);
          return tile;
        })
      );
      newBoard[row][col].open = true;
      return newBoard;
    }
    case 'flag': {
      const row: number = action.payload?.row ?? 0;
      const col: number = action.payload?.col ?? 0;
      clonedState[row][col].flagged = !clonedState[row][col].flagged;
      return clonedState;
    }
    case 'open': {
      const row: number = action?.payload?.row ?? 0;
      const col: number = action?.payload?.col ?? 0;
      if (clonedState[row][col].count || clonedState[row][col].mine) {
        clonedState[row][col].open = true;
      } else {
        openEmptyTile(row, col, clonedState);
      }
      return clonedState;
    }
    case 'dblClickOpen': {
      const row: number = action.payload?.row ?? 0;
      const col: number = action.payload?.col ?? 0;
      if (canOpen(row, col, clonedState)) {
        openEmptyTile(row, col, clonedState);
      }
      return clonedState;
    }
    default:
      return state;
  }
}

export default reducer;
