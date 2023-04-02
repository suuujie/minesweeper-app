import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { GameState } from '../common/constants';
import { TileState } from '../models';

type TileProps = {
	row: number;
	col: number;
	dblClickOpen: (row: number, col: number) => void;
	flag: (row: number, col: number) => void;
	open: (row: number, col: number) => void;
	setStart: (gameState: `${GameState}`) => void;
	state: TileState;
};

const Tile = ({
	state,
	row,
	col,
	dblClickOpen,
	flag,
	open,
	setStart,
}: TileProps) => {
	const handleClick = () => {
		if (!state.flagged) {
			open(row, col);
		}
	};
	const handleRightClick = (e: React.FormEvent) => {
		e.preventDefault();
		if (!state.open) {
			flag(row, col);
		}
	};
	const handleDblClick = () => {
		if (!state.flagged && state.count) {
			dblClickOpen(row, col);
		}
	};

	useEffect(() => {
		if (state.open) {
			if (state.mine) {
				setStart(GameState.LOSE);
				alert('you lose');
			} else if (!state.count) {
				open(row, col);
			}
		}
	}, [state.open]);

	return (
		<div
			className={`tile ${state.open ? '' : 'hidden'}`}
			onClick={handleClick}
			onContextMenu={handleRightClick}
			onDoubleClick={handleDblClick}
		>
			{state.flagged && <FontAwesomeIcon icon="flag" className="flag" />}
			{state.open ? (
				state.mine ? (
					<FontAwesomeIcon icon="burst" className="mine" />
				) : state.count ? (
					state.count
				) : (
					''
				)
			) : (
				''
			)}
		</div>
	);
};

export default Tile;
