import { createEffect } from 'effector';

import { setCurrentImage } from '@/features/room/model/events';
import { $room } from '@/features/room/model/store';

import { stopDrawing } from './event';
import { mouseDown, mouseLeave, mouseMove, mouseUp } from './listeners';
import { unsubRedo, unsubUndo } from './undo-redo';

export const setupCanvasListenersFx = createEffect<
	{ canvas: HTMLCanvasElement; signal: AbortSignal },
	void
>(({ canvas, signal }) => {
	const disposeUndo = unsubUndo(canvas);
	const disposeRedo = unsubRedo(canvas);

	const onMouseDown = (e: MouseEvent | TouchEvent) => {
		mouseDown(e, canvas);
	};

	const onMouseMove = (e: MouseEvent | TouchEvent) => {
		mouseMove(e, canvas);
	};

	const onMouseUp = () => {
		mouseUp(canvas);
		try {
			const dataUrl = canvas.toDataURL();
			const roomId = $room.getState().id;
			if (!roomId) return;

			setCurrentImage({ roomId, dataUrl });
			console.log('data', dataUrl);
		} catch (error) {
			console.error('Failed to update currentImage:', error);
		}
	};

	const onMouseLeave = () => {
		mouseLeave();
	};

	canvas.addEventListener('mouseleave', onMouseLeave, { signal });
	canvas.addEventListener('mousedown', onMouseDown, { signal });
	canvas.addEventListener('mousemove', onMouseMove, { signal });
	window.addEventListener('mouseup', onMouseUp, { signal });

	canvas.addEventListener('touchcancel', onMouseLeave, { signal });
	canvas.addEventListener('touchstart', onMouseDown, { signal });
	canvas.addEventListener('touchmove', onMouseMove, { signal });
	window.addEventListener('touchend', onMouseUp, { signal });

	signal.addEventListener('abort', () => {
		stopDrawing();
		if (typeof disposeUndo === 'function') disposeUndo();
		if (typeof disposeRedo === 'function') disposeRedo();
	});
});
