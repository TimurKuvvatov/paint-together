import { createEffect } from 'effector';

import { drawEnd } from '../lib/canvas/draw-end';
import { drawMove } from '../lib/canvas/draw-move';
import { drawStart } from '../lib/canvas/draw-start';
import { getCoords } from '../lib/canvas/get-coords';

import { stopDrawing } from './event';
import { $color, $isDrawing, $size, $tool } from './store';

export const setupCanvasListenersFx = createEffect<
	{ canvas: HTMLCanvasElement; signal: AbortSignal },
	void
>(({ canvas, signal }) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const onMouseDown = (e: MouseEvent | TouchEvent) => {
		if (!(e.target instanceof HTMLCanvasElement)) return;

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

	const onMouseMove = (e: MouseEvent | TouchEvent) => {
		if (!(e.target instanceof HTMLCanvasElement) || !$isDrawing.getState())
			return;

		const coords = getCoords({ e, canvas });
		if (!coords) return;

		const { x, y } = coords;

		drawMove({ ctx, x, y });
	};

	const onMouseUp = () => {
		drawEnd(ctx);
	};

	canvas.addEventListener('mousedown', onMouseDown, { signal });
	canvas.addEventListener('mousemove', onMouseMove, { signal });
	window.addEventListener('mouseup', onMouseUp, { signal });

	canvas.addEventListener('touchstart', onMouseDown, { signal });
	canvas.addEventListener('touchmove', onMouseMove, { signal });
	window.addEventListener('touchend', onMouseUp, { signal });

	signal.addEventListener('abort', () => {
		stopDrawing();
	});
});
