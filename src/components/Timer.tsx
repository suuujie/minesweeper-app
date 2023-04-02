import { useEffect, useState } from 'react';
import { GameState } from '../common/constants';

type TimerProps = {
  start: `${GameState}`;
};

export const Timer = ({ start }: TimerProps) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (start === GameState.START) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else if (start === GameState.WIN || start === GameState.LOSE) {
      clearInterval(interval);
    } else {
      setTimer(0);
    }
  }, [start]);

  return <p>Timer: {timer}</p>;
};
