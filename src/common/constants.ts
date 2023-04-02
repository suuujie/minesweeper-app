import { DeviceSettings } from '../models';

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'med',
  HARD = 'hard',
}

export enum GameState {
  IDLE = 'idle',
  START = 'start',
  WIN = 'win',
  LOSE = 'lose',
}

export const easy: DeviceSettings = {
  web: {
    rows: 9,
    cols: 9,
    mines: 9,
    difficulty: Difficulty.EASY,
  },
};

export const med: DeviceSettings = {
  web: {
    rows: 16,
    cols: 16,
    mines: 40,
    difficulty: Difficulty.MEDIUM,
  },
};

export const hard: DeviceSettings = {
  web: {
    rows: 16,
    cols: 30,
    mines: 99,
    difficulty: Difficulty.HARD,
  },
};
