import { useMemo } from 'react';
import { BoardState, TileState } from '../models';

type MinesCounterProps = {
  board: BoardState;
};

export const MinesCounter = ({ board }: MinesCounterProps) => {
  const minesCount = useMemo(() => {
    if (board?.length) {
      const value =
        board.flat().filter((tile: TileState) => tile.mine).length -
        board.flat().filter((tile: TileState) => tile.flagged).length;
      return value < 0 ? 0 : value;
    }
  }, [board]);

  return <p>Mines Left: {minesCount}</p>;
};
