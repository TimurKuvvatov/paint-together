import { drawEnd } from '../lib/canvas/draw-end';
import { drawMove } from '../lib/canvas/draw-move';
import { drawStart } from '../lib/canvas/draw-start';
import { getCoords } from '../lib/canvas/get-coords';

import { stopDrawing } from './event';
import { $color, $isDrawing, $size, $tool } from './store';
import { pushCurrentStateToUndo } from './undo-redo';

export const mouseDown = (
	e: MouseEvent | TouchEvent,
	canvas: HTMLCanvasElement
) => {
	if (!(e.target instanceof HTMLCanvasElement)) return;

	pushCurrentStateToUndo(canvas);

	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const coords = getCoords({ e, canvas });
	if (!coords) return;
	const { x, y } = coords;

	drawStart({
		color: $color.getState(),
		size: $size.getState(),
		tool: $tool.getState(),
		x,
		y,
		ctx
	});
};

export const mouseMove = (
	e: MouseEvent | TouchEvent,
	canvas: HTMLCanvasElement
) => {
	if (!(e.target instanceof HTMLCanvasElement) || !$isDrawing.getState())
		return;

	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const coords = getCoords({ e, canvas });
	if (!coords) return;

	const { x, y } = coords;

	drawMove({ ctx, x, y });
};

export const mouseLeave = () => {
	stopDrawing();
};

export const mouseUp = (canvas: HTMLCanvasElement) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	drawEnd(ctx);
};
