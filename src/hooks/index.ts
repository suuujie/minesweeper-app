import { useEffect, useState } from 'react';
import { Device } from '../models';

export const useGetDevice = (): Device => {
	const [windowWidth, setWindowWidth] = useState<number>(
		document.body.offsetWidth
	);

	const handleResize = () => {
		setWindowWidth(document.body.offsetWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return 'web';
};
