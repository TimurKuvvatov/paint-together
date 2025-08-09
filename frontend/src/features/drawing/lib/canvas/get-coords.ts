import type { MouseEvent } from 'react';

type GetCoordsProps = {
	e: MouseEvent<HTMLCanvasElement>;
	canvas: HTMLCanvasElement;
};

export const getCoords = ({ e, canvas }: GetCoordsProps) => {
	if (!canvas) return;

	const rect = canvas.getBoundingClientRect();

	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;

	const x = (e.clientX - rect.left) * scaleX;
	const y = (e.clientY - rect.top) * scaleY;

	return { x, y };
};
