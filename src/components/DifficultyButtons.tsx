import { easy, GameState, hard, med } from '../common/constants';
import { BoardSettings, Device, DeviceSettings } from '../models';

type DifficultyButtonsProps = {
  device: Device;
  setStart: (start: `${GameState}`) => void;
  setBoardSettings: (settings: BoardSettings) => void;
};

export const DifficultyButtons = ({
  device,
  setStart,
  setBoardSettings,
}: DifficultyButtonsProps) => {
  const handleClick = (diff: DeviceSettings) => {
    setBoardSettings(diff[device]);
    setStart(GameState.IDLE);
  };

  return (
    <div className="button-group">
      <button onClick={() => handleClick(easy)}>Easy</button>
      <button onClick={() => handleClick(med)}>Medium</button>
      <button onClick={() => handleClick(hard)}>Hard</button>
    </div>
  );
};
